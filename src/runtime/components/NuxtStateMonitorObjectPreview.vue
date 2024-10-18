<script setup lang="ts">
import { onMounted, ref, computed } from 'vue';
import type { ValueType } from '../utils/interfaces';

const props = defineProps({
  value: { type: [Array, Object, Boolean, String, Number, null] as unknown as () => ValueType, required: true },
  expanded: { type: Boolean, required: true },
  hideIcons: { type: Boolean, required: false, default: () => false },
  label: { type: String, required: false, default: () => null },
});

const codeTag = ref<HTMLElement>();
const codeTagPretty = ref<HTMLElement>();


const initCodeTag = () => {};

const countLines = computed(() => JSON.stringify(props.value, null, 2).split('\n').length);

onMounted(() => {
  initCodeTag();
});

defineEmits(['toggle']);
</script>

<template>
  <div class="flex dark:text-neutral-200 text-zinc-900">
    <div class="code-editor flex gap-2 items-start justify-items-start relative h-full overflow-hidden">
      <ul v-if="expanded" class="flex-1 dark:bg-zinc-700 bg-neutral-100 h-full px-1.5 pb-2 border-green flex flex-col">
        <li v-for="line in countLines" :key="line" class="font-debug code-l42-line" v-html="line"></li>
        <li v-if="countLines == 1">&nbsp;</li>
      </ul>
      <!-- Simple code -->
      <pre class="collapsed language-javascript truncate" v-show="!expanded"><code
            ref="codeTag"
            v-html="JSON.stringify(value)"></code>
      </pre>

      <!-- Pretty formatted code -->
      <pre v-show="expanded"><code
            ref="codeTagPretty"
            class="language-javascript"
            v-html="JSON.stringify(value, null, 2)"></code>
      </pre>

      <div
          :class="['text-white', label != null ? 'flex flex-1 items-center justify-center gap-2 py-1 px-2 rounded-tl-md rounded-bl-md dark:bg-zinc-700 bg-l42-1' : '']">
        <span v-if="label" class="capitalize text-xs">{{ label }}</span>
      </div>
    </div>

    <div :class="['flex justify-center pt-1.5 pl-1', expanded ?  'mt-1' : 'items-center']">
      <CircleMinusIcon v-if="expanded && !hideIcons && !label"
                       :class="`w-5 cursor-pointer dark:fill-zinc-200 ${label ? 'fill-white' : 'fill-l42-1'}`"
                       @click="$emit('toggle')"/>
      <CirclePlusIcon v-else-if="!hideIcons && !label"
                      :class="`w-5 cursor-pointer dark:fill-zinc-200 ${label ? 'fill-white' : 'fill-l42-1'}`"
                      @click="$emit('toggle')"/>
    </div>
  </div>
</template>


<style lang="scss" scoped></style>
