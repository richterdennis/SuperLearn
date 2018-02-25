<template>
    <navbar id="main-view">
        <navitem name="Home" :selected="true">
            <module-list-view></module-list-view>
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
    </navbar>
</template>

<script>
import Navbar from './md/Navbar.vue';
import Navitem from './md/Navitem.vue';

import ModuleListView from './ModuleListView.vue';

export default {
    name: 'mainView',
    components: {
        Navbar,
        Navitem,
        ModuleListView
    },
    methods: {
        doLogout() {
            this.$emit('loggedInStateChange');
        }
    }
}
</script>

<style>
a.brand-logo {
    background: url('/assets/logo_font.png') no-repeat center;
    background-size: contain;
    height: 100%;
    width: 200px;
}
</style>
