console.log("INSIDE bars.js---------------------------------------");
console.log("parent document filterse and categories:");
console.log(parent.document.filters);
console.log(parent.document.categories);

(function() {
  var chart = c3.generate({
            bindto: '#chart',
            data: {
              columns: [
                ['data1', 30, 200, 100, 400, 150, 250],
                ['data2', 130, 100, 140, 200, 150, 50]
              ],
              type: 'bar'
            },
            axis: {
              x: {
              type: 'category',
              }
            },
            bar: {
              width: {
                ratio: 0.5
              }
            }
          });
  /**$.getJSON('/delphidata')
    .done(function(data) {
      console.log("trying to load chart");
      if (data.length<=0) {
        console.log("Sorry, unable to pull data.");
      }
      console.log("inside bars.js");
      var chart = c3.generate({
        bindto: '#chart',
        data: {
          columns: [
            ['data1', 30, 200, 100, 400, 150, 250],
            ['data2', 130, 100, 140, 200, 150, 50]
          ],
          type: 'bar'
        }
      });
    }); **/


  $.ajax({
    url: "/delphidata",

    data: {f: 'Utilities', c: 'Industry'},
    //{filters: parent.document.filters, 
            //categories: parent.document.categories},

    success: function(data) {
      console.log("We were able to successfully access delphi data:");
      console.log(data);
      // $.getJSON(data).done(function(data) {
        // console.log("Success, getting data as JSON"); 

          /**var chart = c3.generate({
            bindto: '#chart',
            data: {
              columns: [
                ['data1', 30, 200, 100, 400, 150, 250],
                ['data2', 130, 100, 140, 200, 150, 50]
              ],
              type: 'bar'
            },
            axis: {
              x: {
              type: 'category',
              }
            },
            bar: {
              width: {
                ratio: 0.5
              }
            }
          });
      // }); **/
    },

    error: function() {
        console.log("nope this sucks bye error ERROR!!!");
    }
  });
})();