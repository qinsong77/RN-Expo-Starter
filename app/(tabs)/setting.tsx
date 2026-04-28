import { cn } from '@/lib/utils'
import { useLingui } from '@lingui/react'
import { Trans } from '@lingui/react/macro'
import { router } from 'expo-router'
import { LogOut, MoonStar, Smartphone, Sun } from 'lucide-react-native'
import { Pressable, ScrollView, View } from 'react-native'
import { Uniwind, useUniwind } from 'uniwind'

import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { Text } from '@/components/ui/text'

import { useThemeColors } from '@/hooks/use-theme-colors'

import { authClient, useAuth } from '@/core/auth'
import { type SupportedLocale, changeLanguage } from '@/core/i18n/lingui'
import { createLog } from '@/core/logger'

const log = createLog('settings')

type ThemeOption = 'system' | 'light' | 'dark'

const LANG_OPTIONS: { value: SupportedLocale; label: string }[] = [
  { value: 'en', label: 'English' },
  { value: 'zh', label: '中文' },
]

const THEME_OPTIONS: { value: ThemeOption; label: string; icon: typeof Sun }[] =
  [
    { value: 'system', label: 'Auto', icon: Smartphone },
    { value: 'light', label: 'Light', icon: Sun },
    { value: 'dark', label: 'Dark', icon: MoonStar },
  ]

export default function SettingScreen() {
  const { session, isAnonymous } = useAuth()
  const { i18n } = useLingui()
  const { theme, hasAdaptiveThemes } = useUniwind()
  const colors = useThemeColors()
  const user = session?.user

  const currentLang = i18n.locale as SupportedLocale
  const currentTheme: ThemeOption = hasAdaptiveThemes
    ? 'system'
    : (theme as 'light' | 'dark')

  const initials = user?.name
    ? user.name
        .split(' ')
        .map((n) => n[0])
        .join('')
        .toUpperCase()
        .slice(0, 2)
    : '?'

  return (
    <View className="flex-1 pt-safe">
      <ScrollView showsVerticalScrollIndicator={false}>
        <View className="gap-7 p-5 pt-4">
          <Text className="text-3xl font-bold tracking-tight">
            <Trans>Settings</Trans>
          </Text>

          {/* Profile */}
          <View className="flex-row items-center gap-4 rounded-2xl border border-border bg-card p-4">
            <View className="h-14 w-14 items-center justify-center rounded-full bg-primary">
              <Text className="text-lg font-bold text-primary-foreground">
                {initials}
              </Text>
            </View>
            <View className="flex-1 gap-1">
              <Text className="font-semibold">{user?.name ?? '—'}</Text>
              <Text
                variant="muted"
                className="text-sm"
              >
                {user?.email ?? '—'}
              </Text>
              {isAnonymous && (
                <View className="mt-1 self-start rounded-full bg-secondary px-2.5 py-0.5">
                  <Text className="text-xs text-secondary-foreground">
                    <Trans>Guest</Trans>
                  </Text>
                </View>
              )}
            </View>
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
              {THEME_OPTIONS.map(({ value, label, icon: Icon }) => {
                const active = currentTheme === value
                return (
                  <Pressable
                    key={value}
                    onPress={() => {
                      log.debug('theme change', value)
                      // @ts-ignore
                      Uniwind.setTheme(value)
                    }}
                    className={cn(
                      'flex-1 items-center gap-1.5 rounded-xl py-3 active:opacity-75',
                      active ? 'bg-primary' : 'bg-secondary',
                    )}
                  >
                    <Icon
                      size={16}
                      color={
                        active
                          ? colors.primaryForeground
                          : colors.mutedForeground
                      }
                    />
                    <Text
                      className={cn(
                        'text-xs font-semibold',
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

          <Separator />

          {/* Sign out */}
          <Button
            variant="destructive"
            onPress={async () => {
              await authClient.signOut()
              router.replace('/')
            }}
          >
            <LogOut
              size={16}
              color="white"
            />
            <Text>
              <Trans>Sign out</Trans>
            </Text>
          </Button>
        </View>
      </ScrollView>
    </View>
  )
}
