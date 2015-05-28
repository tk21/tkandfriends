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

  self.buildQuery = function() {
    console.log("INDEXJS: building query with strings----------------");

    var query = "SELECT * ";

    var occupat_indust = " FROM hhsa_san_diego_demographics_occupat_industry_2012_norm";
    var education = " FROM hhsa_san_diego_demographics_education_2012_norm";
    var mar_status = " FROM hhsa_san_diego_demographics_marital_status_2012_norm";

    var filters = "";

    // concatenate string that has all the filters user selected
    console.log("these are the values you checked off:");
    $("input[type=checkbox]:checked").map(function() {
      console.log(this.value);
      filters += this.value;
    });

    console.log("this is now filters:");
    console.log(filters);


    if (filters != "") {
      query += "WHERE Industry=" + filters;
    }


    console.log("this is now query:");
    console.log(query);

    return "query finished building";
  };

  self.getDelphiData = function() {
    console.log("INDEXJS: getting delphi data------------------");

    $.getJSON("/delphidata", function(data) {
      console.log("DATA INSIDE:");
      console.log(data);

    //   // get data and process by row
    //   var rows = $.map(data, function(item, i) {
    //     console.log(item);
    //   });

    //   return data;
    });
  };

  // initialize
  self.init = function() {
    var query;
    query = self.buildQuery();

    self.getDelphiData();
  };
  return self;
})();


$(document).ready(function() {
  console.log("INDEXJS: document is ready");
  DelphiDemo.init();
});
