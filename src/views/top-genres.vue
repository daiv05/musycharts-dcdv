<template>
    <!-- Regresar a la pagina anterior -->
    <div class="flex bg-gray-950 justify-left items-center space-x-4">
        <a @click="$router.go(-1)" href="#" class="mr-4 flex items-center">
            <img src="../assets/img/arrow-left.svg" alt="Regresar" class="h-6 w-6 mr-1"> Regresar
        </a>
    </div>
    <div class="md:flex bg-gray-950 items-center h-full">
        <!-- Grafico -->
        <div class="text-center md:w-1/2 pt-8 pb-8">
            <div>
                <p class="leading-6 font-bold text-xl text-center">Top Géneros</p>
                <div v-if="chart_type == 'pie'">
                    <transition name="fade">
                        <div v-show="pie_type == 'pie'" id="chartdiv_1"></div>
                    </transition>
                    <transition name="fade">
                        <div v-show="pie_type == 'radius'" id="chartdiv_2"></div>
                    </transition>
                    <transition name="fade">
                        <div v-show="pie_type == 'gradient'" id="chartdiv_3"></div>
                    </transition>
                </div>
                <div v-if="chart_type == 'bubble'" class="flex justify-center">
                    <div id="chartdiv_4"></div>
                </div>
            </div>
            <select v-if="chart_type == 'pie'" v-model="pie_type"
                class="bg-gray-950 text-white text-center text-sm font-semibold py-2 px-4 border border-gray-700 rounded shadow">
                <option value="pie">pie</option>
                <option value="radius">var radius</option>
                <option value="gradient">grainy gradient</option>
            </select>
        </div>
        <!-- Lista artistas -->
        <transition name="fade">
            <div v-if="artist_info10 != null" class="md:w-1/2 md:ml-4 pt-4 md:mt-4 pl-8 bg bg-gray-200">
                <img src="../assets/img/logo_spotify.png" alt="logo_spotify" class="w-32 -ml-2 items-start m-8">
                <div class="flex flex-wrap grid-cols-6">
                    <div v-for="(artist, index) in artist_info10" :key="artist.name" class="md:w-1/2 px-2">
                        <a :href="artist.external_urls.spotify" target="_blank">
                            <div
                                class="w-full my-2 transition hover:-translate-y-1 hover:scale-105 ease-in-out delay-100 overflow-hidden">
                                <img :src="artist.images[0].url" style="height: 100px;" :alt="artist.name" class="md:block">
                                <span class="text-sm text-black md:text-base" style="width: 100px;">
                                    <h5 class="font-bold" style="width: 100px;">{{ '#' + (index + 1) + ' ' }}</h5> {{
                                        artist.name }}
                                </span>
                            </div>
                        </a>
                    </div>
                </div>
            </div>
            <div v-else>
                <h2>Cargando...</h2>
            </div>
        </transition>
    </div>

    <!-- Footer -->
    <footer class="bg-gray-200 py-4 mt-2 bottom-0 w-full">
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
import * as am5 from "@amcharts/amcharts5";
import * as am5percent from "@amcharts/amcharts5/percent";
import * as am5hierarchy from "@amcharts/amcharts5/hierarchy";
import am5themes_Animated from '@amcharts/amcharts5/themes/Animated';
import am5themes_Material from '@amcharts/amcharts5/themes/Material';
import am5themes_Responsive from '@amcharts/amcharts5/themes/Responsive';

