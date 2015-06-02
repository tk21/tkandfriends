var DelphiDemo = DelphiDemo || (function() {
  var self = {};
  // AJAX request to server to retrieve delphi data.
  // self.getDelphiData = function() {
  //   $.getJSON("/delphidata", function(data) {

  //     var rows = $.map(data, function (item, i) {
  //       console.log(item);
  //       return "<tr><td>" + item.Area + "</td><td>" + item.Industry + "</td><td>" + item.Occupation + "</td></tr>";
  //     }).join("");

  //     $("#delphi-table").append(rows);
  //   });


  // Takes query string and passes it into the database to be processed
  self.getDelphiData = function() {
    console.log("INDEXJS: getting delphi data------------------");

    var filters = "";
    var cats = "";

    var checked_education = false;
    var checked_industry = false;
    var checked_mar_status = false;

    //pull from EDUCATION database if checked 
    $('input[name="education"]').each(function() {
      if ($(this).is(":checked")) {
        checked_education = true;
      }
    });
    if (checked_education) {
      cats += "Education" + " ";
    }

    //pull from INDUSTRY database if checked 
    $('input[name="industry"]').each(function() {
      if ($(this).is(":checked")) {
        checked_industry = true;
      }
    });
    if (checked_industry) {
      cats += "Industry" + " ";
    }

    //pull from MARITAL STATUS database if checked 
    $('input[name="marital_status"]').each(function() {
      if ($(this).is(":checked")) {
        checked_mar_status = true;
      }
    });
    if (checked_mar_status) {
      cats += "Mar_status" + " ";
    }

    //concatenate user-selected filters
    console.log("these are the values you checked off:");
    $("input[type=checkbox]:checked").map(function() {
      console.log(this.value);
      filters += this.value + " ";
    });

    document.categories = cats;
    document.filters = filters;

    //send AJAX GET request to get delphi data with chosen filters
    $.ajax({
      url: "/bars",
      data: {f: filters, c: cats}
    });

    /**$.getJSON("/delphidata", function(data) {
      console.log("DATA INSIDE:");
      console.log(data);

    //   // get data and process by row
    //   var rows = $.map(data, function(item, i) {
    //     console.log(item);
    //   });

    //   return data;
    }); **/
  };

  // initialize
  self.init = function() {
    self.getDelphiData();
  };
  return self;
})();


$(document).ready(function() {
  DelphiDemo.init();
});
