import path from "path"
import colors from "picocolors"
import * as Vite from "vite"
import { FoundryvttOptions, ResolvedFoundryvttOptions } from "../_types"
import * as utils from "./_utils"

export default function build(options: FoundryvttOptions): Vite.Plugin {
  const resolvedOptions = options as ResolvedFoundryvttOptions

  return {
    name: "foundryvtt:manifest:build",
    apply: "build",

    async config(config: Vite.UserConfig, _env: Vite.ConfigEnv) {
      await utils.resolveOptions(options, config.root || process.cwd())
      resolvedOptions.manifest = utils.resolveManifest(resolvedOptions.manifest, config)
    },

    configResolved(config: Vite.ResolvedConfig) {
      config.logger.info(colors.white("Using manifest: ") + colors.green(resolvedOptions.manifestPath))
    },

    generateBundle() {
      const manifestSource = JSON.stringify(resolvedOptions.manifest, null, 2)
      const { name } = path.parse(resolvedOptions.manifestPath)
      this.emitFile({
        type: "asset",
        name,
        fileName: `${name}.json`,
        originalFileName: resolvedOptions.manifestPath,
        source: manifestSource,
      })
    },
  }
}
