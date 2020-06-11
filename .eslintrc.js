module.exports = {
  root: true,
  // "parser": "babel-eslint"
  extends: '@react-native-community',
  "eol-last": ["error", "never"],
  settings: {
    'import/resolver': {
      node: {
        paths: ['src'],
      },
    },
  },
};
