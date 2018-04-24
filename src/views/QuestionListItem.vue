<template>
    <li class="question-list-item">
        <div class="collapsible-header">
            <i class="material-icons red-text" v-if="!answer.correct">highlight_off</i>
            <i class="material-icons" v-else v-bind:class="{'green-text accent-4':answer.correct}">check</i>
            {{question.text}}
        </div>
        <div class="collapsible-body">
            <div class="question-text">
                <blockquote v-bind:class="{'correct_color':answer.correct}">Deine Antwort war: <strong> {{answer.correct ? answer.text : 'falsch'}}</strong></blockquote>
            </div>
            <div class="question-correct" v-if="!answer.correct">
                <blockquote class="correct_color">Korrekte Antwort: <strong>{{answer.text}}</strong></blockquote>
            </div>

            <div class="star-counter secondary-content" v-if="question.starCounter == '1'">
                <i class="material-icons green-text">check_box</i>
                <i class="material-icons">check_box_outline_blank</i>
                <i class="material-icons">check_box_outline_blank</i>
            </div>
            <div class="star-counter secondary-content" v-if="question.starCounter == '2'">
                <i class="material-icons green-text">check_box</i>
                <i class="material-icons green-text">check_box</i>
                <i class="material-icons">check_box_outline_blank</i>
            </div>
            <div class="star-counter secondary-content" v-if="question.starCounter == '3'">
                <i class="material-icons green-text">check_box</i>
                <i class="material-icons green-text">check_box</i>
                <i class="material-icons green-text">check_box</i>
            </div>
                <div class="star-counter secondary-content" v-if="question.starCounter == '0'">
                <i class="material-icons">check_box_outline_blank</i>
                <i class="material-icons">check_box_outline_blank</i>
                <i class="material-icons">check_box_outline_blank</i>
            </div>
         </div>
    </li>
</template>

<script>
export default {
    name: 'questionListItem',
    props: ['question', 'answer']
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
