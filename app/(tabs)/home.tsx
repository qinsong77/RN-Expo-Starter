import { cn } from '@/lib/utils'
import { useLingui } from '@lingui/react'
import { Trans } from '@lingui/react/macro'
import {
  Globe,
  Layers,
  LayoutGrid,
  Palette,
  ShieldCheck,
  Zap,
} from 'lucide-react-native'
import { Pressable, ScrollView, View } from 'react-native'
import { Uniwind, useUniwind } from 'uniwind'

import { Text } from '@/components/ui/text'

import { useThemeColors } from '@/hooks/use-theme-colors'

import { type SupportedLocale, changeLanguage } from '@/core/i18n/lingui'

type ThemeOption = 'system' | 'light' | 'dark'

const FEATURES = [
  { icon: Layers, label: 'Expo 55', desc: 'Latest SDK, React 19' },
  { icon: ShieldCheck, label: 'Better Auth', desc: 'Sign in, sign up, guest' },
  { icon: Globe, label: 'Lingui i18n', desc: 'EN & 中文' },
  { icon: Zap, label: 'Hono RPC', desc: 'Type-safe API + React Query' },
  { icon: Palette, label: 'Uniwind', desc: 'Tailwind for React Native' },
  { icon: LayoutGrid, label: 'shadcn/ui', desc: 'react-native-reusables' },
] as const

const LANG_OPTIONS: { value: SupportedLocale; label: string }[] = [
  { value: 'en', label: 'English' },
  { value: 'zh', label: '中文' },
]

const THEME_OPTIONS: { value: ThemeOption; label: string }[] = [
  { value: 'system', label: 'Auto' },
  { value: 'light', label: 'Light' },
  { value: 'dark', label: 'Dark' },
]

export default function HomeScreen() {
  const { i18n } = useLingui()
  const { theme, hasAdaptiveThemes } = useUniwind()
  const colors = useThemeColors()

  const currentLang = i18n.locale as SupportedLocale
  const currentTheme: ThemeOption = hasAdaptiveThemes
    ? 'system'
    : (theme as 'light' | 'dark')

  return (
    <View className="flex-1 pt-safe">
      <ScrollView showsVerticalScrollIndicator={false}>
        <View className="gap-8 p-5 pt-4">
          {/* Header */}
          <View className="gap-1">
            <Text className="text-3xl font-bold tracking-tight">
              RN Expo Starter
            </Text>
            <Text variant="muted">
              <Trans>Production-ready React Native template</Trans>
            </Text>
          </View>

          {/* Language */}
          <View className="gap-3">
            <Text className="text-xs font-semibold tracking-widest text-muted-foreground uppercase">
              <Trans>Language</Trans>
            </Text>
            <View className="flex-row gap-2">
              {LANG_OPTIONS.map(({ value, label }) => {
                const active = currentLang === value
                return (
                  <Pressable
                    key={value}
                    onPress={() => changeLanguage(value)}
                    className={cn(
                      'flex-1 items-center rounded-xl py-3 active:opacity-75',
                      active ? 'bg-primary' : 'bg-secondary',
                    )}
                  >
                    <Text
                      className={cn(
                        'font-semibold',
                        active
                          ? 'text-primary-foreground'
                          : 'text-secondary-foreground',
                      )}
                    >
                      {label}
                    </Text>
                  </Pressable>
                )
              })}
            </View>
          </View>

          {/* Theme */}
          <View className="gap-3">
            <Text className="text-xs font-semibold tracking-widest text-muted-foreground uppercase">
              <Trans>Appearance</Trans>
            </Text>
            <View className="flex-row gap-2">
              {THEME_OPTIONS.map(({ value, label }) => {
                const active = currentTheme === value
                return (
                  <Pressable
                    key={value}
                    onPress={() => {
                      // @ts-ignore
                      Uniwind.setTheme(value)
                    }}
                    className={cn(
                      'flex-1 items-center rounded-xl py-3 active:opacity-75',
                      active ? 'bg-primary' : 'bg-secondary',
                    )}
                  >
                    <Text
                      className={cn(
                        'text-sm font-semibold',
                        active
                          ? 'text-primary-foreground'
                          : 'text-secondary-foreground',
                      )}
                    >
                      {label}
                    </Text>
                  </Pressable>
                )
              })}
            </View>
          </View>

          {/* Stack */}
          <View className="gap-3">
            <Text className="text-xs font-semibold tracking-widest text-muted-foreground uppercase">
              <Trans>Stack</Trans>
            </Text>
            <View className="gap-3">
              {Array.from(
                { length: Math.ceil(FEATURES.length / 2) },
                (_, row) => (
                  <View
                    key={row}
                    className="flex-row gap-3"
                  >
                    {FEATURES.slice(row * 2, row * 2 + 2).map(
                      ({ icon: Icon, label, desc }) => (
                        <View
                          key={label}
                          className="flex-1 gap-2 rounded-2xl border border-border bg-card p-4"
                        >
                          <Icon
                            size={20}
                            color={colors.primary}
                          />
                          <Text className="text-sm font-semibold">{label}</Text>
                          <Text
                            variant="muted"
                            className="text-xs"
                          >
                            {desc}
                          </Text>
                        </View>
                      ),
                    )}
                  </View>
                ),
              )}
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  )
}
