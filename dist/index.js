"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.ts
var index_exports = {};
__export(index_exports, {
  foundryvtt: () => foundryvtt
});
module.exports = __toCommonJS(index_exports);

// src/assets/build.ts
var import_path7 = __toESM(require("path"));

// src/_utils/collectFile.ts
var import_js_yaml = __toESM(require("js-yaml"));
var import_path = __toESM(require("path"));

// src/_utils/readFile.ts
var import_fs_extra = __toESM(require("fs-extra"));
async function readFile(filePath) {
  return await import_fs_extra.default.readFile(filePath, "utf8");
}

// src/_utils/collectFile.ts
function collectFile(fileName, { srcDir, outDir }) {
  const originalFileName = import_path.default.resolve(fileName);
  const inputJson = /\.json$/i.test(originalFileName);
  const inputYaml = /\.ya?ml$/i.test(originalFileName);
  const relativeFileName = (inputYaml ? import_path.default.relative(srcDir, originalFileName).replace(/\.ya?ml$/i, ".json") : import_path.default.relative(srcDir, originalFileName)).replaceAll(/\\/g, "/");
  const outputFileName = import_path.default.resolve(outDir, relativeFileName);
  const read = (() => {
    if (inputYaml) return async () => JSON.stringify(import_js_yaml.default.load(await readFile(originalFileName)));
    if (inputJson) return async () => JSON.stringify(await readFile(originalFileName));
    return async () => await readFile(originalFileName);
  })();
  return {
    originalFileName,
    outputFileName,
    read,
    relativeFileName
  };
}

// src/_utils/walkFiles.ts
var import_fs_extra2 = __toESM(require("fs-extra"));
var import_path2 = __toESM(require("path"));
function walkFiles(pattern, { srcDir, exclude }) {
  if (!Array.isArray(pattern)) pattern = [pattern];
  if (!Array.isArray(exclude)) exclude = exclude ? [exclude] : [];
  return import_fs_extra2.default.globSync(pattern, { cwd: srcDir, exclude }).map((match) => {
    return import_path2.default.resolve(srcDir, match.replaceAll(/\\/g, "/"));
  });
}

// src/_utils/collectFiles.ts
function collectFiles(pattern, { srcDir, exclude, outDir }) {
  return walkFiles(pattern, { srcDir, exclude }).map((f) => collectFile(f, { srcDir, outDir }));
}

// src/_utils/copyFiles.ts
var import_fs_extra3 = __toESM(require("fs-extra"));
var import_path3 = __toESM(require("path"));
async function copyFiles(collectedFiles, replace) {
  for (const { outputFileName, read } of collectedFiles) {
    const source = replace(await read());
    await import_fs_extra3.default.ensureDir(import_path3.default.dirname(outputFileName));
    await import_fs_extra3.default.writeFile(outputFileName, source);
  }
}

// src/_utils/findManifest.ts
var import_path4 = __toESM(require("path"));
function findManifest(cwd) {
  const candidates = ["system.json", "system.yml", "system.yaml", "module.json", "module.yml", "module.yaml"];
  const found = walkFiles(candidates, { srcDir: cwd });
  if (found.length === 0) throw new Error("Could not find (system|module).(json|yaml|yml) manifest file.");
  return import_path4.default.posix.join(found[0]);
}

// src/_utils/loadFile.ts
var YAML2 = __toESM(require("js-yaml"));
var import_path5 = __toESM(require("path"));
async function loadFile(filePath) {
  const { ext } = import_path5.default.posix.parse(filePath);
  const data = ext === ".json" ? await JSON.parse(await readFile(filePath)) : YAML2.load(await readFile(filePath));
  return data;
}

// src/_utils/readFileAsJson.ts
var YAML3 = __toESM(require("js-yaml"));
var import_path6 = __toESM(require("path"));
async function readFileAsJson(filePath) {
  const { ext } = import_path6.default.posix.parse(filePath);
  const data = ext === ".json" ? JSON.parse(await readFile(filePath)) : YAML3.load(await readFile(filePath));
  return JSON.stringify(data, null, 2);
}

