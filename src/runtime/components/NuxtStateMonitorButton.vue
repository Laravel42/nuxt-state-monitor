<script setup lang="ts">
</script>

<template>
    <button
        class="transition duration-100 group rounded border dark:border-zinc-900 dark:hover:border-indigo-300 border-neutral-50 dark:hover:text-red dark:hover:border-black cursor-pointer dark:hover:bg-black hover:bg-neutral-50 flex gap-1 items-center px-1 py-1 hover:text-l42-1 text-neutral-50"
    >
    <span
        class="flex gap-1 text-center text-xs dark:group-hover:text-indigo-300 dark:text-zinc-900">
      <slot/>
    </span>
    </button>
</template>

<style lang="scss" scoped></style>
