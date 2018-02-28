<template>
    <div id="answer-boolean-view">
        <button @click="answer(true)">Ja / Richtig</button>
        <button @click="answer(false)">Nein / Falsch</button>
    </div>
</template>

<script>
export default {
    name: 'answerBooleanView',
    props: ['answers'],
    methods: {
        answer(givenAnswer) {
            this.$emit('answer', {
                correct: this.answers[0].correct == givenAnswer,
                text: givenAnswer ? 'Ja / Richtig' : 'Nein / Falsch'
            });
        }
    }
}
</script>
