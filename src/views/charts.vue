<template>
    <!-- Regresar a la pagina anterior -->
    <div class="flex bg-gray-950 justify-left items-center space-x-4">
        <a @click="$router.go(-1)" href="#" class="mr-4 flex items-center">
            <img src="../assets/img/arrow-left.svg" alt="Regresar" class="h-6 w-6 mr-1"> Regresar
        </a>
    </div>
    <div class="grid grid-cols-12 bg-gray-950 h-full">
        <!-- PERFIL LOGIN INFO -->
        <div class="col-span-3 md:col-span-2 items-start justify-center">
            <div v-if="perfil != null" class="text-center mt-20 py-4 bg-slate-950 overflow-hidden shadow-lg">
                <a v-if="perfil.images[0]" :href="perfil.external_urls.spotify" target="_blank">
                    <img :src="perfil.images[0].url" class="mx-auto mb-4 w-20 md:w-24" alt="Avatar" />
                    <h5 class="mb-2 text-lg md:text-xl font-medium leading-tight">{{ perfil.display_name + ' - ' +
                        perfil.country }} </h5>
                </a>
                <a v-else :href="perfil.external_urls.spotify" target="_blank">
                    <img src="../assets/img/boy.png" class="mx-auto mb-4 w-20 md:w-24" alt="Avatar" />
                    <h5 class="mb-2 text-lg md:text-xl font-medium leading-tight">{{ perfil.display_name + ' - ' +
                        perfil.country }} </h5>
                </a>
                <div class="mt-2">
                    <a @click="disconnect_app()" href="#" class="font-normal text-center text-sm rounded"
                        style="color: #651111;">
                        <svg class="inline-block h-6 w-6 mr-1" viewBox="0 0 24 24" fill="none"
                            xmlns="http://www.w3.org/2000/svg">
                            <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                            <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
                            <g id="SVGRepo_iconCarrier">
                                <path
                                    d="M8.00195 7C8.01406 4.82497 8.11051 3.64706 8.87889 2.87868C9.75757 2 11.1718 2 14.0002 2H15.0002C17.8286 2 19.2429 2 20.1215 2.87868C21.0002 3.75736 21.0002 5.17157 21.0002 8V16C21.0002 18.8284 21.0002 20.2426 20.1215 21.1213C19.2429 22 17.8286 22 15.0002 22H14.0002C11.1718 22 9.75757 22 8.87889 21.1213C8.11051 20.3529 8.01406 19.175 8.00195 17"
                                    stroke="#651111" stroke-width="1.5" stroke-linecap="round"></path>
                                <path
                                    d="M8 19.5C5.64298 19.5 4.46447 19.5 3.73223 18.7678C3 18.0355 3 16.857 3 14.5V9.5C3 7.14298 3 5.96447 3.73223 5.23223C4.46447 4.5 5.64298 4.5 8 4.5"
                                    stroke="#651111" stroke-width="1.5"></path>
                                <path d="M15 12L6 12M6 12L8 14M6 12L8 10" stroke="#651111" stroke-width="1.5"
                                    stroke-linecap="round" stroke-linejoin="round"></path>
                            </g>
                        </svg>
                        Cerrar sesión
                    </a>
                </div>
                <div class="w-auto h-auto flex justify-center row">
                    <Toggle @change="change_toggle()"/>
                </div>
                <div class="w-auto h-auto flex justify-center row">
                    <span v-if="toggle_genre" class="ml-2 text-gray-400 text-sm">Canciones</span>
                    <span v-else class="ml-2 text-gray-400 text-sm">Artistas</span>
                </div>
            </div>
            <div v-else class="text-center">
                <h5 class="mb-2 text-lg md:text-xl font-medium leading-tight">Cargando...</h5>
            </div>
        </div>
        <!-- CARDS -->
        <div class="col-span-9 items-center justify-center mb-4 pt-8">
            <div class="grid grid-cols-12">
                <!-- Grafico de pastel -->
                <div
                    class="md:col-span-6 col-span-11 transition hover:-translate-y-1 hover:scale-105 ease-in-out mx-4 delay-100 pb-8 mb-4 rounded overflow-hidden shadow-lg">
                    <img class="w-full h-35 md:h-64 object-cover" src="../assets/img/pastel-img.png"
                        alt="Sunset in the mountains">
                    <div class="px-4 py-2">
                        <div class="font-bold text-lg md:text-xl mb-2">Musypie</div>
                        <p class="text-sm md:text-base text-gray-400">
                            Descubre cuales géneros son los que más escuchas y cuales son tus artistas favoritos.
                        </p>
                    </div>
                    <div class="px-4 py-2">
                        <router-link :to="{ name: 'top-genres', params: { chart_type: 'pie', time_limit: 'short_term', is_track: toggle_genre } }"
                            class="transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300 ...">
                            <span
                                class="inline-block bg-gray-200 rounded-full px-2 py-1 text-xs md:text-sm font-semibold text-gray-700 mr-2 mb-2">1
                                mes</span>
                        </router-link>
                        <router-link :to="{ name: 'top-genres', params: { chart_type: 'pie', time_limit: 'medium_term', is_track: toggle_genre } }"
                            class="transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300 ...">
                            <span
                                class="inline-block bg-gray-200 rounded-full px-2 py-1 text-xs md:text-sm font-semibold text-gray-700 mr-2 mb-2">6
                                meses</span>
                        </router-link>
                        <router-link :to="{ name: 'top-genres', params: { chart_type: 'pie', time_limit: 'long_term', is_track: toggle_genre } }"
                            class="transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300 ...">
                            <span
                                class="inline-block bg-gray-200 rounded-full px-2 py-1 text-xs md:text-sm font-semibold text-gray-700 mr-2 mb-2">de
                                todos los tiempos</span>
                        </router-link>
                    </div>
                </div>
                <!-- Grafico de burbujas -->
                <div
                    class="md:col-span-6 col-span-11 transition hover:-translate-y-1 hover:scale-105 ease-in-out delay-100 mx-4 mb-4 pb-8 rounded overflow-hidden shadow-lg">
                    <img class="w-full h-35 md:h-64 object-cover" src="../assets/img/bubble-img.png"
                        alt="Sunset in the mountains">
                    <div class="px-4 py-2">
                        <div class="font-bold text-lg md:text-xl mb-2">Musybubble</div>
                        <p class="text-sm md:text-base text-gray-400">
                            Descubre cuales géneros son los que más escuchas y cuales son tus artistas favoritos.
                        </p>
                    </div>
                    <div class="px-4 py-2">
                        <router-link
                            :to="{ name: 'top-genres', params: { chart_type: 'bubble', time_limit: 'short_term', is_track: toggle_genre } }"
                            class="transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300 ...">
                            <span
                                class="inline-block bg-gray-200 rounded-full px-2 py-1 text-xs md:text-sm font-semibold text-gray-700 mr-2 mb-2">1
                                mes</span>
                        </router-link>
                        <router-link
                            :to="{ name: 'top-genres', params: { chart_type: 'bubble', time_limit: 'medium_term', is_track: toggle_genre } }"
                            class="transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300 ...">
                            <span
                                class="inline-block bg-gray-200 rounded-full px-2 py-1 text-xs md:text-sm font-semibold text-gray-700 mr-2 mb-2">6
                                meses</span>
                        </router-link>
                        <router-link :to="{ name: 'top-genres', params: { chart_type: 'bubble', time_limit: 'long_term', is_track: toggle_genre } }"
                            class="transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300 ...">
                            <span
                                class="inline-block bg-gray-200 rounded-full px-2 py-1 text-xs md:text-sm font-semibold text-gray-700 mr-2 mb-2">de
                                todos los tiempos</span>
                        </router-link>
                    </div>
                </div>
            </div>
            <div class="grid grid-cols-12">
                <!-- Grafico de radar -->
                <div
                    class="md:col-span-6 col-span-11 transition hover:-translate-y-1 hover:scale-105 ease-in-out delay-100 mx-4 mb-4 pb-8 rounded overflow-hidden shadow-lg">
                    <img class="w-full h-35 md:h-64 object-cover" src="../assets/img/radar-img.jpeg"
                        alt="Sunset in the mountains">
                    <div class="px-4 py-2">
                        <div class="font-bold text-lg md:text-xl mb-2">Musyradar</div>
                        <p class="text-sm md:text-base text-gray-400">
                            Descubre cuales géneros son los que más escuchas y cuales son tus artistas favoritos.
                        </p>
                    </div>
                    <div class="px-4 py-2">
                        <router-link :to="{ name: 'top-genres', params: { chart_type: 'radar', time_limit: 'short_term', is_track: toggle_genre } }"
                            class="transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300 ...">
                            <span
                                class="inline-block bg-gray-200 rounded-full px-2 py-1 text-xs md:text-sm font-semibold text-gray-700 mr-2 mb-2">1
                                mes</span>
                        </router-link>
                        <router-link
                            :to="{ name: 'top-genres', params: { chart_type: 'radar', time_limit: 'medium_term', is_track: toggle_genre } }"
                            class="transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300 ...">
                            <span
                                class="inline-block bg-gray-200 rounded-full px-2 py-1 text-xs md:text-sm font-semibold text-gray-700 mr-2 mb-2">6
                                meses</span>
                        </router-link>
                        <router-link :to="{ name: 'top-genres', params: { chart_type: 'radar', time_limit: 'long_term', is_track: toggle_genre } }"
                            class="transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300 ...">
                            <span
                                class="inline-block bg-gray-200 rounded-full px-2 py-1 text-xs md:text-sm font-semibold text-gray-700 mr-2 mb-2">de
                                todos los tiempos</span>
                        </router-link>
                    </div>
                </div>
                <!-- Grafico gauge -->
                <div
                    class="md:col-span-6 col-span-11 transition hover:-translate-y-1 hover:scale-105 ease-in-out delay-100 mx-4 mb-4 pb-8 rounded overflow-hidden shadow-lg">
                    <img class="w-full h-35 md:h-64 object-cover" src="../assets/img/gauge-img.jpeg"
                        alt="Sunset in the mountains">
                    <div class="px-4 py-2">
                        <div class="font-bold text-lg md:text-xl mb-2">Musygauge</div>
                        <p class="text-sm md:text-base text-gray-400">
                            Descubre cuales géneros son los que más escuchas y cuales son tus artistas favoritos.
                        </p>
                    </div>
                    <div class="px-4 py-2">
                        <router-link :to="{ name: 'top-genres', params: { chart_type: 'gauge', time_limit: 'short_term', is_track: toggle_genre } }"
                            class="transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300 ...">
                            <span
                                class="inline-block bg-gray-200 rounded-full px-2 py-1 text-xs md:text-sm font-semibold text-gray-700 mr-2 mb-2">1
                                mes</span>
                        </router-link>
                        <router-link
                            :to="{ name: 'top-genres', params: { chart_type: 'gauge', time_limit: 'medium_term', is_track: toggle_genre } }"
                            class="transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300 ...">
                            <span
                                class="inline-block bg-gray-200 rounded-full px-2 py-1 text-xs md:text-sm font-semibold text-gray-700 mr-2 mb-2">6
                                meses</span>
                        </router-link>
                        <router-link :to="{ name: 'top-genres', params: { chart_type: 'gauge', time_limit: 'long_term', is_track: toggle_genre } }"
                            class="transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300 ...">
                            <span
                                class="inline-block bg-gray-200 rounded-full px-2 py-1 text-xs md:text-sm font-semibold text-gray-700 mr-2 mb-2">de
                                todos los tiempos</span>
                        </router-link>
                    </div>
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
import Toggle from '@/components/toggle.vue';

