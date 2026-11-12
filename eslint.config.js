import js from "@eslint/js";
import pluginVue from "eslint-plugin-vue";
import prettier from "eslint-config-prettier";
import globals from "globals";

export default [
  { ignores: ["dist/**", "coverage/**", "node_modules/**", ".expo/**", "public/**"] },
  js.configs.recommended,
  ...pluginVue.configs["flat/recommended"],
  {
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      globals: { ...globals.browser },
    },
    rules: {
      "vue/multi-word-component-names": "off",
      "no-unused-vars": ["error", { argsIgnorePattern: "^_" }],
    },
  },
  {
    files: ["server.js", "*.config.js", "*.config.cjs", "tests/**", "scripts/**"],
    languageOptions: { globals: { ...globals.node } },
  },
  prettier,
];