// src/assets/build.ts
function build(options) {
  const resolvedOptions = options;
  let resolvedConfig;
  let srcDir;
  let outDir;
  return {
    name: "foundryvtt:assets:build",
    apply: "build",
    configResolved(config2) {
      resolvedConfig = config2;
      srcDir = resolvedConfig.root;
      outDir = import_path7.default.resolve(resolvedConfig.root, resolvedConfig.build.outDir);
    },
    async buildStart() {
      const { replace } = resolvedOptions;
      for (const option of resolvedOptions.assets) {
        const { copyToOutDir, exclude, pattern, rename } = option;
        const collectedFiles = collectFiles(pattern, {
          srcDir,
          exclude,
          outDir
        });
        for (const { originalFileName, outputFileName, read, relativeFileName } of collectedFiles) {
          if (copyToOutDir) {
            const fileName = rename?.(relativeFileName) ?? relativeFileName;
            const source = replace(await read());
            this.emitFile({
              type: "asset",
              name: outputFileName,
              originalFileName,
              fileName,
              source
            });
          }
        }
      }
    }
  };
}

// src/assets/serve.ts
var import_fs_extra4 = __toESM(require("fs-extra"));
var import_minimatch = require("minimatch");
var import_path8 = __toESM(require("path"));
var import_picocolors2 = __toESM(require("picocolors"));

// src/assets/_utils.ts
var crypto = __toESM(require("crypto"));
var fs4 = __toESM(require("fs"));
var import_mrmime = require("mrmime");
var path8 = __toESM(require("path"));
var import_picocolors = __toESM(require("picocolors"));
function serveFiles(config2, collectedFiles, replaceVariables) {
  config2.logger.info(import_picocolors.default.dim("Initializing assets middleware"), {
    timestamp: true
  });
  const { base, server } = config2;
  return async (req, res, next) => {
    try {
      const requestPath = decodeURI(req.originalUrl ?? "").replace(base, "");
      if (requestPath.endsWith("/")) return return404(res, next);
      const file = readLocalFileIfExists(collectedFiles, requestPath);
      if (!file || file.stats.isDirectory()) return return404(res, next);
      setHeaders(res, file.originalFileName, server.headers);
      if (path8.extname(file.originalFileName) === ".yaml" || path8.extname(file.originalFileName) === ".yml") {
        const source = replaceVariables(await readFileAsJson(file.originalFileName));
        return sendTransform(req, res, source);
      }
      console.log("Serving Static File: ", file);
      sendStatic(req, res, file.originalFileName, file.stats);
    } catch (err) {
      if (err instanceof Error) return next(err);
      throw err;
    }
  };
}
function readLocalFileIfExists(collectedFiles, requestPath) {
  const file = collectedFiles.find((f) => f.relativeFileName === requestPath);
  if (!file) return void 0;
  const stats = fs4.statSync(file.originalFileName, { throwIfNoEntry: false });
  if (!stats) return void 0;
  return { originalFileName: file.originalFileName, stats };
}
function return404(res, next) {
  if (next) return next();
  res.statusCode = 404;
  res.end();
}
var knownJavascriptExtensionRE = /\.(?:[tj]sx?|[cm][tj]s)$/;
function setHeaders(res, fileName, headers) {
  if (knownJavascriptExtensionRE.test(fileName)) {
    res.setHeader("Content-Type", "text/javascript");
  } else {
    let mineType = (0, import_mrmime.lookup)(fileName) || "";
    if (mineType === "text/html") mineType += ";charset=utf-8";
    res.setHeader("Content-Type", mineType);
  }
  if (headers) {
    for (const name in headers) res.setHeader(name, headers[name]);
  }
}
function sendStatic(req, res, file, stats) {
  const staticHeaders = getStaticHeaders(stats);
  if (req.headers["if-none-match"] === staticHeaders["ETag"]) {
    res.writeHead(304);
    return res.end();
  }
  let code = 200;
  const headers = getMergeHeaders(staticHeaders, res);
  const opts = {};
  if (req.headers.range) {
    code = 206;
    const [x, y] = req.headers.range.replace("bytes=", "").split("-");
    let end = (y ? parseInt(y, 10) : 0) || stats.size - 1;
    const start = (x ? parseInt(x, 10) : 0) || 0;
    opts.end = end;
    opts.start = start;
    if (end >= stats.size) {
      end = stats.size - 1;
    }
    if (start >= stats.size) {
      res.setHeader("Content-Range", `bytes */${stats.size}`);
      res.statusCode = 416;
      return res.end();
    }
    headers["Content-Range"] = `bytes ${start}-${end}/${stats.size}`;
    headers["Content-Length"] = end - start + 1;
    headers["Accept-Ranges"] = "bytes";
  }
  res.writeHead(code, headers);
  return fs4.createReadStream(file, opts).pipe(res);
}
function sendTransform(req, res, content) {
  const transformHeaders = getTransformHeaders("utf8", content);
  if (req.headers["if-none-match"] === transformHeaders["ETag"]) {
    res.writeHead(304);
    return res.end();
  }
  const code = 200;
  const headers = getMergeHeaders(transformHeaders, res);
  res.writeHead(code, headers);
  return res.end(content);
}
function getStaticHeaders(stats) {
  return {
    "Content-Length": stats.size,
    "Last-Modified": stats.mtime.toUTCString(),
    ETag: `W/"${stats.size}-${stats.mtime.getTime()}"`,
    "Cache-Control": "no-cache"
  };
}
function getTransformHeaders(encoding, content) {
  return {
    "Content-Length": Buffer.byteLength(content, encoding === "buffer" ? void 0 : encoding),
    ETag: `W/"${calculateMd5Base64(content)}"`,
    "Cache-Control": "no-cache"
  };
}
function getMergeHeaders(headers, res) {
  headers = { ...headers };
  for (const key in headers) {
    const tmp = res.getHeader(key);
    if (tmp) headers[key] = tmp;
  }
  const contentTypeHeader = res.getHeader("content-type");
  if (contentTypeHeader) headers["Content-Type"] = contentTypeHeader;
  return headers;
}
function calculateMd5Base64(content) {
  return crypto.createHash("md5").update(content).digest("base64");
}

