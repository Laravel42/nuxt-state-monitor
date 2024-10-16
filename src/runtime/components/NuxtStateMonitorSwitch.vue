<script setup lang="ts">
import {ref, watch} from "vue"
import {Switch} from '@headlessui/vue'
import TrueCheckIcon from "../icons/TrueCheckIcon.vue";
import FalseCheckIcon from "../icons/FalseCheckIcon.vue";

const props = defineProps({
  value: {type: Boolean, required: false, default: false}
})

const checked = ref<boolean>(props.value)

const emit = defineEmits(["change"])

watch(() => props.value, (newValue: boolean) => {
  checked.value = newValue
})

watch(checked,  (newValue: boolean) => {
  emit("change", newValue)
})
</script>

<template>
    <Switch
        v-model="checked"
        :class="['relative inline-flex h-[20px] w-[36px] items-center rounded-full dark:border-zinc-700 border outline-none', checked ? 'dark:bg-green-500 bg-green-500' : 'dark:bg-zinc-600 bg-gray-200']">
      <component
          :is="checked ? TrueCheckIcon : FalseCheckIcon"
          :class="['flex items-center justify-center inline-block h-[16px] w-[16px] transform rounded-full transition', checked ? 'translate-x-[17px]' : 'translate-x-[1px]']" />
    </Switch>
</template>

<style lang="scss" scoped>

</style>
