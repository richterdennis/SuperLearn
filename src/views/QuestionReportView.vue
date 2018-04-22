<template>
    <div class="question-report-view modal">
        <div class="modal-content">
            <h4>Frage #{{ question.id }} melden</h4>
            <p class="flow-text center ">{{ question.text }}</p>
            <form class="row" id="question-report-form" @submit.prevent="submitReport">
                <div class="input-field col s12">
                    <select name="select-reason" id="select-reason">
                        <option value="-1" disabled selected>Bitte wählen...</option>
                        <option v-for="reason in reportReasons" :value="reason.id" :key="reason.id">{{ reason.text }}</option>
                    </select>
                    <label for="select-reason">Was ist der Grund für die Meldung?</label>
                </div>
                <div class="input-field col s12">
                    <textarea name="text-reason-specific" id="text-reason-specific" class="materialize-textarea"></textarea>
                    <label for="text-reason-specific">Beschreibe den Grund genauer!</label>
                </div>
            </form>
        </div>
        <div class="modal-footer">
            <a href="#!" class="modal-action modal-close waves-effect waves-green btn-flat">Abbrechen</a>
            <a href="#!" class="modal-action waves-effect waves-green btn-flat">Senden</a>
        </div>
    </div>
</template>

<script>
export default {
    data: function() {
        return {
            reportReasons: [
                { id: 1, text: "Anstößiger Inhalt" },
                { id: 2, text: "Doppelt vorhanden" },
                { id: 3, text: "Rechtschreibung" },
                { id: 4, text: "Trollfrage" },
                { id: 5, text: "Sonstiges" }                
            ]
        }
    },
    props: ['question'],
    mounted() {
        $('select').material_select();
    }
}
</script>

<style>
    .question-report-view #question-report-form {
        margin-top: 12px;
    }
</style>
