// Extract street level crime statistics using the uk police api which returns
// data in JSON format

const police_api_url = "https://data.police.uk/api";

// Retrieve police street crime JSON data and render the data in graph form using d3/dc/crossfilter
// The street crime api url requires a latitude and longitude to be able to return crimes within a
// given radius. Coordinates are passed in from the UI which is based on station coordinates extracted
// from the TFL api
function fetchStreetCrimeData(lat, lng, line_chart_colour) {
  // API request to retrieve the latest month's worth of data. Wait for the request to complete
  // before proceeding to render the data
  $.when(
    $.getJSON(`${police_api_url}/crimes-street/all-crime?lat=${lat}&lng=${lng}`)
  ).then(
    function(response) {
      renderGraphs(response, line_chart_colour);
    },
    function(errorResponse) {
      if (errorResponse.status == 404) {
        error_container.text('Street crime data not found');
      } else {
        console.log(errorResponse);
        error_container.text(`Error: ${errorResponse.reponseJSON.message}`);
      }
    }
  )
}
