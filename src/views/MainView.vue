<template><div>
    <activity id="main-view" :title="title" icon="menu" layer="5">
        <navitem name="Home" :selected="true">
            <module-list-view @titleChanged="changeTitle"></module-list-view>
        </navitem>

        <navitem name="Meine Fragen">

        </navitem>

        <navitem name="Wall of Fame">

        </navitem>

        <navitem name="Regeln">

        </navitem>
        
        <navitem name="Info">

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

import ModuleListView from './ModuleListView.vue';

export default {
    name: 'mainView',
    data() {
        return {
            title: 'Home',
            navitems: [],
            currentItem: {},
        }
    },
    components: {
        Activity,
        Navitem,
        ModuleListView
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
</style>
