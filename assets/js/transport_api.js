var tfl_api_url = "https://api.tfl.gov.uk";

function fetchTFLdata(lineid) {
  $.when(
    $.getJSON(`${tfl_api_url}/Line/Mode/tube`)
  ).then(
    function(response) {
      var tube_lines = response;
      tube_lines.forEach(function(element) {
        if (element.id == lineid) {
          fetchLineStops(element.id);
        }
      });
      // console.log(tube_lines);
    },
    function(errorResponse) {
      if (errorResponse.status == 404) {
        $("#error").html(`<h4>No info found</h4>`);
      } else if (errorResponse.status == 403) {
        var resetTime = new Date(errorResponse.getResponseHeader('X-RateLimit-Reset') * 1000);
        $("#error").html(`<h4>Too many requests. Please wait until ${resetTime.toLocaleTimeString()}</h4>`);
      } else {
        console.log(errorResponse);
        $("#error").html(`<h4>Error: ${errorResponse.reponseJSON.message}</h4>`);
      }
    }
  )
}

function fetchLineStops(station_id) {
  $.when(
    $.getJSON(`https://api.tfl.gov.uk/line/${station_id}/stoppoints`)
  ).then(
    function(response) {
      var stations = response;
      // console.log(stations);

      $("#stops").append(`<select class="form-control stations" onchange="render_gmap();get_crime_data();" id="station_dropdown"></select>`);
      $("#station_dropdown").append("<option value='0'>Select a tube station</option>");
      stations.forEach(function(element) {
        $("#station_dropdown").append(`<option value="${element.commonName}" lat="${element.lat}" lon="${element.lon}">${element.commonName}</option>`);
      });
    },
    function(errorResponse) {
      if (errorResponse.status == 404) {
        $("#error").html(`<h4>No info found</h4>`);
      } else if (errorResponse.status == 403) {
        var resetTime = new Date(errorResponse.getResponseHeader('X-RateLimit-Reset') * 1000);
        $("#error").html(`<h4>Too many requests. Please wait until ${resetTime.toLocaleTimeString()}</h4>`);
      } else {
        console.log(errorResponse);
        $("#error").html(`<h4>Error: ${errorResponse.reponseJSON.message}</h4>`);
      }
    }
  )
}
