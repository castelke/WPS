//id du process selectionnÃ©
var adresseWps;
var versionWps;
// description du processus		
var processId;
var processDescription;
var identifier;

var min = new Array();
var max= new Array();
var step = new Array();

var defaultValue = new Array();
var typeValue = new Array();
var usedValue = new Array();
var isFixed = new Array();
var isLiteral = new Array();
var inputValue = new Array();
var idInputs =new Array();




function setProcessDescription(p) {
	processDescription = p;
}

function getProcessDescription() {
    return processDescription;
}

function setProcessId(p) {
	processId = p;
}

function getProcessId() {
    return processId;
}

function setAdresseWps(a) {
	adresseWps = a;
}

function getAdresseWps() {
    return adresseWps;
}

function setVersionWps(v) {
	versionWps = v;
}

function getVersionWps() {
    return versionWps;
}

function setIdentifier(i) {
	identifier = i;
}

function getIdentifier() {
    return identifier;
}

function chargerFichier(idInputFile, idSortie) {
    "use strict";
    var entree, fichier, fr;

    if (typeof window.FileReader !== "function") {
        alert("L'API file n'est pas encore supportée par votre navigateur.");
        return;
    }
    entree= document.getElementById(idInputFile);
    if (!entree.files[0]) {
        alert("S'il vous plaît sélectionnez un fichier avant de cliquer sur «Chargement».");
    } else {
        fichier = entree.files[0];
        fr = new FileReader();
        
        fr.onload = function () {
            document.getElementById(idSortie).innerHTML = fr.result;
        };
        fr.readAsText(fichier);
    }
}
window.onload = function () {
    "use strict";
    document.getElementById("boutonCharger").onkeyup = function () {
        chargerFichier("fichierEntre", "sortie");
    };
    document.getElementById("boutonCharger").onclick = function () {
        chargerFichier("fichierEntre", "sortie");
    };
};

function addOptions()
{
	var List = document.getElementById("wps");
	var elOption = new Array(
                    new Option(document.getElementById("newWpsAdresse").value, document.getElementById("newWpsAdresse").value, false, false)
                     );
 
	var i, n;
	n = elOption.length;
 
	for (i=0; i<n; i++)
	{
		List.options.add(elOption[i]);
	}
	document.getElementById("verificationRunning").style.display = "none";
}


function verificationWPS(){
	document.getElementById("verificationRunning").style.display = "block";
	    $.ajax({
	        type: "GET",
	        url: document.getElementById("newWpsAdresse").value + "SERVICE=WPS&VERSION=1.0.0&REQUEST=GetCapabilities",
	        dataType: "script",
	        cache: false,
	        success: function () {
	        	addOptions();
	        },
	        error: function () {
	        	setTimeout(timeout, 2000);
	        },
	        async: true
	    });
}

