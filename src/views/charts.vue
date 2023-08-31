<template>
    <!-- Regresar a la pagina anterior -->
    <div class="flex bg-gray-950 justify-left items-center space-x-4">
        <a @click="$router.go(-1)" href="#" class="mr-4 flex items-center">
            <img src="../assets/img/arrow-left.svg" alt="Regresar" class="h-6 w-6 mr-1"> Regresar
        </a>
    </div>

    <div class="flex md:flex-row bg-gray-950 h-full">
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
        <div class="pt-4 md:w-2/4 flex flex-wrap items-center justify-center order-2">
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
    <!-- Footer -->
    <footer class="bg-gray-200 py-4 mt-2 w-full">
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
                    return this.getProfile();
                })
                .catch((error) => {
                    this.code = null;
                    localStorage.removeItem('access_token');
                    this.accessToken = null;
                    this.message_token_expired();
                    this.$router.push({ path: '/'});
                });
        } else {
            this.getProfile()
                .then((resp) => {
                    console.log('Perfil obtenido');
                }).catch((error) => {
                    this.code = null;
                    localStorage.removeItem('access_token');
                    this.accessToken = null;
                    this.message_token_expired();
                    this.$router.push({ path: '/'});
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
                    this.code = null;
                    localStorage.removeItem('access_token');
                    this.accessToken = null;
                    this.message_token_expired();
                    this.$router.push({ path: '/'});
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
                    this.message_token_expired();
                    this.$router.push({ path: '/' });
                });
        },
        disconnect_app() {
            swal({
                title: "Quitar acceso a la app",
                text: "Al dar click en Desconectar se te redirigirá a tu perfil de Spotify. Busca musycharts-dcdv y presiona en Eliminar acceso.",
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
        },
        message_token_expired(){
            swal({
                title: "Error",
                text: "Token de acceso expirado. Por favor, vuelve a iniciar sesión.",
                icon: "error",
                button: "OK",
            });
        }
    }
};
</script>
