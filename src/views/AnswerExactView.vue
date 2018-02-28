<template>
    <form id="answer-exact-view" @submit.prevent="doAnswer">
        <input type="text" v-model="answer">
        <button type="submit">weiter</button>
    </form>
</template>

<script>
export default {
    name: 'answerExactView',
    props: ['answers'],
    data() {
        return {
            answer: ''
        }
    },
    methods: {
        doAnswer() {
            this.$emit('answer', {
                text: this.answer,
                correct: this.answer == this.answers[0].text
            });
        }
    }
}
</script>
