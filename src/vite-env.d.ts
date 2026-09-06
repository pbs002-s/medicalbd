/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** Base URL of the REST backend. Unset means offline-first local storage only. */
  readonly VITE_API_URL?: string;
  /** Server-sent events endpoint broadcasting live chamber queue changes. */
  readonly VITE_QUEUE_SSE_URL?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
