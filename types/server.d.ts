// Ambient type stubs for the backend project referenced via @server/* path alias.
// These declarations satisfy the TypeScript compiler when type-checking this RN
// project; they are NOT used at runtime.

declare module 'cloudflare:workers' {
  const env: Record<string, string>
  export { env }
}

interface Env extends Record<string, string> {}
