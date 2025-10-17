import * as Vite from "vite"
import { ResolvedFoundryvttOptions } from "../_types"
import build from "./build"
import serve from "./serve"

export default function assets(options: ResolvedFoundryvttOptions): Vite.Plugin[] {
  return [build(options), serve(options)]
}
