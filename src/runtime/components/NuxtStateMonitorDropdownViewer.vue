<template>
    <div class="fixed w-full h-screen dark:bg-zinc-900 dark:text-white">
        <div class="absolute top-0 right-0 px-4 w-1/4">
            <select
                v-model="selectedState"
                class="px-2 border font-debug placeholder-gray-400 font-normal placeholder:font-normal dark:focus:border-l42-1-dark focus:border-l42-1 rounded-md block w-full text-base text-gray-900 h-8 focus:outline-none focus:ring-0 focus:ring-offset-0 dark:bg-zinc-800 dark:border-zinc-700 dark:text-white">
                <template v-for="(state, key) in filteredStates" :key="key">
                    <option :value="key" :label="String(key).replace(__PREFIX, '')" :aria-label="state"></option>
                </template>
            </select>

            <NuxtStateMonitorValue
                :value="states[selectedState] as ValueType"
                :expanded="expanded"
                @toggle="expanded = !expanded"
            />
        </div>
    </div>
</template>

<script setup lang="ts">
import {computed, ref} from "vue"
import type {ValueType} from "tailwindcss/types/config";
import {__nuxt_devtools, __PREFIX, colorMode} from "../utils/constants";
import {StateData} from "../utils/interfaces";

let states = (useState<StateData>() as unknown as { _object: Record<string, unknown> })._object;

// eslint-disable-next-line
const filteredStates: Record<string, any> = computed(() => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const {[__nuxt_devtools]: __devtools_ignore, [colorMode]: __color_ignore, ...data} = states;
    return data
})

const selectedState = ref(Object.keys(filteredStates.value)[0])

const expanded = ref<boolean>(false)

</script>

<style lang="scss" scoped>

</style>
