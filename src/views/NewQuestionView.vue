<template>
    <activity id="new-question-view" :title="title" icon="close" layer="10" @onIconClicked="close">
        <div class="row" id="new-question-form">
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
                <h5 v-if="selectedType == -1">Bitte wähle einen Fragetypen</h5>
                <new-question-boolean-view v-else-if="selectedType == '1'"></new-question-boolean-view>
                <new-question-four-view v-else-if="selectedType == '2'"></new-question-four-view>
                <new-question-exact-view v-else-if="selectedType == '3'"></new-question-exact-view>
            </div>
            <button type="submit" class="col s12 waves-effect waves-light btn" disabled>FRAGE ABSENDEN</button>
        </div>
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
                { type: 1, name: "Richtig / Falsch" },
                { type: 2, name: "Quiz" },
                { type: 3, name: "Exakte Antwort" }
            ],
            selectedType: -1,
            selectedModule: -1
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
        }
    },
    mounted() {
        $('select').material_select();
        $('select').on('change', (e) => {
            this.selectedType = this.$refs["select-question-type"].value;
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
