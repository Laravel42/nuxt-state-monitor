<script setup lang="ts">
import {ref} from "vue"

const {value} = defineProps({
  value: {type: Boolean, required: false, default: () => false}
})

const statusCheckbox = ref<HTMLInputElement>()
</script>

<template>
    <span class="flex items-center">
              <input
                  :checked="value"
                  class="hidden"
                  type="checkbox"
                  ref="statusCheckbox"
                  name="status"
              />
              <button
                  class="check-container cursor-pointer                                                              "
                  @click="statusCheckbox?.click()">

                <TrueCheckIcon class="true-check"/>

                <FalseCheckIcon class="false-check"/>
              </button>
            </span>
</template>


<style lang="scss" scoped>

</style>
