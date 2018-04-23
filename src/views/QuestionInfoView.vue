<template>
    <div class="question-info-view modal">
        <div class="modal-content">
            <h5>Infos zur Frage</h5>
            <hr/>
            <div style="font-size: calc(0.75em + 1vmin);">
                id: <b>{{question.id}}</b><br>
                Ersteller: <b style="color: blue">{{question.userId}}</b><br>
                Erstellt am: <b>{{QuestionCreated(question.created *1000)}}</b><br>
                Beantwortet: <b>{{question.answeredCounter}}</b><br>
                davon Falsch: <b>{{question.wrongCounter}}</b>
            </div>
            <hr/>
        </div>
        <div class="modal-footer">
            <a href="#!" class="modal-action modal-close waves-effect waves-green btn-flat">Zurück</a>
        </div>
    </div>
</template>

<script>
export default {
    name: 'question-info-view',
    props: ['question'],

    methods: {
        QuestionCreated(timestamp) {
            return new Date(timestamp).toLocaleDateString();
        },
    },
}
</script>
