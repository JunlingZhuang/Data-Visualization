        var width = window.innerWidth
        var height = window.innerHeight

        var svg = d3.select("body")
			.append("svg").attr("width",width)
			.attr("height", height);           

        var geoPath = "nyc_boroughs.geojson";
        var dataPath = "NYC_Parks_Events_2019.csv";

        Promise.all([d3.json(geoPath), d3.csv(dataPath)]).then(function(data) {
                var geo = data[0];
                var places = data[1];
                drawOutline(geo)
                drawDots(places,geo)
            });
            
            function drawOutline(geo){
                var padding = 10
                var myProjection = d3.geoAlbers()
                      
				.fitExtent([[padding,padding],[width-padding,height-padding]],geo)
               
			    var path = d3.geoPath().projection(myProjection);
               
			    svg.append("path")
                    .attr("d", path(geo))
                    .attr("fill", "none")
                    .attr("stroke", "#000000")
                    .attr("stroke-width",.5)
            }
            
            function drawDots(places,geo){              
                var padding = 10
                var projection = d3.geoAlbers()
                        .fitExtent([[padding,padding],[width-padding,height-padding]],geo)
        
              var parkDictionary = {}
              var parkCoordinates = {}
              
			  //THIS PART IS NEW CODE THAT COUNTS UP INSTANCES BY PARK ID
              for(var p in places){
                var parkId = places[p]["park_id"]                
                var currentKeys = Object.keys(parkDictionary)
                
				  if(currentKeys.indexOf(parkId)==-1){
                  parkDictionary[parkId]=1
                  parkCoordinates[parkId]=[places[p]["lat"],places[p]["long"]]
                }else{
                  parkDictionary[parkId]+=1
                }
              }
			  var rScale = d3.scaleLinear().domain([1,300]).range([3,10])
                             
                svg.selectAll("circle")
                	.data(Object.keys(parkDictionary))
                    .enter()
                	.append("circle")
                	.attr("r", function(d){
						console.log(d)
                	  return rScale(parkDictionary[d])
                	})
                	.attr("cx", function(d) {
                  	    return projection([parkCoordinates[d][1],parkCoordinates[d][0]])[0]
                	})
                	.attr("cy", function(d) {
                  	    return projection([parkCoordinates[d][1],parkCoordinates[d][0]])[1]
                	})
                	.attr("opacity", 1)
				//	.on("mouseover",....)
            }