export default {
    props: ['chart_type', 'time_limit'],
    data() {
        return {
            pie_type: 'pie',
            genreData: null,
            genreData10: null,
            artist_info: null,
            artist_info10: null,
            accessToken: localStorage.getItem('access_token'),
        };
    },
    methods: {
        // generateBubbleChart() {
        //     const data = this.genreData10.map(d => ({ name: d[0], value: d[1], size: d[1] }));
        //     // Crear el contenedor del gráfico
        //     const svg = d3.select(this.$refs.bubblechartd3)
        //         .append("svg")
        //         .attr("width", 400)
        //         .attr("height", 400)
        //         .style("background-color", "white")
        //         .style("border-radius", "50%")
        //         .style("border", "1px solid black")
        //         .style("box-shadow", "0 0 10px rgba(0, 0, 0, 0.2)")
        //         .style("margin", "0 auto")
        //         .style("display", "block")
        //         .style("overflow", "visible")
        //         .style("position", "relative")
        //         .style("padding", "10px")
        //         .style("box-sizing", "border-box");
        //     // Crear una escala para el tamaño de las burbujas
        //     const sizeScale = d3.scaleLinear()
        //         .domain([0, d3.max(data, d => d.size)])
        //         .range([5, 30]);
        //     // Crear el paquete de burbujas
        //     const pack = d3.pack()
        //         .size([350, 350])
        //         .padding(1);
        //     // Calcular los nodos del paquete de burbujas
        //     const root = d3.hierarchy({ children: data })
        //         .sum(d => d.value);
        //     const nodes = pack(root).descendants();
        //     const colorScale = scaleOrdinal()
        //         .domain([0, nodes.length]) // Dominio de la escala
        //         .range([0, 1]) // Rango de la escala
        //         .range(nodes.map((d, i) => interpolateSinebow(i / nodes.length))); // Mapear los colores utilizando interpolateSinebow
        //     // Dibujar las burbujas
        //     svg.selectAll(".bubble")
        //         .data(nodes)
        //         .enter()
        //         .append("circle")
        //         .attr("class", "bubble")
        //         .attr("cx", d => d.x)
        //         .attr("cy", d => d.y)
        //         .attr("r", d => d.r)
        //         .style("fill", (d, i) => colorScale(i)) // Cambia el color de las burbujas
        //         .style("stroke", "black") // Cambia el color del borde de las burbujas
        //         .style("stroke-width", 2) // Cambia el grosor del borde de las burbujas
        //         .style("filter", "drop-shadow(2px 2px 4px rgba(0, 0, 0, 0.4))") // Agrega una sombra a las burbujas
        //     // Agregar etiquetas a las burbujas
        //     svg.selectAll(".label")
        //         .data(nodes)
        //         .enter()
        //         .append("text")
        //         .attr("class", "label")
        //         .attr("x", d => d.x)
        //         .attr("y", d => d.y)
        //         .attr("dy", "0.3em")
        //         .style("width", "20px")
        //         .style("text-anchor", "middle")
        //         .style("font-size", d => d.data.value * 7 + "px")
        //         .style("font-family", "sans-serif")
        //         .style("font-weight", "bold")
        //         .style("white-space", "pre-wrap")
        //         .style("word-break", "break-all")
        //         .style("fill", (d, i) => colorScale(i))
        //         .style("text-shadow", "1px 1px 1px #000, -1px -1px 1px #000, 1px -1px 1px #000, -1px 1px 1px #000")
        //         .text(d => d.data.name)
        //         .on("mouseover", function (d) {
        //             d3.select(this)
        //                 .transition()
        //                 .duration(200)
        //                 .style("font-size", d => d.data.value * 9 + "px")
        //                 .style("ease-in-out")
        //         })
        //         .on('mouseout', function (d) {
        //             d3.select(this)
        //                 .transition()
        //                 .duration(200)
        //                 .style("font-size", d => d.data.value * 7 + "px")
        //                 .style("ease-in-out")
        //         });
        // },
        generateGenreData(topArtists) {
            const genreCounts = {};
            topArtists.forEach((artist) => {
                artist.genres.forEach((genre) => {
                    genreCounts[genre] ? genreCounts[genre]++ : genreCounts[genre] = 1;
                });
            });
            let genreData = [];
            for (const genre in genreCounts) {
                genreData.push([genre, genreCounts[genre]]);
            }
            // Ordenar por cantidad de reproducciones
            genreData.sort((a, b) => b[1] - a[1]);
            // Hacer una copia de los datos
            if (genreData.length > 10) {
                this.genreData10 = genreData.slice(0, 10);
            } else {
                this.genreData10 = genreData;
            }
            // Aleatorizar orden de los datos
            this.genreData = genreData.sort(() => Math.random() - 0.5);
            const data_chart = [
                { value: this.genreData[0][1], category: this.genreData[0][0] },
                { value: this.genreData[1][1], category: this.genreData[1][0] },
                { value: this.genreData[2][1], category: this.genreData[2][0] },
                { value: this.genreData[3][1], category: this.genreData[3][0] },
                { value: this.genreData[4][1], category: this.genreData[4][0] },
                { value: this.genreData[5][1], category: this.genreData[5][0] },
                { value: this.genreData[6][1], category: this.genreData[6][0] },
                { value: this.genreData[7][1], category: this.genreData[7][0] },
                { value: this.genreData[8][1], category: this.genreData[8][0] },
                { value: this.genreData[9][1], category: this.genreData[9][0] },
                { value: this.genreData[10][1], category: this.genreData[10][0] },
            ];
            if (this.chart_type == 'bubble') {
                this.am5_bubble_v1(data_chart);
            } else {
                this.am5_pie_v1(data_chart);
                this.am5_pie_v2(data_chart);
                this.am5_pie_v3(data_chart);
            }
        },
        getTopArtist() {
            this.genreData = null;
            const headers = {
                Authorization: 'Bearer ' + this.accessToken
            };
            return axios.get('https://api.spotify.com/v1/me/top/artists?time_range=' + this.time_limit, { headers })
                .then(response => {
                    const topArtists = response.data.items;
                    // Hacer una copia de los datos
                    if (topArtists.length > 10) {
                        this.artist_info10 = topArtists.slice(0, 10);
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
                });
        },
        am5_pie_v1(data_pie) {
            am5.ready(function () {
                var root = am5.Root.new("chartdiv_1");
                root.setThemes([
                    am5themes_Animated.new(root),
                    am5themes_Responsive.new(root),
                    am5themes_Material.new(root),
                ]);
                var chart = root.container.children.push(am5percent.PieChart.new(root, {
                    layout: root.verticalLayout
                }));
                var series = chart.series.push(am5percent.PieSeries.new(root, {
                    valueField: "value",
                    categoryField: "category"
                }));
                series.labels.template.setAll({ fill: am5.color("#ededed") });
                series.ticks.template.setAll({ fill: am5.color("#ededed"), stroke: am5.color("#ededed") });
                series.data.setAll(data_pie);
                var legend = chart.children.push(am5.Legend.new(root, {
                    centerX: am5.percent(50),
                    x: am5.percent(50),
                    marginTop: 15,
                    marginBottom: 15
                }));
                // Cambiar el color de todas las leyendas a blanco
                legend.labels.template.setAll({ fill: am5.color("#fff") });
                legend.data.setAll(series.dataItems);
                series.appear(1000, 100);
            });
        },
        am5_pie_v2(data_pie) {
            am5.ready(function () {
                var root = am5.Root.new("chartdiv_2");
                root.setThemes([
                    am5themes_Animated.new(root),
                    am5themes_Responsive.new(root),
                    am5themes_Material.new(root),
                ]);
                var chart = root.container.children.push(am5percent.PieChart.new(root, {
                    layout: root.verticalLayout
                }));
                var series = chart.series.push(am5percent.PieSeries.new(root, {
                    alignLabels: true,
                    calculateAggregates: true,
                    valueField: "value",
                    categoryField: "category"
                }));
                series.slices.template.setAll({
                    strokeWidth: 3,
                    stroke: am5.color(0xffffff)
                });
                series.labelsContainer.set("paddingTop", 30)
                series.slices.template.adapters.add("radius", function (radius, target) {
                    var dataItem = target.dataItem;
                    var high = series.getPrivate("valueHigh");
                    if (dataItem) {
                        var value = target.dataItem.get("valueWorking", 0);
                        return radius * value / high
                    }
                    return radius;
                });
                series.labels.template.setAll({ fill: am5.color("#ededed") });

                series.ticks.template.setAll({ fill: am5.color("#ededed"), stroke: am5.color("#ededed") });
                series.data.setAll(data_pie);
                var legend = chart.children.push(am5.Legend.new(root, {
                    centerX: am5.p50,
                    x: am5.p50,
                    marginTop: 15,
                    marginBottom: 15
                }));
                // Cambiar el color de todas las leyendas a blanco
                legend.labels.template.setAll({ fill: am5.color("#fff") });
                legend.data.setAll(series.dataItems);
                series.appear(1000, 100);
            });
        },
        am5_pie_v3(data_pie) {
            am5.ready(function () {
                var root = am5.Root.new("chartdiv_3");
                root.setThemes([
                    am5themes_Animated.new(root),
                    am5themes_Responsive.new(root),
                    am5themes_Material.new(root),
                ]);
                var chart = root.container.children.push(
                    am5percent.PieChart.new(root, {
                        endAngle: 270,
                        layout: root.verticalLayout,
                        innerRadius: am5.percent(60)
                    })
                );
                /*
                var bg = root.container.set("background", am5.Rectangle.new(root, {
                  fillPattern: am5.GrainPattern.new(root, {
                    density: 0.1,
                    maxOpacity: 0.2
                  })
                }))
                */
                var series = chart.series.push(
                    am5percent.PieSeries.new(root, {
                        valueField: "value",
                        categoryField: "category",
                        endAngle: 270
                    })
                );
                var gradient = am5.RadialGradient.new(root, {
                    stops: [
                        { color: am5.color(0x000000) },
                        { color: am5.color(0x000000) },
                        {}
                    ]
                })
                series.slices.template.setAll({
                    fillGradient: gradient,
                    strokeWidth: 2,
                    stroke: am5.color(0xffffff),
                    cornerRadius: 10,
                    shadowOpacity: 0.1,
                    shadowOffsetX: 2,
                    shadowOffsetY: 2,
                    shadowColor: am5.color(0x000000),
                    fillPattern: am5.GrainPattern.new(root, {
                        maxOpacity: 0.2,
                        density: 0.5,
                        colors: [am5.color(0x000000)]
                    })
                })
                series.slices.template.states.create("hover", {
                    shadowOpacity: 1,
                    shadowBlur: 10
                })
                series.ticks.template.setAll({
                    strokeOpacity: 0.4,
                    strokeDasharray: [2, 2]
                })
                series.states.create("hidden", {
                    endAngle: -90
                });
                series.labels.template.setAll({ fill: am5.color("#ededed") });
                series.ticks.template.setAll({ fill: am5.color("#ededed"), stroke: am5.color("#ededed") });
                series.data.setAll(data_pie);

                var legend = chart.children.push(am5.Legend.new(root, {
                    centerX: am5.percent(50),
                    x: am5.percent(50),
                    marginTop: 15,
                    marginBottom: 15,
                }));
                legend.markerRectangles.template.adapters.add("fillGradient", function () {
                    return undefined;
                })
                // Cambiar el color de todas las leyendas a blanco
                legend.labels.template.setAll({ fill: am5.color("#fff") });
                legend.data.setAll(series.dataItems);
                series.appear(1000, 100);
            });
        },
        am5_bubble_v1(data_bubble) {
            am5.ready(function () {
                var root = am5.Root.new("chartdiv_4");
                root.setThemes([
                    am5themes_Animated.new(root),
                    am5themes_Material.new(root),
                ]);
                var container = root.container.children.push(am5.Container.new(root, {
                    width: am5.percent(100),
                    height: am5.percent(100),
                    layout: root.verticalLayout
                }));
                var series = container.children.push(am5hierarchy.Pack.new(root, {
                    topDepth: 1,
                    valueField: "value",
                    categoryField: "category",
                    childDataField: "children",
                }));

                series.circles.template.setAll({
                    fillOpacity: 0.9,
                    strokeWidth: 2,
                    strokeOpacity: 3
                });

                var data = {
                    name: "Root",
                    children: data_bubble,
                };
                series.data.setAll([data]);
                series.appear(1000, 100);

            });
        },

    },
    created() {
        this.getTopArtist();
    },
};

</script>

<style>
#chartdiv_1 {
    width: 100%;
    height: 500px;
}

#chartdiv_2 {
    width: 100%;
    height: 500px;
}

#chartdiv_3 {
    width: 100%;
    height: 500px;
}

#chartdiv_4 {
    width: 100%;
    height: 500px;
}

.fade-enter-active,
.fade-leave-active {
    transition: opacity .5s
}

.fade-enter,
.fade-leave-to

/* .fade-leave-active below version 2.1.8 */
    {
    opacity: 0
}
</style>