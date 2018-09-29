// This will show the location of the selected tube station on a google map
// Specifically, initMap initializes a new google map object and links it to
// the relevant element in the DOM.
// The google maps javascript api (maps.googleapis.com/maps/api/js) will then
// take care of rendering the map

function initMap(lat_param=null, lng_param=null, errMsg='') {
  // Check for valid coordinates, otherwise abandon the map initialisation and
  // report back to the user
  if (lat_param == null || lng_param == null || isNaN(lat_param) || isNaN(lng_param)) {
    //Temporarily display an error to report that the location was invalid
    error_container.text(errMsg);
    setTimeout(function(){
      error_container.text('');
    }, 5000);
  } else {
    var coords = {lat: lat_param, lng: lng_param};
    var map = new google.maps.Map(
        document.getElementById('map'), {zoom: 15, center: coords});
    var marker = new google.maps.Marker({position: coords, map: map});
  }
}
