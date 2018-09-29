// Render pie and line charts using JS libraries: d3, dc and crossfilter

// Initialise the cross filter which will allow graphs to adjust dynamically
// when specific categories are selected by the user. Also call functions that
// use dc to build the charts. Finally render the graphs.
function renderGraphs(crime_data, line_chart_colour) {
  var ndx = crossfilter(crime_data);

  crime_data.forEach(function(d) {
    let ymd_array = d.month.split('-');
    // As this project is purely for illustrative purposes,
    // we're using a random day of the month for each instance of a street crime
    // so that a line chart can be rendered for the month
    d.date = new Date(ymd_array[0], ymd_array[1]-1, (Math.floor(Math.random() * 30) + 1));
    d.force = d.location_type + " " + d.location_subtype;
    // The phrase 'on or near' is used very repetitively in the data so
    // it is being removed to clean up the appearance of the pie chart legend
    d.street  = d.location.street.name.replace("On or near ","");
  });

  // Build dropdowns and pie chart and line chart
  crime_selector(ndx);
  force_selector(ndx);
  crime_line_chart(ndx, line_chart_colour);
  crime_pie_chart(ndx);

  // Finally render the charts and their titles
  reset_titles();
  dc.renderAll();
  load_titles_styles();
}

function reset_titles() {
  $("#pie-chart h4").remove();
  $("#line-chart h4").remove();
  $("div#dropdown-selector").remove();
}

function load_titles_styles() {
  $("#loading").empty();
  $("#pie-chart").prepend(`<h4 style="margin-top:50px;">Top 10 Locations</h4>`);
  $("#line-chart").prepend("<h4>Crimes - latest month available</h4>");
  $(".dc-select-menu").wrap(`<div id="dropdown-selector"></div>`);
}

// Drop down showing various crime categories. Graphs will adjust according
// to whatever the user selects
function crime_selector(ndx) {
  var dim = ndx.dimension(dc.pluck('category'));
  var group = dim.group();

  dc.selectMenu("#crime-selector")
    .dimension(dim)
    .group(group)
    .promptText('Type of Crime');
}

// Drop down showing various police forces. Graphs will adjust according
// to the police force the user selects
function force_selector(ndx) {
  var dim = ndx.dimension(dc.pluck('force'));
  var group = dim.group();

  dc.selectMenu("#force-selector")
    .dimension(dim)
    .group(group)
    .promptText('Police Force');
}

// Pie chart showing a break down of street crime stats by location
// for the currently selected tube station
function crime_pie_chart(ndx) {
  var dim = ndx.dimension(dc.pluck('street'));
  var group = dim.group();

  dc.pieChart("#pie-chart")
    .dimension(dim)
    .group(group)
    .cx(80)
    .cy(80)
    .height(200)
    .radius(80)
    .innerRadius(40)
    .cap(10)
    .renderLabel(false)
    .transitionDuration(1000)
    .legend(dc.legend().x(170).y(0).gap(5));
}

// Line chart showing the volume of crimes over the last 5 or 6 months.
// The police api does not always have up to date data - hence the variance of 5/6 months
function crime_line_chart(ndx, line_chart_colour) {
  var dim = ndx.dimension(dc.pluck('date'));
  var group = dim.group();

  var minDate = dim.bottom(1)[0].date;
  var maxDate = dim.top(1)[0].date;

  dc.lineChart("#line-chart")
    .renderArea(true)
    .width(null)
    .height(250)
    .margins({
      top: 5,
      right: 0,
      bottom: 100,
      left: 60
    })
    .dimension(dim)
    .group(group)
    .transitionDuration(500)
    .x(d3.scaleTime().domain([minDate, maxDate]))
    .xUnits(d3.timeMonths)
    .elasticX(true)
    .elasticY(true)
    .colors(line_chart_colour)
    .transitionDuration(1000)
    .on("renderlet", function(chart){
        chart.selectAll("g.x text")
          .attr('dx', '-35')
          .attr('dy', '0')
          .attr('transform', "rotate(-65)");
      })
    .yAxis().ticks(4);
}
