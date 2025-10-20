import path from "path"
import * as Vite from "vite"
import { ResolvedFoundryvttOptions } from "../_types"

export default function config(resolvedOptions: ResolvedFoundryvttOptions): Vite.Plugin {
  return {
    name: "foundryvtt:config",

    config(config: Vite.UserConfig, _env: Vite.ConfigEnv) {
      // Update root if not set
      config.root ??= path.dirname(resolvedOptions.manifestPath)

      // Update public dir if not set
      config.publicDir ??= "../public"

      // Create build & rolldownOptions objects if they don't exist
      config.build ??= {}
      config.build.rolldownOptions ??= {}

      // Convert input to an object if it's a string or array
      if (config.build.rolldownOptions.input) {
        if (typeof config.build.rolldownOptions.input === "string") {
          const original = config.build.rolldownOptions.input
          config.build.rolldownOptions.input = {}
          const { name } = path.posix.parse(original)
          config.build.rolldownOptions.input[name] = original
        } else if (Array.isArray(config.build.rolldownOptions.input)) {
          const original = config.build.rolldownOptions.input
          config.build.rolldownOptions.input = {}
          for (const item of original) {
            const { name } = path.posix.parse(item)
            config.build.rolldownOptions.input[name] = item
          }
        }
      }

      const input = Object.entries(resolvedOptions.entries).reduce(
        (acc, [originalFileName, fileName]) => {
          const { dir, name: baseName, ext } = path.posix.parse(fileName)
          if (ext !== ".css") {
            const name = path.posix.join(dir, baseName)
            acc[name] = originalFileName
          }
          return acc
        },
        {} as Record<string, string>,
      )

      config.build.rolldownOptions.input = {
        ...(config.build.rolldownOptions.input as Record<string, string>),
        ...input,
      }

      for (const key of Object.keys(resolvedOptions.entries)) {
        const kv = Object.entries(config.build.rolldownOptions.input).find(([_, value]) => value === key)
        if (kv) {
          resolvedOptions.entries[key] = kv[0] + path.extname(resolvedOptions.entries[key])
        }
      }

      // Update outputs
      config.build.rolldownOptions.output ??= []
      if (!Array.isArray(config.build.rolldownOptions.output)) {
        const original = config.build.rolldownOptions.output
        config.build.rolldownOptions.output = []
        config.build.rolldownOptions.output.push(original)
      }
      config.build.rolldownOptions.output.push({
        format: "esm",
        preserveModules: true,
        assetFileNames: (chunkInfo: Vite.Rolldown.PreRenderedAsset) => {
          if (chunkInfo.name) {
            const { dir } = path.posix.parse(chunkInfo.originalFileName ?? chunkInfo.name)
            return path.posix.join(dir, "[name][extname]")
          }
          return "[name][extname]"
        },
        entryFileNames: (chunkInfo: Vite.Rolldown.PreRenderedChunk) => {
          return resolvedOptions.scriptFileNames(chunkInfo.name)
        },
        cssEntryFileNames: (chunkInfo: Vite.Rolldown.PreRenderedChunk) => {
          return resolvedOptions.styleFileNames(chunkInfo.name)
        },
      })

      const prefixUrl = `/${resolvedOptions.manifestType}s/${resolvedOptions.manifest.id}/`

      config.base = prefixUrl
      config.server ??= {}
      config.server.port = 30001
      config.server.proxy ??= {}
      config.server.proxy[`^(?!${prefixUrl})`] = "http://localhost:30000/"
      config.server.proxy["/socket.io"] = {
        target: "ws://localhost:30000",
        ws: true,
      }
    },
  }
}
