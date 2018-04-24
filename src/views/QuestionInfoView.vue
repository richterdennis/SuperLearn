<template>
    <div class="question-info-view modal">
        <div class="modal-content">
            <h5>Infos zur Frage</h5>
            <hr/>
            <div style="font-size: calc(0.75em + 1vmin);">
                Id: <b>{{question.id}}</b><br>
                Ersteller: <b>{{questionCreator.nickname || question.userId}}</b><br>
                Erstellt am: <b>{{QuestionCreated(question.created *1000)}}</b><br>
                Beantwortet: <b>{{question.answeredCounter}}</b><br>
                Davon Falsch: <b>{{question.wrongCounter}}</b>
            </div>
            <hr/>
        </div>
        <div class="modal-footer">
            <a href="#!" class="modal-action modal-close waves-effect waves-green btn-flat">Zurück</a>
        </div>
    </div>
</template>

<script>
import { UserRouter } from "../classes/Router.js";

export default {
    name: 'question-info-view',
    props: ['question'],
    data() {
        return {
            questionCreator: {}
        }
    },
    watch: {
        question: function() {
            UserRouter.getUser(this.question.userId).then(user => {
                this.questionCreator = user
            });
        }
    },
    methods: {
        QuestionCreated(timestamp) {
            return new Date(timestamp).toLocaleDateString();
        },
    },
}
</script>
