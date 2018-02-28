<template>
    <div id="wall-of-fame-view">
        <ul id="wall-of-fame-list" class="collection">
  			<li v-for="(user, index) in users" :key="user.id" class="collection-item">
				  {{ index + 1 }}. {{ user.nickname }}
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
    }
}
</script>
