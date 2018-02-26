<template>
    <div id="sign-view">
        <sign-in-view @loggedInStateChange="onLoggedInStateChange"></sign-in-view>
        <hr>
        <sign-on-view @loggedInStateChange="onLoggedInStateChange"></sign-on-view>
    </div>
</template>

<script>
import SignInView from "./SignInView.vue";
import SignOnView from "./SignOnView.vue";

export default {
    name: 'signView',
    components: {
        SignInView,
        SignOnView
    },
    mounted() {
        // Clear user cache to prevent wrong data on user change
        Cache.remove(App.CACHE.TOKEN);
        Cache.remove(App.CACHE.USER_ME);
        Cache.remove(App.CACHE.MY_QUESTIONS);
        Cache.remove(App.CACHE.REPORTS);
    },
    methods: {
        onLoggedInStateChange() {
            this.$emit('loggedInStateChange');
        }
    }
}
</script>
