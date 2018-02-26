<template>
	<div id="info-view">
        <h4>SuperLearn</h4>
        <h6>Version: 1.0.0</h6>
		<p>SuperLearn entsteht im Rahmen des Moduls "MT70 Webanwendungen (Webprogrammierung 2)" 
        der THM. Ziel ist es eine Lernplattform für Studierende zu schaffen. 
        Vorerst wird nur die THM und der Studiengang Medieninformatik unterstützt, 
        weitere folgen erst nach dem Release.</p>
        <h5>Entwickler</h5>
        <p v-for="dev in developer" :key="dev.name">
            {{dev.name}}<br>
            {{dev.job}}
            </p>
	</div>

</template>

<script>
import {version} from '../../package.json'

export default{
	name: 'dev-list',
	data() {
		return{ 
			developer: [
            {name: 'Dennis Richter' , job: 'Projektleiter'},
      		{name: 'Julian Mies' , job: 'Designer'},
            {name: 'Tobias Schaub' , job: 'Entwickler'},
            {name: 'Oguz Bulunmaz' , job: 'Entwickler'},
            ],
		}
  	}
}

</script>

<style>

</style>
