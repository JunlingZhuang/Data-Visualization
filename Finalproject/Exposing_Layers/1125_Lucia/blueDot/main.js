

mapboxgl.accessToken =
 'pk.eyJ1IjoianVubGluZ3podWFuZzA2MTIiLCJhIjoiY2w2ZWM0bWJ2MDB6aTNubXhsdG8zZTJ3dSJ9.Eeqn1X7BTGldAw2_yNGbsw';

 
 const map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/junlingzhuang0612/cl6faj43y001315qk9lz1aa65',
  zoom: 12,
  center: [-73.963036, 40.807384]
});
map.addControl(new mapboxgl.NavigationControl());



// Get coordinates of the mouse pointer
map.on('mousemove', (e) => {
  document.getElementById("mouseCenter").innerHTML = 
  // `e.point` is the x, y coordinates of the `mousemove` event
  // relative to the top-left corner of the map.
  // JSON.stringify(e.point) +
  // '<br />' +
  // `e.lngLat` is the longitude, latitude geographical position of the event.
  // JSON.stringify(e.lngLat.wrap());
  String((e.lngLat.wrap()));
  });


map.on('load', () => {
  // Add a custom layer that uses
  // a vector tileset source.
  map.addLayer({
      id: 'triangles',
      source: {
          type: 'vector',
          url: 'mapbox://examples.ckv9z0wgf5v7c27p7me2mf0l9-9wrve' // custom tileset
      },
      'source-layer': 'triangles',
      type: 'fill'
  });



//Here is the color change that uses zoom instead of using the buttons in the example
map.on("move",()=>{
  var currentZoom = map.getZoom()
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
	
	
	
	console.log(roundedStepUp)
	d3.selectAll(".matrixRect").style("opacity",.2)
d3.selectAll("."+roundedZoom).style("opacity",1)	
d3.selectAll("."+roundedStepUp).style("opacity",.5)	
	
	
    document.getElementById("curZoom").innerHTML = Math.round(currentZoom*100)/100; 
    if(currentZoom>16 && currentZoom<=18){
      //TODO use a json and make a loop here for each layer you need to change
            map.setPaintProperty("water", 'fill-color', "red");
            map.setPaintProperty("building", 'fill-color', "pink");
            map.setPaintProperty("triangles", 'fill-color', "blue");
    }

    if(currentZoom<14 && currentZoom<=16){
            map.setPaintProperty(layer.value, 'fill-color', "green");
    }
    if(currentZoom>10 && currentZoom<=14){
            map.setPaintProperty(layer.value, 'fill-color', "gold");
    }

  })


});

const swatches = document.getElementById('swatches');
const layer = document.getElementById('layer');
const colors = [
  '#ffffcc',
  '#a1dab4',
  '#41b6c4',
  '#2c7fb8',
  '#253494',
  '#fed976',
  '#feb24c',
  '#fd8d3c',
  '#f03b20',
  '#bd0026'
];

for (const color of colors) {
  const swatch = document.createElement('button');
  swatch.style.backgroundColor = color;
  swatch.addEventListener('click', () => {
      map.setPaintProperty(layer.value, 'fill-color', color);
  });
  swatches.appendChild(swatch);
};