// src/assets/serve.ts
function serve(options) {
  const resolvedOptions = options;
  let resolvedConfig;
  let srcDir;
  let outDir;
  let logger;
  let ws;
  const collectedFiles = [];
  const servedFiles = [];
  return {
    name: "foundryvtt:assets:serve",
    apply: "serve",
    configResolved(config2) {
      resolvedConfig = config2;
      srcDir = resolvedConfig.root;
      outDir = import_path8.default.resolve(resolvedConfig.root, resolvedConfig.build.outDir);
      logger = config2.logger;
    },
    configureServer: async (server) => {
      const { replace } = resolvedOptions;
      for (const option of resolvedOptions.assets) {
        const { copyToOutDir, exclude, pattern, rename, serve: serve3 } = option;
        const _collectedFiles = collectFiles(pattern, {
          srcDir,
          exclude,
          outDir
        }).map((file) => {
          if (rename) {
            file.outputFileName = rename(file.outputFileName);
            file.relativeFileName = rename(file.relativeFileName);
          }
          return file;
        });
        collectedFiles.push(..._collectedFiles);
        if (serve3) servedFiles.push(..._collectedFiles);
        if (copyToOutDir) copyFiles(_collectedFiles, replace);
      }
      logger.info(import_picocolors2.default.dim("Collected assets: ") + import_picocolors2.default.yellow(collectedFiles.length), {
        timestamp: true
      });
      ws = server.ws;
      const { middlewares } = server;
      return () => {
        middlewares.use(serveFiles(resolvedConfig, collectedFiles, replace));
      };
    },
    async watchChange(id, { event }) {
      const log = (msg, path15) => {
        logger.info(import_picocolors2.default.green(msg + ": ") + import_picocolors2.default.dim(path15), {
          timestamp: true
        });
      };
      const getAssets = (originalFileName2) => {
        return resolvedOptions.assets.find(
          (o) => (0, import_minimatch.minimatch)(o.pattern.join(","), originalFileName2) && !(0, import_minimatch.minimatch)(o.exclude.map((e) => `!${e}`).join(","), originalFileName2)
        );
      };
      const hotReload = (eventType, collectedFile) => {
        ws.send(eventType, {
          path: collectedFile.relativeFileName
        });
      };
      const { replace } = resolvedOptions;
      const originalFileName = import_path8.default.normalize(id);
      const assets2 = getAssets(originalFileName);
      if (!assets2 || !assets2.assetType || !assets2.copyToOutDir || !assets2.reload) {
        return;
      }
      const createFile = async () => {
        const collectedFile = collectFile(originalFileName, {
          srcDir,
          outDir
        });
        if (!collectedFile) return;
        log(`Create ${assets2.assetType}`, collectedFile.relativeFileName);
        if (assets2.copyToOutDir) {
          collectedFiles.push(collectedFile);
          await copyFiles([collectedFile], replace);
        }
        if (assets2.reload) {
          hotReload(`create:${assets2.reload}`, collectedFile);
        }
      };
      const deleteFile = async () => {
        const [collectedFile] = collectedFiles.splice(
          collectedFiles.findIndex((f) => f.originalFileName === originalFileName),
          1
        );
        if (!collectedFile) return;
        log(`Delete ${assets2.assetType}`, collectedFile.relativeFileName);
        if (assets2.copyToOutDir) {
          await import_fs_extra4.default.remove(collectedFile.outputFileName);
        }
        if (assets2.reload) {
          hotReload(`delete:${assets2.reload}`, collectedFile);
        }
      };
      const updateFile = async () => {
        const collectedFile = collectedFiles.find((file) => file.originalFileName === originalFileName);
        if (!collectedFile) return;
        log(`Update ${assets2.assetType}`, collectedFile.relativeFileName);
        if (assets2.copyToOutDir) await copyFiles([collectedFile], replace);
        if (assets2.reload) {
          hotReload(`update:${assets2.reload}`, collectedFile);
        }
      };
      if (event === "create") {
        createFile();
      } else if (event === "delete") {
        deleteFile();
      } else if (event === "update") {
        updateFile();
      }
    }
  };
}

