/**
 * This is an example of how the enter() method works
 * with data binding in d3.
 * Group 8
 * By: Michael Rhodas
 */

//Declare a data array with two elements.
var data = [10, 20];

//Make a svg canvas.
var canvas = d3.select("body")
	.append("svg")
		.attr("width", 700)
		.attr("height", 400);

//The explicitly defined circle.
var explicitCircle = canvas
	.append("circle")
		.attr("cx", 250)
		.attr("cy", 250)
		.attr("r", 100);

//After the delay, the data is bound to the circles in the DOM and 
//enter creates more circles because of the data the circles represent.
setTimeout(function(){
	var bindCircles = canvas.selectAll("circle")
		.data(data)
		.enter()
			.append("circle")
				.attr("cx", 500)
				.attr("cy", 250)
				.attr("r", 100)
				.attr("fill", "red");
		}, 2000);