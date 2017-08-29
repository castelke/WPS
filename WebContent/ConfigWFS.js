function recuperationUrl(u){
	//alert(u);
	setAdresseWFS(u);
} 

function recuperationCouche(c){
	//alert(c);
	//alert(adressewfs);
	setCoucheWFS(c);
	//var map = L.map('mapid',{drawControl: true}).setView([48.39975, -4.49938], 12);
	//buildMap();
	//document.getElementById("map").innerHTML = "<div id='mapid' style='width: 100%; height: 100%;'></div>";
	//buildMap();
	
	//map.remove();
	//document.getElementById("mapid").innerHTML = "";
	//document.getElementById("mapid").innerHTML = "<div id='mapid' style='visibility:hidden'> </div>";
	
	//buildMap();
	
	
	appelWFS();
	printWFS();
	
	
	
	//var rootUrl = 'http://tomcat.capecodgis.com/geoserver/capecodgis/ows';

	/*var defaultParameters = {
	    service: 'WFS',
	    version: '1.0.0',
	    request: 'GetFeature',
	    typeName: couchewfs,
	    maxFeatures: 1,
	    //outputFormat: 'text/javascript',
	    jsonCallback: 'jsonp'
	  //  format_options: 'callback: getJson'

	};
	
	var parameters = L.Util.extend(defaultParameters);
	alert(adressewfs.substring(0,adressewfs.length-1) + L.Util.getParamString(parameters));*/
	
	
/*	$.ajax({
	    url: adressewfs.substring(0,adressewfs.length-1) + L.Util.getParamString(parameters),
	    dataType: 'jsonp',
	   // jsonpCallback: 'getJson',
	    success: function(data) {
	    	alert("success");
	    	handleJson(data);
        }
	
	
	});*/
	
	
    $.ajax({
        type: "GET",
        url: adressewfs,
        data : {
    	    service: 'WFS',
    	   // version: '1.0.0',
    	    request: 'GetFeature',
    	    typeName: couchewfs,
    	    maxFeatures: 1
        //	contentType: "application/json; charset=utf-8",

        },
 //       dataType: "xml",
        cache: false,
      //  success : executeCallback,
	    success: function(data) {
	    	//alert("success");
	    	handleJson(data);
        },
        error: function () {
        	setTimeout(timeout, 2000);
        },
        async: true
    });
	
	
    if($("#checktelecharger").is(':checked')){
    	//alert(adressewfs + "REQUEST=getFeature&service=wfs&outputFormat=" + "shape-zip" + "&typename=" + couchewfs);
        telecharger();
}
	
} 

function handleJson(data) {
	response = (new XMLSerializer()).serializeToString(data);
	alert(response);
	var parser = new DOMParser();
	var xml = parser.parseFromString(response, "text/xml");
	wpsResponse = xmlToJson(xml) ;
	//alert (JSON.stringify(wpsResponse));
 /*   L.geoJson(data, {
        onEachFeature: onEachFeature,
        pointToLayer: function (feature, latlng) {
            return L.circleMarker(latlng, geojsonMarkerOptions);
            //return L.marker(latlng);
        }
    }).addTo(map);*/
	
	var myTextArea = document.getElementById('myInputs[00]');
	myTextArea.innerHTML = response;
}


function sleep(milliseconds) {
	  var start = new Date().getTime();
	  for (var i = 0; i < 1e7; i++) {
	    if ((new Date().getTime() - start) > milliseconds){
	      break;
	    }
	  }
	}

function filltheselect(liste, choix)

//document.getElementById('couche').style.visibility='visible';

	{switch (liste)
	 {
	 case "listeurl":
	    raz("listecouche");
	    for (i=0; i<couche[choix].length; i++)
	       {
		       new_option = new Option(couche[choix][i][1],couche[choix][i][0]);
		       document.formu.elements["listecouche"].
		       options[document.formu.elements["listecouche"].length]=new_option;
	       }
	
	 case "listecouche":
	
	 }
}

function raz(liste)
{l=document.formu.elements[liste].length;
for (i=l; i>=0; i--)
 document.formu.elements[liste].options[i]=null;
}