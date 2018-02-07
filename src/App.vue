<template>
    <div id="app">
        <div class="splashscreen"></div>
    </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
    name: 'app'
});
</script>

<style>
#app {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
}

.splashscreen {
    background: url('./assets/logo_font.png') no-repeat center;
    background-size: contain;
    
    position: absolute;
    top: 10%;
    left: 10%;
    width: 80%;
    height: 80%;
}
</style>
