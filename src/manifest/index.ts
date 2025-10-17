import * as Vite from "vite"
import { FoundryvttOptions } from "../_types"
import build from "./build"
import serve from "./serve"

// REVIEW add template.yml support here too?

export default function manifest(options: FoundryvttOptions): Vite.Plugin[] {
  return [build(options), serve(options)]
}
