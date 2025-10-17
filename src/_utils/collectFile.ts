import YAML from "js-yaml"
import path from "path"
import { CollectedFile } from "../_types"
import readFile from "./readFile"

export default function collectFile(
  fileName: string,
  { srcDir, outDir }: { srcDir: string; outDir: string },
): CollectedFile {
  const originalFileName = path.resolve(fileName)
  const inputJson = /\.json$/i.test(originalFileName)
  const inputYaml = /\.ya?ml$/i.test(originalFileName)

  const relativeFileName = (
    inputYaml
      ? path.relative(srcDir, originalFileName).replace(/\.ya?ml$/i, ".json")
      : path.relative(srcDir, originalFileName)
  ).replaceAll(/\\/g, "/")

  const outputFileName = path.resolve(outDir, relativeFileName)

  const read = (() => {
    if (inputYaml) return async () => JSON.stringify(YAML.load(await readFile(originalFileName)))
    if (inputJson) return async () => JSON.stringify(await readFile(originalFileName))
    return async () => await readFile(originalFileName)
  })()
  return {
    originalFileName,
    outputFileName,
    read,
    relativeFileName,
  }
}
