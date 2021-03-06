<template>
    <activity id="round-view" :title="title" icon="close" layer="10" @onIconClicked="close">
        <template slot="nav">
            <ul class="right" v-if="questions.length || answerResponses.length">
                <li><a href="#question-report-modal" class="modal-trigger" @click="openInfoOrReport"><i class="material-icons">flag</i></a></li>
                <li><a href="#question-info-modal" class="modal-trigger" @click="openInfoOrReport"><i class="material-icons">info_outline</i></a></li>
            </ul>
        </template>

        <template v-for="question in questions">
            <question-view :question="question" :key="question.id" @answer="onAnswer"></question-view>
        </template>
        <template v-for="answerResponse in answerResponses">
            <answer-response-view :question="answerResponse.question" :answer="answerResponse.givenAnswer" :key="answerResponse.question.id" @next="onNext"></answer-response-view>
        </template>
        <template v-for="roundResponse in roundResponses">
            <round-response-view :round="roundResponse.round" :answers="roundResponse.givenAnswers" :key="roundResponse.round.id"></round-response-view>
        </template>

        <template slot="outside">
            <question-report-view id="question-report-modal" :question="infoOrReport"></question-report-view>
            <question-info-view id="question-info-modal" :question="infoOrReport"></question-info-view>
        </template>
    </activity>
</template>

<script>
import Activity from '../components/Activity.vue';

import QuestionView from './QuestionView.vue';
import AnswerResponseView from './AnswerResponseView.vue';
import RoundResponseView from './RoundResponseView.vue';
import QuestionReportView from './QuestionReportView.vue';
import QuestionInfoView from './QuestionInfoView.vue';

import { RoundRouter } from '../classes/Router.js';

export default {
    name: 'roundView',
    props: ['module'],
    components: {
        Activity,
        QuestionView,
        AnswerResponseView,
        RoundResponseView,
        QuestionReportView,
        QuestionInfoView
    },
    data() {
        return {
            title: '',
            round: null,
            questions: [],
            givenAnswers: [],
            answerResponses: [],
            roundResponses: [],
            infoOrReport: {}
        }
    },
    mounted() {
        RoundRouter.getRoundByModule(this.module.id).then(round => {
            this.round = round;
            this.startRound();
        });

        $('.modal').modal();
    },
    methods: {
        startRound() {
            if(!this.round.questions.length) {
                this.title = this.module.long;
                // TODO Show error message
                return;
            }

            const currentQuestionIndex = 0;
            if(this.round.questions.length > currentQuestionIndex)
                this.showNextQuestion(currentQuestionIndex);
        },
        showNextQuestion(currentQuestionIndex) {
            const question = this.round.questions[currentQuestionIndex++];
            question.duration = this.calcDuration(question);
            question.index = currentQuestionIndex;

            this.title = `Frage ${currentQuestionIndex} von ${this.round.questions.length}`;

            this.answerResponses.splice(0);
            this.questions.push(question);
        },
        onAnswer(question, givenAnswer) {
            this.givenAnswers.push(givenAnswer);

            this.questions.splice(0);
            this.answerResponses.push({question, givenAnswer});
        },
        onNext(question) {
            const currentQuestionIndex = question.index;
            if(this.round.questions.length > currentQuestionIndex) {
                this.showNextQuestion(currentQuestionIndex);
            }
            else {
                this.answerResponses.splice(0);
                this.roundResponses.push({
                    round: this.round,
                    givenAnswers: this.givenAnswers
                });
            }
        },
        calcDuration(question) {
            let duration = 20;

            switch(question.questionType) {
                case 3:
                    duration += question.answers[0].text.length / 2;
                    duration += 5;
                    break;

                case 2:
                    let answerLength = 0;
                    question.answers.forEach(answer => {
                        answerLength += answer.text.length;
                    });
                    duration += answerLength / 10 - 6;
                    break;

                case 1:
                    duration -= 3;
                    break;
            }

            if(question.text.length > 60) {
                duration += 3;
            }

            return duration;
        },
        close() {
            this.$emit('close');
        },
        openInfoOrReport() {
            this.infoOrReport = this.questions[0] || this.answerResponses[0].question;
        }
    }
}
</script>
