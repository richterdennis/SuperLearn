<template>
    <div id="app">
        <div class="splashscreen" v-if="currentView == VIEWS.NONE"></div>
        <main-view v-if="currentView == VIEWS.MAIN" @loggedInStateChange="onLoggedInStateChange(false)"></main-view>
        <sign-view v-if="currentView == VIEWS.LOGIN" @loggedInStateChange="onLoggedInStateChange(true)"></sign-view>
        <template v-for="childView in childViews">
            <component :is="childView" :key="childView.name" @close="removeChildView(childView)"></component>
        </template>
    </div>
</template>

<script>
import { TokenRouter, UserRouter, ModuleRouter  } from './classes/Router.js';

import MainView from "./views/MainView.vue";
import SignView from "./views/SignView.vue";

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
            currentView: VIEWS.NONE,
            childViews: []
        }
    },
    components: {
        MainView,
        SignView
    },
    methods: {
        onLoggedInStateChange(loggedIn) {
            this.currentView = loggedIn ? VIEWS.MAIN : VIEWS.LOGIN;
        },
        removeChildView(view) {
            const index = this.childViews.indexOf(view);
            this.childViews.splice(index, 1);
            this.$forceUpdate();
        }
    },
    mounted() {
        App.startView = (view) => {
            this.childViews.push(view);
            this.$forceUpdate();
        }

        Cache.load();

        const token = Cache.get(App.CACHE.TOKEN);
        if(token == null) {
            this.currentView = VIEWS.LOGIN;
            return;
        }

        TokenRouter.testToken(token.token).then(() => {
            if(token.expires - Date.now() / 1000 < 30 * Cache.DAY) {
                return TokenRouter.updateToken(token.token);
            }
        }).then(() => {
            return Promise.all([
                ModuleRouter.getModules(),
                UserRouter.getMe()
            ]);
        }).then(() => {
            this.currentView = VIEWS.MAIN;
        }).catch(err => {
            this.currentView = VIEWS.LOGIN;
            console.error(err);
        });
    }
}
</script>
