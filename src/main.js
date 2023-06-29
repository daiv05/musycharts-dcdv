import './assets/main.css'

import { createApp } from 'vue'
import { Chart, registerables } from 'chart.js';
import VueChartkick from 'vue-chartkick';
import 'chartkick/chart.js';

Chart.register(...registerables);

import App from './App.vue'
import router from './router'

const app = createApp(App)
app.use(router).use(VueChartkick, { adapter: Chart }).mount('#app')
