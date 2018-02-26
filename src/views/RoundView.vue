<template>
    <activity id="round-view" title="Title" icon="close" layer="10" @onIconClicked="close">
        <h1>Test</h1>
    </activity>
</template>

<script>
import Activity from '../components/Activity.vue';

export default {
    name: 'roundView',
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