function executeLaunch() {

	setProcessId( $('#processes option:selected').text());
	var inputnbr = 0;
	var inputGenerator = new InputGenerator();
	var inputTab= new Array();
	setIdentifier(processDescription.processOffering.process.identifier);
	
	for (var indexInput in processDescription.processOffering.process.inputs)	{
		var n=0;

		while ((n < processDescription.processOffering.process.inputs[indexInput].maxOccurs)){
		//	alert(processDescription.processOffering.process.inputs[indexInput].identifier + " " + processDescription.processOffering.process.inputs[indexInput].maxOccurs + " " + n);
		//	alert(indexInput + " " + n);
			
			if(document.getElementById("notused" +indexInput + n).checked){
			
			inputValue[inputnbr] = document.getElementById("myInputs[" + indexInput + n+ "]").value;
			idInputs[inputnbr] = processDescription.processOffering.process.inputs[indexInput].identifier;
			
			
			inputnbr = inputnbr +1;
			if (processDescription.processOffering.process.inputs[indexInput].literalData != null ){	
				inputTab[indexInput] = inputGenerator.createLiteralDataInput_wps_1_0_and_2_0(idInputs[indexInput], 'undefined', 'undefined', inputValue[indexInput]);
			//	alert(idInputs[indexInput] + " "+ inputValue[indexInput]); 
			}
			else if (processDescription.processOffering.process.inputs[indexInput].complexData != null){
				inputTab[indexInput] = inputGenerator.createComplexDataInput_wps_1_0_and_2_0(idInputs[indexInput],'undefined', 'undefined', 'undefined', false, inputValue[indexInput]);
			//	alert(idInputs[indexInput] +" " +inputValue[indexInput]); 
			}
			}
		n=n+1;
		}
	}

	var outputGenerator = new OutputGenerator();
	var outputTab= new Array();;				
	for (var outputIndex in processDescription.processOffering.process.outputs)	{
		var currentOutput = processDescription.processOffering.process.outputs[outputIndex];
		
		if (currentOutput.literalData != null ){	
				outputTab[outputIndex]=outputGenerator.createLiteralOutput_WPS_1_0(currentOutput.identifier, false);
			}
		else if (currentOutput.complexData != null){
				outputTab[outputIndex] = outputGenerator.createComplexOutput_WPS_1_0(currentOutput.identifier,false, 'undefined', 'undefined', 'undefined', 'undefined', 'undefined', 'undefined');
		}
	}
	wpsService.setUrl(adresseWps);
	//wpsService.execute(executeCallback, processDescription.processOffering.process.identifier, "document", "async", false, inputTab, outputTab);

	var listeInputs = ""; 
	
	var i=0;
	
	while (i<inputnbr){
		listeInputs +=  idInputs[i]  +"=" + inputValue[i] +";" ;
		i=i+1;
	}
	
	alert(listeInputs);
	
	    $.ajax({
	        type: "GET",
	        url: adresseWps,
	        data : {
	        	Service:"WPS",
	        	Version: versionWps,
	        	Request:"Execute",
	        	Identifier : identifier,
	        //	contentType: "application/json; charset=utf-8",
	        	DataInputs : listeInputs
	        },
	 //       dataType: "xml",
	        cache: false,
	      //  success : executeCallback,
	        success: function(data) {
	        	executeCallback(data);
	        },
	        error: function () {
	        	setTimeout(timeout, 2000);
	        },
	        async: true
	    });
}

/*
var executeCallback =function(response) {
		
	var xmlResponse = (new XMLSerializer()).serializeToString(response);
	
	alert(xmlResponse);
	
	var parser = new DOMParser();
	var xml = parser.parseFromString(response, "text/xml");
	wpsResponse = xmlToJson(xml) ;
	alert (JSON.stringify(wpsResponse));
	alert(wpsResponse["wps:ExecuteResponse"]["@attributes"].version);
	

}*/



