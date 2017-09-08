var wmsLayer;
var boundaries;
var fond;
var nbcouchemap=0;
var couchemap= new Array();	
var adressemap= new Array();	
var formatmap= new Array();

//appel au service WMS
function appelWMS() {
    //récupération des valeurs
    adressewms = getAdresseWMS();
    couchewms = getCoucheWMS();
    formatwms = getFormatWMS();
    
    if (reprintmap==0){
	    couchemap[nbcouchemap] = couchewms;
	    adressemap[nbcouchemap] = adressewms;
	    formatmap[nbcouchemap] = formatwms;
	
	    document.getElementById('listecouchemap').innerHTML += "<input type='checkbox' checked='checked' name='c" + nbcouchemap + "' " +"' id='c" + nbcouchemap + "' onclick='reprint();' /> + WMS: " + adressewms + couchewms+ "<br>";
	    nbcouchemap++;
    }
    
//    alert("adresse: " + adresse + "\n" + "couche: " + couche + "\n" + "formatwms: " + formatwms);

    //construction de la couche WMS contenu dans wmsLayer
    wmsLayer = L.tileLayer.wms(adressewms, {
        layers: couchewms,
    })
        .setOpacity(0.8)
    opacitySlider.setOpacityLayer(wmsLayer);
    return wmsLayer;
}

//appel au service WFS
function appelWFS() {
    //mise a jour de l'adresse
    adressewfs = getAdresseWFS();
    couchewfs = getCoucheWFS();
    formatwfs = getFormatWFS();

    
    
    if (reprintmap==0){
	    couchemap[nbcouchemap] = couchewfs;
	    adressemap[nbcouchemap] = adressewfs;
	    formatmap[nbcouchemap] = formatwfs;
	    
	    document.getElementById('listecouchemap').innerHTML += "<input type='checkbox' checked='checked' name='c" + nbcouchemap + "' " +"' id='c" + nbcouchemap + "' onclick='reprint();' /> + WFS: " + adressewfs + couchewfs + "<br>";
	    nbcouchemap++;
    }
    
    
    
  // alert("adressewfs: " + adressewfs + "\n" + "couchewfs: " + couchewfs + "\n" + "formatwfs: " + formatwfs);

    //construction de l'objet WFS contenu dans boundaries
    boundaries = new L.WFS({
        url: adressewfs,
        typeName: couchewfs,
        //typeNS: 'topp',
        crs: L.CRS.EPSG4326,
        //geometryField: 'the_geom',
        geometryField: 'ogr_geometry',
        style: {
            color: 'blue',
            weight: 2
        }
    }, new L.Format.GeoJSON({ crs: L.CRS.EPSG4326 }))
  .once('load', function () {
      map.fitBounds(boundaries);
  });
    return boundaries;
}