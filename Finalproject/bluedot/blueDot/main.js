
function initMap() {
  const myLatlng = { lat: 40.807540305250406, lng: -73.96257877349854 };
  const map = new google.maps.Map(document.getElementById("map"), {
      zoom: 3,
      center: myLatlng,
      disableDefaultUI: true,
      zoomControl: true,
  });
  
  // const infowindow1 = new google.maps.InfoWindow({
  //     content: "Change the zoom level",
  //     position: myLatlng,
  //   });
  
    // infowindow1.open(map);
    // map.addListener("zoom_changed", () => {
    //   infowindow1.setContent("Zoom: " + map.getZoom());
      
    // });

//mapboxgl.accessToken =
 //'pk.eyJ1IjoianVubGluZ3podWFuZzA2MTIiLCJhIjoiY2w2ZWM0bWJ2MDB6aTNubXhsdG8zZTJ3dSJ9.Eeqn1X7BTGldAw2_yNGbsw';

 
 //const map = new mapboxgl.Map({
  //container: 'map',
  //style: 'mapbox://styles/junlingzhuang0612/cl6faj43y001315qk9lz1aa65',
  //zoom: 12,
  //center: [-73.963036, 40.807384]
//});
//map.addControl(new mapboxgl.NavigationControl());

// Get coordinates of the mouse pointer
map.addListener("mousemove", (mapsMouseEvent) => {
  console.log(mapsMouseEvent.latLng.toJSON().lat);
  console.log(mapsMouseEvent.latLng.toJSON().lng);
  JSON.stringify(mapsMouseEvent.latLng)
});

//Here is the color change that uses zoom instead of using the buttons in the example
map.addListener("mousemove", (mapsMouseEvent) => {

  var currentZoom = map.getZoom()
	var stepUp = currentZoom+1
	var stepDown = currentZoom-1
  document.getElementById("curZoom").innerHTML = currentZoom; 
	
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
	
	
	
	console.log(roundedStepUp)
	d3.selectAll(".matrixRect").style("opacity",.2)
d3.selectAll("."+roundedZoom).style("opacity",1)	
d3.selectAll("."+roundedStepUp).style("opacity",.5)	
	


  var currentZoom = map.getZoom();
  console.log(map.getZoom());
  //show the current zoom level in the html file
  document.getElementById("curZoom").innerHTML = currentZoom; 

  var stepUp = currentZoom+1
	var stepDown = currentZoom-1

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

  
});

}
window.initMap = initMap
	

