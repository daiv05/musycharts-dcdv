<template>
    <div class="md:flex items-center absolute inset-0 h-screen">
        <!-- Grafico -->
        <div class="text-center md:w-1/2 pt-8 pb-8">
            <p class="leading-6 font-bold text-xl text-center">Top Géneros</p>
            <div class="flex justify-center">
                <pie-chart class="pb-4 pt-4 w-full mx-auto" :data="genreData">
                </pie-chart>
            </div>
        </div>
        <!-- Lista artistas -->
        <div v-if="artist_info != null" class="md:w-1/2 md:ml-4 mt-4 md:mt-0 pl-8">
            <div class="md:flex md:flex-wrap">
                <div v-for="(artist, index) in artist_info" :key="artist.name" class="md:w-1/2">
                    <div class="w-full" v-if="index < artist_info.length / 2">
                        <img :src="artist.images[0].url" :alt="artist.name"
                            :style="{ width: `${100 - index * 10}px`, height: `${100 - index * 10}px` }" class="md:block">
                        <span class="text-sm md:text-base">{{ (index + 1) + '. ' + artist.name }}</span>
                    </div>
                    <div class="w-full" v-else>
                        <span class="text-sm md:text-base">{{ (index + 1) + '. ' + artist.name }}</span>
                    </div>
                </div>
            </div>
        </div>

        <div v-else>
            <h2>Cargando...</h2>
        </div>
    </div>
</template>
  

<script>
import axios from 'axios';
import config from '@/config';

export default {
    props: ['time_limit',],
    data() {
        return {
            genreData: null,
            artist_info: null,
            accessToken: localStorage.getItem('access_token'),
        };
    },
    methods: {
        generateGenreData(topArtists) {
            const genreCounts = {};
            topArtists.forEach((artist) => {
                artist.genres.forEach((genre) => {
                    if (genreCounts[genre]) {
                        genreCounts[genre]++;
                    } else {
                        genreCounts[genre] = 1;
                    }
                });
            });

            const genreData = [];
            for (const genre in genreCounts) {
                genreData.push([genre, genreCounts[genre]]);
            }
            // Ordenar por cantidad de reproducciones
            genreData.sort((a, b) => b[1] - a[1]);
            // Tomar los 10 primeros
            genreData.splice(20);

            this.genreData = genreData;
        },

        getTopTracks() {
            this.genreData = null;
            if (this.accessToken == null || this.accessToken == 'undefined') {
                this.$router.push({ path: '/' });
                return;
            }
            const headers = {
                Authorization: 'Bearer ' + this.accessToken
            };
            return axios.get('https://api.spotify.com/v1/me/top/artists?time_range=' + this.time_limit, { headers })
                .then(response => {
                    const topArtists = response.data.items;
                    this.artist_info = topArtists;
                    this.generateGenreData(topArtists);
                    console.log(topArtists);
                })
                .catch(error => {
                    console.log('error en getTopTracks');
                    console.log(error);
                    this.code = null;
                    localStorage.removeItem('access_token'),
                    this.$router.push({ path: '/' });
                    // if (error.response.data.error.message == 'Invalid authorization code' || error.response.data.error.message == 'The access token expired') {
                    //     console.log('autorizacion code invalido');
                    //     this.code = null;
                    //     this.$router.push({ path: '/' });
                    // } else {
                    //     throw new Error('Failed to get artists');
                    // }
                });
        }
    },
    created() {
        this.getTopTracks();
    },
};

</script>