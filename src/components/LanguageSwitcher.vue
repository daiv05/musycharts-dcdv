<template>
  <div class="lang-switcher">
    <button
      class="lang-btn"
      :class="{ active: locale === 'es' }"
      @click="setLocale('es')"
    >ES</button>
    <span class="lang-divider">|</span>
    <button
      class="lang-btn"
      :class="{ active: locale === 'en' }"
      @click="setLocale('en')"
    >EN</button>
  </div>
</template>

<script setup>
import { useI18n } from 'vue-i18n'
const { locale } = useI18n()

function setLocale(lang) {
  locale.value = lang
  localStorage.setItem('lang', lang)
}
</script>

<style scoped>
.lang-switcher {
  display: flex;
  align-items: center;
  gap: 4px;
}

.lang-btn {
  background: none;
  border: none;
  cursor: pointer;
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 0.05em;
  color: #a3a3a3;
  padding: 2px 4px;
  border-radius: 4px;
  transition: color 0.15s;
}

.lang-btn:hover {
  color: #f2f2f2;
}

.lang-btn.active {
  color: #1DB954;
}

.lang-divider {
  color: #3a3a3a;
  font-size: 0.7rem;
  user-select: none;
}
</style>
