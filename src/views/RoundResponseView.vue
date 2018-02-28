<template>
    <div id="round-response-view">
        <question-list-item
            v-for="(n, i) in answers.length"
            :key="i"
            :question="round.questions[i]"
            :answer="answers[i]"
        ></question-list-item>
    </div>
</template>

<script>
import QuestionListItem from './QuestionListItem.vue';

export default {
    name: 'roundResponseView',
    props: ['round', 'answers'],
    components: {
        QuestionListItem
    }
}
</script>

<style>
#round-response-view .question-list-item {
    margin-bottom: 15px;
}
</style>
