<template>
    <div class="md:flex items-center inset-0">
        <!-- Grafico -->
        <div class="text-center md:w-1/2 pt-8 pb-8">
            <p class="leading-6 font-bold text-xl text-center">Top Géneros</p>
            <div v-if="chart_type == 'pie'" class="flex justify-center h-[400px]">
                <pie-chart class="pb-4 pt-4 w-full mx-auto" :data="genreData10">
                </pie-chart>
            </div>
            <div v-if="chart_type == 'bubble'" class="flex justify-center">
                <div ref="bubblechartd3" class="pb-4 pt-4 flex justify-center items-center w-full">
                </div>
            </div>
        </div>
        <!-- Lista artistas -->
        <div v-if="artist_info10 != null" class="md:w-1/2 md:ml-4 pt-4 md:mt-4 pl-8 bg bg-gray-200">
            <img src="../assets/img/logo_spotify.png" alt="logo_spotify" style="background-color: white;"
                class="w-32 border-8 -ml-2 border-white items-start m-8">
            <div class="md:flex md:flex-wrap">
                <div v-for="(artist, index) in artist_info10" :key="artist.name" class="md:w-1/2">
                    <a :href="artist.external_urls.spotify" target="_blank">
                        <div
                            class="w-full my-2 transition hover:-translate-y-1 hover:scale-105 ease-in-out delay-100 rounded overflow-hidden">
                            <img :src="artist.images[0].url" style="width: 100px;" :alt="artist.name" class="md:block">
                            <span class="text-sm text-black md:text-base">{{ (index + 1) + '. ' + artist.name }}</span>
                        </div>
                    </a>
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
import * as d3 from 'd3';
import { scaleOrdinal } from 'd3';
import { interpolateSinebow } from 'd3-scale-chromatic';
import config from '@/config';

export default {
    props: ['chart_type', 'time_limit'],
    data() {
        return {
            genreData: null,
            genreData10: null,
            artist_info: null,
            artist_info10: null,
            accessToken: localStorage.getItem('access_token'),
        };
    },
    methods: {
        generateBubbleChart() {
            const data = this.genreData.map(d => ({ name: d[0], value: d[1], size: d[1] }));

            // Crear el contenedor del gráfico
            const svg = d3.select(this.$refs.bubblechartd3)
                .append("svg")
                .attr("width", 400)
                .attr("height", 400)
                .style("background-color", "white")
                .style("border-radius", "50%")
                .style("border", "1px solid black")
                .style("box-shadow", "0 0 10px rgba(0, 0, 0, 0.2)")
                .style("margin", "0 auto")
                .style("display", "block")
                .style("overflow", "visible")
                .style("position", "relative")
                .style("padding", "10px")
                .style("box-sizing", "border-box");


            // Crear una escala para el tamaño de las burbujas
            const sizeScale = d3.scaleLinear()
                .domain([0, d3.max(data, d => d.size)])
                .range([5, 30]);

            // Crear el paquete de burbujas
            const pack = d3.pack()
                .size([350, 350])
                .padding(1);

            // Calcular los nodos del paquete de burbujas
            const root = d3.hierarchy({ children: data })
                .sum(d => d.value);

            const nodes = pack(root).descendants();

            const colorScale = scaleOrdinal()
                .domain([0, nodes.length]) // Dominio de la escala
                .range([0, 1]) // Rango de la escala
                .range(nodes.map((d, i) => interpolateSinebow(i / nodes.length))); // Mapear los colores utilizando interpolateSinebow

            // Dibujar las burbujas
            svg.selectAll(".bubble")
                .data(nodes)
                .enter()
                .append("circle")
                .attr("class", "bubble")
                .attr("cx", d => d.x)
                .attr("cy", d => d.y)
                .attr("r", d => d.r)
                .style("fill", (d, i) => colorScale(i)) // Cambia el color de las burbujas
                .style("stroke", "black") // Cambia el color del borde de las burbujas
                .style("stroke-width", 2) // Cambia el grosor del borde de las burbujas
                .style("filter", "drop-shadow(2px 2px 4px rgba(0, 0, 0, 0.4))"); // Agrega una sombra a las burbujas

            // Agregar etiquetas a las burbujas
            svg.selectAll(".label")
                .data(nodes)
                .enter()
                .append("text")
                .attr("class", "label")
                .attr("x", d => d.x)
                .attr("y", d => d.y)
                .attr("dy", "0.3em")
                .style("text-anchor", "middle")
                .style("font-size", "9px")
                .style("font-family", "system-ui")
                .style("font-weight", "bold")
                .style("white-space", "pre-wrap")
                .style("word-break", "break-all")
                .style("fill", (d, i) => colorScale(i))
                .style("text-shadow", "1px 1px 1px #000, -1px -1px 1px #000, 1px -1px 1px #000, -1px 1px 1px #000")
                .text(d => d.data.name);
        },
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

            // Hacer una copia de los datos
            if (genreData.lenght > 10) {
                this.genreData10 = genreData.slice(10);
            } else {
                this.genreData10 = genreData;
            }

            this.genreData = genreData;

            if (this.chart_type == 'bubble') {
                this.generateBubbleChart();
            }
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
                    // Hacer una copia de los datos
                    if (topArtists.length > 10) {
                        this.artist_info10 = topArtists.slice(10);
                        console.log('top artists > 10');
                    } else {
                        this.artist_info10 = topArtists;
                        console.log('top artists < 10');
                    }
                    this.generateGenreData(topArtists);
                    console.log(topArtists);
                })
                .catch(error => {
                    console.log('error en getTopTracks');
                    console.log(error);
                    this.code = null;
                    localStorage.removeItem('access_token');
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