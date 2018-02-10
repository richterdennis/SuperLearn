<template>
    <div id="app">
        <div class="splashscreen" v-if="currentView == 'none'"></div>
    </div>
</template>

<script>
import Vue from "vue";


const VIEWS = {
    NONE: 'none',
}

export default Vue.extend({
    name: 'app',
    data() {
        return {
            currentView: VIEWS.NONE
        }
    },
    components: {
    },
    mounted() {
    }
});
</script>
