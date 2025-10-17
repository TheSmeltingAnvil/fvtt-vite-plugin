import { CollectedFile } from "../_types"
import collectFile from "./collectFile"
import walkFiles from "./walkFiles"

export default function collectFiles(
  pattern: string | string[],
  { srcDir, exclude, outDir }: { srcDir: string; exclude?: string | string[]; outDir: string },
): CollectedFile[] {
  return walkFiles(pattern, { srcDir, exclude }).map((f) => collectFile(f, { srcDir, outDir }))
}
