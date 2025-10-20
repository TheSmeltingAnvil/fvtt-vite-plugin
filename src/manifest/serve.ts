import fs from "fs-extra"
import path from "path"
import colors from "picocolors"
import * as Vite from "vite"
import { ResolvedFoundryvttOptions } from "../_types"

export default function serve(resolvedOptions: ResolvedFoundryvttOptions): Vite.Plugin {
  let outDir: string

  return {
    name: "foundryvtt:manifest:serve",
    apply: "serve",

    configResolved(resolvedConfig: Vite.ResolvedConfig) {
      const srcDir = resolvedConfig.root
      outDir = path.resolve(srcDir, resolvedConfig.build.outDir)
      resolvedConfig.logger.info(colors.white("Using manifest: ") + colors.green(resolvedOptions.manifestPath))
    },

    configureServer: async () => {
      const manifestSource = JSON.stringify(resolvedOptions.manifest, null, 2)
      const { name } = path.parse(resolvedOptions.manifestPath)
      await fs.ensureDir(outDir)
      await fs.writeFile(path.resolve(outDir, `${name}.json`), manifestSource)
    },
  }
}
