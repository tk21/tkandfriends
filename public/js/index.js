var DelphiData = DelphiData || (function() {
  var self = {};

  // Takes query string and passes it into the database to be processed
  self.getDelphiData = function() {
    console.log("INDEXJS: ------trying to retrieve delphi data------------------");
    console.log("this is the (filter | category | region) we are sending to query");
    console.log(window.filters);
    console.log(window.category);
    console.log(window.regions);
    //send AJAX GET request to get delphi data with chosen filters
    $.ajax({
      url: "/delphidata",
      data: {f: window.filters, c: window.category, r: window.regions},

      // THIS IS JUST FOR TESTING, SHOULD PRINT TO WEB CONSOLE
      success: function(data) {
        console.log("Successfully sent the query! Here is your data:");
        console.log(data);
      }
    });
  };

  // initialize
  self.init = function() {
    self.getDelphiData();
  };
  return self;
})();

//button listener for DB selection
$("#side_nav .col-sm-12").click(function() {
  console.log("CLICKED A DB BUTTON ");

  //set global variables to be set which database to be queried
  if ($(this).attr('id') == "Marital_Status_Button") {
    window.category = "Marital Status";
  }
  else {
    window.category = $(this).attr('id').replace('_Button', '');
  }
  console.log(window.category);

}); 


