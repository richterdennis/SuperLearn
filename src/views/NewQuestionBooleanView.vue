<template>
    <div id="new-question-boolean-view">
        <div class="row">
            <div class="col s12">
                <input type="checkbox" name="is-correct-answer" id="is-correct-answer" v-model="isCorrect">
                <label for="is-correct-answer">Die Aussage ist korrekt</label>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'newQuestionBooleanView',
    data() {
        return {
            isCorrect: false
        }
    },
    methods: {
        getAnswers() {
            return [
                {
                    text: null,
                    correct: this.isCorrect
                }
            ]
        }
    }
}
</script>

<style>
</style>
