<template>
	<div id="rules-view">
		<ul id="rule-list" class="collection">
  			<li v-for="rule in rules" :key="rule.title" class="collection-item">
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
      		{title: '1. Regel' , text: 'Keine Anstößigen oder beleidigenden Usernamen wählen'},
      		{title: '2. Regel' , text: 'Vor dem Hochladen muss die Korrektheit einer Frage geprüft werden'},
			{title: '3. Regel' , text: 'Anstößige, falsche oder troll Fragen müssen gemeldet werden'},
    		]
		}
  	}
}

</script>

<style>
	
</style>
