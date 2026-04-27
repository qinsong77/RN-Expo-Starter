// Learn more https://docs.expo.io/guides/customizing-metro
const { getDefaultConfig } = require('expo/metro-config')
// https://docs.uniwind.dev/quickstart#expo-metro
const { withUniwindConfig } = require('uniwind/metro')

/** @type {import('expo/metro-config').MetroConfig} */
const config = getDefaultConfig(__dirname)

// https://github.com/lingui/js-lingui/blob/main/examples/react-native/metro.config.js
const { transformer, resolver } = config

config.transformer = {
  ...transformer,
  babelTransformerPath: require.resolve('@lingui/metro-transformer/expo'),
}
config.resolver = {
  ...resolver,
  sourceExts: [...resolver.sourceExts, 'po', 'pot'],
}

// https://www.better-auth.com/docs/integrations/expo#configure-metro-bundler
config.resolver.unstable_enablePackageExports = true

module.exports = withUniwindConfig(config, {
  // relative path to your global.css file (from previous step)
  cssEntryFile: './global.css',
  // (optional) path where we gonna auto-generate typings
  // defaults to project's root
  dtsFile: './uniwind-types.d.ts',
})
