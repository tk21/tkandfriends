/** BARS.JS
 *  Route to display a 'multi-dimensional' bar chart, when all data for more than one region is selected.
 **/
(function() {
  $.ajax({
    url: "/delphidata",

    data: {f: parent.filters, 
           c: parent.category, 
           r: parent.regions},

    success: function(data) {
      console.log("barsjs: inside success CATEGORY|REGIONS-----------------------");
      // console.log(data);

      var all_columns_obj = {};
      var all_columns_array = [];
      var column_labels = ['label_regions'];
      var all_filters = [];
      var d = "";

      //Which field need to pull data from depending on category chosen
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

      //Create OBJECT with Industry: data[] as key:value pairs
      //AN OBJECT IS EASIER TO APPEND TO, THAT IS WHY.
      $.map(data, function(item) {

        //Create new entry for INDUSTRY if doesn't already exist
        if ((item[parent.category].indexOf("Total")) == -1) {
          if (!all_columns_obj[item[parent.category]]) {
            all_columns_obj[item[parent.category]] = [];
            all_columns_obj[item[parent.category]].push(item[parent.category]);
            all_columns_obj[item[parent.category]].push(item[d]);

            all_filters.push(item[parent.category]);
          }

          //Otherwise, just push data to existing INDUSTRY
          else {
            all_columns_obj[item[parent.category]].push(item[d]);
          }

          //Create labels for x-axis
          if ( ($.inArray(item['Area'],column_labels)) == -1) {
            console.log("!!!!!!!!!!!!!;LJFDAL;SDJFL;ASDFHKLAHSDFKJASDLKFJASDFASDF");
            column_labels.push(item['Area']);
            console.log(column_labels);
          }
        }
      });
      
      //Translate OBJECT->Array to generate chart
      all_columns_array.push(column_labels);
      $.map(all_columns_obj, function(value, index) {
        all_columns_array.push(value);
      });

      console.log("ALL COLUMNS, after appending with filters");
      console.log(all_columns_array);
      var chart = c3.generate({
        bindto: '#chart',

        data: {
          x: 'label_regions',
          columns: all_columns_array,
          type: 'bar'
        },

        axis: {
          x: { type: 'category' }
        }
      });

      //this will show the regropuing animation
      setTimeout(function () {
        chart.groups([all_filters])
      }, 2000);
    },

    error: function() {
        console.log("nope this sucks bye error ERROR!!!");
    }
  });
})();