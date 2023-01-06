


function initMap() {
    const myLatlng = { lat: 40.807540305250406, lng: -73.96257877349854 };
    const map = new google.maps.Map(document.getElementById("map"), {
        zoom: 3,
        center: myLatlng,
        disableDefaultUI: true,
        zoomControl: true,
    });
    // Create the initial InfoWindow.
    let infoWindow = new google.maps.InfoWindow({
      content: "Move mouse over map to get LAT/LNG",
      position: myLatlng,
    });
  
    infoWindow.open(map);
    // Configure the click listener.
    map.addListener("mousemove", (mapsMouseEvent) => {
      // Close the current InfoWindow.
      infoWindow.close();
      // Create a new InfoWindow.
      infoWindow = new google.maps.InfoWindow({
        position: mapsMouseEvent.latLng,
      });
      infoWindow.setContent(
        JSON.stringify(mapsMouseEvent.latLng.toJSON(), null, 2)
      );
      infoWindow.open(map);
      console.log(mapsMouseEvent.latLng.toJSON().lat);
      console.log(mapsMouseEvent.latLng.toJSON().lng);
      document.getElementById("lat").innerHTML = "Lat [" + mapsMouseEvent.latLng.toJSON().lat + "]";
      document.getElementById("lng").innerHTML = "Lng [" + mapsMouseEvent.latLng.toJSON().lng + "]";
    });
    
    const infowindow1 = new google.maps.InfoWindow({
        content: "Change the zoom level",
        position: myLatlng,
      });
    
      infowindow1.open(map);
      map.addListener("zoom_changed", () => {
        infowindow1.setContent("Zoom: " + map.getZoom());
        console.log(map.getZoom());
      });
    
  }
window.initMap = initMap;
