<script setup lang="ts">
import {computed, ref} from "vue"

const {value} = defineProps({
  value: {type: Object as () => Record<string, unknown>, required: true}
});

const formattedValue = ref(JSON.stringify(value ?? {}, null, 2))

const emit = defineEmits(["change", "error"])

/**
 * Handle JSON Editor object
 * @param e
 */
const handleInput = (e: Event) => {
  const target = e.target as HTMLTextAreaElement;
  const value = target.value;

  if (!error.value) {
    emit("change", JSON.parse(value));
  }
};


/**
 * Check errors in JSON
 */
const error = computed(() => {
  try {
    JSON.parse(formattedValue.value);
    emit("error", false)
    return false
  } catch (err) {
    emit("error", true)
    console.log(err)
    return true
  }
})


</script>
<template>
  <div class="w-full">
    <textarea
        class="w-full resize-none mt-2 mx-0 p-2 dark:focus:border-l42-1-dark dark:bg-zinc-800 dark:border-zinc-700 focus:border-l42-1 border border-gray-100 rounded-md outline-none"
        rows="5"
        v-model="formattedValue"
        @input="(e: any) => handleInput(e)"></textarea>
    <small v-if="error" class="text-red-500">Invalid object</small>
  </div>
</template>


<style lang="scss" scoped>

</style>
