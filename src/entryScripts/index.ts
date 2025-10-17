import fs from "fs-extra"
import path from "path"
import * as Vite from "vite"
import { ResolvedFoundryvttOptions } from "../_types"

export default function entryScripts(_resolvedOptions: ResolvedFoundryvttOptions): Vite.Plugin {
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

      await fs.ensureDir(outDir)

      // REVIEW depends on Manifest `esmodules` entries!
      await fs.writeFile(path.resolve(outDir, "index.mjs"), `/* ${message} */\nimport './index.ts';\n`)

      // REVIEW depends on Manifest `scripts` entries!
      // TODO

      // REVIEW depends on Manifest `scripts` entries!
      await fs.writeFile(path.resolve(outDir, "styles.css"), `/* ${message} */\n`)
    },
    buildEnd: async () => {
      await fs.remove(path.resolve(outDir, "index.mjs"))
    },
  }
}
