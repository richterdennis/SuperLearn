<template>
    <ul id="question-list-view" class="collapsible" data-collapsible="accordion">
        <li v-for="question in questions" :key="question.id">
            <div class="collapsible-header"><span class="truncate">{{question.text}}</span><span class="badge">{{ question.score }}</span></div>
            <div class="collapsible-body">
                <div class="row nomargin">
                    <div class="col s12" v-if="question.questionType == 1">
                        <div :class="isCorrectAnswer(question.answers[0])">{{ questionBooleanAnswer(question) }}</div>
                    </div>
                    <div class="col s6" v-else-if="question.questionType == 2" v-for="answer in question.answers" :key="answer.id">
                        <div :class="isCorrectAnswer(answer)">{{answer.text}}</div>
                    </div>
                    <div class="col s12" v-else-if="question.questionType == 3">
                        <div :class="isCorrectAnswer(question.answers[0])">{{ question.answers[0].text }}</div>
                    </div>
                    <div class="col s6">
                        <p class="smalltext">Erstellt am:</p>
                        <p>{{ timeStampToDate(question.created*1000) }}</p>
                    </div>
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
        },
        isCorrectAnswer(answer) {
            return  answer.correct == 1 ? "z-depth-1 answer correct" : "z-depth-1 answer incorrect";
        },
        timeStampToDate(timestamp) {
            return new Date(timestamp).toLocaleDateString();
        }
    }
}
</script>
<style>
    .answer {
        border-style: solid;
        border-width: 0 0 0 6px;
        border-radius: 2px;
        padding: 6px;
        padding-left: 12px;
        margin: 2px 0 6px 0;
    }
    .correct {
        border-color: green;
    }
    .incorrect {
        border-color: red;
    }

    .smalltext {
        font-size: .7em;
        color: darkslategray;
        margin-bottom: 0;
    }
    .smalltext + p {
        margin-top: 0;
    }
    .row.nomargin {
        margin-bottom: 0;
    }
</style>

