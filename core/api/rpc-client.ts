import type { AppClientType } from '@server/index'
import { type FetchRequestInit, type FetchRequestLike, fetch } from 'expo/fetch'
import { hc } from 'hono/client'

import { authClient } from '@/core/auth'
import { createLog } from '@/core/logger'

import { generateAPIUrl } from '../utils/generate-api-url'

const log = createLog('rpc')

const PUBLIC_ENDPOINTS = [] as const

const ENDPOINT_URL = generateAPIUrl()

// Pre-calculate the RPC client type at compile time to avoid repeated type
// instantiation in the IDE (see https://hono.dev/docs/guides/rpc#compile-your-code-before-using-it-recommended)
type RpcClient = ReturnType<typeof hc<AppClientType>>

type AnyFetchInput = RequestInfo | URL | FetchRequestLike

function getInputUrl(input: AnyFetchInput) {
  if (input instanceof URL) return input.toString()
  if (input instanceof Request) return input.url
  if (typeof input === 'string') return input
  return input.url
}

function isPublicEndpoint(input: AnyFetchInput) {
  const parseUrl = new URL(getInputUrl(input))
  const pathName = parseUrl.pathname
  const normalizedPath = pathName.replace(new URL(ENDPOINT_URL).pathname, '')
  return PUBLIC_ENDPOINTS.some((endpoint) => normalizedPath === endpoint)
}

export const authenticatedFetch: typeof fetch = async (
  input: AnyFetchInput,
  init?: FetchRequestInit,
) => {
  try {
    // https://www.better-auth.com/docs/integrations/expo#making-authenticated-requests-to-your-server
    const cookies = authClient.getCookie()
    const headers = new Headers(init?.headers ?? {})
    if (cookies) {
      headers.set('Cookie', cookies)
    }
    return await fetch(getInputUrl(input), {
      ...init,
      headers,
    })
  } catch (error) {
    log.error('Failed to make request:', error)
    throw error
  }
}

async function rpcFetch(
  input: AnyFetchInput,
  init?: FetchRequestInit,
): Promise<Response> {
  try {
    if (isPublicEndpoint(input)) {
      return await fetch(getInputUrl(input), init)
    }
    return await authenticatedFetch(getInputUrl(input), init)
  } catch (error) {
    log.error('Failed to make RPC request:', error)
    throw error
  }
}

export const rpcClient: RpcClient = hc<AppClientType>(ENDPOINT_URL, {
  fetch: rpcFetch as typeof globalThis.fetch,
})
