<template>
    <div id="question-view">
        <div class="voting">
            <voting :score="question.score" :voted="question.voted" @vote="voteQuestion"></voting>
        </div>
        <div class="row question">
            <p class="flow-text center">{{question.text}}</p>
            <div class="container progress">
                <div class="determinate" :style="'width: ' + progress + '%'"></div>
            </div>
        </div>
        <div class="answer-type-view-holder" v-if="answerView">
            <component :is="answerView" :answers="question.answers" @answer="answer"></component>
        </div>
        <div class="star-counter">StarCounter: {{question.starCounter}}</div>
    </div>
</template>

<script>
import Voting from '../components/Voting.vue';

import AnswerBooleanView from './AnswerBooleanView.vue';
import AnswerFourView from './AnswerFourView.vue';
import AnswerExactView from './AnswerExactView.vue';

import { VoteRouter } from '../classes/Router.js';

const questionTypeMapping = {
    1: 'AnswerBooleanView',
    2: 'AnswerFourView',
    3: 'AnswerExactView'
};

export default {
    name: 'questionView',
    props: ['question'],
    components: {
        Voting,
        AnswerBooleanView,
        AnswerFourView,
        AnswerExactView
    },
    data() {
        return {
            progress: 100,
            progressTween: null
        };
    },
    computed: {
        answerView() {
            return questionTypeMapping[this.question.questionType];
        }
    },
    mounted() {
        this.progressTween = new mojs.Tween({
            duration: this.question.duration * 1000,
            onUpdate: (progress) => {
                this.progress = 100 - progress * 100;
            }
        }).play();
    },
    methods: {
        voteQuestion(vote, score) {
            this.question.voted = vote;
            this.question.score = score;
            VoteRouter.setQuestionVote(vote, this.question.id).catch(err => {
                // TODO: Handle error
                console.error(err);
            });
        },
        answer(givenAnswer) {
            this.progressTween.stop();
            this.$emit('answer', this.question, givenAnswer);
        }
    }
}
</script>

<style>
#question-view {
    padding: 20px;
}
#question-view .progress .determinate {
    transition: inherit;
}
</style>
