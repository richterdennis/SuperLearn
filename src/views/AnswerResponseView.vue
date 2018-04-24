<template>
    <div id="answer-response-view">
        <div class="voting">
            <voting :score="question.score" :voted="question.voted" @vote="voteQuestion"></voting>
        </div>
        <div class="response='true'">
            <div class="row container">
                <div class="valign-wrapper col s12 m8 offset-m2 l6 offset-l3 container">
                     <div v-if="answer.correct">
                        <img class="responsive-img answer_right" src="/assets/questionRight.png">
                    </div>
                    <div v-else>
                        <img class="responsive-img answer_wrong" src="/assets/questionWrong.png">
                    </div>
                </div>
            </div>
            <div class="row container">
            <p class="center flow-text">{{question.text}}</p>
            <hr>
 <!--            <blockquote class="col">
                <p class="flow-text ">Deine Antwort ist {{answer.correct ? 'richtig' : 'falsch'}}</p>
            </blockquote> -->
            </div>
        <div class="row container">
        <div class="your-answer col s6">
            <blockquote class="" v-bind:class="{'correct_color':answer.correct}">Deine Antwort: {{answer.text}}</blockquote>
        </div>

        <div class="correct-answer col s6" v-if="!answer.correct">
            <blockquote class="correct_color">Richtige Antwort: {{correctAnswer}}</blockquote>
        </div>
        </div>
            <a class="waves-effect waves-light btn-large green accent-4" @click="next"><i class="material-icons right">arrow_forward</i>nächste Frage</a>
        </div>
    </div>
</template>


<script>
import Voting from '../components/Voting.vue';

import { VoteRouter } from '../classes/Router.js';

export default {
    name: 'answerResponseView',
    props: ['question', 'answer'],
    components: {
        Voting
    },
    computed: {
        correctAnswer() {
            const correctAnswer = this.question.answers.find(a => a.correct);

            if(this.question.questionType == 1)
                return correctAnswer.correct ? 'Ja / Richtig' : 'Nein / Falsch'

            return correctAnswer.text;
        }
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
        next() {
            this.$emit('next', this.question);
        }
    }
}
</script>

<style>
#answer-response-view {
    background-color: white;
}
.responsive-img {
    margin-top: 30px;
}
.answer_right {
    animation: aright 2s;
}
.answer_wrong {
    animation: awrong 2s;
}
#answer-response-view .btn-large {
    width: 100%;
    margin-top: 10px;
}
.correct_color{
  margin: 20px 0;
  border-left: 5px solid #64dd17;
}

@keyframes aright {
  0%, 100% {
    -moz-transform: translateY(0);
    -ms-transform: translateY(0);
    -webkit-transform: translateY(0);
    transform: translateY(0);
  }
  30% {
    -moz-transform: translateY(-30px);
    -ms-transform: translateY(-30px);
    -webkit-transform: translateY(-30px);
    transform: translateY(-30px);
  }  60% {
    -moz-transform: translateY(30px);
    -ms-transform: translateY(30px);
    -webkit-transform: translateY(30px);
    transform: translateY(30px);
  }
}
@keyframes awrong {
  0%, 100% {
    -moz-transform: translateX(0);
    -ms-transform: translateX(0);
    -webkit-transform: translateX(0);
    transform: translateX(0);
  }
  30% {
    -moz-transform: translateX(-30px);
    -ms-transform: translateX(-30px);
    -webkit-transform: translateX(-30px);
    transform: translateX(-30px);
  }  60% {
    -moz-transform: translateX(30px);
    -ms-transform: translateX(30px);
    -webkit-transform: translateX(30px);
    transform: translateX(30px);
  }
}
</style>
