<template>
    <div id="answer-four-view">
        <button v-for="a in answers" :key="a.id" @click="$emit('answer', a)">{{a.text}}</button>
    </div>
</template>

<script>
export default {
    name: 'answerFourView',
    props: ['answers']
}
</script>
