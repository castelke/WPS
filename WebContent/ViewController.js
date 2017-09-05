


	function initConfig(a) {
		
		if (a==0){
	    document.location.href = 'ConfigView.html';
	    document.getElementById('adresseWMS').value = adresse;//getAdresse();
	    document.getElementById('adresseWFS').value = adressewfs; //getAdresseWFS();
	    document.getElementById('coucheWMS').value = couche; // getCouche();
	    document.getElementById('coucheWFS').value = couchewfs; //getCoucheWFS();
	}
		
		else if (a==1){
			document.location.href = 'ConfigWPS.html';
		}
		
		else if (a==2){
			//document.location.href = 'MapView.html';
			document.getElementById('accueil').style.display = 'block';
			
			//tout le reste = none ou hidden
			document.getElementById('wrapper').style.visibility = 'hidden';
			document.getElementById('map').style.display = 'none';
			
		}
		
		
		
		else if (a==3){
			document.location.href = 'ConfigWPS.html';
			
		}
		else if (a==4){
			document.getElementById("capabilities").style.display = "none";
			document.getElementById("map").style.display = "none";
			document.getElementById("describe").style.display = "none";
			document.getElementById("choix").style.display = "block";
			document.getElementById("adresse").style.display = "none";
			document.getElementById("verificationRunning").style.display = "none";
			document.getElementById("processDescription").style.display = "block";
			document.getElementById("execute").style.display = "none";
			document.getElementById("info").style.display = "block";
		}
		else if (a==5){
			document.getElementById("info").style.display = "none";
	    	document.getElementById("processDescription").style.display = "none";
	    	document.getElementById("execute").style.display = "block";
	    	document.getElementById("slider").style.display = "none";
	    	document.getElementById('divName').style.visibility='hidden';
	    	document.getElementById("divSlider").style.display = "block";
	    	document.getElementById("retour").style.display = "block";
	    	document.getElementById("choix").style.display = "none";
	    	// newdivS =document.createElement('divSlider');
	    	document.getElementById("divSlider").innerHTML = "<br> Inputs: <br> <br>";
	    		var inputnbr = 0;
	    	for (var indexInput in processDescription.processOffering.process.inputs)	{
	    		var n=0;
	    		while ((n < processDescription.processOffering.process.inputs[indexInput].maxOccurs) && document.getElementById("notused" +indexInput + n).checked){
	    			inputValue[inputnbr] = document.getElementById("myInputs[" + indexInput + n+ "]").value;
	    			idInputs[inputnbr] = processDescription.processOffering.process.inputs[indexInput].identifier;
	    			inputnbr = inputnbr +1;
	    			n=n+1;
	    		}
	    	}
	    	var i=0;
	    	var listeInputs = "";
	    	while (i<inputnbr){
	    		listeInputs +=  idInputs[i]  +"=" + inputValue[i] +";" ;
	    		document.getElementById("divSlider").innerHTML += idInputs[i] + "<br>" + inputValue[i] + "<br><br>";
	    		i=i+1;
	    	}
		
	    	 
	    	 
	    	// document.getElementById("divSlider").appendChild(newdivS);
	    	 
	    	 
			/*
	    	var n=0;
	    	var newWindow = "";
	    	while (document.getElementById("min" + processDescription.processOffering.process.identifier + n)){
	    	
	    		if(n!=0){
	    			newWindow += "&";	
	    		}
	    		
	    		if (document.getElementById("1" + n).checked){
	    			newWindow += "fixed";
	    		}
	    		else {
	    			newWindow += "user";
	    		}
	    		newWindow += "&";
	    		newWindow += processDescription.processOffering.process.inputs[n].title;
	    		newWindow += "&";	
	    		newWindow += "value" + n + "=" + document.getElementById("myInputs[" + n + "]").value;
	    		newWindow += "&";
	    		newWindow += "min" + n + "=" + document.getElementById("min" + processDescription.processOffering.process.identifier + n).value;
	    		newWindow += "&";
	    		newWindow += "max" + n +"=" + document.getElementById("max" + processDescription.processOffering.process.identifier + n).value;
	    		newWindow += "&";
	    		newWindow += "step" + n +"=" + document.getElementById("step" + processDescription.processOffering.process.identifier + n).value;
	    		n=n+1;
	    	}

	    	window.location.href = "ConfigExecute.html?" + n + "&" + processDescription.processOffering.process.identifier + "&" + newWindow;*/
		}
		else if (a==6){
	    	document.getElementById("processDescription").style.display = "none";
	    	document.getElementById("execute").style.display = "none";
	    	document.getElementById("choix").style.display = "none";
	    	document.getElementById("retour").style.display = "block";
	    	document.getElementById('divName').style.visibility='hidden';
	    	document.getElementById("divSlider").style.display = "block";
		
	    	var i=0;
	    	
	    	
	    	
	    	
	 //   	 newdivS =document.createElement('divSlider');
	    	
	    	 document.getElementById("divSlider").innerHTML  = "<br> Outputs: <br><br>";
	    	
	    	 while (isLiteral[i] != null){
	    		
	    		if (isLiteral[i]==1){
	    			
	    			document.getElementById("divSlider").innerHTML  +=  wpsResponse["wps:ExecuteResponse"]["wps:ProcessOutputs"]["wps:Output"][i]["ows:Identifier"]["#text"] + "<br>";
	    			document.getElementById("divSlider").innerHTML  += wpsResponse["wps:ExecuteResponse"]["wps:ProcessOutputs"]["wps:Output"][i]["wps:Data"]["wps:LiteralData"]["#text"] + "<br><br>";
	    			
	    			
	    			
	    		}
	    		else if (isLiteral[i]==0){
	    			document.getElementById("divSlider").innerHTML  +=  wpsResponse["wps:ExecuteResponse"]["wps:ProcessOutputs"]["wps:Output"][i]["ows:Identifier"]["#text"] + "<br>";
	    			document.getElementById("divSlider").innerHTML  += wpsResponse["wps:ExecuteResponse"]["wps:ProcessOutputs"]["wps:Output"][i]["wps:Data"]["wps:ComplexData"]["#text"] + "<br>";
	    			
	    			
	    			
	    			
	    		}
	    		
	    		document.getElementById("divSlider").innerHTML  += "<br>";
	    		//	document.getElementById("divSlider").appendChild(newdivS);
	    		i=i+1;
	    	 }
	    	 
	    	 
		
	}
		
		else if (a==7){
	    	//document.getElementById("processDescription").style.display = "block";
	    	document.getElementById("execute").style.display = "none";
	    	document.getElementById('divName').style.visibility='visible';
	    	document.getElementById("retour").style.display = "none";
	    	document.getElementById("divSlider").style.display = "none";
	    	document.getElementById("choix").style.display = "block";
	    	document.getElementById("slider").style.display = "none";
	    	document.getElementById('mapid').style.visibility='hidden';
	    	document.getElementById("zone").style.display = "none";
	    	document.getElementById("listeWFS").style.display = "none";
	    	document.getElementById("info").style.display = "none";
	    	document.getElementById("reinit").style.display = "none";
	    	document.getElementById("processDescription").style.display = "block";
		}
		
		else if (a==8){
			
	    	document.getElementById("processDescription").style.display = "none";
	    	document.getElementById("execute").style.display = "none";
	    	document.getElementById("choix").style.display = "none";
	    	document.getElementById("retour").style.display = "block";
	    	document.getElementById('divName').style.visibility='hidden';
	    	document.getElementById("divSlider").style.display = "block";

	    	
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
		
		}

		else if (a==9){
			l=0;

	    	document.getElementById("processDescription").style.display = "none";
	    	document.getElementById("execute").style.display = "none";
	    //	document.getElementById("slider").style.display = "block";
	    	document.getElementById('divName').style.visibility='hidden';
	    //	document.getElementById("divSlider").style.display = "block";
	    	//document.getElementById("retour").style.display = "block";
	    	document.getElementById("choix").style.display = "none";
	    	//document.getElementById("wfsConfig").style.display = "block";
	    	document.getElementById("listeWFS").style.display = "block";
	    	document.getElementById('mapid').style.visibility='visible';
	    	document.getElementById("retour").style.display = "block";
	    	document.getElementById('reinit').style.display = "block";
	    	document.getElementById("zone").style.display = "block";
	    	document.getElementById("info").style.display = "none";
		}
		else if (a==10){
	    	document.getElementById("zone").style.display = "block";
	    	document.getElementById("zone").style.display = "block";
	    	document.getElementById("zone").style.display = "block";
	    	document.getElementById("zone").style.display = "block";
	    	document.getElementById("zone").style.display = "block";
	    	document.getElementById("zone").style.display = "block";
		}
		
		
		
		
	}
	//ff
	function initMap(a, c, f, a2,c2,f2) {
		setAdresse(a); 
		setCouche(c); 
		setFormatWMS(f);
		setAdresseWFS(a2);
		setCoucheWFS(c2);
		setFormatWFS(f2);
	}
	

	
	
	
    function checker(id1, id2) {

    	
    	
        if(document.getElementById(id1).checked)
        { document.getElementById(id2).checked = false;
        }
        else
        {  document.getElementById(id2).checked = true;
        }
      }


