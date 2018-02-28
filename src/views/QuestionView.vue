<template>
    <div id="question-view">
        <div class="voting">
        </div>
        <div class="question">{{question.text}}</div>
        <div class="progress">
            <div class="determinate" style="width: 100%" ref="progress"></div>
        </div>
        <div class="answer-type-view-holder"></div>
        <div class="star-counter">StarCounter: {{question.starCounter}}</div>
    </div>
</template>

<script>
export default {
    name: 'questionView',
    props: ['question'],
    methods: {
        answer(givenAnswer) {
            this.$emit('answer', this.question, givenAnswer);
        }
    }
}
</script>

<style>
</style>
