<template>
  <BackButton />
  <div class="md:flex bg-zinc-50 dark:bg-zinc-950 items-center h-full transition-colors duration-300">
    <!-- Grafico -->
    <div class="text-center md:w-2/3 pt-8 pb-8">
      <div>
        <p class="leading-6 font-bold text-xl text-center text-gray-900 dark:text-gray-100 transition-colors duration-300">{{ $t("detail.topGenres") }}</p>

        <!-- -->
        <!-- PIE CHARTS -->
        <!-- -->
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

        <!-- -->
        <!-- BUBBLE CHARTS -->
        <!-- -->
        <div v-if="chart_type == 'bubble'" class="flex justify-center">
          <div id="chartdiv_4"></div>
        </div>

        <!-- -->
        <!-- RADAR CHARTS -->
        <!-- -->
        <transition name="fade">
          <div v-if="chart_type == 'radar'" class="flex justify-center">
            <div id="chartdiv_5"></div>
          </div>
        </transition>

        <!-- -->
        <!-- GAUDE CHARTS -->
        <!-- -->
        <transition name="fade">
          <div v-if="chart_type == 'gauge'" class="flex justify-center">
            <div id="chartdiv_6"></div>
          </div>
        </transition>
      </div>

      <!-- -->
      <!-- PIE TYPES -->
      <!-- -->
      <transition name="fade">
        <select
          v-if="chart_type == 'pie'"
          v-model="pie_type"
          class="bg-white dark:bg-gray-950 text-gray-900 dark:text-white text-center text-sm font-semibold py-2 px-4 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:border-emerald-500 hover:border-gray-400 dark:hover:border-gray-500 transition-colors"
        >
          <option value="pie">{{ $t("detail.pieType.pie") }}</option>
          <option value="radius">{{ $t("detail.pieType.radius") }}</option>
          <option value="gradient">{{ $t("detail.pieType.gradient") }}</option>
        </select>
      </transition>
    </div>

    <!-- Lista artistas -->
    <transition v-if="is_track == 0" name="fade">
      <SpotifyList :items="artist_info10" :is-track="0" />
    </transition>

    <!-- Lista tracks -->
    <transition v-if="is_track == 1" name="fade">
      <SpotifyList :items="tracksData10" :is-track="1" />
    </transition>
  </div>

  <AppFooter />
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import AppFooter from "@/components/AppFooter.vue";
import BackButton from "@/components/BackButton.vue";
import SpotifyList from "@/components/SpotifyList.vue";
import * as am5 from "@amcharts/amcharts5";
import * as am5percent from "@amcharts/amcharts5/percent";
import * as am5hierarchy from "@amcharts/amcharts5/hierarchy";
import * as am5radar from "@amcharts/amcharts5/radar";
import * as am5xy from "@amcharts/amcharts5/xy";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";
import am5themes_Material from "@amcharts/amcharts5/themes/Material";
import am5themes_Responsive from "@amcharts/amcharts5/themes/Responsive";
import { useSpotify } from "@/composables/useSpotify.js";

const props = defineProps(["chart_type", "time_limit", "is_track"]);

const pie_type = ref("pie");
const radar_type = ref("histo");
const genreData = ref(null);
const genreData10 = ref(null);
const artist_info = ref(null);
const artist_info10 = ref(null);
const tracksData = ref(null);
const tracksData10 = ref(null);

const { getTopArtists, getTopTracks } = useSpotify();

function generateGenreData(topArtists) {
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
  let data = [];
  for (const genre in genreCounts) {
    data.push([genre, genreCounts[genre]]);
  }

  data.sort((a, b) => b[1] - a[1]);

  if (data.length > 10) {
    genreData10.value = data.slice(0, 9);
  } else {
    genreData10.value = data;
  }

  genreData.value = data;
  const data_chart = [];
  for (let i = 0; i < Math.min(10, genreData.value.length); i++) {
    data_chart.push({ value: genreData.value[i][1], category: genreData.value[i][0] });
  }

  if (props.chart_type == "bubble") {
    am5_bubble_v1(data_chart);
  } else if (props.chart_type == "pie") {
    am5_pie_v1(data_chart);
    am5_pie_v2(data_chart);
    am5_pie_v3(data_chart);
  } else if (props.chart_type == "radar") {
    am5_radar_v1(data_chart);
  } else {
    am5_gauge_v1(data_chart);
  }
}

async function fetchTopArtists() {
  genreData.value = null;
  try {
    const topArtists = await getTopArtists(props.time_limit);
    if (topArtists.length > 10) {
      artist_info10.value = topArtists.slice(0, 10);
    } else {
      artist_info10.value = topArtists;
    }
    generateGenreData(topArtists);
  } catch (error) {
    console.error("error en fetchTopArtists", error);
  }
}

