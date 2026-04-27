export const generateAPIUrl = (relativePath?: string) => {
  if (!process.env.EXPO_PUBLIC_API_BASE_URL) {
    throw new Error(
      'EXPO_PUBLIC_API_BASE_URL environment variable is not defined',
    )
  }

  if (!relativePath) {
    return process.env.EXPO_PUBLIC_API_BASE_URL
  }

  const path = relativePath.startsWith('/') ? relativePath : `/${relativePath}`
  return process.env.EXPO_PUBLIC_API_BASE_URL.concat(path)
}
