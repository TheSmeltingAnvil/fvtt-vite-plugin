import * as YAML from "js-yaml"
import path from "path"
import readFile from "./readFile"

/**
 * Reads a JSON or YAML file and returns its content as JSON.
 * @param filePath Path to the file to reads.
 * @returns A promise that resolves to the file content as JSON.
 */

export default async function readFileAsJson(filePath: string): Promise<string> {
  const { ext } = path.posix.parse(filePath)
  const data = ext === ".json" ? JSON.parse(await readFile(filePath)) : YAML.load(await readFile(filePath))
  return JSON.stringify(data, null, 2)
}
