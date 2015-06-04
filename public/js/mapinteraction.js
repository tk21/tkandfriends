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
      var region = 'li[region_in_list="' + e.key + ' List"]';
//      console.log($(region));
      //What are these for?? Also, they don't work because .css will return rgb, not hex.
//      var region_on_list = $('#' + region).css("background-color");
//      console.log(listColor);
      if($(region).hasClass('active_region')){
        //why?!
        console.log('here');
        $(region).removeClass('active_region');
      }else{
        $(region).addClass('active_region');
      }
    }
  });
  
  $('#region_list_button').click(function(){
    $('#region_li').slideToggle();
  });
  
  $('#Education_Button, #Industry_Button, #Marital_Status_Button').click(function(){
    var db_color = $(this).css('background-color');
    console.log(db_color);
    $('.body').css('background-color', db_color);
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

  //TOOLTIPS
  $('map area').tooltipster({
      content: $(this).attr('id')
  });

  //MAP REGION CLICK: adds region to global regions array for querying
  $('map area').click(function() {
    console.log("MAPINTERACTIONS--------------------------------------");
    var region = $(this).attr('id');

    //only add region if not already listed, avoid duplicates
    if (window.regions.indexOf(region) === -1) {
      console.log("we are pushing to global array");
      window.regions.push(region);
    }
    //remove region from query on deselect
    else {
      console.log("we are removing from global array");
      window.regions.splice(window.regions.indexOf(region), 1);
    } 
    console.log("WINDOW.REGIONS in mapinteractions:");
    console.log(window.regions);

  });
});










