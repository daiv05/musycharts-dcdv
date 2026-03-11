<template>
  <div class="w-auto h-auto flex justify-center">
    <input @change="toggle_check()" type="checkbox" id="darkmode-toggle" />
    <label for="darkmode-toggle">
      <svg class="artist" viewBox="0 0 14 14">
        <path
          fill="#fff"
          fill-rule="evenodd"
          d="M5.135 5.832c1.77 0 2.766-.995 2.766-2.766S6.905.3 5.135.3s-2.766.996-2.766 2.766s.995 2.766 2.766 2.766m5.167.932a.75.75 0 0 0-.75.75v2.636a3 3 0 0 0-.283-.014c-1.14 0-1.782.641-1.782 1.782c0 1.14.641 1.782 1.782 1.782c1.14 0 1.782-.642 1.782-1.782q0-.054-.002-.107l.003-.06V8.365a1.86 1.86 0 0 1 1.242 1.654q.005.115.005.22a.75.75 0 0 0 1.5 0q0-.142-.007-.286c-.076-1.744-1.527-3.162-3.276-3.188zm-5.164.058a7.4 7.4 0 0 1 3.164.703V9.01a2.75 2.75 0 0 0-1.236.705c-.459.46-.7 1.036-.79 1.64H2.362c-.912 0-1.667-.49-1.993-1.168a1.6 1.6 0 0 1-.112-1.124c.107-.391.366-.736.757-.996a7.4 7.4 0 0 1 4.125-1.245Z"
          clip-rule="evenodd"
        />
      </svg>
      <svg class="track" viewBox="0 0 14 14">
        <path
          fill="#fff"
          fill-rule="evenodd"
          d="M4.471.726C4.25-.246 2.863-.24 2.651.734c-.213.97-.938 1.713-1.89 1.879c-1.015.176-1.015 1.635 0 1.811c.952.166 1.677.909 1.89 1.88c.212.973 1.599.98 1.82.007c.223-.977.944-1.719 1.9-1.885c1.018-.177 1.018-1.638 0-1.815c-.956-.166-1.677-.908-1.9-1.885m-2.51 2.793a3.6 3.6 0 0 0 1.603-1.64a3.63 3.63 0 0 0 1.61 1.64a3.63 3.63 0 0 0-1.61 1.639a3.6 3.6 0 0 0-1.603-1.64m.401 3.78a.625.625 0 1 0-1.25 0v.487H.625a.625.625 0 1 0 0 1.25h.487v.488a.625.625 0 0 0 1.25 0v-.488h.488a.625.625 0 0 0 0-1.25h-.488zm2.22 2.457a2.122 2.122 0 1 0 2.119 1.993V7.763l6.049-1.68v1.83A2.122 2.122 0 1 0 14 9.723v-6.36a1.04 1.04 0 0 0-.402-.816a1.03 1.03 0 0 0-.899-.179l-.004.001l-3.851 1.085l-.718.205c-.055.805-.584 1.578-1.587 1.752c-.508.088-.938.48-1.088 1.09v3.44a2.1 2.1 0 0 0-.869-.185"
          clip-rule="evenodd"
        />
      </svg>
    </label>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";

const emit = defineEmits(["change"]);

const check = ref(0);

const storedToggle = localStorage.getItem("toggle_genre");
check.value = storedToggle === null ? 0 : Number(storedToggle);
localStorage.setItem("toggle_genre", check.value);

onMounted(() => {
  const el = document.getElementById("darkmode-toggle");
  if (el) {
    el.checked = check.value === 1;
  }
});

function toggle_check() {
  check.value = localStorage.getItem("toggle_genre") == 1 ? 0 : 1;
  localStorage.setItem("toggle_genre", check.value);
  console.log("toggle", check.value);
  emit("change", check.value);
}
</script>

<style>
label {
  width: 100px;
  height: 40px;
  position: relative;
  display: block;
  background: #006283;
  border-radius: 40px;
  cursor: pointer;
  transition: background-color 0.3s;
}

label:after {
  content: "";
  width: 36px;
  height: 36px;
  position: absolute;
  top: 2px;
  left: 2px;
  background: #00b0eb;
  border-radius: 36px;
  transition: all 0.3s;
}

input {
  width: 0;
  height: 0;
  visibility: hidden;
}

input:checked + label {
  background: #9b334d;
}

input:checked + label:after {
  left: 98px;
  transform: translateX(-100%);
  background: #ff547f;
}

label:active:after {
  width: 52px;
}

.background {
  width: 100vw;
  height: 100vh;
  background: #fff;
  z-index: -1;
  position: absolute;
  transition: 0.3s;
}

label svg {
  position: absolute;
  width: 20px;
  top: 10px;
  z-index: 100;
}

label svg.artist {
  left: 10px;
  fill: #fff;
  transition: 0.3s;
}

label svg.track {
  left: 71px;
  fill: #7e7e7e;
  transition: 0.3s;
}

input:checked + label svg.artist {
  fill: #7e7e7e;
}

input:checked + label svg.track {
  fill: #fff;
}
</style>
