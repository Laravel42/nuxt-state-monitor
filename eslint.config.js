import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";
import pluginVue from "eslint-plugin-vue";

export default [
    {ignores: ["**/.nuxt/", "dist/*", "playground"]},
    {files: ["**/*.{js,mjs,cjs,ts,vue}"]},
    {languageOptions: {globals: globals.browser}},
    pluginJs.configs.recommended,
    ...tseslint.configs.recommended,
    ...pluginVue.configs["flat/essential"],
    {files: ["**/*.vue"], languageOptions: {parserOptions: {parser: tseslint.parser}}},
    {
        rules: {
            '@typescript-eslint/no-unused-vars': 'off',
            'no-undef': 'off',
            'no-prototype-builtins': 'off',
            '@typescript-eslint/ban-ts-comment': 'off',
            'no-empty': 'off',
            'no-control-regex': 'off',
            'no-useless-escape': 'off',
        },
    },
];
