/** PIE.JS
 *  Route to display a pie chart, when all data for only one region is selected.
 **/

//TESTING OMMMMMMGGG
console.log("PIEJS:--------------------------------------");
console.log("FILTERS | CATEGORY | REGIONS");
console.log(parent.filters);
console.log(parent.category);
console.log(parent.regions);

(function() {
  $.ajax({
    url: "/delphidata",

    data: {f: parent.filters, 
           c: parent.category, 
           r: parent.regions},

    success: function(data) {
      console.log("PIEJS:success getting data");
      var all_columns= [];

      //Which field need to pull data from depending on category chosen
      var d = "";
      switch (parent.category){
        case "Education":
          d = "Population";
          break;
        case "Industry":
          d = "Occupation";
          break;
        case "Marital Status":
          d = "Total";
      }

      $.map(data, function(item) {
        var column = [];
        column.push(item[parent.category]);

        //do not include total counts as its own column
        if (item[parent.category].includes('Total') == false ) {
           // && item[parent.category].includes('Any') == false) {
          column.push(item[d]);
        }
        all_columns.push(column);
      });

      //each "filter" will need its own column
      var chart = c3.generate({
        bindto: '#chart',
        data: {
          columns: all_columns,
          type: 'pie'
        },
      }); 
    },

    error: function() {
        console.log("nope this sucks bye error ERROR!!!");
    }
  });
})();