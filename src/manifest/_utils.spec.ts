import path from "path"
import * as Vite from "vite"
import { describe, expect, it } from "vitest"
import { Manifest } from "../_types"
import { resolveManifest } from "./_utils"

describe("A Foundry VTT manifest", () => {
  const emptyViteConfig: Vite.UserConfig = {}

  const testModule: Manifest = {
    id: "test-module",
    title: "Test Module",
    description: "A test module",
    version: "1.0.0",
    esmodules: [],
    styles: [],
    scripts: [],
    languages: [],
  }

  describe("Resolve esmodules files", () => {
    const module: Manifest = { ...testModule, esmodules: ["module/index.ts"] }

    describe("when esmodules contains a typescript module", () => {
      const resolvedManifest = resolveManifest(module, emptyViteConfig)

      it("should return a javascript module", () => {
        expect(resolvedManifest.esmodules).toEqual(["module/index.js"])
      })
    })

    describe("when Vite config input has alias for a esmodule", () => {
      const viteConfig: Vite.UserConfig = {
        build: {
          rolldownOptions: {
            input: {
              wiz: "module/index.ts",
            },
          },
        },
      }
      const resolvedManifest = resolveManifest(module, viteConfig)

      it("should return the valid name", () => {
        expect(resolvedManifest.esmodules).toEqual(["wiz.js"])
      })
    })

    describe("when Vite config output has entryFileNames with [name] and [extname]", () => {
      const viteConfig: Vite.UserConfig = {
        build: {
          rolldownOptions: {
            output: {
              entryFileNames: "[name].esm[extname]",
            },
          },
        },
      }
      const resolvedManifest = resolveManifest(module, viteConfig)

      it("should return the valid name", () => {
        expect(resolvedManifest.esmodules).toEqual(["module/index.esm.js"])
      })
    })

    describe("when Vite config output has entryFileNames with function", () => {
      const viteConfig: Vite.UserConfig = {
        build: {
          rolldownOptions: {
            output: {
              entryFileNames: (chunkInfo) => chunkInfo.name + ".esm.js",
            },
          },
        },
      }
      const resolvedManifest = resolveManifest(module, viteConfig)

      it("should return the valid name", () => {
        expect(resolvedManifest.esmodules).toEqual(["module/index.esm.js"])
      })
    })
  })

  describe("Resolve scripts files", () => {
    const module: Manifest = { ...testModule, scripts: ["script-a/index.ts"] }

    describe("when script contains a typescript module", () => {
      const resolvedManifest = resolveManifest(module, emptyViteConfig)

      it("should return a javascript module", () => {
        expect(resolvedManifest.scripts).toEqual(["script-a/index.js"])
      })
    })

    describe("when Vite config input has alias for a script", () => {
      const viteConfig: Vite.UserConfig = {
        build: {
          rolldownOptions: {
            input: {
              "script-a": "script-a/index.ts",
            },
          },
        },
      }
      const resolvedManifest = resolveManifest(module, viteConfig)

      it("should return the valid name", () => {
        expect(resolvedManifest.scripts).toEqual(["script-a.js"])
      })
    })

    describe("when Vite config output has entryFileNames with [name] and [extname]", () => {
      const viteConfig: Vite.UserConfig = {
        build: {
          rolldownOptions: {
            output: {
              entryFileNames: "[name].esm[extname]",
            },
          },
        },
      }
      const resolvedManifest = resolveManifest(module, viteConfig)

      it("should return the valid name", () => {
        expect(resolvedManifest.scripts).toEqual(["script-a/index.esm.js"])
      })
    })

    describe("when Vite config output has entryFileNames with function", () => {
      const viteConfig: Vite.UserConfig = {
        build: {
          rolldownOptions: {
            output: {
              entryFileNames: (chunkInfo) => chunkInfo.name + ".esm2.js",
            },
          },
        },
      }
      const resolvedManifest = resolveManifest(module, viteConfig)

      it("should return the valid name", () => {
        expect(resolvedManifest.scripts).toEqual(["script-a/index.esm2.js"])
      })
    })
  })

  describe.each([
    { type: "SCSS", input: "a/styles.scss" },
    { type: "SASS", input: "b/styles.sass" },
    { type: "LESS", input: "c/styles.less" },
  ])("Resolve $type styles files", ({ input }) => {
    const module: Manifest = { ...testModule, styles: [input] }

    describe("when styles contains a file", () => {
      const resolvedManifest = resolveManifest(module, emptyViteConfig)

      it("should return the valid name", () => {
        const { dir } = path.parse(input)
        const expected = path.posix.join(dir, "styles.css")
        expect(resolvedManifest.styles).toEqual([expected])
      })
    })

    describe("when Vite config input has alias for a style", () => {
      const viteConfig: Vite.UserConfig = {
        build: {
          rolldownOptions: {
            input: {
              styles: "foo-bar.scss",
            },
          },
        },
      }
      const resolvedManifest = resolveManifest(module, viteConfig)

      it("should return the valid name", () => {
        const { dir } = path.parse(input)
        const expected = path.posix.join(dir, "styles.css")
        expect(resolvedManifest.styles).toEqual([expected])
      })
    })

    describe("when Vite config output has cssEntryFileNames with [name] and [extname]", () => {
      const viteConfig: Vite.UserConfig = {
        build: {
          rolldownOptions: {
            output: {
              cssEntryFileNames: "[name].1[extname]",
            },
          },
        },
      }
      const resolvedManifest = resolveManifest(module, viteConfig)

      it("should return the valid name", () => {
        const { dir, name } = path.parse(input)
        const expected = path.posix.join(dir, name) + ".1.css"
        expect(resolvedManifest.styles).toEqual([expected])
      })
    })

    describe("when Vite config output has cssEntryFileNames with function", () => {
      const viteConfig: Vite.UserConfig = {
        build: {
          rolldownOptions: {
            output: {
              cssEntryFileNames: (chunkInfo) => chunkInfo.name + ".2.css",
            },
          },
        },
      }
      const resolvedManifest = resolveManifest(module, viteConfig)

      it("should return the valid name", () => {
        const { dir, name } = path.parse(input)
        const expected = path.posix.join(dir, name) + ".2.css"
        expect(resolvedManifest.styles).toEqual([expected])
      })
    })

    describe("when Vite config output has chunkFileNames with [name] and [extname]", () => {
      const viteConfig: Vite.UserConfig = {
        build: {
          rolldownOptions: {
            output: {
              chunkFileNames: "[name].1[extname]",
            },
          },
        },
      }
      const resolvedManifest = resolveManifest(module, viteConfig)

      it("should return the valid name", () => {
        const { dir, name } = path.parse(input)
        const expected = path.posix.join(dir, name) + ".1.css"
        expect(resolvedManifest.styles).toEqual([expected])
      })
    })

    describe("when Vite config output has chunkFileNames with function", () => {
      const viteConfig: Vite.UserConfig = {
        build: {
          rolldownOptions: {
            output: {
              chunkFileNames: (chunkInfo) => chunkInfo.name + ".3.css",
            },
          },
        },
      }
      const resolvedManifest = resolveManifest(module, viteConfig)

      it("should return the valid name", () => {
        const { dir, name } = path.parse(input)
        const expected = path.posix.join(dir, name) + ".3.css"
        expect(resolvedManifest.styles).toEqual([expected])
      })
    })
  })

  describe("Resolve languages", () => {
    const module: Manifest = { ...testModule, languages: [{ lang: "en", name: "English", path: "lang/en.json" }] }

    describe("when language is defined with JSON file", () => {
      const resolvedManifest = resolveManifest(module, emptyViteConfig)

      it("should be empty", () => {
        expect(resolvedManifest.languages[0].path).toEqual("lang/en.json")
      })
    })

    describe("when language is defined with YML file", () => {
      const resolvedManifest = resolveManifest(module, emptyViteConfig)

      it("should be empty", () => {
        expect(resolvedManifest.languages[0].path).toEqual("lang/en.json")
      })
    })

    describe("when language is defined with YAML file", () => {
      const resolvedManifest = resolveManifest(module, emptyViteConfig)

      it("should be empty", () => {
        expect(resolvedManifest.languages[0].path).toEqual("lang/en.json")
      })
    })
  })
})
