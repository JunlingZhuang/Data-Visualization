
function initMap() {
  const myLatlng = { lat: 41.871386, lng: -87.619079 };
  const map = new google.maps.Map(document.getElementById("map"), {
	  maxZoom: 18,
	  minZoom: 0,
      zoom: 3,
      center: myLatlng,
      disableDefaultUI: true,
      zoomControl: true,
  });

  var bounds = new google.maps.LatLngBounds();
  bounds.extend(myLatlng);
  map.fitBounds(bounds);

  const bluedotMarker = new google.maps.Marker({
    position: myLatlng,
    map,
    icon: {
	path: google.maps.SymbolPath.CIRCLE,
    scale: 10,
    fillOpacity: 1,
    strokeWeight: 2,
    fillColor: '#5384ED',
    strokeColor: '#ffffff',
	},
  });

// Get coordinates of the mouse pointer
map.addListener("mousemove", (mapsMouseEvent) => {
  console.log(mapsMouseEvent.latLng.toJSON().lat);
  console.log(mapsMouseEvent.latLng.toJSON().lng);
  JSON.stringify(mapsMouseEvent.latLng)
  document.getElementById("lat").innerHTML = "Lat [" + mapsMouseEvent.latLng.toJSON().lat + "]";
  document.getElementById("long").innerHTML = "Lng [" + mapsMouseEvent.latLng.toJSON().lng + "]";
});

//Here is the color change that uses zoom instead of using the buttons in the example
map.addListener("zoom_changed", () => {

  var currentZoom = map.getZoom()
	var stepUp = currentZoom+1
	var stepDown = currentZoom-1
  // document.getElementById("curZoom").innerHTML = currentZoom; 
	document.getElementById("zoom").innerHTML = "ZL" + map.getZoom();
	
	if(currentZoom <9.5){
		var roundedZoom= "ZL0"+Math.round(currentZoom)
		//var roundedStepUp = "ZL0"+Math.round(stepUp)
	}else{
		var roundedZoom = "ZL"+Math.round(currentZoom)
		//var roundedStepUp = "ZL0"+Math.round(stepUp)
	}
	
	if(roundedStepUp <9.5){
		var roundedStepUp = "ZL0"+Math.round(stepUp)
	}else{
		var roundedStepUp = "ZL"+Math.round(stepUp)
	}
	
	// console.log(roundedStepUp)
	d3.selectAll(".matrixRect").style("opacity",.2)
d3.selectAll("."+roundedZoom).style("opacity",1)	
d3.selectAll("."+roundedStepUp).style("opacity",.2)	



});

}
window.initMap = initMap

