/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_APP_CRYPTO_KEY: string;
  readonly VITE_APP_CRYPTO_IV: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
