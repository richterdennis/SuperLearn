<template>
    <div class="section container">
        <div class="row">
            <div class="col s12 m6 offset-m3">
                <div class="card logIn-wrapper">
                    <div class="card-content">
                        <form id="sign-in-view" @submit.prevent="doLogin">
                            <div class="row">
                                <div class="col s12 m6 offset-m3">
                                    <img class="responsive-img" src="/../assets/logo_icon_font.png" alt="SuperLearn Logo">
                                </div>
                            </div>
                            <h4 class="center green-text">Anmelden</h4>
                            <div class="input-field">
                                <label for="si-email" class="active">Email</label>
                                <input id="si-email" name="si-email" type="email" class="validate" required v-model="email">
                            </div>
                            <div class="input-field">
                                <label for="si-password">Passwort</label>
                                <input id="si-password" name="si-password" type="password" class="validate" required v-model="password">
                            </div>
                            <input type="submit" class="btn-large green">      
                            <a href="#">Passwort vergessen?</a><br>
                            <a href="#">Noch kein Mitglied?</a>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
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
/* var pattern = Trianglify({
    height: 300,
    width: 300,
    cell_size: 40});

    document.body.appendChild(pattern.canvas()); */
</script>

<style>
#app {
    background-color: #f4f4f4;
}
input[type=submit] {
    width: 100%;
    margin-bottom: 10px;
}

@media only screen 
  and (min-device-width: 600px)
  {
    .card {
        margin-top: 25%;
    }   
}
</style>
