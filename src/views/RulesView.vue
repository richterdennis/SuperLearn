<template>
    <div class="section">
            <div class="row">
                <div class="col s12 m6 offset-m3">
                    <ul class="collapsible popout" data-collapsible="accordion">
                        <li>
                            <div class="collapsible-header"><i class="material-icons green-text">filter_1</i>Wahl eines Nicknames</div>
                            <div class="collapsible-body"><span>Keine Anstößigen oder beleidigenden Nicknames wählen</span></div>
                        </li>
                        <li>
                            <div class="collapsible-header"><i class="material-icons green-text">filter_2</i>Korrekte Fragen</div>
                            <div class="collapsible-body"><span>Vor dem Hochladen muss die Korrektheit einer Frage geprüft werden</span></div>
                        </li>
                        <li>
                            <div class="collapsible-header"><i class="material-icons green-text">filter_3</i>Melden falscher Fragen</div>
                            <div class="collapsible-body"><span>Anstößige, falsche oder troll Fragen <span class="green-text">müssen</span> gemeldet werden </span></div>
                        </li>
                    </ul>
                </div>
        </div>
    </div>
</template>

<script>

export default {
    name: 'rulesview',
   
    mounted() {

    },
    methods: {
       
    }
}
  $(document).ready(function(){
    $('.collapsible').collapsible();
  });
</script>
