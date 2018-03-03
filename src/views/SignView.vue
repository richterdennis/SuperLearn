<template>
    <div id="sign-view">
        <div class="row container">
            <div class="col s12 m6 offset-m3">
                <div class="card">
                    <div class="card-content">
                        <div id="img-wrapper" class="row">
                            <div class="col s12 m6 offset-m3">
                                <img class="responsive-img" src="/../assets/logo_font.png" alt="SuperLearn Logo">
                            </div>
                        </div>
                        <div class="row">
                            <div class="col s12">
                            <ul class="tabs fixed-fixed-width">
                                <li class="tab col s6"><a class="active green-text" href="#sign-in">ANMELDEN</a></li>
                                <li class="tab col s6"><a class="green-text" href="#sign-on ">REGISTRIEREN</a></li>
                            </ul>
                            </div>
                            <div id="sign-in" class="col s12"><sign-in-view @loggedOnStateChange="onLoggedOnStateChange"></sign-in-view></div>
                            <div id="sign-on" class="col s12"><sign-on-view @loggedInStateChange="onLoggedInStateChange"></sign-on-view></div>
                        </div>

                        <!-- <component :is="currentView"></component> -->
                    </div>
                </div>
            </div>
        </div>
    </div>

        
</template>

<script>
import SignInView from "./SignInView.vue";
import SignOnView from "./SignOnView.vue";

export default {
    name: 'signView',
    components: {
        SignInView,
        SignOnView
    },
    data() {
        return {
           currentView:'SignInView'
        }
    },
    mounted() {
        // Clear user cache to prevent wrong data on user change
        Cache.remove(App.CACHE.TOKEN);
        Cache.remove(App.CACHE.USER_ME);
        Cache.remove(App.CACHE.MY_QUESTIONS);
        Cache.remove(App.CACHE.REPORTS);
    },
    methods: {
        onLoggedInStateChange() {
            this.$emit('loggedInStateChange');
        }
    }
}
 $(document).ready(function(){
    $('ul.tabs').tabs();
    $('#tabs-swipe-demo').tabs({ 'swipeable': true });
  });
     $(".tabs>.indicator").css("background-color", '#FFF');
</script>

<style>
#sign-view {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: #f4f4f4;
    overflow: hidden;
}
img.responsive-img{
    width: 100%;
}
input[type=submit] {
    width: 100%;
    margin: 10px 0 10px 0;
}

 /* TODO: anpassung mobile (import von Dennis) */
@media only screen
  and (min-device-width: 600px)
  {
    .card {
        margin-top: 5%;
    }
}

</style>

