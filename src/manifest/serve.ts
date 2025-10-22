import { Manifest } from "@foundryvtt/utils"
import fs from "fs-extra"
import path from "path"
import colors from "picocolors"
import * as Vite from "vite"
import { ResolvedFoundryvttOptions } from "../_types"
import * as utils from "./_utils"

export default function serve(resolvedOptions: ResolvedFoundryvttOptions): Vite.Plugin {
  let outDir: string
  let manifest: Manifest

  return {
    name: "foundryvtt:manifest:serve",
    apply: "serve",

    async configResolved(resolvedConfig: Vite.ResolvedConfig) {
      const srcDir = resolvedConfig.root
      outDir = path.resolve(srcDir, resolvedConfig.build.outDir)
      resolvedConfig.logger.info(colors.white("Using manifest: ") + colors.green(resolvedOptions.manifestInfo.path))
      manifest = utils.resolveManifest(await resolvedOptions.manifestInfo.manifest(), resolvedConfig)
    },

    async configureServer() {
      const manifestPath = resolvedOptions.manifestInfo.path
      const manifestSource = JSON.stringify(manifest, null, 2)
      const { name } = path.parse(manifestPath)
      await fs.ensureDir(outDir)
      await fs.writeFile(path.resolve(outDir, `${name}.json`), manifestSource)
    },
  }
}
