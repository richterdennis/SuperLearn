<template>
    <div class="activity row" :style="'z-index: ' + layer + ';'">
        <div class="activity-nav navbar-fixed">
            <nav>
                <div class="nav-wrapper green accent-4">
                    <a href="#" class="button-collapse" v-if="icon" @click.prevent="onIconClicked"><i class="material-icons">{{icon}}</i></a>
                    <span class="brand-logo center hide-on-med-and-down" @click="onLogoClicked"></span>
                    <span class="nav-title">{{title}}</span>
                    <slot name="nav"></slot>
                </div>
            </nav>
        </div>
        <div class="activity-content col s12 push-l2 l8 push-xl3 xl6">
            <slot></slot>
        </div>
    </div>
</template>

<script>
export default {
    name: 'activity',
    props: ['title', 'icon', 'layer'],
    methods: {
        onIconClicked() {
            this.$emit('onIconClicked');
        },
        onLogoClicked() {
            this.$emit('logoClicked');
        }
    }
}
</script>

<style>

.activity {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: #f1f1f1;
    margin: 0 !important;
}


.activity .activity-nav .button-collapse {
    display: block !important;
}

.activity .activity-nav .brand-logo {
    background: url('/assets/logo_icon.png') no-repeat center;
    background-size: contain;
    height: 150%;
    width: 200px;
    transform: translateY(20px) translateX(-50%);
}

.activity .activity-nav .nav-title {
    font-size: 28px;
    padding: 0 10px !important;
}

@media only screen and (max-width: 992px) {
    .activity .activity-content {
        padding-left: 0;
        padding-right: 0;
    }
}

@media only screen and (min-width: 993px) {

    .activity .activity-content {
        padding-top: 2rem;
        padding-bottom: 2rem;
        margin-top: 60px;
    }

    .activity .activity-content > * {
        -webkit-box-shadow: 0 4px 5px 0 rgba(0,0,0,0.14), 0 1px 10px 0 rgba(0,0,0,0.12), 0 2px 4px -1px rgba(0,0,0,0.3);
        box-shadow: 0 4px 5px 0 rgba(0,0,0,0.14), 0 1px 10px 0 rgba(0,0,0,0.12), 0 2px 4px -1px rgba(0,0,0,0.3);
    }
}

</style>
