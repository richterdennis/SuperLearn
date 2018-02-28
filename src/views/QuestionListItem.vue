<template>
    <div class="question-list-item">
        <div class="question-text">{{question.text}}</div>
        <div class="question-text">Deine Antwort war {{answer.correct ? 'richtig' : 'falsch'}}!</div>
    </div>
</template>

<script>
export default {
    name: 'questionListItem',
    props: ['question', 'answer']
}
</script>
