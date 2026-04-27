import { consoleTransport, logger } from 'react-native-logs'

/**
 * App-wide logger. In production release builds, minimum level is `info` (debug is hidden).
 * Use `createLog(namespace)` for module-scoped labels in the console.
 */
const rootLog = logger.createLogger({
  levels: {
    debug: 0,
    info: 1,
    warn: 2,
    error: 3,
  },
  severity: __DEV__ ? 'debug' : 'info',
  transport: consoleTransport,
  transportOptions: {
    colors: {
      debug: 'grey',
      info: 'blueBright',
      warn: 'yellowBright',
      error: 'redBright',
    },
  },
  dateFormat: 'time',
  printLevel: true,
  printDate: true,
})

export const log = rootLog

export function createLog(extension: string) {
  return rootLog.extend(extension)
}
