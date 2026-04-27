import type { LinguiConfig } from '@lingui/conf'
import { formatter } from '@lingui/format-po'

const config: LinguiConfig = {
  sourceLocale: 'en',
  locales: ['zh', 'en', 'pt', 'ko'],
  catalogs: [
    {
      path: 'locales/{locale}/messages',
      include: ['app', 'components', 'features'],
    },
  ],
  // Default value: po
  format: formatter({ lineNumbers: false }),
}

export default config
