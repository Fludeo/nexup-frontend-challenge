import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";
import { FlatCompat } from "@eslint/eslintrc";

const compat = new FlatCompat();

export default [
  // Prettier plugin + disable conflicting rules
  ...compat.extends("plugin:prettier/recommended", "prettier"),

  // React recommended config (compat mode)
  ...compat.extends("plugin:react/recommended"),

  // Tus reglas custom (flat compatible)
  {
    files: ["src/**/*.ts", "src/**/*.tsx", "src/**/*.js", "src/**/*.jsx"],
    languageOptions: {
      globals: globals.browser,
      parserOptions: {
        ecmaFeatures: { jsx: true },
        ecmaVersion: "latest",
        sourceType: "module",
      },
    },
    rules: {
      "react/button-has-type": "error",
    },
  },

  // Reglas base de JS y TS
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
];
