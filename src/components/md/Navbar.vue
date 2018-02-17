<template>
    <div class="row">
        <div class="navbar-fixed">
            <nav>
                <div class="nav-wrapper">
                    <a href="#" class="brand-logo hide-on-med-and-down"></a>
                    <span class="nav-title hide-on-large-only">{{currentItem.name}}</span>
                    <a href="#" data-activates="mobile-nav" class="button-collapse"><i class="material-icons">menu</i></a>
                    <ul class="right hide-on-med-and-down">
                        <li v-for="item in navitems" :key="item.name" :class="{'active': item.isActive}">
                            <a href="#" @click="navItemClicked(item)">{{item.name}}</a>
                        </li>
                    </ul>
                </div>
            </nav>
        </div>
        <ul class="side-nav" id="mobile-nav">
            <li v-for="item in navitems" :key="item.name" :class="{'active': item.isActive}">
                <a href="#" @click="navItemClicked(item)">{{item.name}}</a>
            </li>
        </ul>
        <div class="col s12 push-l2 l8 push-xl3 xl6">
            <slot></slot>
        </div>
    </div>
</template>

<script>
export default {
    name: 'navbar',
    data() {
        return {
            navitems: [],
            currentItem: {},
        }
    },
    created() {
        this.navitems = this.$children
        this.navitems.some(item => {
            if(item.isActive) {
                this.currentItem = item;
                return true;
            }

            return false;
        });
    },
    mounted() {
        $(".button-collapse").sideNav();
    },
    methods: {
        navItemClicked(selectedItem) {
            this.currentItem = selectedItem;
            this.navitems.forEach(item => {
                item.isActive = (item.name == selectedItem.name);
            });
            selectedItem.$emit('click');
        }
    }
}
</script>

<style>
.nav-title {
    padding: 0 10px !important;
}

@media only screen and (max-width: 992px) {
    .row .col {
        padding-left: 0;
        padding-right: 0;
    }
}

@media only screen and (min-width: 993px) {
    .row .col {
        padding-top: 2rem;
        padding-bottom: 2rem;
    }

    .row .col > div {
        -webkit-box-shadow: 0 4px 5px 0 rgba(0,0,0,0.14), 0 1px 10px 0 rgba(0,0,0,0.12), 0 2px 4px -1px rgba(0,0,0,0.3);
        box-shadow: 0 4px 5px 0 rgba(0,0,0,0.14), 0 1px 10px 0 rgba(0,0,0,0.12), 0 2px 4px -1px rgba(0,0,0,0.3);
    }
}
</style>
