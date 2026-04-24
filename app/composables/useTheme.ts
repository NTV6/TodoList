import { ref, onMounted, watch } from "vue";

export const useTheme = () => {
    const isDark = ref(false);

    // load khi mở trang
    onMounted(() => {
        const saved = localStorage.getItem("theme");

        if (saved === "dark") {
            isDark.value = true;
            document.documentElement.classList.add("dark");
        } else if (saved === "light") {
            isDark.value = false;
            document.documentElement.classList.remove("dark");
        } else {
            // fallback theo hệ điều hành
            const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
            isDark.value = prefersDark;
            document.documentElement.classList.toggle("dark", prefersDark);
        }
    });

    // lưu khi thay đổi
    watch(isDark, (val) => {
        localStorage.setItem("theme", val ? "dark" : "light");
        document.documentElement.classList.toggle("dark", val);
    });

    return { isDark };
};