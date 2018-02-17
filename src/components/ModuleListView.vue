<template>
    <div id="module-list-view" class="collection">
        <a href="#" class="collection-item avatar" v-for="item in list" :key="item.id">
            <i class="circle">{{item.shortDesc}}</i>
            <span class="title">{{item.longDesc}}</span>
            <span class="question-counter right">{{item.questionCounter}}</span>
            <div class="progress">
                <div class="determinate" :style="'width: ' + item.progress + '%'"></div>
            </div>
        </a>
    </div>
</template>

<script>
export default {
    name: 'moduleListView',
    data() {
        return {
            list: [{
                id: 1,
                shortDesc: '1',
                longDesc: 'Semester 1',
                questionCounter: 70,
                progress: 70
            }, {
                id: 2,
                shortDesc: '2',
                longDesc: 'Semester 2',
                questionCounter: 65,
                progress: 65
            }, {
                id: 3,
                shortDesc: '3',
                longDesc: 'Semester 3',
                questionCounter: 33,
                progress: 33
            }, {
                id: 4,
                shortDesc: '4',
                longDesc: 'Semester 4',
                questionCounter: 5,
                progress: 5
            }, {
                id: 5,
                shortDesc: '5',
                longDesc: 'Semester 5',
                questionCounter: 0,
                progress: 0
            }]
        }
    }
}
</script>

<style>
.collection {
    margin: 0;
}

.collection-item.avatar {
    min-height: 62px !important;
}

.progress {
    margin-bottom: 0;
}
</style>
