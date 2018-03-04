<template>
    <div id="round-response-view">
          <ul class="collapsible" data-collapsible="accordion">
            <question-list-item
                v-for="(n, i) in answers.length"
                :key="i"
                :question="round.questions[i]"
                :answer="answers[i]"
            ></question-list-item>
        </ul>
    </div>
</template>

<script>
import QuestionListItem from './QuestionListItem.vue';

export default {
    name: 'roundResponseView',
    props: ['round', 'answers'],
    components: {
        QuestionListItem
    },    
    mounted() {
        $(document).ready(function(){
        $('.collapsible').collapsible();
        });
    }
}
</script>

<style>
.collapsible-body {
    background-color: white;
}
</style>
