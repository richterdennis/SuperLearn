<template>
    <ul id="question-list-view" class="collapsible" data-collapsible="accordion">
        <li v-for="question in questions" :key="question.id">
            <div class="collapsible-header"><span class="truncate">{{question.text}}</span><span class="badge">{{question.score}}</span></div>
            <div class="collapsible-body">
                <div class="row">
                    <div class="col s6" v-if="question.questionType !== 1" v-for="answer in question.answers" :key="answer.id"><div class="z-depth-1 answer incorrect">{{answer.text}}</div></div>
                    <div class="col s12" v-else><div class="z-depth-1 answer correct">{{ questionBooleanAnswer(question) }}</div></div>
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
<style>
    .answer {
        border-style: solid;
        border-width: 0 0 0 6px;
        border-radius: 2px;
        padding: 4px;
        padding-left: 8px;
        margin: 2px 0 6px 0;
    }
    .correct {
        border-color: green;
    }
    .incorrect {
        border-color: red;
    }
</style>

