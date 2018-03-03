<template>
    <div id="answer-boolean-view" class="row">
        <div class="col s6">
            <a class="waves-effect waves-light btn-large green waves-light" @click="answer(true)"><i class="material-icons right">thumb_up</i>Ja / Richtig</a>
        </div>
        
        <div class="col s6">
            <a class="waves-effect waves-light btn-large red waves-light" @click="answer(false)"><i class="material-icons left">thumb_down</i>Nein / Falsch</a>
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
/* Does not work :( */
$('.btn-large').hover(
    function(){$(this).toggleClass('z-depth-5');
})
</script>

<style>
.btn-large {
    width: 100%;
}
.btn-large:hover {
    transform: scale(1.05);
}
</style>