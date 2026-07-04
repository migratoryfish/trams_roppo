module.exports = {
  root: true,
  env: { browser: true, es2021: true },
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:react-hooks/recommended",
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: { ecmaVersion: "latest", sourceType: "module" },
  plugins: ["@typescript-eslint", "react-hooks"],
  ignorePatterns: ["dist", "node_modules", "*.cjs"],
  rules: {
    //フックのルール違反は必ずエラーにする(このプロジェクトで実際に起きていた問題)
    "react-hooks/rules-of-hooks": "error",
    "react-hooks/exhaustive-deps": "warn",
    //既存コードを段階的に直すためwarn(エラーでビルドを止めない)
    "@typescript-eslint/no-unused-vars": "warn",
    "@typescript-eslint/no-explicit-any": "warn",
    "prefer-const": "warn",
    //日本語コメント内の全角スペースを許可する
    "no-irregular-whitespace": [
      "error",
      {
        skipComments: true,
        skipStrings: true,
        skipTemplates: true,
        skipJSXText: true,
      },
    ],
  },
};
