<template>
    <li class="question-list-item">
        <div class="collapsible-header"><i class="material-icons" v-if="!answer.correct">highlight_off</i><i class="material-icons" v-else>check</i>{{question.text}}</div>
        <div class="collapsible-body">
            <div class="question-text">Deine Antwort war {{answer.correct ? 'richtig' : 'falsch'}}!</div>
            <div class="question-correct">Korrekte Antwort: {{answer.text}}!</div>
         </div>
    </li>
</template>

<script>
export default {
    name: 'questionListItem',
    props: ['question', 'answer'],
    methods() {

    }
}
</script>

<style>

</style>