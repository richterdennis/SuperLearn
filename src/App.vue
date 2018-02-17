<template>
    <div id="app">
        <div class="splashscreen" v-if="currentView == VIEWS.NONE"></div>
        <main-view v-if="currentView == VIEWS.MAIN" @loggedInStateChange="onLoggedInStateChange(false)"></main-view>
        <sign-view v-if="currentView == VIEWS.LOGIN" @loggedInStateChange="onLoggedInStateChange(true)"></sign-view>
    </div>
</template>

<script>
import MainView from "./components/MainView.vue";
import SignView from "./components/SignView.vue";

const VIEWS = {
    NONE: 'none',
    MAIN: 'main',
    LOGIN: 'login'
}

export default {
    name: 'app',
    data() {
        return {
            VIEWS: VIEWS,
            currentView: VIEWS.NONE
        }
    },
    components: {
        MainView,
        SignView
    },
    methods: {
        onLoggedInStateChange(loggedIn) {
            this.currentView = loggedIn ? VIEWS.MAIN : VIEWS.LOGIN;
        }
    },
    mounted() {
        const token = Cache.get(App.CACHE.TOKEN);
        if(token == null) {
            this.currentView = VIEWS.LOGIN;
            return;
        }

        Api.get('/token/test/' + token.token)
            .then(res => {
                if(res.status == 200)
                    return true;
                
                throw 'Token is not valid';
            })
            .then(ok => {
                this.currentView = ok ? VIEWS.MAIN : VIEWS.LOGIN;
            })
            .catch(err => {
                this.currentView = VIEWS.LOGIN;
                console.log(err);
            });
    }
}
</script>
