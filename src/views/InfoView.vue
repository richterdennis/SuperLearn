<template>
	<div id="info-view">
        <h4 class="title">SuperLearn</h4>
        <h6 class="version">Version: 1.0.0</h6>
		<p>SuperLearn entsteht im Rahmen des Moduls "MT70 Webanwendungen (Webprogrammierung 2)" 
        der THM. Ziel ist es eine Lernplattform für Studierende zu schaffen. 
        Vorerst wird nur die THM und der Studiengang Medieninformatik unterstützt, 
        weitere folgen erst nach dem Release.</p>
        <h5 class="title_dev">Entwickler:</h5>
        <div class="card-panel text-grey" v-for="dev in developer" :key="dev.name">
            <img class="bild circle" :src="url"/>
            {{dev.name}}<br>
            <div class="job">{{dev.job}}</div>
        </div>
	</div>
</template>

<script>
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

            url: "../assets/profile_picture.png",
        }
  	}
}
</script>

<style>
    #info-view{
        padding-left: 3%;
        padding-right: 3%;
        padding-bottom: 2%;
    }
    .title{
        padding-top: 2%;
    }
    .version{
        color: darkgrey;
        font-style: italic;
    }
    .bild{
        position: relative;
        float: left;
        height: 60px;
        width: 60px;
        top: -9px;
        left: -9px;
    }
    .job{
        font-size: 12px;
    }
</style>
