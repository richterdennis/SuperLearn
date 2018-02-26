<template>
    <div id="question-list-view" class="collection">
        <a href="#" class="collection-item" v-for="question in questions" :key="question.id" >
            <span class="title">{{question.text}}</span>
        </a>
    </div>
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
        this.$emit('titleChanged', 'Meine Fragen');
        QuestionRouter.getQuestions().then(questions => {
            this.questions = questions;
        })
    }
}
</script>
