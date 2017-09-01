    //variables a ajouter a la map
    var wmsLayer;
    var wfsLayer;
    var fond;

    
    var map = L.map('mapid',{drawControl: true}).setView([48.39975, -4.49938], 12);
    var drawnItems = new L.FeatureGroup();
   // map.addLayer(drawnItems);
    var drawControl = new L.Control.Draw({
        edit: {
            featureGroup: drawnItems
        }
    });
   //map.addControl(drawControl);
    
    
    printFond();

    //reglage de l'opacite
    var higherOpacity = new L.Control.higherOpacity();
    map.addControl(higherOpacity);
    var lowerOpacity = new L.Control.lowerOpacity();
    map.addControl(lowerOpacity);
    var opacitySlider = new L.Control.opacitySlider();
    map.addControl(opacitySlider);

    function printFond() {
        fond = buildMap();
        //affichage de la map OSM
        fond.addTo(map);
    }

    function buildMap() {
        //construction du fond de la map
            fond = L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
                subdomains: ['a', 'b', 'c']
            })
            return fond;
        }

        //appel a la fonction appelWMS de WSAPI.js
        function printWMS(){
            wmsLayer = appelWMS();
 
            //affichage de la couche
            wmsLayer.addTo(map);
        }

        //appel a la fonction appelWFS de WSAPI.js
        function printWFS(){
            wfsLayer = appelWFS();

            //affichage de la couche WMS
            wfsLayer.addTo(map);
        }
