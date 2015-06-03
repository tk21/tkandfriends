var DelphiData = DelphiData || (function() {
  var self = {};
  // AJAX request to server to retrieve delphi data.
   /*self.getDelphiData = function() {
     $.getJSON("/delphidata", function(data) {

       var rows = $.map(data, function (item, i) {
         console.log(item);
         return "<tr><td>" + item.Area + "</td><td>" + item.Industry + "</td><td>" + item.Occupation + "</td></tr>";
       }).join("");

       $("#delphi-table").append(rows);
     });*/


  // Takes query string and passes it into the database to be processed
  self.getDelphiData = function() {
    console.log("INDEXJS: ------getting all of delphi data------------------");

    var filters = "";
    var cats = "";

    //FILTERS-----------------------------------------------------------------
    console.log("these are the values you checked off:");
    $("input[type=checkbox]:checked").map(function() {
      console.log(this.value);
      filters += this.value + " ";
    });

    // remove the last space character for query
    document.filters = filters.substring(0, filters.length - 1);

    //send AJAX GET request to get delphi data with chosen filters
    $.ajax({
      url: "/delphidata",
      data: {f: document.filters, c: document.category},

      // THIS IS JUST FOR TESTING, SHOULD PRINT TO WEB CONSOLE
      success: function(data) {
        console.log("Successfully sent the query! Here is your data:");
        console.log(data);
      }
    });

    /*$.getJSON("/delphidata", function(data) {
       // get data and process by row
       var rows = $.map(data, function(item, i) {
         console.log(item);
       });

       return data;
    });*/
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
  if ($(this).attr('id') == "Marital_Status_Button") {
    parent.document.category = "Marital Status";
  }
  else {
    parent.document.category = $(this).attr('id').replace('_Button', '');
  }
  console.log(parent.document.category);

}); 


