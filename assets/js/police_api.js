// Extract street level crime statistics using the uk police api which returns
// data in JSON format

var police_api_url = "https://data.police.uk/api";

// Retrieve police street crime JSON data and render the data in graph form using d3/dc/crossfilter
// The street crime api url requires a latitude and longitude to be able to return crimes within a
// given radius. Coordinates are passed in from the UI which is based on station coordinates extracted
// from the TFL api
function fetchStreetCrimeData(lat, lng, col) {
  var dt = new Date();
  var yearmonth = [];
  var street_crimes = [];

  for (var i = 0; i < 12; i++) {
    dt.setMonth(dt.getMonth() - 1);
    year = dt.getFullYear();
    month = ((dt.getMonth() + 1) < 10 ? '0' : '') + (dt.getMonth() + 1);
    yearmonth.push(year + "-" + month);
  }
  // Set of api requests to retrieve 6 months worth of data. Wait for all api requests to complete
  // before proceeding to render the data
  $.when(
    $.getJSON(`${police_api_url}/crimes-street/all-crime?lat=${lat}&lng=${lng}&date=${yearmonth[0]}`),
    $.getJSON(`${police_api_url}/crimes-street/all-crime?lat=${lat}&lng=${lng}&date=${yearmonth[1]}`),
    $.getJSON(`${police_api_url}/crimes-street/all-crime?lat=${lat}&lng=${lng}&date=${yearmonth[2]}`),
    $.getJSON(`${police_api_url}/crimes-street/all-crime?lat=${lat}&lng=${lng}&date=${yearmonth[3]}`),
    $.getJSON(`${police_api_url}/crimes-street/all-crime?lat=${lat}&lng=${lng}&date=${yearmonth[4]}`),
    $.getJSON(`${police_api_url}/crimes-street/all-crime?lat=${lat}&lng=${lng}&date=${yearmonth[5]}`)
  ).then(
    function(response1,response2,response3,response4,response5,response6) {
      street_crimes = response1[0].concat(response2[0],response3[0],response4[0],response5[0],
                                          response6[0]);
      renderGraphs(street_crimes, col);
    },
    function(errorResponse) {
      if (errorResponse.status == 404) {
        $("#error").html(`<h4>Street crime data not found</h4>`);
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
