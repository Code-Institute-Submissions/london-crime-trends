function renderGraphs(crime_data, col) {
  var ndx = crossfilter(crime_data);

  crime_data.forEach(function(d) {
    d.date = new Date(d.month);
    d.force = d.location_type + " " + d.location_subtype;
    d.street  = d.location.street.name;
  })

  crime_selector(ndx);
  force_selector(ndx);
  crime_line_chart(ndx, col);
  crime_pie_chart(ndx);

  dc.renderAll();
}

function crime_selector(ndx) {
  var dim = ndx.dimension(dc.pluck('category'));
  var group = dim.group();

  dc.selectMenu("#crime-selector")
    .dimension(dim)
    .group(group);
}

function force_selector(ndx) {
  var dim = ndx.dimension(dc.pluck('force'));
  var group = dim.group();

  dc.selectMenu("#force-selector")
    .dimension(dim)
    .group(group);
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
      top: 20,
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
    .renderlet(function(chart){
        chart.selectAll("g.x text")
          .attr('dx', '-55')
          .attr('dy', '-10')
          .attr('transform', "rotate(-65)");
      })
    .yAxis().ticks(4);
}
