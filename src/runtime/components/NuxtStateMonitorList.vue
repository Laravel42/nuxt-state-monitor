<script setup lang="ts">
import {computed, toRefs, ref} from "vue";
import {htmlKey} from "../utils/index";
import {__nuxt_devtools, __RESERVED, colorMode} from "../utils/constants"
import {ValueType} from "../utils/interfaces";

const props = defineProps({
  data: {type: Object as () => Record<string, unknown>, default: () => ({})},
  updatedKey: {type: [String], required: false, default: () => null},
  updatedOldValue: {type: [Boolean, String, Number, Array, Object] as unknown as () => ValueType, required: false, default: () => null},
  updatedNewValue: {type: [Boolean, String, Number, Array, Object] as unknown as () => ValueType, required: false, default: () => null},
  updatingKey: {type: String, required: true},
  editingObject: {type: Array as () => string[], required: true},
  expandedObject: {type: Array as () => string[], required: true},
  searchTerm: {type: String, required: true},
  openedOption: {type: String, required: true},
  copyMessage: {type: String, required: true},
  emptyMessage: {type: String, default: () => "No items found"},
  editEnabled: {type: Boolean, default: true}
})

const emit = defineEmits([
  "close",
  "enableEdit",
  "expandJson",
  "openOption",
  "updateValue",
  "cancelEdit",
  "saveChanges",
  "setNull",
  "deleteKey",
  "copyToClipboard",
])

const handleCancel = () => {
  emit('cancelEdit')
  editorError.value = false
}

const isObject = (value: unknown): boolean => typeof value === "object" && value !== null;

/**
 * TODO: Refactor filtered data
 * Check if it's hidden
 * @param key
 */
const isHidden = (key: string): boolean | string => {
  const normalizedKey: string = key.toLowerCase();
  const normalizedSearch: string = props.searchTerm.toLowerCase();
  return key.startsWith(__RESERVED) || (normalizedSearch && !normalizedKey.includes(normalizedSearch));
};

const filteredData = computed<Record<string, ValueType>>(() => {
  const {data} = toRefs(props);

  return Object.keys(data.value)
      .filter((key: string) => {
        const normalizedKey = key.toLowerCase();
        const normalizedSearch = props.searchTerm?.toLowerCase() || '';

        return !key.startsWith(colorMode) && !key.startsWith('__RESERVED') && key !== __nuxt_devtools && (!normalizedSearch || normalizedKey.includes(normalizedSearch));
      })
      .reduce((acc: Record<string, ValueType>, key: string) => {
        acc[key] = data.value[key] as ValueType;
        return acc;
      }, {} as Record<string, ValueType>);
});


const editorError = ref<boolean>(false)

const expandedJson = ref<boolean>(false)

const copiedKey = ref('');

const handleCopied = (key: string) => {
  emit('copyToClipboard', key)
  copiedKey.value = key;
  setTimeout(() => {
    copiedKey.value = ''
  }, 1000)
}
</script>

<template>
  <ul class="mt-0.5 mx-2" v-if="Object.keys(filteredData).length > 0">
    <li v-for="(value, key) in filteredData" :key="key"
        @mouseleave="$emit('close')"
        :class="`text-sm border-b dark:border-zinc-700 border-neutral-300 py-1 mx-0 relative ${isObject(value) ? '' : 'flex items-center'} ${isHidden(key.toString()) ? 'hidden' : ''}`">
      <div class="flex items-center justify-center w-fit">
        <DotIcon v-if="key == updatedKey" class="dark:text-l42-1-dark text-l42-1"/>

        <strong :class="`${key== updatedKey ? 'ml-2 inline dark:text-l42-1-dark text-l42-1' : '' }`"
                v-html="htmlKey(key.toString(), searchTerm)">
        </strong>
        <span class="mr-1">:</span>
      </div>

      <!-- Updated value-->
      <div :class="['grid grid-cols-[auto_,_20px,_auto] items-start', {'overflow-hidden' : isObject(value)} ]"
           v-if="key == updatedKey">
        <NuxtStateMonitorValue
            @toggle="expandedJson = !expandedJson" :value="updatedOldValue"
            :expanded="expandedJson"
            :updated="key == updatedKey"
            label="old value"
        />
        <div class="flex h-full items-center justify-center">
          <ArrowRightIcon/>
        </div>
        <NuxtStateMonitorValue
            @toggle="expandedJson = !expandedJson" :value="updatedNewValue"
            :expanded="expandedJson"
            :updated="key == updatedKey"
            :class="typeof  value != 'object' && 'font-semibold'"
            label="new value"
        />
      </div>


      <NuxtStateMonitorEditor
          v-else
          :value="value"
          :keyValue="key"
          :updatingKey="updatingKey"
          :currentEditing="key == updatingKey"
          :objectExpanded="expandedObject"
          :objectEditing="editingObject"
          @toggle-expand="(key: string) => $emit('expandJson', key)"
          @change="(data: any) => $emit('updateValue', {value: data.value , key: data.key})"
          @error="(error: boolean) => editorError =  error"
      ></NuxtStateMonitorEditor>

      <div
          :class="`${isObject(value) ? 'top-[1px]' : ' top-1/2 -translate-y-1/2' } absolute flex gap-1  right-0 items-center z-[1]`">
             <span v-if="key == updatingKey" class=" flex gap-0.5 ">
              <CancelIcon @click="() => handleCancel()"/>

              <SaveIcon :class="{'opacity-50': editorError}" @click="editorError ? '' : $emit('saveChanges', key)"/>
            </span>

        <span
            class="right-4 block transition-all duration-500 leading-6 text-xs dark:text-zinc-400 text-zinc-500 lowercase">
              {{ `<${typeof value}>` }}
          </span>

        <MenuIcon v-if="editEnabled" @click="$emit('openOption', key)"
                  class="opacity-100 visible transition-all duration-500 cursor-pointer"/>

        <div class="flex gap-1" v-else>
          {{ copiedKey == key ? 'Copied!' : '' }}
          <CopyIcon @click="() => handleCopied(key)" class="dark:text-white text-l42-1 cursor-pointer"/>
        </div>
      </div>

      <!-- Menu Options-->
      <NuxtStateMonitorMenu
          v-if="openedOption === key"
          :edit-enabled="editEnabled"
          @edit="$emit('enableEdit', key)"
          @set-null="$emit('setNull', key)"
          @delete="$emit('deleteKey', key)"
          @copy="$emit('copyToClipboard', key)"
          :copy-message="copyMessage"
          :value="value"
      />
      <!-- Type and options -->
    </li>
  </ul>
  <div class="flex items-center justify-center border-b dark:border-zinc-700 border-neutral-200 pb-2 text-xs" v-else>
    {{ emptyMessage }}
  </div>
</template>


<style lang="scss" scoped>

</style>
