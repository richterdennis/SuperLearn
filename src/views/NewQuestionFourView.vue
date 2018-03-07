<template>
    <div id="new-question-four-view">
        <div class="row">
            <div class="answer" v-for="n in 4" :key="n">
                <div class="input-field col s11">
                    <input type="text" :name="'answer' + n" :id="'answer' + n">
                    <label :for="'answer' + n">Antwort {{n}}</label>
                </div>
                <div class="col s1">
                    <input type="radio" name="correct-answer" :id="'correct-answer' + n" :value="n" v-model="checkedAnswer">
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
            checkedAnswer: 1
        }
    }
}
</script>

<style>
#new-question-four-view input[type=radio] + label {
    top: 24px;
}
</style>
