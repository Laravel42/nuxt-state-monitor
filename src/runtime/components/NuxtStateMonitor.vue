<script setup lang="ts">
import {ref, watch, toRaw} from "vue";
import {__PREFIX, __RESERVED} from "../utils/constants"
import {__JSON, isObject} from "../utils"
import NuxtStateMonitorList from "./NuxtStateMonitorList.vue";
import Light from "../icons/LightIcon.vue";
import Moon from "../icons/MoonIcon.vue";
import {StateData, UpdatedState, ValueType, ViewState} from "../utils/interfaces";
import {Switch} from '@headlessui/vue'
import {useState} from "nuxt/app"
import {ColorModeInstance} from "@nuxtjs/color-mode/dist/runtime/types";

const updated = ref<UpdatedState>({
  key: null,
  newVal: null,
  oldVal: null
});

const viewState = ref<ViewState>({
  open: false,
  copyMessage: 'Copy',
  openOption: '',
  updatingKey: '',
  updatingKeyValue: '',
});

/* Search reference */
const search = ref<string>("");

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const additionalData: Record<string, any> = defineModel("customData")

// State tracking
let state = (useState<StateData>() as unknown as { _object: Record<string, unknown> })._object;
const rawState = toRaw(state);

Object.keys(rawState).forEach((key) => {
  const keyName = key.replace(__PREFIX, "");
  watch(useState(keyName), (newVal, oldVal) => {
    updated.value = {key, newVal, oldVal};
  });
});

// Local variables
const open = ref<boolean>(false);
const copyMessage = ref("Copy");
const openOption = ref("");
const expandedObject = ref<string[]>([]);
const editingObject = ref<string[]>([]);

/**
 * Toggle panel
 */
const togglePanel = () => {
  open.value = !open.value;
};

/**
 * Copy vale to clipboard
 * @param key
 * @param isAdditional
 */
const copyToClipboard = (key: string, isAdditional: boolean = false) => {
  let data = isAdditional ? additionalData.value[key] : state[key];

  if (typeof data === "object") {
    data = JSON.stringify(data);
  }
  navigator.clipboard
      .writeText(data).then(() => {
    copyMessage.value = "Copied!";
    setTimeout(() => copyMessage.value = "Copy", 2000);
  })
      .catch((error) => {
        console.error("Error copying text to clipboard:", error);
      });
};

/**
 * Import Json State from file explorer
 */
const exportJsonState = (): void => {
  const rawState = toRaw(state);
  const rawValues = Object.keys(rawState).reduce((acc: Record<string, unknown>, key: string) => {
    if (key.startsWith(__RESERVED)) return acc;
    acc[key.replace(__PREFIX, "")] = rawState[key];
    return acc;
  }, {});

  const data = {...rawValues};

  const sortedData = Object.keys(data)
      .sort()
      .reduce((acc: Record<string, unknown>, key: string) => {
        acc[key] = data[key];
        return acc;
      }, {});

  const jsonString = JSON.stringify(sortedData, null, 2);
  const blob = new Blob([jsonString], {type: "application/json"});
  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = __JSON();
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
};


/**
 * Expand Json
 * @param key
 */
const expandJSON = (key: string) => {
  if (expandedObject.value.includes(key)) {
    expandedObject.value = expandedObject.value.filter(item => item !== key);
  } else {
    expandedObject.value.push(key);
  }

};

//Menu options
const openOptions = (key: string): void => {
  openOption.value = key;
};

/**
 * Close menu options
 */
const closeOptions = (): void => {
  openOption.value = "";
};

/**
 * Enable edit mode
 * @param key
 */
const enabledEdit = (key: string): void => {
  viewState.value.updatingKey = key;

  updated.value = {
    key: null,
    newVal: null,
    oldVal: null
  }

  closeOptions();
};

/**
 * Set null state
 * @param key
 * @param isAdditional
 */
