<template>
    <div id="wall-of-fame-view">
        <ul id="wall-of-fame-list" class="collection">
            <li v-for="(user, index) in users" :key="user.id" class="collection-item">
                <span class="badge white-text" :class="badgeColor(index)">{{ index + 1 }}.</span>
                {{ user.nickname }}
                <div class="userscore">score: {{ user.score }}</div>
            </li>
        </ul>
    </div>
</template>

<script>
import {UserRouter} from '../classes/Router.js'

export default{
    name: 'wall-of-fame-list',
    data() {
        return{
            users: [],
        }
    },
    mounted(){
        UserRouter.getWallOfFame().then(users => {
            this.users = users
        })
    },
    methods: {
        badgeColor(i) {
            switch(i) {
                case 0: return 'gold';
                case 1: return 'silber';
                case 2: return 'bronze';
                default: return 'superLearn green';
            }
        }
    }
}
</script>

<style>
    .superLearn.green{
        background-color: #00C853 !important;
    }
    .gold{
        background-color: #D4AF37;
    }
    .silber{
        background-color: #C0C0C0;
    }
    .bronze{
        background-color: #CD7F32;
    }
    div.userscore{
        float: right;
    }
    span.badge{
        margin-right: 2%;
        float: left;
    }
</style>
