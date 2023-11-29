<template>
    <div class="w-auto h-autoflex justify-center">
        <input type="checkbox" id="darkmode-toggle" />
        <label for="darkmode-toggle">
            <svg version="1.1" class="sun" style="enable-background:new 0 0 496 496;" id="_x32_"
                xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 512 512"
                xml:space="preserve" fill="#000000">
                <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
                <g id="SVGRepo_iconCarrier">
                    <g>
                        <rect x="432" y="24" class="st0" width="32" height="52"></rect>
                        <rect x="432" y="188" class="st0" width="32" height="300"></rect>
                        <rect x="384" y="100" class="st0" width="128" height="64"></rect>
                        <rect x="239.985" y="24" class="st0" width="32" height="276.641"></rect>
                        <rect x="239.985" y="412.641" class="st0" width="32" height="75.359"></rect>
                        <rect x="191.985" y="324.641" class="st0" width="128" height="64"></rect>
                        <rect x="48" y="308" class="st0" width="32" height="180"></rect>
                        <rect x="48" y="24" class="st0" width="32" height="172"></rect>
                        <rect y="220" class="st0" width="128" height="64"></rect>
                    </g>
                </g>
            </svg>
            <svg class="moon" style="enable-background:new 0 0 49.739 49.739;" version="1.1" id="_x32_" xmlns="http://www.w3.org/2000/svg"
                xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 512 512" xml:space="preserve" fill="#000000">
                <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
                <g id="SVGRepo_iconCarrier">
                    <g>
                        <path class="st0"
                            d="M135.288,43.144v85.309v248.423c-16.582-6.093-36.179-7.908-56.37-4.002 c-48.504,9.332-81.902,47.602-74.598,85.438c7.293,37.856,52.506,60.956,101,51.614c43.037-8.291,74.12-39.375,75.458-72.772h0.276 V189.293l281.875-30.914v177.509c-16.593-6.082-36.169-7.877-56.36-3.981c-48.515,9.32-81.891,47.592-74.62,85.437 c7.293,37.846,52.496,60.946,101.001,51.594c43.047-8.28,74.142-39.375,75.458-72.751h0.276v-308.7V0L135.288,43.144z M462.928,132.148l-281.875,30.913v-37.613L462.928,90.49V132.148z">
                        </path>
                    </g>
                </g>
            </svg>
        </label>
    </div>
</template>


<script>
export default {
    name: 'Toggle',
};

</script>

<style>
label {
    width: 100px;
    height: 40px;
    position: relative;
    display: block;
    background: #c8c8c8;
    border-radius: 40px;
    box-shadow: inset 0px 5px 15px rgba(0, 0, 0, 0.4), inset 0px -5px 15px rgba(255, 255, 255, 0.4);
    cursor: pointer;
    transition: 0.3s;
}

label:after {
    content: "";
    width: 36px;
    height: 36px;
    position: absolute;
    top: 2px;
    left: 2px;
    background: linear-gradient(180deg, #ffcc89, #d8860b);
    border-radius: 36px;
    box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.2);
    transition: 0.3s;
}

input {
    width: 0;
    height: 0;
    visibility: hidden;
}

input:checked+label {
    background: #242424;
}

input:checked+label:after {
    left: 98px;
    transform: translateX(-100%);
    background: linear-gradient(180deg, #777, #3a3a3a);
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

input:checked+label+.background {
    background: #242424;
}

label svg {
    position: absolute;
    width: 24px;
    top: 8px;
    z-index: 100;
}

label svg.sun {
    left: 8px;
    fill: #fff;
    transition: 0.3s;
}

label svg.moon {
    left: 68px;
    fill: #7e7e7e;
    transition: 0.3s;
}

input:checked+label svg.sun {
    fill: #7e7e7e;
}

input:checked+label svg.moon {
    fill: #fff;
}</style>