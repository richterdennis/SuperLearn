<template>
    <navbar>
        <navitem name="Home" :selected="true">
            <h1>Hello World!</h1>
        </navitem>

        <navitem name="Meine Fragen">

        </navitem>

        <navitem name="Wall of Fame">

        </navitem>

        <navitem name="Regeln">

        </navitem>
        
        <navitem name="Info">

        </navitem>
        
        <navitem name="Logout">

        </navitem>
    </navbar>
</template>

<script>
import Vue from 'vue';

import Navbar from './md/Navbar.vue';
import Navitem from './md/Navitem.vue';

export default {
    name: 'mainView',
    components: {
        Navbar,
        Navitem
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
