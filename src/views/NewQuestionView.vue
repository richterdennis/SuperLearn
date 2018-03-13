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
                <input type="text" name="input-questionText" id="input-questionText" required>
                <label for="input-questionText">Fragetext</label>
            </div>
            <div class="col s12">
                <h5 v-if="!questionView">Bitte wähle einen Fragetypen</h5>
                <component v-bind:is="questionView" ref="current-view">
                <!-- component changes when vm.currentView changes! -->
                </component>
            </div>
            <button type="submit" class="col s12 waves-effect waves-light btn" >FRAGE ABSENDEN</button>
        </form>
    </activity>
</template>

<script>
import Activity from '../components/Activity.vue';
import { ModuleRouter } from '../classes/Router.js'
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
            questionView: null
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
            //console.log(this.questionView.getAnswers());
            console.log(this.$refs["current-view"].getAnswers());
        }
    },
    mounted() {
        $('select').material_select();
        $('select').on('change', (e) => {
            this.questionView = this.questionTypes[parseInt(this.$refs["select-question-type"].value) - 1].view;
            this.selectedModule = this.$refs["select-module"].value;
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
</style>
