// refer: https://www.i18next.com/overview/typescript
// import the original type declarations
// import all namespaces (for the default language, only)
import en from './en.json'
import zh from './zh.json'

import 'i18next'

declare module 'i18next' {
  // Extend CustomTypeOptions
  interface CustomTypeOptions {
    // custom namespace type, if you changed it
    defaultNS: 'zh'
    // custom resources type
    resources: {
      en: typeof en
      zh: typeof zh
    }
    // other
  }
}