function executeCallback (data) {
	response = (new XMLSerializer()).serializeToString(data);
	//alert(response);
	var parser = new DOMParser();
	var xml = parser.parseFromString(response, "text/xml");
	wpsResponse = xmlToJson(xml) ;
	alert (JSON.stringify(wpsResponse));
	//wpsResponse["wps:ExecuteResponse"]["wps:ProcessOutputs"]["wps:Output"][0]["ows:Identifier"]["#text"] 
	
	//alert("?" + isLiteral[0]);
	
	try {wpsResponse["wps:ExecuteResponse"]["wps:ProcessOutputs"]["wps:Output"]
	
	} catch(err) {	alert(wpsResponse["ExceptionReport"]["Exception"]["ExceptionText"]["#text"]);
		}
	
	if(isLiteral.length == 1){

		if(isLiteral[0] == 1){
			
		/*	try {wpsResponse["wps:ExecuteResponse"]["wps:ProcessOutputs"]["wps:Output"]["wps:Data"]["wps:LiteralData"]["#text"]
			
			} catch(err) {	alert(wpsResponse["ExceptionReport"]["Exception"]["ExceptionText"]["#text"]);
				}
			*/
			alert(wpsResponse["wps:ExecuteResponse"]["wps:ProcessOutputs"]["wps:Output"]["wps:Data"]["wps:LiteralData"]["#text"]);
		}
		
		else {
			alert(wpsResponse["wps:ExecuteResponse"]["wps:ProcessOutputs"]["wps:Output"]["wps:Data"]["wps:ComplexData"]["#text"]);
	/*		try {wpsResponse["wps:ExecuteResponse"]["wps:ProcessOutputs"]["wps:Output"]["wps:Data"]["wps:ComplexData"]["#text"]
			
			} catch(err) {	alert(wpsResponse["ExceptionReport"]["Exception"]["ExceptionText"]["#text"]);
				}*/
		}
		
		
		initConfig(8);
		
	}
	
	
	if(isLiteral.length > 1){
		
	
	//alert(wpsResponse["wps:ExecuteResponse"]["wps:ProcessOutputs"]["wps:Output"]["wps:Data"]["wps:ComplexlData"]["#text"]);
/*	try {wpsResponse["wps:ExecuteResponse"]["wps:ProcessOutputs"]["wps:Output"][0]["wps:Data"]["wps:ComplexData"]["#text"]
	
} catch(err) {	alert(wpsResponse["ExceptionReport"]["Exception"]["ExceptionText"]["#text"]);
	}*/
	


/*
 * 
 * 
 * <?xml version="1.0" encoding="utf-8" ?>
<ogr:FeatureCollection
     xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
     xsi:schemaLocation=""
     xmlns:ogr="http://ogr.maptools.org/"
     xmlns:gml="http://www.opengis.net/gml">
  <gml:boundedBy>
    <gml:Box>
      <gml:coord><gml:X>143607.9471074699</gml:X><gml:Y>6824632.306583629</gml:Y></gml:coord>
      <gml:coord><gml:X>143607.9471074699</gml:X><gml:Y>6824632.306583629</gml:Y></gml:coord>
    </gml:Box>
  </gml:boundedBy>
                                                                                          
  <gml:featureMember>
    <ogr:point fid="point.0">
      <ogr:geometryProperty><gml:Point srsName="EPSG:2154"><gml:coordinates>143607.94710747,6824632.30658363</gml:coordinates></gml:Point></ogr:geometryProperty>
      <ogr:gml_id>qt_temp.0</ogr:gml_id>
      <ogr:Id>1</ogr:Id>
      <ogr:surface_ha>668918.103277</ogr:surface_ha>
      <ogr:km>6689</ogr:km>
      <ogr:km2>6689.181033</ogr:km2>
      <ogr:ha2>668918</ogr:ha2>
    </ogr:point>
  </gml:featureMember>
</ogr:FeatureCollection>

 */


		var i=0;
		while (isLiteral[i] != null)
		{
		
			if (isLiteral[i]==1){
				alert(wpsResponse["wps:ExecuteResponse"]["wps:ProcessOutputs"]["wps:Output"][i]["wps:Data"]["wps:LiteralData"]["#text"]);
			}
			else if (isLiteral[i]==0){
				alert(wpsResponse["wps:ExecuteResponse"]["wps:ProcessOutputs"]["wps:Output"][i]["wps:Data"]["wps:ComplexData"]["#text"]);
			}
			
		/*	alert(wpsResponse["wps:ExecuteResponse"]["wps:ProcessOutputs"]["wps:Output"][0]["wps:Data"]["wps:LiteralData"]["#text"]);
			alert(wpsResponse["wps:ExecuteResponse"]["wps:ProcessOutputs"]["wps:Output"][1]["wps:Data"]["wps:ComplexData"]["#text"]);*/
			i=i+1;
		}
		initConfig(6);
	}
		
	
	
}


