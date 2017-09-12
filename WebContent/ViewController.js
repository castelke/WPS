


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
			//retour map
			//document.location.href = 'MapView.html';
			document.getElementById('accueil').style.display = 'block';
			
			//tout le reste = none ou hidden
			//document.getElementById('wrapper').style.visibility = 'hidden';
			document.getElementById('wrapper').style.display = 'none';
			
			
			document.getElementById('mapid').style.visibility = 'visible';
			document.getElementById('map').style.display = 'none';
			
			document.getElementById('divName').style.visibility = 'hidden';
			
			document.getElementById('htmlfavwms').style.visibility = 'hidden';
			document.getElementById('htmlfavwfs').style.visibility = 'hidden';
			
			
			document.getElementById('wps').style.visibility = 'hidden';
			document.getElementById('wps').style.display = 'none';
			
			
			document.getElementById('wpsexe').style.display = 'none';
			
			document.getElementById('listeWFS').style.display = 'none';
			document.getElementById('wfsfavform').style.display = 'none';
			document.getElementById('wmsfavform').style.display = 'none';
			document.getElementById('wpsfavform').style.display = 'none';
			document.getElementById('listeWMS').style.display = 'none';
			document.getElementById('reinit').style.display = 'none';
			
			document.getElementById("divSlider").style.display = "none";
			document.getElementById("retour").style.display = "none";
			
			document.getElementById('reinitialiser').style.visibility = 'visible';
			
	    	document.getElementById("listecouchemap").style.display = "none";
			
	    	document.getElementById('wfsfav').options[0].selected = 'selected';
	    	document.getElementById('wmsfav').options[0].selected = 'selected';
	    	
	    	
	    	document.getElementById('tempid').style.display = 'none'; 
	    	 maptemp= 0,
	    	reprint();
	    	 
			
		}
		
		
		
		else if (a==3){
			//document.location.href = 'ConfigWPS.html';
			//document.getElementById('wrapper').style.visibility = 'hidden';
			document.getElementById('wrapper').style.display = 'none';

			document.getElementById('divName').style.visibility = 'hidden';
			document.getElementById('accueil').style.display = 'block';
			document.getElementById('choix').style.display = 'none';
			document.getElementById('mapid').style.visibility = 'visible';
			
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
	    	document.getElementById("listecouchemap").style.display = "none";
	    	document.getElementById("listeWFS").style.display = "none";
	    	document.getElementById("info").style.display = "none";
	    	document.getElementById("reinit").style.display = "none";
	    	document.getElementById("processDescription").style.display = "block";
	    	document.getElementById("wfsfavform").style.display = "none";
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
	    	document.getElementById("listecouchemap").style.display = "none";
	    	document.getElementById("info").style.display = "none";
	    	document.getElementById("wfsfavform").style.display = "block";
	    	document.getElementById('mapid').style.visibility='hidden';
	    	
		}
		else if (a==10){
	    	document.getElementById("listecouchemap").style.display = "none";

		}
		else if (a==11){
			
			document.getElementById("info").style.display = "none";
	    	document.getElementById("processDescription").style.display = "none";
	    	document.getElementById("execute").style.display = "block";
	    	document.getElementById('wpsexe').style.display = 'block';
	    	document.getElementById("slider").style.display = "none";
	    	document.getElementById('divName').style.visibility='hidden';
	    	document.getElementById("divSlider").style.display = "block";
	    	//document.getElementById("retour").style.display = "block";
	    	document.getElementById("choix").style.display = "none";
	    	// newdivS =document.createElement('divSlider');
	    	document.getElementById("divSlider").innerHTML = "<br> Inputs: <br> <br>";
	    	
	    		var inputnbr = 0;
	    	for (var indexInput in processDescription.processOffering.process.inputs)	{
	    		var n=0;
	    		while ((n < processDescription.processOffering.process.inputs[indexInput].maxOccurs) && document.getElementById("notused" +indexInput + n).checked){
	    			var ok = document.getElementById("myInputs[" + indexInput + n+ "]").value;
	    			//var fdg = document.getElementById("myInputs[" + indexInput + n+ "]").value;
	    			inputValue[inputnbr] = document.getElementById("myInputs[" + indexInput + n+ "]").value;
	    			idInputs[inputnbr] = processDescription.processOffering.process.inputs[indexInput].identifier;
	    			inputnbr = inputnbr +1;
	    			n=n+1;
	    			//alert(inputValue[inputnbr]);
	    			
	    			//var fdg = document.getElementById("myInputs[" + indexInput + n+ "]").value;
	    			//alert(ok);
	    			
	    			
	    			/*if((ok.indexOf(adressewfs) >= 0)){
	    				document.getElementById("divSlider").innerHTML += idInputs[indexInput] + "<br>" + ok+ "<br>";
	    			}*/

	    			
	    		}
	    	}
	    	var i=0;
	    	var listeInputs = "";
	    	
	    	document.getElementById('wpsfav').options[0].selected = 'selected';
	    	
	    	while (i<inputnbr){
	    		if ($('#wfsfavform2').length > 0) { 
	    			//complex data
	    		var d = document.wfsfavform2.wfsfav;
	    		//alert(d.value);
	    		
	    		//alert(d.options[0].selected);
				    		if(d.options[0].selected == 'true'){
				    			
				    			//alert(document.getElementById("1" +i + "0"));
				    			
				    			
				    			if ($('#1' +i + '0').length > 0) { 
					    			if(document.getElementById("1" +i + "0").checked){
					    				//alert("fixed");
					    				
					    			}
					    			//if user
					    			else {
					    				//alert("user");
					    				
					    			}
				    		}
				    			
				    			
				    			
				    			
				    			
				    			//si favori wps pas selectionné
				    			
				    			//alert("3");
					    		listeInputs +=  idInputs[i]  +"=" + inputValue[i] +";" ;
					    		if(!(ok.indexOf(adressewfs) >= 0)){
					    		document.getElementById("divSlider").innerHTML += idInputs[i] + "<br>" + inputValue[i] + "<br>";
					    		}
					    		
				    		}
				    		
				    		else{
				    			//si pas favori wps selectionné
				    		
				    			
				    			//alert("4");
				    			
				    			if ($('#1' +i + '0').length > 0){ 
					    			if(document.getElementById("1" +i + "0").checked){
					    				//alert("fixed");
					    				
						    			if(!(ok.indexOf(adressewfs) >= 0)){
							    			document.getElementById("divSlider").innerHTML += idInputs[i] + "<br>" + d.value + "<br>";
							    			}
						    			else{
						    				document.getElementById("divSlider").innerHTML += idInputs[indexInput] + "<br>" + ok+ "<br>";

						    			}
					    				
					    				
					    			}
					    			//if user
					    			else {
					    				//alert("user");
					    				
						    			if((ok.indexOf(adressewfs) >= 0)){
						    				
						    				document.getElementById("divSlider").innerHTML += idInputs[i] + "<br>" + "<textarea type='text' name='text" + i + "'  id='text" + i + "'  style='width:250px;height:15px;' value='"+inputValue[i]+"'>"+inputValue[i]+"</textarea><br>" ;
						    				
							    			//document.getElementById("divSlider").innerHTML += idInputs[i] + "<br>" + d.value + "<br>";
							    			}
					    				
					    			}
				    			}
				    			
			    			
				    			
				    			
				    			
				    		}
				    }
	    		
	    		
	    		else{
	    			
	    			//if user selected
	    			//if fixed
	    			//alert(document.getElementById("1" +i + "0"));
	    			
	    			//alert("test add");
	    			//alert("input"+i);
	    			
	    			if ($('#1' +i + '0').length > 0) { 
	    				
	    			//alert(i+"ok");
	    				
	    			if(document.getElementById("2" +i + "0").checked){
	    		//	alert("2");
			    		listeInputs +=  idInputs[i]  +"=" + inputValue[i] +";" ;
			    		//alert(inputValue[i]);
	    				document.getElementById("divSlider").innerHTML += idInputs[i] + "<br>" + "<textarea type='text' name='text" + i + "'  id='text" + i + "'  style='width:250px;height:15px;' value='"+inputValue[i]+"'>"+inputValue[i]+"</textarea><br>" ;
	    				
	    			//document.getElementById('text' + i + '').value = inputValue[i];
	    				
	    				//inputValue
	    			}
	    			else{
	    				//alert("1");
    					listeInputs +=  idInputs[i]  +"=" + inputValue[i] +";" ;
    			    	document.getElementById("divSlider").innerHTML += idInputs[i] + "<br>" + inputValue[i] + "<br>";
	    			}
	    			
	    			
	    			}
	    			//if user
	    			else {
	    				
	    				if ($('#1' +i + '0').length > 0) { 
	    					//alert("3");
		    				listeInputs +=  idInputs[i]  +"=" + inputValue[i] +";" ;
		    				document.getElementById("divSlider").innerHTML += idInputs[i] + "<br>" + "<textarea type='text' name='myInputs[" + i + "]'  id='myInputs[" + i + "]'  style='width:250px;height:15px;' value='"+inputValue[i]+"'></textarea><br>" ;
		    			}
	    				else{
	    					//alert("4");
	    					listeInputs +=  idInputs[i]  +"=" + inputValue[i] +";" ;
	    			    	document.getElementById("divSlider").innerHTML += idInputs[i] + "<br>" + inputValue[i] + "<br>";
	    					
	    					
	    				}
	    				
	    				
	    			}
	    			
	    			
	    			//alert()
	    			
	    			//si literal data
		    	//	listeInputs +=  idInputs[i]  +"=" + inputValue[i] +";" ;
		    	//	document.getElementById("divSlider").innerHTML += idInputs[i] + "<br>" + inputValue[i] + "<br>";
	    		}
	    		
	    		i=i+1;
	    	}
		
			
		}
		else if(a==12){
			
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
	    	document.getElementById("retour").style.display = "block";
	    	document.getElementById('reinit').style.display = "block";
	    	document.getElementById("listecouchemap").style.display = "none";
	    	document.getElementById("info").style.display = "none";
	    	document.getElementById("wfsfavform").style.display = "block";
	    	
		
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


