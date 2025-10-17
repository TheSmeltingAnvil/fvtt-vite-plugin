import * as crypto from "crypto"
import * as fs from "fs"
import type { OutgoingHttpHeaders, ServerResponse } from "http"
import { lookup } from "mrmime"
import * as path from "path"
import colors from "picocolors"
import * as Vite from "vite"
import { CollectedFile } from "../_types"
import * as utils from "../_utils"

export function serveFiles(
  config: Vite.ResolvedConfig,
  collectedFiles: CollectedFile[],
  replaceVariables: (source: string) => string,
) {
  config.logger.info(colors.dim("Initializing assets middleware"), {
    timestamp: true,
  })
  const { base, server } = config
  return async (req: Vite.Connect.IncomingMessage, res: ServerResponse, next: Vite.Connect.NextFunction) => {
    try {
      const requestPath = decodeURI(req.originalUrl ?? "").replace(base, "")
      if (requestPath.endsWith("/")) return return404(res, next)
      const file = readLocalFileIfExists(collectedFiles, requestPath)
      if (!file || file.stats.isDirectory()) return return404(res, next)
      setHeaders(res, file.originalFileName, server.headers)
      if (path.extname(file.originalFileName) === ".yaml" || path.extname(file.originalFileName) === ".yml") {
        const source = replaceVariables(await utils.readFileAsJson(file.originalFileName))

        return sendTransform(req, res, source)
      }

      console.log("Serving Static File: ", file)
      sendStatic(req, res, file.originalFileName, file.stats)
    } catch (err: unknown) {
      if (err instanceof Error) return next(err)
      throw err
    }
  }
}

function readLocalFileIfExists(collectedFiles: CollectedFile[], requestPath: string) {
  const file = collectedFiles.find((f) => f.relativeFileName === requestPath)
  if (!file) return undefined

  const stats = fs.statSync(file.originalFileName, { throwIfNoEntry: false })
  if (!stats) return undefined

  return { originalFileName: file.originalFileName, stats }
}

function return404(res: ServerResponse, next: Vite.Connect.NextFunction) {
  if (next) return next()
  res.statusCode = 404
  res.end()
}

const knownJavascriptExtensionRE = /\.(?:[tj]sx?|[cm][tj]s)$/
function setHeaders(res: ServerResponse, fileName: string, headers: OutgoingHttpHeaders | undefined) {
  // Matches js, jsx, ts, tsx, mts, mjs, cjs, cts, ctx, mtx
  // The reason this is done, is that the .ts and .mts file extensions are
  // reserved for the MIME type video/mp2t. In almost all cases, we can expect
  // these files to be TypeScript files, and for Vite to serve them with
  // this Content-Type.
  if (knownJavascriptExtensionRE.test(fileName)) {
    res.setHeader("Content-Type", "text/javascript")
  } else {
    let mineType = lookup(fileName) || ""
    if (mineType === "text/html") mineType += ";charset=utf-8"
    res.setHeader("Content-Type", mineType)
  }

  if (headers) {
    for (const name in headers) res.setHeader(name, headers[name]!)
  }
}

function sendStatic(req: Vite.Connect.IncomingMessage, res: ServerResponse, file: string, stats: fs.Stats) {
  const staticHeaders = getStaticHeaders(stats)
  if (req.headers["if-none-match"] === staticHeaders["ETag"]) {
    res.writeHead(304)
    return res.end()
  }

  let code = 200
  const headers = getMergeHeaders(staticHeaders, res)
  const opts: { start?: number; end?: number } = {}

  if (req.headers.range) {
    code = 206
    const [x, y] = req.headers.range.replace("bytes=", "").split("-")
    let end = (y ? parseInt(y, 10) : 0) || stats.size - 1
    const start = (x ? parseInt(x, 10) : 0) || 0
    opts.end = end
    opts.start = start

    if (end >= stats.size) {
      end = stats.size - 1
    }

    if (start >= stats.size) {
      res.setHeader("Content-Range", `bytes */${stats.size}`)
      res.statusCode = 416
      return res.end()
    }

    headers["Content-Range"] = `bytes ${start}-${end}/${stats.size}`
    headers["Content-Length"] = end - start + 1
    headers["Accept-Ranges"] = "bytes"
  }

  res.writeHead(code, headers)
  return fs.createReadStream(file, opts).pipe(res)
}

function sendTransform(req: Vite.Connect.IncomingMessage, res: ServerResponse, content: string | Buffer) {
  const transformHeaders = getTransformHeaders("utf8", content)

  if (req.headers["if-none-match"] === transformHeaders["ETag"]) {
    res.writeHead(304)
    return res.end()
  }

  const code = 200
  const headers = getMergeHeaders(transformHeaders, res)

  res.writeHead(code, headers)
  return res.end(content)
}

function getStaticHeaders(stats: fs.Stats): OutgoingHttpHeaders {
  return {
    "Content-Length": stats.size,
    "Last-Modified": stats.mtime.toUTCString(),
    ETag: `W/"${stats.size}-${stats.mtime.getTime()}"`,
    "Cache-Control": "no-cache",
  }
}

function getTransformHeaders(encoding: BufferEncoding | "buffer", content: string | Buffer): OutgoingHttpHeaders {
  return {
    "Content-Length": Buffer.byteLength(content, encoding === "buffer" ? undefined : encoding),
    ETag: `W/"${calculateMd5Base64(content)}"`,
    "Cache-Control": "no-cache",
  }
}

function getMergeHeaders(headers: OutgoingHttpHeaders, res: ServerResponse) {
  headers = { ...headers }
  for (const key in headers) {
    const tmp = res.getHeader(key)
    if (tmp) headers[key] = tmp
  }

  const contentTypeHeader = res.getHeader("content-type")
  if (contentTypeHeader) headers["Content-Type"] = contentTypeHeader

  return headers
}

function calculateMd5Base64(content: string | Buffer) {
  return crypto.createHash("md5").update(content).digest("base64")
}
