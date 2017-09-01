
var innermap;


function setInnermap(i) {
	innermap = i;
}

function getProcessDescription() {
    return innermap;
}


function recuperationUrl(u){
	//alert(u);
	setAdresseWFS(u);
} 



function recuperationCouche(c){
	//alert(c);
	//alert(adressewfs);
	//c=c.substring(5,c.length)
	setCoucheWFS(c);
	//var map = L.map('mapid',{drawControl: true}).setView([48.39975, -4.49938], 12);
	//buildMap();
	//document.getElementById("map").innerHTML = "<div id='mapid' style='width: 100%; height: 100%;'></div>";
	//buildMap();
	
	//map.remove();
	//document.getElementById("mapid").innerHTML = "";
	//document.getElementById("mapid").innerHTML = "<div id='mapid' style='visibility:hidden'> </div>";
	
	//buildMap();
	/*alert(couchewfs);
	alert(adressewfs);*/
	
	adressewfs =  $('#wfs :selected').text();
	formatwfs =  $('#wfsformat :selected').text();
	
    //get the index of the start of the part of the URL we want to keep
    index  = couchewfs.indexOf(':');

    //then get everything after the found index
    strOut = couchewfs.substr(index+1);
    strOutNS = couchewfs.substr(0,index);
	
	//alert(strOut);
	setCoucheWFS(strOut);
	
	
	
	
	//adressewfs = adressewfs.substr(4);
	
	adressewfs = adressewfs.substr(0, adressewfs.length-6)
	//alert(adressewfs);
	adressewfs =  adressewfs + strOutNS + "/ows?";
//	alert(adressewfs);
	setAdresseWFS(adressewfs);
	
	
	//innermap = document.getElementById("mapid").innerHTML;
	
	
	appelWFS();
	printWFS();
	//document.getElementById("mapid").innerHTML = "";
	//alert(document.getElementById("mapid").innerHTML);
	
	

	
	
	//alert(document.getElementById("mapid").innerHTML);
	//var rootUrl = 'http://tomcat.capecodgis.com/geoserver/capecodgis/ows';

/*	var defaultParameters = {
	    service: 'WFS',
	    version: '1.0.0',
	    request: 'GetFeature',
	    typeName: couchewfs,
	    maxFeatures: 1,
	    //outputFormat: 'text/javascript',
	    jsonCallback: 'jsonp'
	  //  format_options: 'callback: getJson'

	};
	
	var parameters = L.Util.extend(defaultParameters);*/
//	var wfsrequest = adressewfs.substring(0,adressewfs.length-1) + L.Util.getParamString(parameters);
	/*
	var DataInputs = {
			
			//https://geobretagne.fr/geoserver/dreal_b/ows?&service=WFS&request=GetFeature&typeName=atlaslitt_3_alea_biblio_lin&maxFeatures=1&_=1504097569937
			,
			var features = {
			xlink:href:	adressewfs.substring(0,adressewfs.length-1) + L.Util.getParamString(parameters)),
			method:	'POST',
			mimeType: 'text/xml',
			encoding: 'UTF-8'
			};

			
		};*/
	
/*	var features = {
			xlink: 'href:'+	adressewfs.substring(0,adressewfs.length-1) + L.Util.getParamString(parameters),
			method:	'POST',
			mimeType: 'text/xml',
			encoding: 'UTF-8'
			};
	*/
	
	
	
	
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

function reinit(){
	document.getElementById("mapid").innerHTML = innermap;
	//alert(innermap);   
}

function handleJson(data) {
	response = (new XMLSerializer()).serializeToString(data);
	//alert(response);
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
	//alert( adressewfs.substring(0,adressewfs.length-1));
	var myTextArea = document.getElementById('myInputs[' +currentIndex+   ']');
	//myTextArea.innerHTML = response;
	
	var defaultParameters = {
		    service: 'WFS',
		    version: '1.0.0',
		    request: 'GetFeature',
		    typeName: couchewfs,
		    maxFeatures: 1,
		    //outputFormat: 'text/javascript',
		//	outputFormat: formatwfs,
		//    jsonCallback: 'jsonp'
		  //  format_options: 'callback: getJson'

		};
		var parameters = L.Util.extend(defaultParameters);
		var wfsrequest = adressewfs.substring(0,adressewfs.length-1) + L.Util.getParamString(parameters);
	//alert(currentIndex);
		
		
	//	alert(currentIndex.substring(0,currentIndex.length-1));
	myTextArea.innerHTML =  idInputs[currentIndex.substring(0,currentIndex.length-1)] + '=@xlink:href='+wfsrequest+'@method=POST@mimeType=text/xml@encoding=UTF-8@outputFormat='+ formatwfs+ ';';
}

function addfavwfs() {
	
	
	adressewfs =  $('#wfs :selected').text();
	couchewfs =  $('#wfscouche :selected').text();
	
	
	var d=document.formu.wfsfav;

	
	//for (i=0;i=i+1;i)
	// alert($(xml).find("Name",9).text());

	d.length++; 
	d.options[d.length-1].text = adressewfs + "^" + couchewfs;
	
}


function verificationWFS(){
	document.getElementById("verificationRunningWfs").style.visibility = "visible";
	    $.ajax({
	        type: "GET",
	        url: document.getElementById("newWfsAdresse").value + "SERVICE=WFS&VERSION=1.0.0&REQUEST=GetCapabilities",
	        dataType: "script",
	        cache: false,
	        success: function () {
	        	addOptionsWfs();
	        },
	        error: function () {
	        	setTimeout(timeout, 2000);
	        },
	        async: true
	    });
}

function wfsFav(){

	
	adrcouche =  $('#wfsfav :selected').text();

	
	str =  adrcouche.indexOf('^');
    //alert(str); 
    strOut = adrcouche.substr(str+1);
    strOutNS = adrcouche.substr(0,str);
    setCoucheWFS(strOut);
    setAdresseWFS(strOutNS);
    //get the index of the start of the part of the URL we want to keep
    index  = couchewfs.indexOf(':');

    //then get everything after the found index
    strOut = couchewfs.substr(index+1);
    strOutNS = couchewfs.substr(0,index);
	
	//alert(strOut);
	setCoucheWFS(strOut);

	adressewfs = adressewfs.substr(0, adressewfs.length-6)
	//alert(adressewfs);
	adressewfs =  adressewfs + "/" + strOutNS + "/ows?";
	setAdresseWFS(adressewfs);
	
	appelWFS();
	printWFS();
	
    $.ajax({
        type: "GET",
        url: adressewfs,
        data : {
    	    service: 'WFS',
    	    request: 'GetFeature',
    	    typeName: couchewfs,
    	    maxFeatures: 1

        },
        cache: false,
	    success: function(data) {
	    	handleJson(data);
        },
        error: function () {
        	setTimeout(timeout, 2000);
        },
        async: true
    });
	
	
    if($("#checktelecharger").is(':checked')){
        telecharger();
    }
    
	
	
}

function addOptionsWfs()
{
	var List = document.getElementById("wfs");
	var elOption = new Array(
                    new Option(document.getElementById("newWfsAdresse").value, document.getElementById("newWfsAdresse").value, false, false)
                     );
 
	var i, n;
	n = elOption.length;
 
	for (i=0; i<n; i++)
	{
		List.options.add(elOption[i]);
	}
	document.getElementById("verificationRunningWfs").style.visibility = "hidden";
}

function addwfs() {
	//if ($('#wfs option:selected').text() != ""){

	setAdresseWFS($('#wfs option:selected').text());

    // async call to geoserver (I'm using angular)
    
    //adressewfs=;
    
    $.ajax({
        type: "GET",
        url: adressewfs + 'service=WFS&request=GetCapabilities',
        version:'1.1.0',
 //       dataType: "xml",
        cache: false,
      //  success : executeCallback,
	    success: function(data, status, headers, config) {
	        // use the tool to parse the data
	    	
	    	response = (new XMLSerializer()).serializeToString(data);
	    	//alert(response);
	    	var parser = new DOMParser();
	    	var xml = parser.parseFromString(response, "text/xml");
	    	//alert(response["wfs:WFS_Capabilities"]["FeatureTypeList"][0]["FeatureType"]["Name"]);

	    	var d=document.formu.wfscouche;

	    	d.length=1; 
	    	 $(xml).find('FeatureType').each( function(){
	    		//alert($(this).find('Name').text());
	    		d.length++; 
	    		d.options[d.length-1].text = $(this).find('Name').text();
	    	});

        },
        error: function () {
        	setTimeout(timeout, 2000);
        },
        async: true
    });
	}
	
    
    
    
    
    
 /*   $http.get(endpoint + 'request=GetCapabilities').

    success(function(data, status, headers, config) {

        // use the tool to parse the data
        var response = (formatter.read(data));

        // this object contains all the GetCapabilities data
        var capability = response.capability;

        // I want a list of names to use in my queries
        for(var i = 0; i < capability.layers.length; i ++){
            layers.push(capability.layers[i].name);
        }
    }).

    error(function(data, status, headers, config) {
        alert("terrible error logging..");
    });*/
//}



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