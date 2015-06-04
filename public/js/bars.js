console.log("INSIDE bars.js---------------------------------------");
console.log("FILTERS | CATEGORY | REGION selected:");
console.log(parent.document.filters);
console.log(parent.document.category);
console.log(parent.document.region);

/** BARS.JS
 *  Route to display a 'multi-dimensional' bar chart, when all data for more than one region is selected.
 **/
(function() {
  $.ajax({
    url: "/delphidata",

    data: {f: parent.document.filters, c: parent.document.category, r: parent.document.region},

    success: function(data) {
      console.log("We were able to successfully access delphi data:");
      console.log(data);

      var all_columns= [];

      $.map(data, function(item) {
        var single_column = [];
        single_column.push(item[parent.document.category]);

        //do not include total counts as its own column
        if (item[parent.document.category].includes('Total') == false) {
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

/** KEEP THIS FOR DEMO D3 VISUALIZATION BUT WE DON'T WANT THIS!!!!!
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
        });   **/