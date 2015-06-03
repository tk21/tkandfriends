$(document).ready(function () {
  $('#map').mapster({
    singleSelect: false,
    fill: true,
    altImage: "../img/ColoredRegionsAll.jpg",
    fillOpacity: 1,
    mapKey : 'id',
    onClick: function (e) {
      var region = e.key + "List"
      console.log(region)
      var listColor = $('#' + region).css("background-color");
      console.log(listColor);
      if($('#' + region).hasClass('active')){
        console.log('here');
        $('#' + region).removeClass('active');
      }else{
        $('#' + region).addClass('active');
      }
    }
  });
  
  $('#regionList li').click(function () {
    //console.log('List Clicked');
    var region = $(this).attr('id').replace('List', '');
    region = '#' + region;
    //This is where the the background color is set
    if($(this).hasClass('active')){
      $(this).removeClass('active');
    }else{
      $(this).addClass('active');
    }
    //Modular means of setting regions via list
    //THIS ALREADY TOGGLES
    $(region).mapster('set');
  });
  
  

});