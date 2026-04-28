<script setup>
    import { MoonIcon, SunIcon } from '@heroicons/vue/24/solid';
    import { ref, onMounted } from "vue";

    const isDark = ref(false);

    onMounted(() => {
        const theme = localStorage.getItem("theme");
        if (theme === "dark") {
            isDark.value = true;
            document.documentElement.classList.add("dark");
        } else {
            isDark.value = false;
            document.documentElement.classList.remove("dark");
        }
    })

    const useTheme = () => {
        isDark.value = !isDark.value;

        if (isDark.value) {
            localStorage.setItem("theme", "dark");
            document.documentElement.classList.add("dark");
        } else {
            localStorage.setItem("theme", "light");
            document.documentElement.classList.remove("dark");
        }
    }
</script>

<template>
    <button class="px-2 py-2 rounded hover:bg-red-100 dark:hover:bg-gray-700"
            @click="useTheme"
    >
        <MoonIcon v-if="isDark" class="w-6 h-6 text-white" />
        <SunIcon v-else class="w-6 h-6 text-black" />
    </button>
</template>