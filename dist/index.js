"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
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

// node_modules/.pnpm/level-supports@6.2.0/node_modules/level-supports/index.js
var require_level_supports = __commonJS({
  "node_modules/.pnpm/level-supports@6.2.0/node_modules/level-supports/index.js"(exports2) {
    "use strict";
    exports2.supports = function supports(...manifests) {
      const manifest2 = manifests.reduce((acc, m) => Object.assign(acc, m), {});
      const implicitSnapshots = manifest2.implicitSnapshots || manifest2.snapshots || false;
      const explicitSnapshots = manifest2.explicitSnapshots || false;
      return Object.assign(manifest2, {
        implicitSnapshots,
        explicitSnapshots,
        snapshots: implicitSnapshots,
        has: manifest2.has || false,
        permanence: manifest2.permanence || false,
        seek: manifest2.seek || false,
        createIfMissing: manifest2.createIfMissing || false,
        errorIfExists: manifest2.errorIfExists || false,
        deferredOpen: manifest2.deferredOpen || false,
        streams: manifest2.streams || false,
        encodings: Object.assign({}, manifest2.encodings),
        events: Object.assign({}, manifest2.events),
        additionalMethods: Object.assign({}, manifest2.additionalMethods),
        signals: Object.assign({}, manifest2.signals)
      });
    };
  }
});

// node_modules/.pnpm/module-error@1.0.2/node_modules/module-error/index.js
var require_module_error = __commonJS({
  "node_modules/.pnpm/module-error@1.0.2/node_modules/module-error/index.js"(exports2, module2) {
    "use strict";
    module2.exports = class ModuleError extends Error {
      /**
       * @param {string} message Error message
       * @param {{ code?: string, cause?: Error, expected?: boolean, transient?: boolean }} [options]
       */
      constructor(message, options) {
        super(message || "");
        if (typeof options === "object" && options !== null) {
          if (options.code) this.code = String(options.code);
          if (options.expected) this.expected = true;
          if (options.transient) this.transient = true;
          if (options.cause) this.cause = options.cause;
        }
        if (Error.captureStackTrace) {
          Error.captureStackTrace(this, this.constructor);
        }
      }
    };
  }
});

// node_modules/.pnpm/level-transcoder@1.0.1/node_modules/level-transcoder/lib/text-endec.js
var require_text_endec = __commonJS({
  "node_modules/.pnpm/level-transcoder@1.0.1/node_modules/level-transcoder/lib/text-endec.js"(exports2, module2) {
    "use strict";
    var lazy = null;
    module2.exports = function() {
      if (lazy === null) {
        lazy = {
          textEncoder: new TextEncoder(),
          textDecoder: new TextDecoder()
        };
      }
      return lazy;
    };
  }
});

// node_modules/.pnpm/level-transcoder@1.0.1/node_modules/level-transcoder/lib/encoding.js
var require_encoding = __commonJS({
  "node_modules/.pnpm/level-transcoder@1.0.1/node_modules/level-transcoder/lib/encoding.js"(exports2) {
    "use strict";
    var ModuleError = require_module_error();
    var formats = /* @__PURE__ */ new Set(["buffer", "view", "utf8"]);
    var Encoding = class {
      /**
       * @param {IEncoding<TIn,TFormat,TOut>} options
       */
      constructor(options) {
        this.encode = options.encode || this.encode;
        this.decode = options.decode || this.decode;
        this.name = options.name || this.name;
        this.format = options.format || this.format;
        if (typeof this.encode !== "function") {
          throw new TypeError("The 'encode' property must be a function");
        }
        if (typeof this.decode !== "function") {
          throw new TypeError("The 'decode' property must be a function");
        }
        this.encode = this.encode.bind(this);
        this.decode = this.decode.bind(this);
        if (typeof this.name !== "string" || this.name === "") {
          throw new TypeError("The 'name' property must be a string");
        }
        if (typeof this.format !== "string" || !formats.has(this.format)) {
          throw new TypeError("The 'format' property must be one of 'buffer', 'view', 'utf8'");
        }
        if (options.createViewTranscoder) {
          this.createViewTranscoder = options.createViewTranscoder;
        }
        if (options.createBufferTranscoder) {
          this.createBufferTranscoder = options.createBufferTranscoder;
        }
        if (options.createUTF8Transcoder) {
          this.createUTF8Transcoder = options.createUTF8Transcoder;
        }
      }
      get commonName() {
        return (
          /** @type {string} */
          this.name.split("+")[0]
        );
      }
      /** @return {BufferFormat<TIn,TOut>} */
      createBufferTranscoder() {
        throw new ModuleError(`Encoding '${this.name}' cannot be transcoded to 'buffer'`, {
          code: "LEVEL_ENCODING_NOT_SUPPORTED"
        });
      }
      /** @return {ViewFormat<TIn,TOut>} */
      createViewTranscoder() {
        throw new ModuleError(`Encoding '${this.name}' cannot be transcoded to 'view'`, {
          code: "LEVEL_ENCODING_NOT_SUPPORTED"
        });
      }
      /** @return {UTF8Format<TIn,TOut>} */
      createUTF8Transcoder() {
        throw new ModuleError(`Encoding '${this.name}' cannot be transcoded to 'utf8'`, {
          code: "LEVEL_ENCODING_NOT_SUPPORTED"
        });
      }
    };
    exports2.Encoding = Encoding;
  }
});

// node_modules/.pnpm/level-transcoder@1.0.1/node_modules/level-transcoder/lib/formats.js
var require_formats = __commonJS({
  "node_modules/.pnpm/level-transcoder@1.0.1/node_modules/level-transcoder/lib/formats.js"(exports2) {
    "use strict";
    var { Buffer: Buffer2 } = require("buffer") || {};
    var { Encoding } = require_encoding();
    var textEndec = require_text_endec();
    var BufferFormat = class extends Encoding {
      /**
       * @param {Omit<IEncoding<TIn, Buffer, TOut>, 'format'>} options
       */
      constructor(options) {
        super({ ...options, format: "buffer" });
      }
      /** @override */
      createViewTranscoder() {
        return new ViewFormat({
          encode: this.encode,
          // Buffer is a view (UInt8Array)
          decode: (data) => this.decode(
            Buffer2.from(data.buffer, data.byteOffset, data.byteLength)
          ),
          name: `${this.name}+view`
        });
      }
      /** @override */
      createBufferTranscoder() {
        return this;
      }
    };
    var ViewFormat = class extends Encoding {
      /**
       * @param {Omit<IEncoding<TIn, Uint8Array, TOut>, 'format'>} options
       */
      constructor(options) {
        super({ ...options, format: "view" });
      }
      /** @override */
      createBufferTranscoder() {
        return new BufferFormat({
          encode: (data) => {
            const view = this.encode(data);
            return Buffer2.from(view.buffer, view.byteOffset, view.byteLength);
          },
          decode: this.decode,
          // Buffer is a view (UInt8Array)
          name: `${this.name}+buffer`
        });
      }
      /** @override */
      createViewTranscoder() {
        return this;
      }
    };
    var UTF8Format = class extends Encoding {
      /**
       * @param {Omit<IEncoding<TIn, string, TOut>, 'format'>} options
       */
      constructor(options) {
        super({ ...options, format: "utf8" });
      }
      /** @override */
      createBufferTranscoder() {
        return new BufferFormat({
          encode: (data) => Buffer2.from(this.encode(data), "utf8"),
          decode: (data) => this.decode(data.toString("utf8")),
          name: `${this.name}+buffer`
        });
      }
      /** @override */
      createViewTranscoder() {
        const { textEncoder, textDecoder } = textEndec();
        return new ViewFormat({
          encode: (data) => textEncoder.encode(this.encode(data)),
          decode: (data) => this.decode(textDecoder.decode(data)),
          name: `${this.name}+view`
        });
      }
      /** @override */
      createUTF8Transcoder() {
        return this;
      }
    };
    exports2.BufferFormat = BufferFormat;
    exports2.ViewFormat = ViewFormat;
    exports2.UTF8Format = UTF8Format;
  }
});

// node_modules/.pnpm/level-transcoder@1.0.1/node_modules/level-transcoder/lib/encodings.js
var require_encodings = __commonJS({
  "node_modules/.pnpm/level-transcoder@1.0.1/node_modules/level-transcoder/lib/encodings.js"(exports2) {
    "use strict";
    var { Buffer: Buffer2 } = require("buffer") || { Buffer: { isBuffer: () => false } };
    var { textEncoder, textDecoder } = require_text_endec()();
    var { BufferFormat, ViewFormat, UTF8Format } = require_formats();
    var identity = (v) => v;
    exports2.utf8 = new UTF8Format({
      encode: function(data) {
        return Buffer2.isBuffer(data) ? data.toString("utf8") : ArrayBuffer.isView(data) ? textDecoder.decode(data) : String(data);
      },
      decode: identity,
      name: "utf8",
      createViewTranscoder() {
        return new ViewFormat({
          encode: function(data) {
            return ArrayBuffer.isView(data) ? data : textEncoder.encode(data);
          },
          decode: function(data) {
            return textDecoder.decode(data);
          },
          name: `${this.name}+view`
        });
      },
      createBufferTranscoder() {
        return new BufferFormat({
          encode: function(data) {
            return Buffer2.isBuffer(data) ? data : ArrayBuffer.isView(data) ? Buffer2.from(data.buffer, data.byteOffset, data.byteLength) : Buffer2.from(String(data), "utf8");
          },
          decode: function(data) {
            return data.toString("utf8");
          },
          name: `${this.name}+buffer`
        });
      }
    });
    exports2.json = new UTF8Format({
      encode: JSON.stringify,
      decode: JSON.parse,
      name: "json"
    });
    exports2.buffer = new BufferFormat({
      encode: function(data) {
        return Buffer2.isBuffer(data) ? data : ArrayBuffer.isView(data) ? Buffer2.from(data.buffer, data.byteOffset, data.byteLength) : Buffer2.from(String(data), "utf8");
      },
      decode: identity,
      name: "buffer",
      createViewTranscoder() {
        return new ViewFormat({
          encode: function(data) {
            return ArrayBuffer.isView(data) ? data : Buffer2.from(String(data), "utf8");
          },
          decode: function(data) {
            return Buffer2.from(data.buffer, data.byteOffset, data.byteLength);
          },
          name: `${this.name}+view`
        });
      }
    });
    exports2.view = new ViewFormat({
      encode: function(data) {
        return ArrayBuffer.isView(data) ? data : textEncoder.encode(data);
      },
      decode: identity,
      name: "view",
      createBufferTranscoder() {
        return new BufferFormat({
          encode: function(data) {
            return Buffer2.isBuffer(data) ? data : ArrayBuffer.isView(data) ? Buffer2.from(data.buffer, data.byteOffset, data.byteLength) : Buffer2.from(String(data), "utf8");
          },
          decode: identity,
          name: `${this.name}+buffer`
        });
      }
    });
    exports2.hex = new BufferFormat({
      encode: function(data) {
        return Buffer2.isBuffer(data) ? data : Buffer2.from(String(data), "hex");
      },
      decode: function(buffer) {
        return buffer.toString("hex");
      },
      name: "hex"
    });
    exports2.base64 = new BufferFormat({
      encode: function(data) {
        return Buffer2.isBuffer(data) ? data : Buffer2.from(String(data), "base64");
      },
      decode: function(buffer) {
        return buffer.toString("base64");
      },
      name: "base64"
    });
  }
});

// node_modules/.pnpm/level-transcoder@1.0.1/node_modules/level-transcoder/index.js
var require_level_transcoder = __commonJS({
  "node_modules/.pnpm/level-transcoder@1.0.1/node_modules/level-transcoder/index.js"(exports2) {
    "use strict";
    var ModuleError = require_module_error();
    var encodings = require_encodings();
    var { Encoding } = require_encoding();
    var { BufferFormat, ViewFormat, UTF8Format } = require_formats();
    var kFormats = Symbol("formats");
    var kEncodings = Symbol("encodings");
    var validFormats = /* @__PURE__ */ new Set(["buffer", "view", "utf8"]);
    var Transcoder = class {
      /**
       * @param {Array<'buffer'|'view'|'utf8'>} formats
       */
      constructor(formats) {
        if (!Array.isArray(formats)) {
          throw new TypeError("The first argument 'formats' must be an array");
        } else if (!formats.every((f) => validFormats.has(f))) {
          throw new TypeError("Format must be one of 'buffer', 'view', 'utf8'");
        }
        this[kEncodings] = /* @__PURE__ */ new Map();
        this[kFormats] = new Set(formats);
        for (const k in encodings) {
          try {
            this.encoding(k);
          } catch (err) {
            if (err.code !== "LEVEL_ENCODING_NOT_SUPPORTED") throw err;
          }
        }
      }
      /**
       * @returns {Array<Encoding<any,T,any>>}
       */
      encodings() {
        return Array.from(new Set(this[kEncodings].values()));
      }
      /**
       * @param {string|MixedEncoding<any, any, any>} encoding
       * @returns {Encoding<any, T, any>}
       */
      encoding(encoding) {
        let resolved = this[kEncodings].get(encoding);
        if (resolved === void 0) {
          if (typeof encoding === "string" && encoding !== "") {
            resolved = lookup2[encoding];
            if (!resolved) {
              throw new ModuleError(`Encoding '${encoding}' is not found`, {
                code: "LEVEL_ENCODING_NOT_FOUND"
              });
            }
          } else if (typeof encoding !== "object" || encoding === null) {
            throw new TypeError("First argument 'encoding' must be a string or object");
          } else {
            resolved = from(encoding);
          }
          const { name, format } = resolved;
          if (!this[kFormats].has(format)) {
            if (this[kFormats].has("view")) {
              resolved = resolved.createViewTranscoder();
            } else if (this[kFormats].has("buffer")) {
              resolved = resolved.createBufferTranscoder();
            } else if (this[kFormats].has("utf8")) {
              resolved = resolved.createUTF8Transcoder();
            } else {
              throw new ModuleError(`Encoding '${name}' cannot be transcoded`, {
                code: "LEVEL_ENCODING_NOT_SUPPORTED"
              });
            }
          }
          for (const k of [encoding, name, resolved.name, resolved.commonName]) {
            this[kEncodings].set(k, resolved);
          }
        }
        return resolved;
      }
    };
    exports2.Transcoder = Transcoder;
    function from(options) {
      if (options instanceof Encoding) {
        return options;
      }
      const maybeType = "type" in options && typeof options.type === "string" ? options.type : void 0;
      const name = options.name || maybeType || `anonymous-${anonymousCount++}`;
      switch (detectFormat(options)) {
        case "view":
          return new ViewFormat({ ...options, name });
        case "utf8":
          return new UTF8Format({ ...options, name });
        case "buffer":
          return new BufferFormat({ ...options, name });
        default: {
          throw new TypeError("Format must be one of 'buffer', 'view', 'utf8'");
        }
      }
    }
    function detectFormat(options) {
      if ("format" in options && options.format !== void 0) {
        return options.format;
      } else if ("buffer" in options && typeof options.buffer === "boolean") {
        return options.buffer ? "buffer" : "utf8";
      } else if ("code" in options && Number.isInteger(options.code)) {
        return "view";
      } else {
        return "buffer";
      }
    }
    var aliases = {
      binary: encodings.buffer,
      "utf-8": encodings.utf8
    };
    var lookup2 = {
      ...encodings,
      ...aliases
    };
    var anonymousCount = 0;
  }
});

// node_modules/.pnpm/maybe-combine-errors@1.0.0/node_modules/maybe-combine-errors/index.js
var require_maybe_combine_errors = __commonJS({
  "node_modules/.pnpm/maybe-combine-errors@1.0.0/node_modules/maybe-combine-errors/index.js"(exports2, module2) {
    "use strict";
    var kErrors = Symbol("kErrors");
    module2.exports = function(errors) {
      errors = errors.filter(defined);
      if (errors.length === 0) return;
      if (errors.length === 1) return errors[0];
      return new CombinedError(errors);
    };
    var CombinedError = class extends Error {
      constructor(errors) {
        const unique = new Set(errors.map(getMessage).filter(Boolean));
        const message = Array.from(unique).join("; ");
        super(message);
        value(this, "name", "CombinedError");
        value(this, kErrors, errors);
        getter(this, "stack", () => errors.map(getStack).join("\n\n"));
        getter(this, "transient", () => errors.length > 0 && errors.every(transient));
        getter(this, "expected", () => errors.length > 0 && errors.every(expected));
      }
      [Symbol.iterator]() {
        return this[kErrors][Symbol.iterator]();
      }
    };
    function value(obj, prop, value2) {
      Object.defineProperty(obj, prop, { value: value2 });
    }
    function getter(obj, prop, get) {
      Object.defineProperty(obj, prop, { get });
    }
    function defined(err) {
      return err != null;
    }
    function getMessage(err) {
      return err.message;
    }
    function getStack(err) {
      return err.stack;
    }
    function transient(err) {
      return err.transient === true;
    }
    function expected(err) {
      return err.expected === true;
    }
  }
});

// node_modules/.pnpm/abstract-level@2.0.2/node_modules/abstract-level/lib/common.js
var require_common = __commonJS({
  "node_modules/.pnpm/abstract-level@2.0.2/node_modules/abstract-level/lib/common.js"(exports2) {
    "use strict";
    var ModuleError = require_module_error();
    var deprecations = /* @__PURE__ */ new Set();
    exports2.getOptions = function(options, def) {
      if (typeof options === "object" && options !== null) {
        return options;
      }
      if (def !== void 0) {
        return def;
      }
      return {};
    };
    exports2.emptyOptions = Object.freeze({});
    exports2.noop = function() {
    };
    exports2.resolvedPromise = Promise.resolve();
    exports2.deprecate = function(message) {
      if (!deprecations.has(message)) {
        deprecations.add(message);
        const c = globalThis.console;
        if (typeof c !== "undefined" && typeof c.warn === "function") {
          c.warn(new ModuleError(message, { code: "LEVEL_LEGACY" }));
        }
      }
    };
  }
});

// node_modules/.pnpm/abstract-level@2.0.2/node_modules/abstract-level/lib/errors.js
var require_errors = __commonJS({
  "node_modules/.pnpm/abstract-level@2.0.2/node_modules/abstract-level/lib/errors.js"(exports2) {
    "use strict";
    var ModuleError = require_module_error();
    var AbortError = class extends ModuleError {
      constructor(cause) {
        super("Operation has been aborted", {
          code: "LEVEL_ABORTED",
          cause
        });
      }
      // Set name to AbortError for web compatibility. See:
      // https://dom.spec.whatwg.org/#aborting-ongoing-activities
      // https://github.com/nodejs/node/pull/35911#discussion_r515779306
      get name() {
        return "AbortError";
      }
    };
    exports2.AbortError = AbortError;
  }
});

// node_modules/.pnpm/abstract-level@2.0.2/node_modules/abstract-level/abstract-iterator.js
var require_abstract_iterator = __commonJS({
  "node_modules/.pnpm/abstract-level@2.0.2/node_modules/abstract-level/abstract-iterator.js"(exports2) {
    "use strict";
    var ModuleError = require_module_error();
    var combineErrors = require_maybe_combine_errors();
    var { getOptions, emptyOptions, noop } = require_common();
    var { AbortError } = require_errors();
    var kWorking = Symbol("working");
    var kDecodeOne = Symbol("decodeOne");
    var kDecodeMany = Symbol("decodeMany");
    var kSignal = Symbol("signal");
    var kPendingClose = Symbol("pendingClose");
    var kClosingPromise = Symbol("closingPromise");
    var kKeyEncoding = Symbol("keyEncoding");
    var kValueEncoding = Symbol("valueEncoding");
    var kKeys = Symbol("keys");
    var kValues = Symbol("values");
    var kLimit = Symbol("limit");
    var kCount = Symbol("count");
    var kEnded = Symbol("ended");
    var CommonIterator = class {
      constructor(db, options) {
        if (typeof db !== "object" || db === null) {
          const hint = db === null ? "null" : typeof db;
          throw new TypeError(`The first argument must be an abstract-level database, received ${hint}`);
        }
        if (typeof options !== "object" || options === null) {
          throw new TypeError("The second argument must be an options object");
        }
        this[kWorking] = false;
        this[kPendingClose] = null;
        this[kClosingPromise] = null;
        this[kKeyEncoding] = options[kKeyEncoding];
        this[kValueEncoding] = options[kValueEncoding];
        this[kLimit] = Number.isInteger(options.limit) && options.limit >= 0 ? options.limit : Infinity;
        this[kCount] = 0;
        this[kSignal] = options.signal != null ? options.signal : null;
        this[kEnded] = false;
        this.db = db;
        this.db.attachResource(this);
      }
      get count() {
        return this[kCount];
      }
      get limit() {
        return this[kLimit];
      }
      async next() {
        startWork(this);
        try {
          if (this[kEnded] || this[kCount] >= this[kLimit]) {
            this[kEnded] = true;
            return void 0;
          }
          let item = await this._next();
          if (item === void 0) {
            this[kEnded] = true;
            return void 0;
          }
          try {
            item = this[kDecodeOne](item);
          } catch (err) {
            throw new IteratorDecodeError(err);
          }
          this[kCount]++;
          return item;
        } finally {
          endWork(this);
        }
      }
      async _next() {
      }
      async nextv(size, options) {
        if (!Number.isInteger(size)) {
          throw new TypeError("The first argument 'size' must be an integer");
        }
        options = getOptions(options, emptyOptions);
        if (size < 1) size = 1;
        if (this[kLimit] < Infinity) size = Math.min(size, this[kLimit] - this[kCount]);
        startWork(this);
        try {
          if (this[kEnded] || size <= 0) {
            this[kEnded] = true;
            return [];
          }
          const items = await this._nextv(size, options);
          if (items.length === 0) {
            this[kEnded] = true;
            return items;
          }
          try {
            this[kDecodeMany](items);
          } catch (err) {
            throw new IteratorDecodeError(err);
          }
          this[kCount] += items.length;
          return items;
        } finally {
          endWork(this);
        }
      }
      async _nextv(size, options) {
        const acc = [];
        while (acc.length < size) {
          const item = await this._next(options);
          if (item !== void 0) {
            acc.push(item);
          } else {
            this[kEnded] = true;
            break;
          }
        }
        return acc;
      }
      async all(options) {
        options = getOptions(options, emptyOptions);
        startWork(this);
        try {
          if (this[kEnded] || this[kCount] >= this[kLimit]) {
            return [];
          }
          const items = await this._all(options);
          try {
            this[kDecodeMany](items);
          } catch (err) {
            throw new IteratorDecodeError(err);
          }
          this[kCount] += items.length;
          return items;
        } catch (err) {
          endWork(this);
          await destroy(this, err);
        } finally {
          this[kEnded] = true;
          if (this[kWorking]) {
            endWork(this);
            await this.close();
          }
        }
      }
      async _all(options) {
        let count = this[kCount];
        const acc = [];
        while (true) {
          const size = this[kLimit] < Infinity ? Math.min(1e3, this[kLimit] - count) : 1e3;
          if (size <= 0) {
            return acc;
          }
          const items = await this._nextv(size, options);
          if (items.length === 0) {
            return acc;
          }
          acc.push.apply(acc, items);
          count += items.length;
        }
      }
      seek(target, options) {
        options = getOptions(options, emptyOptions);
        if (this[kClosingPromise] !== null) {
        } else if (this[kWorking]) {
          throw new ModuleError("Iterator is busy: cannot call seek() until next() has completed", {
            code: "LEVEL_ITERATOR_BUSY"
          });
        } else {
          const keyEncoding = this.db.keyEncoding(options.keyEncoding || this[kKeyEncoding]);
          const keyFormat = keyEncoding.format;
          if (options.keyEncoding !== keyFormat) {
            options = { ...options, keyEncoding: keyFormat };
          }
          const mapped = this.db.prefixKey(keyEncoding.encode(target), keyFormat, false);
          this._seek(mapped, options);
          this[kEnded] = false;
        }
      }
      _seek(target, options) {
        throw new ModuleError("Iterator does not support seek()", {
          code: "LEVEL_NOT_SUPPORTED"
        });
      }
      async close() {
        if (this[kClosingPromise] !== null) {
          return this[kClosingPromise].catch(noop);
        }
        this[kClosingPromise] = new Promise((resolve, reject) => {
          this[kPendingClose] = () => {
            this[kPendingClose] = null;
            privateClose(this).then(resolve, reject);
          };
        });
        if (!this[kWorking]) {
          this[kPendingClose]();
        }
        return this[kClosingPromise];
      }
      async _close() {
      }
      async *[Symbol.asyncIterator]() {
        try {
          let item;
          while ((item = await this.next()) !== void 0) {
            yield item;
          }
        } catch (err) {
          await destroy(this, err);
        } finally {
          await this.close();
        }
      }
    };
    var AbstractIterator = class extends CommonIterator {
      constructor(db, options) {
        super(db, options);
        this[kKeys] = options.keys !== false;
        this[kValues] = options.values !== false;
      }
      [kDecodeOne](entry) {
        const key = entry[0];
        const value = entry[1];
        if (key !== void 0) {
          entry[0] = this[kKeys] ? this[kKeyEncoding].decode(key) : void 0;
        }
        if (value !== void 0) {
          entry[1] = this[kValues] ? this[kValueEncoding].decode(value) : void 0;
        }
        return entry;
      }
      [kDecodeMany](entries) {
        const keyEncoding = this[kKeyEncoding];
        const valueEncoding = this[kValueEncoding];
        for (const entry of entries) {
          const key = entry[0];
          const value = entry[1];
          if (key !== void 0) entry[0] = this[kKeys] ? keyEncoding.decode(key) : void 0;
          if (value !== void 0) entry[1] = this[kValues] ? valueEncoding.decode(value) : void 0;
        }
      }
    };
    var AbstractKeyIterator = class extends CommonIterator {
      [kDecodeOne](key) {
        return this[kKeyEncoding].decode(key);
      }
      [kDecodeMany](keys) {
        const keyEncoding = this[kKeyEncoding];
        for (let i = 0; i < keys.length; i++) {
          const key = keys[i];
          if (key !== void 0) keys[i] = keyEncoding.decode(key);
        }
      }
    };
    var AbstractValueIterator = class extends CommonIterator {
      [kDecodeOne](value) {
        return this[kValueEncoding].decode(value);
      }
      [kDecodeMany](values) {
        const valueEncoding = this[kValueEncoding];
        for (let i = 0; i < values.length; i++) {
          const value = values[i];
          if (value !== void 0) values[i] = valueEncoding.decode(value);
        }
      }
    };
    var IteratorDecodeError = class extends ModuleError {
      constructor(cause) {
        super("Iterator could not decode data", {
          code: "LEVEL_DECODE_ERROR",
          cause
        });
      }
    };
    var startWork = function(iterator) {
      if (iterator[kClosingPromise] !== null) {
        throw new ModuleError("Iterator is not open: cannot read after close()", {
          code: "LEVEL_ITERATOR_NOT_OPEN"
        });
      } else if (iterator[kWorking]) {
        throw new ModuleError("Iterator is busy: cannot read until previous read has completed", {
          code: "LEVEL_ITERATOR_BUSY"
        });
      } else if (iterator[kSignal] !== null && iterator[kSignal].aborted) {
        throw new AbortError();
      }
      iterator[kWorking] = true;
    };
    var endWork = function(iterator) {
      iterator[kWorking] = false;
      if (iterator[kPendingClose] !== null) {
        iterator[kPendingClose]();
      }
    };
    var privateClose = async function(iterator) {
      await iterator._close();
      iterator.db.detachResource(iterator);
    };
    var destroy = async function(iterator, err) {
      try {
        await iterator.close();
      } catch (closeErr) {
        throw combineErrors([err, closeErr]);
      }
      throw err;
    };
    AbstractIterator.keyEncoding = kKeyEncoding;
    AbstractIterator.valueEncoding = kValueEncoding;
    exports2.AbstractIterator = AbstractIterator;
    exports2.AbstractKeyIterator = AbstractKeyIterator;
    exports2.AbstractValueIterator = AbstractValueIterator;
  }
});

// node_modules/.pnpm/abstract-level@2.0.2/node_modules/abstract-level/lib/default-kv-iterator.js
var require_default_kv_iterator = __commonJS({
  "node_modules/.pnpm/abstract-level@2.0.2/node_modules/abstract-level/lib/default-kv-iterator.js"(exports2) {
    "use strict";
    var { AbstractKeyIterator, AbstractValueIterator } = require_abstract_iterator();
    var kIterator = Symbol("iterator");
    var kHandleOne = Symbol("handleOne");
    var kHandleMany = Symbol("handleMany");
    var DefaultKeyIterator = class extends AbstractKeyIterator {
      constructor(db, options) {
        super(db, options);
        this[kIterator] = db.iterator({ ...options, keys: true, values: false });
      }
      [kHandleOne](entry) {
        return entry[0];
      }
      [kHandleMany](entries) {
        for (let i = 0; i < entries.length; i++) {
          entries[i] = entries[i][0];
        }
      }
    };
    var DefaultValueIterator = class extends AbstractValueIterator {
      constructor(db, options) {
        super(db, options);
        this[kIterator] = db.iterator({ ...options, keys: false, values: true });
      }
      [kHandleOne](entry) {
        return entry[1];
      }
      [kHandleMany](entries) {
        for (let i = 0; i < entries.length; i++) {
          entries[i] = entries[i][1];
        }
      }
    };
    for (const Iterator of [DefaultKeyIterator, DefaultValueIterator]) {
      Iterator.prototype._next = async function() {
        const entry = await this[kIterator].next();
        return entry === void 0 ? entry : this[kHandleOne](entry);
      };
      Iterator.prototype._nextv = async function(size, options) {
        const entries = await this[kIterator].nextv(size, options);
        this[kHandleMany](entries);
        return entries;
      };
      Iterator.prototype._all = async function(options) {
        const entries = await this[kIterator].all(options);
        this[kHandleMany](entries);
        return entries;
      };
      Iterator.prototype._seek = function(target, options) {
        this[kIterator].seek(target, options);
      };
      Iterator.prototype._close = async function() {
        return this[kIterator].close();
      };
    }
    exports2.DefaultKeyIterator = DefaultKeyIterator;
    exports2.DefaultValueIterator = DefaultValueIterator;
  }
});

