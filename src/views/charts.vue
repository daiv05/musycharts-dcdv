<template>
    <div class="flex flex-col md:flex-row inset-0 bg-gray-950">
        <!-- PERFIL LOGIN INFO -->
        <div class="w-full md:w-1/4 flex md:items-start justify-center order-1 md:order-none">
            <div v-if="perfil != null" class="text-center pt-20">
                <a :href="perfil.external_urls.spotify" target="_blank">
                    <img :src="perfil.images[0].url" class="mx-auto mb-4 w-24 md:w-32" alt="Avatar" />
                    <h5 class="mb-2 text-lg md:text-xl font-medium leading-tight">{{ perfil.display_name }}</h5>
                    <p class="text-sm md:text-base text-neutral-500 dark:text-neutral-400">{{ perfil.country }}</p>
                </a>
                <div class="mt-2">
                    <a @click="disconnect_app()" href="#"
                        class="font-normal text-center text-sm text-red-200 rounded h-[35px] w-[175px]">
                        Quitar acceso
                    </a>
                </div>
            </div>
            <div v-else class="text-center">
                <h5 class="mb-2 text-lg md:text-xl font-medium leading-tight">Cargando...</h5>
            </div>
        </div>

        <!-- CARDS -->
        <div
            class="pt-4 md:w-2/4 sm:w-auto flex flex-wrap items-center justify-center md:justify-start order-2 md:order-none">
            <!-- Grafico de pastel -->
            <div
                class="transition hover:-translate-y-1 hover:scale-105 ease-in-out delay-100 max-w-sm mx-2 md:mx-4 pb-8 pt-8 mt-8 mb-4 rounded overflow-hidden shadow-lg">
                <img class="w-full h-40 md:h-64 object-cover" src="../assets/img/pastel-img.png"
                    alt="Sunset in the mountains">
                <div class="px-4 py-2">
                    <div class="font-bold text-lg md:text-xl mb-2">Musypie</div>
                    <p class="text-sm md:text-base text-gray-400">
                        Descubre cuales géneros son los que más escuchas y cuales son tus artistas favoritos.
                    </p>
                </div>
                <div class="px-4 py-2">
                    <router-link :to="{ name: 'top-genres', params: { chart_type: 'pie', time_limit: 'short_term' } }"
                        class="transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300 ...">
                        <span
                            class="inline-block bg-gray-200 rounded-full px-2 py-1 text-xs md:text-sm font-semibold text-gray-700 mr-2 mb-2">1
                            mes</span>
                    </router-link>
                    <router-link :to="{ name: 'top-genres', params: { chart_type: 'pie', time_limit: 'medium_term' } }"
                        class="transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300 ...">
                        <span
                            class="inline-block bg-gray-200 rounded-full px-2 py-1 text-xs md:text-sm font-semibold text-gray-700 mr-2 mb-2">6
                            meses</span>
                    </router-link>
                    <router-link :to="{ name: 'top-genres', params: { chart_type: 'pie', time_limit: 'long_term' } }"
                        class="transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300 ...">
                        <span
                            class="inline-block bg-gray-200 rounded-full px-2 py-1 text-xs md:text-sm font-semibold text-gray-700 mr-2 mb-2">de
                            todos los tiempos</span>
                    </router-link>



                </div>
            </div>

            <!-- Grafico de burbujas -->
            <div
                class="transition hover:-translate-y-1 hover:scale-105 ease-in-out delay-100 max-w-sm mx-2 md:mx-4 mb-4 pb-8 rounded overflow-hidden shadow-lg">
                <img class="w-full h-40 md:h-64 object-cover" src="../assets/img/bubble-img.png"
                    alt="Sunset in the mountains">
                <div class="px-4 py-2">
                    <div class="font-bold text-lg md:text-xl mb-2">Musybubble</div>
                    <p class="text-sm md:text-base text-gray-400">
                        Descubre cuales géneros son los que más escuchas y cuales son tus artistas favoritos.
                    </p>
                </div>
                <div class="px-4 py-2">
                    <router-link :to="{ name: 'top-genres', params: { chart_type: 'bubble', time_limit: 'short_term' } }"
                        class="transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300 ...">
                        <span
                            class="inline-block bg-gray-200 rounded-full px-2 py-1 text-xs md:text-sm font-semibold text-gray-700 mr-2 mb-2">1
                            mes</span>
                    </router-link>
                    <router-link :to="{ name: 'top-genres', params: { chart_type: 'bubble', time_limit: 'medium_term' } }"
                        class="transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300 ...">
                        <span
                            class="inline-block bg-gray-200 rounded-full px-2 py-1 text-xs md:text-sm font-semibold text-gray-700 mr-2 mb-2">6
                            meses</span>
                    </router-link>
                    <router-link :to="{ name: 'top-genres', params: { chart_type: 'bubble', time_limit: 'long_term' } }"
                        class="transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300 ...">
                        <span
                            class="inline-block bg-gray-200 rounded-full px-2 py-1 text-xs md:text-sm font-semibold text-gray-700 mr-2 mb-2">de
                            todos los tiempos</span>
                    </router-link>
                </div>
            </div>
        </div>

    </div>
    <footer class="flex justify-center items-center bg-gray-200 text-gray-600 text-sm">
        <p class="text-center">Powered by <a href="https://www.spotify.com/" target="_blank">Spotify</a></p>
    </footer>
</template>

<script>
import axios from 'axios';
import config from '@/config';
import swal from 'sweetalert';

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
                    this.accessToken = null;
                    console.error('error aqui 1');
                    console.error(error);
                    this.$router.push({ path: '/' });
                });
        } else {
            this.getProfile()
                .then((resp) => {
                    console.log('perfil obtenido2');
                    console.log(resp);
                }).catch((error) => {
                    this.code = null;
                    localStorage.removeItem('access_token');
                    this.accessToken = null;
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
                })
                .catch(error => {
                    // if (error.response.data.error.message == 'Invalid authorization code' || error.response.data.error.message == 'The access token expired') {
                    //     console.log('autorizacion code invalido');
                    this.code = null;
                    localStorage.removeItem('access_token');
                    this.accessToken = null;
                    this.$router.push({ path: '/' });
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
                    return response;
                })
                .catch(error => {
                    this.code = null;
                    localStorage.removeItem('access_token');
                    this.accessToken = null;
                    console.error('error aqui 2');
                    console.error(error);
                    this.$router.push({ path: '/' });
                });
        },
        disconnect_app() {
            swal({
                title: "Quitar acceso a la app",
                text: `Al dar click en Desconectar se te redirigirá a tu perfil de Spotify. Busca musycharts-dcdv y presiona en Eliminar acceso.`,
                buttons: ["Cancelar", "Desconectar"],
            })
                .then((willDisconnect) => {
                    if (willDisconnect) {
                        localStorage.removeItem('access_token');
                        this.accessToken = null;
                        window.open('https://www.spotify.com/account/apps/', '_blank');
                        this.$router.push({ path: '/' });
                    } else {
                        console.log('conexión no eliminada');
                    }
                }
                );
        }
    }
};
</script>
