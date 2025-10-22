import { Manifest } from "@foundryvtt/utils"
import path from "path"
import colors from "picocolors"
import * as Vite from "vite"
import { ResolvedFoundryvttOptions } from "../_types"
import * as utils from "./_utils"

export default function build(resolvedOptions: ResolvedFoundryvttOptions): Vite.Plugin {
  let manifest: Manifest

  return {
    name: "foundryvtt:manifest:build",
    apply: "build",

    async configResolved(resolvedConfig: Vite.ResolvedConfig) {
      resolvedConfig.logger.info(colors.white("Using manifest: ") + colors.green(resolvedOptions.manifestInfo.path))
      manifest = utils.resolveManifest(await resolvedOptions.manifestInfo.manifest(), resolvedConfig)
    },

    async generateBundle() {
      const manifestPath = resolvedOptions.manifestInfo.path
      const manifestSource = JSON.stringify(manifest, null, 2)
      const { name } = path.parse(manifestPath)
      this.emitFile({
        type: "asset",
        name,
        fileName: `${name}.json`,
        originalFileName: manifestPath,
        source: manifestSource,
      })
    },
  }
}
