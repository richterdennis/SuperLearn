<template>
    <div id="sign-view">
        <sign-in-view @loggedInStateChange="onLoggedInStateChange"></sign-in-view>
    </div>
</template>

<script>
import SignInView from "./SignInView.vue";

export default {
    name: 'signView',
    components: {
        SignInView
    },
    methods: {
        onLoggedInStateChange() {
            this.$emit('loggedInStateChange');
        }
    }
}
</script>
