<template>
    <div id="new-question-exact-view">
        <div class="row">
            <div class="input-field col s12">
                <input type="text" name="exact-answer" id="exact-answer" v-model="exactAnswer" class="validate" pattern=".{2,20}" required>
                <label for="exact-answer" data-error="Die Antwort muss zwischen 2 und 20 Zeichen lang sein!">Exakte Antwort</label>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'newQuestionExactView',
    data() {
        return {
            exactAnswer: ""
        }
    },
    methods: {
        getAnswers() {
            return [
                {
                    text: this.exactAnswer,
                    correct: true
                }
            ]
        }
    }
}
</script>

<style>
</style>
