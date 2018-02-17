<template>
    <form id="sign-in-view" class="col container" @submit.prevent="doLogin">
        <div class="row">
            <div class="input-field col s12">
            <input id="email" type="email" class="validate" v-model="email">
            <label for="email">Email</label>
            </div>
        </div>
        <div class="row">
            <div class="input-field col s12">
            <input id="password" type="password" class="validate" v-model="password">
            <label for="password">Password</label>
            </div>
        </div>
        <button type="submit" class="waves-effect waves-light btn">LOGIN</button>
    </form>
</template>

<script>
export default {
    name: 'signInView',
    data() {
        return {
            email: '',
            password: ''
        }
    },
    methods: {
        doLogin() {
            Api.post('/me/login', {
		        email: this.email,
		        password: this.password,
		        deviceId: 'web:' // TODO: Generate UUID
            }).then(res => {
                if(res.status == 404) {
                    throw "Deine E-Mailaddresse existiert nicht";
                }
                if(res.status == 405) {
                    throw "Dein Passwort stimmt nicht";
                }

                return res.json();
            }).then(token => {
                Cache.set(App.CACHE.TOKEN, token, token.expires - Date.now() / 1000);
                this.$emit('loggedInStateChange');
            }).catch(console.log);
        }
    }
}
</script>

<style>

</style>