// node_modules/.pnpm/abstract-level@2.0.2/node_modules/abstract-level/lib/deferred-iterator.js
var require_deferred_iterator = __commonJS({
  "node_modules/.pnpm/abstract-level@2.0.2/node_modules/abstract-level/lib/deferred-iterator.js"(exports2) {
    "use strict";
    var { AbstractIterator, AbstractKeyIterator, AbstractValueIterator } = require_abstract_iterator();
    var ModuleError = require_module_error();
    var kNut = Symbol("nut");
    var kUndefer = Symbol("undefer");
    var kFactory = Symbol("factory");
    var kSignalOptions = Symbol("signalOptions");
    var DeferredIterator = class extends AbstractIterator {
      constructor(db, options) {
        super(db, options);
        this[kNut] = null;
        this[kFactory] = () => db.iterator(options);
        this[kSignalOptions] = { signal: options.signal };
        this.db.defer(() => this[kUndefer](), this[kSignalOptions]);
      }
    };
    var DeferredKeyIterator = class extends AbstractKeyIterator {
      constructor(db, options) {
        super(db, options);
        this[kNut] = null;
        this[kFactory] = () => db.keys(options);
        this[kSignalOptions] = { signal: options.signal };
        this.db.defer(() => this[kUndefer](), this[kSignalOptions]);
      }
    };
    var DeferredValueIterator = class extends AbstractValueIterator {
      constructor(db, options) {
        super(db, options);
        this[kNut] = null;
        this[kFactory] = () => db.values(options);
        this[kSignalOptions] = { signal: options.signal };
        this.db.defer(() => this[kUndefer](), this[kSignalOptions]);
      }
    };
    for (const Iterator of [DeferredIterator, DeferredKeyIterator, DeferredValueIterator]) {
      Iterator.prototype[kUndefer] = function() {
        if (this.db.status === "open") {
          this[kNut] = this[kFactory]();
        }
      };
      Iterator.prototype._next = async function() {
        if (this[kNut] !== null) {
          return this[kNut].next();
        } else if (this.db.status === "opening") {
          return this.db.deferAsync(() => this._next(), this[kSignalOptions]);
        } else {
          throw new ModuleError("Iterator is not open: cannot call next() after close()", {
            code: "LEVEL_ITERATOR_NOT_OPEN"
          });
        }
      };
      Iterator.prototype._nextv = async function(size, options) {
        if (this[kNut] !== null) {
          return this[kNut].nextv(size, options);
        } else if (this.db.status === "opening") {
          return this.db.deferAsync(() => this._nextv(size, options), this[kSignalOptions]);
        } else {
          throw new ModuleError("Iterator is not open: cannot call nextv() after close()", {
            code: "LEVEL_ITERATOR_NOT_OPEN"
          });
        }
      };
      Iterator.prototype._all = async function(options) {
        if (this[kNut] !== null) {
          return this[kNut].all();
        } else if (this.db.status === "opening") {
          return this.db.deferAsync(() => this._all(options), this[kSignalOptions]);
        } else {
          throw new ModuleError("Iterator is not open: cannot call all() after close()", {
            code: "LEVEL_ITERATOR_NOT_OPEN"
          });
        }
      };
      Iterator.prototype._seek = function(target, options) {
        if (this[kNut] !== null) {
          this[kNut]._seek(target, options);
        } else if (this.db.status === "opening") {
          this.db.defer(() => this._seek(target, options), this[kSignalOptions]);
        }
      };
      Iterator.prototype._close = async function() {
        if (this[kNut] !== null) {
          return this[kNut].close();
        } else if (this.db.status === "opening") {
          return this.db.deferAsync(() => this._close());
        }
      };
    }
    exports2.DeferredIterator = DeferredIterator;
    exports2.DeferredKeyIterator = DeferredKeyIterator;
    exports2.DeferredValueIterator = DeferredValueIterator;
  }
});

// node_modules/.pnpm/abstract-level@2.0.2/node_modules/abstract-level/lib/prefixes.js
var require_prefixes = __commonJS({
  "node_modules/.pnpm/abstract-level@2.0.2/node_modules/abstract-level/lib/prefixes.js"(exports2) {
    "use strict";
    exports2.prefixDescendantKey = function(key, keyFormat, descendant, ancestor) {
      while (descendant !== null && descendant !== ancestor) {
        key = descendant.prefixKey(key, keyFormat, true);
        descendant = descendant.parent;
      }
      return key;
    };
    exports2.isDescendant = function(db, ancestor) {
      while (true) {
        if (db.parent == null) return false;
        if (db.parent === ancestor) return true;
        db = db.parent;
      }
    };
  }
});

// node_modules/.pnpm/abstract-level@2.0.2/node_modules/abstract-level/lib/prewrite-batch.js
var require_prewrite_batch = __commonJS({
  "node_modules/.pnpm/abstract-level@2.0.2/node_modules/abstract-level/lib/prewrite-batch.js"(exports2) {
    "use strict";
    var { prefixDescendantKey, isDescendant } = require_prefixes();
    var kDb = Symbol("db");
    var kPrivateOperations = Symbol("privateOperations");
    var kPublicOperations = Symbol("publicOperations");
    var PrewriteBatch = class {
      constructor(db, privateOperations, publicOperations) {
        this[kDb] = db;
        this[kPrivateOperations] = privateOperations;
        this[kPublicOperations] = publicOperations;
      }
      add(op) {
        const isPut = op.type === "put";
        const delegated = op.sublevel != null;
        const db = delegated ? op.sublevel : this[kDb];
        const keyError = db._checkKey(op.key);
        if (keyError != null) throw keyError;
        op.keyEncoding = db.keyEncoding(op.keyEncoding);
        if (isPut) {
          const valueError = db._checkValue(op.value);
          if (valueError != null) throw valueError;
          op.valueEncoding = db.valueEncoding(op.valueEncoding);
        } else if (op.type !== "del") {
          throw new TypeError("A batch operation must have a type property that is 'put' or 'del'");
        }
        const keyEncoding = op.keyEncoding;
        const preencodedKey = keyEncoding.encode(op.key);
        const keyFormat = keyEncoding.format;
        const siblings = delegated && !isDescendant(op.sublevel, this[kDb]) && op.sublevel !== this[kDb];
        const encodedKey = delegated && !siblings ? prefixDescendantKey(preencodedKey, keyFormat, db, this[kDb]) : preencodedKey;
        if (delegated && !siblings) {
          op.sublevel = null;
        }
        let publicOperation = null;
        if (this[kPublicOperations] !== null && !siblings) {
          publicOperation = Object.assign({}, op);
          publicOperation.encodedKey = encodedKey;
          if (delegated) {
            publicOperation.key = encodedKey;
            publicOperation.keyEncoding = this[kDb].keyEncoding(keyFormat);
          }
          this[kPublicOperations].push(publicOperation);
        }
        op.key = siblings ? encodedKey : this[kDb].prefixKey(encodedKey, keyFormat, true);
        op.keyEncoding = keyFormat;
        if (isPut) {
          const valueEncoding = op.valueEncoding;
          const encodedValue = valueEncoding.encode(op.value);
          const valueFormat = valueEncoding.format;
          op.value = encodedValue;
          op.valueEncoding = valueFormat;
          if (publicOperation !== null) {
            publicOperation.encodedValue = encodedValue;
            if (delegated) {
              publicOperation.value = encodedValue;
              publicOperation.valueEncoding = this[kDb].valueEncoding(valueFormat);
            }
          }
        }
        this[kPrivateOperations].push(op);
        return this;
      }
    };
    exports2.PrewriteBatch = PrewriteBatch;
  }
});

// node_modules/.pnpm/abstract-level@2.0.2/node_modules/abstract-level/abstract-chained-batch.js
var require_abstract_chained_batch = __commonJS({
  "node_modules/.pnpm/abstract-level@2.0.2/node_modules/abstract-level/abstract-chained-batch.js"(exports2) {
    "use strict";
    var combineErrors = require_maybe_combine_errors();
    var ModuleError = require_module_error();
    var { getOptions, emptyOptions, noop } = require_common();
    var { prefixDescendantKey, isDescendant } = require_prefixes();
    var { PrewriteBatch } = require_prewrite_batch();
    var kStatus = Symbol("status");
    var kPublicOperations = Symbol("publicOperations");
    var kLegacyOperations = Symbol("legacyOperations");
    var kPrivateOperations = Symbol("privateOperations");
    var kClosePromise = Symbol("closePromise");
    var kLength = Symbol("length");
    var kPrewriteRun = Symbol("prewriteRun");
    var kPrewriteBatch = Symbol("prewriteBatch");
    var kPrewriteData = Symbol("prewriteData");
    var kAddMode = Symbol("addMode");
    var AbstractChainedBatch = class {
      constructor(db, options) {
        if (typeof db !== "object" || db === null) {
          const hint = db === null ? "null" : typeof db;
          throw new TypeError(`The first argument must be an abstract-level database, received ${hint}`);
        }
        const enableWriteEvent = db.listenerCount("write") > 0;
        const enablePrewriteHook = !db.hooks.prewrite.noop;
        this[kPublicOperations] = enableWriteEvent ? [] : null;
        this[kLegacyOperations] = enableWriteEvent || enablePrewriteHook ? null : [];
        this[kLength] = 0;
        this[kStatus] = "open";
        this[kClosePromise] = null;
        this[kAddMode] = getOptions(options, emptyOptions).add === true;
        if (enablePrewriteHook) {
          const data = new PrewriteData([], enableWriteEvent ? [] : null);
          this[kPrewriteData] = data;
          this[kPrewriteBatch] = new PrewriteBatch(db, data[kPrivateOperations], data[kPublicOperations]);
          this[kPrewriteRun] = db.hooks.prewrite.run;
        } else {
          this[kPrewriteData] = null;
          this[kPrewriteBatch] = null;
          this[kPrewriteRun] = null;
        }
        this.db = db;
        this.db.attachResource(this);
      }
      get length() {
        if (this[kPrewriteData] !== null) {
          return this[kLength] + this[kPrewriteData].length;
        } else {
          return this[kLength];
        }
      }
      put(key, value, options) {
        assertStatus(this);
        options = getOptions(options, emptyOptions);
        const delegated = options.sublevel != null;
        const db = delegated ? options.sublevel : this.db;
        const original = options;
        const keyError = db._checkKey(key);
        const valueError = db._checkValue(value);
        if (keyError != null) throw keyError;
        if (valueError != null) throw valueError;
        const op = Object.assign({}, options, {
          type: "put",
          key,
          value,
          keyEncoding: db.keyEncoding(options.keyEncoding),
          valueEncoding: db.valueEncoding(options.valueEncoding)
        });
        if (this[kPrewriteRun] !== null) {
          try {
            this[kPrewriteRun](op, this[kPrewriteBatch]);
            op.keyEncoding = db.keyEncoding(op.keyEncoding);
            op.valueEncoding = db.valueEncoding(op.valueEncoding);
          } catch (err) {
            throw new ModuleError("The prewrite hook failed on batch.put()", {
              code: "LEVEL_HOOK_ERROR",
              cause: err
            });
          }
        }
        const keyEncoding = op.keyEncoding;
        const preencodedKey = keyEncoding.encode(op.key);
        const keyFormat = keyEncoding.format;
        const siblings = delegated && !isDescendant(op.sublevel, this.db) && op.sublevel !== this.db;
        const encodedKey = delegated && !siblings ? prefixDescendantKey(preencodedKey, keyFormat, db, this.db) : preencodedKey;
        const valueEncoding = op.valueEncoding;
        const encodedValue = valueEncoding.encode(op.value);
        const valueFormat = valueEncoding.format;
        if (delegated && !siblings) {
          op.sublevel = null;
        }
        if (this[kPublicOperations] !== null && !siblings) {
          const publicOperation = Object.assign({}, op);
          publicOperation.encodedKey = encodedKey;
          publicOperation.encodedValue = encodedValue;
          if (delegated) {
            publicOperation.key = encodedKey;
            publicOperation.value = encodedValue;
            publicOperation.keyEncoding = this.db.keyEncoding(keyFormat);
            publicOperation.valueEncoding = this.db.valueEncoding(valueFormat);
          }
          this[kPublicOperations].push(publicOperation);
        } else if (this[kLegacyOperations] !== null && !siblings) {
          const legacyOperation = Object.assign({}, original);
          legacyOperation.type = "put";
          legacyOperation.key = key;
          legacyOperation.value = value;
          this[kLegacyOperations].push(legacyOperation);
        }
        op.key = siblings ? encodedKey : this.db.prefixKey(encodedKey, keyFormat, true);
        op.value = encodedValue;
        op.keyEncoding = keyFormat;
        op.valueEncoding = valueFormat;
        if (this[kAddMode]) {
          this._add(op);
        } else {
          this._put(op.key, encodedValue, op);
        }
        this[kLength]++;
        return this;
      }
      _put(key, value, options) {
      }
      del(key, options) {
        assertStatus(this);
        options = getOptions(options, emptyOptions);
        const delegated = options.sublevel != null;
        const db = delegated ? options.sublevel : this.db;
        const original = options;
        const keyError = db._checkKey(key);
        if (keyError != null) throw keyError;
        const op = Object.assign({}, options, {
          type: "del",
          key,
          keyEncoding: db.keyEncoding(options.keyEncoding)
        });
        if (this[kPrewriteRun] !== null) {
          try {
            this[kPrewriteRun](op, this[kPrewriteBatch]);
            op.keyEncoding = db.keyEncoding(op.keyEncoding);
          } catch (err) {
            throw new ModuleError("The prewrite hook failed on batch.del()", {
              code: "LEVEL_HOOK_ERROR",
              cause: err
            });
          }
        }
        const keyEncoding = op.keyEncoding;
        const preencodedKey = keyEncoding.encode(op.key);
        const keyFormat = keyEncoding.format;
        const encodedKey = delegated ? prefixDescendantKey(preencodedKey, keyFormat, db, this.db) : preencodedKey;
        if (delegated) op.sublevel = null;
        if (this[kPublicOperations] !== null) {
          const publicOperation = Object.assign({}, op);
          publicOperation.encodedKey = encodedKey;
          if (delegated) {
            publicOperation.key = encodedKey;
            publicOperation.keyEncoding = this.db.keyEncoding(keyFormat);
          }
          this[kPublicOperations].push(publicOperation);
        } else if (this[kLegacyOperations] !== null) {
          const legacyOperation = Object.assign({}, original);
          legacyOperation.type = "del";
          legacyOperation.key = key;
          this[kLegacyOperations].push(legacyOperation);
        }
        op.key = this.db.prefixKey(encodedKey, keyFormat, true);
        op.keyEncoding = keyFormat;
        if (this[kAddMode]) {
          this._add(op);
        } else {
          this._del(op.key, op);
        }
        this[kLength]++;
        return this;
      }
      _del(key, options) {
      }
      _add(op) {
      }
      clear() {
        assertStatus(this);
        this._clear();
        if (this[kPublicOperations] !== null) this[kPublicOperations] = [];
        if (this[kLegacyOperations] !== null) this[kLegacyOperations] = [];
        if (this[kPrewriteData] !== null) this[kPrewriteData].clear();
        this[kLength] = 0;
        return this;
      }
      _clear() {
      }
      async write(options) {
        assertStatus(this);
        options = getOptions(options);
        if (this[kLength] === 0) {
          return this.close();
        } else {
          this[kStatus] = "writing";
          const close = prepareClose(this);
          try {
            if (this[kPrewriteData] !== null) {
              const publicOperations = this[kPrewriteData][kPublicOperations];
              const privateOperations = this[kPrewriteData][kPrivateOperations];
              const length = this[kPrewriteData].length;
              for (let i = 0; i < length; i++) {
                const op = privateOperations[i];
                if (this[kAddMode]) {
                  this._add(op);
                } else if (op.type === "put") {
                  this._put(op.key, op.value, op);
                } else {
                  this._del(op.key, op);
                }
              }
              if (publicOperations !== null && length !== 0) {
                this[kPublicOperations] = this[kPublicOperations].concat(publicOperations);
              }
            }
            await this._write(options);
          } catch (err) {
            close();
            try {
              await this[kClosePromise];
            } catch (closeErr) {
              err = combineErrors([err, closeErr]);
            }
            throw err;
          }
          close();
          if (this[kPublicOperations] !== null) {
            this.db.emit("write", this[kPublicOperations]);
          } else if (this[kLegacyOperations] !== null) {
            this.db.emit("batch", this[kLegacyOperations]);
          }
          return this[kClosePromise];
        }
      }
      async _write(options) {
      }
      async close() {
        if (this[kClosePromise] !== null) {
          return this[kClosePromise].catch(noop);
        } else {
          prepareClose(this)();
          return this[kClosePromise];
        }
      }
      async _close() {
      }
    };
    var prepareClose = function(batch) {
      let close;
      batch[kClosePromise] = new Promise((resolve, reject) => {
        close = () => {
          privateClose(batch).then(resolve, reject);
        };
      });
      return close;
    };
    var privateClose = async function(batch) {
      batch[kStatus] = "closing";
      await batch._close();
      batch.db.detachResource(batch);
    };
    var PrewriteData = class {
      constructor(privateOperations, publicOperations) {
        this[kPrivateOperations] = privateOperations;
        this[kPublicOperations] = publicOperations;
      }
      get length() {
        return this[kPrivateOperations].length;
      }
      clear() {
        for (const k of [kPublicOperations, kPrivateOperations]) {
          const ops = this[k];
          if (ops !== null) {
            ops.splice(0, ops.length);
          }
        }
      }
    };
    var assertStatus = function(batch) {
      if (batch[kStatus] !== "open") {
        throw new ModuleError("Batch is not open: cannot change operations after write() or close()", {
          code: "LEVEL_BATCH_NOT_OPEN"
        });
      }
      if (batch.db.status !== "open") {
        throw new ModuleError("Database is not open", {
          code: "LEVEL_DATABASE_NOT_OPEN"
        });
      }
    };
    exports2.AbstractChainedBatch = AbstractChainedBatch;
  }
});

// node_modules/.pnpm/abstract-level@2.0.2/node_modules/abstract-level/lib/default-chained-batch.js
var require_default_chained_batch = __commonJS({
  "node_modules/.pnpm/abstract-level@2.0.2/node_modules/abstract-level/lib/default-chained-batch.js"(exports2) {
    "use strict";
    var { AbstractChainedBatch } = require_abstract_chained_batch();
    var kEncoded = Symbol("encoded");
    var DefaultChainedBatch = class extends AbstractChainedBatch {
      constructor(db) {
        super(db, { add: true });
        this[kEncoded] = [];
      }
      _add(op) {
        this[kEncoded].push(op);
      }
      _clear() {
        this[kEncoded] = [];
      }
      async _write(options) {
        return this.db._batch(this[kEncoded], options);
      }
    };
    exports2.DefaultChainedBatch = DefaultChainedBatch;
  }
});

// node_modules/.pnpm/abstract-level@2.0.2/node_modules/abstract-level/lib/hooks.js
var require_hooks = __commonJS({
  "node_modules/.pnpm/abstract-level@2.0.2/node_modules/abstract-level/lib/hooks.js"(exports2) {
    "use strict";
    var { noop } = require_common();
    var kFunctions = Symbol("functions");
    var kAsync = Symbol("async");
    var DatabaseHooks = class {
      constructor() {
        this.postopen = new Hook({ async: true });
        this.prewrite = new Hook({ async: false });
        this.newsub = new Hook({ async: false });
      }
    };
    var Hook = class {
      constructor(options) {
        this[kAsync] = options.async;
        this[kFunctions] = /* @__PURE__ */ new Set();
        this.noop = true;
        this.run = runner(this);
      }
      add(fn) {
        assertFunction(fn);
        this[kFunctions].add(fn);
        this.noop = false;
        this.run = runner(this);
      }
      delete(fn) {
        assertFunction(fn);
        this[kFunctions].delete(fn);
        this.noop = this[kFunctions].size === 0;
        this.run = runner(this);
      }
    };
    var assertFunction = function(fn) {
      if (typeof fn !== "function") {
        const hint = fn === null ? "null" : typeof fn;
        throw new TypeError(`The first argument must be a function, received ${hint}`);
      }
    };
    var runner = function(hook) {
      if (hook.noop) {
        return noop;
      } else if (hook[kFunctions].size === 1) {
        const [fn] = hook[kFunctions];
        return fn;
      } else if (hook[kAsync]) {
        const run = async function(functions, ...args) {
          for (const fn of functions) {
            await fn(...args);
          }
        };
        return run.bind(null, Array.from(hook[kFunctions]));
      } else {
        const run = function(functions, ...args) {
          for (const fn of functions) {
            fn(...args);
          }
        };
        return run.bind(null, Array.from(hook[kFunctions]));
      }
    };
    exports2.DatabaseHooks = DatabaseHooks;
  }
});

// node_modules/.pnpm/abstract-level@2.0.2/node_modules/abstract-level/lib/event-monitor.js
var require_event_monitor = __commonJS({
  "node_modules/.pnpm/abstract-level@2.0.2/node_modules/abstract-level/lib/event-monitor.js"(exports2) {
    "use strict";
    var { deprecate } = require_common();
    exports2.EventMonitor = class EventMonitor {
      constructor(emitter, events) {
        for (const event of events) {
          this[event.name] = false;
          if (event.deprecated) {
            event.message = `The '${event.name}' event is deprecated in favor of '${event.alt}' and will be removed in a future version of abstract-level`;
          }
        }
        const map = new Map(events.map((e) => [e.name, e]));
        const monitor = this;
        emitter.on("newListener", beforeAdded);
        emitter.on("removeListener", afterRemoved);
        function beforeAdded(name) {
          const event = map.get(name);
          if (event !== void 0) {
            monitor[name] = true;
            if (event.deprecated) {
              deprecate(event.message);
            }
          }
        }
        function afterRemoved(name) {
          if (map.has(name)) {
            monitor[name] = this.listenerCount(name) > 0;
          }
        }
      }
    };
  }
});

// node_modules/.pnpm/abstract-level@2.0.2/node_modules/abstract-level/lib/deferred-queue.js
var require_deferred_queue = __commonJS({
  "node_modules/.pnpm/abstract-level@2.0.2/node_modules/abstract-level/lib/deferred-queue.js"(exports2) {
    "use strict";
    var { getOptions, emptyOptions } = require_common();
    var { AbortError } = require_errors();
    var kOperations = Symbol("operations");
    var kSignals = Symbol("signals");
    var kHandleAbort = Symbol("handleAbort");
    var DeferredOperation = class {
      constructor(fn, signal) {
        this.fn = fn;
        this.signal = signal;
      }
    };
    var DeferredQueue = class {
      constructor() {
        this[kOperations] = [];
        this[kSignals] = /* @__PURE__ */ new Set();
        this[kHandleAbort] = this[kHandleAbort].bind(this);
      }
      add(fn, options) {
        options = getOptions(options, emptyOptions);
        const signal = options.signal;
        if (signal == null) {
          this[kOperations].push(new DeferredOperation(fn, null));
          return;
        }
        if (signal.aborted) {
          fn(new AbortError());
          return;
        }
        if (!this[kSignals].has(signal)) {
          this[kSignals].add(signal);
          signal.addEventListener("abort", this[kHandleAbort], { once: true });
        }
        this[kOperations].push(new DeferredOperation(fn, signal));
      }
      drain() {
        const operations = this[kOperations];
        const signals = this[kSignals];
        this[kOperations] = [];
        this[kSignals] = /* @__PURE__ */ new Set();
        for (const signal of signals) {
          signal.removeEventListener("abort", this[kHandleAbort]);
        }
        for (const operation of operations) {
          operation.fn.call(null);
        }
      }
      [kHandleAbort](ev) {
        const signal = ev.target;
        const err = new AbortError();
        const aborted = [];
        this[kOperations] = this[kOperations].filter(function(operation) {
          if (operation.signal !== null && operation.signal === signal) {
            aborted.push(operation);
            return false;
          } else {
            return true;
          }
        });
        this[kSignals].delete(signal);
        for (const operation of aborted) {
          operation.fn.call(null, err);
        }
      }
    };
    exports2.DeferredQueue = DeferredQueue;
  }
});

// node_modules/.pnpm/abstract-level@2.0.2/node_modules/abstract-level/lib/range-options.js
var require_range_options = __commonJS({
  "node_modules/.pnpm/abstract-level@2.0.2/node_modules/abstract-level/lib/range-options.js"(exports2, module2) {
    "use strict";
    var hasOwnProperty = Object.prototype.hasOwnProperty;
    var rangeOptions = /* @__PURE__ */ new Set(["lt", "lte", "gt", "gte"]);
    module2.exports = function(options, keyEncoding) {
      const result = {};
      for (const k in options) {
        if (!hasOwnProperty.call(options, k)) continue;
        if (k === "keyEncoding" || k === "valueEncoding") continue;
        if (rangeOptions.has(k)) {
          result[k] = keyEncoding.encode(options[k]);
        } else {
          result[k] = options[k];
        }
      }
      result.reverse = !!result.reverse;
      result.limit = Number.isInteger(result.limit) && result.limit >= 0 ? result.limit : -1;
      return result;
    };
  }
});

// node_modules/.pnpm/abstract-level@2.0.2/node_modules/abstract-level/lib/abstract-sublevel-iterator.js
var require_abstract_sublevel_iterator = __commonJS({
  "node_modules/.pnpm/abstract-level@2.0.2/node_modules/abstract-level/lib/abstract-sublevel-iterator.js"(exports2) {
    "use strict";
    var { AbstractIterator, AbstractKeyIterator, AbstractValueIterator } = require_abstract_iterator();
    var kUnfix = Symbol("unfix");
    var kIterator = Symbol("iterator");
    var AbstractSublevelIterator = class extends AbstractIterator {
      constructor(db, options, iterator, unfix) {
        super(db, options);
        this[kIterator] = iterator;
        this[kUnfix] = unfix;
      }
      async _next() {
        const entry = await this[kIterator].next();
        if (entry !== void 0) {
          const key = entry[0];
          if (key !== void 0) entry[0] = this[kUnfix](key);
        }
        return entry;
      }
      async _nextv(size, options) {
        const entries = await this[kIterator].nextv(size, options);
        const unfix = this[kUnfix];
        for (const entry of entries) {
          const key = entry[0];
          if (key !== void 0) entry[0] = unfix(key);
        }
        return entries;
      }
      async _all(options) {
        const entries = await this[kIterator].all(options);
        const unfix = this[kUnfix];
        for (const entry of entries) {
          const key = entry[0];
          if (key !== void 0) entry[0] = unfix(key);
        }
        return entries;
      }
    };
    var AbstractSublevelKeyIterator = class extends AbstractKeyIterator {
      constructor(db, options, iterator, unfix) {
        super(db, options);
        this[kIterator] = iterator;
        this[kUnfix] = unfix;
      }
      async _next() {
        const key = await this[kIterator].next();
        return key === void 0 ? key : this[kUnfix](key);
      }
      async _nextv(size, options) {
        const keys = await this[kIterator].nextv(size, options);
        const unfix = this[kUnfix];
        for (let i = 0; i < keys.length; i++) {
          const key = keys[i];
          if (key !== void 0) keys[i] = unfix(key);
        }
        return keys;
      }
      async _all(options) {
        const keys = await this[kIterator].all(options);
        const unfix = this[kUnfix];
        for (let i = 0; i < keys.length; i++) {
          const key = keys[i];
          if (key !== void 0) keys[i] = unfix(key);
        }
        return keys;
      }
    };
    var AbstractSublevelValueIterator = class extends AbstractValueIterator {
      constructor(db, options, iterator) {
        super(db, options);
        this[kIterator] = iterator;
      }
      async _next() {
        return this[kIterator].next();
      }
      async _nextv(size, options) {
        return this[kIterator].nextv(size, options);
      }
      async _all(options) {
        return this[kIterator].all(options);
      }
    };
    for (const Iterator of [AbstractSublevelIterator, AbstractSublevelKeyIterator, AbstractSublevelValueIterator]) {
      Iterator.prototype._seek = function(target, options) {
        this[kIterator].seek(target, options);
      };
      Iterator.prototype._close = async function() {
        return this[kIterator].close();
      };
    }
    exports2.AbstractSublevelIterator = AbstractSublevelIterator;
    exports2.AbstractSublevelKeyIterator = AbstractSublevelKeyIterator;
    exports2.AbstractSublevelValueIterator = AbstractSublevelValueIterator;
  }
});

