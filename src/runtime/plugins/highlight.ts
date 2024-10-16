import {defineNuxtPlugin} from "nuxt/app";
import hljs from 'highlight.js/lib/core';
import json from 'highlight.js/lib/languages/json';

hljs.registerLanguage('json', json);
export default defineNuxtPlugin((_nuxtApp) => {
    _nuxtApp.provide('hljs', hljs);
});
