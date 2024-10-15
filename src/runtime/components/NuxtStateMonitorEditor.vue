<script setup lang="ts">
import CheckCircleFilled from "../icons/CheckCircleFilledIcon.vue";
import ErrorCircleFilled from "../icons/ErrorCircleFilledIcon.vue";

import type {ValueType} from "../utils/interfaces"

defineProps({
  value: {
    type: [Array, Object, Boolean, String, Number] as unknown as () => ValueType,
    required: false,
  },
  keyValue: {type: String, required: true},
  updatingKey: {type: String, required: true},
  currentEditing: {type: Boolean, required: true},
  objectExpanded: {type: Array as () => string[], required: false, default: () => []},
  objectEditing: {type: Array as () => string[], required: false, default: () => []},
});

defineEmits(["change", "toggleExpand", "error"])

</script>
<template>
  <div v-if="currentEditing" class="flex justify-center items-center">
    <NuxtStateMonitorSwitch
        v-if="typeof value == 'boolean'"
        :value="value"
        @change="(e: any) => $emit('change', {value: e.target?.checked, key: keyValue})"
    />
    <NuxtStateMonitorInput
        :value="value"
        v-if="typeof value === 'string' || typeof value === 'number' "
        @input="(e: any) => $emit('change', {value: e, key: keyValue})"
        :type="typeof value"
        class="text-sm"
    />

    <NuxtStateMonitorObject
        :value="value"
        v-if="typeof  value == 'object'"
        @change="(e: any) => $emit('change', {value: e, key: keyValue})"
        @error="((err: boolean) => $emit('error', err))"

    />

  </div>
  <div v-else>
    <span v-if="typeof value !== 'boolean' && !value" class="empty">empty</span>
    <NuxtStateMonitorObjectPreview
        v-else-if="typeof value === 'object' && value != null"
        class="truncate"
        :expanded="objectExpanded.includes(keyValue)"
        :value="value"
        @toggle="$emit('toggleExpand', keyValue)"
        @dblclick="$emit('toggleExpand', keyValue)"
    />

    <template v-else-if="typeof value == 'boolean'">
      <component :is="value ? CheckCircleFilled : ErrorCircleFilled"/>
    </template>


    <span v-else-if="value == ' '" class="empty">empty</span>
    <span v-else :class="typeof value">{{ value == ' ' ? 'empty' : value }}</span>
  </div>
</template>


<style lang="scss" scoped></style>
