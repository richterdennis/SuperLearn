<template>
    <div id="answer-boolean-view" class="row">
        <div class="col s6">
            <a class="waves-effect waves-light btn-large green waves-light" @click="answer(true)">
                <i class="material-icons right">thumb_up</i> Ja / Richtig
            </a>
        </div>

        <div class="col s6">
            <a class="waves-effect waves-light btn-large red waves-light" @click="answer(false)">
                <i class="material-icons left">thumb_down</i> Nein / Falsch
            </a>
        </div>
    </div>
    <!-- TODO: Buttons on mobile -->
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

<style>
.btn-large {
    width: 100%;
}
.btn-large:hover {
    transform: scale(1.05);

    -webkit-box-shadow: 0 16px 24px 2px rgba(0,0,0,0.14), 0 6px 30px 5px rgba(0,0,0,0.12), 0 8px 10px -5px rgba(0,0,0,0.3);
    box-shadow: 0 16px 24px 2px rgba(0,0,0,0.14), 0 6px 30px 5px rgba(0,0,0,0.12), 0 8px 10px -5px rgba(0,0,0,0.3);
}
</style>
