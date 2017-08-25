	var url = []; //nouveau tableau
	url[0] = ["", ""];
	url[1] = ["http://geoserver.ics.perm.ru/geoserver/topp/ows?", "http://geoserver.ics.perm.ru/geoserver/topp/ows?"]; //nouveau tableau, on va donc avoir url[0][0]="http://geoserver.ics.perm.ru/geoserver/topp/ows?"
	url[2] = ["https://geobretagne.fr/geoserver/ows?", "https://geobretagne.fr/geoserver/ows?"];
	url[3] = ["p2", "url2"];
	 
	var couche=[];
	
	
	
	
	// url0
	couche["http://geoserver.ics.perm.ru/geoserver/topp/ows?"] = [];
	couche["http://geoserver.ics.perm.ru/geoserver/topp/ows?"][0] = ["tasmania_state_boundaries", "url0-tasmania_state_boundaries"];
	couche["http://geoserver.ics.perm.ru/geoserver/topp/ows?"][1] = ["states", "url0-states"];
	couche["http://geoserver.ics.perm.ru/geoserver/topp/ows?"][2] = ["tasmania_roads", "url0-tasmania_roads"];
	couche["http://geoserver.ics.perm.ru/geoserver/topp/ows?"][3] = ["tasmania_water_bodies", "url0-tasmania_water_bodies"];
	couche["http://geoserver.ics.perm.ru/geoserver/topp/ows?"][4] = ["tasmania_cities", "url0-tasmania_cities"];
	 //typeNS = topp
	//typeNS:'topp'
	
	//https://geobretagne.fr/geoserver/ows?service=WFS&version=1.0.0&request=getcapabilities
	
	
	//https://geobretagne.fr/geoserver/ows?
	couche["https://geobretagne.fr/geoserver/ows?"]=[];
	couche["https://geobretagne.fr/geoserver/ows?"][0] = ["ccvia:abri_velo", "https://geobretagne.fr/geoserver/ows?-ccvia:abri_velo"];
	couche["https://geobretagne.fr/geoserver/ows?"][1] = ["sdis29:accident_circulation_sdis29", "https://geobretagne.fr/geoserver/ows?-sdis29:accident_circulation_sdis29"];
	 
	//url2
	couche["p2"] = [];
	couche["p2"][0] = ["p2v0", "url2-couche0"];
	couche["p2"][1] = ["p2v1", "url2-couche1"];
	 /*
	 
	var rue = [];
	//url0-tasmania_state_boundaries
	rue["http://geoserver.ics.perm.ru/geoserver/topp/ows?v0"] = [];
	rue["http://geoserver.ics.perm.ru/geoserver/topp/ows?v0"][0] = ["http://geoserver.ics.perm.ru/geoserver/topp/ows?v0r0", "url0-tasmania_state_boundaries-rue0"];
	rue["http://geoserver.ics.perm.ru/geoserver/topp/ows?v0"][1] = ["http://geoserver.ics.perm.ru/geoserver/topp/ows?v0r1", "url0-tasmania_state_boundaries-rue1"];
	 
	//url0-states
	rue["http://geoserver.ics.perm.ru/geoserver/topp/ows?v1"] = [];
	rue["http://geoserver.ics.perm.ru/geoserver/topp/ows?v1"][0] = ["http://geoserver.ics.perm.ru/geoserver/topp/ows?v1r0", "url0-states-rue0"];
	rue["http://geoserver.ics.perm.ru/geoserver/topp/ows?v1"][1] = ["http://geoserver.ics.perm.ru/geoserver/topp/ows?v1r1", "url0-states-rue1"];
	rue["http://geoserver.ics.perm.ru/geoserver/topp/ows?v1"][2] = ["http://geoserver.ics.perm.ru/geoserver/topp/ows?v1r2", "url0-states-rue2"];
	 
	 
	//https://geobretagne.fr/geoserver/ows?-couche0
	rue["https://geobretagne.fr/geoserver/ows?v0"] = [];
	rue["https://geobretagne.fr/geoserver/ows?v0"][0] = ["https://geobretagne.fr/geoserver/ows?v0r0", "https://geobretagne.fr/geoserver/ows?-couche0-rue0"];
	rue["https://geobretagne.fr/geoserver/ows?v0"][1] = ["https://geobretagne.fr/geoserver/ows?v0r1", "https://geobretagne.fr/geoserver/ows?-couche0-rue1"];
	 
	//https://geobretagne.fr/geoserver/ows?-couche1
	rue["https://geobretagne.fr/geoserver/ows?v1"] = [];
	rue["https://geobretagne.fr/geoserver/ows?v1"][0] = ["https://geobretagne.fr/geoserver/ows?v1r0", "https://geobretagne.fr/geoserver/ows?-couche1-rue0"];
	rue["https://geobretagne.fr/geoserver/ows?v1"][1] = ["https://geobretagne.fr/geoserver/ows?v1r1", "https://geobretagne.fr/geoserver/ows?-couche1-rue1"];
	 
	 
	//url2-couche0
	rue["p2v0"] = [];
	rue["p2v0"][0] = ["p2v0r0", "url2-couche0-rue0"];
	rue["p2v0"][1] = ["p2v0r1", "url2-couche0-rue1"];
	 
	//https://geobretagne.fr/geoserver/ows?-couche1
	rue["p2v1"] = [];
	rue["p2v1"][0] = ["p2v1r0", "url2-couche1-rue0"];
	rue["p2v1"][1] = ["p2v1r1", "url2-couche1-rue1"];
	rue["p2v1"][2] = ["p2v1r2", "url2-couche1-rue2"];*/
	
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
	      //raz("listerue");
	      for (i=0; i<couche[choix].length; i++)
	         {
	         new_option = new Option(couche[choix][i][1],couche[choix][i][0]);
	         document.formu.elements["listecouche"].
	 options[document.formu.elements["listecouche"].length]=new_option;
	         }
	    /*  for (i=0; i<rue[choix+"v0"].length; i++)
	         {
	         new_option = new Option(rue[choix+"v0"][i][1],rue[choix+"v0"][i][0]);
	         document.formu.elements["listerue"].options[document.formu.
	 elements["listerue"].length]=new_option;
	         }
	      break;*/
	   case "listecouche":
	     // raz("listerue");
	    /*  for (i=0; i<rue[choix].length; i++)
	         {
	         new_option = new Option(rue[choix][i][1],rue[choix][i][0]);
	         document.formu.elements["listerue"].options[document.formu.
	 elements["listerue"].length]=new_option;
	         }*/
	    //  break;
	   }
	}
	 
	function raz(liste)
	{l=document.formu.elements[liste].length;
	for (i=l; i>=0; i--)
	   document.formu.elements[liste].options[i]=null;
	}