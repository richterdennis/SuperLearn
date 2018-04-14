<template>
    <div id="new-question-four-view">
        <div class="row">
            <div class="answer" v-for="(answer, n) in answers" :key="n">
                <div class="input-field col s11">
                    <input type="text" :name="'answer' + n" :id="'answer' + n" v-model="answer.text" class="validate" required>
                    <label :for="'answer' + n" data-error="Bitte gib einen Antworttext ein.">Antwort {{n}}</label>
                </div>
                <div class="col s1">
                    <input type="radio" name="correct-answer" :id="'correct-answer' + n" :value="n" v-model="correctAnswer">
                    <label :for="'correct-answer' + n"></label>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            answers: [
                {text: ""},
                {text: ""},
                {text: ""},
                {text: ""}
            ],
            correctAnswer: 0
        }
    },
    methods: {
        getAnswers() {
            let answer = [];
            let i = 0;
            this.answers.forEach(element => {
                answer.push({
                    text: element.text,
                    correct: this.correctAnswer == i++
                });
            });
            return answer;
        }
    }

}
</script>

<style>
#new-question-four-view input[type=radio] + label {
    top: 24px;
}
</style>
