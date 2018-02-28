<template>
    <div id="answer-response-view">
        <div class="response">
            Deine Antwort ist {{answer.correct ? 'richtig' : 'falsch'}}
        </div>
        <div class="your-answer">
            Deine Antwort: {{answer.text}}
        </div>
        <div class="correct-answer" v-if="!answer.correct">
            Richtige Antwort: {{correctAnswer}}
        </div>
        <button class="next" @click="next">weiter</button>
    </div>
</template>

<script>
export default {
    name: 'answerResponseView',
    props: ['question', 'answer'],
    computed: {
        correctAnswer() {
            const correctAnswer = this.question.answers.find(a => a.correct);

            if(this.question.questionType == 1)
                return correctAnswer.correct ? 'Ja / Richtig' : 'Nein / Falsch'

            return correctAnswer.text;
        }
    },
    methods: {
        next() {
            this.$emit('next', this.question);
        }
    }
}
</script>
