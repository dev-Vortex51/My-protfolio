/// <reference types="vite/client" />

// Optional: augment if you want stronger typing for your env vars
interface ImportMetaEnv {
  readonly VITE_API_URL?: string;
}
interface ImportMeta {
  readonly env: ImportMetaEnv;
}
