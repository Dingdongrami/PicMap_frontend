module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      [
        'module-resolver',
        {
          root: ['.'],
          extensions: ['.ios.js', '.android.js', '.js', '.jsx', '.json', '.tsx', '.ts'],
          alias: {
            '#components': './components',
            '#screens': './screens',
            '#utils': './utils',
            '#assets': './assets',
            '#constants': './constants',
          },
        },
      ],
      'react-native-reanimated/plugin',
      // require.resolve('expo-router/babel'),
    ],
  };
};
