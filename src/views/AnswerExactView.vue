<template>
    <form id="answer-exact-view" @submit.prevent="doAnswer">
        <div class="row container">
            <div class="input-field col s12">
                <!-- <i class="material-icons prefix">mode_edit</i> -->
                <input id="icon_prefix" v-model="answer" type="text" class="validate">
                <label for="icon_prefix">Antwort eingeben und mit Enter bestätigen</label>
            </div>
        </div>
    </form>
</template>

<script>
export default {
    name: 'answerExactView',
    props: ['answers'],
    data() {
        return {
            answer: ''
        }
    },
    methods: {
        doAnswer() {
            this.$emit('answer', {
                text: this.answer,
                correct: this.answer == this.answers[0].text
            });
        }
    }
}
</script>
