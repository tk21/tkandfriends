function make_pie() {
  console.log("INSIDE pie.js---------------------------------------");
  console.log("FILTERS | CATEGORY | REGION selected:");
  console.log(parent.document.filters);
  console.log(parent.document.category);
  console.log(parent.document.region);

  /** PIE.JS
   *  Route to display a pie chart, when all data for only one region is selected.
   **/
  (function () {
    $.ajax({
      url: "/delphidata",

      data: {
        f: parent.document.filters,
        c: parent.document.category,
        r: parent.document.region
      },

      success: function (data) {
        console.log("We were able to successfully access delphi data:");
        console.log(data);

        var all_columns = [];

        $.map(data, function (item) {
          var column = [];
          column.push(item[parent.document.category]);

          //do not include total counts as its own column
          if (item[parent.document.category].includes('Total') == false) {
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

      error: function () {
        console.log("nope this sucks bye error ERROR!!!");
      }
    });
  })();
}