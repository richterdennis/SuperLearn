<template>
    <div id="user-profile-view" class="card-panel text-grey row">
        <div id="header" class="col s12">
            {{user.nickname}}
            <hr/>
        </div>
        <div id="content" class="col s12">
            <img class="bild circle" :src="url"/>
            <div class="userContent">
                E-mail: {{user.email}}<br>
                Punktestand: {{user.score}}
            </div>    
        </div>
        <div id="footer" class="col s12">
            <hr/>
            {{userRole}}
            <div id="userCreated"> Mitglied seit: {{MemberSince(user.created*1000)}} </div>
        </div>
    </div>
</template>

<script>
import {UserRouter} from '../classes/Router.js'

export default {
    name: 'user-profile-view',
	data() {
		return{ 
			user: [],

            url: "../assets/profile_picture.png",
        }
  	},
    
    mounted() {
        UserRouter.getMe().then(users => {
            this.user = users
        })
    },

    methods: {
        MemberSince(timestamp) {
            return new Date(timestamp).toLocaleDateString();
        },
    },

    computed: {
        userRole: function () {
            switch(this.user.role) {
                case 1: return 'Student';
                case 2: return 'Admin';
                case 3: return 'Dozent';
                case 4: return 'Lecturer';
                default: return 'superLearn Gamer';
            }
        }
    }
}
</script>

<style>
hr{
    display: block;
    height: 1px;
    border: 0;
    border-top: 1px solid #ccc;
    margin: 1em 0;
    padding: 0;
}
.bild{
        margin-right: 4%;
        position: relative;
        float: left;
        height: 150px;
        width: 150px;
    }
.userContent{
    position: relative;
    top: 50px;
}
#userCreated{
        float: right;
}
</style>