async function fetchTopTracks() {
  tracksData.value = null;
  try {
    const topTracks = await getTopTracks(props.time_limit);
    if (topTracks.length > 10) {
      tracksData10.value = topTracks.slice(0, 10);
    } else {
      tracksData10.value = topTracks;
    }
  } catch (error) {
    console.error("error en fetchTopTracks", error);
  }
}
function am5_pie_v1(data_pie) {
  am5.ready(function () {
    if (am5.registry.rootElements.some((el) => el.dom.id === "chartdiv_1")) {
      am5.registry.rootElements.find((el) => el.dom.id === "chartdiv_1").dispose();
    }
    var root = am5.Root.new("chartdiv_1");
    root.setThemes([
      am5themes_Animated.new(root),
      am5themes_Responsive.new(root),
      am5themes_Material.new(root),
    ]);
    var chart = root.container.children.push(
      am5percent.PieChart.new(root, {
        layout: root.verticalLayout,
      }),
    );
    var series = chart.series.push(
      am5percent.PieSeries.new(root, {
        valueField: "value",
        categoryField: "category",
      }),
    );
    
    var textColor = document.documentElement.classList.contains("dark") ? am5.color("#fff") : am5.color("#111827");

    series.labels.template.setAll({ fill: textColor });
    series.ticks.template.setAll({ fill: textColor, stroke: textColor });
    series.data.setAll(data_pie);
    var legend = chart.children.push(
      am5.Legend.new(root, {
        centerX: am5.percent(50),
        x: am5.percent(50),
        marginTop: 15,
        marginBottom: 15,
      }),
    );
    // Cambiar el color de todas las leyendas
    legend.labels.template.setAll({ fill: textColor });
    legend.data.setAll(series.dataItems);
    series.appear(1000, 100);
  });
}
function am5_pie_v2(data_pie) {
  am5.ready(function () {
    if (am5.registry.rootElements.some((el) => el.dom.id === "chartdiv_2")) {
      am5.registry.rootElements.find((el) => el.dom.id === "chartdiv_2").dispose();
    }
    var root = am5.Root.new("chartdiv_2");
    root.setThemes([
      am5themes_Animated.new(root),
      am5themes_Responsive.new(root),
      am5themes_Material.new(root),
    ]);
    var chart = root.container.children.push(
      am5percent.PieChart.new(root, {
        layout: root.verticalLayout,
      }),
    );
    var series = chart.series.push(
      am5percent.PieSeries.new(root, {
        alignLabels: true,
        calculateAggregates: true,
        valueField: "value",
        categoryField: "category",
      }),
    );
    var textColor = document.documentElement.classList.contains("dark") ? am5.color("#fff") : am5.color("#111827");
    var strokeColor = document.documentElement.classList.contains("dark") ? am5.color("#09090b") : am5.color("#ffffff");

    series.slices.template.setAll({
      strokeWidth: 3,
      stroke: strokeColor,
    });
    series.labelsContainer.set("paddingTop", 30);
    series.slices.template.adapters.add("radius", function (radius, target) {
      var dataItem = target.dataItem;
      var high = series.getPrivate("valueHigh");
      if (dataItem) {
        var value = target.dataItem.get("valueWorking", 0);
        return (radius * value) / high;
      }
      return radius;
    });
    series.labels.template.setAll({ fill: textColor });

    series.ticks.template.setAll({ fill: textColor, stroke: textColor });
    series.data.setAll(data_pie);
    var legend = chart.children.push(
      am5.Legend.new(root, {
        centerX: am5.p50,
        x: am5.p50,
        marginTop: 15,
        marginBottom: 15,
      }),
    );
    // Cambiar el color de todas las leyendas
    legend.labels.template.setAll({ fill: textColor });
    legend.data.setAll(series.dataItems);
    series.appear(1000, 100);
  });
}
function am5_pie_v3(data_pie) {
  am5.ready(function () {
    if (am5.registry.rootElements.some((el) => el.dom.id === "chartdiv_3")) {
      am5.registry.rootElements.find((el) => el.dom.id === "chartdiv_3").dispose();
    }
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
        innerRadius: am5.percent(60),
      }),
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
        endAngle: 270,
      }),
    );
    var textColor = document.documentElement.classList.contains("dark") ? am5.color("#fff") : am5.color("#111827");
    var strokeColor = document.documentElement.classList.contains("dark") ? am5.color("#09090b") : am5.color("#ffffff");

    series.slices.template.setAll({
      strokeWidth: 2,
      stroke: strokeColor,
      cornerRadius: 10,
      fillPattern: am5.GrainPattern.new(root, {
        maxOpacity: 0.2,
        density: 0.5,
        colors: [am5.color(0x000000)],
      }),
    });
    series.slices.template.states.create("hover", {
      scale: 1.05,
    });
    series.ticks.template.setAll({
      strokeOpacity: 0.4,
      strokeDasharray: [2, 2],
    });
    series.states.create("hidden", {
      endAngle: -90,
    });
    series.labels.template.setAll({ fill: textColor });
    series.ticks.template.setAll({ fill: textColor, stroke: textColor });
    series.data.setAll(data_pie);

    var legend = chart.children.push(
      am5.Legend.new(root, {
        centerX: am5.percent(50),
        x: am5.percent(50),
        marginTop: 15,
        marginBottom: 15,
      }),
    );
    // Cambiar el color de todas las leyendas
    legend.labels.template.setAll({ fill: textColor });
    legend.data.setAll(series.dataItems);
    series.appear(1000, 100);
  });
}
function am5_bubble_v1(data_bubble) {
  am5.ready(function () {
    if (am5.registry.rootElements.some((el) => el.dom.id === "chartdiv_4")) {
      am5.registry.rootElements.find((el) => el.dom.id === "chartdiv_4").dispose();
    }
    var root = am5.Root.new("chartdiv_4");
    root.setThemes([am5themes_Animated.new(root), am5themes_Material.new(root)]);
    var container = root.container.children.push(
      am5.Container.new(root, {
        width: am5.percent(100),
        height: am5.percent(100),
        layout: root.verticalLayout,
      }),
    );
    var series = container.children.push(
      am5hierarchy.Pack.new(root, {
        topDepth: 1,
        valueField: "value",
        categoryField: "category",
        childDataField: "children",
      }),
    );

    series.circles.template.setAll({
      fillOpacity: 0.9,
      strokeWidth: 2,
      strokeOpacity: 3,
    });

    var data = {
      name: "Root",
      children: data_bubble,
    };
    series.data.setAll([data]);
    series.appear(1000, 100);
  });
}
function am5_radar_v1(data_radar) {
  am5.ready(function () {
    if (am5.registry.rootElements.some((el) => el.dom.id === "chartdiv_5")) {
      am5.registry.rootElements.find((el) => el.dom.id === "chartdiv_5").dispose();
    }
    var root = am5.Root.new("chartdiv_5");
    root.setThemes([am5themes_Animated.new(root), am5themes_Material.new(root)]);
    var chart = root.container.children.push(
      am5radar.RadarChart.new(root, {
        panX: false,
        panY: false,
        wheelX: "none",
        wheelY: "none",
        startAngle: -84,
        endAngle: 264,
        innerRadius: am5.percent(40),
      }),
    );
    const cursor = chart.set(
      "cursor",
      am5radar.RadarCursor.new(root, {
        behavior: "zoomX",
      }),
    );
    cursor.lineY.set("forceHidden", true);
    chart.set(
      "scrollbarX",
      am5.Scrollbar.new(root, {
        orientation: "horizontal",
        exportable: false,
      }),
    );
    var textColor = document.documentElement.classList.contains("dark") ? am5.color("#fff") : am5.color("#111827");

    var xRenderer = am5radar.AxisRendererCircular.new(root, {
      minGridDistance: 30,
    });
    xRenderer.grid.template.set("forceHidden", true);
    xRenderer.labels.template.set("fill", textColor);
    var xAxis = chart.xAxes.push(
      am5xy.CategoryAxis.new(root, {
        maxDeviation: 0,
        categoryField: "category",
        renderer: xRenderer,
      }),
    );
    var yRenderer = am5radar.AxisRendererRadial.new(root, {});
    yRenderer.labels.template.set("centerX", am5.p50);
    yRenderer.labels.template.set("fill", textColor);
    var yAxis = chart.yAxes.push(
      am5xy.ValueAxis.new(root, {
        maxDeviation: 0.3,
        min: 0,
        renderer: yRenderer,
      }),
    );
    var series = chart.series.push(
      am5radar.RadarColumnSeries.new(root, {
        name: "Series 1",
        sequencedInterpolation: true,
        xAxis: xAxis,
        yAxis: yAxis,
        valueYField: "value",
        categoryXField: "category",
      }),
    );
    // Rounded corners for columns
    series.columns.template.setAll({
      cornerRadius: 5,
      tooltipText: "{categoryX}: {valueY}",
    });
    // Make each column to be of a different color
    series.columns.template.adapters.add("fill", function (fill, target) {
      return chart.get("colors").getIndex(series.columns.indexOf(target));
    });
    series.columns.template.adapters.add("stroke", function (stroke, target) {
      return chart.get("colors").getIndex(series.columns.indexOf(target));
    });

    var data = data_radar;
    xAxis.data.setAll(data);
    series.data.setAll(data);
    series.appear(1000);
    chart.appear(1000, 100);
  });
}
function am5_gauge_v1(data_gauge) {
  am5.ready(function () {
    if (am5.registry.rootElements.some((el) => el.dom.id === "chartdiv_6")) {
      am5.registry.rootElements.find((el) => el.dom.id === "chartdiv_6").dispose();
    }
    var root = am5.Root.new("chartdiv_6");
    root.setThemes([am5themes_Animated.new(root), am5themes_Material.new(root)]);
    var chart = root.container.children.push(
      am5radar.RadarChart.new(root, {
        panX: false,
        panY: false,
        wheelX: "panX",
        wheelY: "zoomX",
        innerRadius: am5.percent(40),
        startAngle: -90,
        endAngle: 180,
      }),
    );

    // Suma de todos los valores
    var sum = 0;
    data_gauge.forEach((element) => {
      sum += element.value;
    });

    // Recorrer data_gauge y agregar propiedades de full, columnSettings.
    var i = 0;
    data_gauge.forEach((element, index) => {
      // Obtener porcentaje respecto a los demas elementos a partir del value
      console.log(sum + " / " + element.value);
      element.value = Number(((element.value / sum) * 100).toFixed(2));
      element.full = 100;
      element.columnSettings = {
        fill: chart.get("colors").getIndex(i++),
      };
    });

    console.log(data_gauge);

    // Data
    var data = data_gauge;

    var textColor = document.documentElement.classList.contains("dark") ? am5.color("#fff") : am5.color("#111827");

    var cursor = chart.set(
      "cursor",
      am5radar.RadarCursor.new(root, {
        behavior: "zoomX",
      }),
    );

    cursor.lineY.set("visible", false);

    var xRenderer = am5radar.AxisRendererCircular.new(root, {
      minGridDistance: 50,
    });

    xRenderer.labels.template.setAll({
      radius: 10,
      fill: textColor,
    });

    xRenderer.grid.template.setAll({
      forceHidden: true,
    });

    var xAxis = chart.xAxes.push(
      am5xy.ValueAxis.new(root, {
        renderer: xRenderer,
        min: 0,
        max: 100,
        strictMinMax: true,
        numberFormat: "#'%'",
        tooltip: am5.Tooltip.new(root, {}),
      }),
    );

    var yRenderer = am5radar.AxisRendererRadial.new(root, {
      minGridDistance: 20,
    });

    yRenderer.labels.template.setAll({
      centerX: am5.p100,
      fontWeight: "400",
      fontSize: 15,
      templateField: "columnSettings",
      fill: textColor,
    });

    yRenderer.grid.template.setAll({
      forceHidden: true,
    });

    var yAxis = chart.yAxes.push(
      am5xy.CategoryAxis.new(root, {
        categoryField: "category",
        renderer: yRenderer,
      }),
    );

    yAxis.data.setAll(data);

    var series1 = chart.series.push(
      am5radar.RadarColumnSeries.new(root, {
        xAxis: xAxis,
        yAxis: yAxis,
        clustered: false,
        valueXField: "full",
        categoryYField: "category",
        fill: root.interfaceColors.get("alternativeBackground"),
      }),
    );

    series1.columns.template.setAll({
      width: am5.p100,
      fillOpacity: 0.08,
      strokeOpacity: 0,
      cornerRadius: 20,
    });

    series1.data.setAll(data);

    var series2 = chart.series.push(
      am5radar.RadarColumnSeries.new(root, {
        xAxis: xAxis,
        yAxis: yAxis,
        clustered: false,
        valueXField: "value",
        categoryYField: "category",
      }),
    );

    series2.columns.template.setAll({
      width: am5.p100,
      strokeOpacity: 0,
      tooltipText: "{category}: {valueX}%",
      cornerRadius: 20,
      templateField: "columnSettings",
    });

    series2.data.setAll(data);

    series1.appear(1000);
    series2.appear(1000);
    chart.appear(1000, 100);
  });
}

onMounted(() => {
  fetchTopArtists();
  fetchTopTracks();

  // Watch for theme changes (dark class on document.documentElement)
  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      if (mutation.attributeName === 'class') {
        // Re-generate chart if artist data is already loaded and we are not in track list mode
        if (artist_info10.value && props.is_track == 0) {
          // Add a tiny delay to allow the CSS to paint first, then re-render chart
          setTimeout(() => generateGenreData(artist_info10.value), 50);
        }
      }
    });
  });

  observer.observe(document.documentElement, { attributes: true });
});
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

#chartdiv_5 {
  width: 100%;
  height: 500px;
}

#chartdiv_6 {
  width: 100%;
  height: 500px;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.9s;
}

.fade-enter,
.fade-leave-to

/* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
