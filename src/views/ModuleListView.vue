<template>
    <div id="module-list-view" class="collection">
        <a href="#" class="collection-item back green-text accent-4" v-if="layer == 1" @click.prevent="showSemesterList"><i class="material-icons">arrow_back</i> <span>Zurück</span></a>
        <a href="#" class="collection-item avatar green-text accent-4" v-for="item in list" :key="item.id" @click.prevent="open(item)">
            <i class="circle">{{item.short}}</i>
            <span class="title">{{item.long}}</span>
            <span class="question-counter right">{{item.questions}}</span>
            <div class="progress">
                <div class="determinate" :style="'width: ' + item.progress + '%'"></div>
            </div>
        </a>
    </div>
</template>

<script>
import { ModuleRouter } from '../classes/Router.js';

import RoundView from './RoundView.vue';

export default {
    name: 'moduleListView',
    data() {
        return {
            layer: 0,
            list: [],
            semester: [],
            modules: []
        }
    },
    mounted() {
        ModuleRouter.getModules().then(modules => {
            this.modules = modules;
            this.semester = this.generateSemester();
            this.list = this.semester;
        });

    },
    methods: {
        open(item) {
            // if item is type of semester
            if(this.layer == 0) {
                this.layer = 1;
                this.list = item.modules;
                this.$emit('titleChanged', item.long);
            }
            else {
                App.startView(RoundView, {
                    module: item
                });
            }
        },
        showSemesterList() {
            this.layer = 0;
            this.list = this.semester;
            this.$emit('titleChanged', 'Home');
        },
        generateSemester() {
            const semester = [];

            semester.push({
                id: 0,
                short: 'M',
                long: 'Meine Module',
                questions: 0,
                progress: 0,
                modules: []
            });

            this.modules.forEach(module => {
                if(semester.length - 1 < module.semester) {
                    for(let i = semester.length; i <= module.semester; i++) {
                        semester.push({
                            id: i,
                            short: i,
                            long: i + '. Semester',
                            questions: 0,
                            progress: 0,
                            modules: []
                        });
                    }
                }

                const currentSemester = semester[module.semester];
                currentSemester.progress += module.progress;
                currentSemester.questions += module.questions;
                currentSemester.modules.push(module);

                if(module.status == 1) {
                    semester[0].progress += module.progress;
                    semester[0].questions += module.questions;
                    semester[0].modules.push(module);
                }
            });

            semester.forEach(s => {
                if(s.modules.length != 0) {
                    s.progress /= s.modules.length;
                }
            });

            return semester;
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

.collection-item.back {
    display: flex !important;
    align-items: center;
}

.collection-item.back > * {
    font-size: 17px;
}

.collection-item.back > span {
    margin-left: 10px;
}

.progress {
    margin-bottom: 0;
}
</style>
