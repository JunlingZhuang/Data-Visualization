  //Set global color
  var textColor = "white";
var detectedZoom = null
  
  
  // set the dimensions and margins of the graph
  var margin = {top: 20, right: 10, bottom: 30, left:40},
    width = 280 - margin.left - margin.right,
    height = 600 - margin.top - margin.bottom;
  
  // append the svg object to the body of the page
  var svg = d3.select("#my_dataviz")
  .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")");
  
  //Read the data
		  //NEW loading different file and formatting to match old file
		  d3.csv("bluedot.csv", function(file) {
			//  console.log(data)
			  var data = []
			  for(var d in file){
			  	// console.log(d)
				  var layer = file[d]
			
				  // console.log(layer)
				  for(var l in layer){
            let bool = Number.isInteger(parseInt(l));
            bool = bool !== true; 
            // console.log(bool);
            if(l != 'Cartographic_Information' && bool ) {
              
             console.log(l)
         
					  var newEntry = {}
					  newEntry['legend']=layer['Cartographic_Information']
            // if(newEntry['zoom_level'] != 0){
            //   // console.log(newEntry)
            // }
					  
				  		var key = l
					  var value = layer[l]
            // console.log(value)
					//  console.log(layer,key,value)
					  if(key!='Cartographic_Information'){
						   newEntry['zoom_level']=key
						  newEntry['value']=value
					  }
					  data.push(newEntry)
          }
				  }
			  }
			//  console.log(data)
    // Labels of row and columns -> unique identifier of the column called 'zoom_level' and 'legend'
    var myZoomlevel = d3.map(data, function(d){return d.zoom_level;}).keys()
    var myLegend = d3.map(data, function(d){return d.legend;}).keys()
    //console.log(myZoomlevel)
    
  
    // Build X scales and axis:
    var x = d3.scaleBand()
      .range([ 0, width ])
      .domain(myZoomlevel)
      .padding(0.05);
      
    svg.append("g")
      // .style("font-size", 15)
      .style("font-size", function(d) {
        return Math.round(width/80) + "px";
       })
       .attr("class", "axisWhite")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x).tickSize(0))
      .select(".domain").remove()
  
    // Build Y scales and axis:
    var y = d3.scaleBand()
      .range([ height, 0 ])
      .domain(myLegend)
      .padding(0.05);
	  
    svg.append("g")
      // .style("font-size", 10)
      .style("font-size", function(d) {
        return Math.round(width/80) + "px";
       })
      .attr("class", "axisWhite")
      .call(d3.axisLeft(y).tickSize(0))
      .select(".domain").remove()
  
    // Build color scale
    var myColor = d3.scaleSequential()
      .interpolator(d3.interpolateInferno)
      .domain([0,2])
   

      
      
  
    // create a tooltip
    // var tooltip = d3.select("#my_dataviz")
    //   .append("div")
    //   .style("opacity", 0)
    //   .attr("class", "tooltip")
    //   .style("background-color", "white")
    //   .style("border", "solid")
    //   .style("border-width", "2px")
    //   .style("border-radius", "5px")
    //   .style("padding", "5px")
  
    // Three function that change the tooltip when user hover / move / leave a cell
	  
	
    var mouseover = function(d) {
      tooltip
        .style("opacity", 1)
      d3.select(this)
        .style("stroke", "white")
        .style("stroke-width",2)
        .style("opacity", 1)
		
	  //NEW
	//get the id attached to rect and set it as html text of div with class primaryInfo_container
		var id = d3.select(this).attr("id")
		console.log(id)
		d3.select(".primaryInfo_container").html(id).style("color","gold")

    }
    var mousemove = function(d) {
      // tooltip
      //   .html("The exact value of<br>this cell is: " + d.value)
      //   .style("left", (d3.mouse(this)[0]+70) + "px")
      //   .style("top", (d3.mouse(this)[1]) + "px")
      //   // console.log(d3.mouse(this)[1])

    }
    var mouseleave = function(d) {
      tooltip
        .style("opacity", 0)
      d3.select(this)
        .style("stroke", "white")
        .style("stroke-width",1)
        .style("opacity", 0.16)
    }
  
    // add the squares
    svg.selectAll()
      // .data(data, function(d) {return d.zoom_level+':'+d.legend;})
      .data(data)
      .enter()
      .append("rect")
        .attr("x", function(d) { 
			//console.log(d);
			return x(d.zoom_level) })
        .attr("y", function(d) { return y(d.legend) })
			.attr("class",function(d){
				return d.zoom_level+" matrixRect"
			})
        // .attr("rx", 4)
      //   .attr("ry", 4)
        .attr("width", x.bandwidth() )
        .attr("height", y.bandwidth() )
        .style("fill", function(d) { return myColor(d.value)} )
        .style("stroke-width", 1)
        .style("stroke", "white")
        .style("opacity", 0.1)
		.attr("id",function(d){return d.zoom_level+"_"+d.legend})
      .on("mouseover", mouseover)
      .on("mousemove", mousemove)
      .on("mouseleave", mouseleave)
    
  })
  
  // Add title to graph
  // svg.append("text")
  //         .attr("x", 0)
  //         .attr("y", -50)
  //         .style("fill", textColor)
  //         .attr("text-anchor", "left")
  //         .style("font-size", "22px")
  //         .text("Exposing Zoom Levels and their Layers");
  
  // // Add subtitle to graph
  // svg.append("text")
  //         .attr("x", 0)
  //         .attr("y", -20)
  //         .attr("text-anchor", "left")
  //         .style("font-size", "14px")
  //         .style("fill", textColor)
  //         .style("max-width", 400)
  //         .text("Testing 2 zoom levels out of 19 levels as an example");
  
  // var zoom = 1;
  // // //On click, update with new data			
  // d3.select(zoomin)
  // .on("click", function() {
  //   zoom = zoom + 1;
  //   console.log(zoom)
  //   // //Add one new value to dataset
    // var maxValue = 25;
    // var newNumber = Math.floor(Math.random() * maxValue);	//New random integer (0-24)
    // dataset.push(newNumber);			 			 		//Add new number to array
    
  //   // //Update scale domains
  //   // xScale.domain(d3.range(dataset.length));	//Recalibrate the x scale domain, given the new length of dataset
  //   // yScale.domain([0, d3.max(dataset)]);		//Recalibrate the y scale domain, given the new max value in dataset

  //   // //Select…
  //   // var bars = svg.selectAll("rect")			//Select all bars
  //   //   .data(dataset);							//Re-bind data to existing bars, return the 'update' selection
  //   //                       //'bars' is now the update selection
    
  //   // //Enter…
  //   // bars.enter()								//References the enter selection (a subset of the update selection)
  //   //   .append("rect")							//Creates a new rect
  //   //   .attr("x", w)							//Sets the initial x position of the rect beyond the far right edge of the SVG
  //   //   .attr("y", function(d) {				//Sets the y value, based on the updated yScale
  //   //     return h - yScale(d);
  //   //   })
  //   //   .attr("width", xScale.bandwidth())		//Sets the width value, based on the updated xScale
  //   //   .attr("height", function(d) {			//Sets the height value, based on the updated yScale
  //   //     return yScale(d);
  //   //   })
  //   //   .attr("fill", function(d) {				//Sets the fill value
  //   //     return "rgb(0, 0, " + Math.round(d * 10) + ")";
  //   //   })
  //   //   .merge(bars)							//Merges the enter selection with the update selection
  //   //   .transition()							//Initiate a transition on all elements in the update selection (all rects)
  //   //   .duration(500)
  //   //   .attr("x", function(d, i) {				//Set new x position, based on the updated xScale
  //   //     return xScale(i);
  //   //   })
  //   //   .attr("y", function(d) {				//Set new y position, based on the updated yScale
  //   //     return h - yScale(d);
  //   //   })
  //   //   .attr("width", xScale.bandwidth())		//Set new width value, based on the updated xScale
  //   //   .attr("height", function(d) {			//Set new height value, based on the updated yScale
  //   //     return yScale(d);
  //   //   });
    
  //   // var texts = svg.selectAll("text")
  //   //   .data(dataset);
  //   // texts.enter()
  //   //   .append("text")
  //   //   .text(function(d) {
  //   //     return d;
  //   //   })
  //   //   .attr("x", w)
  //   //   .attr("y", function(d) {
  //   //     return h - yScale(d) + 14;
  //   //   })
  //   //   .merge(texts)
  //   //   .transition()
  //   //   .duration(500)
  //   //   .attr("x", function(d, i) {
  //   //     return xScale(i) + xScale.bandwidth() / 2;
  //   //   })
  //   //   .attr("text-anchor", "middle")
  //   //   .attr("font-family", "sans-serif")
  //   //   .attr("font-size", "11px")
  //   //   .attr("fill", "white");
  //   //   //TODO: add code here to update the labels
  //   //   //HINT: everything you need for updating the labels is in the updating bars code above.
