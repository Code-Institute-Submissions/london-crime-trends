// Initialize and add the map
function initMap(lat_param=0, lng_param=0) {
  if (!(lat_param==0 && lng_param==0)) {
    var coords = {lat: lat_param, lng: lng_param};
    var map = new google.maps.Map(
        document.getElementById('map'), {zoom: 15, center: coords});
    var marker = new google.maps.Marker({position: coords, map: map});
  }
}
