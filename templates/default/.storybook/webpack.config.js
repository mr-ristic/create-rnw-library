const path = require('path');

module.exports = async ({ config }) => {
  config.resolve.modules = [path.resolve(__dirname, '..'), 'node_modules'];

  config.resolve.alias = {
    ...config.resolve.alias,
    '@': path.resolve(__dirname, '../src'),
    'react-native$': 'react-native-web'
  };

  return config;
};
