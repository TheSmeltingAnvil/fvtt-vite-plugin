import path from "path"
import colors from "picocolors"
import * as Vite from "vite"
import { ResolvedFoundryvttOptions } from "../_types"

export default function build(resolvedOptions: ResolvedFoundryvttOptions): Vite.Plugin {
  return {
    name: "foundryvtt:manifest:build",
    apply: "build",

    configResolved(resolvedConfig: Vite.ResolvedConfig) {
      resolvedConfig.logger.info(colors.white("Using manifest: ") + colors.green(resolvedOptions.manifestPath))
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
