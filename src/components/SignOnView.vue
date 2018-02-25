<template>
    <form id="sign-on-view" class="col container" @submit.prevent="doRegister">
        <div class="row">
            <div class="input-field col s12">
                <input id="so-email" name="so-email" type="email" class="validate" required v-model="email">
                <label for="so-email">Email</label>
            </div>
        </div>
        <div class="row">
            <div class="input-field col s12">
                <input id="so-nickname" name="so-nickname" type="text" class="validate" required v-model="nickname">
                <label for="so-nickname">Nickname</label>
            </div>
        </div>
        <div class="row">
            <div class="input-field col s12">
                <input id="so-password" name="so-password" type="password" class="validate" required v-model="password">
                <label for="so-password">Password</label>
            </div>
        </div>
        <div class="row">
            <div class="input-field col s12">
                <input id="so-password2" name="so-password2" type="password" class="validate" required v-model="password2">
                <label for="so-password2">Password wiederholen</label>
            </div>
        </div>
        <div class="row">
            <div class="input-field col s12">
                <select id="so-courses" name="so-courses" class="validate" required v-model="course">
                    <option disabled value="">-- bitte wählen --</option>
                    <option v-for="course in courses" :key="course.id" :value="course.id">{{course.text}}</option>
                </select>
                <label for="so-courses">Studiengang</label>
            </div>
        </div>
        <div class="row">
            <button type="submit" class="waves-effect waves-light btn">REGISTER</button>
        </div>
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
            course: '',
            courses: []
        }
    },
    mounted() {
        $('select').material_select();

        StudiesCourseRouter.getStudiesCourses().then(courses => {
            this.courses = courses;
            setTimeout(() => $('select').material_select(), 0);
        }).catch(err => {
            throw 'Something went wrong!';
        });
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
        }
    }
}
</script>

<style>

</style>
