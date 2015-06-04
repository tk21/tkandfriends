var DelphiData = DelphiData || (function() {
  var self = {};
  // AJAX request to server to retrieve delphi data.
   /*self.getDelphiData = function() {
     $.getJSON("/delphidata", function(data) {

       var rows = $.map(data, function (item, i) {
         console.log(item);
         return "<tr><td>" + item.Area + "</td><td>" + item.Industry + "</td><td>" + item.Occupation + "</td></tr>";
       }).join("");
     });*/


  // Takes query string and passes it into the database to be processed
  self.getDelphiData = function() {
    console.log("INDEXJS: ------trying to retrieve delphi data------------------");
    console.log("this is the (filter | category | region) we are sending to query");
    console.log(filters);
    console.log(category);
    console.log(regs);
    //send AJAX GET request to get delphi data with chosen filters
    $.ajax({
      url: "/delphidata",
      data: {f: filters, c: category, r: regs},

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

//button listener for MAP REGION selection
$('map area').click(function() {
  var region = $(this).attr('id');

  //only add region if not already listed, avoid duplicates
  if (regs.indexOf(region) === -1) {
    console.log("we are pushing to global array");
    regs.push(region);

  }

  //remove region from query on deselect
  else {
    regs.splice(regs.indexOf(region), 1);
  }
  console.log(regs);
});

//button listener for DB selection
$("#side_nav .col-sm-12").click(function() {
  console.log("CLICKED A DB BUTTON ");

  //set global variables to be set which database to be queried
  if ($(this).attr('id') == "Marital_Status_Button") {
    parent.document.category = "Marital Status";
  }
  else {
    parent.document.category = $(this).attr('id').replace('_Button', '');
  }
  console.log(parent.document.category);

}); 


