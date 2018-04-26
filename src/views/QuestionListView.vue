<template>
    <div class="question-list-view" v-show="questionListVisible">
        <ul class="collapsible" data-collapsible="accordion">
            <li>
                <div class="questionlist-header">
                    <div class="row nomargin">
                        <div class="input-field col s12">
                            <input type="text" name="searchString" id="searchString" v-model="searchString">
                            <label for="searchString">Suchbegriff</label>
                        </div>
                    </div>
                    <div class="row nomargin">
                        <div class="input-field col s6">
                            <select name="so-sortby" id="so-sortby" v-model="sortby" ref="so-sortby">
                                <option value="-1" disabled selected>Sortieren nach...</option>
                                <option v-for="sortby in sortbyOptions" :key="sortby.id" :value="sortby.id">{{ sortby.text }}</option>
                            </select>
                            <label for="so-sortby">Sortieren nach...</label>
                        </div>
                        <div class="input-field col s6">
                            <select name="so-orderby" id="so-orderby" v-model="orderby" ref="so-orderby">
                                <option value="-1" disabled selected>Sortierreihenfolge</option>
                                <option v-for="orderby in orderbyOptions" :key="orderby.id" :value="orderby.id">{{ orderby.text }}</option>
                            </select>
                            <label for="so-sortby">Sortierreihenfolge</label>
                        </div>
                    </div>
                </div>
            </li>
            <li v-for="question in filteredQuestions" :key="question.id">
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
        <div class="fixed-action-btn">
            <a class="btn-floating btn-large red waves-effect waves-light" @click.prevent="openNewQuestionView()">
                <i class="large material-icons">add</i>
            </a>
        </div>
    </div>
</template>

<script>
import { QuestionRouter } from '../classes/Router.js';
import NewQuestionView from './NewQuestionView.vue';

export default {
    name: 'questionListView',
    data() {
        return {
            questions: [],
            sortbyOptions: [
                { text: 'Fragetext', id: 0 },
                { text: 'Bewertung', id: 1 },
                { text: 'Datum', id: 2 }
            ],
            orderbyOptions: [
                { text: 'Aufsteigend', id: 0 },
                { text: 'Absteigend', id: 1 }
            ],
            sortby: -1,
            orderby: -1,
            searchString: "",
            questionListVisible: true
        }
    },
    mounted() {
        $('select').material_select();
        $('select').on('change', (e) =>{
            this.sortingChanged(e);
        });
        $('.collapsible').collapsible();

        QuestionRouter.getQuestions().then(questions => {
            this.questions = questions;
        })
    },
    created() {
        Event.$on('update-my-questions', () => {
            QuestionRouter.getQuestions().then(questions => {
                this.questions = questions;
            });
        }),
        Event.$on('return-to-questionlist', () => {
            this.questionListVisible = true;
        })
    },
    computed: {
        filteredQuestions: function () {
            let compareFunction = this.sortByName;
            switch (this.sortby)
            {
                case '0':
                    compareFunction = this.sortByName;
                    break;
                case '1':
                    compareFunction = this.sortByScore;
                    break;
                case '2':
                    compareFunction = this.sortByDate;
                    break;
                default:
                    compareFunction = this.sortByDate;
            }
            if (this.orderby == "1")
                return this.questions.filter(this.matchQuestionText).sort(compareFunction).reverse();

            return this.questions.filter(this.matchQuestionText).sort(compareFunction);

        }
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
        },
        sortingChanged(e) {
            this.orderby = this.$refs["so-orderby"].value;
            this.sortby = this.$refs["so-sortby"].value;
        },
        sortByName(a,b) {
            return a.text > b.text ? 1 : -1;
        },
        sortByScore(a,b) {
            return a.score > b.score ? 1 : -1;
        },
        sortByDate(a,b) {
            return a.created > b.created ? 1 : -1;
        },
        matchQuestionText(question) {
            const search = this.searchString.trim().toLowerCase();
            const qModule = Cache.getLast(App.CACHE.MODULES).find(
                module => module.id == question.moduleId
            );
            return (
                question.text.toLowerCase().match(search)
                ||
                qModule.short.toLowerCase().match(search)
                ||
                qModule.long.toLowerCase().match(search)
            );
        },
        openNewQuestionView() {
            this.questionListVisible = false;
            App.startView(NewQuestionView);
        }
    }
}
</script>
<style>
    .question-list-view .answer {
        border-style: solid;
        border-width: 0 0 0 6px;
        border-radius: 2px;
        padding: 6px;
        padding-left: 12px;
        margin: 2px 0 6px 0;
    }
    .question-list-view .correct {
        border-color: green;
    }
    .question-list-view .incorrect {
        border-color: red;
    }

    .question-list-view .smalltext {
        font-size: .7em;
        color: darkslategray;
        margin-bottom: 0;
    }
    .question-list-view .smalltext + p {
        margin-top: 0;
    }
    .question-list-view .row.nomargin {
        margin-bottom: 0;
        width:100%;
    }
    .question-list-view .collapsible-header .select-dropdown {
        margin-bottom: 0  !important;
    }
    .question-list-view .questionlist-header {
        background: white;
        padding: 10px 10px 0px 10px;
        border-bottom: 1px solid #ddd;
    }
    .question-list-view .collapsible-body {
        background: white;
    }
</style>
