import * as Vite from "vite"
import { ResolvedFoundryvttOptions } from "../_types"
import build from "./build"
import serve from "./serve"

// REVIEW add template.yml support here too?

export default function manifest(resolvedOptions: ResolvedFoundryvttOptions): Vite.Plugin[] {
  return [build(resolvedOptions), serve(resolvedOptions)]
}
