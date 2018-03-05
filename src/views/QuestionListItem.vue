<template>
    <li class="question-list-item">
        <div class="collapsible-header"><i class="material-icons red-text" v-if="!answer.correct">highlight_off</i><i class="material-icons" v-else v-bind:class="{'green-text accent-4':answer.correct}">check</i>{{question.text}}</div>
        <div class="collapsible-body">
            <div class="question-text"><blockquote v-bind:class="{'correct_color':answer.correct}">Deine Antwort war {{answer.correct ? 'richtig' : 'falsch'}}!</blockquote></div>
            <div class="question-correct"><blockquote class="correct_color">Korrekte Antwort: <strong>{{answer.text}}</strong></blockquote></div>
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
.correct_color{
  margin: 10px 0;
  border-left: 5px solid #64dd17; 
}
blockquote {
    margin: 10px 0;
}
div.collapsible-header:hover{
    background-color: #ddd;
}

</style>