// src/assets/index.ts
function assets(options) {
  return [build(options), serve(options)];
}

// src/config/index.ts
var import_path9 = __toESM(require("path"));
function config(resolvedOptions) {
  return {
    name: "foundryvtt:config",
    config(config2, _env) {
      config2.publicDir ??= "../public";
      config2.build ??= {};
      config2.build.rolldownOptions ??= {};
      if (config2.build.rolldownOptions.input) {
        if (typeof config2.build.rolldownOptions.input === "string") {
          const original = config2.build.rolldownOptions.input;
          config2.build.rolldownOptions.input = {};
          const { name } = import_path9.default.posix.parse(original);
          config2.build.rolldownOptions.input[name] = original;
        } else if (Array.isArray(config2.build.rolldownOptions.input)) {
          const original = config2.build.rolldownOptions.input;
          config2.build.rolldownOptions.input = {};
          for (const item of original) {
            const { name } = import_path9.default.posix.parse(item);
            config2.build.rolldownOptions.input[name] = item;
          }
        }
      }
      const input = [...resolvedOptions.manifest.esmodules, ...resolvedOptions.manifest.scripts].reduce(
        (acc, file) => {
          const { dir, name } = import_path9.default.posix.parse(file);
          const key = import_path9.default.posix.join(dir, name);
          acc[key] = key;
          return acc;
        },
        {}
      );
      config2.build.rolldownOptions.input = {
        ...config2.build.rolldownOptions.input,
        ...input
      };
      if (config2.build.rolldownOptions.output && !Array.isArray(config2.build.rolldownOptions.output)) {
        const original = config2.build.rolldownOptions.output;
        config2.build.rolldownOptions.output = [];
        config2.build.rolldownOptions.output.push(original);
      } else {
        config2.build.rolldownOptions.output = [];
      }
      config2.build.rolldownOptions.output.push({
        format: "esm",
        preserveModules: true,
        assetFileNames: (chunkInfo) => {
          if (chunkInfo.name) {
            const { dir } = import_path9.default.posix.parse(chunkInfo.originalFileName ?? chunkInfo.name);
            return import_path9.default.posix.join(dir, "[name][extname]");
          }
          return "[name][extname]";
        },
        entryFileNames: "[name].mjs",
        cssEntryFileNames: "[name].css"
      });
      const prefixUrl = `/${resolvedOptions.manifestType}s/${resolvedOptions.manifest.id}/`;
      config2.base = prefixUrl;
      config2.server ??= {};
      config2.server.port = 30001;
      config2.server.proxy ??= {};
      config2.server.proxy[`^(?!${prefixUrl})`] = "http://localhost:30000/";
      config2.server.proxy["/socket.io"] = {
        target: "ws://localhost:30000",
        ws: true
      };
    }
  };
}

