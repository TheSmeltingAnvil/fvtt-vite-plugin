import fs from "fs-extra"
import { minimatch } from "minimatch"
import path from "path"
import colors from "picocolors"
import * as Vite from "vite"
import { CollectedFile, ResolvedAssetsOptions, ResolvedFoundryvttOptions } from "../_types"
import * as utils from "../_utils"
import { serveFiles } from "./_utils"

export default function serve(resolvedOptions: ResolvedFoundryvttOptions): Vite.Plugin {
  let resolvedConfig: Vite.ResolvedConfig
  let srcDir: string
  let outDir: string
  let logger: Vite.Logger
  let ws: Vite.WebSocketServer
  const collectedFiles: CollectedFile[] = []
  const servedFiles: CollectedFile[] = []
  return {
    name: "foundryvtt:assets:serve",
    apply: "serve",
    configResolved(config: Vite.ResolvedConfig) {
      resolvedConfig = config
      srcDir = resolvedConfig.root
      outDir = path.resolve(resolvedConfig.root, resolvedConfig.build.outDir)
      logger = config.logger
    },
    configureServer: async (server: Vite.ViteDevServer) => {
      const { replace } = resolvedOptions
      for (const option of resolvedOptions.assets) {
        const { copyToOutDir, exclude, pattern, rename, serve } = option
        const _collectedFiles = utils
          .collectFiles(pattern, {
            srcDir,
            exclude,
            outDir,
          })
          .map((file) => {
            if (rename) {
              file.outputFileName = rename(file.outputFileName)
              file.relativeFileName = rename(file.relativeFileName)
            }
            return file
          })
        collectedFiles.push(..._collectedFiles)
        if (serve) servedFiles.push(..._collectedFiles)
        if (copyToOutDir) utils.copyFiles(_collectedFiles, replace)
      }

      logger.info(colors.dim("Collected assets: ") + colors.yellow(collectedFiles.length), {
        timestamp: true,
      })

      ws = server.ws

      const { middlewares } = server
      return () => {
        middlewares.use(serveFiles(resolvedConfig, collectedFiles, replace))
      }
    },
    async watchChange(id: string, { event }: { event: string }) {
      const log = (msg: string, path: string) => {
        logger.info(colors.green(msg + ": ") + colors.dim(path), {
          timestamp: true,
        })
      }

      const getAssets = (originalFileName: string) => {
        return resolvedOptions.assets.find(
          (o: ResolvedAssetsOptions) =>
            minimatch(o.pattern.join(","), originalFileName) &&
            !minimatch(o.exclude.map((e) => `!${e}`).join(","), originalFileName),
        )
      }

      const hotReload = (eventType: string, collectedFile: CollectedFile) => {
        ws.send(eventType, {
          path: collectedFile.relativeFileName,
        })
      }

      const { replace } = resolvedOptions
      const originalFileName = path.normalize(id)
      const assets = getAssets(originalFileName)
      if (!assets || !assets.assetType || !assets.copyToOutDir || !assets.reload) {
        return
      }

      const createFile = async () => {
        const collectedFile = utils.collectFile(originalFileName, {
          srcDir,
          outDir,
        })
        if (!collectedFile) return
        log(`Create ${assets.assetType}`, collectedFile.relativeFileName)
        if (assets.copyToOutDir) {
          collectedFiles.push(collectedFile)
          await utils.copyFiles([collectedFile], replace)
        }
        if (assets.reload) {
          hotReload(`create:${assets.reload}`, collectedFile)
        }
      }

      const deleteFile = async () => {
        const [collectedFile] = collectedFiles.splice(
          collectedFiles.findIndex((f) => f.originalFileName === originalFileName),
          1,
        )
        if (!collectedFile) return
        log(`Delete ${assets.assetType}`, collectedFile.relativeFileName)
        if (assets.copyToOutDir) {
          await fs.remove(collectedFile.outputFileName)
        }
        if (assets.reload) {
          hotReload(`delete:${assets.reload}`, collectedFile)
        }
      }

      const updateFile = async () => {
        const collectedFile = collectedFiles.find((file) => file.originalFileName === originalFileName)
        if (!collectedFile) return
        log(`Update ${assets.assetType}`, collectedFile.relativeFileName)
        if (assets.copyToOutDir) await utils.copyFiles([collectedFile], replace)
        if (assets.reload) {
          hotReload(`update:${assets.reload}`, collectedFile)
        }
      }

      if (event === "create") {
        createFile()
      } else if (event === "delete") {
        deleteFile()
      } else if (event === "update") {
        updateFile()
      }
    },
  }
}