const setNull = (key: string, isAdditional: boolean = false) => {
  const target = isAdditional ? additionalData : state;

  const currentValue = target[key];

  let newValue;

  if (typeof currentValue === 'string') {
    newValue = ' ';
  } else if (typeof currentValue === 'number') {
    newValue = 0;
  } else if (typeof currentValue === 'boolean') {
    newValue = false;
  } else if (currentValue === null) {
    newValue = null; // Manejo explícito de null
  } else if (typeof currentValue === 'object') {
    newValue = {};
  } else {
    newValue = null;
  }

  updated.value = {key, newVal: newValue, oldVal: currentValue};
  target[key] = newValue;

  viewState.value.updatingKey = '';
  closeOptions();
};


/**
 * Delete key
 * @param key
 * @param isAdditional
 */
const deleteKey = (key: string, isAdditional: boolean = false): void => {
  const target = isAdditional ? additionalData.value : state;
  delete target[key];
  closeOptions();
};


/**
 * Update edit
 * @param value
 */
const updateValue = (value: unknown): void => {
  viewState.value.updatingKeyValue = value
};

/**
 * Cancel edit
 */
const cancelEdit = (): void => {
  viewState.value.updatingKey = ''
};

const isValueType = (value: unknown): value is ValueType => {
  return (
      Array.isArray(value) ||
      typeof value === 'object' ||
      typeof value === 'boolean' ||
      typeof value === 'string' ||
      typeof value === 'number' ||
      value === null ||
      value === undefined
  );
};


/**
 * Save state changes
 * @param key
 * @param isAdditional
 */
const saveChanges = (key: string, isAdditional: boolean = false) => {
  const newVal = viewState.value.updatingKeyValue;
  const target = isAdditional ? additionalData.value : state;
  const oldVal = target[key];

  if (newVal === "" || newVal == oldVal) {
    cancelEdit();
    return;
  }
  target[key] = newVal;

  if (isValueType(newVal)) {
    updated.value = {key, oldVal, newVal};
  }

  viewState.value.updatingKey = '';
};


/**
 * Import JSON State
 * @param event
 */
const importJsonState = async (event: Event) => {
  const file = (event.target as HTMLInputElement).files?.[0];
  if (!file) {
    console.error("No file selected");
    return;
  }

  const reader = new FileReader();
  reader.onload = (e) => {
    try {
      const jsonString = e.target?.result as string;
      const jsonObj = JSON.parse(jsonString);
      if (isObject(jsonObj)) {
        Object.keys(jsonObj).forEach((key) => {
          if(key !== 'color-mode'){
            useState(key).value = jsonObj[key];
          }
        });
      } else {
        console.error("Invalid JSON format");
      }
    } catch (error) {
      console.error("Error parsing JSON:", error);
    }
  };

  reader.onerror = (error) => {
    console.error("Error reading file:", error);
  };

  reader.readAsText(file);
};

const importJsonStateInput = ref<HTMLInputElement>()

const colorMode = useState<ColorModeInstance>("color-mode");

const themeLight = ref(colorMode.value.preference === 'light');

watch(themeLight, (newTheme) => {
  colorMode.value.preference = newTheme ? 'light' : 'dark';
});

watch(() => colorMode.value.preference, (newPreference) => {
  themeLight.value = newPreference === 'light';
});


</script>

