<template>
    <activity id="new-question-view" :title="title" icon="close" layer="10" @onIconClicked="close">
        <div class="row" id="new-question-form">
            <div class="input-field col s12">
                <select name="select-course" id="select-course">
                    <option value="-1" disabled selected>Bitte wähle einen Kurs...</option>
                </select>
                <label for="select-course">Kurs</label>
            </div>
            <div class="input-field col s12">
                <select name="select-question-type" id="select-question-type">
                    <option value="-1" disabled selected>...und einen Fragetypen</option>
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

export default {
    name: 'newQuestionView',
    data() {
        return {
            title: 'Neue Frage erstellen'
        }
    },
    components: {
        Activity
    },
    methods: {
        close() {
            this.$emit('close');
        }
    },
    mounted() {
        $('select').material_select();
    }
}
</script>

<style>
    #new-question-form {
        padding: 20px 8px
    }
</style>
