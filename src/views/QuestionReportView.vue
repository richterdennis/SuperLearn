<template>
    <div class="question-report-view modal">
        <div class="modal-content">
            <h4>Frage melden</h4>
            <form class="row" id="question-report-form" @submit.prevent="submitReport">
                <p>{{question}}</p>
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
    props: ['question']
}
</script>
