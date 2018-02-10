<template>
    <div>
        <nav>
            <div class="nav-wrapper">
                <a href="#!" class="brand-logo"></a>
                <a href="#" data-activates="mobile-nav" class="button-collapse"><i class="material-icons">menu</i></a>
                <ul class="right hide-on-med-and-down">
                    <li v-for="item in navitems" :key="item.name" :class="{'active': item.isActive}">
                        <a href="#" @click="navItemClicked(item)">{{item.name}}</a>
                    </li>
                </ul>
                <ul class="side-nav" id="mobile-nav">
                    <li v-for="item in navitems" :key="item.name" :class="{'active': item.isActive}">
                        <a href="#" @click="navItemClicked(item)">{{item.name}}</a>
                    </li>
                </ul>
            </div>
        </nav>
        <div class="container">
            <slot></slot>
        </div>
    </div>
</template>

<script>
export default {
    name: 'navbar',
    data() {
        return {
            navitems: []
        }
    },
    created() {
        this.navitems = this.$children
    },
    mounted() {
        $(".button-collapse").sideNav();
    },
    methods: {
        navItemClicked(selectedItem) {
            this.navitems.forEach(item => {
                item.isActive = (item.name == selectedItem.name);
            });

            console.log(selectedItem);
        }
    }
}
</script>
