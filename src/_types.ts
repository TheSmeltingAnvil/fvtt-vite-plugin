export interface FoundryvttOptions {
  assets?: AssetsOptions | AssetsOptions[]
  manifestPath?: string
  variables?: Record<string, string>
}

export interface AssetsOptions {
  assetType?: "template" | "language"
  copyToOutDir?: boolean
  exclude?: string | string[]
  pattern: string | string[]
  reload?: boolean
  rename?: (name: string) => string
  serve?: boolean
}

export interface Manifest {
  id: string
  title: string
  description: string
  version: string
  esmodules: string[]
  scripts: string[]
  styles: string[]
  languages: { lang: string; name: string; path: string }[]
}

export interface ResolvedAssetsOptions {
  assetType: "template" | "language" | ""
  copyToOutDir: boolean
  exclude: string[]
  pattern: string[]
  reload: string | false
  rename: ((name: string) => string) | undefined
  serve: boolean
}

export type ResolvedFoundryvttOptions = Required<Omit<FoundryvttOptions, "assets" | "variables">> & {
  assets: ResolvedAssetsOptions[]
  manifest: Manifest
  manifestPath: string
  manifestType: "module" | "system"
  replace: (source: string) => string
}

export interface CollectedFile {
  originalFileName: string
  outputFileName: string
  read: () => Promise<string>
  relativeFileName: string
}
