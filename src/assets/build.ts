import path from "path"
import * as Vite from "vite"
import { ResolvedFoundryvttOptions } from "../_types"
import * as utils from "../_utils"

export default function build(resolvedOptions: ResolvedFoundryvttOptions): Vite.Plugin {
  let resolvedConfig: Vite.ResolvedConfig
  let srcDir: string
  let outDir: string
  return {
    name: "foundryvtt:assets:build",
    apply: "build",
    configResolved(config: Vite.ResolvedConfig) {
      resolvedConfig = config
      srcDir = resolvedConfig.root
      outDir = path.resolve(resolvedConfig.root, resolvedConfig.build.outDir)
    },
    async buildStart(): Promise<void> {
      const { replace } = resolvedOptions
      for (const option of resolvedOptions.assets) {
        const { copyToOutDir, exclude, pattern, rename } = option
        const collectedFiles = utils.collectFiles(pattern, {
          srcDir,
          exclude,
          outDir,
        })
        for (const { originalFileName, outputFileName, read, relativeFileName } of collectedFiles) {
          if (copyToOutDir) {
            const fileName = rename?.(relativeFileName) ?? relativeFileName
            const source = replace(await read())
            ////console.log(`[DEBUG] Emitting asset file: ${outputFileName} -> ${fileName}`)
            this.emitFile({
              type: "asset",
              name: outputFileName,
              originalFileName,
              fileName,
              source,
            })
          }
        }
      }
    },
  }
}
