import './assets/main.css'
import axios from 'axios';
import { createApp } from 'vue'

import App from './App.vue'
import router from './router'

import config from './config.js';

const getRefreshToken = async () => {
    // refresh token that has been previously stored
    const refreshToken = localStorage.getItem('refresh_token');
    if (!refreshToken) {
        console.log('no refresh token');
        swal({
            title: "Error",
            text: "Token de acceso expirado. Por favor, vuelve a iniciar sesión.",
            icon: "error",
            button: "OK",
        });
        router.push({ path: '/' });
        return;
    }
    console.log('trying refresh token');
    const client = config.clientId;
    console.log('client')
    console.log(client);
    const body = new URLSearchParams({
        grant_type: 'refresh_token',
        refresh_token: refreshToken,
        client_id: client
    });
    try{
        const response = await axios.post('https://accounts.spotify.com/api/token', body, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        });
        localStorage.setItem('access_token', response.data.access_token);
        localStorage.setItem('refresh_token', response.data.refresh_token);
        console.log('refresh token');
    } catch (error) {
        console.log('error del refresh token');
        console.log(error);
        swal({
            title: "Error",
            text: "Token de acceso expirado. Por favor, vuelve a iniciar sesión.",
            icon: "error",
            button: "OK",
        });
        router.push({ path: '/' });
        return;
    }
};

// Validar en cada response si el usuario esta autenticado
axios.interceptors.response.use(
    response => response,
    error => {
        if (error.response.status === 401) {
            console.log('no auth');
            getRefreshToken();
        }
        return Promise.reject(error);
    }
);

const app = createApp(App)
app.use(router).mount('#app')
