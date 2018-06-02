$(document).ready(function() {
  $(".dashboard-sidebar .sidebar-button").click(function() {
    $(this).addClass("active");
    $(this).siblings().removeClass("active");
    $(".mob-menu .sidebar-button").removeClass("active");
    $(".mob-menu .sidebar-button[lineid='" + $(this).attr("lineid") + "']").addClass('active');
    $("#stops").html("");
    fetchTFLdata($(this).attr("lineid"));
  });

  $(".mob-menu .sidebar-button").click(function() {
    $(".mob-menu .sidebar-button").removeClass("active");
    $(this).addClass("active");
    $(".navbar-toggler").click();
    $(".dashboard-sidebar").children(".sidebar-button").removeClass("active");
    $(".dashboard-sidebar").children(".sidebar-button[lineid='" + $(this).attr("lineid") + "']").addClass('active');
    $("#stops").html("");
    fetchTFLdata($(this).attr("lineid"));
  });

  var num_lines = $(".dashboard-sidebar .sidebar-button").length;
  var div_width = (1/num_lines) * 100;

  for (i = 0; i < num_lines; i++) {
    $("footer").prepend(`<div class="footer-tops f` + i + `" style="width:` + div_width + `%"></div>`);
  }

  var min_main_height = $(window).height() - $("header").outerHeight() - $("footer").outerHeight();
  $("main").css("min-height",min_main_height+"px");
  alert(min_main_height);

  fetchTFLdata("bakerloo");
});

function render_gmap() {
  if ($("#station_dropdown").val() != "0") {
    lat = parseFloat($("#station_dropdown").find('option:selected').attr("lat"));
    lon = parseFloat($("#station_dropdown").find('option:selected').attr("lon"));
    initMap(lat, lon);
  }
}

function get_crime_data() {
  if ($("#station_dropdown").val() != "0") {
    lat = parseFloat($("#station_dropdown").find('option:selected').attr("lat"));
    lon = parseFloat($("#station_dropdown").find('option:selected').attr("lon"));
    FetchStreetCrimeData(lat, lon);
  }
}
