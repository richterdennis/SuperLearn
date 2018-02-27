<template>
    <ul id="question-list-view" class="collapsible" data-collapsible="accordion">
        <li v-for="question in questions" :key="question.id">
            <div class="collapsible-header">{{question.text}}<span class="badge">{{question.score}}</span></div>
            <div class="collapsible-body"><span>Lorem ipsum dolor sit amet.</span></div>
        </li>
    </ul>
</template>

<script>
import { QuestionRouter } from '../classes/Router.js';

export default {
    name: 'questionListView',
    data() {
        return {
            questions: []
        }
    },
    mounted() {
        $('.collapsible').collapsible();

        QuestionRouter.getQuestions().then(questions => {
            this.questions = questions;
        })
    }
}
</script>
