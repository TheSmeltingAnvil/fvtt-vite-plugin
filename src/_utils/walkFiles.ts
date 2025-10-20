import fs from "fs-extra"
import path from "path"

export default function walkFiles(
  pattern: string | readonly string[],
  { srcDir, exclude }: { srcDir?: string; exclude?: readonly string[] },
): string[] {
  return fs.globSync(pattern, { cwd: srcDir, exclude }).map((match) => {
    const dir = srcDir?.replaceAll(/\\/g, "/") ?? ""
    return path.resolve(dir, match)
  })
}
