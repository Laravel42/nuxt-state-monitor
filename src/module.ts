import {defineNuxtModule, addComponentsDir, createResolver, installModule} from '@nuxt/kit'
import {fileURLToPath} from "node:url";

// Module options TypeScript interface definition
export interface ModuleOptions {
    [key: string]: unknown
}

const {resolve} = createResolver(import.meta.url);

export default defineNuxtModule<ModuleOptions>({
    meta: {
        name: 'nuxt-state-monitor',
        configKey: 'nuxtStateMonitor',
    },
    defaults: {},
    async setup(_options, _nuxt) {
        const runtimeDir = fileURLToPath(new URL('../src/runtime', import.meta.url))

        _nuxt.options.css.push(resolve('./runtime/tailwind.css'))

        await installModule('@nuxtjs/google-fonts', {
            download: true,
            inject: true,
            families: {
                'Zilla+Slab': {
                    wght: [300, 400, 500, 600, 700],
                    ital: [300, 400, 500, 600, 700],
                },
            },
            display: 'swap',
        })

        await installModule('@nuxtjs/tailwindcss', {
            exposeConfig: true,
            config: {
                darkMode: 'class' as const
            },
            configPath: resolve('./runtime/tailwind.config')
        })

        await installModule('@nuxtjs/color-mode', {
            fallback: 'light',
            storage: 'localStorage',
            storageKey: 'nuxt-color-mode'
        })

        await installModule('nuxt-headlessui', {
            headlessui: {
                prefix: 'Headless'
            }
        })

        await addComponentsDir({
            path: resolve('runtime/components')
        })

        await addComponentsDir({
            path: resolve('runtime/icons')
        })

        const checkruntimeDir = fileURLToPath(new URL('./runtime', import.meta.url))
        _nuxt.options.build.transpile.push(checkruntimeDir)
    },
})
