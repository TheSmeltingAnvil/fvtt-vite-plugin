import path from "path"
import * as Vite from "vite"
import { ResolvedFoundryvttOptions } from "../_types"

export default function config(resolvedOptions: ResolvedFoundryvttOptions): Vite.Plugin {
  return {
    name: "foundryvtt:config",

    config(config: Vite.UserConfig, _env: Vite.ConfigEnv) {
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

      const input = [...resolvedOptions.manifest.esmodules, ...resolvedOptions.manifest.scripts].reduce(
        (acc, file) => {
          const { dir, name } = path.posix.parse(file)
          const key = path.posix.join(dir, name)
          acc[key] = key
          return acc
        },
        {} as Record<string, string>,
      )

      config.build.rolldownOptions.input = {
        ...(config.build.rolldownOptions.input as Record<string, string>),
        ...input,
      }

      // Update outputs
      if (config.build.rolldownOptions.output && !Array.isArray(config.build.rolldownOptions.output)) {
        const original = config.build.rolldownOptions.output
        config.build.rolldownOptions.output = []
        config.build.rolldownOptions.output.push(original)
      } else {
        config.build.rolldownOptions.output = []
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
        entryFileNames: "[name].mjs",
        cssEntryFileNames: "[name].css",
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
