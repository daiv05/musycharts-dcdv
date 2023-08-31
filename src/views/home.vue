<template>
    <div class="flex items-center justify-center h-screen">
        <div class="flex flex-col md:flex-row justify-center">
            <div class="flex justify-center mb-4 md:mb-0">
                <img src="../assets/img/musylogo22.png" alt="logo" class="w-auto h-auto max-w-full max-h-[40vh]">
            </div>
            <div class="flex flex-col items-center mt-4 md:ml-4 justify-center px-4">
                <p class="text-xl md:text-2xl text-white mb-2 text-center md:text-left">Tus gustos musicales como nunca los
                    has visto</p>
                <p class="text-sm md:text-base text-white mb-8 text-center md:text-left">Descubre tu top de artistas,
                    géneros y canciones más escuchadas de la mano de Spotify.</p>
                <button @click="login()"
                    class="bg-emerald-600 hover:bg-emerald-700 font-medium text-center text-white rounded h-[35px] w-[200px]">Iniciar
                    sesión con Spotify</button>
                <p class="text-sm md:text-base text-white my-4 text-center">o</p>
                <router-link :to="{ name: 'stats' }"
                    class="bg-indigo-800 flex items-center justify-center hover:bg-indigo-900 font-medium text-white rounded h-[35px] w-[100px]">
                    Ingresar
                </router-link>

            </div>
        </div>

        <br>

    </div>
    <!-- Footer -->
    <footer class="bg-gray-200 py-4 md:mt-4 w-full">
        <div class="flex justify-center items-center space-x-4">
            <a href="https://github.com/daiv05/musycharts-dcdv" target="_blank" rel="noopener" class="mr-4">
                <img src="../assets/img/github.svg" alt="GitHub" class="h-6 w-6">
            </a>
            <a href="https://twitter.com/daiv_09" target="_blank" rel="noopener" class="mr-4">
                <img src="../assets/img/twitter.svg" alt="Twitter" class="h-6 w-6">
            </a>
            <a href="mailto:davidderas50@gmail.com" target="_blank" rel="noopener" class="mr-4">
                <img src="../assets/img/brand-gmail.svg" alt="Gmail" class="h-6 w-6">
            </a>
        </div>
        <div class="text-center mt-2">
            <p class="text-gray-700">&copy; 2023 musycharts-dcdv. Powered by Spotify AB.</p>
        </div>
    </footer>
</template>

<script setup>
import axios from 'axios';
import config from '@/config';

const clientId = config.clientId;
const redirectUri = config.my_url + '/stats';
let codeVerifier = generateRandomString(128);

async function generateCodeChallenge(codeVerifier) {
    function base64encode(string) {
        return btoa(String.fromCharCode.apply(null, new Uint8Array(string)))
            .replace(/\+/g, '-')
            .replace(/\//g, '_')
            .replace(/=+$/, '');
    }

    const encoder = new TextEncoder();
    const data = encoder.encode(codeVerifier);
    const digest = await window.crypto.subtle.digest('SHA-256', data);

    return base64encode(digest);
}

function generateRandomString(length) {
    let text = '';
    let possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (let i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
}

async function login() {
    generateCodeChallenge(codeVerifier).then(codeChallenge => {
        let state = generateRandomString(16);
        let scope = 'user-read-private user-read-email user-top-read';

        localStorage.clear();
        localStorage.setItem('code_verifier', codeVerifier);

        let args = new URLSearchParams({
            response_type: 'code',
            client_id: clientId,
            scope: scope,
            redirect_uri: redirectUri,
            state: state,
            code_challenge_method: 'S256',
            code_challenge: codeChallenge
        });

        console.log('codigo:\n' + localStorage.getItem('code_verifier'));
        window.location = 'https://accounts.spotify.com/authorize?' + args;
    });
}



</script>



<style>
html,
body {
    height: 100%;
}
</style>