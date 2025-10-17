import * as Vite from "vite"
import { FoundryvttOptions, ResolvedFoundryvttOptions } from "./_types"
import assets from "./assets"
import config from "./config"
import entryScripts from "./entryScripts"
import manifest from "./manifest"

export const foundryvtt = async (options: FoundryvttOptions = {}): Promise<Vite.PluginOption[]> => {
  return [
    manifest(options as FoundryvttOptions),
    config(options as ResolvedFoundryvttOptions),
    entryScripts(options as ResolvedFoundryvttOptions),
    assets(options as ResolvedFoundryvttOptions),
  ]
}
