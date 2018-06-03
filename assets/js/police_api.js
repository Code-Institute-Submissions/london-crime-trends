var police_api_url = "https://data.police.uk/api";

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

  $.when(
    $.getJSON(`${police_api_url}/crimes-street/all-crime?lat=${lat}&lng=${lng}&date=${yearmonth[0]}`),
    $.getJSON(`${police_api_url}/crimes-street/all-crime?lat=${lat}&lng=${lng}&date=${yearmonth[1]}`),
    $.getJSON(`${police_api_url}/crimes-street/all-crime?lat=${lat}&lng=${lng}&date=${yearmonth[2]}`),
    $.getJSON(`${police_api_url}/crimes-street/all-crime?lat=${lat}&lng=${lng}&date=${yearmonth[3]}`),
    $.getJSON(`${police_api_url}/crimes-street/all-crime?lat=${lat}&lng=${lng}&date=${yearmonth[4]}`),
    $.getJSON(`${police_api_url}/crimes-street/all-crime?lat=${lat}&lng=${lng}&date=${yearmonth[5]}`),
    $.getJSON(`${police_api_url}/crimes-street/all-crime?lat=${lat}&lng=${lng}&date=${yearmonth[6]}`),
    $.getJSON(`${police_api_url}/crimes-street/all-crime?lat=${lat}&lng=${lng}&date=${yearmonth[7]}`),
    $.getJSON(`${police_api_url}/crimes-street/all-crime?lat=${lat}&lng=${lng}&date=${yearmonth[8]}`),
    $.getJSON(`${police_api_url}/crimes-street/all-crime?lat=${lat}&lng=${lng}&date=${yearmonth[9]}`),
    $.getJSON(`${police_api_url}/crimes-street/all-crime?lat=${lat}&lng=${lng}&date=${yearmonth[10]}`),
    $.getJSON(`${police_api_url}/crimes-street/all-crime?lat=${lat}&lng=${lng}&date=${yearmonth[11]}`)
  ).then(
    function(response1,response2,response3,response4,response5,response6,
             response7,response8,response9,response10,response11,response12,) {
      street_crimes = response1[0].concat(response2[0],response3[0],response4[0],response5[0],
                                      response6[0],response7[0],response8[0],response9[0],
                                      response10[0],response11[0],response12[0]);
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
