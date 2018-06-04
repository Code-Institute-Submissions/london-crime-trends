function renderGraphs(crime_data, col) {
  var ndx = crossfilter(crime_data);

  crime_data.forEach(function(d) {
    d.date = new Date(d.month);
    d.force = d.location_type + " " + d.location_subtype;
    d.street  = d.location.street.name.replace("On or near ","");
  })

  crime_selector(ndx);
  force_selector(ndx);
  crime_line_chart(ndx, col);
  crime_pie_chart(ndx);

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
  $("#line-chart").prepend("<h4>Crimes over 11/12 months</h4>");
  $(".dc-select-menu").wrap(`<div id="dropdown-selector"></div>`);
}

function crime_selector(ndx) {
  var dim = ndx.dimension(dc.pluck('category'));
  var group = dim.group();

  dc.selectMenu("#crime-selector")
    .dimension(dim)
    .group(group)
    .promptText('Type of Crime');
}

function force_selector(ndx) {
  var dim = ndx.dimension(dc.pluck('force'));
  var group = dim.group();

  dc.selectMenu("#force-selector")
    .dimension(dim)
    .group(group)
    .promptText('Police Force');
}

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

function crime_line_chart(ndx, col) {
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
    .colors(col)
    .transitionDuration(1000)
    .on("renderlet", function(chart){
        chart.selectAll("g.x text")
          .attr('dx', '-35')
          .attr('dy', '0')
          .attr('transform', "rotate(-65)");
      })
    .yAxis().ticks(4);
}
