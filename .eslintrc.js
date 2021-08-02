module.exports = {
  root: true,
  extends: '@react-native-community',
  plugins: [
    "react-hooks"
  ],
  parserOptions: {
    "project": ["tsconfig.json"]
  },
  rules: {
    "react-hooks/rules-of-hooks": "error", // Checks rules of Hooks
    "react-hooks/exhaustive-deps": "warn", // Checks effect dependencies
    "@typescript-eslint/no-misused-promises": "error"
  }
};
  