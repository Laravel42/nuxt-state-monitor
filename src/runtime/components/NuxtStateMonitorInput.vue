<script setup lang="ts">
import {ref} from 'vue'

import Close from "../icons/CloseIcon.vue";

type Type =
    'search'
    | 'string'
    | 'number'
    | 'bigint'
    | 'boolean'
    | 'symbol'
    | 'undefined'
    | 'object'
    | 'function'
    | undefined;


defineProps({
    value: {type: [String, Number, null], default: () => null},
    placeholder: {type: String, default: () => null},
    type: {type: String as () => Type, default: () => "text", required: false}
})

const emit = defineEmits(["input", "reset"])

const nuxtStateInput = ref<HTMLInputElement>()

/**
 * Reset the input value & emit a reset event
 */
const handleReset = () => {
    if (nuxtStateInput?.value) nuxtStateInput.value.value = ''
    emit("reset")
}
</script>

<template>
    <div class="relative">
        <div v-if="type == 'search'" class="absolute inset-y-0 start-0 flex items-center ps-2 pointer-events-none">
            <SearchIcon/>
        </div>
        <div v-if="type == 'search' && value != '' && value != null"
             class="absolute end-0 pe-2 inset-y-0 items-center flex cursor-pointer"
             @click="handleReset()"
        >
            <Close/>
        </div>
        <input :value="value" ref="nuxtStateInput"
               @input="(e: any) => type == 'number' ? $emit('input', Number(e.target.value)) : $emit('input', e.target.value)"
               :type="type"
               v-bind="$attrs"
               :class="`${type == 'search' ? 'px-8' : ''} p-2 border font-debug placeholder-gray-400 font-normal  placeholder:font-normal dark:focus:border-l42-1-dark focus:border-l42-1 rounded-md block w-full text-base text-gray-900 h-8 focus:outline-none focus:ring-0 focus:ring-offset-0 dark:bg-zinc-800 dark:border-zinc-700 dark:text-white`"
               :placeholder="placeholder"
        />
    </div>
</template>


<style lang="scss" scoped>

</style>
