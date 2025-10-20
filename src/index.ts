import fs from "fs-extra"
import * as Vite from "vite"
import { FoundryvttOptions } from "./_types"
import { findManifest } from "./_utils"
import assets from "./assets"
import config from "./config"
import entryScripts from "./entryScripts"
import manifest from "./manifest"
import { resolveOptions } from "./manifest/_utils"

export const foundryvtt = async (options: FoundryvttOptions = {}): Promise<Vite.PluginOption[]> => {
  if (!options.manifestPath || !(await fs.exists(options.manifestPath)))
    options.manifestPath = findManifest(process.cwd())
  const resolvedOptions = await resolveOptions(options)

  return [manifest(resolvedOptions), config(resolvedOptions), entryScripts(resolvedOptions), assets(resolvedOptions)]
}