<template>
  <NuxtStateMonitorToggleButton @click="togglePanel" :open="open" class="shadow-md"/>
  <div
      :class="[
        'flex transition-all duration-500 fixed top-0 left-0 font-debug h-screen z-[9999] bg-transparent',
        open ? 'translate-x-0' : '-translate-x-full'
    ]">
    <div
        class="flex flex-col h-full shadow-md min-w-[530px] w-[530px] max-w-[1400px] resize-x py-4 px-2 overflow-y-auto dark:bg-zinc-900 bg-white dark:text-white">
      <div>
        <!-- Top Header -->
        <div class="flex justify-between items-center">
          <div class="flex gap-4 items-center">
            <CommandLineIcon/>
            <h2 class="dark:text-white font-bold text-neutral-900 text-xl">Monitor</h2>
          </div>

          <div class="flex gap-1 items-center justify-center">
            <Switch
                v-model="themeLight"
                class="relative inline-flex h-8 w-16 items-center rounded-full dark:bg-zinc-800 dark:border-zinc-700 bg-neutral-100 border">
              <div
                  :class="[
                            'flex items-center justify-center inline-block h-6 w-6 transform rounded-full transition',
                            themeLight ? 'translate-x-9' : 'translate-x-1'
                        ]"
                  class="dark:bg-l42-1-dark bg-l42-1">
              </div>
              <Light :class="['absolute translate-x-[39px]', themeLight ? 'text-white' : 'text-zinc-400']"/>
              <Moon :class="['absolute translate-x-[7px]', themeLight ? 'text-gray-400' : 'text-zinc-900']"/>
            </Switch>
            <AngleLeftIcon @click="togglePanel" class="text-l42-1"/>
          </div>
        </div>

        <div class="border border-neutral-300 my-2 w-full"/>
        <NuxtStateMonitorInput
            :type="'search'"
            @input="(val: string) => search = val"
            @reset="() => search = ''"
            :value="search"
            placeholder="Search by key..."
            class="mb-2"/>
      </div>

      <div class="header relative">
        <h3
            class="dark:text-zinc-900 dark:bg-l42-1-dark text-base font-semibold mb-2 font-debug capitalize text-white p-2 bg-l42-1 rounded-md leading-normal">
          Custom
        </h3>
      </div>

      <NuxtStateMonitorList
          :edit-enabled="false"
          :data="additionalData"
          :updated-key="updated.key!"
          :updated-old-value="updated.oldVal"
          :updated-new-value="updated.newVal"
          :updating-key="viewState.updatingKey"
          :editing-object="editingObject"
          :expanded-object="expandedObject"
          :search-term="search"
          :opened-option="openOption"
          :copyMessage="copyMessage"

          @close="closeOptions"
          @enableEdit="(key: string) => enabledEdit(key)"
          @expandJson="(key: string) => expandJSON(key)"
          @openOption="(key: string) => openOptions(key)"
          @updateValue="(obj: any) => updateValue(obj.value)"
          @cancelEdit="cancelEdit"
          @saveChanges="(key: string) => saveChanges(key, true)"
          @setNull="(key: string) => setNull(key, true)"
          @deleteKey="(key: string) => deleteKey(key, true)"
          @copyToClipboard="(key: string) => copyToClipboard(key, true)"
      />

      <div
          class="header dark:text-zinc-900 dark:bg-l42-1-dark relative bg-l42-1 rounded-md flex justify-between p-2 my-2 font-debug">
        <h3 class="dark:text-zinc-900 text-base font-semibold capitalize text-white leading-inherit mt-1">
          State
        </h3>

        <div class="flex justify-between gap-2 items-center">
          <NuxtStateMonitorButton @click="importJsonStateInput?.click()">
            <UploadIcon class="dark:group-hover:text-indigo-300 group-hover:text-l42-1"/>
            Import JSON State
            <input class="w-0 h-0 invisible" ref="importJsonStateInput" type="file" @change="importJsonState"
                   accept="application/JSON"/>
          </NuxtStateMonitorButton>

          <NuxtStateMonitorButton @click="exportJsonState">
            <DownloadIcon class="dark:group-hover:text-indigo-300 group-hover:text-l42-1"/>
            Export JSON State
          </NuxtStateMonitorButton>
        </div>
      </div>

      <NuxtStateMonitorList
          :data="state"
          :updated-key="updated.key!"
          :updated-old-value="updated.oldVal"
          :updated-new-value="updated.newVal"
          :updating-key="viewState.updatingKey"
          :editing-object="editingObject"
          :expanded-object="expandedObject"
          :search-term="search"
          :opened-option="openOption"
          :copyMessage="copyMessage"
          :empty-message="'No items found'"

          @close="closeOptions"
          @enableEdit="(key: string) => enabledEdit(key)"
          @expandJson="(key: string) => expandJSON(key)"
          @openOption="(key: string) => openOptions(key)"
          @updateValue="(obj: any) => updateValue(obj.value)"
          @cancelEdit="cancelEdit"
          @saveChanges="(key: string) => saveChanges(key)"
          @setNull="(key: string) => setNull(key)"
          @deleteKey="(key: string) => deleteKey(key)"
          @copyToClipboard="(key: string) => copyToClipboard(key)"
          @toggle-expand="(key: string) => expandJSON(key)"
      />
    </div>
  </div>

</template>

<style scoped></style>
