import fs from "fs-extra"
import path from "path"
import colors from "picocolors"
import * as Vite from "vite"
import { FoundryvttOptions, ResolvedFoundryvttOptions } from "../_types"
import * as utils from "./_utils"

export default function serve(options: FoundryvttOptions): Vite.Plugin {
  const resolvedOptions = options as ResolvedFoundryvttOptions
  let resolvedConfig: Vite.ResolvedConfig
  let outDir: string

  return {
    name: "foundryvtt:manifest:serve",
    apply: "serve",

    async config(config: Vite.UserConfig, _env: Vite.ConfigEnv) {
      await utils.resolveOptions(options, config.root || process.cwd())
      resolvedOptions.manifest = utils.resolveManifest(resolvedOptions.manifest, config)
    },

    configResolved(config: Vite.ResolvedConfig) {
      resolvedConfig = config
      const srcDir = resolvedConfig.root
      outDir = path.resolve(srcDir, resolvedConfig.build.outDir)
      config.logger.info(colors.white("Using manifest: ") + colors.green(resolvedOptions.manifestPath))
    },

    configureServer: async () => {
      const manifestSource = JSON.stringify(resolvedOptions.manifest, null, 2)
      const { name } = path.parse(resolvedOptions.manifestPath)
      await fs.ensureDir(outDir)
      await fs.writeFile(path.resolve(outDir, `${name}.json`), manifestSource)
    },
  }
}
