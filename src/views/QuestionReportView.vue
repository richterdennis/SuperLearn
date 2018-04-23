<template>
    <div class="question-report-view modal" id="question-report-modal">
        <form id="question-report-form" @submit.prevent="submitReport">
            <div class="modal-content">
                <h4>Frage #{{ question.id }} melden</h4>
                <p class="flow-text center ">{{ question.text }}</p>
                <div class="input-field col s12">
                    <select name="select-reason" id="select-reason" v-model="selectedReason" ref="select-reason">
                        <option value="-1" disabled selected>Bitte wählen...</option>
                        <option v-for="reason in reportReasons" :value="reason.id" :key="reason.id">{{ reason.text }}</option>
                    </select>
                    <label for="select-reason">Was ist der Grund für die Meldung?</label>
                </div>
                <div class="input-field col s12">
                    <textarea name="text-reason-specific" id="text-reason-specific" class="materialize-textarea" v-model="reasonDesc" required></textarea>
                    <label for="text-reason-specific">Beschreibe den Grund genauer!</label>
                </div>
            </div>
            <div class="modal-footer">
                <a href="#!" class="modal-action modal-close waves-effect waves-green btn-flat">ABBRECHEN</a>
                <button type="submit" class="col s12 waves-effect waves-light btn" :disabled="!reasonWasSelected">SENDEN</button>
            </div>
        </form>
    </div>
</template>

<script>
import { ReportRouter } from '../classes/Router.js'

export default {
    data: function() {
        return {
            reportReasons: [
                { id: 1, text: "Anstößiger Inhalt" },
                { id: 2, text: "Doppelt vorhanden" },
                { id: 3, text: "Rechtschreibung" },
                { id: 4, text: "Trollfrage" },
                { id: 5, text: "Sonstiges" }                
            ],
            selectedReason: -1,
            reasonDesc: ""
        }
    },
    props: ['question'],
    computed: {
        reasonWasSelected: function() {
            return this.selectedReason > 0;
        }
    },
    methods: {
        submitReport() {
            let report = {
                reportTypeId: this.selectedReason,
                text: this.reasonDesc,
                questionId: this.question.id
            }

            ReportRouter.createReport(report).then((response) => {
                this.reasonDesc = "";
                this.selectedReason = -1;
                Materialize.toast(
                    'Report wurde versendet!',
                    3000
                );

                $('.modal').modal('close');
            }).catch(e => {
                throw 'Something went wrong!';
            });
        }
    },
    mounted() {
        $('select').material_select();
        $(this.$refs["select-reason"]).on('change', (e) => {
            this.selectedReason = parseInt(e.target.value);
        });
    }
}
</script>

<style>
    .question-report-view .flow-text{
        margin-bottom: 32px;
    }
</style>
