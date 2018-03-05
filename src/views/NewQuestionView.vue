<template>
    <activity id="new-question-view" :title="title" icon="close" layer="10" @onIconClicked="close">
        <div>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis rem consectetur fugiat perferendis beatae magni error tenetur impedit accusamus saepe, nisi explicabo laboriosam voluptatem totam dolore corporis suscipit optio architecto!</p>
        </div>
    </activity>
</template>

<script>
import Activity from '../components/Activity.vue';

export default {
    name: 'newQuestionView',
    components: {
        Activity
    },
    methods: {
        close() {
            this.$emit('close');
        }
    }
}
</script>