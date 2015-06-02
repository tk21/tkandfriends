console.log("INSIDE bars.js---------------------------------------");
console.log("parent document filterse and categories:");
console.log(parent.document.filters);
console.log(parent.document.categories);

(function() {

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



        var width = 960,
        height = 500;

        var color = d3.scale.category20();

        var force = d3.layout.force()
            .charge(-120)
            .linkDistance(30)
            .size([width, height]);

        var svg = d3.select("body").append("svg")
            .attr("width", width)
            .attr("height", height);

        d3.json("test.json", function(error, graph) {
          force
              .nodes(graph.nodes)
              .links(graph.links)
              .start();

          var link = svg.selectAll(".link")
              .data(graph.links)
            .enter().append("line")
              .attr("class", "link")
              .style("stroke-width", function(d) { return Math.sqrt(d.value); });

          var node = svg.selectAll(".node")
              .data(graph.nodes)
            .enter().append("circle")
              .attr("class", "node")
              .attr("r", 5)
              .style("fill", function(d) { return color(d.group); })
              .call(force.drag);

          node.append("title")
              .text(function(d) { return d.name; });

          force.on("tick", function() {
            link.attr("x1", function(d) { return d.source.x; })
                .attr("y1", function(d) { return d.source.y; })
                .attr("x2", function(d) { return d.target.x; })
                .attr("y2", function(d) { return d.target.y; });

            node.attr("cx", function(d) { return d.x; })
                .attr("cy", function(d) { return d.y; });
          });
        });  

      /**$.getJSON(data).done(function(data) {
        console.log("Success, getting data as JSON"); 

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