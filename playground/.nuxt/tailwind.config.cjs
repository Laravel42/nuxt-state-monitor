// generated by the @nuxtjs/tailwindcss <https://github.com/nuxt-modules/tailwindcss> module at 10/15/2024, 4:03:20 PM
const configMerger = require("/Users/dunker04516/nuxt-state-monitor/node_modules/@nuxtjs/tailwindcss/dist/runtime/merger.js");

const inlineConfig = {"content":[],"theme":{"extend":{}},"plugins":[]};

const config = [
require("./../../src/runtime/tailwind.config.ts")
].reduce((prev, curr) => configMerger(curr, prev), configMerger(inlineConfig, { content: ["/Users/dunker04516/nuxt-state-monitor/playground/components/**/*.{vue,js,jsx,mjs,ts,tsx}","/Users/dunker04516/nuxt-state-monitor/playground/components/global/**/*.{vue,js,jsx,mjs,ts,tsx}","/Users/dunker04516/nuxt-state-monitor/playground/components/**/*.{vue,js,jsx,mjs,ts,tsx}","/Users/dunker04516/nuxt-state-monitor/playground/layouts/**/*.{vue,js,jsx,mjs,ts,tsx}","/Users/dunker04516/nuxt-state-monitor/playground/pages/**/*.{vue,js,jsx,mjs,ts,tsx}","/Users/dunker04516/nuxt-state-monitor/playground/plugins/**/*.{js,ts,mjs}","/Users/dunker04516/nuxt-state-monitor/playground/composables/**/*.{js,ts,mjs}","/Users/dunker04516/nuxt-state-monitor/playground/utils/**/*.{js,ts,mjs}","/Users/dunker04516/nuxt-state-monitor/playground/{A,a}pp.{vue,js,jsx,mjs,ts,tsx}","/Users/dunker04516/nuxt-state-monitor/playground/{E,e}rror.{vue,js,jsx,mjs,ts,tsx}","/Users/dunker04516/nuxt-state-monitor/playground/app.config.{js,ts,mjs}"] }));

module.exports = (() => {const cfg=config;cfg["darkMode"] = ["selector","[class~=\"dark-mode\"]"];;return cfg;})()
