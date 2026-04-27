import { i18n } from '@lingui/core'
import { I18nProvider } from '@lingui/react'
import { getLocales } from 'expo-localization'
import type { ReactNode } from 'react'

import { createLog } from '@/core/logger'

const log = createLog('i18n')

// Don't remove -force from these because detection is VERY slow on low-end Android.
// https://github.com/formatjs/formatjs/issues/4463#issuecomment-2176070577
// import '@formatjs/intl-locale/polyfill-force'
// import '@formatjs/intl-pluralrules/polyfill-force'
// import '@formatjs/intl-numberformat/polyfill-force'
// import '@formatjs/intl-pluralrules/locale-data/en'
// import '@formatjs/intl-numberformat/locale-data/en'

// supported locales type
export type SupportedLocale = 'en' | 'zh'

// supported locales array
export const SUPPORTED_LOCALES: SupportedLocale[] = ['en', 'zh']

// Synchronously activate a default locale to prevent race condition errors
// This ensures i18n has a locale before any translation functions are called
// The real locale will be loaded asynchronously later
i18n.loadAndActivate({ locale: 'en', messages: {} })

// locale messages mapping
const localeMessages: Record<SupportedLocale, () => Promise<any>> = {
  en: () => import('../../locales/en/messages'),
  zh: () => import('../../locales/zh/messages'),
}

// dynamically activate locale messages
export async function dynamicActivate(locale: SupportedLocale) {
  let finalLocale = locale
  try {
    // check if locale is supported
    if (!SUPPORTED_LOCALES.includes(locale)) {
      log.warn(`Unsupported locale: ${locale}, falling back to 'en'`)
      finalLocale = 'en'
    }

    // dynamically import corresponding messages package
    const messagesModule = await localeMessages[finalLocale]()
    const messages = messagesModule.messages || messagesModule.default?.messages

    if (!messages) {
      throw new Error(`Messages not found for locale: ${finalLocale}`)
    }

    // dynamically import corresponding plural rules and number format data
    switch (finalLocale) {
      case 'en': {
        i18n.loadAndActivate({ locale: finalLocale, messages })
        // await Promise.all([
        //   import('@formatjs/intl-pluralrules/locale-data/en'),
        //   import('@formatjs/intl-numberformat/locale-data/en'),
        // ])
        break
      }
      case 'zh': {
        i18n.loadAndActivate({ locale: finalLocale, messages })
        // await Promise.all([
        //   import('@formatjs/intl-pluralrules/locale-data/zh'),
        //   import('@formatjs/intl-numberformat/locale-data/zh'),
        // ])
        break
      }
      default: {
        i18n.loadAndActivate({ locale: finalLocale, messages })
        break
      }
    }

    // set HTML lang attribute (if in Web environment)
    if (typeof document !== 'undefined') {
      document.documentElement.lang = finalLocale
    }

    log.info(`Successfully activated locale: ${finalLocale}`)
  } catch (error) {
    log.error(`Failed to activate locale ${finalLocale}:`, error)
    // fallback to English
    try {
      const fallbackMessages = await localeMessages.en()
      const fallbackMessagesData =
        fallbackMessages.messages || fallbackMessages.default?.messages
      i18n.load('en', fallbackMessagesData)
      i18n.activate('en')
    } catch (fallbackError) {
      log.error('Failed to fallback to English:', fallbackError)
    }
  }
}

// initialize Lingui
export async function initLingui() {
  const locale = getLocales()[0].languageCode as SupportedLocale // get language code, like 'en', 'zh'

  // set default language
  const defaultLocale: SupportedLocale = 'en'

  // if the detected language is not supported, use default language
  const finalLocale: SupportedLocale =
    locale && SUPPORTED_LOCALES.includes(locale) ? locale : defaultLocale

  // use dynamicActivate to load locale messages
  await dynamicActivate(finalLocale)
}

// switch language (use dynamicActivate)
export function changeLanguage(locale: SupportedLocale) {
  return dynamicActivate(locale)
}

// get supported locales list
export function getSupportedLocales(): SupportedLocale[] {
  return SUPPORTED_LOCALES
}

// check if locale is supported
export function isLocaleSupported(locale: string): locale is SupportedLocale {
  return SUPPORTED_LOCALES.includes(locale as SupportedLocale)
}

// Lingui Provider component
export function LinguiProvider({ children }: { children: ReactNode }) {
  return <I18nProvider i18n={i18n}>{children}</I18nProvider>
}
