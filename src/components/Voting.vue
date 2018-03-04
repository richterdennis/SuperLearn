<template>
    <div class="row voting">
        <div class="col s5">
            <a class="voteup btn-floating right waves-light" :class="voted > 0 ? 'green' : 'grey'" @click="voteup">
                <i class="material-icons">add</i>
            </a>
        </div>
        <div id="test" class="col s2 score center" :class="{'red-text': score < 0}">
            <h4 class="light">{{score}}</h4>
        </div>
        <div class="col s5">
            <a class="votedown btn-floating waves-light" :class="voted < 0 ? 'red' : 'grey'" @click="votedown">
                <i class="material-icons">remove</i>
            </a>
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
