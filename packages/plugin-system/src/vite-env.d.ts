// / <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_NOCTO_SHOW_SLOTS: "true" | "false"
}

interface ImportMeta {
  readonly env: ImportMetaEnv
  readonly hot: {
    accept: () => void
  }
}

declare const __NOCTO_SHOW_SLOTS__: string | undefined