// node_modules/.pnpm/abstract-level@2.0.2/node_modules/abstract-level/lib/abstract-sublevel.js
var require_abstract_sublevel = __commonJS({
  "node_modules/.pnpm/abstract-level@2.0.2/node_modules/abstract-level/lib/abstract-sublevel.js"(exports2, module2) {
    "use strict";
    var ModuleError = require_module_error();
    var { Buffer: Buffer2 } = require("buffer") || {};
    var {
      AbstractSublevelIterator,
      AbstractSublevelKeyIterator,
      AbstractSublevelValueIterator
    } = require_abstract_sublevel_iterator();
    var kGlobalPrefix = Symbol("prefix");
    var kLocalPrefix = Symbol("localPrefix");
    var kLocalPath = Symbol("localPath");
    var kGlobalPath = Symbol("globalPath");
    var kGlobalUpperBound = Symbol("upperBound");
    var kPrefixRange = Symbol("prefixRange");
    var kRoot = Symbol("root");
    var kParent = Symbol("parent");
    var kUnfix = Symbol("unfix");
    var textEncoder = new TextEncoder();
    var defaults = { separator: "!" };
    module2.exports = function({ AbstractLevel }) {
      class AbstractSublevel extends AbstractLevel {
        static defaults(options) {
          if (options == null) {
            return defaults;
          } else if (!options.separator) {
            return { ...options, separator: "!" };
          } else {
            return options;
          }
        }
        // TODO: add autoClose option, which if true, does parent.attachResource(this)
        constructor(db, name, options) {
          const { separator, manifest: manifest2, ...forward } = AbstractSublevel.defaults(options);
          const names = [].concat(name).map((name2) => trim(name2, separator));
          const reserved = separator.charCodeAt(0) + 1;
          const root = db[kRoot] || db;
          if (!names.every((name2) => textEncoder.encode(name2).every((x) => x > reserved && x < 127))) {
            throw new ModuleError(`Sublevel name must use bytes > ${reserved} < ${127}`, {
              code: "LEVEL_INVALID_PREFIX"
            });
          }
          super(mergeManifests(db, manifest2), forward);
          const localPrefix = names.map((name2) => separator + name2 + separator).join("");
          const globalPrefix = (db.prefix || "") + localPrefix;
          const globalUpperBound = globalPrefix.slice(0, -1) + String.fromCharCode(reserved);
          this[kRoot] = root;
          this[kParent] = db;
          this[kLocalPath] = names;
          this[kGlobalPath] = db.prefix ? db.path().concat(names) : names;
          this[kGlobalPrefix] = new MultiFormat(globalPrefix);
          this[kGlobalUpperBound] = new MultiFormat(globalUpperBound);
          this[kLocalPrefix] = new MultiFormat(localPrefix);
          this[kUnfix] = new Unfixer();
        }
        prefixKey(key, keyFormat, local) {
          const prefix = local ? this[kLocalPrefix] : this[kGlobalPrefix];
          if (keyFormat === "utf8") {
            return prefix.utf8 + key;
          } else if (key.byteLength === 0) {
            return prefix[keyFormat];
          } else if (keyFormat === "view") {
            const view = prefix.view;
            const result = new Uint8Array(view.byteLength + key.byteLength);
            result.set(view, 0);
            result.set(key, view.byteLength);
            return result;
          } else {
            const buffer = prefix.buffer;
            return Buffer2.concat([buffer, key], buffer.byteLength + key.byteLength);
          }
        }
        // Not exposed for now.
        [kPrefixRange](range, keyFormat) {
          if (range.gte !== void 0) {
            range.gte = this.prefixKey(range.gte, keyFormat, false);
          } else if (range.gt !== void 0) {
            range.gt = this.prefixKey(range.gt, keyFormat, false);
          } else {
            range.gte = this[kGlobalPrefix][keyFormat];
          }
          if (range.lte !== void 0) {
            range.lte = this.prefixKey(range.lte, keyFormat, false);
          } else if (range.lt !== void 0) {
            range.lt = this.prefixKey(range.lt, keyFormat, false);
          } else {
            range.lte = this[kGlobalUpperBound][keyFormat];
          }
        }
        get prefix() {
          return this[kGlobalPrefix].utf8;
        }
        get db() {
          return this[kRoot];
        }
        get parent() {
          return this[kParent];
        }
        path(local = false) {
          return local ? this[kLocalPath] : this[kGlobalPath];
        }
        async _open(options) {
          return this[kParent].open({ passive: true });
        }
        async _put(key, value, options) {
          return this[kParent].put(key, value, options);
        }
        async _get(key, options) {
          return this[kParent].get(key, options);
        }
        async _getMany(keys, options) {
          return this[kParent].getMany(keys, options);
        }
        async _del(key, options) {
          return this[kParent].del(key, options);
        }
        async _batch(operations, options) {
          return this[kParent].batch(operations, options);
        }
        // TODO: call parent instead of root
        async _clear(options) {
          this[kPrefixRange](options, options.keyEncoding);
          return this[kRoot].clear(options);
        }
        // TODO: call parent instead of root
        _iterator(options) {
          this[kPrefixRange](options, options.keyEncoding);
          const iterator = this[kRoot].iterator(options);
          const unfix = this[kUnfix].get(this[kGlobalPrefix].utf8.length, options.keyEncoding);
          return new AbstractSublevelIterator(this, options, iterator, unfix);
        }
        _keys(options) {
          this[kPrefixRange](options, options.keyEncoding);
          const iterator = this[kRoot].keys(options);
          const unfix = this[kUnfix].get(this[kGlobalPrefix].utf8.length, options.keyEncoding);
          return new AbstractSublevelKeyIterator(this, options, iterator, unfix);
        }
        _values(options) {
          this[kPrefixRange](options, options.keyEncoding);
          const iterator = this[kRoot].values(options);
          return new AbstractSublevelValueIterator(this, options, iterator);
        }
      }
      return { AbstractSublevel };
    };
    var mergeManifests = function(parent, manifest2) {
      return {
        // Inherit manifest of parent db
        ...parent.supports,
        // Disable unsupported features
        createIfMissing: false,
        errorIfExists: false,
        // Unset additional events because we're not forwarding them
        events: {},
        // Unset additional methods (like approximateSize) which we can't support here unless
        // the AbstractSublevel class is overridden by an implementation of `abstract-level`.
        additionalMethods: {},
        // Inherit manifest of custom AbstractSublevel subclass. Such a class is not
        // allowed to override encodings.
        ...manifest2,
        encodings: {
          utf8: supportsEncoding(parent, "utf8"),
          buffer: supportsEncoding(parent, "buffer"),
          view: supportsEncoding(parent, "view")
        }
      };
    };
    var supportsEncoding = function(parent, encoding) {
      return parent.supports.encodings[encoding] ? parent.keyEncoding(encoding).name === encoding : false;
    };
    var MultiFormat = class {
      constructor(key) {
        this.utf8 = key;
        this.view = textEncoder.encode(key);
        this.buffer = Buffer2 ? Buffer2.from(this.view.buffer, 0, this.view.byteLength) : {};
      }
    };
    var Unfixer = class {
      constructor() {
        this.cache = /* @__PURE__ */ new Map();
      }
      get(prefixLength, keyFormat) {
        let unfix = this.cache.get(keyFormat);
        if (unfix === void 0) {
          if (keyFormat === "view") {
            unfix = function(prefixLength2, key) {
              return key.subarray(prefixLength2);
            }.bind(null, prefixLength);
          } else {
            unfix = function(prefixLength2, key) {
              return key.slice(prefixLength2);
            }.bind(null, prefixLength);
          }
          this.cache.set(keyFormat, unfix);
        }
        return unfix;
      }
    };
    var trim = function(str, char) {
      let start = 0;
      let end = str.length;
      while (start < end && str[start] === char) start++;
      while (end > start && str[end - 1] === char) end--;
      return str.slice(start, end);
    };
  }
});

// node_modules/.pnpm/abstract-level@2.0.2/node_modules/abstract-level/abstract-level.js
var require_abstract_level = __commonJS({
  "node_modules/.pnpm/abstract-level@2.0.2/node_modules/abstract-level/abstract-level.js"(exports2) {
    "use strict";
    var { supports } = require_level_supports();
    var { Transcoder } = require_level_transcoder();
    var { EventEmitter } = require("events");
    var ModuleError = require_module_error();
    var combineErrors = require_maybe_combine_errors();
    var { AbstractIterator } = require_abstract_iterator();
    var { DefaultKeyIterator, DefaultValueIterator } = require_default_kv_iterator();
    var { DeferredIterator, DeferredKeyIterator, DeferredValueIterator } = require_deferred_iterator();
    var { DefaultChainedBatch } = require_default_chained_batch();
    var { DatabaseHooks } = require_hooks();
    var { PrewriteBatch } = require_prewrite_batch();
    var { EventMonitor } = require_event_monitor();
    var { getOptions, noop, emptyOptions, resolvedPromise } = require_common();
    var { prefixDescendantKey, isDescendant } = require_prefixes();
    var { DeferredQueue } = require_deferred_queue();
    var rangeOptions = require_range_options();
    var kResources = Symbol("resources");
    var kCloseResources = Symbol("closeResources");
    var kQueue = Symbol("queue");
    var kDeferOpen = Symbol("deferOpen");
    var kOptions = Symbol("options");
    var kStatus = Symbol("status");
    var kStatusChange = Symbol("statusChange");
    var kStatusLocked = Symbol("statusLocked");
    var kDefaultOptions = Symbol("defaultOptions");
    var kTranscoder = Symbol("transcoder");
    var kKeyEncoding = Symbol("keyEncoding");
    var kValueEncoding = Symbol("valueEncoding");
    var kEventMonitor = Symbol("eventMonitor");
    var kArrayBatch = Symbol("arrayBatch");
    var AbstractLevel = class extends EventEmitter {
      constructor(manifest2, options) {
        super();
        if (typeof manifest2 !== "object" || manifest2 === null) {
          throw new TypeError("The first argument 'manifest' must be an object");
        }
        options = getOptions(options);
        const { keyEncoding, valueEncoding, passive, ...forward } = options;
        this[kResources] = /* @__PURE__ */ new Set();
        this[kQueue] = new DeferredQueue();
        this[kDeferOpen] = true;
        this[kOptions] = forward;
        this[kStatus] = "opening";
        this[kStatusChange] = null;
        this[kStatusLocked] = false;
        this.hooks = new DatabaseHooks();
        this.supports = supports(manifest2, {
          deferredOpen: true,
          // TODO (next major): add seek
          snapshots: manifest2.snapshots !== false,
          permanence: manifest2.permanence !== false,
          encodings: manifest2.encodings || {},
          events: Object.assign({}, manifest2.events, {
            opening: true,
            open: true,
            closing: true,
            closed: true,
            write: true,
            put: true,
            del: true,
            batch: true,
            clear: true
          })
        });
        this[kEventMonitor] = new EventMonitor(this, [
          { name: "write" },
          { name: "put", deprecated: true, alt: "write" },
          { name: "del", deprecated: true, alt: "write" },
          { name: "batch", deprecated: true, alt: "write" }
        ]);
        this[kTranscoder] = new Transcoder(formats(this));
        this[kKeyEncoding] = this[kTranscoder].encoding(keyEncoding || "utf8");
        this[kValueEncoding] = this[kTranscoder].encoding(valueEncoding || "utf8");
        for (const encoding of this[kTranscoder].encodings()) {
          if (!this.supports.encodings[encoding.commonName]) {
            this.supports.encodings[encoding.commonName] = true;
          }
        }
        this[kDefaultOptions] = {
          empty: emptyOptions,
          entry: Object.freeze({
            keyEncoding: this[kKeyEncoding].commonName,
            valueEncoding: this[kValueEncoding].commonName
          }),
          entryFormat: Object.freeze({
            keyEncoding: this[kKeyEncoding].format,
            valueEncoding: this[kValueEncoding].format
          }),
          key: Object.freeze({
            keyEncoding: this[kKeyEncoding].commonName
          }),
          keyFormat: Object.freeze({
            keyEncoding: this[kKeyEncoding].format
          })
        };
        queueMicrotask(() => {
          if (this[kDeferOpen]) {
            this.open({ passive: false }).catch(noop);
          }
        });
      }
      get status() {
        return this[kStatus];
      }
      get parent() {
        return null;
      }
      keyEncoding(encoding) {
        return this[kTranscoder].encoding(encoding != null ? encoding : this[kKeyEncoding]);
      }
      valueEncoding(encoding) {
        return this[kTranscoder].encoding(encoding != null ? encoding : this[kValueEncoding]);
      }
      async open(options) {
        options = { ...this[kOptions], ...getOptions(options) };
        options.createIfMissing = options.createIfMissing !== false;
        options.errorIfExists = !!options.errorIfExists;
        const postopen = this.hooks.postopen.noop ? null : this.hooks.postopen.run;
        const passive = options.passive;
        if (passive && this[kDeferOpen]) {
          await void 0;
        }
        assertUnlocked(this);
        while (this[kStatusChange] !== null) await this[kStatusChange].catch(noop);
        assertUnlocked(this);
        if (passive) {
          if (this[kStatus] !== "open") throw new NotOpenError();
        } else if (this[kStatus] === "closed" || this[kDeferOpen]) {
          this[kDeferOpen] = false;
          this[kStatusChange] = resolvedPromise;
          this[kStatusChange] = (async () => {
            this[kStatus] = "opening";
            try {
              this.emit("opening");
              await this._open(options);
            } catch (err) {
              this[kStatus] = "closed";
              this[kQueue].drain();
              try {
                await this[kCloseResources]();
              } catch (resourceErr) {
                err = combineErrors([err, resourceErr]);
              }
              throw new NotOpenError(err);
            }
            this[kStatus] = "open";
            if (postopen !== null) {
              let hookErr;
              try {
                this[kStatusLocked] = true;
                await postopen(options);
              } catch (err) {
                hookErr = convertRejection(err);
              } finally {
                this[kStatusLocked] = false;
              }
              if (hookErr) {
                this[kStatus] = "closing";
                this[kQueue].drain();
                try {
                  await this[kCloseResources]();
                  await this._close();
                } catch (closeErr) {
                  this[kStatusLocked] = true;
                  hookErr = combineErrors([hookErr, closeErr]);
                }
                this[kStatus] = "closed";
                throw new ModuleError("The postopen hook failed on open()", {
                  code: "LEVEL_HOOK_ERROR",
                  cause: hookErr
                });
              }
            }
            this[kQueue].drain();
            this.emit("open");
          })();
          try {
            await this[kStatusChange];
          } finally {
            this[kStatusChange] = null;
          }
        } else if (this[kStatus] !== "open") {
          throw new NotOpenError();
        }
      }
      async _open(options) {
      }
      async close() {
        assertUnlocked(this);
        while (this[kStatusChange] !== null) await this[kStatusChange].catch(noop);
        assertUnlocked(this);
        if (this[kStatus] === "open" || this[kDeferOpen]) {
          const fromInitial = this[kDeferOpen];
          this[kDeferOpen] = false;
          this[kStatusChange] = resolvedPromise;
          this[kStatusChange] = (async () => {
            this[kStatus] = "closing";
            this[kQueue].drain();
            try {
              this.emit("closing");
              await this[kCloseResources]();
              if (!fromInitial) await this._close();
            } catch (err) {
              this[kStatus] = "open";
              this[kQueue].drain();
              throw new NotClosedError(err);
            }
            this[kStatus] = "closed";
            this[kQueue].drain();
            this.emit("closed");
          })();
          try {
            await this[kStatusChange];
          } finally {
            this[kStatusChange] = null;
          }
        } else if (this[kStatus] !== "closed") {
          throw new NotClosedError();
        }
      }
      async [kCloseResources]() {
        if (this[kResources].size === 0) {
          return;
        }
        const resources = Array.from(this[kResources]);
        const promises = resources.map(closeResource);
        return Promise.allSettled(promises).then(async (results) => {
          const errors = [];
          for (let i = 0; i < results.length; i++) {
            if (results[i].status === "fulfilled") {
              this[kResources].delete(resources[i]);
            } else {
              errors.push(convertRejection(results[i].reason));
            }
          }
          if (errors.length > 0) {
            throw combineErrors(errors);
          }
        });
      }
      async _close() {
      }
      async get(key, options) {
        options = getOptions(options, this[kDefaultOptions].entry);
        if (this[kStatus] === "opening") {
          return this.deferAsync(() => this.get(key, options));
        }
        assertOpen(this);
        const err = this._checkKey(key);
        if (err) throw err;
        const keyEncoding = this.keyEncoding(options.keyEncoding);
        const valueEncoding = this.valueEncoding(options.valueEncoding);
        const keyFormat = keyEncoding.format;
        const valueFormat = valueEncoding.format;
        if (options.keyEncoding !== keyFormat || options.valueEncoding !== valueFormat) {
          options = Object.assign({}, options, { keyEncoding: keyFormat, valueEncoding: valueFormat });
        }
        const encodedKey = keyEncoding.encode(key);
        const value = await this._get(this.prefixKey(encodedKey, keyFormat, true), options);
        try {
          return value === void 0 ? value : valueEncoding.decode(value);
        } catch (err2) {
          throw new ModuleError("Could not decode value", {
            code: "LEVEL_DECODE_ERROR",
            cause: err2
          });
        }
      }
      async _get(key, options) {
        return void 0;
      }
      async getMany(keys, options) {
        options = getOptions(options, this[kDefaultOptions].entry);
        if (this[kStatus] === "opening") {
          return this.deferAsync(() => this.getMany(keys, options));
        }
        assertOpen(this);
        if (!Array.isArray(keys)) {
          throw new TypeError("The first argument 'keys' must be an array");
        }
        if (keys.length === 0) {
          return [];
        }
        const keyEncoding = this.keyEncoding(options.keyEncoding);
        const valueEncoding = this.valueEncoding(options.valueEncoding);
        const keyFormat = keyEncoding.format;
        const valueFormat = valueEncoding.format;
        if (options.keyEncoding !== keyFormat || options.valueEncoding !== valueFormat) {
          options = Object.assign({}, options, { keyEncoding: keyFormat, valueEncoding: valueFormat });
        }
        const mappedKeys = new Array(keys.length);
        for (let i = 0; i < keys.length; i++) {
          const key = keys[i];
          const err = this._checkKey(key);
          if (err) throw err;
          mappedKeys[i] = this.prefixKey(keyEncoding.encode(key), keyFormat, true);
        }
        const values = await this._getMany(mappedKeys, options);
        try {
          for (let i = 0; i < values.length; i++) {
            if (values[i] !== void 0) {
              values[i] = valueEncoding.decode(values[i]);
            }
          }
        } catch (err) {
          throw new ModuleError(`Could not decode one or more of ${values.length} value(s)`, {
            code: "LEVEL_DECODE_ERROR",
            cause: err
          });
        }
        return values;
      }
      async _getMany(keys, options) {
        return new Array(keys.length).fill(void 0);
      }
      async put(key, value, options) {
        if (!this.hooks.prewrite.noop) {
          return this.batch([{ type: "put", key, value }], options);
        }
        options = getOptions(options, this[kDefaultOptions].entry);
        if (this[kStatus] === "opening") {
          return this.deferAsync(() => this.put(key, value, options));
        }
        assertOpen(this);
        const err = this._checkKey(key) || this._checkValue(value);
        if (err) throw err;
        const keyEncoding = this.keyEncoding(options.keyEncoding);
        const valueEncoding = this.valueEncoding(options.valueEncoding);
        const keyFormat = keyEncoding.format;
        const valueFormat = valueEncoding.format;
        const enableWriteEvent = this[kEventMonitor].write;
        const original = options;
        if (options === this[kDefaultOptions].entry) {
          options = this[kDefaultOptions].entryFormat;
        } else if (options.keyEncoding !== keyFormat || options.valueEncoding !== valueFormat) {
          options = Object.assign({}, options, { keyEncoding: keyFormat, valueEncoding: valueFormat });
        }
        const encodedKey = keyEncoding.encode(key);
        const prefixedKey = this.prefixKey(encodedKey, keyFormat, true);
        const encodedValue = valueEncoding.encode(value);
        await this._put(prefixedKey, encodedValue, options);
        if (enableWriteEvent) {
          const op = Object.assign({}, original, {
            type: "put",
            key,
            value,
            keyEncoding,
            valueEncoding,
            encodedKey,
            encodedValue
          });
          this.emit("write", [op]);
        } else {
          this.emit("put", key, value);
        }
      }
      async _put(key, value, options) {
      }
      async del(key, options) {
        if (!this.hooks.prewrite.noop) {
          return this.batch([{ type: "del", key }], options);
        }
        options = getOptions(options, this[kDefaultOptions].key);
        if (this[kStatus] === "opening") {
          return this.deferAsync(() => this.del(key, options));
        }
        assertOpen(this);
        const err = this._checkKey(key);
        if (err) throw err;
        const keyEncoding = this.keyEncoding(options.keyEncoding);
        const keyFormat = keyEncoding.format;
        const enableWriteEvent = this[kEventMonitor].write;
        const original = options;
        if (options === this[kDefaultOptions].key) {
          options = this[kDefaultOptions].keyFormat;
        } else if (options.keyEncoding !== keyFormat) {
          options = Object.assign({}, options, { keyEncoding: keyFormat });
        }
        const encodedKey = keyEncoding.encode(key);
        const prefixedKey = this.prefixKey(encodedKey, keyFormat, true);
        await this._del(prefixedKey, options);
        if (enableWriteEvent) {
          const op = Object.assign({}, original, {
            type: "del",
            key,
            keyEncoding,
            encodedKey
          });
          this.emit("write", [op]);
        } else {
          this.emit("del", key);
        }
      }
      async _del(key, options) {
      }
      // TODO (future): add way for implementations to declare which options are for the
      // whole batch rather than defaults for individual operations. E.g. the sync option
      // of classic-level, that should not be copied to individual operations.
      batch(operations, options) {
        if (!arguments.length) {
          assertOpen(this);
          return this._chainedBatch();
        }
        options = getOptions(options, this[kDefaultOptions].empty);
        return this[kArrayBatch](operations, options);
      }
      // Wrapped for async error handling
      async [kArrayBatch](operations, options) {
        if (this[kStatus] === "opening") {
          return this.deferAsync(() => this[kArrayBatch](operations, options));
        }
        assertOpen(this);
        if (!Array.isArray(operations)) {
          throw new TypeError("The first argument 'operations' must be an array");
        }
        if (operations.length === 0) {
          return;
        }
        const length = operations.length;
        const enablePrewriteHook = !this.hooks.prewrite.noop;
        const enableWriteEvent = this[kEventMonitor].write;
        const publicOperations = enableWriteEvent ? new Array(length) : null;
        const privateOperations = new Array(length);
        const prewriteBatch = enablePrewriteHook ? new PrewriteBatch(this, privateOperations, publicOperations) : null;
        for (let i = 0; i < length; i++) {
          const op = Object.assign({}, options, operations[i]);
          const isPut = op.type === "put";
          const delegated = op.sublevel != null;
          const db = delegated ? op.sublevel : this;
          const keyError = db._checkKey(op.key);
          if (keyError != null) throw keyError;
          op.keyEncoding = db.keyEncoding(op.keyEncoding);
          if (isPut) {
            const valueError = db._checkValue(op.value);
            if (valueError != null) throw valueError;
            op.valueEncoding = db.valueEncoding(op.valueEncoding);
          } else if (op.type !== "del") {
            throw new TypeError("A batch operation must have a type property that is 'put' or 'del'");
          }
          if (enablePrewriteHook) {
            try {
              this.hooks.prewrite.run(op, prewriteBatch);
              op.keyEncoding = db.keyEncoding(op.keyEncoding);
              if (isPut) op.valueEncoding = db.valueEncoding(op.valueEncoding);
            } catch (err) {
              throw new ModuleError("The prewrite hook failed on batch()", {
                code: "LEVEL_HOOK_ERROR",
                cause: err
              });
            }
          }
          const keyEncoding = op.keyEncoding;
          const preencodedKey = keyEncoding.encode(op.key);
          const keyFormat = keyEncoding.format;
          const siblings = delegated && !isDescendant(op.sublevel, this) && op.sublevel !== this;
          const encodedKey = delegated && !siblings ? prefixDescendantKey(preencodedKey, keyFormat, db, this) : preencodedKey;
          if (delegated && !siblings) {
            op.sublevel = null;
          }
          let publicOperation = null;
          if (enableWriteEvent && !siblings) {
            publicOperation = Object.assign({}, op);
            publicOperation.encodedKey = encodedKey;
            if (delegated) {
              publicOperation.key = encodedKey;
              publicOperation.keyEncoding = this.keyEncoding(keyFormat);
            }
            publicOperations[i] = publicOperation;
          }
          op.key = siblings ? encodedKey : this.prefixKey(encodedKey, keyFormat, true);
          op.keyEncoding = keyFormat;
          if (isPut) {
            const valueEncoding = op.valueEncoding;
            const encodedValue = valueEncoding.encode(op.value);
            const valueFormat = valueEncoding.format;
            op.value = encodedValue;
            op.valueEncoding = valueFormat;
            if (enableWriteEvent && !siblings) {
              publicOperation.encodedValue = encodedValue;
              if (delegated) {
                publicOperation.value = encodedValue;
                publicOperation.valueEncoding = this.valueEncoding(valueFormat);
              }
            }
          }
          privateOperations[i] = op;
        }
        await this._batch(privateOperations, options);
        if (enableWriteEvent) {
          this.emit("write", publicOperations);
        } else if (!enablePrewriteHook) {
          this.emit("batch", operations);
        }
      }
      async _batch(operations, options) {
      }
      sublevel(name, options) {
        const xopts = AbstractSublevel.defaults(options);
        const sublevel = this._sublevel(name, xopts);
        if (!this.hooks.newsub.noop) {
          try {
            this.hooks.newsub.run(sublevel, xopts);
          } catch (err) {
            throw new ModuleError("The newsub hook failed on sublevel()", {
              code: "LEVEL_HOOK_ERROR",
              cause: err
            });
          }
        }
        return sublevel;
      }
      _sublevel(name, options) {
        return new AbstractSublevel(this, name, options);
      }
      prefixKey(key, keyFormat, local) {
        return key;
      }
      async clear(options) {
        options = getOptions(options, this[kDefaultOptions].empty);
        if (this[kStatus] === "opening") {
          return this.deferAsync(() => this.clear(options));
        }
        assertOpen(this);
        const original = options;
        const keyEncoding = this.keyEncoding(options.keyEncoding);
        options = rangeOptions(options, keyEncoding);
        options.keyEncoding = keyEncoding.format;
        if (options.limit !== 0) {
          await this._clear(options);
          this.emit("clear", original);
        }
      }
      async _clear(options) {
      }
      iterator(options) {
        const keyEncoding = this.keyEncoding(options && options.keyEncoding);
        const valueEncoding = this.valueEncoding(options && options.valueEncoding);
        options = rangeOptions(options, keyEncoding);
        options.keys = options.keys !== false;
        options.values = options.values !== false;
        options[AbstractIterator.keyEncoding] = keyEncoding;
        options[AbstractIterator.valueEncoding] = valueEncoding;
        options.keyEncoding = keyEncoding.format;
        options.valueEncoding = valueEncoding.format;
        if (this[kStatus] === "opening") {
          return new DeferredIterator(this, options);
        }
        assertOpen(this);
        return this._iterator(options);
      }
      _iterator(options) {
        return new AbstractIterator(this, options);
      }
      keys(options) {
        const keyEncoding = this.keyEncoding(options && options.keyEncoding);
        const valueEncoding = this.valueEncoding(options && options.valueEncoding);
        options = rangeOptions(options, keyEncoding);
        options[AbstractIterator.keyEncoding] = keyEncoding;
        options[AbstractIterator.valueEncoding] = valueEncoding;
        options.keyEncoding = keyEncoding.format;
        options.valueEncoding = valueEncoding.format;
        if (this[kStatus] === "opening") {
          return new DeferredKeyIterator(this, options);
        }
        assertOpen(this);
        return this._keys(options);
      }
      _keys(options) {
        return new DefaultKeyIterator(this, options);
      }
      values(options) {
        const keyEncoding = this.keyEncoding(options && options.keyEncoding);
        const valueEncoding = this.valueEncoding(options && options.valueEncoding);
        options = rangeOptions(options, keyEncoding);
        options[AbstractIterator.keyEncoding] = keyEncoding;
        options[AbstractIterator.valueEncoding] = valueEncoding;
        options.keyEncoding = keyEncoding.format;
        options.valueEncoding = valueEncoding.format;
        if (this[kStatus] === "opening") {
          return new DeferredValueIterator(this, options);
        }
        assertOpen(this);
        return this._values(options);
      }
      _values(options) {
        return new DefaultValueIterator(this, options);
      }
      defer(fn, options) {
        if (typeof fn !== "function") {
          throw new TypeError("The first argument must be a function");
        }
        this[kQueue].add(function(abortError) {
          if (!abortError) fn();
        }, options);
      }
      deferAsync(fn, options) {
        if (typeof fn !== "function") {
          throw new TypeError("The first argument must be a function");
        }
        return new Promise((resolve, reject) => {
          this[kQueue].add(function(abortError) {
            if (abortError) reject(abortError);
            else fn().then(resolve, reject);
          }, options);
        });
      }
      // TODO: docs and types
      attachResource(resource) {
        if (typeof resource !== "object" || resource === null || typeof resource.close !== "function") {
          throw new TypeError("The first argument must be a resource object");
        }
        this[kResources].add(resource);
      }
      // TODO: docs and types
      detachResource(resource) {
        this[kResources].delete(resource);
      }
      _chainedBatch() {
        return new DefaultChainedBatch(this);
      }
      _checkKey(key) {
        if (key === null || key === void 0) {
          return new ModuleError("Key cannot be null or undefined", {
            code: "LEVEL_INVALID_KEY"
          });
        }
      }
      _checkValue(value) {
        if (value === null || value === void 0) {
          return new ModuleError("Value cannot be null or undefined", {
            code: "LEVEL_INVALID_VALUE"
          });
        }
      }
    };
    var { AbstractSublevel } = require_abstract_sublevel()({ AbstractLevel });
    exports2.AbstractLevel = AbstractLevel;
    exports2.AbstractSublevel = AbstractSublevel;
    var assertOpen = function(db) {
      if (db[kStatus] !== "open") {
        throw new ModuleError("Database is not open", {
          code: "LEVEL_DATABASE_NOT_OPEN"
        });
      }
    };
    var assertUnlocked = function(db) {
      if (db[kStatusLocked]) {
        throw new ModuleError("Database status is locked", {
          code: "LEVEL_STATUS_LOCKED"
        });
      }
    };
    var formats = function(db) {
      return Object.keys(db.supports.encodings).filter((k) => !!db.supports.encodings[k]);
    };
    var closeResource = function(resource) {
      return resource.close();
    };
    var convertRejection = function(reason) {
      if (reason instanceof Error) {
        return reason;
      }
      if (Object.prototype.toString.call(reason) === "[object Error]") {
        return reason;
      }
      const hint = reason === null ? "null" : typeof reason;
      const msg = `Promise rejection reason must be an Error, received ${hint}`;
      return new TypeError(msg);
    };
    var NotOpenError = class extends ModuleError {
      constructor(cause) {
        super("Database failed to open", {
          code: "LEVEL_DATABASE_NOT_OPEN",
          cause
        });
      }
    };
    var NotClosedError = class extends ModuleError {
      constructor(cause) {
        super("Database failed to close", {
          code: "LEVEL_DATABASE_NOT_CLOSED",
          cause
        });
      }
    };
  }
});

// node_modules/.pnpm/abstract-level@2.0.2/node_modules/abstract-level/index.js
var require_abstract_level2 = __commonJS({
  "node_modules/.pnpm/abstract-level@2.0.2/node_modules/abstract-level/index.js"(exports2) {
    "use strict";
    exports2.AbstractLevel = require_abstract_level().AbstractLevel;
    exports2.AbstractSublevel = require_abstract_level().AbstractSublevel;
    exports2.AbstractIterator = require_abstract_iterator().AbstractIterator;
    exports2.AbstractKeyIterator = require_abstract_iterator().AbstractKeyIterator;
    exports2.AbstractValueIterator = require_abstract_iterator().AbstractValueIterator;
    exports2.AbstractChainedBatch = require_abstract_chained_batch().AbstractChainedBatch;
  }
});

