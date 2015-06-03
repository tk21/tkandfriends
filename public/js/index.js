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

    //DATABASE----------------------------------------------------------------
    //pull from EDUCATION database if checked 
    $('input[name="education"]').each(function() {
      if ($(this).is(":checked")) {
        document.category = "Education";
      }
    });

    //pull from INDUSTRY database if checked 
    $('input[name="industry"]').each(function() {
       if ($(this).is(":checked")) {
        document.category = "Industry";
      }
    });

    //pull from MARITAL STATUS database if checked 
    $('input[name="marital_status"]').each(function() {
      if ($(this).is(":checked")) {
        document.category = "Marital_Status";
      }
    });

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


// $(document).ready(function() {
//   console.log("");
// });
