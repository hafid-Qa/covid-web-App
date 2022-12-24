// Map display
const KEY =
  "pk.eyJ1IjoiaGFmaWQxMDAiLCJhIjoiY2xidWk3MWRkMXA2ZzN3cGs0cDRlbnpzMSJ9.WFkGyQqKh7BglSV3jrSuzw";

window.addEventListener("load", (event) => {
  displayMap([-74.01084309969329, 40.71074359563446]);
});
const displayMap = (coordinates) => {
  mapboxgl.accessToken = KEY;

  const map = new mapboxgl.Map({
    container: "map",
    style: "mapbox://styles/mapbox/streets-v12",
    center: coordinates,
    zoom: 2,
  });
  map.addControl(new mapboxgl.NavigationControl());
  if (coordinates[0] != -74.01084309969329) {
    new mapboxgl.Marker().setLngLat(coordinates).addTo(map);
  }
};

//  fetch coordinates of selected country and display the map
const fetchCoordinates = (country) => {
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${country}.json?access_token=${KEY}`;
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      const coordinates = data.features[0].geometry.coordinates;
      displayMap(coordinates);
    });
};