// src/entryScripts/index.ts
var import_fs_extra5 = __toESM(require("fs-extra"));
var import_path10 = __toESM(require("path"));
function entryScripts(_resolvedOptions) {
  let resolvedConfig;
  let outDir;
  return {
    name: "foundryvtt:create-entry-script:serve",
    apply: "serve",
    configResolved(_config) {
      resolvedConfig = _config;
      outDir = import_path10.default.resolve(resolvedConfig.root, resolvedConfig.build.outDir);
    },
    buildStart: async () => {
      const message = "This file is for a running vite dev server and is not copied to a build";
      await import_fs_extra5.default.ensureDir(outDir);
      await import_fs_extra5.default.writeFile(import_path10.default.resolve(outDir, "index.mjs"), `/* ${message} */
import './index.ts';
`);
      await import_fs_extra5.default.writeFile(import_path10.default.resolve(outDir, "styles.css"), `/* ${message} */
`);
    },
    buildEnd: async () => {
      await import_fs_extra5.default.remove(import_path10.default.resolve(outDir, "index.mjs"));
    }
  };
}

// src/manifest/build.ts
var import_path12 = __toESM(require("path"));
var import_picocolors3 = __toESM(require("picocolors"));

// src/manifest/_utils.ts
var import_path11 = __toESM(require("path"));
async function resolveOptions(options, root) {
  const resolvedOptions = options;
  resolvedOptions.assets = (() => {
    switch (typeof options.assets) {
      case "undefined":
        return [];
      case "object":
        return (Array.isArray(options.assets) ? options.assets : [options.assets]).map((o) => ({
          assetType: o.assetType || "",
          copyToOutDir: !!o.copyToOutDir,
          exclude: Array.isArray(o.exclude) ? o.exclude : [...o.exclude || []],
          pattern: Array.isArray(o.pattern) ? o.pattern : [...o.pattern || []],
          reload: typeof o.reload === "string" ? o.reload : false,
          rename: o.rename,
          serve: !!o.serve
        }));
      default:
        throw new Error("Invalid assets options");
    }
  })();
  resolvedOptions.assets = [...resolvedOptions.assets, ...defaultAssetsOptions];
  resolvedOptions.manifestPath = options.manifestPath ?? findManifest(root);
  resolvedOptions.manifestType = resolvedOptions.manifestPath.indexOf("module.") >= 0 ? "module" : "system";
  resolvedOptions.manifest = await loadFile(resolvedOptions.manifestPath);
  options.variables = options.variables || {};
  options.variables["ID"] = resolvedOptions.manifest.id;
  options.variables["VERSION"] = resolvedOptions.manifest.version;
  options.variables["TITLE"] = resolvedOptions.manifest.title;
  const variables = options.variables;
  delete options.variables;
  resolvedOptions.replace = (source) => {
    for (const [variable, value] of Object.entries(variables)) {
      source = source.replaceAll(`$${variable}$`, value);
    }
    return source;
  };
  return true;
}
function resolveManifest(manifest2, config2) {
  const resolvedManifest = { ...manifest2 };
  const scriptFileNames = createFunction(config2.build?.rolldownOptions?.output, "entryFileNames") ?? createFunction(config2.build?.rolldownOptions?.output, "chunkFileNames") ?? ((name, extname2) => `${name}${extname2}`);
  const styleFileNames = createFunction(config2.build?.rolldownOptions?.output, "cssEntryFileNames") ?? createFunction(config2.build?.rolldownOptions?.output, "cssChunkFileNames") ?? createFunction(config2.build?.rolldownOptions?.output, "chunkFileNames") ?? ((name, extname2) => `${name}${extname2}`);
  resolvedManifest.esmodules = manifest2.esmodules.map((fileName) => {
    fileName = useInputName(fileName, config2);
    const { dir, name, ext } = import_path11.default.parse(fileName);
    fileName = import_path11.default.posix.join(dir, scriptFileNames(name, ext));
    if (fileName.endsWith(".ts")) {
      return fileName.replace(/\.ts$/, ".js");
    }
    return fileName;
  });
  resolvedManifest.scripts = manifest2.scripts.map((fileName) => {
    fileName = useInputName(fileName, config2);
    const { dir, name, ext } = import_path11.default.parse(fileName);
    fileName = import_path11.default.posix.join(dir, scriptFileNames(name, ext));
    if (fileName.endsWith(".ts")) {
      return fileName.replace(/\.ts$/, ".js");
    }
    return fileName;
  });
  resolvedManifest.styles = manifest2.styles.map((fileName) => {
    fileName = useInputName(fileName, config2);
    const { dir, name, ext } = import_path11.default.parse(fileName);
    fileName = import_path11.default.posix.join(dir, styleFileNames(name, ext));
    if (fileName.endsWith(".scss")) {
      return fileName.replace(/\.scss$/, ".css");
    }
    if (fileName.endsWith(".sass")) {
      return fileName.replace(/\.sass$/, ".css");
    }
    if (fileName.endsWith(".less")) {
      return fileName.replace(/\.less$/, ".css");
    }
    return fileName;
  });
  resolvedManifest.languages = manifest2.languages.map((lang) => ({
    ...lang,
    path: lang.path.replace(/\.ya?ml$/, ".json")
  }));
  return resolvedManifest;
}
function useInputName(fileName, config2) {
  if (config2.build?.rolldownOptions?.input) {
    const input = Object.entries(config2.build.rolldownOptions.input);
    const name = input.find(([_, value]) => value === fileName)?.[0];
    const { ext } = import_path11.default.parse(fileName);
    return name ? name + ext : fileName;
  }
  return fileName;
}
function createFunction(output, key) {
  if (!output) return (name, extname2) => `${name}${extname2}`;
  const config2 = Array.isArray(output) ? output.find((o) => key in o)?.[key] : output[key];
  if (!config2) return void 0;
  if (typeof config2 === "string") {
    return (name, extname2) => config2.replace("[name]", name).replace("[extname]", extname2);
  }
  if (typeof config2 === "function") {
    return (name, _extname) => config2({ name });
  }
  return void 0;
}
var defaultAssetsOptions = [
  {
    assetType: "language",
    pattern: ["**/*.json", "**/*.yml", "**/*.yaml"],
    exclude: ["system.*", "module.*", "package.json", "tsconfig.*", "packs/**"],
    copyToOutDir: true,
    serve: true,
    reload: false,
    rename: (name) => name.replace(/\.(yml|yaml)$/, ".json")
  },
  {
    assetType: "template",
    pattern: ["**/*.hbs", "**/*.htm", "**/*.html"],
    exclude: [],
    copyToOutDir: true,
    serve: false,
    reload: "template",
    rename: void 0
  }
];

