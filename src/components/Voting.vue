<template>
    <div class="voting">
        <button class="voteup" @click="voteup">
            <i class="material-icons" v-show="voted > 0">add_circle</i>
            <i class="material-icons" v-show="voted <= 0">add_circle_outline</i>
        </button>
        <div class="score" :class="{negative: score < 0}">{{score}}</div>
        <button class="votedown" @click="votedown">
            <i class="material-icons" v-show="voted < 0">remove_circle</i>
            <i class="material-icons" v-show="voted >= 0">remove_circle_outline</i>
        </button>
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
