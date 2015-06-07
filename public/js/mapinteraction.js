$(document).ready(function () {

//  $('#map').mapster('resize',auto,100%);
  $('#region_list_button').click(function(){
    $('#region_li').slideToggle();
  });
  
  $('#Education_Button, #Industry_Button, #Marital_Status_Button').click(function(){
    $('#region_list_area').show();
    
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
      if($(region).hasClass('active_region')){
        //why?!
        console.log('here');
        $(region).removeClass('active_region');
      }else{
        $(region).addClass('active_region');
      }
    }
  });
    
    var db_color = $(this).css('background-color');
    var button = $(this).attr('id');

    $('#Education_Button, #Industry_Button, #Marital_Status_Button').each(function(){
        $('#region_li li').removeClass('active_region');

        if( $(this).attr('id') == button) {
          $(this).attr('name', 'active');
        }
        else {
          $(this).attr('name', '');
        }
    });
    
    $('.body').css('background-color', db_color);
  });
  
  
  //list->map
  
  $('#region_li li').click(function () {
    console.log($(this));
    var region = $(this).attr('region_in_list').replace(' List', '');
    console.log(region);
    if($(this).hasClass('active_region')){
      $(this).removeClass('active_region');
    }else{
      $(this).addClass('active_region');
    }
    //THIS IS WHERE REGION ON MAP IS SET
    
    //for some reason, the line below wouldn't toggle- i had to 
    //manually set to true.
    //$('#map').mapster('set', true, region);
    
    //Using title as selector
    //also didn't work... fuck mapster
    //$('li[title="' + region + '"]').mapster('set');
    
    //doing this instead
    if(!$('#map').mapster('get', region) && $(this).hasClass('active_region')){
       $('#map').mapster('set', true, region);
     }else{
        $('#map').mapster('set', false, region); 
     }
  });

  //TOOLTIPS
  $('map area').tooltipster({
      content: $(this).attr('id')
  });

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