// initialize wpsService
var wpsService = new WpsService({
	url: "http://geoprocessing.demo.52north.org:8080/wps/WebProcessingService",
	//http://geoprocessing.demo.52north.org:8080/wps/WebProcessingService
	//http://envision-wps.brgm-rec.fr/WPS.NET/WPService.asmx/WPS
	version: "1.0.0"
});	
	
	var capabilities, processDescription; // the process description
		
	var capabilitiesCallback = function(response) {
		capabilities = response;
			
		// extract processes, add them to process-list
		//array of processes
		var processes = response.capabilities.processes;
			
		var _select = $('<select>');
		$.each(processes, function(index, process) {
			    _select.append(
			            $('<option></option>').val(process.identifier).html(process.identifier)
			        );
		});
		
	$('#processes').append(_select.html());
		$('#processes_execute').append(_select.html());
			
	// set value of textarea
	var capabilitiesDocument = capabilities.responseDocument;
	$("textarea#capabilitiesText").val((new XMLSerializer()).serializeToString(capabilitiesDocument));
	};

		
	var describeProcessCallback = function(response) {
		
		
	/*    $.ajax({
	        type: "GET",
	        url: adresseWps,
	        data : {
	        	Service:"WPS",
	        	Version: versionWps,
	        	Request:"DescribeProcess",
	        	Identifier : "Add",
	        },
	 //       dataType: "xml",
	        cache: false,
	      //  success : executeCallback,
	        success: function(data) {
	        	executeCallback(data);
	        },
	        error: function () {
	        	setTimeout(timeout, 2000);
	        },
	        async: true
	    });*/
		
	    for (var prop in response.processOffering.process.inputs[0].literalData){//.literalDataDomain){
	    	//alert(prop);
	    	}
	    
	    
		initConfig(4);
		setProcessDescription(response);
		setIdentifier(response.processOffering.process.identifier);
		var outputOffering = '';
		
		if (response.processOffering.version != null){
			outputOffering += "version : " + response.processOffering.version+'; \n';
		}
		
		outputOffering += "process : " + response.processOffering.process.title+'; \n';
		outputOffering += "description : " + response.processOffering.process.abstractValue+'; \n';
		
		inputs = 'Inputs: \n';
		newdiv =document.createElement('divForm');
		newdiv.innerHTML += "Inputs <br>";
	//	newdiv.innerHTML += "fixed  <input type='checkbox' name='check1' id='check1' onclick='checker('check1', 'check1');' />";
		//document.getElementById("newWpsAdresse").value
		
		for (var inputIndex in response.processOffering.process.inputs)	{
			
			for (var property in response.processOffering.process.inputs[inputIndex]) {
				inputs += property +': ' + response.processOffering.process.inputs[inputIndex][property]+'; \n';
				
				if ((property == "literalData")||(property == "complexData")){
					

					newdiv.innerHTML += response.processOffering.process.inputs[inputIndex].title;
						if( response.processOffering.process.inputs[inputIndex].minOccurs==1){
						newdiv.innerHTML += "*";
						}
						var n=0;
				//	for (var n in response.processOffering.process.inputs[inputIndex].maxOccurs){
						var m=0;
						
						while (n < response.processOffering.process.inputs[inputIndex].maxOccurs){
							//alert(n + " " + response.processOffering.process.inputs[inputIndex].maxOccurs);
							var char = "onclick='checker('check1" + inputIndex + "','check2" + inputIndex + "');";
							newdiv.innerHTML += " <br><input type='checkbox' checked='unchecked' name='notused" + inputIndex +  n +"' " +"' id='notused" + inputIndex + n +"' /> ";
							newdiv.innerHTML += "<input type='text' name='myInputs[" + inputIndex + n + "]'  id='myInputs[" + inputIndex + n + "]' value='0'>" ;
							newdiv.innerHTML += "fixed  <input type='checkbox' checked='checked' name='1" + inputIndex + n + "' " +"' id='1" + inputIndex + n + "' onclick='checker(1" + inputIndex + n + ",2" + inputIndex + n + ");' />";
							//newdiv.innerHTML += "<form id='2" +inputIndex + n + "' style='display:none'>";
							
							
							
							newdiv.innerHTML +=  "user <input type='checkbox' name='2" + inputIndex + n + "' id='2" + inputIndex + n + "' onclick='checker(2" + inputIndex + n + " ,1" + inputIndex + n + ");' />";
							//newdiv.innerHTML += "</form>";
							newdiv.innerHTML += 'min: <input type="text" id="min' + processDescription.processOffering.process.title + inputIndex + '" name="min' + processDescription.processOffering.process.title + inputIndex +'" style="width: 50px; height: 15px;" value="0" />';
							newdiv.innerHTML += 'max: <input type="text" id="max' + processDescription.processOffering.process.title + inputIndex + '" name="max' + processDescription.processOffering.process.title + inputIndex +'" style="width: 50px; height: 15px;" value="100" />';
							newdiv.innerHTML += 'step: <input type="text" id="step' + processDescription.processOffering.process.title + inputIndex + '" name="step' + processDescription.processOffering.process.title + inputIndex +'" style="width: 50px; height: 15px;" value="1" /><br>';
							 
						//	if (response.processOffering.process.inputs[inputIndex].minOccurs==0){
							//	newdiv.innerHTML += "used: <input type='checkbox' checked='unchecked' name='notused" + inputIndex +  n +"' " +"' id='notused" + inputIndex + n +"' /> <br>";
						//	}
							
						
						n=n+1;	
						
						}
					
				inputs += '\n';
				}

			}
		}
			
		//creation formulaire outputs
		newdiv.innerHTML += "<br><input type='button' value='wfsConf'  id='wfsConf' onclick='initConfig(9);'><br>";
		outputs = '\nOutputs: \n';
		newdiv.innerHTML += "<br>Outputs <br>";	
		
		for (var indexOutput in response.processOffering.process.outputs)	{
			for (var property in response.processOffering.process.outputs[indexOutput]) {
				outputs += property + ': ' + response.processOffering.process.outputs[indexOutput][property]+'; \n';
				
				if ((property == "literalData")||(property == "complexData")){
					
					if (property == "literalData"){
						isLiteral[indexOutput] = 1;
					}
						else {
						isLiteral[indexOutput] = 0;
						}
					
					//$("textarea#processDescriptionText").val(newdiv.innerHTML);
					newdiv.innerHTML += response.processOffering.process.outputs[indexOutput].title + "<dd>";  //+  " <br><input type='text' name='myInputs[]'>";
					newdiv.innerHTML += "web  <input type='checkbox' checked='checked' name='3" + indexOutput + "' " +"' id='3" + indexOutput + "' onclick='checker(3" + indexOutput + ",4" + indexOutput + ");' />" + " file <input type='checkbox' name='4" + indexOutput + "' id='4" + indexOutput + "' onclick='checker(4" + indexOutput + " ,3" + indexOutput + ");' />";
					newdiv.innerHTML += 'directory: <input type="text" id="directory" name="directory" style="width: 300px; height: 15px;" value="C:\" /> fileName: <input type="text" id="fileName" name="fileName" style="width: 100px; height: 15px;" value="Truc.txt" />';
					newdiv.innerHTML += "<input type='file' id='fichierEntre"+ processDescription.processOffering.process.title + inputIndex +"'/><br />"
					outputs += '\n';
				}
			}
			}
		newdiv.innerHTML += "<br>";	
		document.getElementById("divName").appendChild(newdiv);	
		
		$("textarea#processDescriptionText").val(outputOffering + '\n' + '\n' + inputs + outputs);
	};
	

	var clearForms = function(){
		
		//clear select
		$("#processes option").remove();
		$("#processes_execute option").remove();
		
		
		$("#processes").append($('<option></option>').val("default").html("Select a Process"));
		$("#processes_execute").append($('<option></option>').val("default").html("Select a Process"));
		
		//clear textareas
		$("textarea#capabilitiesText").val("empty");
		$("textarea#processDescriptionText").val("empty");
	};
	
	$(document).ready(function() {
			$("#wps").change(function() {
			//clear old textarea values
			clearForms();
			
			// get selected wps (url)
			var wpsUrl = $('#wps option:selected').text();
			setAdresseWps(wpsUrl);
				// only eexecute if wpsUrl is a http url
			if(wpsUrl.startsWith("http")){
				if($("#wps-version").prop("checked"))
					{wps = new WpsService({url : wpsUrl, version : "2.0.0"});
					setVersionWps("2.0.0");
					}
				else {
					wps = new WpsService({url : wpsUrl, version : "1.0.0"});
					setVersionWps("1.0.0");
				}
			
				wps.getCapabilities_GET(capabilitiesCallback);
			}
			});
		
		$("#processes").change(function() {
			// get selected wps (url)
			var processId = $('#processes option:selected').text();
			
			// only eexecute if id != default value "Select a Process"
			if(! processId.startsWith("Select"))
				wps.describeProcess_GET(describeProcessCallback, processId);
			});
		
		$("#wps-version").change(function(){
			if (wpsService){
				if($("#wps-version").prop("checked"))
					wpsService.version = "2.0.0";
				else
					wpsService.version = "1.0.0";
			}		
		});
	});
