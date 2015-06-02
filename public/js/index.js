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

  // Reads in user input on forms to build the query string to be sent to database
  self.buildQuery = function() {
    console.log("INDEXJS: building query with strings----------------");

    var q = "SELECT * ";

    var occupat_indust = "FROM hhsa_san_diego_demographics_occupat_industry_2012_norm";
    var education = "FROM hhsa_san_diego_demographics_education_2012_norm";
    var mar_status = "FROM hhsa_san_diego_demographics_marital_status_2012_norm";


    //testing
    q += occupat_indust;


    var filters = "";
    var category = "Industry";

    // concatenate string that has all the filters user selected
    console.log("these are the values you checked off:");
    $("input[type=checkbox]:checked").map(function() {
      console.log(this.value);
      filters += this.value;
    });

    console.log("this is now filters:");
    console.log(filters);


    if (filters != "") {
      q += "WHERE \"" + category + "\"=\'" + filters + "\'";
    }

    console.log("this is now query:");
    console.log(q);

    return "query finished building";
  };

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

    //send AJAX GET request to get delphi data with chosen filters
    $.ajax({
      url: "/bars",
      data: {f: filters, categories: cats}
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
  console.log("INDEXJS: document is ready");
  DelphiDemo.init();
});
