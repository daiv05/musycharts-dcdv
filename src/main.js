import './assets/main.css'
import axios from 'axios';

import { createApp } from 'vue'

import App from './App.vue'
import router from './router'

// Validar en cada response si el usuario esta autenticado
axios.interceptors.response.use(
    response => response,
    error => {
        if (error.response.status === 401) {
            console.log('no auth');
            localStorage.removeItem('access_token');
            swal({
                title: "Error",
                text: "Token de acceso expirado. Por favor, vuelve a iniciar sesión.",
                icon: "error",
                button: "OK",
            });
            router.push({ path: '/' });
        }
        return Promise.reject(error);
    }
);

const app = createApp(App)
app.use(router).mount('#app')
