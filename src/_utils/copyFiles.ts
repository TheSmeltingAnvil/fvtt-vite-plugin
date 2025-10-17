import fs from "fs-extra"
import path from "path"
import { type CollectedFile } from "../_types"

export default async function copyFiles(collectedFiles: CollectedFile[], replace: (source: string) => string) {
  for (const { outputFileName, read } of collectedFiles) {
    const source = replace(await read())
    await fs.ensureDir(path.dirname(outputFileName))
    await fs.writeFile(outputFileName, source)
  }
}
