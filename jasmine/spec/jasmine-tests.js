// Verify that the function to fetch street crime data makes the expected API call
// to ensure that the relevant crime data is being returned according to the requested area

describe("Police UK API URL Requests - fetchStreetCrimeData", function() {
  var lat, lng;

  it(`Verify correct get request URL (Barkingside Underground)`, function() {
    lat = 51.585689;
    lng = 0.088585;
  
    spyOn($, "ajax");
    fetchStreetCrimeData(lat, lng, 'black');
    expect($.ajax.calls.mostRecent().args[0]["url"]).toEqual(`https://data.police.uk/api/crimes-street/all-crime?lat=${lat}&lng=${lng}`);
  });

  it(`Verify correct get request Police URL (Baker Street Underground)`, function() {
    lat = 51.522883;
    lng = -0.15713;
  
    spyOn($, "ajax");
    fetchStreetCrimeData(lat, lng, 'black');
    expect($.ajax.calls.mostRecent().args[0]["url"]).toEqual(`https://data.police.uk/api/crimes-street/all-crime?lat=${lat}&lng=${lng}`);
  });

  it(`Verify correct get request Police URL (Green Park Underground)`, function() {
    lat = 51.506947;
    lng = -0.142787;
  
    spyOn($, "ajax");
    fetchStreetCrimeData(lat, lng, 'black');
    expect($.ajax.calls.mostRecent().args[0]["url"]).toEqual(`https://data.police.uk/api/crimes-street/all-crime?lat=${lat}&lng=${lng}`);
  });
});

// Verify that the function to fetch TFL tube stops makes the expected
// API call to ensure that the correct set of stations is being returned

describe("TFL API URL Requests - fetchLineStops", function() {
  it(`Verify correct get request TFL URL (Bakerloo) with correct API key`, function() {
    spyOn($, "ajax");
    fetchLineStops('bakerloo');
    expect($.ajax.calls.mostRecent().args[0]["url"]).toEqual(`https://api.tfl.gov.uk/line/bakerloo/stoppoints?app_id=af98ba75&app_key=2f417dd4be1cf9870d344c5455e94b2b`);
  });

  it(`Verify correct get request TFL URL (Central) with correct API key`, function() {
    spyOn($, "ajax");
    fetchLineStops('central');
    expect($.ajax.calls.mostRecent().args[0]["url"]).toEqual(`https://api.tfl.gov.uk/line/central/stoppoints?app_id=af98ba75&app_key=2f417dd4be1cf9870d344c5455e94b2b`);
  });

  it(`Verify correct get request TFL URL (Circle) with correct API key`, function() {
    spyOn($, "ajax");
    fetchLineStops('circle');
    expect($.ajax.calls.mostRecent().args[0]["url"]).toEqual(`https://api.tfl.gov.uk/line/circle/stoppoints?app_id=af98ba75&app_key=2f417dd4be1cf9870d344c5455e94b2b`);
  });
});

// Simulate a sample response fromt the police API and test that the graph
// rendering script correctly parses the response to build composite/custom fields.

describe("Test parsed crime data response used to build charts", function() {
  var response, parsedResponse;

  beforeEach(function() {
    response = JSON.parse(`[{"category":"bicycle-theft","location_type":"BTP","location":{"latitude":"51.518713","street":{"id":1489886,"name":"On or near Paddington (station)"},"longitude":"-0.176382"},"context":"","outcome_status":{"category":"Under investigation","date":"2018-09"},"persistent_id":"","id":68799202,"location_subtype":"STATION","month":"2018-09"},{"category":"other","location_type":"ABC","location":{"latitude":"51.518713","street":{"id":1489886,"name":"Pinner (station)"},"longitude":"-0.176382"},"context":"","outcome_status":{"category":"Under investigation","date":"2018-09"},"persistent_id":"","id":68799203,"location_subtype":"STATION","month":"2016-03"}]`);
    parsedResponse = renderGraphs(response, 'red');
  });

  it("Force property consists of location_type and location_subtype", function() {
    console.log(parsedResponse[0]);
    expect(parsedResponse[0].force).toEqual('BTP STATION');
    expect(parsedResponse[1].force).toEqual('ABC STATION');
  });

  it("On or near prefix removed from derived street property", function() {
    expect(parsedResponse[0].street).toEqual('Paddington (station)');
    expect(parsedResponse[1].street).toEqual('Pinner (station)');
  });

  it("Derived random date property is a valid date the month before month property", function() {
    expect(parsedResponse[0].date.getMonth()).toEqual(8);
    expect(parsedResponse[0].date.getYear()).toEqual(2018-1900);
    expect(parsedResponse[1].date.getMonth()).toEqual(2);
    expect(parsedResponse[1].date.getYear()).toEqual(2016-1900);
  });
});
