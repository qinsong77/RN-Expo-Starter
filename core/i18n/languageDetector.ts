import * as Localization from 'expo-localization'

import { LanguageDetectorModule } from 'i18next'

export const languageDetector: LanguageDetectorModule = {
  type: 'languageDetector',
  detect: () => {
    const locales = Localization.getLocales()
    return locales[0]?.languageCode ?? 'en'
  },
  init: () => {},
  cacheUserLanguage: () => {},
}