// node_modules/.pnpm/node-gyp-build@4.8.4/node_modules/node-gyp-build/node-gyp-build.js
var require_node_gyp_build = __commonJS({
  "node_modules/.pnpm/node-gyp-build@4.8.4/node_modules/node-gyp-build/node-gyp-build.js"(exports2, module2) {
    "use strict";
    var fs9 = require("fs");
    var path14 = require("path");
    var os = require("os");
    var runtimeRequire = typeof __webpack_require__ === "function" ? __non_webpack_require__ : require;
    var vars = process.config && process.config.variables || {};
    var prebuildsOnly = !!process.env.PREBUILDS_ONLY;
    var abi = process.versions.modules;
    var runtime = isElectron() ? "electron" : isNwjs() ? "node-webkit" : "node";
    var arch = process.env.npm_config_arch || os.arch();
    var platform = process.env.npm_config_platform || os.platform();
    var libc = process.env.LIBC || (isAlpine(platform) ? "musl" : "glibc");
    var armv = process.env.ARM_VERSION || (arch === "arm64" ? "8" : vars.arm_version) || "";
    var uv = (process.versions.uv || "").split(".")[0];
    module2.exports = load3;
    function load3(dir) {
      return runtimeRequire(load3.resolve(dir));
    }
    load3.resolve = load3.path = function(dir) {
      dir = path14.resolve(dir || ".");
      try {
        var name = runtimeRequire(path14.join(dir, "package.json")).name.toUpperCase().replace(/-/g, "_");
        if (process.env[name + "_PREBUILD"]) dir = process.env[name + "_PREBUILD"];
      } catch (err) {
      }
      if (!prebuildsOnly) {
        var release = getFirst(path14.join(dir, "build/Release"), matchBuild);
        if (release) return release;
        var debug = getFirst(path14.join(dir, "build/Debug"), matchBuild);
        if (debug) return debug;
      }
      var prebuild = resolve(dir);
      if (prebuild) return prebuild;
      var nearby = resolve(path14.dirname(process.execPath));
      if (nearby) return nearby;
      var target = [
        "platform=" + platform,
        "arch=" + arch,
        "runtime=" + runtime,
        "abi=" + abi,
        "uv=" + uv,
        armv ? "armv=" + armv : "",
        "libc=" + libc,
        "node=" + process.versions.node,
        process.versions.electron ? "electron=" + process.versions.electron : "",
        typeof __webpack_require__ === "function" ? "webpack=true" : ""
        // eslint-disable-line
      ].filter(Boolean).join(" ");
      throw new Error("No native build was found for " + target + "\n    loaded from: " + dir + "\n");
      function resolve(dir2) {
        var tuples = readdirSync(path14.join(dir2, "prebuilds")).map(parseTuple);
        var tuple = tuples.filter(matchTuple(platform, arch)).sort(compareTuples)[0];
        if (!tuple) return;
        var prebuilds = path14.join(dir2, "prebuilds", tuple.name);
        var parsed = readdirSync(prebuilds).map(parseTags);
        var candidates = parsed.filter(matchTags(runtime, abi));
        var winner = candidates.sort(compareTags(runtime))[0];
        if (winner) return path14.join(prebuilds, winner.file);
      }
    };
    function readdirSync(dir) {
      try {
        return fs9.readdirSync(dir);
      } catch (err) {
        return [];
      }
    }
    function getFirst(dir, filter) {
      var files = readdirSync(dir).filter(filter);
      return files[0] && path14.join(dir, files[0]);
    }
    function matchBuild(name) {
      return /\.node$/.test(name);
    }
    function parseTuple(name) {
      var arr = name.split("-");
      if (arr.length !== 2) return;
      var platform2 = arr[0];
      var architectures = arr[1].split("+");
      if (!platform2) return;
      if (!architectures.length) return;
      if (!architectures.every(Boolean)) return;
      return { name, platform: platform2, architectures };
    }
    function matchTuple(platform2, arch2) {
      return function(tuple) {
        if (tuple == null) return false;
        if (tuple.platform !== platform2) return false;
        return tuple.architectures.includes(arch2);
      };
    }
    function compareTuples(a, b) {
      return a.architectures.length - b.architectures.length;
    }
    function parseTags(file) {
      var arr = file.split(".");
      var extension = arr.pop();
      var tags = { file, specificity: 0 };
      if (extension !== "node") return;
      for (var i = 0; i < arr.length; i++) {
        var tag = arr[i];
        if (tag === "node" || tag === "electron" || tag === "node-webkit") {
          tags.runtime = tag;
        } else if (tag === "napi") {
          tags.napi = true;
        } else if (tag.slice(0, 3) === "abi") {
          tags.abi = tag.slice(3);
        } else if (tag.slice(0, 2) === "uv") {
          tags.uv = tag.slice(2);
        } else if (tag.slice(0, 4) === "armv") {
          tags.armv = tag.slice(4);
        } else if (tag === "glibc" || tag === "musl") {
          tags.libc = tag;
        } else {
          continue;
        }
        tags.specificity++;
      }
      return tags;
    }
    function matchTags(runtime2, abi2) {
      return function(tags) {
        if (tags == null) return false;
        if (tags.runtime && tags.runtime !== runtime2 && !runtimeAgnostic(tags)) return false;
        if (tags.abi && tags.abi !== abi2 && !tags.napi) return false;
        if (tags.uv && tags.uv !== uv) return false;
        if (tags.armv && tags.armv !== armv) return false;
        if (tags.libc && tags.libc !== libc) return false;
        return true;
      };
    }
    function runtimeAgnostic(tags) {
      return tags.runtime === "node" && tags.napi;
    }
    function compareTags(runtime2) {
      return function(a, b) {
        if (a.runtime !== b.runtime) {
          return a.runtime === runtime2 ? -1 : 1;
        } else if (a.abi !== b.abi) {
          return a.abi ? -1 : 1;
        } else if (a.specificity !== b.specificity) {
          return a.specificity > b.specificity ? -1 : 1;
        } else {
          return 0;
        }
      };
    }
    function isNwjs() {
      return !!(process.versions && process.versions.nw);
    }
    function isElectron() {
      if (process.versions && process.versions.electron) return true;
      if (process.env.ELECTRON_RUN_AS_NODE) return true;
      return typeof window !== "undefined" && window.process && window.process.type === "renderer";
    }
    function isAlpine(platform2) {
      return platform2 === "linux" && fs9.existsSync("/etc/alpine-release");
    }
    load3.parseTags = parseTags;
    load3.matchTags = matchTags;
    load3.compareTags = compareTags;
    load3.parseTuple = parseTuple;
    load3.matchTuple = matchTuple;
    load3.compareTuples = compareTuples;
  }
});

// node_modules/.pnpm/node-gyp-build@4.8.4/node_modules/node-gyp-build/index.js
var require_node_gyp_build2 = __commonJS({
  "node_modules/.pnpm/node-gyp-build@4.8.4/node_modules/node-gyp-build/index.js"(exports2, module2) {
    "use strict";
    var runtimeRequire = typeof __webpack_require__ === "function" ? __non_webpack_require__ : require;
    if (typeof runtimeRequire.addon === "function") {
      module2.exports = runtimeRequire.addon.bind(runtimeRequire);
    } else {
      module2.exports = require_node_gyp_build();
    }
  }
});

// node_modules/.pnpm/classic-level@2.0.0/node_modules/classic-level/binding.js
var require_binding = __commonJS({
  "node_modules/.pnpm/classic-level@2.0.0/node_modules/classic-level/binding.js"(exports2, module2) {
    "use strict";
    module2.exports = require_node_gyp_build2()(__dirname);
  }
});

// node_modules/.pnpm/classic-level@2.0.0/node_modules/classic-level/chained-batch.js
var require_chained_batch = __commonJS({
  "node_modules/.pnpm/classic-level@2.0.0/node_modules/classic-level/chained-batch.js"(exports2) {
    "use strict";
    var { AbstractChainedBatch } = require_abstract_level2();
    var binding = require_binding();
    var kContext = Symbol("context");
    var ChainedBatch = class extends AbstractChainedBatch {
      constructor(db, context) {
        super(db);
        this[kContext] = binding.batch_init(context);
      }
      _put(key, value) {
        binding.batch_put(this[kContext], key, value);
      }
      _del(key) {
        binding.batch_del(this[kContext], key);
      }
      _clear() {
        binding.batch_clear(this[kContext]);
      }
      async _write(options) {
        return binding.batch_write(this[kContext], options);
      }
      async _close() {
      }
    };
    exports2.ChainedBatch = ChainedBatch;
  }
});

// node_modules/.pnpm/classic-level@2.0.0/node_modules/classic-level/iterator.js
var require_iterator = __commonJS({
  "node_modules/.pnpm/classic-level@2.0.0/node_modules/classic-level/iterator.js"(exports2) {
    "use strict";
    var { AbstractIterator } = require_abstract_level2();
    var binding = require_binding();
    var kContext = Symbol("context");
    var kCache = Symbol("cache");
    var kFirst = Symbol("first");
    var kPosition = Symbol("position");
    var kState = Symbol("state");
    var kSignal = Symbol("signal");
    var kAbort = Symbol("abort");
    var empty = [];
    var STATE_ENDED = 1;
    var Iterator = class extends AbstractIterator {
      constructor(db, context, options) {
        super(db, options);
        this[kState] = new Uint8Array(1);
        this[kContext] = binding.iterator_init(context, this[kState], options);
        this[kFirst] = true;
        this[kCache] = empty;
        this[kPosition] = 0;
        this[kAbort] = this[kAbort].bind(this);
        if (options.signal != null) {
          this[kSignal] = options.signal;
          this[kSignal].addEventListener("abort", this[kAbort], { once: true });
        } else {
          this[kSignal] = null;
        }
      }
      _seek(target, options) {
        this[kFirst] = true;
        this[kCache] = empty;
        this[kState][0] &= ~STATE_ENDED;
        this[kPosition] = 0;
        binding.iterator_seek(this[kContext], target);
      }
      async _next() {
        if (this[kPosition] < this[kCache].length) {
          return this[kCache][this[kPosition]++];
        }
        if ((this[kState][0] & STATE_ENDED) !== 0) {
          return void 0;
        }
        if (this[kFirst]) {
          this[kFirst] = false;
          this[kCache] = await binding.iterator_nextv(this[kContext], 1);
          this[kPosition] = 0;
        } else {
          this[kCache] = await binding.iterator_nextv(this[kContext], 1e3);
          this[kPosition] = 0;
        }
        if (this[kPosition] < this[kCache].length) {
          return this[kCache][this[kPosition]++];
        }
      }
      async _nextv(size, options) {
        this[kFirst] = false;
        if (this[kPosition] < this[kCache].length) {
          const length = Math.min(size, this[kCache].length - this[kPosition]);
          const chunk = this[kCache].slice(this[kPosition], this[kPosition] + length);
          this[kPosition] += length;
          return chunk;
        }
        if ((this[kState][0] & STATE_ENDED) !== 0) {
          return [];
        }
        return binding.iterator_nextv(this[kContext], size);
      }
      async _close() {
        this[kCache] = empty;
        if (this[kSignal] !== null) {
          this[kSignal].removeEventListener("abort", this[kAbort]);
          this[kSignal] = null;
        }
        return binding.iterator_close(this[kContext]);
      }
      [kAbort]() {
        this[kSignal] = null;
        binding.iterator_abort(this[kContext]);
      }
      // Undocumented, exposed for tests only
      get cached() {
        return this[kCache].length - this[kPosition];
      }
    };
    exports2.Iterator = Iterator;
  }
});

// node_modules/.pnpm/classic-level@2.0.0/node_modules/classic-level/index.js
var require_classic_level = __commonJS({
  "node_modules/.pnpm/classic-level@2.0.0/node_modules/classic-level/index.js"(exports2) {
    "use strict";
    var { AbstractLevel } = require_abstract_level2();
    var ModuleError = require_module_error();
    var fsp = require("fs/promises");
    var binding = require_binding();
    var { ChainedBatch } = require_chained_batch();
    var { Iterator } = require_iterator();
    var kContext = Symbol("context");
    var kLocation = Symbol("location");
    var ClassicLevel = class extends AbstractLevel {
      constructor(location, options) {
        if (typeof location !== "string" || location === "") {
          throw new TypeError("The first argument 'location' must be a non-empty string");
        }
        super({
          encodings: {
            buffer: true,
            utf8: true,
            view: true
          },
          seek: true,
          createIfMissing: true,
          errorIfExists: true,
          additionalMethods: {
            approximateSize: true,
            compactRange: true
          },
          signals: {
            iterators: true
          }
        }, options);
        this[kLocation] = location;
        this[kContext] = binding.db_init();
      }
      get location() {
        return this[kLocation];
      }
      async _open(options) {
        if (options.createIfMissing) {
          await fsp.mkdir(this[kLocation], { recursive: true });
        }
        return binding.db_open(this[kContext], this[kLocation], options);
      }
      async _close() {
        return binding.db_close(this[kContext]);
      }
      async _put(key, value, options) {
        return binding.db_put(this[kContext], key, value, options);
      }
      async _get(key, options) {
        return binding.db_get(
          this[kContext],
          key,
          encodingEnum(options.valueEncoding),
          options.fillCache
        );
      }
      async _getMany(keys, options) {
        return binding.db_get_many(this[kContext], keys, options);
      }
      async _del(key, options) {
        return binding.db_del(this[kContext], key, options);
      }
      async _clear(options) {
        return binding.db_clear(this[kContext], options);
      }
      _chainedBatch() {
        return new ChainedBatch(this, this[kContext]);
      }
      async _batch(operations, options) {
        return binding.batch_do(this[kContext], operations, options);
      }
      async approximateSize(start, end, options) {
        if (arguments.length < 2) {
          throw new TypeError("The arguments 'start' and 'end' are required");
        } else if (typeof options !== "object") {
          options = null;
        }
        if (this.status === "opening") {
          return this.deferAsync(() => this.approximateSize(start, end, options));
        } else if (this.status !== "open") {
          throw new ModuleError("Database is not open: cannot call approximateSize()", {
            code: "LEVEL_DATABASE_NOT_OPEN"
          });
        } else {
          const keyEncoding = this.keyEncoding(options && options.keyEncoding);
          start = keyEncoding.encode(start);
          end = keyEncoding.encode(end);
          return binding.db_approximate_size(this[kContext], start, end);
        }
      }
      async compactRange(start, end, options) {
        if (arguments.length < 2) {
          throw new TypeError("The arguments 'start' and 'end' are required");
        } else if (typeof options !== "object") {
          options = null;
        }
        if (this.status === "opening") {
          return this.deferAsync(() => this.compactRange(start, end, options));
        } else if (this.status !== "open") {
          throw new ModuleError("Database is not open: cannot call compactRange()", {
            code: "LEVEL_DATABASE_NOT_OPEN"
          });
        } else {
          const keyEncoding = this.keyEncoding(options && options.keyEncoding);
          start = keyEncoding.encode(start);
          end = keyEncoding.encode(end);
          return binding.db_compact_range(this[kContext], start, end);
        }
      }
      getProperty(property) {
        if (typeof property !== "string") {
          throw new TypeError("The first argument 'property' must be a string");
        }
        if (this.status !== "open") {
          throw new ModuleError("Database is not open", {
            code: "LEVEL_DATABASE_NOT_OPEN"
          });
        }
        return binding.db_get_property(this[kContext], property);
      }
      _iterator(options) {
        return new Iterator(this, this[kContext], options);
      }
      static async destroy(location) {
        if (typeof location !== "string" || location === "") {
          throw new TypeError("The first argument 'location' must be a non-empty string");
        }
        return binding.destroy_db(location);
      }
      static async repair(location) {
        if (typeof location !== "string" || location === "") {
          throw new TypeError("The first argument 'location' must be a non-empty string");
        }
        return binding.repair_db(location);
      }
    };
    exports2.ClassicLevel = ClassicLevel;
    var encodingEnum = function(encoding) {
      if (encoding === "buffer") return 0;
      if (encoding === "utf8") return 1;
      if (encoding === "view") return 2;
    };
  }
});

// node_modules/.pnpm/dotenv@16.6.1/node_modules/dotenv/package.json
var require_package = __commonJS({
  "node_modules/.pnpm/dotenv@16.6.1/node_modules/dotenv/package.json"(exports2, module2) {
    module2.exports = {
      name: "dotenv",
      version: "16.6.1",
      description: "Loads environment variables from .env file",
      main: "lib/main.js",
      types: "lib/main.d.ts",
      exports: {
        ".": {
          types: "./lib/main.d.ts",
          require: "./lib/main.js",
          default: "./lib/main.js"
        },
        "./config": "./config.js",
        "./config.js": "./config.js",
        "./lib/env-options": "./lib/env-options.js",
        "./lib/env-options.js": "./lib/env-options.js",
        "./lib/cli-options": "./lib/cli-options.js",
        "./lib/cli-options.js": "./lib/cli-options.js",
        "./package.json": "./package.json"
      },
      scripts: {
        "dts-check": "tsc --project tests/types/tsconfig.json",
        lint: "standard",
        pretest: "npm run lint && npm run dts-check",
        test: "tap run --allow-empty-coverage --disable-coverage --timeout=60000",
        "test:coverage": "tap run --show-full-coverage --timeout=60000 --coverage-report=text --coverage-report=lcov",
        prerelease: "npm test",
        release: "standard-version"
      },
      repository: {
        type: "git",
        url: "git://github.com/motdotla/dotenv.git"
      },
      homepage: "https://github.com/motdotla/dotenv#readme",
      funding: "https://dotenvx.com",
      keywords: [
        "dotenv",
        "env",
        ".env",
        "environment",
        "variables",
        "config",
        "settings"
      ],
      readmeFilename: "README.md",
      license: "BSD-2-Clause",
      devDependencies: {
        "@types/node": "^18.11.3",
        decache: "^4.6.2",
        sinon: "^14.0.1",
        standard: "^17.0.0",
        "standard-version": "^9.5.0",
        tap: "^19.2.0",
        typescript: "^4.8.4"
      },
      engines: {
        node: ">=12"
      },
      browser: {
        fs: false
      }
    };
  }
});

