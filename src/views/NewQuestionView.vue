<template>
    <activity id="new-question-view" :title="title" icon="close" layer="10" @onIconClicked="close">
        <form class="row" id="new-question-form" @submit.prevent="submitQuestion">
            <div class="input-field col s12">
                <select name="select-module" id="select-module" ref="select-module">
                    <option value="-1" disabled selected>Bitte wähle ein Modul...</option>
                    <option v-for="mod in sortedModules" :key="mod.id" :value="mod.id">{{ mod.long }}</option>
                </select>
                <label for="select-module">Modul</label>
            </div>
            <div class="input-field col s12">
                <select name="select-question-type" id="select-question-type" ref="select-question-type">
                    <option value="-1" disabled selected>...und einen Fragetypen</option>
                    <option v-for="questionType in questionTypes" :key="questionType.type" :value="questionType.type">{{ questionType.name }}</option>
                </select>
                <label for="select-question-type">Fragetyp</label>
            </div>
            <div class="input-field col s12">
                <input type="text" name="input-questionText" id="input-questionText" v-model="questionText" required>
                <label for="input-questionText">Fragetext</label>
            </div>
            <div class="input-field col s12">
                <textarea id="input-solutionText" class="materialize-textarea" v-model="solutionText"></textarea>
                <label for="input-solutionText">Lösung</label>
            </div>
            <div class="col s12 child-component">
                <h5 v-if="!questionView">Bitte wähle einen Fragetypen</h5>
                <component v-bind:is="questionView" ref="current-view">
                <!-- component changes when vm.currentView changes! -->
                </component>
            </div>
            <button type="submit" class="col s12 waves-effect waves-light btn" :disabled="submitInProgess">FRAGE ABSENDEN</button>
        </form>
    </activity>
</template>

<script>
import Activity from '../components/Activity.vue';
import { ModuleRouter } from '../classes/Router.js'
import { QuestionRouter } from '../classes/Router.js'
import NewQuestionBooleanView from './NewQuestionBooleanView.vue'
import NewQuestionFourView from './NewQuestionFourView.vue'
import NewQuestionExactView from './NewQuestionExactView.vue'

export default {
    name: 'newQuestionView',
    data() {
        return {
            title: 'Neue Frage erstellen',
            modules: [],
            questionTypes: [
                { type: 1, name: "Richtig / Falsch", view: NewQuestionBooleanView },
                { type: 2, name: "Quiz", view: NewQuestionFourView },
                { type: 3, name: "Exakte Antwort", view: NewQuestionExactView }
            ],
            selectedType: -1,
            selectedModule: -1,
            questionView: null,
            questionText: "",
            solutionText: "",
            submitInProgess: false
        }
    },
    components: {
        Activity,
        NewQuestionBooleanView,
        NewQuestionFourView,
        NewQuestionExactView
    },
    computed: {
        sortedModules: function() {
            return this.modules.sort((a,b) => {
                return (a.long > b.long) ? 1 : -1;
            });
        }
    },
    methods: {
        close() {
            this.$emit('close');
        },
        submitQuestion() {
            this.submitInProgess = true;
            let question = {
                text: this.questionText,
                image: "",
                questionType: this.selectedType,
                moduleId: this.selectedModule,
                tags: [1],
                answers: this.$refs["current-view"].getAnswers(),
                solution: {
                    text: this.solutionText,
                    image: ""
                }
            }

            QuestionRouter.postNewQuestion(question).then((response) => {
                Cache.remove(App.CACHE.MY_QUESTIONS);
                this.$emit('close');
            }).catch(e => {
                this.submitInProgess = false;
                throw 'Something went wrong!';
            });
        }
    },
    mounted() {
        $('select').material_select();
        $('select').on('change', (e) => {
            this.selectedType = parseInt(this.$refs["select-question-type"].value);
            this.questionView = this.questionTypes[this.selectedType - 1].view;
            this.selectedModule = parseInt(this.$refs["select-module"].value);
        });

        ModuleRouter.getModules().then(modules => {
            this.modules = modules;
            setTimeout(() => $('select').material_select(), 0);
        });
    }
}
</script>

<style>
    #new-question-form {
        padding: 20px 8px 8px 8px
    }
    #new-question-form .col.child-component {
        padding: 0;
    }
</style>
