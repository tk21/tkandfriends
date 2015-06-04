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

      var all_columns= [];

      $.map(data, function(item) {
        var column = [];
        column.push(item[parent.category]);

        //do not include total counts as its own column
        if (item[parent.category].includes('Total') == false) {
          column.push(item['Occupation']);
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