<template>
    <form id="sign-on-form" @submit.prevent="doRegister">
        <!-- <h4 class="center green-text">Account erstellen</h4> -->

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
                <label for="rules_check">Ich habe die <a href="#">Regeln</a> gelesen.</label>
            </p>
        <input type="submit" class="btn-large green" :disabled="!checked">
        <!-- <a href="#" @click="currentView=SignInView">Du hast schon einen Account?</a><br> -->
    </form>
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

       // this.addTriangleTo(document.getElementById('sign-on-view'));
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


</style>
