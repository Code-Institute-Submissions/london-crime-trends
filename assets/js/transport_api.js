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
    },
    function(errorResponse) {
      if (errorResponse.status == 404) {
        $("#error").html(`<h4>TFL data not found</h4>`);
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

      $("#stops").append(`<div id="dropdown"><select class="form-control stations" onchange="refresh_dashboard_content();" id="station_dropdown"></select></div>`);
      $("#station_dropdown").append("<option value='0' disabled selected>Select a tube station</option>");
      stations.forEach(function(element) {
        $("#station_dropdown").append(`<option value="${element.commonName}" lat="${element.lat}" lon="${element.lon}">${element.commonName}</option>`);
      });
      $("#dropdown").addClass("dropdown-" + $(".dashboard-sidebar .sidebar-button.active").attr('data-lineid'));
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
