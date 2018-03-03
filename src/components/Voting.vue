<template>
    <div class="row voting">
        <div class="col s5">
            <a class="voteup btn-floating right grey waves-light" @click="voteup"><i class="material-icons">add</i></a>
        </div>
        <div id="test" class="col s2 score center" :class="{negative: score < 0}"><h4 class="light">{{score}}</h4></div>

        <div class="col s5"><a class="votedown btn-floating grey waves-light" @click="votedown">
            <i class="material-icons">remove</i></a>
        </div>
    </div>
</template>

<script>
export default {
    name: 'voting',
    props: ['score', 'voted'],
    methods: {
        voteup() {
            const voted = this.voted < 1 ? 1 : 0;
            const score = this.score - this.voted + voted;

            this.$emit('vote', voted, score);
        },
        votedown() {
            const voted = this.voted > -1 ? -1 : 0;
            const score = this.score - this.voted + voted;

            this.$emit('vote', voted, score);
        }
    }
}
/* Does not work :( Should Highlight VoteScore Div */
$('.test').hover(
    function(){$(this).toggleClass('z-depth-3');
})

</script>

<style>
.voting {
    padding: 10px 0 0 0;
    margin: 0;
}
h4 {
    margin: 0;
    padding: 0;
}
</style>
