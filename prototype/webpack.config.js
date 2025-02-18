const createExpoWebpackConfigAsync = require('@expo/webpack-config');
const path = require('path');

module.exports = async function (env, argv) {
  const config = await createExpoWebpackConfigAsync(env, argv);

  config.resolve.alias = {
    ...config.resolve.alias,
    'react-native$': 'react-native-web',
    // Add specific aliases for Platform and other problematic modules
    '../Utilities/Platform': 'react-native-web/dist/exports/Platform',
    '../Utilities/differ/deepDiffer': 'react-native-web/dist/modules/deepDiffer',
    '../StyleSheet/flattenStyle': 'react-native-web/dist/exports/StyleSheet/flattenStyle',
    // Add aliases for other React Native private interfaces
    'react-native/Libraries/ReactPrivate/ReactNativePrivateInterface': 'react-native-web/dist/modules/ReactNativePrivateInterface',
  };

  // Ensure proper resolution of react-native-web
  config.resolve.extensions = [
    '.web.js',
    '.web.jsx',
    '.web.ts',
    '.web.tsx',
    ...config.resolve.extensions,
  ];

  return config;
};
