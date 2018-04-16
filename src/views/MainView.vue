<template><div>
    <activity id="main-view" :title="title" icon="menu" layer="5">
        <template slot="nav">
            <a href="#" class="avatar" @click.prevent="navItemClicked(navitems[1])"><i class="material-icons">person</i></a>
            <div class="score" v-if="user">{{user.score}}</div>
        </template>

        <navitem name="Home" :selected="true">
            <module-list-view @titleChanged="changeTitle"></module-list-view>
        </navitem>

        <navitem name="Mein Profil">
            <user-profile-view></user-profile-view>
        </navitem>

        <navitem name="Meine Fragen">
            <question-list-view></question-list-view>
        </navitem>

        <navitem name="Wall of Fame">

        </navitem>

        <navitem name="Regeln">
            <rules-view @titleChanged="changeTitle"></rules-view>
        </navitem>

        <navitem name="Info">
            <info-view @titleChanged="changeTitle"></info-view>
        </navitem>

        <navitem name="Logout" @click="doLogout"></navitem>
    </activity>

    <ul class="side-nav" id="mobile-nav">
        <li v-for="item in navitems" :key="item.name" :class="{'active': item.isActive}">
            <a href="#" @click="navItemClicked(item)">{{item.name}}</a>
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
            user: null
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
        navItemClicked(selectedItem) {
            this.currentItem = selectedItem;
            this.navitems.forEach(item => {
                item.isActive = (item.name == selectedItem.name);
            });

            this.title = selectedItem.name;
            selectedItem.$emit('click');
        },
        changeTitle(title) {
            this.title = title;
        },
        doLogout() {
            Cache.clear();
            Cache.save();
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