export default {
    data() {
        return {
            perfil: null,
            urlParams: new URLSearchParams(window.location.search),
            code: null,
            codeVerifier: localStorage.getItem('code_verifier'),
            accessToken: localStorage.getItem('access_token'),
            toggle_genre: Number(localStorage.getItem('toggle_genre') == 1 ? 1 : 0),
        };
    },
    components: {
        Toggle
    },
    created() {
        this.code = this.urlParams.get('code');
        if (this.code == null || this.code == 'undefined') {
            swal({
                    title: "Error",
                    text: "Error de autorización. Por favor, vuelve a iniciar sesión.",
                    icon: "error",
                    button: "OK",
                });
            localStorage.removeItem('access_token');
            this.$router.push({ path: '/' });
        }
        if (this.accessToken == null || this.accessToken == 'undefined') {
            this.getToken();
        } else {
            this.getProfile();
        }
    },
    methods: {
        change_toggle() {
            this.toggle_genre = Number(localStorage.getItem('toggle_genre'))
        },
        async getToken() {
            const body = new URLSearchParams({
                grant_type: 'authorization_code',
                code: this.code,
                redirect_uri: config.my_url + '/stats',
                client_id: config.clientId,
                code_verifier: this.codeVerifier
            });
            try {
                const response = await axios.post('https://accounts.spotify.com/api/token', body, {
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    }
                });
                localStorage.setItem('access_token', response.data.access_token);
                localStorage.setItem('refresh_token', response.data.refresh_token);
                this.accessToken = response.data.access_token;
                console.log(response.data);
                this.getProfile();
            } catch (error) {
                console.log(error);
            }
        },
        async getProfile() {
            try {
                const response = await axios.get('https://api.spotify.com/v1/me', {
                    headers: {
                        Authorization: 'Bearer ' + this.accessToken
                    }
                });
                this.perfil = response.data;
            } catch (error) {
                console.log(error);
            }
        },
        disconnect_app() {
            swal({
                title: "Quitar acceso a la app",
                text: "Al dar click en Desconectar se te redirigirá a tu perfil de Spotify. Busca musycharts-dcdv y presiona en Eliminar acceso.",
                buttons: [
                    "Cancelar",
                    "Desconectar", // <-- add the ".btn-danger" class for red buttons
                ],
                dangerMode: true,
            })
                .then((willDisconnect) => {
                    if (willDisconnect) {
                        localStorage.removeItem('access_token');
                        this.accessToken = null;
                        window.open('https://www.spotify.com/account/apps/', '_blank');
                        this.$router.push({ path: '/' });
                    }
                    else {
                        console.log('conexión no eliminada');
                    }
                });
        },
    },
};
</script>
