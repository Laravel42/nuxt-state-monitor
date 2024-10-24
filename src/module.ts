import {defineNuxtModule, addComponentsDir, createResolver, installModule} from '@nuxt/kit'
import {fileURLToPath} from 'node:url';

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
        const resolver =  createResolver(import.meta.url)

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
            configPath: resolve('./runtime/tailwind.config'),
        });

        _nuxt.options.modules.push('@nuxtjs/color-mode');

        await installModule('@nuxtjs/color-mode', {
            fallback: 'light',
            storage: 'localStorage',
            storageKey: 'nuxt-color-mode'
        })

        _nuxt.options.modules.push('nuxt-headlessui');

        await installModule('nuxt-headlessui', {
            headlessui: {
                prefix: 'Headless'
            }
        })

        await addComponentsDir({
            path: resolver.resolve('runtime/components/')
        })

        await addComponentsDir({
            path: resolver.resolve('runtime/icons/')
        })

        _nuxt.options.build.transpile.push(runtimeDir)
    },
})
