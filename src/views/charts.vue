<template>
    <div class="flex flex-col md:flex-row absolute inset-0 bg-gray-950 h-screen">

        <!-- PERFIL LOGIN INFO -->
        <div class="pb-8 pt-8 w-full md:w-1/4 flex items-center justify-center order-1 md:order-none">
            <div v-if="perfil != null" class="text-center">
                <img :src="perfil.images[0].url" class="mx-auto mb-4 w-24 md:w-32 rounded-lg" alt="Avatar" />
                <h5 class="mb-2 text-lg md:text-xl font-medium leading-tight">{{ perfil.display_name }}</h5>
                <p class="text-sm md:text-base text-neutral-500 dark:text-neutral-400">{{ perfil.country }}</p>
            </div>
            <div v-else class="text-center">
                <h5 class="mb-2 text-lg md:text-xl font-medium leading-tight">Cargando...</h5>
            </div>
        </div>

        <!-- CARDS -->
        <div class="w-full md:w-2/3 flex flex-wrap items-center justify-center md:justify-start order-2 md:order-none">
            <!-- Grafico de pastel -->
            <div
                class="transition hover:-translate-y-1 hover:scale-105 ease-in-out delay-100 max-w-sm mx-2 md:mx-4 mb-4 rounded overflow-hidden shadow-lg">
                <img class="w-full h-40 md:h-64 object-cover" src="../assets/img/pastel-img.png"
                    alt="Sunset in the mountains">
                <div class="px-4 py-2">
                    <div class="font-bold text-lg md:text-xl mb-2">Spotypie</div>
                    <p class="text-sm md:text-base text-gray-400">
                        Descubre cuales géneros son los que más escuchas y cuales son tus artistas favoritos.
                    </p>
                </div>
                <div class="px-4 py-2">
                    <router-link :to="{ name: 'top-genres', params: { time_limit: 'short_term' } }"
                        class="transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300 ...">
                        <span
                            class="inline-block bg-gray-200 rounded-full px-2 py-1 text-xs md:text-sm font-semibold text-gray-700 mr-2 mb-2">1
                            mes</span>
                    </router-link>
                    <router-link :to="{ name: 'top-genres', params: { time_limit: 'medium_term' } }"
                        class="transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300 ...">
                        <span
                            class="inline-block bg-gray-200 rounded-full px-2 py-1 text-xs md:text-sm font-semibold text-gray-700 mr-2 mb-2">6
                            meses</span>
                    </router-link>
                    <router-link :to="{ name: 'top-genres', params: { time_limit: 'long_term' } }"
                        class="transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300 ...">
                        <span
                            class="inline-block bg-gray-200 rounded-full px-2 py-1 text-xs md:text-sm font-semibold text-gray-700 mr-2 mb-2">de
                            todos los tiempos</span>
                    </router-link>



                </div>
            </div>

            <!-- Grafico de burbujas -->
            <div
                class="transition hover:-translate-y-1 hover:scale-105 ease-in-out delay-100 max-w-sm mx-2 md:mx-4 mb-4 rounded overflow-hidden shadow-lg">
                <img class="w-full h-40 md:h-64 object-cover" src="../assets/img/bubble-img.png"
                    alt="Sunset in the mountains">
                <div class="px-4 py-2">
                    <div class="font-bold text-lg md:text-xl mb-2">Spotibubble</div>
                    <p class="text-sm md:text-base text-gray-400">
                        Descubre cuales géneros son los que más escuchas y cuales son tus artistas favoritos.
                    </p>
                </div>
                <div class="px-4 py-2">
                    <router-link :to="{ name: 'top-genres', params: { time_limit: 'short_term' } }"
                        class="transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300 ...">
                        <span
                            class="inline-block bg-gray-200 rounded-full px-2 py-1 text-xs md:text-sm font-semibold text-gray-700 mr-2 mb-2">1
                            mes</span>
                    </router-link>
                    <router-link :to="{ name: 'top-genres', params: { time_limit: 'medium_term' } }"
                        class="transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300 ...">
                        <span
                            class="inline-block bg-gray-200 rounded-full px-2 py-1 text-xs md:text-sm font-semibold text-gray-700 mr-2 mb-2">6
                            meses</span>
                    </router-link>
                    <router-link :to="{ name: 'top-genres', params: { time_limit: 'long_term' } }"
                        class="transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300 ...">
                        <span
                            class="inline-block bg-gray-200 rounded-full px-2 py-1 text-xs md:text-sm font-semibold text-gray-700 mr-2 mb-2">de
                            todos los tiempos</span>
                    </router-link>
                </div>
            </div>
        </div>

    </div>
</template>

<script>
import axios from 'axios';
import config from '@/config';

export default {
    data() {
        return {
            perfil: null,
            urlParams: new URLSearchParams(window.location.search),
            code: null,
            codeVerifier: localStorage.getItem('code_verifier'),
            accessToken: localStorage.getItem('access_token')
        };
    },
    created() {
        this.code = this.urlParams.get('code');
        if (this.accessToken == null || this.accessToken == 'undefined') {
            this.getToken()
                .then((res) => {
                    console.log('token obtenido1');
                    console.log(res);
                    return this.getProfile();
                })
                .catch((error) => {
                    this.code = null;
                    localStorage.removeItem('access_token');
                    console.error('error aqui 1');
                    console.error(error);
                    this.$router.push({ path: '/' });
                });
        } else {
            this.getProfile()
                .then((resp) => {
                    console.log('perfil obtenido');
                    console.log(resp);
                }).catch((error) => {
                    this.code = null;
                    localStorage.removeItem('access_token');
                    console.error('error aqui 2');
                    console.error(error);
                    this.$router.push({ path: '/' });
                });
        }
    },
    methods: {
        getToken() {
            const body = new URLSearchParams({
                grant_type: 'authorization_code',
                code: this.code,
                redirect_uri: config.my_url + '/stats',
                client_id: config.clientId,
                code_verifier: this.codeVerifier
            });
            return axios.post('https://accounts.spotify.com/api/token', body, {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            })
                .then(response => {
                    localStorage.setItem('access_token', response.data.access_token);
                    this.accessToken = response.data.access_token
                    return this.getProfile();
                })
                .catch(error => {
                    // if (error.response.data.error.message == 'Invalid authorization code' || error.response.data.error.message == 'The access token expired') {
                    //     console.log('autorizacion code invalido');
                    this.code = null;
                    localStorage.removeItem('access_token');
                    if (error) {
                        this.$router.push({ path: '/' });
                    }
                    // } else {
                    //     throw new Error('Failed to get profile');
                    // }
                });
        },

        getProfile() {
            return axios.get('https://api.spotify.com/v1/me', {
                headers: {
                    Authorization: 'Bearer ' + this.accessToken
                }
            })
                .then(response => {
                    this.perfil = response.data;
                })
                .catch(error => {
                    if (error) {
                        console.log('error metodo obtener perfil');
                        localStorage.removeItem('access_token');
                        this.accessToken = null;
                        this.$router.push({ path: '/' });
                    }
                    // if (error.response.data.error.message == 'The access token expired') {
                    //     console.log('el token expiro');
                    //     localStorage.removeItem('access_token');
                    //     this.accessToken = null;
                    //     this.$router.push({ path: '/' });
                    // } else {
                    //     throw new Error('Failed to get profile');
                    // }
                });
        },
    }
};
</script>
