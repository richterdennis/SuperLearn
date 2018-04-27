<template>
	<div id="rules-view">
		<ul id="rule-list" class="collection">
  			<li v-for="rule in rules" :key="rule.title" class="collection-item">
				  <img :src="rule.image" id="image"/>
				  {{ rule.title }}<br>
				  {{ rule.text }}
				  </li>
		</ul>
	</div>

</template>

<script>
export default{
	name: 'rule-list',
	data() {
		return{
			rules: [
			  {title: '1. Regel' , text: 'Keine Anstößigen oder beleidigenden Usernamen wählen',
			  image: 'assets/rules_1.png'},
      		{title: '2. Regel' , text: 'Vor dem Hochladen muss die Korrektheit einer Frage geprüft werden',
			  image: 'assets/rules_2.png'},
			{title: '3. Regel' , text: 'Anstößige, falsche oder troll Fragen müssen gemeldet werden',
			  image: 'assets/rules_3.png'},
    		]
		}
  	}
}

</script>

<style>
	#image{
		float: left;
		height: 45px;
		width: auto;
		margin-right: 2%;
	}
</style>