// node_modules/.pnpm/dotenv@16.6.1/node_modules/dotenv/lib/main.js
var require_main = __commonJS({
  "node_modules/.pnpm/dotenv@16.6.1/node_modules/dotenv/lib/main.js"(exports2, module2) {
    "use strict";
    var fs9 = require("fs");
    var path14 = require("path");
    var os = require("os");
    var crypto2 = require("crypto");
    var packageJson = require_package();
    var version = packageJson.version;
    var LINE = /(?:^|^)\s*(?:export\s+)?([\w.-]+)(?:\s*=\s*?|:\s+?)(\s*'(?:\\'|[^'])*'|\s*"(?:\\"|[^"])*"|\s*`(?:\\`|[^`])*`|[^#\r\n]+)?\s*(?:#.*)?(?:$|$)/mg;
    function parse(src) {
      const obj = {};
      let lines = src.toString();
      lines = lines.replace(/\r\n?/mg, "\n");
      let match;
      while ((match = LINE.exec(lines)) != null) {
        const key = match[1];
        let value = match[2] || "";
        value = value.trim();
        const maybeQuote = value[0];
        value = value.replace(/^(['"`])([\s\S]*)\1$/mg, "$2");
        if (maybeQuote === '"') {
          value = value.replace(/\\n/g, "\n");
          value = value.replace(/\\r/g, "\r");
        }
        obj[key] = value;
      }
      return obj;
    }
    function _parseVault(options) {
      options = options || {};
      const vaultPath = _vaultPath(options);
      options.path = vaultPath;
      const result = DotenvModule.configDotenv(options);
      if (!result.parsed) {
        const err = new Error(`MISSING_DATA: Cannot parse ${vaultPath} for an unknown reason`);
        err.code = "MISSING_DATA";
        throw err;
      }
      const keys = _dotenvKey(options).split(",");
      const length = keys.length;
      let decrypted;
      for (let i = 0; i < length; i++) {
        try {
          const key = keys[i].trim();
          const attrs = _instructions(result, key);
          decrypted = DotenvModule.decrypt(attrs.ciphertext, attrs.key);
          break;
        } catch (error) {
          if (i + 1 >= length) {
            throw error;
          }
        }
      }
      return DotenvModule.parse(decrypted);
    }
    function _warn(message) {
      console.log(`[dotenv@${version}][WARN] ${message}`);
    }
    function _debug(message) {
      console.log(`[dotenv@${version}][DEBUG] ${message}`);
    }
    function _log(message) {
      console.log(`[dotenv@${version}] ${message}`);
    }
    function _dotenvKey(options) {
      if (options && options.DOTENV_KEY && options.DOTENV_KEY.length > 0) {
        return options.DOTENV_KEY;
      }
      if (process.env.DOTENV_KEY && process.env.DOTENV_KEY.length > 0) {
        return process.env.DOTENV_KEY;
      }
      return "";
    }
    function _instructions(result, dotenvKey) {
      let uri;
      try {
        uri = new URL(dotenvKey);
      } catch (error) {
        if (error.code === "ERR_INVALID_URL") {
          const err = new Error("INVALID_DOTENV_KEY: Wrong format. Must be in valid uri format like dotenv://:key_1234@dotenvx.com/vault/.env.vault?environment=development");
          err.code = "INVALID_DOTENV_KEY";
          throw err;
        }
        throw error;
      }
      const key = uri.password;
      if (!key) {
        const err = new Error("INVALID_DOTENV_KEY: Missing key part");
        err.code = "INVALID_DOTENV_KEY";
        throw err;
      }
      const environment = uri.searchParams.get("environment");
      if (!environment) {
        const err = new Error("INVALID_DOTENV_KEY: Missing environment part");
        err.code = "INVALID_DOTENV_KEY";
        throw err;
      }
      const environmentKey = `DOTENV_VAULT_${environment.toUpperCase()}`;
      const ciphertext = result.parsed[environmentKey];
      if (!ciphertext) {
        const err = new Error(`NOT_FOUND_DOTENV_ENVIRONMENT: Cannot locate environment ${environmentKey} in your .env.vault file.`);
        err.code = "NOT_FOUND_DOTENV_ENVIRONMENT";
        throw err;
      }
      return { ciphertext, key };
    }
    function _vaultPath(options) {
      let possibleVaultPath = null;
      if (options && options.path && options.path.length > 0) {
        if (Array.isArray(options.path)) {
          for (const filepath of options.path) {
            if (fs9.existsSync(filepath)) {
              possibleVaultPath = filepath.endsWith(".vault") ? filepath : `${filepath}.vault`;
            }
          }
        } else {
          possibleVaultPath = options.path.endsWith(".vault") ? options.path : `${options.path}.vault`;
        }
      } else {
        possibleVaultPath = path14.resolve(process.cwd(), ".env.vault");
      }
      if (fs9.existsSync(possibleVaultPath)) {
        return possibleVaultPath;
      }
      return null;
    }
    function _resolveHome(envPath) {
      return envPath[0] === "~" ? path14.join(os.homedir(), envPath.slice(1)) : envPath;
    }
    function _configVault(options) {
      const debug = Boolean(options && options.debug);
      const quiet = options && "quiet" in options ? options.quiet : true;
      if (debug || !quiet) {
        _log("Loading env from encrypted .env.vault");
      }
      const parsed = DotenvModule._parseVault(options);
      let processEnv = process.env;
      if (options && options.processEnv != null) {
        processEnv = options.processEnv;
      }
      DotenvModule.populate(processEnv, parsed, options);
      return { parsed };
    }
    function configDotenv(options) {
      const dotenvPath = path14.resolve(process.cwd(), ".env");
      let encoding = "utf8";
      const debug = Boolean(options && options.debug);
      const quiet = options && "quiet" in options ? options.quiet : true;
      if (options && options.encoding) {
        encoding = options.encoding;
      } else {
        if (debug) {
          _debug("No encoding is specified. UTF-8 is used by default");
        }
      }
      let optionPaths = [dotenvPath];
      if (options && options.path) {
        if (!Array.isArray(options.path)) {
          optionPaths = [_resolveHome(options.path)];
        } else {
          optionPaths = [];
          for (const filepath of options.path) {
            optionPaths.push(_resolveHome(filepath));
          }
        }
      }
      let lastError;
      const parsedAll = {};
      for (const path15 of optionPaths) {
        try {
          const parsed = DotenvModule.parse(fs9.readFileSync(path15, { encoding }));
          DotenvModule.populate(parsedAll, parsed, options);
        } catch (e) {
          if (debug) {
            _debug(`Failed to load ${path15} ${e.message}`);
          }
          lastError = e;
        }
      }
      let processEnv = process.env;
      if (options && options.processEnv != null) {
        processEnv = options.processEnv;
      }
      DotenvModule.populate(processEnv, parsedAll, options);
      if (debug || !quiet) {
        const keysCount = Object.keys(parsedAll).length;
        const shortPaths = [];
        for (const filePath of optionPaths) {
          try {
            const relative = path14.relative(process.cwd(), filePath);
            shortPaths.push(relative);
          } catch (e) {
            if (debug) {
              _debug(`Failed to load ${filePath} ${e.message}`);
            }
            lastError = e;
          }
        }
        _log(`injecting env (${keysCount}) from ${shortPaths.join(",")}`);
      }
      if (lastError) {
        return { parsed: parsedAll, error: lastError };
      } else {
        return { parsed: parsedAll };
      }
    }
    function config2(options) {
      if (_dotenvKey(options).length === 0) {
        return DotenvModule.configDotenv(options);
      }
      const vaultPath = _vaultPath(options);
      if (!vaultPath) {
        _warn(`You set DOTENV_KEY but you are missing a .env.vault file at ${vaultPath}. Did you forget to build it?`);
        return DotenvModule.configDotenv(options);
      }
      return DotenvModule._configVault(options);
    }
    function decrypt(encrypted, keyStr) {
      const key = Buffer.from(keyStr.slice(-64), "hex");
      let ciphertext = Buffer.from(encrypted, "base64");
      const nonce = ciphertext.subarray(0, 12);
      const authTag = ciphertext.subarray(-16);
      ciphertext = ciphertext.subarray(12, -16);
      try {
        const aesgcm = crypto2.createDecipheriv("aes-256-gcm", key, nonce);
        aesgcm.setAuthTag(authTag);
        return `${aesgcm.update(ciphertext)}${aesgcm.final()}`;
      } catch (error) {
        const isRange = error instanceof RangeError;
        const invalidKeyLength = error.message === "Invalid key length";
        const decryptionFailed = error.message === "Unsupported state or unable to authenticate data";
        if (isRange || invalidKeyLength) {
          const err = new Error("INVALID_DOTENV_KEY: It must be 64 characters long (or more)");
          err.code = "INVALID_DOTENV_KEY";
          throw err;
        } else if (decryptionFailed) {
          const err = new Error("DECRYPTION_FAILED: Please check your DOTENV_KEY");
          err.code = "DECRYPTION_FAILED";
          throw err;
        } else {
          throw error;
        }
      }
    }
    function populate(processEnv, parsed, options = {}) {
      const debug = Boolean(options && options.debug);
      const override = Boolean(options && options.override);
      if (typeof parsed !== "object") {
        const err = new Error("OBJECT_REQUIRED: Please check the processEnv argument being passed to populate");
        err.code = "OBJECT_REQUIRED";
        throw err;
      }
      for (const key of Object.keys(parsed)) {
        if (Object.prototype.hasOwnProperty.call(processEnv, key)) {
          if (override === true) {
            processEnv[key] = parsed[key];
          }
          if (debug) {
            if (override === true) {
              _debug(`"${key}" is already defined and WAS overwritten`);
            } else {
              _debug(`"${key}" is already defined and was NOT overwritten`);
            }
          }
        } else {
          processEnv[key] = parsed[key];
        }
      }
    }
    var DotenvModule = {
      configDotenv,
      _configVault,
      _parseVault,
      config: config2,
      decrypt,
      parse,
      populate
    };
    module2.exports.configDotenv = DotenvModule.configDotenv;
    module2.exports._configVault = DotenvModule._configVault;
    module2.exports._parseVault = DotenvModule._parseVault;
    module2.exports.config = DotenvModule.config;
    module2.exports.decrypt = DotenvModule.decrypt;
    module2.exports.parse = DotenvModule.parse;
    module2.exports.populate = DotenvModule.populate;
    module2.exports = DotenvModule;
  }
});

// node_modules/.pnpm/@foundryvtt+utils@https+++codeload.github.com+TheSmeltingAnvil+fvtt-utils+tar.gz+ad96a9_532cc5638cc7a7b0ad44ea794ed2bba7/node_modules/@foundryvtt/utils/dist/index.js
var require_dist = __commonJS({
  "node_modules/.pnpm/@foundryvtt+utils@https+++codeload.github.com+TheSmeltingAnvil+fvtt-utils+tar.gz+ad96a9_532cc5638cc7a7b0ad44ea794ed2bba7/node_modules/@foundryvtt/utils/dist/index.js"(exports2, module2) {
    "use strict";
    var __create2 = Object.create;
    var __defProp2 = Object.defineProperty;
    var __getOwnPropDesc2 = Object.getOwnPropertyDescriptor;
    var __getOwnPropNames2 = Object.getOwnPropertyNames;
    var __getProtoOf2 = Object.getPrototypeOf;
    var __hasOwnProp2 = Object.prototype.hasOwnProperty;
    var __export2 = (target, all) => {
      for (var name in all)
        __defProp2(target, name, { get: all[name], enumerable: true });
    };
    var __copyProps2 = (to, from, except, desc) => {
      if (from && typeof from === "object" || typeof from === "function") {
        for (let key of __getOwnPropNames2(from))
          if (!__hasOwnProp2.call(to, key) && key !== except)
            __defProp2(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc2(from, key)) || desc.enumerable });
      }
      return to;
    };
    var __toESM2 = (mod, isNodeMode, target) => (target = mod != null ? __create2(__getProtoOf2(mod)) : {}, __copyProps2(
      // If the importer is in node compatibility mode or this is not an ESM
      // file that has been converted to a CommonJS file using a Babel-
      // compatible transform (i.e. "__esModule" has not been set), then set
      // "default" to the CommonJS "module.exports" for node compatibility.
      isNodeMode || !mod || !mod.__esModule ? __defProp2(target, "default", { value: mod, enumerable: true }) : target,
      mod
    ));
    var __toCommonJS2 = (mod) => __copyProps2(__defProp2({}, "__esModule", { value: true }), mod);
    var index_exports2 = {};
    __export2(index_exports2, {
      compilePack: () => compilePack,
      extractPack: () => extractPack,
      findManifest: () => findManifest2,
      getFoundryConfigInfo: () => getFoundryConfigInfo,
      launchFoundry: () => launchFoundry
    });
    module2.exports = __toCommonJS2(index_exports2);
    var import_fs_extra22 = __toESM2(require("fs-extra"));
    var import_path22 = __toESM2(require("path"));
    function isNothing(subject) {
      return typeof subject === "undefined" || subject === null;
    }
    function isObject(subject) {
      return typeof subject === "object" && subject !== null;
    }
    function toArray(sequence) {
      if (Array.isArray(sequence)) return sequence;
      else if (isNothing(sequence)) return [];
      return [sequence];
    }
    function extend(target, source) {
      var index, length, key, sourceKeys;
      if (source) {
        sourceKeys = Object.keys(source);
        for (index = 0, length = sourceKeys.length; index < length; index += 1) {
          key = sourceKeys[index];
          target[key] = source[key];
        }
      }
      return target;
    }
    function repeat(string, count) {
      var result = "", cycle;
      for (cycle = 0; cycle < count; cycle += 1) {
        result += string;
      }
      return result;
    }
    function isNegativeZero(number) {
      return number === 0 && Number.NEGATIVE_INFINITY === 1 / number;
    }
    var isNothing_1 = isNothing;
    var isObject_1 = isObject;
    var toArray_1 = toArray;
    var repeat_1 = repeat;
    var isNegativeZero_1 = isNegativeZero;
    var extend_1 = extend;
    var common = {
      isNothing: isNothing_1,
      isObject: isObject_1,
      toArray: toArray_1,
      repeat: repeat_1,
      isNegativeZero: isNegativeZero_1,
      extend: extend_1
    };
    function formatError(exception2, compact) {
      var where = "", message = exception2.reason || "(unknown reason)";
      if (!exception2.mark) return message;
      if (exception2.mark.name) {
        where += 'in "' + exception2.mark.name + '" ';
      }
      where += "(" + (exception2.mark.line + 1) + ":" + (exception2.mark.column + 1) + ")";
      if (!compact && exception2.mark.snippet) {
        where += "\n\n" + exception2.mark.snippet;
      }
      return message + " " + where;
    }
    function YAMLException$1(reason, mark) {
      Error.call(this);
      this.name = "YAMLException";
      this.reason = reason;
      this.mark = mark;
      this.message = formatError(this, false);
      if (Error.captureStackTrace) {
        Error.captureStackTrace(this, this.constructor);
      } else {
        this.stack = new Error().stack || "";
      }
    }
    YAMLException$1.prototype = Object.create(Error.prototype);
    YAMLException$1.prototype.constructor = YAMLException$1;
    YAMLException$1.prototype.toString = function toString(compact) {
      return this.name + ": " + formatError(this, compact);
    };
    var exception = YAMLException$1;
    function getLine(buffer, lineStart, lineEnd, position, maxLineLength) {
      var head = "";
      var tail = "";
      var maxHalfLength = Math.floor(maxLineLength / 2) - 1;
      if (position - lineStart > maxHalfLength) {
        head = " ... ";
        lineStart = position - maxHalfLength + head.length;
      }
      if (lineEnd - position > maxHalfLength) {
        tail = " ...";
        lineEnd = position + maxHalfLength - tail.length;
      }
      return {
        str: head + buffer.slice(lineStart, lineEnd).replace(/\t/g, "\u2192") + tail,
        pos: position - lineStart + head.length
        // relative position
      };
    }
    function padStart(string, max) {
      return common.repeat(" ", max - string.length) + string;
    }
    function makeSnippet(mark, options) {
      options = Object.create(options || null);
      if (!mark.buffer) return null;
      if (!options.maxLength) options.maxLength = 79;
      if (typeof options.indent !== "number") options.indent = 1;
      if (typeof options.linesBefore !== "number") options.linesBefore = 3;
      if (typeof options.linesAfter !== "number") options.linesAfter = 2;
      var re = /\r?\n|\r|\0/g;
      var lineStarts = [0];
      var lineEnds = [];
      var match;
      var foundLineNo = -1;
      while (match = re.exec(mark.buffer)) {
        lineEnds.push(match.index);
        lineStarts.push(match.index + match[0].length);
        if (mark.position <= match.index && foundLineNo < 0) {
          foundLineNo = lineStarts.length - 2;
        }
      }
      if (foundLineNo < 0) foundLineNo = lineStarts.length - 1;
      var result = "", i2, line;
      var lineNoLength = Math.min(mark.line + options.linesAfter, lineEnds.length).toString().length;
      var maxLineLength = options.maxLength - (options.indent + lineNoLength + 3);
      for (i2 = 1; i2 <= options.linesBefore; i2++) {
        if (foundLineNo - i2 < 0) break;
        line = getLine(
          mark.buffer,
          lineStarts[foundLineNo - i2],
          lineEnds[foundLineNo - i2],
          mark.position - (lineStarts[foundLineNo] - lineStarts[foundLineNo - i2]),
          maxLineLength
        );
        result = common.repeat(" ", options.indent) + padStart((mark.line - i2 + 1).toString(), lineNoLength) + " | " + line.str + "\n" + result;
      }
      line = getLine(mark.buffer, lineStarts[foundLineNo], lineEnds[foundLineNo], mark.position, maxLineLength);
      result += common.repeat(" ", options.indent) + padStart((mark.line + 1).toString(), lineNoLength) + " | " + line.str + "\n";
      result += common.repeat("-", options.indent + lineNoLength + 3 + line.pos) + "^\n";
      for (i2 = 1; i2 <= options.linesAfter; i2++) {
        if (foundLineNo + i2 >= lineEnds.length) break;
        line = getLine(
          mark.buffer,
          lineStarts[foundLineNo + i2],
          lineEnds[foundLineNo + i2],
          mark.position - (lineStarts[foundLineNo] - lineStarts[foundLineNo + i2]),
          maxLineLength
        );
        result += common.repeat(" ", options.indent) + padStart((mark.line + i2 + 1).toString(), lineNoLength) + " | " + line.str + "\n";
      }
      return result.replace(/\n$/, "");
    }
    var snippet = makeSnippet;
    var TYPE_CONSTRUCTOR_OPTIONS = [
      "kind",
      "multi",
      "resolve",
      "construct",
      "instanceOf",
      "predicate",
      "represent",
      "representName",
      "defaultStyle",
      "styleAliases"
    ];
    var YAML_NODE_KINDS = [
      "scalar",
      "sequence",
      "mapping"
    ];
    function compileStyleAliases(map2) {
      var result = {};
      if (map2 !== null) {
        Object.keys(map2).forEach(function(style) {
          map2[style].forEach(function(alias) {
            result[String(alias)] = style;
          });
        });
      }
      return result;
    }
    function Type$1(tag, options) {
      options = options || {};
      Object.keys(options).forEach(function(name) {
        if (TYPE_CONSTRUCTOR_OPTIONS.indexOf(name) === -1) {
          throw new exception('Unknown option "' + name + '" is met in definition of "' + tag + '" YAML type.');
        }
      });
      this.options = options;
      this.tag = tag;
      this.kind = options["kind"] || null;
      this.resolve = options["resolve"] || function() {
        return true;
      };
      this.construct = options["construct"] || function(data) {
        return data;
      };
      this.instanceOf = options["instanceOf"] || null;
      this.predicate = options["predicate"] || null;
      this.represent = options["represent"] || null;
      this.representName = options["representName"] || null;
      this.defaultStyle = options["defaultStyle"] || null;
      this.multi = options["multi"] || false;
      this.styleAliases = compileStyleAliases(options["styleAliases"] || null);
      if (YAML_NODE_KINDS.indexOf(this.kind) === -1) {
        throw new exception('Unknown kind "' + this.kind + '" is specified for "' + tag + '" YAML type.');
      }
    }
    var type = Type$1;
    function compileList(schema2, name) {
      var result = [];
      schema2[name].forEach(function(currentType) {
        var newIndex = result.length;
        result.forEach(function(previousType, previousIndex) {
          if (previousType.tag === currentType.tag && previousType.kind === currentType.kind && previousType.multi === currentType.multi) {
            newIndex = previousIndex;
          }
        });
        result[newIndex] = currentType;
      });
      return result;
    }
    function compileMap() {
      var result = {
        scalar: {},
        sequence: {},
        mapping: {},
        fallback: {},
        multi: {
          scalar: [],
          sequence: [],
          mapping: [],
          fallback: []
        }
      }, index, length;
      function collectType(type2) {
        if (type2.multi) {
          result.multi[type2.kind].push(type2);
          result.multi["fallback"].push(type2);
        } else {
          result[type2.kind][type2.tag] = result["fallback"][type2.tag] = type2;
        }
      }
      for (index = 0, length = arguments.length; index < length; index += 1) {
        arguments[index].forEach(collectType);
      }
      return result;
    }
    function Schema$1(definition) {
      return this.extend(definition);
    }
    Schema$1.prototype.extend = function extend2(definition) {
      var implicit = [];
      var explicit = [];
      if (definition instanceof type) {
        explicit.push(definition);
      } else if (Array.isArray(definition)) {
        explicit = explicit.concat(definition);
      } else if (definition && (Array.isArray(definition.implicit) || Array.isArray(definition.explicit))) {
        if (definition.implicit) implicit = implicit.concat(definition.implicit);
        if (definition.explicit) explicit = explicit.concat(definition.explicit);
      } else {
        throw new exception("Schema.extend argument should be a Type, [ Type ], or a schema definition ({ implicit: [...], explicit: [...] })");
      }
      implicit.forEach(function(type$1) {
        if (!(type$1 instanceof type)) {
          throw new exception("Specified list of YAML types (or a single Type object) contains a non-Type object.");
        }
        if (type$1.loadKind && type$1.loadKind !== "scalar") {
          throw new exception("There is a non-scalar type in the implicit list of a schema. Implicit resolving of such types is not supported.");
        }
        if (type$1.multi) {
          throw new exception("There is a multi type in the implicit list of a schema. Multi tags can only be listed as explicit.");
        }
      });
      explicit.forEach(function(type$1) {
        if (!(type$1 instanceof type)) {
          throw new exception("Specified list of YAML types (or a single Type object) contains a non-Type object.");
        }
      });
      var result = Object.create(Schema$1.prototype);
      result.implicit = (this.implicit || []).concat(implicit);
      result.explicit = (this.explicit || []).concat(explicit);
      result.compiledImplicit = compileList(result, "implicit");
      result.compiledExplicit = compileList(result, "explicit");
      result.compiledTypeMap = compileMap(result.compiledImplicit, result.compiledExplicit);
      return result;
    };
    var schema = Schema$1;
    var str = new type("tag:yaml.org,2002:str", {
      kind: "scalar",
      construct: function(data) {
        return data !== null ? data : "";
      }
    });
    var seq = new type("tag:yaml.org,2002:seq", {
      kind: "sequence",
      construct: function(data) {
        return data !== null ? data : [];
      }
    });
    var map = new type("tag:yaml.org,2002:map", {
      kind: "mapping",
      construct: function(data) {
        return data !== null ? data : {};
      }
    });
    var failsafe = new schema({
      explicit: [
        str,
        seq,
        map
      ]
    });
    function resolveYamlNull(data) {
      if (data === null) return true;
      var max = data.length;
      return max === 1 && data === "~" || max === 4 && (data === "null" || data === "Null" || data === "NULL");
    }
    function constructYamlNull() {
      return null;
    }
    function isNull(object) {
      return object === null;
    }
    var _null = new type("tag:yaml.org,2002:null", {
      kind: "scalar",
      resolve: resolveYamlNull,
      construct: constructYamlNull,
      predicate: isNull,
      represent: {
        canonical: function() {
          return "~";
        },
        lowercase: function() {
          return "null";
        },
        uppercase: function() {
          return "NULL";
        },
        camelcase: function() {
          return "Null";
        },
        empty: function() {
          return "";
        }
      },
      defaultStyle: "lowercase"
    });
    function resolveYamlBoolean(data) {
      if (data === null) return false;
      var max = data.length;
      return max === 4 && (data === "true" || data === "True" || data === "TRUE") || max === 5 && (data === "false" || data === "False" || data === "FALSE");
    }
    function constructYamlBoolean(data) {
      return data === "true" || data === "True" || data === "TRUE";
    }
    function isBoolean(object) {
      return Object.prototype.toString.call(object) === "[object Boolean]";
    }
    var bool = new type("tag:yaml.org,2002:bool", {
      kind: "scalar",
      resolve: resolveYamlBoolean,
      construct: constructYamlBoolean,
      predicate: isBoolean,
      represent: {
        lowercase: function(object) {
          return object ? "true" : "false";
        },
        uppercase: function(object) {
          return object ? "TRUE" : "FALSE";
        },
        camelcase: function(object) {
          return object ? "True" : "False";
        }
      },
      defaultStyle: "lowercase"
    });
    function isHexCode(c) {
      return 48 <= c && c <= 57 || 65 <= c && c <= 70 || 97 <= c && c <= 102;
    }
    function isOctCode(c) {
      return 48 <= c && c <= 55;
    }
    function isDecCode(c) {
      return 48 <= c && c <= 57;
    }
    function resolveYamlInteger(data) {
      if (data === null) return false;
      var max = data.length, index = 0, hasDigits = false, ch;
      if (!max) return false;
      ch = data[index];
      if (ch === "-" || ch === "+") {
        ch = data[++index];
      }
      if (ch === "0") {
        if (index + 1 === max) return true;
        ch = data[++index];
        if (ch === "b") {
          index++;
          for (; index < max; index++) {
            ch = data[index];
            if (ch === "_") continue;
            if (ch !== "0" && ch !== "1") return false;
            hasDigits = true;
          }
          return hasDigits && ch !== "_";
        }
        if (ch === "x") {
          index++;
          for (; index < max; index++) {
            ch = data[index];
            if (ch === "_") continue;
            if (!isHexCode(data.charCodeAt(index))) return false;
            hasDigits = true;
          }
          return hasDigits && ch !== "_";
        }
        if (ch === "o") {
          index++;
          for (; index < max; index++) {
            ch = data[index];
            if (ch === "_") continue;
            if (!isOctCode(data.charCodeAt(index))) return false;
            hasDigits = true;
          }
          return hasDigits && ch !== "_";
        }
      }
      if (ch === "_") return false;
      for (; index < max; index++) {
        ch = data[index];
        if (ch === "_") continue;
        if (!isDecCode(data.charCodeAt(index))) {
          return false;
        }
        hasDigits = true;
      }
      if (!hasDigits || ch === "_") return false;
      return true;
    }
    function constructYamlInteger(data) {
      var value = data, sign = 1, ch;
      if (value.indexOf("_") !== -1) {
        value = value.replace(/_/g, "");
      }
      ch = value[0];
      if (ch === "-" || ch === "+") {
        if (ch === "-") sign = -1;
        value = value.slice(1);
        ch = value[0];
      }
      if (value === "0") return 0;
      if (ch === "0") {
        if (value[1] === "b") return sign * parseInt(value.slice(2), 2);
        if (value[1] === "x") return sign * parseInt(value.slice(2), 16);
        if (value[1] === "o") return sign * parseInt(value.slice(2), 8);
      }
      return sign * parseInt(value, 10);
    }
    function isInteger(object) {
      return Object.prototype.toString.call(object) === "[object Number]" && (object % 1 === 0 && !common.isNegativeZero(object));
    }
    var int = new type("tag:yaml.org,2002:int", {
      kind: "scalar",
      resolve: resolveYamlInteger,
      construct: constructYamlInteger,
      predicate: isInteger,
      represent: {
        binary: function(obj) {
          return obj >= 0 ? "0b" + obj.toString(2) : "-0b" + obj.toString(2).slice(1);
        },
        octal: function(obj) {
          return obj >= 0 ? "0o" + obj.toString(8) : "-0o" + obj.toString(8).slice(1);
        },
        decimal: function(obj) {
          return obj.toString(10);
        },
        /* eslint-disable max-len */
        hexadecimal: function(obj) {
          return obj >= 0 ? "0x" + obj.toString(16).toUpperCase() : "-0x" + obj.toString(16).toUpperCase().slice(1);
        }
      },
      defaultStyle: "decimal",
      styleAliases: {
        binary: [2, "bin"],
        octal: [8, "oct"],
        decimal: [10, "dec"],
        hexadecimal: [16, "hex"]
      }
    });
    var YAML_FLOAT_PATTERN = new RegExp(
      // 2.5e4, 2.5 and integers
      "^(?:[-+]?(?:[0-9][0-9_]*)(?:\\.[0-9_]*)?(?:[eE][-+]?[0-9]+)?|\\.[0-9_]+(?:[eE][-+]?[0-9]+)?|[-+]?\\.(?:inf|Inf|INF)|\\.(?:nan|NaN|NAN))$"
    );
    function resolveYamlFloat(data) {
      if (data === null) return false;
      if (!YAML_FLOAT_PATTERN.test(data) || // Quick hack to not allow integers end with `_`
      // Probably should update regexp & check speed
      data[data.length - 1] === "_") {
        return false;
      }
      return true;
    }
    function constructYamlFloat(data) {
      var value, sign;
      value = data.replace(/_/g, "").toLowerCase();
      sign = value[0] === "-" ? -1 : 1;
      if ("+-".indexOf(value[0]) >= 0) {
        value = value.slice(1);
      }
      if (value === ".inf") {
        return sign === 1 ? Number.POSITIVE_INFINITY : Number.NEGATIVE_INFINITY;
      } else if (value === ".nan") {
        return NaN;
      }
      return sign * parseFloat(value, 10);
    }
    var SCIENTIFIC_WITHOUT_DOT = /^[-+]?[0-9]+e/;
    function representYamlFloat(object, style) {
      var res;
      if (isNaN(object)) {
        switch (style) {
          case "lowercase":
            return ".nan";
          case "uppercase":
            return ".NAN";
          case "camelcase":
            return ".NaN";
        }
      } else if (Number.POSITIVE_INFINITY === object) {
        switch (style) {
          case "lowercase":
            return ".inf";
          case "uppercase":
            return ".INF";
          case "camelcase":
            return ".Inf";
        }
      } else if (Number.NEGATIVE_INFINITY === object) {
        switch (style) {
          case "lowercase":
            return "-.inf";
          case "uppercase":
            return "-.INF";
          case "camelcase":
            return "-.Inf";
        }
      } else if (common.isNegativeZero(object)) {
        return "-0.0";
      }
      res = object.toString(10);
      return SCIENTIFIC_WITHOUT_DOT.test(res) ? res.replace("e", ".e") : res;
    }
    function isFloat(object) {
      return Object.prototype.toString.call(object) === "[object Number]" && (object % 1 !== 0 || common.isNegativeZero(object));
    }
    var float = new type("tag:yaml.org,2002:float", {
      kind: "scalar",
      resolve: resolveYamlFloat,
      construct: constructYamlFloat,
      predicate: isFloat,
      represent: representYamlFloat,
      defaultStyle: "lowercase"
    });
    var json = failsafe.extend({
      implicit: [
        _null,
        bool,
        int,
        float
      ]
    });
    var core = json;
    var YAML_DATE_REGEXP = new RegExp(
      "^([0-9][0-9][0-9][0-9])-([0-9][0-9])-([0-9][0-9])$"
    );
    var YAML_TIMESTAMP_REGEXP = new RegExp(
      "^([0-9][0-9][0-9][0-9])-([0-9][0-9]?)-([0-9][0-9]?)(?:[Tt]|[ \\t]+)([0-9][0-9]?):([0-9][0-9]):([0-9][0-9])(?:\\.([0-9]*))?(?:[ \\t]*(Z|([-+])([0-9][0-9]?)(?::([0-9][0-9]))?))?$"
    );
    function resolveYamlTimestamp(data) {
      if (data === null) return false;
      if (YAML_DATE_REGEXP.exec(data) !== null) return true;
      if (YAML_TIMESTAMP_REGEXP.exec(data) !== null) return true;
      return false;
    }
    function constructYamlTimestamp(data) {
      var match, year, month, day, hour, minute, second, fraction = 0, delta = null, tz_hour, tz_minute, date;
      match = YAML_DATE_REGEXP.exec(data);
      if (match === null) match = YAML_TIMESTAMP_REGEXP.exec(data);
      if (match === null) throw new Error("Date resolve error");
      year = +match[1];
      month = +match[2] - 1;
      day = +match[3];
      if (!match[4]) {
        return new Date(Date.UTC(year, month, day));
      }
      hour = +match[4];
      minute = +match[5];
      second = +match[6];
      if (match[7]) {
        fraction = match[7].slice(0, 3);
        while (fraction.length < 3) {
          fraction += "0";
        }
        fraction = +fraction;
      }
      if (match[9]) {
        tz_hour = +match[10];
        tz_minute = +(match[11] || 0);
        delta = (tz_hour * 60 + tz_minute) * 6e4;
        if (match[9] === "-") delta = -delta;
      }
      date = new Date(Date.UTC(year, month, day, hour, minute, second, fraction));
      if (delta) date.setTime(date.getTime() - delta);
      return date;
    }
    function representYamlTimestamp(object) {
      return object.toISOString();
    }
    var timestamp = new type("tag:yaml.org,2002:timestamp", {
      kind: "scalar",
      resolve: resolveYamlTimestamp,
      construct: constructYamlTimestamp,
      instanceOf: Date,
      represent: representYamlTimestamp
    });
    function resolveYamlMerge(data) {
      return data === "<<" || data === null;
    }
    var merge = new type("tag:yaml.org,2002:merge", {
      kind: "scalar",
      resolve: resolveYamlMerge
    });
    var BASE64_MAP = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=\n\r";
    function resolveYamlBinary(data) {
      if (data === null) return false;
      var code, idx, bitlen = 0, max = data.length, map2 = BASE64_MAP;
      for (idx = 0; idx < max; idx++) {
        code = map2.indexOf(data.charAt(idx));
        if (code > 64) continue;
        if (code < 0) return false;
        bitlen += 6;
      }
      return bitlen % 8 === 0;
    }
    function constructYamlBinary(data) {
      var idx, tailbits, input = data.replace(/[\r\n=]/g, ""), max = input.length, map2 = BASE64_MAP, bits = 0, result = [];
      for (idx = 0; idx < max; idx++) {
        if (idx % 4 === 0 && idx) {
          result.push(bits >> 16 & 255);
          result.push(bits >> 8 & 255);
          result.push(bits & 255);
        }
        bits = bits << 6 | map2.indexOf(input.charAt(idx));
      }
      tailbits = max % 4 * 6;
      if (tailbits === 0) {
        result.push(bits >> 16 & 255);
        result.push(bits >> 8 & 255);
        result.push(bits & 255);
      } else if (tailbits === 18) {
        result.push(bits >> 10 & 255);
        result.push(bits >> 2 & 255);
      } else if (tailbits === 12) {
        result.push(bits >> 4 & 255);
      }
      return new Uint8Array(result);
    }
    function representYamlBinary(object) {
      var result = "", bits = 0, idx, tail, max = object.length, map2 = BASE64_MAP;
      for (idx = 0; idx < max; idx++) {
        if (idx % 3 === 0 && idx) {
          result += map2[bits >> 18 & 63];
          result += map2[bits >> 12 & 63];
          result += map2[bits >> 6 & 63];
          result += map2[bits & 63];
        }
        bits = (bits << 8) + object[idx];
      }
      tail = max % 3;
      if (tail === 0) {
        result += map2[bits >> 18 & 63];
        result += map2[bits >> 12 & 63];
        result += map2[bits >> 6 & 63];
        result += map2[bits & 63];
      } else if (tail === 2) {
        result += map2[bits >> 10 & 63];
        result += map2[bits >> 4 & 63];
        result += map2[bits << 2 & 63];
        result += map2[64];
      } else if (tail === 1) {
        result += map2[bits >> 2 & 63];
        result += map2[bits << 4 & 63];
        result += map2[64];
        result += map2[64];
      }
      return result;
    }
    function isBinary(obj) {
      return Object.prototype.toString.call(obj) === "[object Uint8Array]";
    }
    var binary = new type("tag:yaml.org,2002:binary", {
      kind: "scalar",
      resolve: resolveYamlBinary,
      construct: constructYamlBinary,
      predicate: isBinary,
      represent: representYamlBinary
    });
    var _hasOwnProperty$3 = Object.prototype.hasOwnProperty;
    var _toString$2 = Object.prototype.toString;
    function resolveYamlOmap(data) {
      if (data === null) return true;
      var objectKeys = [], index, length, pair, pairKey, pairHasKey, object = data;
      for (index = 0, length = object.length; index < length; index += 1) {
        pair = object[index];
        pairHasKey = false;
        if (_toString$2.call(pair) !== "[object Object]") return false;
        for (pairKey in pair) {
          if (_hasOwnProperty$3.call(pair, pairKey)) {
            if (!pairHasKey) pairHasKey = true;
            else return false;
          }
        }
        if (!pairHasKey) return false;
        if (objectKeys.indexOf(pairKey) === -1) objectKeys.push(pairKey);
        else return false;
      }
      return true;
    }
    function constructYamlOmap(data) {
      return data !== null ? data : [];
    }
    var omap = new type("tag:yaml.org,2002:omap", {
      kind: "sequence",
      resolve: resolveYamlOmap,
      construct: constructYamlOmap
    });
    var _toString$1 = Object.prototype.toString;
    function resolveYamlPairs(data) {
      if (data === null) return true;
      var index, length, pair, keys, result, object = data;
      result = new Array(object.length);
      for (index = 0, length = object.length; index < length; index += 1) {
        pair = object[index];
        if (_toString$1.call(pair) !== "[object Object]") return false;
        keys = Object.keys(pair);
        if (keys.length !== 1) return false;
        result[index] = [keys[0], pair[keys[0]]];
      }
      return true;
    }
    function constructYamlPairs(data) {
      if (data === null) return [];
      var index, length, pair, keys, result, object = data;
      result = new Array(object.length);
      for (index = 0, length = object.length; index < length; index += 1) {
        pair = object[index];
        keys = Object.keys(pair);
        result[index] = [keys[0], pair[keys[0]]];
      }
      return result;
    }
    var pairs = new type("tag:yaml.org,2002:pairs", {
      kind: "sequence",
      resolve: resolveYamlPairs,
      construct: constructYamlPairs
    });
    var _hasOwnProperty$2 = Object.prototype.hasOwnProperty;
    function resolveYamlSet(data) {
      if (data === null) return true;
      var key, object = data;
      for (key in object) {
        if (_hasOwnProperty$2.call(object, key)) {
          if (object[key] !== null) return false;
        }
      }
      return true;
    }
    function constructYamlSet(data) {
      return data !== null ? data : {};
    }
    var set = new type("tag:yaml.org,2002:set", {
      kind: "mapping",
      resolve: resolveYamlSet,
      construct: constructYamlSet
    });
    var _default = core.extend({
      implicit: [
        timestamp,
        merge
      ],
      explicit: [
        binary,
        omap,
        pairs,
        set
      ]
    });
    var _hasOwnProperty$1 = Object.prototype.hasOwnProperty;
    var CONTEXT_FLOW_IN = 1;
    var CONTEXT_FLOW_OUT = 2;
    var CONTEXT_BLOCK_IN = 3;
    var CONTEXT_BLOCK_OUT = 4;
    var CHOMPING_CLIP = 1;
    var CHOMPING_STRIP = 2;
    var CHOMPING_KEEP = 3;
    var PATTERN_NON_PRINTABLE = /[\x00-\x08\x0B\x0C\x0E-\x1F\x7F-\x84\x86-\x9F\uFFFE\uFFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF]/;
    var PATTERN_NON_ASCII_LINE_BREAKS = /[\x85\u2028\u2029]/;
    var PATTERN_FLOW_INDICATORS = /[,\[\]\{\}]/;
    var PATTERN_TAG_HANDLE = /^(?:!|!!|![a-z\-]+!)$/i;
    var PATTERN_TAG_URI = /^(?:!|[^,\[\]\{\}])(?:%[0-9a-f]{2}|[0-9a-z\-#;\/\?:@&=\+\$,_\.!~\*'\(\)\[\]])*$/i;
    function _class(obj) {
      return Object.prototype.toString.call(obj);
    }
    function is_EOL(c) {
      return c === 10 || c === 13;
    }
    function is_WHITE_SPACE(c) {
      return c === 9 || c === 32;
    }
    function is_WS_OR_EOL(c) {
      return c === 9 || c === 32 || c === 10 || c === 13;
    }
    function is_FLOW_INDICATOR(c) {
      return c === 44 || c === 91 || c === 93 || c === 123 || c === 125;
    }
    function fromHexCode(c) {
      var lc;
      if (48 <= c && c <= 57) {
        return c - 48;
      }
      lc = c | 32;
      if (97 <= lc && lc <= 102) {
        return lc - 97 + 10;
      }
      return -1;
    }
    function escapedHexLen(c) {
      if (c === 120) {
        return 2;
      }
      if (c === 117) {
        return 4;
      }
      if (c === 85) {
        return 8;
      }
      return 0;
    }
    function fromDecimalCode(c) {
      if (48 <= c && c <= 57) {
        return c - 48;
      }
      return -1;
    }
    function simpleEscapeSequence(c) {
      return c === 48 ? "\0" : c === 97 ? "\x07" : c === 98 ? "\b" : c === 116 ? "	" : c === 9 ? "	" : c === 110 ? "\n" : c === 118 ? "\v" : c === 102 ? "\f" : c === 114 ? "\r" : c === 101 ? "\x1B" : c === 32 ? " " : c === 34 ? '"' : c === 47 ? "/" : c === 92 ? "\\" : c === 78 ? "\x85" : c === 95 ? "\xA0" : c === 76 ? "\u2028" : c === 80 ? "\u2029" : "";
    }
    function charFromCodepoint(c) {
      if (c <= 65535) {
        return String.fromCharCode(c);
      }
      return String.fromCharCode(
        (c - 65536 >> 10) + 55296,
        (c - 65536 & 1023) + 56320
      );
    }
    var simpleEscapeCheck = new Array(256);
    var simpleEscapeMap = new Array(256);
    for (i = 0; i < 256; i++) {
      simpleEscapeCheck[i] = simpleEscapeSequence(i) ? 1 : 0;
      simpleEscapeMap[i] = simpleEscapeSequence(i);
    }
    var i;
    function State$1(input, options) {
      this.input = input;
      this.filename = options["filename"] || null;
      this.schema = options["schema"] || _default;
      this.onWarning = options["onWarning"] || null;
      this.legacy = options["legacy"] || false;
      this.json = options["json"] || false;
      this.listener = options["listener"] || null;
      this.implicitTypes = this.schema.compiledImplicit;
      this.typeMap = this.schema.compiledTypeMap;
      this.length = input.length;
      this.position = 0;
      this.line = 0;
      this.lineStart = 0;
      this.lineIndent = 0;
      this.firstTabInLine = -1;
      this.documents = [];
    }
    function generateError(state, message) {
      var mark = {
        name: state.filename,
        buffer: state.input.slice(0, -1),
        // omit trailing \0
        position: state.position,
        line: state.line,
        column: state.position - state.lineStart
      };
      mark.snippet = snippet(mark);
      return new exception(message, mark);
    }
    function throwError(state, message) {
      throw generateError(state, message);
    }
    function throwWarning(state, message) {
      if (state.onWarning) {
        state.onWarning.call(null, generateError(state, message));
      }
    }
    var directiveHandlers = {
      YAML: function handleYamlDirective(state, name, args) {
        var match, major, minor;
        if (state.version !== null) {
          throwError(state, "duplication of %YAML directive");
        }
        if (args.length !== 1) {
          throwError(state, "YAML directive accepts exactly one argument");
        }
        match = /^([0-9]+)\.([0-9]+)$/.exec(args[0]);
        if (match === null) {
          throwError(state, "ill-formed argument of the YAML directive");
        }
        major = parseInt(match[1], 10);
        minor = parseInt(match[2], 10);
        if (major !== 1) {
          throwError(state, "unacceptable YAML version of the document");
        }
        state.version = args[0];
        state.checkLineBreaks = minor < 2;
        if (minor !== 1 && minor !== 2) {
          throwWarning(state, "unsupported YAML version of the document");
        }
      },
      TAG: function handleTagDirective(state, name, args) {
        var handle, prefix;
        if (args.length !== 2) {
          throwError(state, "TAG directive accepts exactly two arguments");
        }
        handle = args[0];
        prefix = args[1];
        if (!PATTERN_TAG_HANDLE.test(handle)) {
          throwError(state, "ill-formed tag handle (first argument) of the TAG directive");
        }
        if (_hasOwnProperty$1.call(state.tagMap, handle)) {
          throwError(state, 'there is a previously declared suffix for "' + handle + '" tag handle');
        }
        if (!PATTERN_TAG_URI.test(prefix)) {
          throwError(state, "ill-formed tag prefix (second argument) of the TAG directive");
        }
        try {
          prefix = decodeURIComponent(prefix);
        } catch (err) {
          throwError(state, "tag prefix is malformed: " + prefix);
        }
        state.tagMap[handle] = prefix;
      }
    };
    function captureSegment(state, start, end, checkJson) {
      var _position, _length, _character, _result;
      if (start < end) {
        _result = state.input.slice(start, end);
        if (checkJson) {
          for (_position = 0, _length = _result.length; _position < _length; _position += 1) {
            _character = _result.charCodeAt(_position);
            if (!(_character === 9 || 32 <= _character && _character <= 1114111)) {
              throwError(state, "expected valid JSON character");
            }
          }
        } else if (PATTERN_NON_PRINTABLE.test(_result)) {
          throwError(state, "the stream contains non-printable characters");
        }
        state.result += _result;
      }
    }
    function mergeMappings(state, destination, source, overridableKeys) {
      var sourceKeys, key, index, quantity;
      if (!common.isObject(source)) {
        throwError(state, "cannot merge mappings; the provided source object is unacceptable");
      }
      sourceKeys = Object.keys(source);
      for (index = 0, quantity = sourceKeys.length; index < quantity; index += 1) {
        key = sourceKeys[index];
        if (!_hasOwnProperty$1.call(destination, key)) {
          destination[key] = source[key];
          overridableKeys[key] = true;
        }
      }
    }
    function storeMappingPair(state, _result, overridableKeys, keyTag, keyNode, valueNode, startLine, startLineStart, startPos) {
      var index, quantity;
      if (Array.isArray(keyNode)) {
        keyNode = Array.prototype.slice.call(keyNode);
        for (index = 0, quantity = keyNode.length; index < quantity; index += 1) {
          if (Array.isArray(keyNode[index])) {
            throwError(state, "nested arrays are not supported inside keys");
          }
          if (typeof keyNode === "object" && _class(keyNode[index]) === "[object Object]") {
            keyNode[index] = "[object Object]";
          }
        }
      }
      if (typeof keyNode === "object" && _class(keyNode) === "[object Object]") {
        keyNode = "[object Object]";
      }
      keyNode = String(keyNode);
      if (_result === null) {
        _result = {};
      }
      if (keyTag === "tag:yaml.org,2002:merge") {
        if (Array.isArray(valueNode)) {
          for (index = 0, quantity = valueNode.length; index < quantity; index += 1) {
            mergeMappings(state, _result, valueNode[index], overridableKeys);
          }
        } else {
          mergeMappings(state, _result, valueNode, overridableKeys);
        }
      } else {
        if (!state.json && !_hasOwnProperty$1.call(overridableKeys, keyNode) && _hasOwnProperty$1.call(_result, keyNode)) {
          state.line = startLine || state.line;
          state.lineStart = startLineStart || state.lineStart;
          state.position = startPos || state.position;
          throwError(state, "duplicated mapping key");
        }
        if (keyNode === "__proto__") {
          Object.defineProperty(_result, keyNode, {
            configurable: true,
            enumerable: true,
            writable: true,
            value: valueNode
          });
        } else {
          _result[keyNode] = valueNode;
        }
        delete overridableKeys[keyNode];
      }
      return _result;
    }
    function readLineBreak(state) {
      var ch;
      ch = state.input.charCodeAt(state.position);
      if (ch === 10) {
        state.position++;
      } else if (ch === 13) {
        state.position++;
        if (state.input.charCodeAt(state.position) === 10) {
          state.position++;
        }
      } else {
        throwError(state, "a line break is expected");
      }
      state.line += 1;
      state.lineStart = state.position;
      state.firstTabInLine = -1;
    }
    function skipSeparationSpace(state, allowComments, checkIndent) {
      var lineBreaks = 0, ch = state.input.charCodeAt(state.position);
      while (ch !== 0) {
        while (is_WHITE_SPACE(ch)) {
          if (ch === 9 && state.firstTabInLine === -1) {
            state.firstTabInLine = state.position;
          }
          ch = state.input.charCodeAt(++state.position);
        }
        if (allowComments && ch === 35) {
          do {
            ch = state.input.charCodeAt(++state.position);
          } while (ch !== 10 && ch !== 13 && ch !== 0);
        }
        if (is_EOL(ch)) {
          readLineBreak(state);
          ch = state.input.charCodeAt(state.position);
          lineBreaks++;
          state.lineIndent = 0;
          while (ch === 32) {
            state.lineIndent++;
            ch = state.input.charCodeAt(++state.position);
          }
        } else {
          break;
        }
      }
      if (checkIndent !== -1 && lineBreaks !== 0 && state.lineIndent < checkIndent) {
        throwWarning(state, "deficient indentation");
      }
      return lineBreaks;
    }
    function testDocumentSeparator(state) {
      var _position = state.position, ch;
      ch = state.input.charCodeAt(_position);
      if ((ch === 45 || ch === 46) && ch === state.input.charCodeAt(_position + 1) && ch === state.input.charCodeAt(_position + 2)) {
        _position += 3;
        ch = state.input.charCodeAt(_position);
        if (ch === 0 || is_WS_OR_EOL(ch)) {
          return true;
        }
      }
      return false;
    }
    function writeFoldedLines(state, count) {
      if (count === 1) {
        state.result += " ";
      } else if (count > 1) {
        state.result += common.repeat("\n", count - 1);
      }
    }
    function readPlainScalar(state, nodeIndent, withinFlowCollection) {
      var preceding, following, captureStart, captureEnd, hasPendingContent, _line, _lineStart, _lineIndent, _kind = state.kind, _result = state.result, ch;
      ch = state.input.charCodeAt(state.position);
      if (is_WS_OR_EOL(ch) || is_FLOW_INDICATOR(ch) || ch === 35 || ch === 38 || ch === 42 || ch === 33 || ch === 124 || ch === 62 || ch === 39 || ch === 34 || ch === 37 || ch === 64 || ch === 96) {
        return false;
      }
      if (ch === 63 || ch === 45) {
        following = state.input.charCodeAt(state.position + 1);
        if (is_WS_OR_EOL(following) || withinFlowCollection && is_FLOW_INDICATOR(following)) {
          return false;
        }
      }
      state.kind = "scalar";
      state.result = "";
      captureStart = captureEnd = state.position;
      hasPendingContent = false;
      while (ch !== 0) {
        if (ch === 58) {
          following = state.input.charCodeAt(state.position + 1);
          if (is_WS_OR_EOL(following) || withinFlowCollection && is_FLOW_INDICATOR(following)) {
            break;
          }
        } else if (ch === 35) {
          preceding = state.input.charCodeAt(state.position - 1);
          if (is_WS_OR_EOL(preceding)) {
            break;
          }
        } else if (state.position === state.lineStart && testDocumentSeparator(state) || withinFlowCollection && is_FLOW_INDICATOR(ch)) {
          break;
        } else if (is_EOL(ch)) {
          _line = state.line;
          _lineStart = state.lineStart;
          _lineIndent = state.lineIndent;
          skipSeparationSpace(state, false, -1);
          if (state.lineIndent >= nodeIndent) {
            hasPendingContent = true;
            ch = state.input.charCodeAt(state.position);
            continue;
          } else {
            state.position = captureEnd;
            state.line = _line;
            state.lineStart = _lineStart;
            state.lineIndent = _lineIndent;
            break;
          }
        }
        if (hasPendingContent) {
          captureSegment(state, captureStart, captureEnd, false);
          writeFoldedLines(state, state.line - _line);
          captureStart = captureEnd = state.position;
          hasPendingContent = false;
        }
        if (!is_WHITE_SPACE(ch)) {
          captureEnd = state.position + 1;
        }
        ch = state.input.charCodeAt(++state.position);
      }
      captureSegment(state, captureStart, captureEnd, false);
      if (state.result) {
        return true;
      }
      state.kind = _kind;
      state.result = _result;
      return false;
    }
    function readSingleQuotedScalar(state, nodeIndent) {
      var ch, captureStart, captureEnd;
      ch = state.input.charCodeAt(state.position);
      if (ch !== 39) {
        return false;
      }
      state.kind = "scalar";
      state.result = "";
      state.position++;
      captureStart = captureEnd = state.position;
      while ((ch = state.input.charCodeAt(state.position)) !== 0) {
        if (ch === 39) {
          captureSegment(state, captureStart, state.position, true);
          ch = state.input.charCodeAt(++state.position);
          if (ch === 39) {
            captureStart = state.position;
            state.position++;
            captureEnd = state.position;
          } else {
            return true;
          }
        } else if (is_EOL(ch)) {
          captureSegment(state, captureStart, captureEnd, true);
          writeFoldedLines(state, skipSeparationSpace(state, false, nodeIndent));
          captureStart = captureEnd = state.position;
        } else if (state.position === state.lineStart && testDocumentSeparator(state)) {
          throwError(state, "unexpected end of the document within a single quoted scalar");
        } else {
          state.position++;
          captureEnd = state.position;
        }
      }
      throwError(state, "unexpected end of the stream within a single quoted scalar");
    }
    function readDoubleQuotedScalar(state, nodeIndent) {
      var captureStart, captureEnd, hexLength, hexResult, tmp, ch;
      ch = state.input.charCodeAt(state.position);
      if (ch !== 34) {
        return false;
      }
      state.kind = "scalar";
      state.result = "";
      state.position++;
      captureStart = captureEnd = state.position;
      while ((ch = state.input.charCodeAt(state.position)) !== 0) {
        if (ch === 34) {
          captureSegment(state, captureStart, state.position, true);
          state.position++;
          return true;
        } else if (ch === 92) {
          captureSegment(state, captureStart, state.position, true);
          ch = state.input.charCodeAt(++state.position);
          if (is_EOL(ch)) {
            skipSeparationSpace(state, false, nodeIndent);
          } else if (ch < 256 && simpleEscapeCheck[ch]) {
            state.result += simpleEscapeMap[ch];
            state.position++;
          } else if ((tmp = escapedHexLen(ch)) > 0) {
            hexLength = tmp;
            hexResult = 0;
            for (; hexLength > 0; hexLength--) {
              ch = state.input.charCodeAt(++state.position);
              if ((tmp = fromHexCode(ch)) >= 0) {
                hexResult = (hexResult << 4) + tmp;
              } else {
                throwError(state, "expected hexadecimal character");
              }
            }
            state.result += charFromCodepoint(hexResult);
            state.position++;
          } else {
            throwError(state, "unknown escape sequence");
          }
          captureStart = captureEnd = state.position;
        } else if (is_EOL(ch)) {
          captureSegment(state, captureStart, captureEnd, true);
          writeFoldedLines(state, skipSeparationSpace(state, false, nodeIndent));
          captureStart = captureEnd = state.position;
        } else if (state.position === state.lineStart && testDocumentSeparator(state)) {
          throwError(state, "unexpected end of the document within a double quoted scalar");
        } else {
          state.position++;
          captureEnd = state.position;
        }
      }
      throwError(state, "unexpected end of the stream within a double quoted scalar");
    }
    function readFlowCollection(state, nodeIndent) {
      var readNext = true, _line, _lineStart, _pos, _tag = state.tag, _result, _anchor = state.anchor, following, terminator, isPair, isExplicitPair, isMapping, overridableKeys = /* @__PURE__ */ Object.create(null), keyNode, keyTag, valueNode, ch;
      ch = state.input.charCodeAt(state.position);
      if (ch === 91) {
        terminator = 93;
        isMapping = false;
        _result = [];
      } else if (ch === 123) {
        terminator = 125;
        isMapping = true;
        _result = {};
      } else {
        return false;
      }
      if (state.anchor !== null) {
        state.anchorMap[state.anchor] = _result;
      }
      ch = state.input.charCodeAt(++state.position);
      while (ch !== 0) {
        skipSeparationSpace(state, true, nodeIndent);
        ch = state.input.charCodeAt(state.position);
        if (ch === terminator) {
          state.position++;
          state.tag = _tag;
          state.anchor = _anchor;
          state.kind = isMapping ? "mapping" : "sequence";
          state.result = _result;
          return true;
        } else if (!readNext) {
          throwError(state, "missed comma between flow collection entries");
        } else if (ch === 44) {
          throwError(state, "expected the node content, but found ','");
        }
        keyTag = keyNode = valueNode = null;
        isPair = isExplicitPair = false;
        if (ch === 63) {
          following = state.input.charCodeAt(state.position + 1);
          if (is_WS_OR_EOL(following)) {
            isPair = isExplicitPair = true;
            state.position++;
            skipSeparationSpace(state, true, nodeIndent);
          }
        }
        _line = state.line;
        _lineStart = state.lineStart;
        _pos = state.position;
        composeNode(state, nodeIndent, CONTEXT_FLOW_IN, false, true);
        keyTag = state.tag;
        keyNode = state.result;
        skipSeparationSpace(state, true, nodeIndent);
        ch = state.input.charCodeAt(state.position);
        if ((isExplicitPair || state.line === _line) && ch === 58) {
          isPair = true;
          ch = state.input.charCodeAt(++state.position);
          skipSeparationSpace(state, true, nodeIndent);
          composeNode(state, nodeIndent, CONTEXT_FLOW_IN, false, true);
          valueNode = state.result;
        }
        if (isMapping) {
          storeMappingPair(state, _result, overridableKeys, keyTag, keyNode, valueNode, _line, _lineStart, _pos);
        } else if (isPair) {
          _result.push(storeMappingPair(state, null, overridableKeys, keyTag, keyNode, valueNode, _line, _lineStart, _pos));
        } else {
          _result.push(keyNode);
        }
        skipSeparationSpace(state, true, nodeIndent);
        ch = state.input.charCodeAt(state.position);
        if (ch === 44) {
          readNext = true;
          ch = state.input.charCodeAt(++state.position);
        } else {
          readNext = false;
        }
      }
      throwError(state, "unexpected end of the stream within a flow collection");
    }
    function readBlockScalar(state, nodeIndent) {
      var captureStart, folding, chomping = CHOMPING_CLIP, didReadContent = false, detectedIndent = false, textIndent = nodeIndent, emptyLines = 0, atMoreIndented = false, tmp, ch;
      ch = state.input.charCodeAt(state.position);
      if (ch === 124) {
        folding = false;
      } else if (ch === 62) {
        folding = true;
      } else {
        return false;
      }
      state.kind = "scalar";
      state.result = "";
      while (ch !== 0) {
        ch = state.input.charCodeAt(++state.position);
        if (ch === 43 || ch === 45) {
          if (CHOMPING_CLIP === chomping) {
            chomping = ch === 43 ? CHOMPING_KEEP : CHOMPING_STRIP;
          } else {
            throwError(state, "repeat of a chomping mode identifier");
          }
        } else if ((tmp = fromDecimalCode(ch)) >= 0) {
          if (tmp === 0) {
            throwError(state, "bad explicit indentation width of a block scalar; it cannot be less than one");
          } else if (!detectedIndent) {
            textIndent = nodeIndent + tmp - 1;
            detectedIndent = true;
          } else {
            throwError(state, "repeat of an indentation width identifier");
          }
        } else {
          break;
        }
      }
      if (is_WHITE_SPACE(ch)) {
        do {
          ch = state.input.charCodeAt(++state.position);
        } while (is_WHITE_SPACE(ch));
        if (ch === 35) {
          do {
            ch = state.input.charCodeAt(++state.position);
          } while (!is_EOL(ch) && ch !== 0);
        }
      }
      while (ch !== 0) {
        readLineBreak(state);
        state.lineIndent = 0;
        ch = state.input.charCodeAt(state.position);
        while ((!detectedIndent || state.lineIndent < textIndent) && ch === 32) {
          state.lineIndent++;
          ch = state.input.charCodeAt(++state.position);
        }
        if (!detectedIndent && state.lineIndent > textIndent) {
          textIndent = state.lineIndent;
        }
        if (is_EOL(ch)) {
          emptyLines++;
          continue;
        }
        if (state.lineIndent < textIndent) {
          if (chomping === CHOMPING_KEEP) {
            state.result += common.repeat("\n", didReadContent ? 1 + emptyLines : emptyLines);
          } else if (chomping === CHOMPING_CLIP) {
            if (didReadContent) {
              state.result += "\n";
            }
          }
          break;
        }
        if (folding) {
          if (is_WHITE_SPACE(ch)) {
            atMoreIndented = true;
            state.result += common.repeat("\n", didReadContent ? 1 + emptyLines : emptyLines);
          } else if (atMoreIndented) {
            atMoreIndented = false;
            state.result += common.repeat("\n", emptyLines + 1);
          } else if (emptyLines === 0) {
            if (didReadContent) {
              state.result += " ";
            }
          } else {
            state.result += common.repeat("\n", emptyLines);
          }
        } else {
          state.result += common.repeat("\n", didReadContent ? 1 + emptyLines : emptyLines);
        }
        didReadContent = true;
        detectedIndent = true;
        emptyLines = 0;
        captureStart = state.position;
        while (!is_EOL(ch) && ch !== 0) {
          ch = state.input.charCodeAt(++state.position);
        }
        captureSegment(state, captureStart, state.position, false);
      }
      return true;
    }
    function readBlockSequence(state, nodeIndent) {
      var _line, _tag = state.tag, _anchor = state.anchor, _result = [], following, detected = false, ch;
      if (state.firstTabInLine !== -1) return false;
      if (state.anchor !== null) {
        state.anchorMap[state.anchor] = _result;
      }
      ch = state.input.charCodeAt(state.position);
      while (ch !== 0) {
        if (state.firstTabInLine !== -1) {
          state.position = state.firstTabInLine;
          throwError(state, "tab characters must not be used in indentation");
        }
        if (ch !== 45) {
          break;
        }
        following = state.input.charCodeAt(state.position + 1);
        if (!is_WS_OR_EOL(following)) {
          break;
        }
        detected = true;
        state.position++;
        if (skipSeparationSpace(state, true, -1)) {
          if (state.lineIndent <= nodeIndent) {
            _result.push(null);
            ch = state.input.charCodeAt(state.position);
            continue;
          }
        }
        _line = state.line;
        composeNode(state, nodeIndent, CONTEXT_BLOCK_IN, false, true);
        _result.push(state.result);
        skipSeparationSpace(state, true, -1);
        ch = state.input.charCodeAt(state.position);
        if ((state.line === _line || state.lineIndent > nodeIndent) && ch !== 0) {
          throwError(state, "bad indentation of a sequence entry");
        } else if (state.lineIndent < nodeIndent) {
          break;
        }
      }
      if (detected) {
        state.tag = _tag;
        state.anchor = _anchor;
        state.kind = "sequence";
        state.result = _result;
        return true;
      }
      return false;
    }
    function readBlockMapping(state, nodeIndent, flowIndent) {
      var following, allowCompact, _line, _keyLine, _keyLineStart, _keyPos, _tag = state.tag, _anchor = state.anchor, _result = {}, overridableKeys = /* @__PURE__ */ Object.create(null), keyTag = null, keyNode = null, valueNode = null, atExplicitKey = false, detected = false, ch;
      if (state.firstTabInLine !== -1) return false;
      if (state.anchor !== null) {
        state.anchorMap[state.anchor] = _result;
      }
      ch = state.input.charCodeAt(state.position);
      while (ch !== 0) {
        if (!atExplicitKey && state.firstTabInLine !== -1) {
          state.position = state.firstTabInLine;
          throwError(state, "tab characters must not be used in indentation");
        }
        following = state.input.charCodeAt(state.position + 1);
        _line = state.line;
        if ((ch === 63 || ch === 58) && is_WS_OR_EOL(following)) {
          if (ch === 63) {
            if (atExplicitKey) {
              storeMappingPair(state, _result, overridableKeys, keyTag, keyNode, null, _keyLine, _keyLineStart, _keyPos);
              keyTag = keyNode = valueNode = null;
            }
            detected = true;
            atExplicitKey = true;
            allowCompact = true;
          } else if (atExplicitKey) {
            atExplicitKey = false;
            allowCompact = true;
          } else {
            throwError(state, "incomplete explicit mapping pair; a key node is missed; or followed by a non-tabulated empty line");
          }
          state.position += 1;
          ch = following;
        } else {
          _keyLine = state.line;
          _keyLineStart = state.lineStart;
          _keyPos = state.position;
          if (!composeNode(state, flowIndent, CONTEXT_FLOW_OUT, false, true)) {
            break;
          }
          if (state.line === _line) {
            ch = state.input.charCodeAt(state.position);
            while (is_WHITE_SPACE(ch)) {
              ch = state.input.charCodeAt(++state.position);
            }
            if (ch === 58) {
              ch = state.input.charCodeAt(++state.position);
              if (!is_WS_OR_EOL(ch)) {
                throwError(state, "a whitespace character is expected after the key-value separator within a block mapping");
              }
              if (atExplicitKey) {
                storeMappingPair(state, _result, overridableKeys, keyTag, keyNode, null, _keyLine, _keyLineStart, _keyPos);
                keyTag = keyNode = valueNode = null;
              }
              detected = true;
              atExplicitKey = false;
              allowCompact = false;
              keyTag = state.tag;
              keyNode = state.result;
            } else if (detected) {
              throwError(state, "can not read an implicit mapping pair; a colon is missed");
            } else {
              state.tag = _tag;
              state.anchor = _anchor;
              return true;
            }
          } else if (detected) {
            throwError(state, "can not read a block mapping entry; a multiline key may not be an implicit key");
          } else {
            state.tag = _tag;
            state.anchor = _anchor;
            return true;
          }
        }
        if (state.line === _line || state.lineIndent > nodeIndent) {
          if (atExplicitKey) {
            _keyLine = state.line;
            _keyLineStart = state.lineStart;
            _keyPos = state.position;
          }
          if (composeNode(state, nodeIndent, CONTEXT_BLOCK_OUT, true, allowCompact)) {
            if (atExplicitKey) {
              keyNode = state.result;
            } else {
              valueNode = state.result;
            }
          }
          if (!atExplicitKey) {
            storeMappingPair(state, _result, overridableKeys, keyTag, keyNode, valueNode, _keyLine, _keyLineStart, _keyPos);
            keyTag = keyNode = valueNode = null;
          }
          skipSeparationSpace(state, true, -1);
          ch = state.input.charCodeAt(state.position);
        }
        if ((state.line === _line || state.lineIndent > nodeIndent) && ch !== 0) {
          throwError(state, "bad indentation of a mapping entry");
        } else if (state.lineIndent < nodeIndent) {
          break;
        }
      }
      if (atExplicitKey) {
        storeMappingPair(state, _result, overridableKeys, keyTag, keyNode, null, _keyLine, _keyLineStart, _keyPos);
      }
      if (detected) {
        state.tag = _tag;
        state.anchor = _anchor;
        state.kind = "mapping";
        state.result = _result;
      }
      return detected;
    }
    function readTagProperty(state) {
      var _position, isVerbatim = false, isNamed = false, tagHandle, tagName, ch;
      ch = state.input.charCodeAt(state.position);
      if (ch !== 33) return false;
      if (state.tag !== null) {
        throwError(state, "duplication of a tag property");
      }
      ch = state.input.charCodeAt(++state.position);
      if (ch === 60) {
        isVerbatim = true;
        ch = state.input.charCodeAt(++state.position);
      } else if (ch === 33) {
        isNamed = true;
        tagHandle = "!!";
        ch = state.input.charCodeAt(++state.position);
      } else {
        tagHandle = "!";
      }
      _position = state.position;
      if (isVerbatim) {
        do {
          ch = state.input.charCodeAt(++state.position);
        } while (ch !== 0 && ch !== 62);
        if (state.position < state.length) {
          tagName = state.input.slice(_position, state.position);
          ch = state.input.charCodeAt(++state.position);
        } else {
          throwError(state, "unexpected end of the stream within a verbatim tag");
        }
      } else {
        while (ch !== 0 && !is_WS_OR_EOL(ch)) {
          if (ch === 33) {
            if (!isNamed) {
              tagHandle = state.input.slice(_position - 1, state.position + 1);
              if (!PATTERN_TAG_HANDLE.test(tagHandle)) {
                throwError(state, "named tag handle cannot contain such characters");
              }
              isNamed = true;
              _position = state.position + 1;
            } else {
              throwError(state, "tag suffix cannot contain exclamation marks");
            }
          }
          ch = state.input.charCodeAt(++state.position);
        }
        tagName = state.input.slice(_position, state.position);
        if (PATTERN_FLOW_INDICATORS.test(tagName)) {
          throwError(state, "tag suffix cannot contain flow indicator characters");
        }
      }
      if (tagName && !PATTERN_TAG_URI.test(tagName)) {
        throwError(state, "tag name cannot contain such characters: " + tagName);
      }
      try {
        tagName = decodeURIComponent(tagName);
      } catch (err) {
        throwError(state, "tag name is malformed: " + tagName);
      }
      if (isVerbatim) {
        state.tag = tagName;
      } else if (_hasOwnProperty$1.call(state.tagMap, tagHandle)) {
        state.tag = state.tagMap[tagHandle] + tagName;
      } else if (tagHandle === "!") {
        state.tag = "!" + tagName;
      } else if (tagHandle === "!!") {
        state.tag = "tag:yaml.org,2002:" + tagName;
      } else {
        throwError(state, 'undeclared tag handle "' + tagHandle + '"');
      }
      return true;
    }
    function readAnchorProperty(state) {
      var _position, ch;
      ch = state.input.charCodeAt(state.position);
      if (ch !== 38) return false;
      if (state.anchor !== null) {
        throwError(state, "duplication of an anchor property");
      }
      ch = state.input.charCodeAt(++state.position);
      _position = state.position;
      while (ch !== 0 && !is_WS_OR_EOL(ch) && !is_FLOW_INDICATOR(ch)) {
        ch = state.input.charCodeAt(++state.position);
      }
      if (state.position === _position) {
        throwError(state, "name of an anchor node must contain at least one character");
      }
      state.anchor = state.input.slice(_position, state.position);
      return true;
    }
    function readAlias(state) {
      var _position, alias, ch;
      ch = state.input.charCodeAt(state.position);
      if (ch !== 42) return false;
      ch = state.input.charCodeAt(++state.position);
      _position = state.position;
      while (ch !== 0 && !is_WS_OR_EOL(ch) && !is_FLOW_INDICATOR(ch)) {
        ch = state.input.charCodeAt(++state.position);
      }
      if (state.position === _position) {
        throwError(state, "name of an alias node must contain at least one character");
      }
      alias = state.input.slice(_position, state.position);
      if (!_hasOwnProperty$1.call(state.anchorMap, alias)) {
        throwError(state, 'unidentified alias "' + alias + '"');
      }
      state.result = state.anchorMap[alias];
      skipSeparationSpace(state, true, -1);
      return true;
    }
    function composeNode(state, parentIndent, nodeContext, allowToSeek, allowCompact) {
      var allowBlockStyles, allowBlockScalars, allowBlockCollections, indentStatus = 1, atNewLine = false, hasContent = false, typeIndex, typeQuantity, typeList, type2, flowIndent, blockIndent;
      if (state.listener !== null) {
        state.listener("open", state);
      }
      state.tag = null;
      state.anchor = null;
      state.kind = null;
      state.result = null;
      allowBlockStyles = allowBlockScalars = allowBlockCollections = CONTEXT_BLOCK_OUT === nodeContext || CONTEXT_BLOCK_IN === nodeContext;
      if (allowToSeek) {
        if (skipSeparationSpace(state, true, -1)) {
          atNewLine = true;
          if (state.lineIndent > parentIndent) {
            indentStatus = 1;
          } else if (state.lineIndent === parentIndent) {
            indentStatus = 0;
          } else if (state.lineIndent < parentIndent) {
            indentStatus = -1;
          }
        }
      }
      if (indentStatus === 1) {
        while (readTagProperty(state) || readAnchorProperty(state)) {
          if (skipSeparationSpace(state, true, -1)) {
            atNewLine = true;
            allowBlockCollections = allowBlockStyles;
            if (state.lineIndent > parentIndent) {
              indentStatus = 1;
            } else if (state.lineIndent === parentIndent) {
              indentStatus = 0;
            } else if (state.lineIndent < parentIndent) {
              indentStatus = -1;
            }
          } else {
            allowBlockCollections = false;
          }
        }
      }
      if (allowBlockCollections) {
        allowBlockCollections = atNewLine || allowCompact;
      }
      if (indentStatus === 1 || CONTEXT_BLOCK_OUT === nodeContext) {
        if (CONTEXT_FLOW_IN === nodeContext || CONTEXT_FLOW_OUT === nodeContext) {
          flowIndent = parentIndent;
        } else {
          flowIndent = parentIndent + 1;
        }
        blockIndent = state.position - state.lineStart;
        if (indentStatus === 1) {
          if (allowBlockCollections && (readBlockSequence(state, blockIndent) || readBlockMapping(state, blockIndent, flowIndent)) || readFlowCollection(state, flowIndent)) {
            hasContent = true;
          } else {
            if (allowBlockScalars && readBlockScalar(state, flowIndent) || readSingleQuotedScalar(state, flowIndent) || readDoubleQuotedScalar(state, flowIndent)) {
              hasContent = true;
            } else if (readAlias(state)) {
              hasContent = true;
              if (state.tag !== null || state.anchor !== null) {
                throwError(state, "alias node should not have any properties");
              }
            } else if (readPlainScalar(state, flowIndent, CONTEXT_FLOW_IN === nodeContext)) {
              hasContent = true;
              if (state.tag === null) {
                state.tag = "?";
              }
            }
            if (state.anchor !== null) {
              state.anchorMap[state.anchor] = state.result;
            }
          }
        } else if (indentStatus === 0) {
          hasContent = allowBlockCollections && readBlockSequence(state, blockIndent);
        }
      }
      if (state.tag === null) {
        if (state.anchor !== null) {
          state.anchorMap[state.anchor] = state.result;
        }
      } else if (state.tag === "?") {
        if (state.result !== null && state.kind !== "scalar") {
          throwError(state, 'unacceptable node kind for !<?> tag; it should be "scalar", not "' + state.kind + '"');
        }
        for (typeIndex = 0, typeQuantity = state.implicitTypes.length; typeIndex < typeQuantity; typeIndex += 1) {
          type2 = state.implicitTypes[typeIndex];
          if (type2.resolve(state.result)) {
            state.result = type2.construct(state.result);
            state.tag = type2.tag;
            if (state.anchor !== null) {
              state.anchorMap[state.anchor] = state.result;
            }
            break;
          }
        }
      } else if (state.tag !== "!") {
        if (_hasOwnProperty$1.call(state.typeMap[state.kind || "fallback"], state.tag)) {
          type2 = state.typeMap[state.kind || "fallback"][state.tag];
        } else {
          type2 = null;
          typeList = state.typeMap.multi[state.kind || "fallback"];
          for (typeIndex = 0, typeQuantity = typeList.length; typeIndex < typeQuantity; typeIndex += 1) {
            if (state.tag.slice(0, typeList[typeIndex].tag.length) === typeList[typeIndex].tag) {
              type2 = typeList[typeIndex];
              break;
            }
          }
        }
        if (!type2) {
          throwError(state, "unknown tag !<" + state.tag + ">");
        }
        if (state.result !== null && type2.kind !== state.kind) {
          throwError(state, "unacceptable node kind for !<" + state.tag + '> tag; it should be "' + type2.kind + '", not "' + state.kind + '"');
        }
        if (!type2.resolve(state.result, state.tag)) {
          throwError(state, "cannot resolve a node with !<" + state.tag + "> explicit tag");
        } else {
          state.result = type2.construct(state.result, state.tag);
          if (state.anchor !== null) {
            state.anchorMap[state.anchor] = state.result;
          }
        }
      }
      if (state.listener !== null) {
        state.listener("close", state);
      }
      return state.tag !== null || state.anchor !== null || hasContent;
    }
    function readDocument(state) {
      var documentStart = state.position, _position, directiveName, directiveArgs, hasDirectives = false, ch;
      state.version = null;
      state.checkLineBreaks = state.legacy;
      state.tagMap = /* @__PURE__ */ Object.create(null);
      state.anchorMap = /* @__PURE__ */ Object.create(null);
      while ((ch = state.input.charCodeAt(state.position)) !== 0) {
        skipSeparationSpace(state, true, -1);
        ch = state.input.charCodeAt(state.position);
        if (state.lineIndent > 0 || ch !== 37) {
          break;
        }
        hasDirectives = true;
        ch = state.input.charCodeAt(++state.position);
        _position = state.position;
        while (ch !== 0 && !is_WS_OR_EOL(ch)) {
          ch = state.input.charCodeAt(++state.position);
        }
        directiveName = state.input.slice(_position, state.position);
        directiveArgs = [];
        if (directiveName.length < 1) {
          throwError(state, "directive name must not be less than one character in length");
        }
        while (ch !== 0) {
          while (is_WHITE_SPACE(ch)) {
            ch = state.input.charCodeAt(++state.position);
          }
          if (ch === 35) {
            do {
              ch = state.input.charCodeAt(++state.position);
            } while (ch !== 0 && !is_EOL(ch));
            break;
          }
          if (is_EOL(ch)) break;
          _position = state.position;
          while (ch !== 0 && !is_WS_OR_EOL(ch)) {
            ch = state.input.charCodeAt(++state.position);
          }
          directiveArgs.push(state.input.slice(_position, state.position));
        }
        if (ch !== 0) readLineBreak(state);
        if (_hasOwnProperty$1.call(directiveHandlers, directiveName)) {
          directiveHandlers[directiveName](state, directiveName, directiveArgs);
        } else {
          throwWarning(state, 'unknown document directive "' + directiveName + '"');
        }
      }
      skipSeparationSpace(state, true, -1);
      if (state.lineIndent === 0 && state.input.charCodeAt(state.position) === 45 && state.input.charCodeAt(state.position + 1) === 45 && state.input.charCodeAt(state.position + 2) === 45) {
        state.position += 3;
        skipSeparationSpace(state, true, -1);
      } else if (hasDirectives) {
        throwError(state, "directives end mark is expected");
      }
      composeNode(state, state.lineIndent - 1, CONTEXT_BLOCK_OUT, false, true);
      skipSeparationSpace(state, true, -1);
      if (state.checkLineBreaks && PATTERN_NON_ASCII_LINE_BREAKS.test(state.input.slice(documentStart, state.position))) {
        throwWarning(state, "non-ASCII line breaks are interpreted as content");
      }
      state.documents.push(state.result);
      if (state.position === state.lineStart && testDocumentSeparator(state)) {
        if (state.input.charCodeAt(state.position) === 46) {
          state.position += 3;
          skipSeparationSpace(state, true, -1);
        }
        return;
      }
      if (state.position < state.length - 1) {
        throwError(state, "end of the stream or a document separator is expected");
      } else {
        return;
      }
    }
    function loadDocuments(input, options) {
      input = String(input);
      options = options || {};
      if (input.length !== 0) {
        if (input.charCodeAt(input.length - 1) !== 10 && input.charCodeAt(input.length - 1) !== 13) {
          input += "\n";
        }
        if (input.charCodeAt(0) === 65279) {
          input = input.slice(1);
        }
      }
      var state = new State$1(input, options);
      var nullpos = input.indexOf("\0");
      if (nullpos !== -1) {
        state.position = nullpos;
        throwError(state, "null byte is not allowed in input");
      }
      state.input += "\0";
      while (state.input.charCodeAt(state.position) === 32) {
        state.lineIndent += 1;
        state.position += 1;
      }
      while (state.position < state.length - 1) {
        readDocument(state);
      }
      return state.documents;
    }
    function loadAll$1(input, iterator, options) {
      if (iterator !== null && typeof iterator === "object" && typeof options === "undefined") {
        options = iterator;
        iterator = null;
      }
      var documents = loadDocuments(input, options);
      if (typeof iterator !== "function") {
        return documents;
      }
      for (var index = 0, length = documents.length; index < length; index += 1) {
        iterator(documents[index]);
      }
    }
    function load$1(input, options) {
      var documents = loadDocuments(input, options);
      if (documents.length === 0) {
        return void 0;
      } else if (documents.length === 1) {
        return documents[0];
      }
      throw new exception("expected a single document in the stream, but found more");
    }
    var loadAll_1 = loadAll$1;
    var load_1 = load$1;
    var loader = {
      loadAll: loadAll_1,
      load: load_1
    };
    var _toString = Object.prototype.toString;
    var _hasOwnProperty = Object.prototype.hasOwnProperty;
    var CHAR_BOM = 65279;
    var CHAR_TAB = 9;
    var CHAR_LINE_FEED = 10;
    var CHAR_CARRIAGE_RETURN = 13;
    var CHAR_SPACE = 32;
    var CHAR_EXCLAMATION = 33;
    var CHAR_DOUBLE_QUOTE = 34;
    var CHAR_SHARP = 35;
    var CHAR_PERCENT = 37;
    var CHAR_AMPERSAND = 38;
    var CHAR_SINGLE_QUOTE = 39;
    var CHAR_ASTERISK = 42;
    var CHAR_COMMA = 44;
    var CHAR_MINUS = 45;
    var CHAR_COLON = 58;
    var CHAR_EQUALS = 61;
    var CHAR_GREATER_THAN = 62;
    var CHAR_QUESTION = 63;
    var CHAR_COMMERCIAL_AT = 64;
    var CHAR_LEFT_SQUARE_BRACKET = 91;
    var CHAR_RIGHT_SQUARE_BRACKET = 93;
    var CHAR_GRAVE_ACCENT = 96;
    var CHAR_LEFT_CURLY_BRACKET = 123;
    var CHAR_VERTICAL_LINE = 124;
    var CHAR_RIGHT_CURLY_BRACKET = 125;
    var ESCAPE_SEQUENCES = {};
    ESCAPE_SEQUENCES[0] = "\\0";
    ESCAPE_SEQUENCES[7] = "\\a";
    ESCAPE_SEQUENCES[8] = "\\b";
    ESCAPE_SEQUENCES[9] = "\\t";
    ESCAPE_SEQUENCES[10] = "\\n";
    ESCAPE_SEQUENCES[11] = "\\v";
    ESCAPE_SEQUENCES[12] = "\\f";
    ESCAPE_SEQUENCES[13] = "\\r";
    ESCAPE_SEQUENCES[27] = "\\e";
    ESCAPE_SEQUENCES[34] = '\\"';
    ESCAPE_SEQUENCES[92] = "\\\\";
    ESCAPE_SEQUENCES[133] = "\\N";
    ESCAPE_SEQUENCES[160] = "\\_";
    ESCAPE_SEQUENCES[8232] = "\\L";
    ESCAPE_SEQUENCES[8233] = "\\P";
    var DEPRECATED_BOOLEANS_SYNTAX = [
      "y",
      "Y",
      "yes",
      "Yes",
      "YES",
      "on",
      "On",
      "ON",
      "n",
      "N",
      "no",
      "No",
      "NO",
      "off",
      "Off",
      "OFF"
    ];
    var DEPRECATED_BASE60_SYNTAX = /^[-+]?[0-9_]+(?::[0-9_]+)+(?:\.[0-9_]*)?$/;
    function compileStyleMap(schema2, map2) {
      var result, keys, index, length, tag, style, type2;
      if (map2 === null) return {};
      result = {};
      keys = Object.keys(map2);
      for (index = 0, length = keys.length; index < length; index += 1) {
        tag = keys[index];
        style = String(map2[tag]);
        if (tag.slice(0, 2) === "!!") {
          tag = "tag:yaml.org,2002:" + tag.slice(2);
        }
        type2 = schema2.compiledTypeMap["fallback"][tag];
        if (type2 && _hasOwnProperty.call(type2.styleAliases, style)) {
          style = type2.styleAliases[style];
        }
        result[tag] = style;
      }
      return result;
    }
    function encodeHex(character) {
      var string, handle, length;
      string = character.toString(16).toUpperCase();
      if (character <= 255) {
        handle = "x";
        length = 2;
      } else if (character <= 65535) {
        handle = "u";
        length = 4;
      } else if (character <= 4294967295) {
        handle = "U";
        length = 8;
      } else {
        throw new exception("code point within a string may not be greater than 0xFFFFFFFF");
      }
      return "\\" + handle + common.repeat("0", length - string.length) + string;
    }
    var QUOTING_TYPE_SINGLE = 1;
    var QUOTING_TYPE_DOUBLE = 2;
    function State(options) {
      this.schema = options["schema"] || _default;
      this.indent = Math.max(1, options["indent"] || 2);
      this.noArrayIndent = options["noArrayIndent"] || false;
      this.skipInvalid = options["skipInvalid"] || false;
      this.flowLevel = common.isNothing(options["flowLevel"]) ? -1 : options["flowLevel"];
      this.styleMap = compileStyleMap(this.schema, options["styles"] || null);
      this.sortKeys = options["sortKeys"] || false;
      this.lineWidth = options["lineWidth"] || 80;
      this.noRefs = options["noRefs"] || false;
      this.noCompatMode = options["noCompatMode"] || false;
      this.condenseFlow = options["condenseFlow"] || false;
      this.quotingType = options["quotingType"] === '"' ? QUOTING_TYPE_DOUBLE : QUOTING_TYPE_SINGLE;
      this.forceQuotes = options["forceQuotes"] || false;
      this.replacer = typeof options["replacer"] === "function" ? options["replacer"] : null;
      this.implicitTypes = this.schema.compiledImplicit;
      this.explicitTypes = this.schema.compiledExplicit;
      this.tag = null;
      this.result = "";
      this.duplicates = [];
      this.usedDuplicates = null;
    }
    function indentString(string, spaces) {
      var ind = common.repeat(" ", spaces), position = 0, next = -1, result = "", line, length = string.length;
      while (position < length) {
        next = string.indexOf("\n", position);
        if (next === -1) {
          line = string.slice(position);
          position = length;
        } else {
          line = string.slice(position, next + 1);
          position = next + 1;
        }
        if (line.length && line !== "\n") result += ind;
        result += line;
      }
      return result;
    }
    function generateNextLine(state, level) {
      return "\n" + common.repeat(" ", state.indent * level);
    }
    function testImplicitResolving(state, str2) {
      var index, length, type2;
      for (index = 0, length = state.implicitTypes.length; index < length; index += 1) {
        type2 = state.implicitTypes[index];
        if (type2.resolve(str2)) {
          return true;
        }
      }
      return false;
    }
    function isWhitespace(c) {
      return c === CHAR_SPACE || c === CHAR_TAB;
    }
    function isPrintable(c) {
      return 32 <= c && c <= 126 || 161 <= c && c <= 55295 && c !== 8232 && c !== 8233 || 57344 <= c && c <= 65533 && c !== CHAR_BOM || 65536 <= c && c <= 1114111;
    }
    function isNsCharOrWhitespace(c) {
      return isPrintable(c) && c !== CHAR_BOM && c !== CHAR_CARRIAGE_RETURN && c !== CHAR_LINE_FEED;
    }
    function isPlainSafe(c, prev, inblock) {
      var cIsNsCharOrWhitespace = isNsCharOrWhitespace(c);
      var cIsNsChar = cIsNsCharOrWhitespace && !isWhitespace(c);
      return (
        // ns-plain-safe
        (inblock ? (
          // c = flow-in
          cIsNsCharOrWhitespace
        ) : cIsNsCharOrWhitespace && c !== CHAR_COMMA && c !== CHAR_LEFT_SQUARE_BRACKET && c !== CHAR_RIGHT_SQUARE_BRACKET && c !== CHAR_LEFT_CURLY_BRACKET && c !== CHAR_RIGHT_CURLY_BRACKET) && c !== CHAR_SHARP && !(prev === CHAR_COLON && !cIsNsChar) || isNsCharOrWhitespace(prev) && !isWhitespace(prev) && c === CHAR_SHARP || prev === CHAR_COLON && cIsNsChar
      );
    }
    function isPlainSafeFirst(c) {
      return isPrintable(c) && c !== CHAR_BOM && !isWhitespace(c) && c !== CHAR_MINUS && c !== CHAR_QUESTION && c !== CHAR_COLON && c !== CHAR_COMMA && c !== CHAR_LEFT_SQUARE_BRACKET && c !== CHAR_RIGHT_SQUARE_BRACKET && c !== CHAR_LEFT_CURLY_BRACKET && c !== CHAR_RIGHT_CURLY_BRACKET && c !== CHAR_SHARP && c !== CHAR_AMPERSAND && c !== CHAR_ASTERISK && c !== CHAR_EXCLAMATION && c !== CHAR_VERTICAL_LINE && c !== CHAR_EQUALS && c !== CHAR_GREATER_THAN && c !== CHAR_SINGLE_QUOTE && c !== CHAR_DOUBLE_QUOTE && c !== CHAR_PERCENT && c !== CHAR_COMMERCIAL_AT && c !== CHAR_GRAVE_ACCENT;
    }
    function isPlainSafeLast(c) {
      return !isWhitespace(c) && c !== CHAR_COLON;
    }
    function codePointAt(string, pos) {
      var first = string.charCodeAt(pos), second;
      if (first >= 55296 && first <= 56319 && pos + 1 < string.length) {
        second = string.charCodeAt(pos + 1);
        if (second >= 56320 && second <= 57343) {
          return (first - 55296) * 1024 + second - 56320 + 65536;
        }
      }
      return first;
    }
    function needIndentIndicator(string) {
      var leadingSpaceRe = /^\n* /;
      return leadingSpaceRe.test(string);
    }
    var STYLE_PLAIN = 1;
    var STYLE_SINGLE = 2;
    var STYLE_LITERAL = 3;
    var STYLE_FOLDED = 4;
    var STYLE_DOUBLE = 5;
    function chooseScalarStyle(string, singleLineOnly, indentPerLevel, lineWidth, testAmbiguousType, quotingType, forceQuotes, inblock) {
      var i2;
      var char = 0;
      var prevChar = null;
      var hasLineBreak = false;
      var hasFoldableLine = false;
      var shouldTrackWidth = lineWidth !== -1;
      var previousLineBreak = -1;
      var plain = isPlainSafeFirst(codePointAt(string, 0)) && isPlainSafeLast(codePointAt(string, string.length - 1));
      if (singleLineOnly || forceQuotes) {
        for (i2 = 0; i2 < string.length; char >= 65536 ? i2 += 2 : i2++) {
          char = codePointAt(string, i2);
          if (!isPrintable(char)) {
            return STYLE_DOUBLE;
          }
          plain = plain && isPlainSafe(char, prevChar, inblock);
          prevChar = char;
        }
      } else {
        for (i2 = 0; i2 < string.length; char >= 65536 ? i2 += 2 : i2++) {
          char = codePointAt(string, i2);
          if (char === CHAR_LINE_FEED) {
            hasLineBreak = true;
            if (shouldTrackWidth) {
              hasFoldableLine = hasFoldableLine || // Foldable line = too long, and not more-indented.
              i2 - previousLineBreak - 1 > lineWidth && string[previousLineBreak + 1] !== " ";
              previousLineBreak = i2;
            }
          } else if (!isPrintable(char)) {
            return STYLE_DOUBLE;
          }
          plain = plain && isPlainSafe(char, prevChar, inblock);
          prevChar = char;
        }
        hasFoldableLine = hasFoldableLine || shouldTrackWidth && (i2 - previousLineBreak - 1 > lineWidth && string[previousLineBreak + 1] !== " ");
      }
      if (!hasLineBreak && !hasFoldableLine) {
        if (plain && !forceQuotes && !testAmbiguousType(string)) {
          return STYLE_PLAIN;
        }
        return quotingType === QUOTING_TYPE_DOUBLE ? STYLE_DOUBLE : STYLE_SINGLE;
      }
      if (indentPerLevel > 9 && needIndentIndicator(string)) {
        return STYLE_DOUBLE;
      }
      if (!forceQuotes) {
        return hasFoldableLine ? STYLE_FOLDED : STYLE_LITERAL;
      }
      return quotingType === QUOTING_TYPE_DOUBLE ? STYLE_DOUBLE : STYLE_SINGLE;
    }
    function writeScalar(state, string, level, iskey, inblock) {
      state.dump = (function() {
        if (string.length === 0) {
          return state.quotingType === QUOTING_TYPE_DOUBLE ? '""' : "''";
        }
        if (!state.noCompatMode) {
          if (DEPRECATED_BOOLEANS_SYNTAX.indexOf(string) !== -1 || DEPRECATED_BASE60_SYNTAX.test(string)) {
            return state.quotingType === QUOTING_TYPE_DOUBLE ? '"' + string + '"' : "'" + string + "'";
          }
        }
        var indent = state.indent * Math.max(1, level);
        var lineWidth = state.lineWidth === -1 ? -1 : Math.max(Math.min(state.lineWidth, 40), state.lineWidth - indent);
        var singleLineOnly = iskey || state.flowLevel > -1 && level >= state.flowLevel;
        function testAmbiguity(string2) {
          return testImplicitResolving(state, string2);
        }
        switch (chooseScalarStyle(
          string,
          singleLineOnly,
          state.indent,
          lineWidth,
          testAmbiguity,
          state.quotingType,
          state.forceQuotes && !iskey,
          inblock
        )) {
          case STYLE_PLAIN:
            return string;
          case STYLE_SINGLE:
            return "'" + string.replace(/'/g, "''") + "'";
          case STYLE_LITERAL:
            return "|" + blockHeader(string, state.indent) + dropEndingNewline(indentString(string, indent));
          case STYLE_FOLDED:
            return ">" + blockHeader(string, state.indent) + dropEndingNewline(indentString(foldString(string, lineWidth), indent));
          case STYLE_DOUBLE:
            return '"' + escapeString(string) + '"';
          default:
            throw new exception("impossible error: invalid scalar style");
        }
      })();
    }
    function blockHeader(string, indentPerLevel) {
      var indentIndicator = needIndentIndicator(string) ? String(indentPerLevel) : "";
      var clip = string[string.length - 1] === "\n";
      var keep = clip && (string[string.length - 2] === "\n" || string === "\n");
      var chomp = keep ? "+" : clip ? "" : "-";
      return indentIndicator + chomp + "\n";
    }
    function dropEndingNewline(string) {
      return string[string.length - 1] === "\n" ? string.slice(0, -1) : string;
    }
    function foldString(string, width) {
      var lineRe = /(\n+)([^\n]*)/g;
      var result = (function() {
        var nextLF = string.indexOf("\n");
        nextLF = nextLF !== -1 ? nextLF : string.length;
        lineRe.lastIndex = nextLF;
        return foldLine(string.slice(0, nextLF), width);
      })();
      var prevMoreIndented = string[0] === "\n" || string[0] === " ";
      var moreIndented;
      var match;
      while (match = lineRe.exec(string)) {
        var prefix = match[1], line = match[2];
        moreIndented = line[0] === " ";
        result += prefix + (!prevMoreIndented && !moreIndented && line !== "" ? "\n" : "") + foldLine(line, width);
        prevMoreIndented = moreIndented;
      }
      return result;
    }
    function foldLine(line, width) {
      if (line === "" || line[0] === " ") return line;
      var breakRe = / [^ ]/g;
      var match;
      var start = 0, end, curr = 0, next = 0;
      var result = "";
      while (match = breakRe.exec(line)) {
        next = match.index;
        if (next - start > width) {
          end = curr > start ? curr : next;
          result += "\n" + line.slice(start, end);
          start = end + 1;
        }
        curr = next;
      }
      result += "\n";
      if (line.length - start > width && curr > start) {
        result += line.slice(start, curr) + "\n" + line.slice(curr + 1);
      } else {
        result += line.slice(start);
      }
      return result.slice(1);
    }
    function escapeString(string) {
      var result = "";
      var char = 0;
      var escapeSeq;
      for (var i2 = 0; i2 < string.length; char >= 65536 ? i2 += 2 : i2++) {
        char = codePointAt(string, i2);
        escapeSeq = ESCAPE_SEQUENCES[char];
        if (!escapeSeq && isPrintable(char)) {
          result += string[i2];
          if (char >= 65536) result += string[i2 + 1];
        } else {
          result += escapeSeq || encodeHex(char);
        }
      }
      return result;
    }
    function writeFlowSequence(state, level, object) {
      var _result = "", _tag = state.tag, index, length, value;
      for (index = 0, length = object.length; index < length; index += 1) {
        value = object[index];
        if (state.replacer) {
          value = state.replacer.call(object, String(index), value);
        }
        if (writeNode(state, level, value, false, false) || typeof value === "undefined" && writeNode(state, level, null, false, false)) {
          if (_result !== "") _result += "," + (!state.condenseFlow ? " " : "");
          _result += state.dump;
        }
      }
      state.tag = _tag;
      state.dump = "[" + _result + "]";
    }
    function writeBlockSequence(state, level, object, compact) {
      var _result = "", _tag = state.tag, index, length, value;
      for (index = 0, length = object.length; index < length; index += 1) {
        value = object[index];
        if (state.replacer) {
          value = state.replacer.call(object, String(index), value);
        }
        if (writeNode(state, level + 1, value, true, true, false, true) || typeof value === "undefined" && writeNode(state, level + 1, null, true, true, false, true)) {
          if (!compact || _result !== "") {
            _result += generateNextLine(state, level);
          }
          if (state.dump && CHAR_LINE_FEED === state.dump.charCodeAt(0)) {
            _result += "-";
          } else {
            _result += "- ";
          }
          _result += state.dump;
        }
      }
      state.tag = _tag;
      state.dump = _result || "[]";
    }
    function writeFlowMapping(state, level, object) {
      var _result = "", _tag = state.tag, objectKeyList = Object.keys(object), index, length, objectKey, objectValue, pairBuffer;
      for (index = 0, length = objectKeyList.length; index < length; index += 1) {
        pairBuffer = "";
        if (_result !== "") pairBuffer += ", ";
        if (state.condenseFlow) pairBuffer += '"';
        objectKey = objectKeyList[index];
        objectValue = object[objectKey];
        if (state.replacer) {
          objectValue = state.replacer.call(object, objectKey, objectValue);
        }
        if (!writeNode(state, level, objectKey, false, false)) {
          continue;
        }
        if (state.dump.length > 1024) pairBuffer += "? ";
        pairBuffer += state.dump + (state.condenseFlow ? '"' : "") + ":" + (state.condenseFlow ? "" : " ");
        if (!writeNode(state, level, objectValue, false, false)) {
          continue;
        }
        pairBuffer += state.dump;
        _result += pairBuffer;
      }
      state.tag = _tag;
      state.dump = "{" + _result + "}";
    }
    function writeBlockMapping(state, level, object, compact) {
      var _result = "", _tag = state.tag, objectKeyList = Object.keys(object), index, length, objectKey, objectValue, explicitPair, pairBuffer;
      if (state.sortKeys === true) {
        objectKeyList.sort();
      } else if (typeof state.sortKeys === "function") {
        objectKeyList.sort(state.sortKeys);
      } else if (state.sortKeys) {
        throw new exception("sortKeys must be a boolean or a function");
      }
      for (index = 0, length = objectKeyList.length; index < length; index += 1) {
        pairBuffer = "";
        if (!compact || _result !== "") {
          pairBuffer += generateNextLine(state, level);
        }
        objectKey = objectKeyList[index];
        objectValue = object[objectKey];
        if (state.replacer) {
          objectValue = state.replacer.call(object, objectKey, objectValue);
        }
        if (!writeNode(state, level + 1, objectKey, true, true, true)) {
          continue;
        }
        explicitPair = state.tag !== null && state.tag !== "?" || state.dump && state.dump.length > 1024;
        if (explicitPair) {
          if (state.dump && CHAR_LINE_FEED === state.dump.charCodeAt(0)) {
            pairBuffer += "?";
          } else {
            pairBuffer += "? ";
          }
        }
        pairBuffer += state.dump;
        if (explicitPair) {
          pairBuffer += generateNextLine(state, level);
        }
        if (!writeNode(state, level + 1, objectValue, true, explicitPair)) {
          continue;
        }
        if (state.dump && CHAR_LINE_FEED === state.dump.charCodeAt(0)) {
          pairBuffer += ":";
        } else {
          pairBuffer += ": ";
        }
        pairBuffer += state.dump;
        _result += pairBuffer;
      }
      state.tag = _tag;
      state.dump = _result || "{}";
    }
    function detectType(state, object, explicit) {
      var _result, typeList, index, length, type2, style;
      typeList = explicit ? state.explicitTypes : state.implicitTypes;
      for (index = 0, length = typeList.length; index < length; index += 1) {
        type2 = typeList[index];
        if ((type2.instanceOf || type2.predicate) && (!type2.instanceOf || typeof object === "object" && object instanceof type2.instanceOf) && (!type2.predicate || type2.predicate(object))) {
          if (explicit) {
            if (type2.multi && type2.representName) {
              state.tag = type2.representName(object);
            } else {
              state.tag = type2.tag;
            }
          } else {
            state.tag = "?";
          }
          if (type2.represent) {
            style = state.styleMap[type2.tag] || type2.defaultStyle;
            if (_toString.call(type2.represent) === "[object Function]") {
              _result = type2.represent(object, style);
            } else if (_hasOwnProperty.call(type2.represent, style)) {
              _result = type2.represent[style](object, style);
            } else {
              throw new exception("!<" + type2.tag + '> tag resolver accepts not "' + style + '" style');
            }
            state.dump = _result;
          }
          return true;
        }
      }
      return false;
    }
    function writeNode(state, level, object, block, compact, iskey, isblockseq) {
      state.tag = null;
      state.dump = object;
      if (!detectType(state, object, false)) {
        detectType(state, object, true);
      }
      var type2 = _toString.call(state.dump);
      var inblock = block;
      var tagStr;
      if (block) {
        block = state.flowLevel < 0 || state.flowLevel > level;
      }
      var objectOrArray = type2 === "[object Object]" || type2 === "[object Array]", duplicateIndex, duplicate;
      if (objectOrArray) {
        duplicateIndex = state.duplicates.indexOf(object);
        duplicate = duplicateIndex !== -1;
      }
      if (state.tag !== null && state.tag !== "?" || duplicate || state.indent !== 2 && level > 0) {
        compact = false;
      }
      if (duplicate && state.usedDuplicates[duplicateIndex]) {
        state.dump = "*ref_" + duplicateIndex;
      } else {
        if (objectOrArray && duplicate && !state.usedDuplicates[duplicateIndex]) {
          state.usedDuplicates[duplicateIndex] = true;
        }
        if (type2 === "[object Object]") {
          if (block && Object.keys(state.dump).length !== 0) {
            writeBlockMapping(state, level, state.dump, compact);
            if (duplicate) {
              state.dump = "&ref_" + duplicateIndex + state.dump;
            }
          } else {
            writeFlowMapping(state, level, state.dump);
            if (duplicate) {
              state.dump = "&ref_" + duplicateIndex + " " + state.dump;
            }
          }
        } else if (type2 === "[object Array]") {
          if (block && state.dump.length !== 0) {
            if (state.noArrayIndent && !isblockseq && level > 0) {
              writeBlockSequence(state, level - 1, state.dump, compact);
            } else {
              writeBlockSequence(state, level, state.dump, compact);
            }
            if (duplicate) {
              state.dump = "&ref_" + duplicateIndex + state.dump;
            }
          } else {
            writeFlowSequence(state, level, state.dump);
            if (duplicate) {
              state.dump = "&ref_" + duplicateIndex + " " + state.dump;
            }
          }
        } else if (type2 === "[object String]") {
          if (state.tag !== "?") {
            writeScalar(state, state.dump, level, iskey, inblock);
          }
        } else if (type2 === "[object Undefined]") {
          return false;
        } else {
          if (state.skipInvalid) return false;
          throw new exception("unacceptable kind of an object to dump " + type2);
        }
        if (state.tag !== null && state.tag !== "?") {
          tagStr = encodeURI(
            state.tag[0] === "!" ? state.tag.slice(1) : state.tag
          ).replace(/!/g, "%21");
          if (state.tag[0] === "!") {
            tagStr = "!" + tagStr;
          } else if (tagStr.slice(0, 18) === "tag:yaml.org,2002:") {
            tagStr = "!!" + tagStr.slice(18);
          } else {
            tagStr = "!<" + tagStr + ">";
          }
          state.dump = tagStr + " " + state.dump;
        }
      }
      return true;
    }
    function getDuplicateReferences(object, state) {
      var objects = [], duplicatesIndexes = [], index, length;
      inspectNode(object, objects, duplicatesIndexes);
      for (index = 0, length = duplicatesIndexes.length; index < length; index += 1) {
        state.duplicates.push(objects[duplicatesIndexes[index]]);
      }
      state.usedDuplicates = new Array(length);
    }
    function inspectNode(object, objects, duplicatesIndexes) {
      var objectKeyList, index, length;
      if (object !== null && typeof object === "object") {
        index = objects.indexOf(object);
        if (index !== -1) {
          if (duplicatesIndexes.indexOf(index) === -1) {
            duplicatesIndexes.push(index);
          }
        } else {
          objects.push(object);
          if (Array.isArray(object)) {
            for (index = 0, length = object.length; index < length; index += 1) {
              inspectNode(object[index], objects, duplicatesIndexes);
            }
          } else {
            objectKeyList = Object.keys(object);
            for (index = 0, length = objectKeyList.length; index < length; index += 1) {
              inspectNode(object[objectKeyList[index]], objects, duplicatesIndexes);
            }
          }
        }
      }
    }
    function dump$1(input, options) {
      options = options || {};
      var state = new State(options);
      if (!state.noRefs) getDuplicateReferences(input, state);
      var value = input;
      if (state.replacer) {
        value = state.replacer.call({ "": value }, "", value);
      }
      if (writeNode(state, 0, value, true, true)) return state.dump + "\n";
      return "";
    }
    var dump_1 = dump$1;
    var dumper = {
      dump: dump_1
    };
    function renamed(from, to) {
      return function() {
        throw new Error("Function yaml." + from + " is removed in js-yaml 4. Use yaml." + to + " instead, which is now safe by default.");
      };
    }
    var Type = type;
    var Schema = schema;
    var FAILSAFE_SCHEMA = failsafe;
    var JSON_SCHEMA = json;
    var CORE_SCHEMA = core;
    var DEFAULT_SCHEMA = _default;
    var load3 = loader.load;
    var loadAll = loader.loadAll;
    var dump = dumper.dump;
    var YAMLException = exception;
    var types = {
      binary,
      float,
      map,
      null: _null,
      pairs,
      set,
      timestamp,
      bool,
      int,
      merge,
      omap,
      seq,
      str
    };
    var safeLoad = renamed("safeLoad", "load");
    var safeLoadAll = renamed("safeLoadAll", "loadAll");
    var safeDump = renamed("safeDump", "dump");
    var jsYaml = {
      Type,
      Schema,
      FAILSAFE_SCHEMA,
      JSON_SCHEMA,
      CORE_SCHEMA,
      DEFAULT_SCHEMA,
      load: load3,
      loadAll,
      dump,
      YAMLException,
      types,
      safeLoad,
      safeLoadAll,
      safeDump
    };
    var js_yaml_default = jsYaml;
    var import_process3 = __toESM2(require("process"));
    var import_process2 = __toESM2(require("process"));
    var import_process = require("process");
    var defaultFoundryConfigCandidates = [
      "**/foundryconfig.json",
      "**/foundryconfig.yaml",
      "**/foundryconfig.yml"
    ];
    function getFoundryConfigFileNames() {
      const searchPaths = [...defaultFoundryConfigCandidates];
      const os = (() => {
        switch (import_process.platform) {
          case "darwin":
            return "macosx";
          case "linux":
            return "linux";
          case "win32":
            return "windows";
          default:
            return void 0;
        }
      })();
      if (os) {
        const filenameWithoutExt = `**/foundryconfig.${os}`;
        searchPaths.push(filenameWithoutExt + ".json");
        searchPaths.push(filenameWithoutExt + ".yaml");
        searchPaths.push(filenameWithoutExt + ".yml");
      }
      return searchPaths;
    }
    var import_fs_extra8 = __toESM2(require("fs-extra"));
    var import_path13 = __toESM2(require("path"));
    function walkFiles2(pattern, { cwd, exclude }) {
      return import_fs_extra8.default.globSync(pattern, { cwd, exclude }).map((match) => {
        const dir = cwd?.replaceAll(/\\/g, "/") ?? "";
        return import_path13.default.resolve(dir, match);
      });
    }
    async function getFoundryConfigPath(cwd) {
      const configCandidates = getFoundryConfigFileNames();
      cwd ??= import_process2.default.cwd();
      const found = walkFiles2(configCandidates, { cwd });
      if (found.length === 0)
        throw new Error("Could not find any foundryconfig.(json|yaml|yml) or foundryconfig.<OS>.(json|yaml|yml) file.");
      return found[0];
    }
    async function getFoundryConfigInfo(cwd) {
      const foundryConfigPath = await getFoundryConfigPath(cwd);
      if (!foundryConfigPath) return void 0;
      const foundryConfig = import_path22.default.extname(foundryConfigPath) == ".json" ? await import_fs_extra22.default.readJSON(foundryConfigPath) : js_yaml_default.load(await import_fs_extra22.default.readFile(foundryConfigPath, "utf-8"), {
        json: true,
        filename: foundryConfigPath
      });
      let dataPaths = foundryConfig.dataPath ?? [];
      if (!Array.isArray(dataPaths)) dataPaths = [dataPaths];
      foundryConfig.dataPath = dataPaths;
      foundryConfig.resolvedDataPath = resolvePath(dataPaths);
      let installPaths = foundryConfig.installPath ?? [];
      if (!Array.isArray(installPaths)) installPaths = [installPaths];
      const resolvedInstallPath = resolvePath(installPaths);
      const resolvedMainJs = resolveMainJs(resolvedInstallPath);
      foundryConfig.installPath = installPaths;
      foundryConfig.resolvedInstallPath = resolvedInstallPath;
      foundryConfig.resolvedMainJs = resolvedMainJs;
      return foundryConfig;
      function replaceEnvVars(input) {
        return input.replaceAll(getPattern(), (_, ...groups) => {
          return import_process3.default.env[groups[0]] || "";
        });
        function getPattern() {
          return import_process3.default.platform === "win32" ? /%(.*)%/g : /$(.*)/g;
        }
      }
      function resolvePath(paths) {
        return paths.map((p) => {
          p = replaceEnvVars(p);
          if (!import_fs_extra22.default.statSync(import_path22.default.resolve(p)).isDirectory()) {
            return void 0;
          }
          return import_path22.default.resolve(p);
        }).filter((p) => p !== void 0);
      }
      function resolveMainJs(paths) {
        const candidates = paths.flatMap((p) => [
          import_path22.default.normalize(import_path22.default.join(p, "resources", "app", "main.js")),
          // before v13
          import_path22.default.normalize(import_path22.default.join(p, "main.js"))
          // v13
        ]).filter((p) => import_fs_extra22.default.pathExistsSync(p));
        if (candidates.length === 0) throw new Error("No main.js found in any of the installation paths.");
        return candidates[0];
      }
    }
    var fse = __toESM2(require("fs-extra"));
    var import_path32 = __toESM2(require("path"));
    var import_picocolors5 = __toESM2(require("picocolors"));
    var import_classic_level = require_classic_level();
    async function compilePack(src, dest, { nedb = false, yaml = false, recursive = false, log = false, transformEntry } = {}) {
      if (nedb) throw new Error("NeDB files are obsolete and only Classic database level files are handled!");
      const files = findSourceFiles(src, { yaml, recursive });
      return compileClassicLevel(dest, files, { log, transformEntry });
    }
    async function compileClassicLevel(pack, files, { log, transformEntry } = {}) {
      fse.mkdirSync(pack, { recursive: true });
      const db = new import_classic_level.ClassicLevel(pack, { keyEncoding: "utf8", valueEncoding: "json" });
      await db.open();
      const batch = db.batch();
      const seenKeys = /* @__PURE__ */ new Set();
      const packDoc = applyHierarchy(async (doc, collection) => {
        const key = doc._key;
        delete doc._key;
        if (seenKeys.has(key)) {
          throw new Error(`An entry with key '${key}' was already packed and would be overwritten by this entry.`);
        }
        seenKeys.add(key);
        const value = structuredClone(doc);
        await mapHierarchy(value, collection, (d) => d._id);
        batch.put(key, value);
      });
      for (const file of files) {
        try {
          const contents = fse.readFileSync(file, "utf8");
          const ext = import_path32.default.extname(file);
          const isYaml = ext === ".yml" || ext === ".yaml";
          const doc = isYaml ? load3(contents) : JSON.parse(contents);
          const [, collection] = doc._key.split("!");
          if (await transformEntry?.(doc) === false) continue;
          await packDoc(doc, collection);
          if (log) console.log(`Packed ${import_picocolors5.default.blue(doc._id)}${import_picocolors5.default.blue(doc.name ? ` (${doc.name})` : "")}`);
        } catch (err) {
          if (log) console.error(`Failed to pack ${import_picocolors5.default.red(file)}. See error below.`);
          throw err;
        }
      }
      for (const key of await db.keys().all()) {
        if (!seenKeys.has(key)) {
          batch.del(key);
          if (log) console.log(`Removed ${import_picocolors5.default.blue(key)}`);
        }
      }
      await batch.write();
      await compactClassicLevel(db);
      await db.close();
    }
    async function compactClassicLevel(db) {
      const forwardIterator = db.keys({ limit: 1, fillCache: false });
      const firstKey = await forwardIterator.next();
      await forwardIterator.close();
      const backwardIterator = db.keys({ limit: 1, reverse: true, fillCache: false });
      const lastKey = await backwardIterator.next();
      await backwardIterator.close();
      if (firstKey && lastKey) return db.compactRange(firstKey, lastKey, { keyEncoding: "utf8" });
    }
    async function extractPack(src, dest, {
      nedb = false,
      yaml = false,
      yamlOptions = {},
      jsonOptions = {},
      log = false,
      ////documentType,
      ////collection,
      clean,
      folders,
      transformEntry,
      transformName,
      transformFolderName
    } = {}) {
      if (nedb) throw new Error("NeDB files are obsolete and only Classic database level files are handled!");
      if (clean) fse.rmSync(dest, { force: true, recursive: true, maxRetries: 10 });
      fse.mkdirSync(dest, { recursive: true });
      return extractClassicLevel(src, dest, {
        yaml,
        log,
        yamlOptions,
        jsonOptions,
        folders,
        transformEntry,
        transformName,
        transformFolderName
      });
    }
    async function extractClassicLevel(pack, dest, {
      yaml,
      yamlOptions,
      jsonOptions,
      log,
      folders,
      transformEntry,
      transformName,
      transformFolderName
    }) {
      const db = new import_classic_level.ClassicLevel(pack, { keyEncoding: "utf8", valueEncoding: "json" });
      await db.open();
      const foldersMap = /* @__PURE__ */ new Map();
      if (folders) {
        for await (const [key, doc] of db.iterator()) {
          if (!key.startsWith("!folders")) continue;
          let name = await transformFolderName?.(doc);
          if (!name) name = doc.name ? `${getSafeFilename(doc.name)}_${doc._id}` : key;
          foldersMap.set(doc._id, { name, folder: doc.folder });
        }
        for (const folder of foldersMap.values()) {
          let parent = foldersMap.get(folder.folder);
          folder.path = folder.name;
          while (parent) {
            folder.path = import_path32.default.join(parent.name, folder.path);
            parent = foldersMap.get(parent.folder);
          }
        }
      }
      const unpackDoc = applyHierarchy(async (doc, collection, options = {}) => {
        const { sublevelPrefix, idPrefix } = options;
        const sublevel = keyJoin(sublevelPrefix, collection);
        const id = keyJoin(idPrefix, doc._id);
        doc._key = `!${sublevel}!${id}`;
        await mapHierarchy(doc, collection, (embeddedId, embeddedCollectionName) => {
          return db.get(`!${sublevel}.${embeddedCollectionName}!${id}.${embeddedId}`);
        });
        return { sublevelPrefix: sublevel, idPrefix: id };
      });
      for await (const [key, doc] of db.iterator()) {
        const [, collection, id] = key.split("!");
        if (collection.includes(".")) continue;
        await unpackDoc(doc, collection);
        if (await transformEntry?.(doc) === false) continue;
        const folder = foldersMap?.get(doc.folder)?.path;
        let name = await transformName?.(doc, { folder });
        if (!name) {
          if (key.startsWith("!folders") && foldersMap?.has(doc._id)) {
            const folder2 = foldersMap.get(doc._id);
            name = import_path32.default.join(folder2.name, `_Folder.${yaml ? "yml" : "json"}`);
          } else {
            name = `${doc.name ? `${getSafeFilename(doc.name)}_${id}` : key}.${yaml ? "yml" : "json"}`;
          }
          if (folder) name = import_path32.default.join(folder, name);
        }
        const filename = import_path32.default.join(dest, name);
        serializeDocument(doc, filename, { yaml, yamlOptions, jsonOptions });
        if (log) console.log(`Wrote ${import_picocolors5.default.blue(name)}`);
      }
      await db.close();
    }
    function applyHierarchy(fn) {
      const apply = async (doc, collection, options = {}) => {
        const newOptions = await fn(doc, collection, options);
        for (const [embeddedCollectionName, type2] of Object.entries(HIERARCHY[collection] ?? {})) {
          const embeddedValue = doc[embeddedCollectionName];
          if (Array.isArray(type2) && Array.isArray(embeddedValue)) {
            for (const embeddedDoc of embeddedValue) await apply(embeddedDoc, embeddedCollectionName, newOptions ?? {});
          } else if (embeddedValue) {
            await apply(embeddedValue, embeddedCollectionName, newOptions ?? {});
          }
        }
      };
      return apply;
    }
    async function mapHierarchy(doc, collection, fn) {
      for (const [embeddedCollectionName, type2] of Object.entries(HIERARCHY[collection] ?? {})) {
        const embeddedValue = doc[embeddedCollectionName];
        if (Array.isArray(type2)) {
          if (Array.isArray(embeddedValue)) {
            doc[embeddedCollectionName] = await Promise.all(
              embeddedValue.map((entry) => {
                return fn(entry, embeddedCollectionName);
              })
            );
          } else doc[embeddedCollectionName] = [];
        } else {
          if (embeddedValue) doc[embeddedCollectionName] = await fn(embeddedValue, embeddedCollectionName);
          else doc[embeddedCollectionName] = null;
        }
      }
    }
    function findSourceFiles(root, { yaml = false, recursive = false } = {}) {
      const files = [];
      for (const entry of fse.readdirSync(root, { withFileTypes: true })) {
        const name = import_path32.default.join(root, entry.name);
        if (entry.isDirectory() && recursive) {
          files.push(...findSourceFiles(name, { yaml, recursive }));
          continue;
        }
        if (!entry.isFile()) continue;
        const ext = import_path32.default.extname(name);
        const isYaml = ext === ".yml" || ext === ".yaml";
        if (yaml && isYaml) files.push(name);
        else if (!yaml && ext === ".json") files.push(name);
      }
      return files;
    }
    function getSafeFilename(filename) {
      return filename.normalize("NFD").replace(/[^a-zA-Z0-9\u0300-\u036F]/gu, "_");
    }
    function keyJoin(...args) {
      return args.filter((_) => _).join(".");
    }
    function serializeDocument(doc, filename, { yaml, yamlOptions = {}, jsonOptions = {} } = {}) {
      fse.mkdirSync(import_path32.default.dirname(filename), { recursive: true });
      const serialized = (() => {
        if (yaml) return dump(doc, yamlOptions);
        else {
          const { replacer = null, space = 2 } = jsonOptions;
          return JSON.stringify(doc, replacer, space) + "\n";
        }
      })();
      fse.writeFileSync(filename, serialized);
    }
    var HIERARCHY = {
      actors: {
        items: [],
        effects: []
      },
      cards: {
        cards: []
      },
      combats: {
        combatants: []
      },
      delta: {
        items: [],
        effects: []
      },
      items: {
        effects: []
      },
      journal: {
        pages: [],
        categories: []
      },
      playlists: {
        sounds: []
      },
      regions: {
        behaviors: []
      },
      tables: {
        results: []
      },
      tokens: {
        delta: {}
      },
      scenes: {
        drawings: [],
        tokens: [],
        lights: [],
        notes: [],
        regions: [],
        sounds: [],
        templates: [],
        tiles: [],
        walls: []
      }
    };
    var import_child_process = require("child_process");
    var dotenv = __toESM2(require_main());
    async function launchFoundry(rootPath = ".", {
      dataPath,
      world,
      port,
      demo,
      noupnp,
      noupdate
    } = {}) {
      const foundryConfig = await getFoundryConfigInfo(rootPath);
      if (!foundryConfig) return;
      const mainJsPath = foundryConfig.resolvedMainJs;
      dataPath ??= (() => {
        const dataPath2 = foundryConfig.dataPath;
        if (dataPath2.length === 0) throw new Error("No data path set in Foundry VTT config file! Please add some.");
        const resolvedDataPath = foundryConfig.resolvedDataPath;
        if (!resolvedDataPath) throw new Error("No data path found!\nSearch for: \n - " + dataPath2.join("\n - "));
        return resolvedDataPath[0];
      })();
      dotenv.configDotenv({ path: rootPath, encoding: "utf-8" });
      const adminKey = process.env.ADMIN_KEY;
      launchFoundryPrivate(mainJsPath, dataPath, {
        demo,
        port: port ?? 3e4,
        world,
        noupdate,
        noupnp,
        adminKey
      });
    }
    function launchFoundryPrivate(mainJsPath, dataPath, {
      world,
      port,
      demo,
      noupnp,
      noupdate,
      adminKey
    } = { port: 3e4 }) {
      const foundry = (0, import_child_process.spawn)("node", [
        mainJsPath,
        `--dataPath=${dataPath}`,
        `--port=${port}`,
        demo ? "--demo" : "",
        world ? `--world=${world}` : "",
        noupnp ? "--noupnp" : "",
        noupdate ? "--noupdate" : "",
        adminKey ? `--adminKey=${adminKey}` : ""
      ]);
      foundry.stdout.on("data", (data) => console.log(data.toString()));
      foundry.stderr.on("data", (data) => console.error(data.toString()));
      foundry.on("close", (code) => console.log(`Foundry VTT exited with code ${code}`));
    }
    var import_fs_extra32 = __toESM2(require("fs-extra"));
    var import_path42 = __toESM2(require("path"));
    var manifestCandidates = [
      "**/module.json",
      "**/module.yaml",
      "**/module.yml",
      "**/system.json",
      "**/system.yaml",
      "**/system.yml"
    ];
    async function findManifest2(cwd) {
      cwd ??= process.cwd();
      const found = walkFiles2(manifestCandidates, { cwd });
      if (found.length === 0) return void 0;
      const manifestPath = found[0];
      const { base } = import_path42.default.parse(manifestPath);
      let cachedManifest = void 0;
      const manifest2 = async () => cachedManifest ??= await loadManifest(manifestPath);
      const manifestInfo = {
        path: manifestPath,
        type: base,
        manifest: manifest2,
        baseUrl: () => getFoundryBaseUrl(manifestInfo)
      };
      return manifestInfo;
    }
    async function loadManifest(manifestPath) {
      const { ext } = import_path42.default.posix.parse(manifestPath);
      const manifestData = await import_fs_extra32.default.readFile(manifestPath, "utf8");
      return ext === ".json" ? JSON.parse(manifestData) : js_yaml_default.load(manifestData);
    }
    var mapping = /* @__PURE__ */ new Map([
      ["module", "/modules/"],
      ["system", "/systems/"]
    ]);
    async function getFoundryBaseUrl(manifestInfo) {
      const prefix = mapping.get(manifestInfo.type);
      if (!prefix) return void 0;
      const { id } = await manifestInfo.manifest() ?? { id: void 0 };
      if (!id) return void 0;
      return import_path42.default.posix.join(prefix, id);
    }
  }
});

// src/index.ts
var index_exports = {};
__export(index_exports, {
  foundryvtt: () => foundryvtt
});
module.exports = __toCommonJS(index_exports);
var import_fs_extra7 = __toESM(require("fs-extra"));

// src/assets/build.ts
var import_path5 = __toESM(require("path"));

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
  return import_fs_extra2.default.globSync(pattern, { cwd: srcDir, exclude }).map((match) => {
    const dir = srcDir?.replaceAll(/\\/g, "/") ?? "";
    return import_path2.default.resolve(dir, match);
  });
}

// src/_utils/collectFiles.ts
function collectFiles(pattern, { srcDir, exclude, outDir }) {
  exclude = exclude ? Array.isArray(exclude) ? exclude : [exclude] : [];
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

// src/_utils/loadFile.ts
var YAML2 = __toESM(require("js-yaml"));

// src/_utils/readFileAsJson.ts
var YAML3 = __toESM(require("js-yaml"));
var import_path4 = __toESM(require("path"));
async function readFileAsJson(filePath) {
  const { ext } = import_path4.default.posix.parse(filePath);
  const data = ext === ".json" ? JSON.parse(await readFile(filePath)) : YAML3.load(await readFile(filePath));
  return JSON.stringify(data, null, 2);
}

// src/assets/build.ts
function build(resolvedOptions) {
  let resolvedConfig;
  let srcDir;
  let outDir;
  return {
    name: "foundryvtt:assets:build",
    apply: "build",
    configResolved(config2) {
      resolvedConfig = config2;
      srcDir = resolvedConfig.root;
      outDir = import_path5.default.resolve(resolvedConfig.root, resolvedConfig.build.outDir);
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
var import_path6 = __toESM(require("path"));
var import_picocolors2 = __toESM(require("picocolors"));

// src/assets/_utils.ts
var crypto = __toESM(require("crypto"));
var fs4 = __toESM(require("fs"));
var import_mrmime = require("mrmime");
var path6 = __toESM(require("path"));
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
      if (path6.extname(file.originalFileName) === ".yaml" || path6.extname(file.originalFileName) === ".yml") {
        const source = replaceVariables(await readFileAsJson(file.originalFileName));
        return sendTransform(req, res, source);
      }
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
function serve(resolvedOptions) {
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
      outDir = import_path6.default.resolve(resolvedConfig.root, resolvedConfig.build.outDir);
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
      const log = (msg, path14) => {
        logger.info(import_picocolors2.default.green(msg + ": ") + import_picocolors2.default.dim(path14), {
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
      const originalFileName = import_path6.default.normalize(id);
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
function assets(resolvedOptions) {
  return [build(resolvedOptions), serve(resolvedOptions)];
}

// src/config/index.ts
var import_path7 = __toESM(require("path"));
function config(resolvedOptions) {
  return {
    name: "foundryvtt:config",
    config(config2, _env) {
      config2.root ??= import_path7.default.dirname(resolvedOptions.manifestPath);
      config2.publicDir ??= "../public";
      config2.build ??= {};
      config2.build.rolldownOptions ??= {};
      if (config2.build.rolldownOptions.input) {
        if (typeof config2.build.rolldownOptions.input === "string") {
          const original = config2.build.rolldownOptions.input;
          config2.build.rolldownOptions.input = {};
          const { name } = import_path7.default.posix.parse(original);
          config2.build.rolldownOptions.input[name] = original;
        } else if (Array.isArray(config2.build.rolldownOptions.input)) {
          const original = config2.build.rolldownOptions.input;
          config2.build.rolldownOptions.input = {};
          for (const item of original) {
            const { name } = import_path7.default.posix.parse(item);
            config2.build.rolldownOptions.input[name] = item;
          }
        }
      }
      const input = Object.entries(resolvedOptions.entries).reduce(
        (acc, [originalFileName, fileName]) => {
          const { dir, name: baseName, ext } = import_path7.default.posix.parse(fileName);
          if (ext !== ".css") {
            const name = import_path7.default.posix.join(dir, baseName);
            acc[name] = originalFileName;
          }
          return acc;
        },
        {}
      );
      config2.build.rolldownOptions.input = {
        ...config2.build.rolldownOptions.input,
        ...input
      };
      for (const key of Object.keys(resolvedOptions.entries)) {
        const kv = Object.entries(config2.build.rolldownOptions.input).find(([_, value]) => value === key);
        if (kv) {
          resolvedOptions.entries[key] = kv[0] + import_path7.default.extname(resolvedOptions.entries[key]);
        }
      }
      config2.build.rolldownOptions.output ??= [];
      if (!Array.isArray(config2.build.rolldownOptions.output)) {
        const original = config2.build.rolldownOptions.output;
        config2.build.rolldownOptions.output = [];
        config2.build.rolldownOptions.output.push(original);
      }
      config2.build.rolldownOptions.output.push({
        format: "esm",
        preserveModules: true,
        assetFileNames: (chunkInfo) => {
          if (chunkInfo.name) {
            const { dir } = import_path7.default.posix.parse(chunkInfo.originalFileName ?? chunkInfo.name);
            return import_path7.default.posix.join(dir, "[name][extname]");
          }
          return "[name][extname]";
        },
        entryFileNames: (chunkInfo) => {
          return resolvedOptions.scriptFileNames(chunkInfo.name);
        },
        cssEntryFileNames: (chunkInfo) => {
          return resolvedOptions.styleFileNames(chunkInfo.name);
        }
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
var import_path8 = __toESM(require("path"));
function entryScripts(resolvedOptions) {
  let resolvedConfig;
  let outDir;
  return {
    name: "foundryvtt:create-entry-script:serve",
    apply: "serve",
    configResolved(_config) {
      resolvedConfig = _config;
      outDir = import_path8.default.resolve(resolvedConfig.root, resolvedConfig.build.outDir);
    },
    buildStart: async () => {
      const message = "This file is for a running vite dev server and is not copied to a build";
      for (const [originalFileName, outputFileName] of Object.entries(resolvedOptions.entries)) {
        const { dir, ext } = import_path8.default.posix.parse(outputFileName);
        const output = import_path8.default.resolve(outDir, outputFileName);
        const relativeFileName = import_path8.default.posix.relative(dir, originalFileName);
        if (dir) await import_fs_extra5.default.ensureDir(dir);
        console.log(`[DEBUG] Creating dev server entry script: ${output}`);
        if (ext === ".css") {
          await import_fs_extra5.default.writeFile(output, `/* ${message} */
`);
        } else {
          await import_fs_extra5.default.writeFile(output, `/* ${message} */
import './${relativeFileName}';
`);
        }
      }
    },
    buildEnd: async () => {
      await import_fs_extra5.default.remove(import_path8.default.resolve(outDir, "index.mjs"));
    }
  };
}

// src/manifest/build.ts
var import_path10 = __toESM(require("path"));
var import_picocolors3 = __toESM(require("picocolors"));

// src/manifest/_utils.ts
var import_path9 = __toESM(require("path"));
async function resolveOptions(options, manifestInfo) {
  const resolvedOptions = { ...options };
  resolvedOptions.manifestInfo = manifestInfo;
  const manifest2 = await manifestInfo.manifest();
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
  options.variables = options.variables || {};
  options.variables["ID"] = manifest2.id;
  options.variables["VERSION"] = manifest2.version;
  options.variables["TITLE"] = manifest2.title;
  const variables = options.variables;
  delete options.variables;
  resolvedOptions.replace = (source) => {
    for (const [variable, value] of Object.entries(variables)) {
      source = source.replaceAll(`$${variable}$`, value);
    }
    return source;
  };
  resolvedOptions.scriptFileNames = (name) => {
    return `${name}.mjs`;
  };
  resolvedOptions.styleFileNames = (name) => {
    return `${name}.css`;
  };
  const esmodules = (manifest2.esmodules ?? []).reduce(
    (acc, originalFileName) => {
      const { dir, name } = import_path9.default.posix.parse(originalFileName);
      const name2 = import_path9.default.posix.join(dir, name);
      acc[originalFileName] = resolvedOptions.scriptFileNames(name2);
      return acc;
    },
    {}
  );
  const scripts = (manifest2.scripts ?? []).reduce(
    (acc, originalFileName) => {
      const { dir, name } = import_path9.default.posix.parse(originalFileName);
      const name2 = import_path9.default.posix.join(dir, name);
      acc[originalFileName] = resolvedOptions.scriptFileNames(name2);
      return acc;
    },
    {}
  );
  const styles = (manifest2.styles ?? []).reduce(
    (acc, originalFileName) => {
      const { dir, name } = import_path9.default.posix.parse(originalFileName);
      const name2 = import_path9.default.posix.join(dir, name);
      acc[originalFileName] = resolvedOptions.styleFileNames(name2);
      return acc;
    },
    {}
  );
  resolvedOptions.entries = { ...esmodules, ...scripts, ...styles };
  return resolvedOptions;
}
function resolveManifest(manifest2, config2) {
  const resolvedManifest = { ...manifest2 };
  const scriptFileNames = createFunction(config2.build?.rolldownOptions?.output, "entryFileNames") ?? createFunction(config2.build?.rolldownOptions?.output, "chunkFileNames") ?? ((name, extname2) => `${name}${extname2}`);
  const styleFileNames = createFunction(config2.build?.rolldownOptions?.output, "cssEntryFileNames") ?? createFunction(config2.build?.rolldownOptions?.output, "cssChunkFileNames") ?? createFunction(config2.build?.rolldownOptions?.output, "chunkFileNames") ?? ((name, extname2) => `${name}${extname2}`);
  resolvedManifest.esmodules = manifest2.esmodules.map((fileName) => {
    fileName = useInputName(fileName, config2);
    const { dir, name, ext } = import_path9.default.parse(fileName);
    fileName = import_path9.default.posix.join(dir, scriptFileNames(name, ext));
    if (fileName.endsWith(".ts")) {
      return fileName.replace(/\.ts$/, ".js");
    }
    return fileName;
  });
  resolvedManifest.scripts = manifest2.scripts.map((fileName) => {
    fileName = useInputName(fileName, config2);
    const { dir, name, ext } = import_path9.default.parse(fileName);
    fileName = import_path9.default.posix.join(dir, scriptFileNames(name, ext));
    if (fileName.endsWith(".ts")) {
      return fileName.replace(/\.ts$/, ".js");
    }
    return fileName;
  });
  resolvedManifest.styles = manifest2.styles.map((fileName) => {
    fileName = useInputName(fileName, config2);
    const { dir, name, ext } = import_path9.default.parse(fileName);
    fileName = import_path9.default.posix.join(dir, styleFileNames(name, ext));
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
    const { ext } = import_path9.default.parse(fileName);
    return name ? name + ext : fileName;
  }
  return fileName;
}
function createFunction(output, key) {
  if (!output) return (name, extname2) => `${name}${extname2}`;
  const config2 = Array.isArray(output) ? output.find((o) => key in o)?.[key] : output[key];
  if (!config2) return void 0;
  if (typeof config2 === "string") {
    return (name, extname2) => {
      return config2.replace("[name]", name).replace("[extname]", extname2);
    };
  }
  if (typeof config2 === "function") {
    return (name, _extname) => {
      return config2({ name });
    };
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
function build2(resolvedOptions) {
  let manifest2;
  return {
    name: "foundryvtt:manifest:build",
    apply: "build",
    async configResolved(resolvedConfig) {
      resolvedConfig.logger.info(import_picocolors3.default.white("Using manifest: ") + import_picocolors3.default.green(resolvedOptions.manifestInfo.path));
      manifest2 = resolveManifest(await resolvedOptions.manifestInfo.manifest(), resolvedConfig);
    },
    async generateBundle() {
      const manifestPath = resolvedOptions.manifestInfo.path;
      const manifestSource = JSON.stringify(manifest2, null, 2);
      const { name } = import_path10.default.parse(manifestPath);
      this.emitFile({
        type: "asset",
        name,
        fileName: `${name}.json`,
        originalFileName: manifestPath,
        source: manifestSource
      });
    }
  };
}

// src/manifest/serve.ts
var import_fs_extra6 = __toESM(require("fs-extra"));
var import_path11 = __toESM(require("path"));
var import_picocolors4 = __toESM(require("picocolors"));
function serve2(resolvedOptions) {
  let outDir;
  return {
    name: "foundryvtt:manifest:serve",
    apply: "serve",
    configResolved(resolvedConfig) {
      const srcDir = resolvedConfig.root;
      outDir = import_path11.default.resolve(srcDir, resolvedConfig.build.outDir);
      resolvedConfig.logger.info(import_picocolors4.default.white("Using manifest: ") + import_picocolors4.default.green(resolvedOptions.manifestPath));
    },
    configureServer: async () => {
      const manifestSource = JSON.stringify(resolvedOptions.manifest, null, 2);
      const { name } = import_path11.default.parse(resolvedOptions.manifestPath);
      await import_fs_extra6.default.ensureDir(outDir);
      await import_fs_extra6.default.writeFile(import_path11.default.resolve(outDir, `${name}.json`), manifestSource);
    }
  };
}

// src/manifest/index.ts
function manifest(resolvedOptions) {
  return [build2(resolvedOptions), serve2(resolvedOptions)];
}

// src/index.ts
var import_utils3 = __toESM(require_dist());
var import_path12 = __toESM(require("path"));
var foundryvtt = async (options = {}) => {
  const rootPath = options.manifestPath ? (await import_fs_extra7.default.stat(options.manifestPath)).isDirectory() ? options.manifestPath : import_path12.default.dirname(options.manifestPath) : process.cwd();
  const manifestInfo = await (0, import_utils3.findManifest)(rootPath);
  if (!manifestInfo) throw new Error("Could not find (system|module).(json|yaml|yml) manifest file.");
  const resolvedOptions = await resolveOptions(options, manifestInfo);
  return [manifest(resolvedOptions), config(resolvedOptions), entryScripts(resolvedOptions), assets(resolvedOptions)];
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  foundryvtt
});
/*! Bundled license information:

@foundryvtt/utils/dist/index.js:
  (*! Bundled license information:

  js-yaml/dist/js-yaml.mjs:
    (*! js-yaml 4.1.0 https://github.com/nodeca/js-yaml @license MIT *)
  *)
*/
