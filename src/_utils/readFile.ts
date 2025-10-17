import fs from "fs-extra"

export default async function readFile(filePath: string): Promise<string> {
  return await fs.readFile(filePath, "utf8")
}
