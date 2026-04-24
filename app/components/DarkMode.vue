<script setup>
    import { MoonIcon, SunIcon } from '@heroicons/vue/24/solid';
    const { isDark } = useTheme();
</script>

<template>
    <button
        @click="isDark = !isDark"
        class="px-2 py-2 rounded hover:bg-red-100 dark:hover:bg-gray-700"
    >
        <MoonIcon v-if="isDark" class="w-6 h-6 text-white" />
        <SunIcon v-else class="w-6 h-6 text-black" />
    </button>
</template>