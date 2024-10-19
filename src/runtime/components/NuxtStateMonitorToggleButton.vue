<script setup lang="ts">
defineProps({
    open: {type: Boolean, default: () => false}
})
</script>


<template>
    <div
        :class="`dark:bg-zinc-900 flex h-9 gap-1 justify-between w-fit group bg-white rounded-r-md items-center transition-all duration-500 fixed z-50 top-5 p-2 cursor-pointer ${open ? '-translate-x-full' : 'translate-x-0'}`">
        <CommandLineIcon/>
        <p class="dark:text-white font-debug text-xl font-bold truncate max-w-0 overflow-hidden group transition-all duration-1000 group-hover:max-w-full">
            Monitor
        </p>
        <AngleRightIcon/>
    </div>
</template>


