
var innermap;


function setInnermap(i) {
	innermap = i;
}

function getProcessDescription() {
    return innermap;
}


function recuperationUrl(u){
	//alert(u);
	setAdresseWMS(u);
} 



function recuperationCoucheWms(c){

	setCoucheWMS(c);

	
	adressewms =  $('#wms :selected').text();
	formatwms =  $('#wmsformat :selected').text();
	
    //get the index of the start of the part of the URL we want to keep
    index  = couchewms.indexOf(':');

    //then get everything after the found index
    strOut = couchewms.substr(index+1);
    strOutNS = couchewms.substr(0,index);
	
	//alert(strOut);
	setCoucheWMS(strOut);
	
	
	adressewms = adressewms.substr(0, adressewms.length-6)
	//alert(adressewfs);
	adressewms =  adressewms + "/" + strOutNS + "/ows?";
//	alert(adressewfs);
	setAdresseWMS(adressewms);
	
	
	//innermap = document.getElementById("mapid").innerHTML;
	
	
	appelWMS();
	printWMS();
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
        url: adressewms,
        data : {
    	    service: 'WMS',
    	   // version: '1.0.0',
    	    request: 'GetMap',
    	    typeName: couchewms,
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
	
	
   /* if($("#checktelecharger").is(':checked')){
    	//alert(adressewfs + "REQUEST=getFeature&service=wfs&outputFormat=" + "shape-zip" + "&typename=" + couchewfs);
        telecharger();
    }*/
	
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
		    service: 'WMS',
		    version: '1.0.0',
		    request: 'GetMap',
		    typeName: couchewms,
		    maxFeatures: 1,
		    //outputFormat: 'text/javascript',
		//	outputFormat: formatwfs,
		//    jsonCallback: 'jsonp'
		  //  format_options: 'callback: getJson'

		};
		var parameters = L.Util.extend(defaultParameters);
		var wmsrequest = adressewms.substring(0,adressewms.length-1) + L.Util.getParamString(parameters);
	//alert(currentIndex);
		
		
	//	alert(currentIndex.substring(0,currentIndex.length-1));
	myTextArea.innerHTML =  idInputs[currentIndex.substring(0,currentIndex.length-1)] + '=@xlink:href='+wmsrequest+'@method=POST@mimeType=text/xml@encoding=UTF-8@outputFormat='+ formatwms+ ';';
}

function addfavwms() {
	
	
	adressewms =  $('#wms :selected').text();
	couchewms =  $('#wmscouche :selected').text();
	formatwms =  $('#wmsformat :selected').text();
	
	var d=document.wmsfavform.wmsfav;

	
	//for (i=0;i=i+1;i)
	// alert($(xml).find("Name",9).text());
	alert(adressewms + "^" + couchewms);
	
	alert(d.options[d.length-1].text);

	if(!((d.options[d.length-1].text).includes(couchewms)))
	{
		d.length++; 
		d.options[d.length-1].text = adressewms + "^" + couchewms;
	}
	
}


function verificationWMS(){
	document.getElementById("verificationRunningWms").style.visibility = "visible";
	    $.ajax({
	        type: "GET",
	        url: document.getElementById("newWmsAdresse").value + "SERVICE=WMS&VERSION=1.0.0&REQUEST=GetCapabilities",
	        dataType: "script",
	        cache: false,
	        success: function () {
	        	addOptionsWms();
	        },
	        error: function () {
	        	setTimeout(timeout, 2000);
	        },
	        async: true
	    });
}

function wmsFav(){

	
	adrcouche =  $('#wmsfav :selected').text();

	
	str =  adrcouche.indexOf('^');
    //alert(str); 
    strOut = adrcouche.substr(str+1);
    strOutNS = adrcouche.substr(0,str);
    setCoucheWMS(strOut);
    setAdresseWMS(strOutNS);
    //get the index of the start of the part of the URL we want to keep
    index  = couchewms.indexOf(':');

    //then get everything after the found index
    strOut = couchewms.substr(index+1);
    strOutNS = couchewms.substr(0,index);
	
	//alert(strOut);
	setCoucheWMS(strOut);

	adressewms = adressewms.substr(0, adressewms.length-6)
	//alert(adressewfs);
	adressewms =  adressewms + "/" + strOutNS + "/ows?";
	setAdresseWMS(adressewms);
	
	appelWMS();
	printWMS();
	
    $.ajax({
        type: "GET",
        url: adressewms,
        data : {
    	    service: 'WMS',
    	    request: 'GetMap',
    	    typeName: couchewms,
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

function addOptionsWms()
{
	var List = document.getElementById("wms");
	var elOption = new Array(
                    new Option(document.getElementById("newWmsAdresse").value, document.getElementById("newWmsAdresse").value, false, false)
                     );
 
	var i, n;
	n = elOption.length;
 
	for (i=0; i<n; i++)
	{
		List.options.add(elOption[i]);
	}
	document.getElementById("verificationRunningWms").style.visibility = "hidden";
}

function addwms() {
	//if ($('#wfs option:selected').text() != ""){

	setAdresseWMS($('#wms option:selected').text());
	adressewms =adressewms.replace("[\r\n]+", "")
    // async call to geoserver (I'm using angular)
    index  = adressewms.indexOf('?');

    //then get everything after the found index
    strOut = adressewms.substr(index+1);
    adressewms = adressewms.substr(0,index+1);
    //alert(strOutNS);
    
	url = adressewms + 'service=WMS&request=GetCapabilities';
	
	
	alert(adressewms);
	
	
    //adressewfs=;
    
    $.ajax({
        type: "GET",
        url: adressewms + 'service=WMS&request=GetCapabilities',
       // version:'1.0.0',
     //   service: 'WMS',
    //    request: 'GetCapabilities',
      //  version:'1.0.0',
 //       dataType: "xml",
        cache: false,
      //  success : executeCallback,
	    success: function(data, status, headers, config) {
	        // use the tool to parse the data
	    	//alert(response);
	    	response = (new XMLSerializer()).serializeToString(data);
	    	var parser = new DOMParser();
	    	var xml = parser.parseFromString(response, "text/xml");
	    	//alert(response["wfs:WFS_Capabilities"]["FeatureTypeList"][0]["FeatureType"]["Name"]);

	    	var d=document.formuwms.wmscouche;

	    	d.length=1; 
	    	 $(xml).find('Layer').each( function(){
	    		alert($(this).find('Name').text());
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


/*
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
}*/