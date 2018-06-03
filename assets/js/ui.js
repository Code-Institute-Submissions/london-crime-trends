$(document).ready(function() {
  $(".dashboard-sidebar .sidebar-button").click(function() {
    $(this).addClass("active");
    $(this).siblings().removeClass("active");
    $(".mob-menu .sidebar-button").removeClass("active");
    $(".mob-menu .sidebar-button[lineid='" + $(this).attr("lineid") + "']").addClass('active');
    $("#stops").html("");
    clear_graphs();
    fetchTFLdata($(this).attr("lineid"));
  });

  $(".mob-menu .sidebar-button").click(function() {
    $(".mob-menu .sidebar-button").removeClass("active");
    $(this).addClass("active");
    $(".navbar-toggler").click();
    $(".dashboard-sidebar").children(".sidebar-button").removeClass("active");
    $(".dashboard-sidebar").children(".sidebar-button[lineid='" + $(this).attr("lineid") + "']").addClass('active');
    $("#stops").html("");
    clear_graphs();
    fetchTFLdata($(this).attr("lineid"));
  });

  var num_lines = $(".dashboard-sidebar .sidebar-button").length;
  var div_width = (1/num_lines) * 100;

  for (i = 0; i < num_lines; i++) {
    $("footer").prepend(`<div class="footer-tops f` + i + `" style="width:` + div_width + `%"></div>`);
  }

  var min_main_height = $(window).height() - $("header").outerHeight() - $("footer").outerHeight();
  $("main").css("min-height",min_main_height+"px");

  function resize_svg() {
      $(".chart").each(function() {
          var graph_width = $(this).outerWidth() - 20;

          $(this).children("div:first").width(graph_width);
          $(this).children("div:first svg").width(graph_width);
      });
      dc.renderAll();
  }

  resize_svg();

  $(window).resize(function() {
    resize_svg();
  });

  fetchTFLdata("bakerloo");
});

function clear_graphs() {
  $("#crime-selector").empty();
  $("#force-selector").empty();
  $("#pie-chart").empty();
  $("#line-chart").empty();
}

function refresh_dashboard_content() {
  // Render Map
  if ($("#station_dropdown").val() != "0") {
    // Determine coordinates of the tube station
    lat = parseFloat($("#station_dropdown").find('option:selected').attr("lat"));
    lon = parseFloat($("#station_dropdown").find('option:selected').attr("lon"));
    initMap(lat, lon);
    // Clear graphs
    clear_graphs();
    // Get Street Crime data and render graphs, referencing tube line colour for the line chart
    col = $(".dashboard-sidebar .sidebar-button.active").css("background-color");
    var street_crimes = fetchStreetCrimeData(lat, lon, col);
  }
}
