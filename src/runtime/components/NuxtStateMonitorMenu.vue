<script setup lang="ts">
import Pencil from "../icons/PencilIcon.vue";
import CircleClose from "../icons/CircleCloseIcon.vue";
import TargetClose from "../icons/TargetCloseIcon.vue";
import Copy from "../icons/CopyIcon.vue";

defineEmits(["edit", "setNull", "delete", "copy"])

defineProps({
    copyMessage: {type: String, default: null},
    editEnabled: {type: Boolean, default: true},
    value: {type: [String, Boolean, Number, Object], default: () => null}
})
</script>
<template>
    <menu
        class="dark:bg-zinc-800 z-[2] absolute top-1 right-0 transition-all duration-500  bg-white rounded shadow-lg min-w-[100px]">
        <!-- Enable Edit -->
        <li v-if="editEnabled" @click="$emit('edit')"
            class="flex py-1 px-2 group gap-2 items-center dark:hover:bg-indigo-300 dark:hover:text-black hover:bg-neutral-100 cursor-pointer rounded-t dark:text-white">
            <Pencil class="dark:group-hover:text-black text-l42-1"/>
            <span>Edit</span>
        </li>

        <!-- Set Null -->
        <li
            v-if="editEnabled && typeof value !== 'boolean'"
            @click="$emit('setNull')"
            :class="[
          'flex py-1 px-2 group gap-2 items-center',
          'dark:hover:bg-indigo-300 dark:text-white hover:bg-neutral-100 cursor-pointer',
          editEnabled ? '' : 'rounded-t'
        ]"
        >
            <TargetClose class="text-l42-1 dark:text-indigo-600 group-hover:dark:text-black" />
            <span class="group-hover:dark:text-black">Set null</span>
        </li>


        <!-- Delete Key -->
        <li v-if="editEnabled" @click="$emit('delete')"
            :class="['flex py-1 px-2 group gap-2 items-center dark:hover:bg-indigo-300 dark:hover:text-black dark:text-white hover:bg-neutral-100 cursor-pointer', editEnabled ? '' : 'rounded-t']">
            <CircleClose class="dark:text-indigo-600 dark:group-hover:text-black text-l42-1"/>
            <span class="group-hover:dark:text-black">Remove</span>
        </li>

        <!-- Copy to clipboard -->
        <li @click="$emit('copy')"
            :class="['flex py-1 px-2 group gap-2 items-center dark:hover:bg-indigo-300 dark:hover:text-black hover:bg-neutral-100 cursor-pointer rounded-b', editEnabled ? '' : 'rounded-t']">
            <Copy class="dark:text-indigo-600 dark:group-hover:text-black text-l42-1"/>
            <span class="group-hover:dark:text-black">{{ copyMessage }}</span>
        </li>
    </menu>
</template>
