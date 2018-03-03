<template>
    <form id="sign-in-form" @submit.prevent="doLogin">
        <!-- <h4 class="center green-text">Anmelden</h4> -->
        
        <div class="input-field">
            <label for="si-email">Email</label>
            <input id="si-email" name="si-email" type="email" class="validate" required v-model="email">
        </div>
        <div class="input-field">
            <label for="si-password">Passwort</label>
            <input id="si-password" name="si-password" type="password" class="validate" required v-model="password">
        </div>
        <input type="submit" class="btn-large green">
        <a href="#">Passwort vergessen?</a><br>
        <!-- <a href="#" @click="currentView='SignOnView'">Noch kein Mitglied?</a> -->
    </form>
 </template>

<script>
import { UserRouter  } from '../classes/Router.js';

export default {
    name: 'signInView',
    data() {
        return {
            email: '',
            password: '',
            currentView:'SignInView'
        }
    },
    methods: {
        doLogin() {
            UserRouter.loginUser({
                email: this.email,
		        password: this.password
            }).then(token => {
                Cache.save();
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
