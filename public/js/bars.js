console.log("INSIDE bars.js---------------------------------------");
console.log("CATEGORY | REGION selected:");
console.log(window.category);
console.log(window.regions);

/** BARS.JS
 *  Route to display a 'multi-dimensional' bar chart, when all data for more than one region is selected.
 **/
(function() {
  $.ajax({
    url: "/delphidata",

    data: {f: window.filters, 
           c: window.category, 
           r: window.regs},

    success: function(data) {
      console.log("We were able to successfully access delphi data:");
      console.log(data);

      var all_columns= [];

      $.map(data, function(item) {
        var single_column = [];
        single_column.push(item[window.category]);

        //do not include total counts as its own column
        if (item[window.category].includes('Total') == false) {
          single_column.push(item['Occupation']);
        }
        all_columns.push(single_column);
      });

      //each "filter" will need its own column
      var chart = c3.generate({
        bindto: '#chart',
        data: {
          columns: all_columns,
          type: 'bar'
        },
        bar: {
          width: 100
        },
        axis: {
          x: {
            label: {
                text: 'is this working',
                type: 'category',   
            }
          }
        }
      });
    },
    error: function() {
        console.log("nope this sucks bye error ERROR!!!");
    }
  });
})();