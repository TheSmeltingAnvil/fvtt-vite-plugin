import { ManifestInfo } from "@foundryvtt/utils"

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

export interface ResolvedAssetsOptions {
  assetType: "template" | "language" | ""
  copyToOutDir: boolean
  exclude: string[]
  pattern: string[]
  reload: string | false
  rename: ((name: string) => string) | undefined
  serve: boolean
}

export type ResolvedFoundryvttOptions = Required<Omit<FoundryvttOptions, "assets" | "manifestPath" | "variables">> & {
  assets: ResolvedAssetsOptions[]
  manifestInfo: ManifestInfo
  replace: (source: string) => string
  scriptFileNames: (name: string) => string
  styleFileNames: (name: string) => string
  entries: Record<string, string>
}

export interface CollectedFile {
  originalFileName: string
  outputFileName: string
  read: () => Promise<string>
  relativeFileName: string
}
