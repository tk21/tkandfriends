$(document).ready(function () {
  
//  $('#map').mapster('resize',auto,100%);
  $('#region_list_button').click(function(){
    $('#region_li').slideToggle();
  });
  
  $('#Education_Button, #Industry_Button, #Marital_Status_Button').click(function(){
    
    var db_color = $(this).css('background-color');
    
    $('.body').css('background-color', db_color);
    
    db_color = rgb2hex(db_color);
  
    $('#region_list_area').show();
    
    $('#map').mapster({
    singleSelect: false,
    fill: true,
    //altImage: "../img/ColoredRegionsAll.jpg",
    fillColor: db_color,
    fillOpacity: .8,
    mapKey : 'id',
    scaleMap:true,
    wrapClass:'pull-right',
    onClick: function (e) {
      var region = 'li[region_in_list="' + e.key + ' List"]';
      if($(region).hasClass('active_region')){
        //why?!
        console.log('here');
        $(region).removeClass('active_region');
      }else{
        $(region).addClass('active_region');
      }
    }
  });
    
    

    $('#Education_Button, #Industry_Button, #Marital_Status_Button').each(function(){
      
      var button = $(this).attr('id');
      
      $('#region_li li').removeClass('active_region');

        if( $(this).attr('id') == button) {
          $(this).attr('name', 'active');
        }
        else {
          $(this).attr('name', '');
        }
    });
  });
  
  
  //list->map
  
  $('#region_li li').click(function () {
    var area_toggle;
    
    var region = $(this).attr('region_in_list').replace(' List', '');

    if($(this).hasClass('active_region')){
      $(this).removeClass('active_region');
      area_toggle = "false";
    }else{
      $(this).addClass('active_region');
      area_toggle = "true"
    }
  
    $('#map').mapster('set', area_toggle, region);
  });

  //TOOLTIPS
  $('map area').tooltipster({
      content: $(this).attr('id')
  });
  
  //Converts RGB to Hex Values
  function rgb2hex(rgb) {
    rgb = rgb.match(/^rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*(\d+))?\)$/);
    function hex(x) {
        return ("0" + parseInt(x).toString(16)).slice(-2);
    }
    return hex(rgb[1]) + hex(rgb[2]) + hex(rgb[3]);
  }

  //MAP REGION CLICK: adds region to global regions array for querying
  $('map area').click(function() {
    var region = $(this).attr('id');

    //only add region if not already listed, avoid duplicates
    if (window.regions.indexOf(region) === -1) {
      window.regions.push(region);
    }
    //remove region from query on deselect
    else {
      window.regions.splice(window.regions.indexOf(region), 1);
    } 
  });
});










