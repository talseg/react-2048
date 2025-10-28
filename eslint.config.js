import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import pluginReact from "eslint-plugin-react";
import pluginReactHooks from "eslint-plugin-react-hooks";
import css from "@eslint/css";
import { defineConfig } from "eslint/config";

export default defineConfig([
  { files: ["**/*.{js,mjs,cjs,ts,mts,cts,jsx,tsx}"], 
    languageOptions: {
      parser: tseslint.parser, // Let ESLint understand TypeScript
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
        ecmaFeatures: { jsx: true },
      },
      globals: globals.browser,
    },
    plugins: {
      react: pluginReact,
      "react-hooks": pluginReactHooks,
      "@typescript-eslint": tseslint.plugin,
    },
    extends: [
      js.configs.recommended,
      ...tseslint.configs.recommended,
      pluginReact.configs.flat.recommended,
    ],
    rules: {
      // ✅ React Hooks
      "react-hooks/rules-of-hooks": "error",
      "react-hooks/exhaustive-deps": "warn",

      // ✅ TypeScript hygiene
      "@typescript-eslint/no-unused-vars": ["warn", { argsIgnorePattern: "^_" }],

      // ✅ Optional style improvements
      "react/react-in-jsx-scope": "off", // Not needed in React 17+
      "react/prop-types": "off",         // Not needed with TypeScript
    },
    settings: {
      react: { version: "detect" },
    },
  },
  { files: ["**/*.css"], 
    plugins: { css }, 
    language: "css/css", 
    extends: ["css/recommended"] },
]);
