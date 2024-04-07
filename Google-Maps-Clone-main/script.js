mapboxgl.accessToken =
  "pk.eyJ1IjoicmlkZGhpMjMiLCJhIjoiY2xwdzhvODk4MGU2bDJrcDkzdmh0ZWFhNiJ9.fI6U1aeMcGmIucCxVCCQQQ"

navigator.geolocation.getCurrentPosition(successLocation, errorLocation, {
  enableHighAccuracy: true
})

function successLocation(position) {
  setupMap([position.coords.longitude, position.coords.latitude])
}

function errorLocation() {
  setupMap([-2.24, 53.48])
}


function setupMap(center) {
  const map = new mapboxgl.Map({
    container: "map",
    style: "mapbox://styles/mapbox/streets-v11",
    center: center,
    zoom: 15
    
  })

  const nav = new mapboxgl.NavigationControl()
  map.addControl(nav)

  var directions = new MapboxDirections({
    accessToken: mapboxgl.accessToken
  })

  map.addControl(directions, "top-left")
}


const layerList = document.getElementById('menu');
const inputs = layerList.getElementsByTagName('input');
 
for (const input of inputs) {
input.onclick = (layer) => {
const layerId = layer.target.id;
map.setStyle('mapbox://styles/mapbox/' + layerId);
};
}
