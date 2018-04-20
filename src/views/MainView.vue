<template><div>
    <activity id="main-view" :title="title" icon="menu" layer="5" @logoClicked="navigate('home')">
        <template slot="nav">
            <a href="#" class="avatar" @click.prevent="navigate('profile')"><i class="material-icons">person</i></a>
            <div class="score" v-if="user">{{user.score}}</div>
        </template>

        <navitem selector="home" name="Home" :selected="true">
            <module-list-view @titleChanged="changeTitle"></module-list-view>
        </navitem>

        <navitem selector="profile" name="Mein Profil" hidden="true">
            <user-profile-view></user-profile-view>
        </navitem>

        <navitem selector="my_questions" name="Meine Fragen">
            <question-list-view></question-list-view>
        </navitem>

        <navitem selector="wall_of_fame" name="Wall of Fame">

        </navitem>

        <navitem selector="rules" name="Regeln">
            <rules-view @titleChanged="changeTitle"></rules-view>
        </navitem>

        <navitem selector="info" name="Info">
            <info-view @titleChanged="changeTitle"></info-view>
        </navitem>

        <navitem selector="logout" name="Logout" @click="doLogout"></navitem>
    </activity>

    <ul class="side-nav" id="mobile-nav">
        <li>
            <div class="user-view" @click="navigate('profile')">
                <div class="background green"></div>
                <img class="circle  white" :src="url">
                <span class="white-text name"><b>{{user.nickname}}</b></span>
                <span class="white-text email">{{user.email}}</span>
            </div>
        </li>
        <li v-for="item in navitems" :key="item.name" :class="{'active': item.isActive}" v-show="!item.hidden">
            <a href="#" @click="navigate(item.selector)">{{item.name}}</a>
        </li>
    </ul>
</div></template>

<script>
import Activity from '../components/Activity.vue';
import Navitem from '../components/Navitem.vue';

import * as Cache from '../classes/Cache.js';
import { UserRouter } from '../classes/Router.js';

import ModuleListView from './ModuleListView.vue';
import QuestionListView from './QuestionListView.vue';
import RulesView from './RulesView.vue';
import InfoView from './InfoView.vue';
import UserProfileView from './UserProfileView.vue';

export default {
    name: 'mainView',
    data() {
        return {
            title: 'Home',
            navitems: [],
            currentItem: {},
            user: [],
            url: "../assets/profile_picture.png",
        }
    },
    components: {
        Activity,
        Navitem,
        QuestionListView,
        RulesView,
        InfoView,
        ModuleListView,
        UserProfileView
    },
    mounted() {
        this.navitems = this.$children[0].$children;
        this.navitems.some(item => {
            if(item.isActive) {
                this.currentItem = item;
                return true;
            }

            return false;
        });

        this.user = Cache.getLast(App.CACHE.USER_ME);
        UserRouter.getMe().then(user => {
            this.user = user;
        });

        const $collapseButton = $("#main-view .button-collapse");
        $collapseButton.attr('data-activates', 'mobile-nav');
        $collapseButton.sideNav({
            closeOnClick: true
        });
    },
    methods: {
        navigate(selector) {
            for(const item of this.navitems) {
                item.isActive = (item.selector == selector);
                if(item.isActive) this.currentItem = item;
            }

            this.title = this.currentItem.name;
            this.currentItem.$emit('click');
        },
        changeTitle(title) {
            this.title = title;
        },
        doLogout() {
            Cache.clear();
            this.$emit('loggedInStateChange');
        }
    }
}
</script>

<style>
.activity-nav .score,
.activity-nav .avatar {
    float: right;
    padding: 0 18px;
}
</style>
