$(document).ready(function () {
  $('#mappie').mapster({
    singleSelect: false,
    fill: true,
    altImage: "../img/ColoredRegionsAll.jpg",
    fillOpacity: 1,
  });

  $('#regionList li').click(function () {
    console.log('List Clicked');
    var region = $(this).attr('id').replace('List', '');
    region = '#' + region;
    //This is where the the background color is set
    //TODO make this toggle
    $(this).css("background-color", "skyblue");
    //Modular means of setting regions via list
    //THIS ALREADY TOGGLES
    $(region).mapster('set');
  });

});