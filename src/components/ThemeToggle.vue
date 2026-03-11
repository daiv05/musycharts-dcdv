<template>
  <button
    @click="toggleTheme"
    class="relative inline-flex h-8 w-16 items-center rounded-full transition-colors duration-300 focus:outline-none bg-gray-200 dark:bg-gray-800 cursor-pointer"
    :aria-label="isDark ? 'Switch to light mode' : 'Switch to dark mode'"
  >
    <span class="sr-only">Toggle theme</span>

    <!-- Track icons -->
    <span
      class="absolute inset-0 flex h-full w-full items-center justify-between px-2 transition-opacity z-10 pointer-events-none"
    >
      <svg
        class="h-4 w-4 transition-colors duration-300"
        :class="!isDark ? 'text-amber-500' : 'text-gray-400'"
        fill="currentColor"
        viewBox="0 0 48 48"
      >
        <path
          fill="currentColor"
          fill-rule="evenodd"
          d="M23.107 4.836a1.356 1.356 0 0 1 1.787 0a117 117 0 0 1 4.677 4.163a2 2 0 0 0 1.293.536c2.613.094 4.589.23 5.984.354a1.355 1.355 0 0 1 1.263 1.263c.123 1.395.26 3.37.353 5.984a2 2 0 0 0 .537 1.293a117 117 0 0 1 4.163 4.678a1.356 1.356 0 0 1 0 1.787a117 117 0 0 1-4.163 4.677a2 2 0 0 0-.537 1.293c-.093 2.613-.23 4.589-.353 5.984a1.355 1.355 0 0 1-1.263 1.263c-1.395.124-3.371.26-5.984.353a2 2 0 0 0-1.293.537a117 117 0 0 1-4.677 4.163a1.356 1.356 0 0 1-1.787 0a117 117 0 0 1-4.678-4.163a2 2 0 0 0-1.293-.537c-2.613-.093-4.59-.23-5.984-.353a1.355 1.355 0 0 1-1.264-1.263c-.123-1.395-.26-3.371-.353-5.984a2 2 0 0 0-.537-1.294a117 117 0 0 1-4.162-4.677a1.356 1.356 0 0 1 0-1.787c.93-1.11 2.288-2.669 4.162-4.676a2 2 0 0 0 .537-1.294c.094-2.613.23-4.589.353-5.984a1.355 1.355 0 0 1 1.264-1.263a115 115 0 0 1 5.984-.354A2 2 0 0 0 18.429 9a117 117 0 0 1 4.678-4.163m4.354-3.067a5.355 5.355 0 0 0-6.922 0c-1.063.89-2.493 2.134-4.292 3.798c-2.317.094-4.12.22-5.448.337A5.354 5.354 0 0 0 5.904 10.8a115 115 0 0 0-.338 5.448a117 117 0 0 0-3.797 4.292a5.355 5.355 0 0 0 0 6.922c.89 1.063 2.134 2.493 3.797 4.292c.094 2.317.22 4.119.338 5.448a5.354 5.354 0 0 0 4.895 4.895c1.329.117 3.13.243 5.448.337a117 117 0 0 0 4.292 3.798a5.355 5.355 0 0 0 6.922 0a117 117 0 0 0 4.292-3.798c2.317-.094 4.119-.22 5.447-.337a5.354 5.354 0 0 0 4.895-4.895c.118-1.329.244-3.13.338-5.447c1.664-1.8 2.908-3.23 3.798-4.293a5.355 5.355 0 0 0 0-6.922a117 117 0 0 0-3.798-4.293c-.094-2.316-.22-4.118-.338-5.447A5.354 5.354 0 0 0 37.2 5.904c-1.328-.117-3.13-.243-5.447-.337a117 117 0 0 0-4.292-3.798M13.5 24c0-5.799 4.701-10.5 10.5-10.5S34.5 18.201 34.5 24S29.799 34.5 24 34.5S13.5 29.799 13.5 24"
          clip-rule="evenodd"
        />
      </svg>
      <svg
        class="h-4 w-4 transition-colors duration-300"
        :class="isDark ? 'text-indigo-400' : 'text-gray-400'"
        fill="currentColor"
        viewBox="0 0 14 14"
      >
        <path
          fill="currentColor"
          fill-rule="evenodd"
          d="M10.176 1.197a.5.5 0 0 0-.509-.695a3.5 3.5 0 0 0-3.11 4.03a5.4 5.4 0 0 1 2.18 1.66a4.4 4.4 0 0 1 3.233.697a3.5 3.5 0 0 0 1.528-2.556a.5.5 0 0 0-.695-.509a2 2 0 0 1-2.627-2.627M1.625 9.5a2.875 2.875 0 0 1 5.653-.744a.625.625 0 0 0 1.009.315A1.875 1.875 0 1 1 9.5 12.375h-5A2.875 2.875 0 0 1 1.625 9.5M4.5 5.375a4.125 4.125 0 0 0 0 8.25h5a3.125 3.125 0 1 0-1.307-5.964A4.12 4.12 0 0 0 4.5 5.375"
          clip-rule="evenodd"
        />
      </svg>
    </span>

    <!-- Toggle knob -->
    <span
      class="h-6 w-6 transform rounded-full bg-white dark:bg-gray-900 shadow-md transition-transform duration-300 ease-in-out z-0"
      :class="isDark ? 'translate-x-[36px]' : 'translate-x-1'"
    >
    </span>
  </button>
</template>

<script setup>
import { ref, onMounted } from "vue";

const isDark = ref(false);

const applyTheme = (dark) => {
  if (dark) {
    document.documentElement.classList.add("dark");
  } else {
    document.documentElement.classList.remove("dark");
  }
};

onMounted(() => {
  // Check localStorage or system preference
  const rawTheme = localStorage.getItem("theme");
  if (rawTheme) {
    isDark.value = rawTheme === "dark";
  } else {
    // Default to dark mode based on user's current index.html meta color and typical app styles,
    // or system preference.
    isDark.value = window.matchMedia("(prefers-color-scheme: dark)").matches;
  }
  applyTheme(isDark.value);
});

const toggleTheme = () => {
  isDark.value = !isDark.value;
  localStorage.setItem("theme", isDark.value ? "dark" : "light");
  applyTheme(isDark.value);
};
</script>
