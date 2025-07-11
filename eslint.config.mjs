import js from "@eslint/js";
import globals from "globals";
import pluginVue from "eslint-plugin-vue";
import { defineConfig } from "eslint/config";


export default defineConfig([
  { files: ["**/*.{js,mjs,cjs,vue}"], plugins: { js }, extends: ["js/recommended"] },
  { files: ["**/*.{js,mjs,cjs,vue}"],
     languageOptions: { globals: globals.browser },
     rules: {
      'no-console': 'warn',
      'no-debugger': 'error',
      'no-unused-vars': ['warn', {
              vars: 'all',
              args: 'after-used',
              ignoreRestSiblings: true,
              caughtErrors: 'none',
            }],
      'prefer-const': 'warn',
      'vue/no-mutating-props': 'error',
      'vue/no-unused-components': 'warn',
      //'quotes': ['warn', 'single'],
      'semi': ['warn', 'always'],
      'no-undef': 'warn'
    } 
    },
  pluginVue.configs["flat/essential"],
  {
    files: ['**/*.vue'],
    rules: {
      'vue/no-unused-components': 'warn',
       'no-undef': 'warn',
       'no-dupe-keys': 'warn',
       'no-self-assign': 'warn',
       'vue/require-v-for-key' : 'warn',
       'vue/no-dupe-keys' : 'warn',
       'vue/valid-template-root' : 'warn',
       'vue/multi-word-component-names': 'warn'
    },
  }
]);
