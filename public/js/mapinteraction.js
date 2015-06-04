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
      var region = e.key + " List"
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
    var region = $(this).attr('id').replace(' List', '');
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

  $('map area').hover(function() {
    hovered = $(this).attr('id');
    console.log(hovered);
    $('.tooltip').tooltipster({
      content: $(this).attr('id')
    })
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

//For individual region's onHover() method, query for that single region, 
//populate hover_info div with results
$('map area').hover(function() {
  console.log("WE HOVERIN OUT HERE---------------------");
  parent.document.region = $(this).attr('id');

  //IF DATABASE SELECTED: query database to populate hover_info
  if (parent.document.category) {
    $.ajax({
      url: 'delphidata',

      data: {f: parent.document.filters, c: parent.document.category, r: parent.document.region},

      success: function(data) {
        console.log("PARENT REGION:");
        console.log(parent.document.region);
        $('#hover_info').html("<h3>" + parent.document.region + "</h3>");
        $.map(data, function(item) {
          //console.log("inside map this is your item:");
          //console.log(item);
        });
      }
    });
  }

  //IF DATABASE not yet selected: display tooltip with area name
  // Tipped.create("map area#" + parent.document.region, "excuse me? move",//parent.document.region,
  //   { behavior: 'mouse'});/
  //$('map area#' + parent.document.region).mapster('tooltip');

});











