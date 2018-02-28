<template>
    <form id="sign-in-view" class="col container" @submit.prevent="doLogin">
        <div class="row">
            <div class="input-field col s12">
                <input id="si-email" name="si-email" type="email" class="validate" required v-model="email">
                <label for="si-email">Email</label>
            </div>
        </div>
        <div class="row">
            <div class="input-field col s12">
                <input id="si-password" name="si-password" type="password" class="validate" required v-model="password">
                <label for="si-password">Password</label>
            </div>
        </div>
        <div class="row">
            <button type="submit" class="waves-effect waves-light btn">LOGIN</button>
        </div>
    </form>
</template>

<script>
import { UserRouter  } from '../classes/Router.js';

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
            UserRouter.loginUser({
                email: this.email,
		        password: this.password
            }).then(token => {
                this.$emit('loggedInStateChange');
            }).catch(e => {
                if(e.status == 404) {
                    console.log('User does not exists')
                    return;
                }
                else if(e.status == 405) {
                    console.log('Password is wrong')
                    return;
                }

                console.error(e);
            });
        }
    }
}
</script>

<style>

</style>
