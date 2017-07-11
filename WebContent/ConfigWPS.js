//id du process selectionnÃ©
var processId;
var adresseWps;
var versionWps;
// description du processus		
var processDescription;
var identifier;


var min = new Array();
var max= new Array();
var step = new Array();



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

	var inputGenerator = new InputGenerator();
	var inputTab= new Array();
	
	for (var indexInput in processDescription.processOffering.process.inputs)	{
		var currentInput = processDescription.processOffering.process.inputs[indexInput];
		var inputValue = document.getElementById("myInputs[" + indexInput + "]").value;
		
		if (currentInput.literalData != null ){	
			inputTab[indexInput] = inputGenerator.createLiteralDataInput_wps_1_0_and_2_0(currentInput.identifier, 'undefined', 'undefined', inputValue);
				alert(currentInput.title + inputValue); 
		}
		else if (currentInput.complexData != null){
				inputTab[indexInput] = inputGenerator.createComplexDataInput_wps_1_0_and_2_0(currentInput.identifier,'undefined', 'undefined', 'undefined', false, inputValue);
				alert(currentInput.title + inputValue); 
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
	wpsService.execute(executeCallback, processDescription.processOffering.process.identifier, "document", "sync", false, inputTab, outputTab);
	
}

var executeCallback = function(response) {
		
	var out;
	for (var property in response) {
		out += property + ': ' + response[property]+'; \n';
	}
	alert(out);
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
		
		initConfig(4);
		setProcessDescription(response);
		setIdentifier(response.processOffering.process.identifier);
		var outputOffering = '';
		for (var property in response.processOffering) {
			outputOffering += property + ': ' + response.processOffering[property]+'; \n';
		}
		outputOffering += "\n";
		for (var property in response.processOffering.process) {
			outputOffering += property + ': ' + response.processOffering.process[property]+'; \n';
		}
		outputOffering += "\n";
		var x=0;
	/*	for (var x in response.processOffering.process.inputs)	{
			for (var property in response.processOffering.process.inputs[x]) {
				for (var lit in response.processOffering.process.inputs[x].literalData[property]) {
				outputOffering += lit +': ' + response.processOffering.process.inputs[x].literalData[lit][property]+'; \n';
			}	
			//	x=x+1;
			}
		}*/
		/*	outputOffering += "\n";
			x=0;
				for (var i in response.processOffering.process.inputs) {
					for (var property in response.processOffering.process.inputs[i].literalData) {
					
					outputOffering += property + ': ' + response.processOffering.process.inputs[i].literalData[0][property]+'; \n';		
				}	
				}
				*/
				/*
			x=1;
			outputOffering += "\n";
			for (var input in response.processOffering.process.inputs.literalData.literalDataDomains)	{
				for (var property in response.processOffering.process.inputs[x].literalData.literalDataDomains[0]) {
					outputOffering += property + ': ' + response.processOffering.process.inputs[x].literalData.literalDataDomains[0][property]+'; \n';		
				}	
				x=x+1;
				}
			
			x=0;*/
			outputOffering += "\n";
			/*for (var input in response.processOffering.process.inputs[x].literalData.literalDataDomains[x])	{
				for (var property in response.processOffering.process.inputs[x].literalData.literalDataDomains[0].dataType[x]) {
					outputOffering += property + ': ' + response.processOffering.process.inputs[x].literalData.literalDataDomains[0].dataType[property]+'; \n';		
				}	
				x=x+1;
				}
			
			x=1;
			outputOffering += "\n";
			for (var input in response.processOffering.process.inputs[x].literalData.literalDataDomains[x])	{
				for (var property in response.processOffering.process.inputs[x].literalData.literalDataDomains[0].dataType[x]) {
					outputOffering += property + ': ' + response.processOffering.process.inputs[x].literalData.literalDataDomains[0].dataType[property]+'; \n';		
				}	
				x=x+1;
				}
			
			outputOffering += "\n";*/

			
			
		
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
						var char = "onclick='checker('check1" + inputIndex + "','check2" + inputIndex + "');";
				newdiv.innerHTML += " <br><input type='text' name='myInputs[" + inputIndex + "]'  id='myInputs[" + inputIndex + "]' value='0'>" ;
				newdiv.innerHTML += "fixed  <input type='checkbox' checked='checked' name='1" + inputIndex + "' " +"' id='1" + inputIndex + "' onclick='checker(1" + inputIndex + ",2" + inputIndex + ");' />" + " user <input type='checkbox' name='2" + inputIndex + "' id='2" + inputIndex + "' onclick='checker(2" + inputIndex + " ,1" + inputIndex + ");' />";
				newdiv.innerHTML += 'min: <input type="text" id="min' + processDescription.processOffering.process.title + inputIndex + '" name="min' + processDescription.processOffering.process.title + inputIndex +'" style="width: 50px; height: 15px;" value="0" />';
				newdiv.innerHTML += 'max: <input type="text" id="max' + processDescription.processOffering.process.title + inputIndex + '" name="max' + processDescription.processOffering.process.title + inputIndex +'" style="width: 50px; height: 15px;" value="100" />';
				newdiv.innerHTML += 'step: <input type="text" id="step' + processDescription.processOffering.process.title + inputIndex + '" name="step' + processDescription.processOffering.process.title + inputIndex +'" style="width: 50px; height: 15px;" value="1" /><br>';
				
				inputs += '\n';
				}

			}
		}
			
		//creation formulaire outputs

		outputs = '\nOutputs: \n';
		newdiv.innerHTML += "<br>Outputs <br>";	
		
		for (var indexOutput in response.processOffering.process.outputs)	{
			for (var property in response.processOffering.process.outputs[indexOutput]) {
				outputs += property + ': ' + response.processOffering.process.outputs[indexOutput][property]+'; \n';
				
				if ((property == "literalData")||(property == "complexData")){
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
					wps = new WpsService({url : wpsUrl, version : "2.0.0"});
				else
					wps = new WpsService({url : wpsUrl, version : "1.0.0"});
			
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
