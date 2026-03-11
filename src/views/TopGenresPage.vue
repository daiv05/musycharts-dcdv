<template>
  <BackButton />
  <div
    class="md:flex bg-zinc-50 dark:bg-zinc-950 items-center h-full transition-colors duration-300"
  >
    <!-- Grafico -->
    <div class="text-center md:w-2/3 pt-8 pb-8">
      <div>
        <p
          class="leading-6 font-bold text-xl text-center text-gray-900 dark:text-gray-100 transition-colors duration-300"
        >
          {{ $t("detail.topGenres") }}
        </p>
        <!-- PIE CHARTS -->
        <div v-show="chart_type == 'pie'">
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
        <!-- BUBBLE CHARTS -->
        <transition name="fade">
          <div v-show="chart_type == 'bubble'" class="flex justify-center">
            <div id="chartdiv_4"></div>
          </div>
        </transition>
        <!-- RADAR CHARTS -->
        <transition name="fade">
          <div v-show="chart_type == 'radar'" class="flex justify-center">
            <div id="chartdiv_5"></div>
          </div>
        </transition>
        <!-- GAUGE CHARTS -->
        <transition name="fade">
          <div v-show="chart_type == 'gauge'" class="flex justify-center">
            <div id="chartdiv_6"></div>
          </div>
        </transition>
      </div>
      <!-- PIE TYPES -->
      <transition name="fade">
        <select
          v-show="chart_type == 'pie'"
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
import { ref, onMounted, onBeforeUnmount, watch, nextTick } from "vue";
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
import am5themes_Dark from "@amcharts/amcharts5/themes/Dark";
import { useSpotify } from "@/composables/useSpotify.js";

const props = defineProps(["chart_type", "time_limit", "is_track"]);

let themeObserver = null;

const pie_type = ref("pie");
const radar_type = ref("histo");
const genreData = ref(null);
const genreData10 = ref(null);
const artist_info = ref(null);
const artist_info10 = ref(null);
const tracksData = ref(null);
const tracksData10 = ref(null);

const { getTopArtists, getTopTracks } = useSpotify();

function disposeAllCharts() {
  const roots = [...am5.registry.rootElements];
  roots.forEach((root) => {
    if (root.dom.id.startsWith("chartdiv_")) {
      root.dispose();
    }
  });
}

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

  renderChart();
}

function renderChart() {
  if (!genreData.value) return;

  disposeAllCharts();

  const data_chart = [];
  for (let i = 0; i < Math.min(10, genreData.value.length); i++) {
    data_chart.push({ value: genreData.value[i][1], category: genreData.value[i][0] });
  }

  nextTick(() => {
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
  });
}

watch(
  () => props.chart_type,
  () => {
    renderChart();
  },
);

