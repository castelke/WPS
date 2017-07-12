 
 var test;
 //alert(window.location.search); 
 var adresse = window.location.search
 
 var partsArray = adresse.split('&');
var vmin =parseInt(partsArray[5].substr(5));
var vmax = parseInt(partsArray[6].substr(5));
var vstep = parseInt(partsArray[7].substr(6));
/*
alert(partsArray[0].substr(1));
alert(partsArray[5].substr(5));
alert(partsArray[6].substr(5));
alert(partsArray[7].substr(6));*/
//alert(vmin +" "+ vmax + " " +vstep);
 var slider;
 var nb=0;
 newdiv =document.createElement('divForm');
 newdivS =document.createElement('divSlider');
 divS =document.createElement('divS');

 
 while (nb<partsArray[0].substr(1)){
	// alert(partsArray[5+(6*nb)].substr(0));
	 
	 
/*	document.getElementById("min").value = parseInt(partsArray[5+(6*nb)].substr(5));
	document.getElementById("max").value = parseInt(partsArray[6+(6*nb)].substr(5));
	document.getElementById("step").value =  parseInt(partsArray[7+(6*nb)].substr(6));*/

	 var vmin =parseInt(partsArray[5+(6*nb)].substr(5));
	 var vmax = parseInt(partsArray[6+(6*nb)].substr(5));
	 var vstep = parseInt(partsArray[7+(6*nb)].substr(6));

	 if (partsArray[2+(6*nb)].substr(0) == "user"){
		//alert( partsArray[3+(6*nb)].substr(0));
	 newdivS.innerHTML += partsArray[3+(6*nb)].substr(0) + "<br>";
	//alert( parseInt(partsArray[6+(6*nb)].substr(5)));
	// divS.innerHTML += '<form id="slider' + nb +   '" style="display:block"> <div id="' + nb + '"><h2> </h2> <input type="range" min="' +  parseInt(partsArray[5+(6*nb)].substr(5))   +'" max="'  + parseInt(partsArray[6+(6*nb)].substr(5)) + '" step="' +  parseInt(partsArray[7+(6*nb)].substr(5))   +'" data-rangeslider><output></output> <br><br> </div> </form>';
	 document.getElementById("slider").style.display = "block";
	 }
	 
	 
	 if (partsArray[2+(6*nb)].substr(0) == "fixed"){
		 newdiv.innerHTML += partsArray[3+(6*nb)].substr(0) + "<br>";	 
	newdiv.innerHTML += partsArray[4+(6*nb)].substr(7);
	document.getElementById("slider").style.display = "none" + "<br>";
	 }
	 
	 
	 
	 nb=nb+1;
	 newdiv.innerHTML += "<br><br>";
	// alert(nb);
 }
	
	document.getElementById("divName").appendChild(newdiv);
	document.getElementById("divSlider").appendChild(newdivS);
	document.getElementById("divS").appendChild(divS);
 
  $(function() {

      var $document = $(document);
      var selector = '[data-rangeslider]';
      var $element = $(selector);
      
      document.getElementById("min").value = vmin;
      document.getElementById("max").value = vmax;
      document.getElementById("step").value = vstep;
     
      
      // For ie8 support
      var textContent = ('textContent' in document) ? 'textContent' : 'innerText';

      // Example functionality to demonstrate a value feedback
      function valueOutput(element) {
          var value = element.value;
          var output = element.parentNode.getElementsByTagName('output')[0] || element.parentNode.parentNode.getElementsByTagName('output')[0];
          output[textContent] = value;
      }

      $document.on('input', 'input[type="range"], ' + selector, function(e) {
          valueOutput(e.target);
      });

      // Example functionality to demonstrate disabled functionality
      $document .on('click', '#js-example-disabled button[data-behaviour="toggle"]', function(e) {
          var $inputRange = $(selector, e.target.parentNode);

          if ($inputRange[0].disabled) {
              $inputRange.prop("disabled", false);
          }
          else {
              $inputRange.prop("disabled", true);
          }
          $inputRange.rangeslider('update');
      });

      // Example functionality to demonstrate programmatic value changes
      $document.on('click', '#js-example-change-value button', function(e) {
          var $inputRange = $(selector, e.target.parentNode);
          var value = $('input[type="number"]', e.target.parentNode)[0].value;

          $inputRange.val(value).change();
      });

      // Example functionality to demonstrate programmatic attribute changes
      $document.on('click', '#js-example-change-attributes button', function(e) {
          var $inputRange = $(selector, e.target.parentNode);
          //test=e.target.parentNode;
         
          
          var attributes = {
                  min: $('input[name="min"]', e.target.parentNode)[0].value,
                  max: $('input[name="max"]', e.target.parentNode)[0].value,
                  step: $('input[name="step"]', e.target.parentNode)[0].value
              };

          $inputRange.attr(attributes);
          $inputRange.rangeslider('update', true);
      });

      // Example functionality to demonstrate destroy functionality
      $document
          .on('click', '#js-example-destroy button[data-behaviour="destroy"]', function(e) {
              $(selector, e.target.parentNode).rangeslider('destroy');
          })
          .on('click', '#js-example-destroy button[data-behaviour="initialize"]', function(e) {
              $(selector, e.target.parentNode).rangeslider({ polyfill: false });
          });

      // Example functionality to test initialisation on hidden elements
      $document
          .on('click', '#js-example-hidden button[data-behaviour="toggle"]', function(e) {
              var $container = $(e.target.previousElementSibling);
              $container.toggle();
          });

      // Basic rangeslider initialization
      $element.rangeslider({

          // Deactivate the feature detection
          polyfill: false,

          // Callback function
          onInit: function() {
              valueOutput(this.$element[0]);
          },

          // Callback function
          onSlide: function(position, value) {
              console.log('onSlide');
              console.log('position: ' + position, 'value: ' + value);
          },

          // Callback function
          onSlideEnd: function(position, value) {
              console.log('onSlideEnd');
              console.log('position: ' + position, 'value: ' + value);
          }
      });
      change();
  });
  
  function change() {
	  
      var $document = $(document);
      var selector = '[data-rangeslider]';
      var $element = $(selector);

      var $inputRange = $(selector, test);
      var attributes = {
              min: $('input[name="min"]', test)[0].value,
              max: $('input[name="max"]', test)[0].value,
              step: $('input[name="step"]', test)[0].value
          };

      $inputRange.attr(attributes);
      $inputRange.rangeslider('update', true);
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
