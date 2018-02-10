<template>
    <div id="app">
        <div class="splashscreen" v-if="currentView == 'none'"></div>
        <main-view v-if="currentView == 'main'"></main-view>
    </div>
</template>

<script>
import Vue from "vue";

import MainView from "./components/MainView.vue";

const VIEWS = {
    NONE: 'none',
    MAIN: 'main'
}

export default {
    name: 'app',
    data() {
        return {
            currentView: VIEWS.NONE
        }
    },
    components: {
        MainView
    },
    mounted() {
        setTimeout(() => this.currentView = VIEWS.MAIN, 100);
    }
}
</script>
