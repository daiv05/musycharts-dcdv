<template>
  <div
    class="flex bg-gray-100 dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 justify-left items-center space-x-4 py-2"
  >
    <a @click="$router.go(-1)" href="#" class="mr-4 flex items-center">
      <img src="../assets/svg/arrow-left.svg" alt="Regresar" class="h-6 w-6 mr-1 dark:invert" />
      {{ $t("nav.back") }}
    </a>
  </div>
</template>

<script setup></script>
