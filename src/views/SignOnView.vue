<template>
    <div id="sign-on-view">
        <div class="section container">
            <div class="row">
                <div class="col s12 m6 offset-m3">
                    <div class="card logOn-wrapper">
                        <div class="card-content">
                            <form id="sign-on-form" @submit.prevent="doRegister">
                                <div class="row">
                                    <div class="col s12 m6 offset-m3">
                                        <img class="responsive-img" src="/../assets/logo_icon_font.png" alt="SuperLearn Logo">
                                    </div>
                                </div>
                                <h4 class="center green-text">Account erstellen</h4>

                                <div class="input-field">
                                    <input id="so-email" name="so-email" type="email" class="validate" required v-model="email">
                                    <label for="so-email">Email</label>
                                </div>
                                <div class="input-field">
                                    <input id="so-nickname" name="so-nickname" type="text" class="validate" required v-model="nickname">
                                    <label for="so-nickname">Nickname</label>
                                </div>
                                <div class="input-field">
                                    <input id="so-password" name="so-password" type="password" class="validate" required v-model="password">
                                    <label for="so-password">Passwort</label>
                                </div>
                                <div class="input-field">
                                    <input id="so-password2" name="so-password2" type="password" class="validate" required v-model="password2">
                                    <label for="so-password2">Passwort wiederholen</label>
                                </div>
                                <div class="input-field">
                                    <select id="so-courses" name="so-courses" class="validate" required v-model="course" ref="so-courses">
                                        <option disabled value="-1">-- bitte wählen --</option>
                                        <option v-for="course in courses" :key="course.id" :value="course.id">{{course.text}}</option>
                                    </select>
                                    <label for="so-courses">Studiengang</label>
                                </div>
                                    <p>
                                        <input type="checkbox" id="rules_check" v-model="checked" />
                                        <label for="rules_check">Bitte lese unsere <a href="#">Regeln</a> bevor du einen Account erstellst.</label>
                                    </p>
                                <input type="submit" class="btn-large green" :disabled="!checked">
                                <a href="#">Du hast schon einen Account?</a><br>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { StudiesCourseRouter, UserRouter  } from '../classes/Router.js';

export default {
    name: 'signOnView',
    data() {
        return {
            email: '',
            nickname: '',
            password: '',
            password2: '',
            course: -1,
            courses: [],
            checked : false
        }
    },
    mounted() {
        $('select').material_select();
        $('select').on('change', (e) =>{
            this.course = e.target.value;
        });

        StudiesCourseRouter.getStudiesCourses().then(courses => {
            this.courses = courses;
            setTimeout(() => $('select').material_select(), 0);
        }).catch(err => {
            throw 'Something went wrong!';
        });

       addTriangleTo(document.getElementById('sign-on-view'));
    },
    methods: {
        doRegister() {
            UserRouter.createUser({
                email: this.email,
		        nickname: this.nickname,
		        password: this.password,
		        rank: 1,
		        studiesCourseId: this.course
            }).then(token => {
                Cache.save();
                this.$emit('loggedInStateChange');
            }).catch(e => {
                throw 'Something went wrong!';
            });
        },
        addTriangleTo(target) {
            var dimensions = target.getClientRects()[0];
            var pattern = Trianglify({
                width: dimensions.width,
                height: dimensions.height
            });
            target.style['background-image'] = 'url(' + pattern.png() + ')';
        }
    }
}
</script>

<style>
#sign-on-view {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: #f4f4f4;
}
input[type=submit] {
    width: 100%;
    margin: 10px 0 10px 0;
}

@media only screen
  and (min-device-width: 600px)
  {
    .card {
        margin-top: 5%;
    }
}
</style>
