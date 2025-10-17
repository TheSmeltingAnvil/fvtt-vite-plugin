import fs from "fs-extra"
import path from "path"

export default function walkFiles(
  pattern: string | string[],
  { srcDir, exclude }: { srcDir: string; exclude?: string | string[] },
): string[] {
  if (!Array.isArray(pattern)) pattern = [pattern]
  if (!Array.isArray(exclude)) exclude = exclude ? [exclude] : []
  return fs.globSync(pattern, { cwd: srcDir, exclude }).map((match) => {
    return path.resolve(srcDir, match.replaceAll(/\\/g, "/"))
  })
}
