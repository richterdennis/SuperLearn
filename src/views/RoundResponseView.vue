<template>
    <div id="round-response-view">
        <div class="question" v-for="(n, i) in answers.length" :key="i">
            <div class="question-text">{{round.questions[i].text}}</div>
            <div class="question-text">Deine Antwort war {{answers[i].correct ? 'richtig' : 'falsch'}}!</div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'roundResponseView',
    props: ['round', 'answers']
}
</script>

<style>
#round-response-view .question {
    margin-bottom: 15px;
}
</style>
