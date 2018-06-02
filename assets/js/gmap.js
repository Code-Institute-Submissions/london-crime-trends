// Initialize and add the map
function initMap(lat_param=51.522883, lng_param=-0.15713) {
  // The location of Uluru
  var coords = {lat: lat_param, lng: lng_param};
  // The map, centered at Uluru
  var map = new google.maps.Map(
      document.getElementById('map'), {zoom: 15, center: coords});
  // The marker, positioned at Uluru
  var marker = new google.maps.Marker({position: coords, map: map});
}
