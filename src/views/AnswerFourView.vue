<template>
    <div id="answer-four-view container">
        <div class="container row">
            <div class="collection">
                <a class="collection-item" v-for="a in answers" :key="a.id" @click="$emit('answer', a)">{{a.text}}</a>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'answerFourView',
    props: ['answers']
}
</script>
