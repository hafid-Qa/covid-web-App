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

// displayMap([-74.01084309969329, 40.71074359563446]);

console.log("hi");