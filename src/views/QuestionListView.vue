<template>
    <ul id="question-list-view" class="collapsible" data-collapsible="accordion">
        <li v-for="question in questions" :key="question.id">
            <div class="collapsible-header">{{question.text}}<span class="badge">{{question.score}}</span></div>
            <div class="collapsible-body">
                <div class="row">
                    <div class="col s6" v-if="question.questionType !== 1" v-for="answer in question.answers" :key="answer.id"><p>{{answer.text}}</p></div>
                    <div class="col s12" v-else><span>{{ questionBooleanAnswer(question) }}</span></div>
                </div>
            </div>
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
    },
    methods: {
        questionBooleanAnswer(question) {
            return question.answers[0].correct == 1? "Die Aussage ist korrekt!" : "Die Aussage ist falsch!";
        }
    }
}
</script>
