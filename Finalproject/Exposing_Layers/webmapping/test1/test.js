
			//Width and height
			
			var padding = 30;
			// set the dimensions and margins of the graph
             var margin = {top: 80, right: 25, bottom: 30, left: 100},
            width = 400 - margin.left - margin.right,
            height = 800 - margin.top - margin.bottom;
			//Dynamic, random dataset

			var dataset = [];											//Initialize empty array
			var numDataPoints = 50;										//Number of dummy data points to create
			var maxRange = Math.random() * 1000;						//Max range of new values
			for (var i = 0; i < numDataPoints; i++) {					//Loop numDataPoints times
				var newNumber1 = Math.floor(Math.random() * maxRange);	//New random integer
				var newNumber2 = Math.floor(Math.random() * maxRange);	//New random integer
				dataset.push([newNumber1, newNumber2]);					//Add new number to array
			}
            d3.csv("test.csv", function(data) {
                 console.log(data);
                // Labels of row and columns -> unique identifier of the column called 'zoom_level' and 'legend'
                // var myZoomlevel = d3.map(data, function(d){return d.Cartographic_Information;}).keys()
                // var myLegend = d3.map(data, function(d){return d.legend;}).keys()
              
            });
			//Create scale functions
			// var xScale = d3.scaleLinear()
			// 					 .domain([0, d3.max(dataset, function(d) { return d[0]; })])
			// 					 .range([padding, width - padding * 2]);

			// var yScale = d3.scaleLinear()
			// 					 .domain([0, d3.max(dataset, function(d) { return d[1]; })])
			// 					 .range([height - padding, padding]);

			// //Define X axis
			// var xAxis = d3.axisBottom()
			// 				  .scale(xScale)
			// 				  .ticks(5);

			// //Define Y axis
			// var yAxis = d3.axisLeft()
			// 				  .scale(yScale)
			// 				  .ticks(5);
            //  // append the svg object to the body of the page
            // var svg = d3.select("body")
            // .append("svg")
            //     .attr("width", width + margin.left + margin.right)
            //     .attr("height", height + margin.top + margin.bottom)
            // .append("g")
            //     .attr("transform",
            //         "translate(" + margin.left + "," + margin.top + ")");
        
			// //Create circles
			// svg.selectAll("circle")
			//    .data(dataset)
			//    .enter()
			//    .append("circle")
			//    .attr("cx", function(d) {
			//    		return xScale(d[0]);
			//    })
			//    .attr("cy", function(d) {
			//    		return yScale(d[1]);
			//    })
			//    .attr("r", 2);
			
			// //Create X axis
			// svg.append("g")
			// 	.attr("class", "x axis")
			// 	.attr("transform", "translate(0," + (height - padding) + ")")
			// 	.call(xAxis);
			
			// //Create Y axis
			// svg.append("g")
			// 	.attr("class", "y axis")
			// 	.attr("transform", "translate(" + padding + ",0)")
			// 	.call(yAxis);



			// //On click, update with new data			
			// d3.select(".add")
			// 	.on("click", function() {

			// 		//New values for dataset
			// 		var numValues = numDataPoints;						 		//Count original length of dataset
			// 		var maxRange = Math.random() * 1000;						//Max range of new values
			// 							 				 		//Initialize empty array
			// 		for (var i = 0; i < numValues; i++) {				 		//Loop numValues times
			// 			var newNumber1 = Math.floor(Math.random() * maxRange);	//New random integer
			// 			var newNumber2 = Math.floor(Math.random() * maxRange);	//New random integer
			// 			dataset.push([newNumber1, newNumber2]);					//Add new number to array
			// 		}
			// 		console.log(dataset)
			// 		//Update scale domains
			// 		xScale.domain([0, d3.max(dataset, function(d) { return d[0]; })]);
			// 		yScale.domain([0, d3.max(dataset, function(d) { return d[1]; })]);
			// 		//Select 
			// 		var circles = svg.selectAll("circle")
			// 			.data(dataset);


			// 		//Enter...
			// 		circles.enter()
			// 		   .append("circle")
			// 		   .attr("cx", function(d) {
			// 		   		return xScale(d[0]);
			// 		   })
			// 		   .attr("cy", function(d) {
			// 		   		return yScale(d[1]);
			// 		   })
			// 		   .attr("fill", "magenta")
			// 		   .merge(circles)
			// 		   .transition()							//Initiate a transition on all elements in the update selection (all rects)
			// 		   .duration(500)
			// 		   .attr("cx", function(d) {
			// 		   		return xScale(d[0]);
			// 		   })
			// 		   .attr("cy", function(d) {
			// 		   		return yScale(d[1]);
			// 		   })
			// 		   .attr("r", 2);
			// 		//Update all circles
			// 		// svg.selectAll("circle")
			// 		//    .data(dataset)
			// 		//    .transition()
			// 		//    .duration(1000)
			// 		//    .on("start", function() {
			// 		// 	   d3.select(this)
			// 		// 	     .attr("fill", "magenta")
			// 		// 	     .attr("r", 3);
			// 		//    })
			// 		//    .attr("cx", function(d) {
			// 		//    		return xScale(d[0]);
			// 		//    })
			// 		//    .attr("cy", function(d) {
			// 		//    		return yScale(d[1]);
			// 		//    })
			// 		//    .on("end", function() {
			// 		// 	   d3.select(this)
			// 		// 	     .attr("fill", "black")
			// 		// 	     .attr("r", 2);
			// 		//    });

			// 		//Update X axis
			// 		svg.select(".x.axis")
			// 		   	.transition()
			// 		   	.duration(1000)
			// 			.call(xAxis);
					
			// 		//Update Y axis
			// 		svg.select(".y.axis")
			// 		   	.transition()
			// 		   	.duration(1000)
			// 			.call(yAxis);

			// 	});
