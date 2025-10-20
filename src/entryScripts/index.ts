import fs from "fs-extra"
import path from "path"
import * as Vite from "vite"
import { ResolvedFoundryvttOptions } from "../_types"

export default function entryScripts(resolvedOptions: ResolvedFoundryvttOptions): Vite.Plugin {
  let resolvedConfig: Vite.ResolvedConfig
  let outDir: string

  return {
    name: "foundryvtt:create-entry-script:serve",
    apply: "serve",
    configResolved(_config: Vite.ResolvedConfig) {
      resolvedConfig = _config
      outDir = path.resolve(resolvedConfig.root, resolvedConfig.build.outDir)
    },
    buildStart: async () => {
      const message = "This file is for a running vite dev server and is not copied to a build"

      for (const [originalFileName, outputFileName] of Object.entries(resolvedOptions.entries)) {
        const { dir, ext } = path.posix.parse(outputFileName)
        const output = path.resolve(outDir, outputFileName)
        const relativeFileName = path.posix.relative(dir, originalFileName)
        if (dir) await fs.ensureDir(dir)
        if (ext === ".css") {
          await fs.writeFile(output, `/* ${message} */\n`)
        } else {
          await fs.writeFile(output, `/* ${message} */\nimport './${relativeFileName}';\n`)
        }
      }
    },
    buildEnd: async () => {
      await fs.remove(path.resolve(outDir, "index.mjs"))
    },
  }
}