onBeforeUnmount(() => {
  disposeAllCharts();
});

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
    var themes = [am5themes_Animated.new(root), am5themes_Responsive.new(root)];
    if (document.documentElement.classList.contains("dark")) {
      themes.push(am5themes_Dark.new(root));
    }
    root.setThemes(themes);

    var chart = root.container.children.push(
      am5percent.PieChart.new(root, {
        layout: root.verticalLayout,
      }),
    );
    var series = chart.series.push(
      am5percent.PieSeries.new(root, {
        valueField: "value",
        categoryField: "category",
        alignLabels: true,
      }),
    );

    // Gradient fill for sleek look
    series.slices.template.set(
      "fillGradient",
      am5.RadialGradient.new(root, {
        stops: [{ brighten: -0.3 }, { brighten: 0.3 }],
      }),
    );
    series.slices.template.setAll({
      stroke: root.interfaceColors.get("background"),
      strokeWidth: 2,
      strokeOpacity: 1,
      cornerRadius: 4,
    });

    series.slices.template.states.create("hover", {
      scale: 1.05,
    });

    series.data.setAll(data_pie);
    var legend = chart.children.push(
      am5.Legend.new(root, {
        centerX: am5.percent(50),
        x: am5.percent(50),
        marginTop: 15,
        marginBottom: 15,
      }),
    );
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
    var themes = [am5themes_Animated.new(root), am5themes_Responsive.new(root)];
    if (document.documentElement.classList.contains("dark")) {
      themes.push(am5themes_Dark.new(root));
    }
    root.setThemes(themes);

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

    series.slices.template.setAll({
      strokeWidth: 3,
      stroke: root.interfaceColors.get("background"),
      cornerRadius: 6,
    });
    series.labelsContainer.set("paddingTop", 30);
    series.slices.template.adapters.add("radius", function (radius, target) {
      if (!target.dataItem) return radius;
      var dataItem = target.dataItem;
      var high = series.getPrivate("valueHigh");
      if (dataItem) {
        var value = target.dataItem.get("valueWorking", 0);
        return (radius * value) / high;
      }
      return radius;
    });

    // Add depth drop shadow to the variable radius slices
    series.slices.template.set("shadowColor", am5.color(0x000000));
    series.slices.template.set("shadowBlur", 10);
    series.slices.template.set("shadowOffsetX", 0);
    series.slices.template.set("shadowOffsetY", 5);
    series.slices.template.set("shadowOpacity", 0.4);

    series.slices.template.states.create("hover", {
      scale: 1.05,
    });

    series.data.setAll(data_pie);
    var legend = chart.children.push(
      am5.Legend.new(root, {
        centerX: am5.p50,
        x: am5.p50,
        marginTop: 15,
        marginBottom: 15,
      }),
    );
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
    var themes = [am5themes_Animated.new(root), am5themes_Responsive.new(root)];
    if (document.documentElement.classList.contains("dark")) {
      themes.push(am5themes_Dark.new(root));
    }
    root.setThemes(themes);

    var chart = root.container.children.push(
      am5percent.PieChart.new(root, {
        endAngle: 270,
        layout: root.verticalLayout,
        innerRadius: am5.percent(60),
      }),
    );

    var series = chart.series.push(
      am5percent.PieSeries.new(root, {
        valueField: "value",
        categoryField: "category",
        endAngle: 270,
      }),
    );

    series.slices.template.setAll({
      strokeWidth: 2,
      stroke: root.interfaceColors.get("background"),
      cornerRadius: 15,
      fillGradient: am5.LinearGradient.new(root, {
        stops: [{ brighten: -0.4 }, { brighten: 0.1 }],
        rotation: 45,
      }),
    });

    series.slices.template.states.create("hover", {
      scale: 1.05,
      shiftRadius: 10,
    });
    series.ticks.template.setAll({
      strokeOpacity: 0.4,
      strokeDasharray: [2, 2],
    });
    series.states.create("hidden", {
      endAngle: -90,
    });

    series.data.setAll(data_pie);

    var legend = chart.children.push(
      am5.Legend.new(root, {
        centerX: am5.percent(50),
        x: am5.percent(50),
        marginTop: 15,
        marginBottom: 15,
      }),
    );
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
    var themes = [am5themes_Animated.new(root), am5themes_Responsive.new(root)];
    if (document.documentElement.classList.contains("dark")) {
      themes.push(am5themes_Dark.new(root));
    }
    root.setThemes(themes);

    var container = root.container.children.push(
      am5.Container.new(root, {
        width: am5.percent(100),
        height: am5.percent(100),
        layout: root.verticalLayout,
      }),
    );

    var series = container.children.push(
      am5hierarchy.Pack.new(root, {
        singleBranchOnly: false,
        downDepth: 1,
        initialDepth: 1,
        valueField: "value",
        categoryField: "category",
        childDataField: "children",
        nodePadding: 2,
      }),
    );

    series.nodes.template.setAll({
      tooltipText: "{category}: [bold]{value}[/]",
    });

    series.nodes.template.adapters.add("tooltipText", function (text, target) {
      if (target.dataItem && target.dataItem.get("depth") === 0) {
        return "";
      }
      return text;
    });

    series.circles.template.adapters.add("fillOpacity", function (opacity, target) {
      if (target.dataItem && target.dataItem.get("depth") === 0) {
        return 0.1; // semi-transparent wrapper
      }
      return 1;
    });

    series.circles.template.adapters.add("fillGradient", function (fillGradient, target) {
      if (target.dataItem && target.dataItem.get("depth") === 0) {
        return undefined; // no gradient for root
      }
      var color = root.interfaceColors.get("primaryButtonHover");
      var dataColor = target.dataItem ? target.dataItem.get("fill") : undefined;
      if (dataColor) {
        color = dataColor;
      }
      // Create a 3D sphere look with RadialGradient
      return am5.LinearGradient.new(root, {
        stops: [
          { color: am5.Color.brighten(color, 0.4) }, // bright center
          { color: color }, // base color
          { color: am5.Color.brighten(color, -0.4) }, // dark edge
        ],
      });
    });

    series.circles.template.adapters.add("fill", function (fill, target) {
      if (target.dataItem && target.dataItem.get("depth") === 0) {
        return root.interfaceColors.get("background"); // subtle background for wrapper
      }
      return fill;
    });

    series.circles.template.setAll({
      shadowBlur: 20,
      shadowOpacity: 0.8,
      shadowOffsetX: 0,
      shadowOffsetY: 0,
    });

    series.nodes.template.adapters.add("shadowOpacity", function (opacity, target) {
      if (target.dataItem && target.dataItem.get("depth") === 0) {
        return 0; // hide shadow for root wrapper
      }
      return opacity;
    });

    series.nodes.template.states.create("hover", {
      scale: 1.08,
    });

    // Hover effect: dim other nodes
    series.nodes.template.events.on("pointerover", function (e) {
      var hoveredNode = e.target.dataItem;
      // Loop through children of Root
      if (series.dataItems[0] && series.dataItems[0].get("children")) {
        am5.array.each(series.dataItems[0].get("children"), function (dataItem) {
          if (dataItem !== hoveredNode) {
            dataItem.get("node").animate({
              key: "opacity",
              to: 0.25,
              duration: 300,
              easing: am5.ease.out(am5.ease.cubic),
            });
          }
        });
      }
    });

    series.nodes.template.events.on("pointerout", function (e) {
      if (series.dataItems[0] && series.dataItems[0].get("children")) {
        am5.array.each(series.dataItems[0].get("children"), function (dataItem) {
          dataItem.get("node").animate({
            key: "opacity",
            to: 1,
            duration: 300,
            easing: am5.ease.out(am5.ease.cubic),
          });
        });
      }
    });

    series.labels.template.setAll({
      text: "[bold]{category}[/]",
      fill: am5.color(0xffffff),
      populateText: true,
      centerY: am5.percent(50),
      centerX: am5.percent(50),
      fontSize: 14,
      oversizedBehavior: "fit",
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
    var themes = [am5themes_Animated.new(root), am5themes_Responsive.new(root)];
    if (document.documentElement.classList.contains("dark")) {
      themes.push(am5themes_Dark.new(root));
    }
    root.setThemes(themes);

    var chart = root.container.children.push(
      am5radar.RadarChart.new(root, {
        panX: false,
        panY: false,
        wheelX: "none",
        wheelY: "none",
        startAngle: -84,
        endAngle: 264,
        innerRadius: am5.percent(30),
      }),
    );
    const cursor = chart.set(
      "cursor",
      am5radar.RadarCursor.new(root, {
        behavior: "zoomX",
      }),
    );
    cursor.lineY.set("forceHidden", true);

    var xRenderer = am5radar.AxisRendererCircular.new(root, {
      minGridDistance: 30,
    });
    xRenderer.grid.template.set("forceHidden", true);

    var xAxis = chart.xAxes.push(
      am5xy.CategoryAxis.new(root, {
        maxDeviation: 0,
        categoryField: "category",
        renderer: xRenderer,
      }),
    );

    var yRenderer = am5radar.AxisRendererRadial.new(root, {});
    yRenderer.labels.template.set("centerX", am5.p50);
    yRenderer.grid.template.set("strokeOpacity", 0.1);

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

    series.columns.template.setAll({
      cornerRadius: 15,
      tooltipText: "{categoryX}: {valueY}",
      strokeOpacity: 0,
    });

    series.columns.template.states.create("hover", {
      scale: 1.05,
    });

    series.columns.template.set(
      "fillGradient",
      am5.LinearGradient.new(root, {
        stops: [{ brighten: -0.4 }, { brighten: 0.1 }],
        rotation: 90,
      }),
    );

    series.columns.template.adapters.add("fill", function (fill, target) {
      return chart.get("colors").getIndex(series.columns.indexOf(target));
    });

    xAxis.data.setAll(data_radar);
    series.data.setAll(data_radar);
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
    var themes = [am5themes_Animated.new(root), am5themes_Responsive.new(root)];
    if (document.documentElement.classList.contains("dark")) {
      themes.push(am5themes_Dark.new(root));
    }
    root.setThemes(themes);

    var chart = root.container.children.push(
      am5radar.RadarChart.new(root, {
        panX: false,
        panY: false,
        wheelX: "none",
        wheelY: "none",
        innerRadius: am5.percent(40),
        startAngle: -90,
        endAngle: 180,
      }),
    );

    var sum = 0;
    data_gauge.forEach((element) => {
      sum += element.value;
    });

    var i = 0;
    var colors = chart.get("colors") || am5.ColorSet.new(root, {});
    data_gauge.forEach((element, index) => {
      element.value = Number(((element.value / sum) * 100).toFixed(2));
      element.full = 100;

      var color = colors.getIndex(i++);

      element.columnSettings = {
        fill: color,
      };
    });

    var cursor = chart.set(
      "cursor",
      am5radar.RadarCursor.new(root, {
        behavior: "none",
      }),
    );
    cursor.lineY.set("visible", false);
    cursor.lineX.set("visible", false);

    var xRenderer = am5radar.AxisRendererCircular.new(root, {
      minGridDistance: 50,
    });
    xRenderer.labels.template.setAll({
      radius: 10,
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
      fontWeight: "500",
      fontSize: 14,
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

    yAxis.data.setAll(data_gauge);

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
    series1.data.setAll(data_gauge);

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

    series2.columns.template.set(
      "fillGradient",
      am5.LinearGradient.new(root, {
        stops: [{ brighten: -0.4 }, { brighten: 0.1 }],
      }),
    );

    series2.columns.template.states.create("hover", {
      scale: 1.02,
    });

    series2.data.setAll(data_gauge);

    series1.appear(1000);
    series2.appear(1000);
    chart.appear(1000, 100);
  });
}

onMounted(() => {
  fetchTopArtists();
  fetchTopTracks();

  // Watch for theme changes (dark class on document.documentElement)
  themeObserver = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      if (mutation.attributeName === "class") {
        // Re-generate chart if artist data is already loaded and we are not in track list mode
        if (artist_info10.value && props.is_track == 0) {
          // Add a tiny delay to allow the CSS to paint first, then re-render chart
          setTimeout(() => generateGenreData(artist_info10.value), 50);
        }
      }
    });
  });

  themeObserver.observe(document.documentElement, { attributes: true });
});

onBeforeUnmount(() => {
  disposeAllCharts();
  if (themeObserver) {
    themeObserver.disconnect();
  }
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
