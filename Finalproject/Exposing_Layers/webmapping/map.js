mapboxgl.accessToken = 'pk.eyJ1IjoianVubGluZ3podWFuZzA2MTIiLCJhIjoiY2w2ZWM0bWJ2MDB6aTNubXhsdG8zZTJ3dSJ9.Eeqn1X7BTGldAw2_yNGbsw';

var oriZoom = 12;
var curZoom = oriZoom;
document.getElementById("curZoom").innerHTML = curZoom;  



const map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/junlingzhuang0612/cl6faj43y001315qk9lz1aa65',
    zoom: oriZoom,
    center: [-73.963036, 40.807384]
});
map.addControl(new mapboxgl.NavigationControl());
map.on('style.load', () => {
    map.setFog({});
    });
     
document.getElementById('zoomin').addEventListener('click', () => {
    //for loop
        curZoom = curZoom + 1;
        document.getElementById("curZoom").innerHTML = curZoom;  
        // Fly to a  location
        map.flyTo({
        // center: [(Math.random() - 0.5) * 360, (Math.random() - 0.5) * 100],
        center:[-73.963036, 40.807384],
        zoom:curZoom,
        essential: true // this animation is considered essential with respect to prefers-reduced-motion
   
    });
   
});



document.getElementById('reset').addEventListener('click', () => {
    curZoom = oriZoom;
    document.getElementById("curZoom").innerHTML = curZoom;  
    // Fly to a  location
    map.flyTo({
    // center: [(Math.random() - 0.5) * 360, (Math.random() - 0.5) * 100],
    center:[-73.963036, 40.807384],
    zoom:12,
    essential: true // this animation is considered essential with respect to prefers-reduced-motion
   
    });
});



const cityCoordinates = [
    [100.507, 13.745],
    [98.993, 18.793],
    [99.838, 19.924],
    [102.812, 17.408],
    [100.458, 7.001],
    [100.905, 12.935]
];



// map.on('load', () => {
//     for (const [index, coordinate] of cityCoordinates.entries()) {
//         setTimeout(() => {
//             map.jumpTo({ center: coordinate });
//         }, 2000 * index);
//     }
// });

// map.zoomTo(7, {
//     duration: 2000,
//     offset: [100, 50]
//     });

// map.on('load', function () {
// //    let mapLayers = map.getStyle().layers;
// //     for (let i = 0; i < mapLayers.length; i++) {
// //         console.log(mapLayers[i].id);
        
// //     }

//     map.addLayer({
//         'id': 'citibikeData',
//         'type': 'circle',
//         'source': {
//             'type': 'geojson',
//             'data': 'data/citiGeo.geojson'
//         },
//         'paint': {
//             'circle-color': ['interpolate', ['linear'], ['get', 'difference'],
//                 0, '#ff4400',
//                 50, '#ffba31',
//                 100, '#ffffff'
//             ],
//             'circle-stroke-color': '#4d4d4d',
//             'circle-stroke-width': 0.5,
//             'circle-radius': ['interpolate', ['exponential', 2], ['zoom'],
//                 10.5, ['interpolate', ['linear'], ['get', 'difference'],
//                 0, 1,
//                 100, 4],
//                 15, ['interpolate', ['linear'], ['get', 'difference'],
//                 0, 4,
//                 100, 50]
//             ]
//         }
//     }, 'road-label-simple');
//     // map.addLayer({
//     //     'id': 'mhhi',
//     //     'type': 'fill',
//     //     'source': {
//     //         'type': 'geojson',
//     //         'data': 'data/medianIncome.geojson'
//     //     },
//     //     'paint': {
//     //         'fill-color': ['step', ['get', 'MHHI'],
//     //             '#ffffff',
//     //             20000, '#ccedf5',
//     //             50000, '#99daea',
//     //             75000, '#66c7e0',
//     //             100000, '#33b5d5',
//     //             150000, '#00a2ca'],
//     //         'fill-opacity': ['case', ['==', ['get', 'MHHI'], null], 0, 0.65]
//     //     }
//     // },'citibikeData')
// });




// map.on('click', 'citibikeData', function(e){
//     let stationID = e.features[0].properties["start station id"];
//     let countweek1 = e.features[0].properties["countWeek1"];
//     let countweek4 = e.features[0].properties["countWeek4"];
//     let difference = e.features[0].properties["difference"];

//     new mapboxgl.Popup()
//         .setLngLat(e.lngLat)
//         .setHTML('Station No. ' + stationID + '<hr><br>1st week of March 2020: ' + countweek1 +
//         '<br>4th week of March 2020: ' + countweek4 +
//         '<br>Change: ' + difference + '%')
//         .addTo(map);
// });

// map.on('mouseenter', 'citibikeData', function(){
//     map.getCanvas().style.cursor = 'pointer';
// });
// map.on('mouseleave', 'citibikeData', function(){
//     map.getCanvas().style.cursor = '';
// });



