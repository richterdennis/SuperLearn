<template>
    <div id="module-list-view" class="collection">
        <a href="#" class="collection-item back" v-if="layer == 1" @click.prevent="showSemesterList"><i class="material-icons">arrow_back</i> <span>Zurück</span></a>
        <a href="#" class="collection-item avatar" v-for="item in list" :key="item.id" @click.prevent="open(item)">
            <i class="circle" :class="'status' + item.status" @click.stop="layer == 1 && changeStatus(item)">{{item.short}}</i>
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
                this.list = item.modules.sort((a, b) => {
                    if(a.status != b.status)
                        return (a.status ^ 1) - (b.status ^ 1);

                    return a.long.toLowerCase().localeCompare(b.long.toLowerCase());
                });
                this.$emit('titleChanged', item.long);
            }
            else {
                App.startView(RoundView);
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
                modules: [],
                status: 0
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
                            modules: [],
                            status: 0
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
        },
        changeStatus(module) {
            module.status = (module.status + 1) % 3;

            if(module.status == 1) {
                this.semester[0].modules.push(module);
            }
            else {
                const index = this.semester[0].modules.findIndex(
                    m => m.id == module.id
                );
                ~index && this.semester[0].modules.splice(index, 1);
            }

            ModuleRouter.setModuleStatus(module.id, module.status);
            const statusTexts = [
                'demarkiert',
                'als Favorit markiert',
                'als Bestanden markiert'
            ];
            Materialize.toast(
                'Modul wurde ' + statusTexts[module.status],
                1000
            );
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

.collection-item.avatar .circle {
    font-size: 14px !important;
    color: #666 !important;
    border: 1px solid #ccc;
}

.collection-item.avatar .circle.status0 {
    background-color: #FFF !important;
}

.collection-item.avatar .circle.status1 {
    background-color: #bcfcc6 !important;
}

.collection-item.avatar .circle.status2 {
    background-color: #ccc !important;
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
