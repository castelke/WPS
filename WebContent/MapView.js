    //variables a ajouter a la map
    var wmsLayer;
    var wfsLayer;
    var fond;
    var currentMap;
    var reprintmap =0;
    
    window.onload = mapinit(0);
    
   function mapinit(n){
    	
	   
		if (n==0){
		    map = L.map('mapid',{drawControl: true}).setView([48.39975, -4.49938], 12);
		    drawnItems = new L.FeatureGroup();
		   // map.addLayer(drawnItems);
		    drawControl = new L.Control.Draw({
		        edit: {
		            featureGroup: drawnItems
		        }
		    });
		   //map.addControl(drawControl);
		    
		    
		    printFond();
		
		    //reglage de l'opacite
		     higherOpacity = new L.Control.higherOpacity();
		    map.addControl(higherOpacity);
		     lowerOpacity = new L.Control.lowerOpacity();
		    map.addControl(lowerOpacity);
		     opacitySlider = new L.Control.opacitySlider();
		    map.addControl(opacitySlider);
		}
		
		else if(n==1){
			map.off();
			map.remove();
			mapinit(0);
			document.getElementById('listecouchemap').innerHTML ="";
			nbcouchemap=0;
		}
		else{
			map.off();
			map.remove();
			mapinit(0);
		}
    }
    
    

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
        
       
        
   function reprint(){
        	
	   var i=0;
	   reprintmap =1;
       mapinit(2);
        	
        	
        for (i=0; i<nbcouchemap;i++){
        		
        	if(document.getElementById("c" + i).checked){
        	/*alert(couchemap[i]);
        	alert(adressemap[i]);
        	alert(formatmap[i]);*/
        			
        	if (formatmap[i].indexOf("json")>=0){
        		setCoucheWFS(couchemap[i]);
            	setAdresseWFS(adressemap[i]);
            	printWFS();
        	}
        	else{
        		setCoucheWMS(couchemap[i]);
            	setAdresseWMS(adressemap[i]);
        		printWMS();
        		}
        	}
        }
       	reprintmap =0;
   }
