$(document).ready(function () {
  
//  $('#map').mapster('resize',auto,100%);
  
  $('#map').mapster({
    singleSelect: false,
    fill: true,
    altImage: "../img/ColoredRegionsAll.jpg",
    fillOpacity: 1,
    mapKey : 'id',
    scaleMap:true,
    wrapClass:'pull-right',
    onClick: function (e) {
      var region = e.key + "List"
      console.log(region)
      var listColor = $('#' + region).css("background-color");
      console.log(listColor);
      if($('#' + region).hasClass('active_region')){
        console.log('here');
        $('#' + region).removeClass('active_region');
      }else{
        $('#' + region).addClass('active_region');
      }
    }
  });
  
  $('#region_list_button').click(function(){
    $('#region_li').slideToggle();
  });
  
  $('#regionList li').click(function () {
    //console.log('List Clicked');
    var region = $(this).attr('id').replace('List', '');
    region = '#' + region;
    //This is where the the background color is set
    if($(this).hasClass('active_region')){
      $(this).removeClass('active_region');
    }else{
      $(this).addClass('active_region');
    }
    //Modular means of setting regions via list
    //THIS ALREADY TOGGLES
    $(region).mapster('set');
  });
  
//  NEED TO FIGURE OUT HOW TO MAKE MAP HIGHLIGHT ON LIST HOVER  
//  $('#regionList li').mouseenter(function () {
//    var region = $(this).attr('id').replace('List', '');
//    region = '#' + region;
//    $(region).mapster('highlight');
//    $('this').mouseleave(function () {
//      $(region).mapster('highlight',false);
//    });
//  });
});