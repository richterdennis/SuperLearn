<template>
    <activity id="new-question-view" :title="title" icon="close" layer="10" @onIconClicked="close">
        <div class="row" id="new-question-form">
            <div class="input-field col s12">
                <select name="select-module" id="select-module">
                    <option value="-1" disabled selected>Bitte wähle ein Modul...</option>
                    <option v-for="mod in sortedModules" :key="mod.id" :value="mod.id">{{ mod.long }}</option>
                </select>
                <label for="select-module">Kurs</label>
            </div>
            <div class="input-field col s12">
                <select name="select-question-type" id="select-question-type">
                    <option value="-1" disabled selected>...und einen Fragetypen</option>
                    <option v-for="questionType in questionTypes" :key="questionType.id" :value="questionType.id">{{ questionType.name }}</option>
                </select>
                <label for="select-question-type">Fragetyp</label>
            </div>
            <div class="input-field col s12">
                <input type="text" name="input-questionText" id="input-questionText" required>
                <label for="input-questionText">Fragetext</label>
            </div>
            <template>
                <h1>Template hier einfügen...</h1>
            </template>
            <button type="submit" class="col s12 waves-effect waves-light btn">FRAGE ABSENDEN</button>
        </div>
    </activity>
</template>

<script>
import Activity from '../components/Activity.vue';
import { ModuleRouter } from '../classes/Router.js'

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
            ]
        }
    },
    components: {
        Activity
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

        ModuleRouter.getModules().then(modules => {
            this.modules = modules;
            setTimeout(() => $('select').material_select(), 0);
        });
    }
}
</script>

<style>
    #new-question-form {
        padding: 20px 8px
    }
</style>
