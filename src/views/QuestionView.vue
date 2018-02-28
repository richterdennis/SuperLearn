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
    mounted() {
        new mojs.Tween({
            duration: this.question.duration * 1000,
            onUpdate: (progress) => {
                progress = 100 - progress * 100;
                this.$refs.progress.style.width = progress + '%';
            }
        }).play();
    },
    methods: {
        answer(givenAnswer) {
            this.$emit('answer', this.question, givenAnswer);
        }
    }
}
</script>

<style>
#question-view .progress .determinate {
    transition: inherit;
}
</style>
