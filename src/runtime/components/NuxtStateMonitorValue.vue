<script setup lang="ts">
import {computed} from "vue";
import CheckCircleFilled from "../icons/CheckCircleFilledIcon.vue";
import ErrorCircleFilled from "../icons/ErrorCircleFilledIcon.vue";
import type {ValueType, DisplayValue} from "../utils/interfaces";

const props = defineProps({
  value: {type: [Boolean, String, Number, Array, Object] as unknown as () => ValueType, required: true},
  updated: {type: Boolean, required: false, default: false},
  expanded: {type: Boolean, required: false, default: false},
  label: {type: String, required: false, default: () => null},
});


const type = computed(() => typeof props.value)

const displayValue = computed<DisplayValue | unknown>(() => {
  const value = props.value;

  if (!value) return 'empty';

  if (typeof value === 'object') {
    return JSON.stringify(value, null, 2);
  }
  if (typeof value === 'undefined') return 'undefined';
  if (typeof value === 'boolean') return value ? 'check' : 'error';

  if ('string' === typeof value) {
    const isShortened = value.length > 30 || props.updated;
    return {tooltip: value, shortened: isShortened};
  }

  if (Array.isArray(value)) {
    const isShortened = value.length > 30 || props.updated;
    return {tooltip: value, shortened: isShortened};
  }

  if (typeof value === 'number') {
    return {tooltip: String(value), shortened: false};
  }

  return {tooltip: String(value), shortened: false};
});


defineEmits(['toggle'])
</script>

<template>
<span>
  <span
      v-if="type !== 'boolean' && !value"
      class="empty">
    empty
  </span>

  <template v-else-if="type === 'object'">
   <NuxtStateMonitorObjectPreview
       :label="label"
       :expanded="expanded || updated"
       @toggle="$emit('toggle')"
       :value="value"
   />
  </template>

  <template v-else-if="type === 'undefined'">
    <span class="dark:text-white text-gray-400">undefined</span>
  </template>

  <template v-else-if="type === 'boolean'">
    <component :is="value ? CheckCircleFilled : ErrorCircleFilled"/>
  </template>


    <template v-else-if="type === 'string' && value == ' '">
    <span class="empty">empty</span>
    </template>

  <template v-else>
    <span v-if="typeof displayValue !== 'undefined' && (displayValue as DisplayValue).shortened" class="tooltip">
      <span class="dark:text-white text-l42-1 block truncate" :class="updated ? 'max-w-[19ch]' : 'w-[30ch]'">
        {{ (displayValue as DisplayValue).tooltip }}
      </span>
      <span class="tooltiptext">{{ (displayValue as DisplayValue).tooltip }}</span>
    </span>
    <span v-else class="dark:text-white text-l42-1">
      {{ (displayValue as DisplayValue).tooltip }}
    </span>
  </template>
</span>
</template>