// src/manifest/build.ts
function build2(options) {
  const resolvedOptions = options;
  return {
    name: "foundryvtt:manifest:build",
    apply: "build",
    async config(config2, _env) {
      await resolveOptions(options, config2.root || process.cwd());
      resolvedOptions.manifest = resolveManifest(resolvedOptions.manifest, config2);
    },
    configResolved(config2) {
      config2.logger.info(import_picocolors3.default.white("Using manifest: ") + import_picocolors3.default.green(resolvedOptions.manifestPath));
    },
    generateBundle() {
      const manifestSource = JSON.stringify(resolvedOptions.manifest, null, 2);
      const { name } = import_path12.default.parse(resolvedOptions.manifestPath);
      this.emitFile({
        type: "asset",
        name,
        fileName: `${name}.json`,
        originalFileName: resolvedOptions.manifestPath,
        source: manifestSource
      });
    }
  };
}

// src/manifest/serve.ts
var import_fs_extra6 = __toESM(require("fs-extra"));
var import_path13 = __toESM(require("path"));
var import_picocolors4 = __toESM(require("picocolors"));
function serve2(options) {
  const resolvedOptions = options;
  let resolvedConfig;
  let outDir;
  return {
    name: "foundryvtt:manifest:serve",
    apply: "serve",
    async config(config2, _env) {
      await resolveOptions(options, config2.root || process.cwd());
      resolvedOptions.manifest = resolveManifest(resolvedOptions.manifest, config2);
    },
    configResolved(config2) {
      resolvedConfig = config2;
      const srcDir = resolvedConfig.root;
      outDir = import_path13.default.resolve(srcDir, resolvedConfig.build.outDir);
      config2.logger.info(import_picocolors4.default.white("Using manifest: ") + import_picocolors4.default.green(resolvedOptions.manifestPath));
    },
    configureServer: async () => {
      const manifestSource = JSON.stringify(resolvedOptions.manifest, null, 2);
      const { name } = import_path13.default.parse(resolvedOptions.manifestPath);
      await import_fs_extra6.default.ensureDir(outDir);
      await import_fs_extra6.default.writeFile(import_path13.default.resolve(outDir, `${name}.json`), manifestSource);
    }
  };
}

// src/manifest/index.ts
function manifest(options) {
  return [build2(options), serve2(options)];
}

// src/index.ts
var foundryvtt = async (options = {}) => {
  return [
    manifest(options),
    config(options),
    entryScripts(options),
    assets(options)
  ];
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  foundryvtt
});
