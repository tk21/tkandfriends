var DelphiDemo = DelphiDemo || (function() {
  var self = {};
  // AJAX request to server to retrieve delphi data.
  // self.getDelphiData = function() {
  //   $.getJSON("/delphidata", function(data) {
  //     console.log("THIS IS DATA INSIDE INDEX.JS----------------------------------------");
  //     console.log(data);

  //     var rows = $.map(data, function (item, i) {
  //       console.log(item);
  //       return "<tr><td>" + item.Area + "</td><td>" + item.Industry + "</td><td>" + item.Occupation + "</td></tr>";
  //     }).join("");

  //     $("#delphi-table").append(rows);
  //   });



  self.getDelphiData = function() {
    $.getJSON("/delphidata", function(data) {
      console.log(data);
      return data;
    });
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
