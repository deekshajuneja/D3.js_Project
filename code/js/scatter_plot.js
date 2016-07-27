/**
 * A scatter plot that is filled with random data and plotted
 * with the ability to select points on a mouse click.
 * Group 8
 * By: Michael Rhodas
 */
//Width and height of the SVG plane.
var width = 700;
var height = 500;

//This is used to keep visual elements from appearing off the SVG plane. Accounts for edge cutoff.
var pad = 30;

//This is the data set array with the coordinate points to plot.
var data = [];

//Set the amount of points to create here.
var numDataPoints = 50;

//Set a domain and range scale for the point creation.
var xRange = Math.random() * 700;
var yRange = Math.random() * 700;

//Make a randomized set of data to plot.
for (var i = 0; i < numDataPoints; i++) {
    var newX = Math.round(Math.random() * xRange);
    var newY = Math.round(Math.random() * yRange);
    data.push([newX, newY]);
}

//Set a linear scale for the x values using the d3 scaler.
var xScale = d3.scale.linear()
	.domain([0, d3.max(data, function(d) { return d[0]; })])
	.range([pad, width - pad * 2]);

//Set a linear scale for the y values using the d3 scaler.
var yScale = d3.scale.linear()
	.domain([0, d3.max(data, function(d) { return d[1]; })])
	.range([height - pad, pad]);

//d3 lets us make an axis with ease.
//Make a x axis.
var xAxis = d3.svg.axis()
	.scale(xScale)
	.orient("bottom");
	//.ticks(6);

//Make a y axis.
var yAxis = d3.svg.axis()
	.scale(yScale)
	.orient("left");
	//.ticks(6);

//Create a SVG plane to work with using d3.
//This will be used as a label for the inserted <svg> tag into the html file to build upon.
var svg = d3.select("body")
	.append("svg")
	.attr("width", width)
	.attr("height", height);

//Creating and binding data to SVG circles.
var circles = svg.selectAll("circle")
	.data(data)
	//Enter will cycle through the binded data array and will be used to dynamically plot the points.
	.enter()
	//This means add a circle element. <circle> in the html document.
	.append("circle")
	//Set the x and y coordinate for the center using the data.
	.attr("cx", function(d) {
		return xScale(d[0]);
	})
	.attr("cy", function(d) {
		return yScale(d[1]);
	})
	//This attribute sets the radius of the circle.
	.attr("r", 7)
	//Different color will be added to the point depending what third of the y-axis the points falls in.
	.attr("fill", function(d){
		if(d[1] < ((d3.max(data, function(d) { return d[1]; })) * .33)){
			return "red";
		} else if(d[1] < ((d3.max(data, function(d) { return d[1]; })) * .66) && d[1] > ((d3.max(data, function(d) { return d[1]; })) * .33)){
			return "orange";
		} else{
			return "green";
		}
	})
	.on("mouseover", function() {
		d3.select(this)
		.attr("r", 9);
	})
	.on("mousedown", function() {
		d3.select(this)
		.attr("fill", "blue");
	})
	.on("mouseout", function(d, i) {
		d3.select(this)
		.attr("r", 7);
	});

//Add the two axis

//Add X axis
svg.append("g")
	.attr("class", "axis")
	//Moves the axis into place.
	.attr("transform", "translate(0," + (height - pad) + ")")
	//This adds all the elements to the group.
	.call(xAxis)
	//This will add a label to the x axis.
	.append("text")
		.attr("class", "label")
		.attr("x", width-pad)
		.attr("y", -6)
		.style("text-anchor", "end")
		.text("Students");

//Add Y axis
svg.append("g")
    .attr("class", "axis")
    //Moves the axis into place.
    .attr("transform", "translate(" + pad + ",0)")
    //This adds all the elements to the group.
    .call(yAxis)
	//This adds a label to the axis.
    .append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", -30)
        .attr("x",-10)
        .attr("dy", "1em")
        .style("text-anchor", "middle")
        .text("ID #");

//Make a new line for the legend.
var spacer1 = d3.select("body")
	.append("p")
	.attr("text","<br>");

//Make a new SVG plane for a legend.
var keySvg = d3.select("body")
	.append("svg")
	.attr("width", 100)
	.attr("height", 100);

//Add a group for the legend elements.
var key = keySvg.append("g")
	.attr("class", "legend");

//Add a background rectangle 
key.append("rect")
	.attr("x",0)
	.attr("y",0)
	.attr("width", 100)
	.attr("height", 100)
	.attr("fill", "black");

//Add a title for the legend.
key.append("text")
	.attr("x",5)
	.attr("y",20)
	.attr("font","sans-serif")
	.attr("font-size", "20px")
	.attr("fill","white")
	.text("LEGEND:");

//Add a small rectangle to label the color green.
key.append("rect")
	.attr("x", 10)
	.attr("y", 30)
	.attr("width", 10)
	.attr("height", 10)
	.attr("fill","green");

//Add text to label the color rectangle.
key.append("text")
	.attr("x",30)
	.attr("y",40)
	.attr("font","sans-serif")
	.attr("font-size", "12px")
	.attr("fill","white")
	.text("Top 33%");

//Add a small rectangle to label the color orange.
key.append("rect")
	.attr("x", 10)
	.attr("y", 50)
	.attr("width", 10)
	.attr("height", 10)
	.attr("fill","orange");

//Add text to label the color rectangle.
key.append("text")
	.attr("x",30)
	.attr("y",60)
	.attr("font","sans-serif")
	.attr("font-size", "12px")
	.attr("fill","white")
	.text("Middle 33%");

//Add a small rectangle to label the color red.
key.append("rect")
	.attr("x", 10)
	.attr("y", 70)
	.attr("width", 10)
	.attr("height", 10)
	.attr("fill","red");

//Add text to label the color rectangle.
key.append("text")
	.attr("x",30)
	.attr("y",80)
	.attr("font","sans-serif")
	.attr("font-size", "12px")
	.attr("fill","white")
	.text("Bottom 33%");
