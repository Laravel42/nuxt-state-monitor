import {defineNuxtPlugin} from 'nuxt/app';
import { VCodeBlock } from '@wdns/vue-code-block';
export default defineNuxtPlugin((_nuxtApp) => {
    const app = _nuxtApp.vueApp
    app.component('VCodeBlock', VCodeBlock)
})
