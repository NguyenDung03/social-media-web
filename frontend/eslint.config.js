import js from "@eslint/js";
import globals from "globals";
import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import importPlugin from "eslint-plugin-import";
import { defineConfig, globalIgnores } from "eslint/config";

export default defineConfig([
  globalIgnores(["dist"]),
  js.configs.recommended,
  {
    files: ["**/*.{js,jsx}"],
    plugins: {
      react,
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh,
      import: importPlugin,
    },
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
      parserOptions: {
        ecmaVersion: "latest",
        ecmaFeatures: { jsx: true },
        sourceType: "module",
      },
    },
    settings: {
      react: {
        version: "detect",
      },
      "import/resolver": {
        node: {
          extensions: [".js", ".jsx"],
        },
        alias: {
          map: [
            ["@", "./src"],
            ["@components", "./src/components"],
            ["@pages", "./src/pages"],
            ["@hooks", "./src/hooks"],
            ["@store", "./src/store"],
            ["@apis", "./src/apis"],
            ["@utils", "./src/utils"],
            ["@lib", "./src/lib"],
            ["@layouts", "./src/layouts"],
            ["@assets", "./src/assets"],
            ["@types", "./src/types"],
          ],
          extensions: [".js", ".jsx", ".json"],
        },
      },
    },
    rules: {
      // React Hooks
      ...reactHooks.configs.recommended.rules,

      // React Refresh
      "react-refresh/only-export-components": [
        "warn",
        { allowConstantExport: true },
      ],

      // Biến và import
      "no-unused-vars": ["error", { varsIgnorePattern: "^[A-Z_]" }],
      "no-undef": "error",

      // React
      "react/jsx-uses-react": "error",
      "react/jsx-uses-vars": "error",
      "react/jsx-no-undef": "error", // Báo lỗi component chưa import
      "react/react-in-jsx-scope": "off", // Không cần import React với React 17+

      // Import/Export
      "import/no-unresolved": "error", // Báo lỗi import không tồn tại
      "import/named": "error", // Báo lỗi named import sai
      "import/default": "error", // Báo lỗi default import sai
      "import/namespace": "error", // Báo lỗi namespace import sai
      "import/no-duplicates": "warn", // Cảnh báo import trùng lặp
      "import/first": "warn", // Import phải ở đầu file
      "import/newline-after-import": "warn", // Xuống dòng sau import
    },
  },
]);
