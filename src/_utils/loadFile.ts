import * as YAML from "js-yaml"
import path from "path"
import readFile from "./readFile"

/**
 * Loads a JSON or YAML file and returns JS object representation.
 * @param filePath Path to the file to read.
 * @returns A promise that resolves to the file content as JS object.
 */
export default async function loadFile<T>(filePath: string): Promise<T> {
  const { ext } = path.posix.parse(filePath)
  const data =
    ext === ".json" ? ((await JSON.parse(await readFile(filePath))) as T) : (YAML.load(await readFile(filePath)) as T)
  return data
}
