//Set global color
var textColor = "white";
var detectedZoom = null;

// set the dimensions and margins of the graph
var margin = { top: 5, right: 5, bottom: 10, left: 5 },
  width =
    document.querySelector("#my_dataviz").clientWidth -
    margin.left -
    margin.right,
  height =
    document.querySelector("#my_dataviz").clientHeight -
    margin.top -
    margin.bottom;

// Append the SVG object to the body of the page
var svg = d3
  .select("#my_dataviz")
  .append("svg")
  .attr("width", "100%")
  .attr("height", "100%")
  .attr(
    "viewBox",
    "0 0 " +
      (width + margin.left + margin.right) +
      " " +
      (height + margin.top + margin.bottom)
  )
  .attr("preserveAspectRatio", "xMinYMin meet")
  .append("g")
  .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

// Define a zoom function
var zoom = d3.zoom().scaleExtent([1, 10]).on("zoom", zoomed);

// Define a function to handle the zoom event
function zoomed() {
  svg.attr("transform", d3.event.transform);
  x.range([0, width].map((d) => d3.event.transform.applyX(d)));
  y.range([height, 0].map((d) => d3.event.transform.applyY(d)));
}

//Read the data
//NEW loading different file and formatting to match old file
d3.csv("bluedot_test1.csv", function (file) {
  //  console.log(data)
  var data = [];
  for (var d in file) {
    // console.log(d)
    var layer = file[d];

    // console.log(layer)
    for (var l in layer) {
      let bool = Number.isInteger(parseInt(l));
      bool = bool !== true;
      // console.log(bool);
      if (l != "Cartographic_Information" && bool) {
        console.log(l);

        var newEntry = {};
        newEntry["legend"] = layer["Cartographic_Information"];
        // if(newEntry['zoom_level'] != 0){
        //   // console.log(newEntry)
        // }

        var key = l;
        var value = layer[l];
        // console.log(value)
        //  console.log(layer,key,value)
        if (key != "Cartographic_Information") {
          newEntry["zoom_level"] = key;
          newEntry["value"] = value;
        }
        data.push(newEntry);
      }
    }
  }
  //  console.log(data)
  // Labels of row and columns -> unique identifier of the column called 'zoom_level' and 'legend'
  var myZoomlevel = d3
    .map(data, function (d) {
      return d.zoom_level;
    })
    .keys();
  var myLegend = d3
    .map(data, function (d) {
      return d.legend;
    })
    .keys();
  //console.log(myZoomlevel)

  // Build X scales and axis:
  var x = d3.scaleBand().range([0, width]).domain(myZoomlevel).padding(0.05);

  svg
    .append("g")
    // .style("font-size", 15)
    .style("font-size", function (d) {
      return Math.round(width / 80) + "px";
    })
    .attr("class", "axisWhite")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x).tickSize(0))
    .select(".domain")
    .remove();

  // Build Y scales and axis:
  var y = d3.scaleBand().range([height, 0]).domain(myLegend).padding(0.05);

  svg
    .append("g")
    // .style("font-size", 10)
    .style("font-size", function (d) {
      return Math.round(width / 80) + "px";
    })
    .attr("class", "axisWhite")
    .call(d3.axisLeft(y).tickSize(0))
    .select(".domain")
    .remove();

  // Build color scale
  // var myColor = d3.scaleSequential()
  //   .interpolator(d3.interpolateInferno)
  //   .domain([0,2])

  function myColor(value) {
    if (value == 1) {
      return "white";
    } else {
      return "black";
    }
  }

  // create a tooltip
  var tooltip = d3
    .select("#my_dataviz")
    .append("div")
    .style("opacity", 0)
    .attr("class", "tooltip")
    .style("background-color", "white")
    .style("border", "solid")
    .style("border-width", "2px")
    .style("border-radius", "5px")
    .style("padding", "5px");

  // Three function that change the tooltip when user hover / move / leave a cell

  var mouseover = function (d) {
    // tooltip
    //   .style("opacity", 1)
    d3.select(this)
      .style("stroke", "white")
      .style("stroke-width", 2)
      .style("opacity", 1);

    var id = d3.select(this).attr("id");
    console.log(id);
    d3.select(".primaryInfo_container").html(id).style("color", "white");

    //NEW adding a div with a image
    //first I convert the id into a file name without spaces - best practice
    var fileName = id.split(" ").join("_");
    console.log(fileName);
    //then I add a div with a img in it
    var img = d3
      .select(".primaryInfo_container")
      .append("div")
      .append("img")
      //then I add the source - the src is the path to your image
      //so here I have the image named based on the id of that square
      //the id and therefore filename is zoom level and feature
      // for example ZL17_Services
      //now when you rollover things you will see a broken link image
      .on("error", function () {
        d3.select(this).attr("src", "images/black.jpg"); // 加载一个黑色的图片
      })
      .attr("src", "images/" + fileName + ".jpg");

    // img.on("load", function () {
    //   if (this.naturalWidth === 0) {
    //     // 检查图片是否加载成功
    //     d3.select(this).attr("src", "images/black.jpg"); // 加载一个黑色的图片
    //   }
    // });
  };
  //commenting this line of code out to remove the hidden tooltip
  //for some reason it was affecting the layout and not reading a class or parent class assigned to the div

  //var mousemove = function(d) {
  //tooltip
  //.html("The exact value of<br>this cell is: " + d.value)
  //.style("left", (d3.mouse(this)[0]+70) + "px")
  //.style("top", (d3.mouse(this)[1]) + "px")
  // console.log(d3.mouse(this)[1])
  //}
  //var mouseleave = function(d) {
  //tooltip
  //.style("opacity", 0)
  //d3.select(this)
  //.style("stroke", "white")
  //.style("stroke-width",1)
  //.style("opacity", 0.16)
  //}

  // add the squares
  svg
    .selectAll()
    // .data(data, function(d) {return d.zoom_level+':'+d.legend;})
    .data(data)
    .enter()
    .append("rect")
    .attr("x", function (d) {
      //console.log(d);
      return x(d.zoom_level);
    })
    .attr("y", function (d) {
      return y(d.legend);
    })
    .attr("class", function (d) {
      return d.zoom_level + " matrixRect";
    })
    // .attr("rx", 4)
    //   .attr("ry", 4)
    .attr("width", x.bandwidth())
    .attr("height", y.bandwidth())
    .style("fill", function (d) {
      return myColor(d.value);
    })
    .style("stroke-width", 1)
    .style("stroke", "white")
    .style("opacity", 0.1)
    .attr("id", function (d) {
      return d.zoom_level + "_" + d.legend;
    })
    .on("mouseover", mouseover)
    .on("mousemove", mousemove)
    .on("mouseleave", mouseleave);
});
