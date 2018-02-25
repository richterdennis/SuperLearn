<template>
    <div id="module-list-view" class="collection">
        <a href="#" class="collection-item avatar" v-for="item in semester" :key="item.id">
            <i class="circle">{{item.shortDesc}}</i>
            <span class="title">{{item.longDesc}}</span>
            <span class="question-counter right">{{item.questions}}</span>
            <div class="progress">
                <div class="determinate" :style="'width: ' + item.progress + '%'"></div>
            </div>
        </a>
    </div>
</template>

<script>
import { ModuleRouter } from '../classes/Router.js';

export default {
    name: 'moduleListView',
    data() {
        return {
            modules: []
        }
    },
    mounted() {
        ModuleRouter.getModules().then(modules => {
            this.modules = modules;
        });
    },
    computed: {
        semester() {
            const semester = [];

            semester.push({
                id: 0,
                shortDesc: 'M',
                longDesc: 'Meine Module',
                questions: 0,
                progress: 0,
                modules: []
            });

            this.modules.forEach(module => {
                if(semester.length - 1 < module.semester) {
                    for(let i = semester.length; i <= module.semester; i++) {
                        semester.push({
                            id: i,
                            shortDesc: i,
                            longDesc: i + '. Semester',
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

.progress {
    margin-bottom: 0;
}
</style>
