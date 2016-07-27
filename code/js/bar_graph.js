/**
 * A bar graph demonstration made with d3 that takes a random
 * set of data and displays the graph. There is also a mouseover
 * Group 8
 * By: Michael Rhodas
 */
var width = 700;
var height = 400;
var barSpacing = 1;

//Array to fill with random data.
var data = [];

//Number of desired bars to plot. (Max 50)
var numOfBars = 40;

//Vertical range for bars. (Max 100)
var range = 100;
for (var i = 0; i < numOfBars; i++) {
    var newNumber1 = Math.round(Math.random() * range);
    data.push(newNumber1);
}

//Make a color scale for the legend and bars.
var colorScale = d3.scale.linear()
	.domain([0, d3.max(data, function(d) { return d; })])
	.range(["blue", "red"]);

//Make an svg canvas for the graph.
var svg = d3.select("body")
	.append("svg")
		.attr("width", width)
		.attr("height", height)
		.attr("padding", 10);

//Scale by this integer.
var scale = 3;

//Rectangles with scaling to data.
svg.selectAll("rect")
	.data(data)
		.enter()
			.append("rect")
				//These bars must fit to the width of the svg canvas.
				.attr("x", function(d, i) {   
				    return i * (width / data.length);
				})
				//This will place the bars on the upper y coordinate needed.
				.attr("y", function(d) {
				    return height - (scale * d);
				})
				.attr("width", width / data.length - barSpacing)  //bar padding
				.attr("height", function(d) {
				    return scale * d;
				})
				.attr("fill", function(d) {
				    return colorScale(d);
				})
				.on("mouseover", function() {
					d3.select(this)
					.attr("fill", "black");
				})
				.on("mouseout", function(d, i) {
					d3.select(this)
					.attr("fill", function(d,i) {
						return colorScale(d) + "";
					});
				});

//Labels
svg.selectAll("text")
	.data(data)
		.enter()
			.append("text")
				.text(function(d) {
				    return d;
				})
				.attr("x", function(d, i) {
				    return i * (width / data.length) + (width / data.length - barSpacing) / 2;
				})
				.attr("y", function(d) {
				    return height - (d * scale) + 14;  //15 is now 14
				})
				.attr("font-family", "sans-serif")
				.attr("font-size", "11px")
				.attr("fill", "white")
				.attr("text-anchor", "middle");

//Make a new line for the legend.
var spacer1 = d3.select("body")
	.append("p")
	.attr("text","<br>");

//Make a new SVG plane for a legend.
var keySvg = d3.select("body")
	.append("svg")
		.attr("width", 100)
		.attr("height", 100);

//Insert a gradient definition.
var gradient = svg.append("defs")
	.append("linearGradient")
		.attr("id", "gradient")
		.attr("x1", "0%")
		.attr("y1", "0%")
		.attr("x2", "0%")
		.attr("y2", "100%")
		.attr("spreadMethod", "pad");

//Style the colors for the gradient.
gradient.append("stop")
	.attr("offset", "0%")
	.attr("stop-color", "red")
	.attr("stop-opacity", 1);

gradient.append("stop")
	.attr("offset", "100%")
	.attr("stop-color", "blue")
	.attr("stop-opacity", 1);

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

//Add a small rectangle to label the color gradient.
key.append("rect")
	.attr("x", 5)
	.attr("y", 28)
	.attr("width", 20)
	.attr("height", 60)
	.style("fill","url(#gradient");

//Add text to label the top of the legend.
key.append("text")
	.attr("x",30)
	.attr("y",40)
	.attr("font","sans-serif")
	.attr("font-size", "12px")
	.attr("fill","red")
	.text("Critical");

//Add text to label the middle of the gradient.
key.append("text")
	.attr("x",30)
	.attr("y",60)
	.attr("font","sans-serif")
	.attr("font-size", "12px")
	.attr("fill","purple")
	.text("Caution");

//Add text to label the bottom of the legend.
key.append("text")
	.attr("x",30)
	.attr("y",80)
	.attr("font","sans-serif")
	.attr("font-size", "12px")
	.attr("fill","blue")
	.text("Unimportant");








