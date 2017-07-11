


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
			document.location.href = 'MapView.html';
		}
		
		
		
		else if (a==3){
			document.location.href = 'ConfigWPS.html';
			
		}
		else if (a==4){
			document.getElementById("capabilities").style.display = "none";
			document.getElementById("intro").style.display = "none";
			document.getElementById("map").style.display = "none";
			document.getElementById("describe").style.display = "none";
			document.getElementById("choix").style.display = "block";
			document.getElementById("adresse").style.display = "none";
			document.getElementById("verificationRunning").style.display = "none";
			document.getElementById("processDescription").style.display = "block";
		}
		else if (a==5){
	    	/*document.getElementById("processDescription").style.display = "none";
	    	document.getElementById("execute").style.display = "block";
	    	document.getElementById("slider").style.display = "block";
	    	document.getElementById('divName').style.visibility='hidden';*/
	    	
	    	
	    	
	    	var n=0;
	    	var newWindow = "";
	    	while (document.getElementById("min" + processDescription.processOffering.process.identifier + n)){
	    		if(n!=0){
	    		newWindow += "&";	
	    		}
	    		
	    		
	    		//alert(document.getElementById("1" + n).checked);
	    		//alert(document.getElementById("2" + n).checked);
	    		
	    		if (document.getElementById("1" + n).checked){
	    			//alert("fixed");
	    			newWindow += "fixed";
	    		}
	    		else {
	    			newWindow += "user";
	    		}
	    		newWindow += "&";	
	    		newWindow += "value" +/* processDescription.processOffering.process.identifier + */n + "=" + document.getElementById("myInputs[" + n + "]").value;
	    		newWindow += "&";
	    		newWindow += "min" +/* processDescription.processOffering.process.identifier + */n + "=" + document.getElementById("min" + processDescription.processOffering.process.identifier + n).value;
	    		newWindow += "&";
	    		newWindow += "max" +/* processDescription.processOffering.process.identifier +*/ n +"=" + document.getElementById("max" + processDescription.processOffering.process.identifier + n).value;
	    		newWindow += "&";
	    		newWindow += "step" + /*processDescription.processOffering.process.identifier + */n +"=" + document.getElementById("step" + processDescription.processOffering.process.identifier + n).value;

	    		
	    		
	    		
	    		
	    		n=n+1;
	    		
	    	}
	    	//alert(n);
	    /*	var x=0;
	    	while (x<n){
	    		alert(document.getElementById("1" + (n+1)).checked);
	    		alert(document.getElementById("2" + (n+1)).checked);
	    		
	    		x=x+1;
	    	}*/
	    	
	    	window.location.href = "ConfigExecute.html?" + n + "&" + processDescription.processOffering.process.identifier + "&" + newWindow;
	    		
	    		
	    /*	 document.getElementById("min").value = document.getElementById("minAdd0").value;
	    	 document.getElementById("max").value = document.getElementById("maxAdd0").value;	    	
	    	 document.getElementById("step").value = document.getElementById("stepAdd0").value;	    
	    	  window.location.href = "ConfigExecute.html" + "?min0=" +  document.getElementById("minAdd0").value + "&max0=" + document.getElementById("maxAdd0").value + "&step0="+ document.getElementById("stepAdd0").value;*/
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
    	//alert(id1 + " " + id2);
        if(document.getElementById(id1).checked)
        { document.getElementById(id2).checked = false;}
        else
        {  document.getElementById(id2).checked = true;}
      }


