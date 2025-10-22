import fs from "fs-extra"
import * as Vite from "vite"
import { FoundryvttOptions } from "./_types"
import assets from "./assets"
import config from "./config"
import entryScripts from "./entryScripts"
import manifest from "./manifest"
import { resolveOptions } from "./manifest/_utils"
import { findManifest } from "@foundryvtt/utils"
import path from "path"

export const foundryvtt = async (options: FoundryvttOptions = {}): Promise<Vite.PluginOption[]> => {
  const rootPath = options.manifestPath
    ? (await fs.stat(options.manifestPath)).isDirectory()
      ? options.manifestPath
      : path.dirname(options.manifestPath)
    : process.cwd()
  const manifestInfo = await findManifest(rootPath)
  if (!manifestInfo) throw new Error("Could not find (system|module).(json|yaml|yml) manifest file.")
  const resolvedOptions = await resolveOptions(options, manifestInfo)
  return [manifest(resolvedOptions), config(resolvedOptions), entryScripts(resolvedOptions), assets(resolvedOptions)]
}
