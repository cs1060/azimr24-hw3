// Learn more https://docs.expo.io/guides/customizing-metro
const { getDefaultConfig } = require('expo/metro-config');
const path = require('path');

/** @type {import('expo/metro-config').MetroConfig} */
const config = getDefaultConfig(__dirname, {
  // [Web-only]: Enables CSS support in Metro.
  isCSSEnabled: true,
});

// Configure module resolution
config.resolver = {
  ...config.resolver,
  sourceExts: ['jsx', 'js', 'ts', 'tsx', 'json', 'cjs', 'mjs'],
  platforms: ['ios', 'android', 'native', 'web'],
  // Ensure proper aliases for web platform
  extraNodeModules: {
    'react-native': path.resolve(__dirname, 'node_modules/react-native'),
    'react-native-web': path.resolve(__dirname, 'node_modules/react-native-web'),
  },
};

module.exports = config;
