// This will show the location of the selected tube station on a google map
// Specifically, initMap initializes a new google map object and links it to
// the relevant element in the DOM.
// The google maps javascript api (maps.googleapis.com/maps/api/js) will then
// take care of rendering the map
function initMap(lat_param=0, lng_param=0) {
  if (!(lat_param==0 && lng_param==0)) {
    var coords = {lat: lat_param, lng: lng_param};
    var map = new google.maps.Map(
        document.getElementById('map'), {zoom: 15, center: coords});
    var marker = new google.maps.Marker({position: coords, map: map});
  }
}
