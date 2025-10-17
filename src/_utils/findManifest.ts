import path from "path"
import walkFiles from "./walkFiles"

export default function findManifest(cwd: string): string {
  const candidates = ["system.json", "system.yml", "system.yaml", "module.json", "module.yml", "module.yaml"]
  const found = walkFiles(candidates, { srcDir: cwd })
  if (found.length === 0) throw new Error("Could not find (system|module).(json|yaml|yml) manifest file.")
  return path.posix.join(found[0] as string)
}
