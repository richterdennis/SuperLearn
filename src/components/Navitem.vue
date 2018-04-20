<template>
    <div v-show="this.isActive">
        <slot></slot>
    </div>
</template>

<script>
export default {
    name: 'navitem',
    props: {
        name: {required: true},
        selector: {required: true},
        selected: {default: false},
        hidden: {default: false}
    },
    data() {
        return {
            isActive: false
        }
    },
    mounted() {
        this.isActive = this.selected;
    }
}
</script>
