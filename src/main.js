import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { Chart, registerables } from 'chart.js';
import VueChartkick from 'vue-chartkick';
import 'chartkick/chart.js';

Chart.register(...registerables);

const pinia = createPinia()

import App from './App.vue'
import router from './router'

const app = createApp(App)
app.use(router).use(pinia).use(VueChartkick, { adapter: Chart }).mount('#app')
