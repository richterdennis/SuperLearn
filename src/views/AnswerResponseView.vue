<template>
    <h1>AnswerResponseView</h1>
</template>

<script>
export default {
    name: 'answerResponseView',
    props: ['question', 'answer'],
    methods: {
        next() {
            this.$emit('answer', this.question);
        }
    }
}
</script>
