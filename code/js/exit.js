/**
 * This is an example of how the exit() method works
 * with data binding in d3.
 * Group 8
 * By: Michael Rhodas
 */

//Declare a data array with one element.
var data = [10];

//Make a svg canvas.
var canvas = d3.select("body")
	.append("svg")
		.attr("width", 700)
		.attr("height", 400);

//The explicitly defined circle.
var updateCircle = canvas
	.append("circle")
		.attr("cx", 250)
		.attr("cy", 250)
		.attr("r", 100);

//Another explicitly defined circle.
var updateCircle = canvas
	.append("circle")
		.attr("cx", 500)
		.attr("cy", 250)
		.attr("r", 100);

//After the delay, the data is bound to the circles in the DOM.
//Since there are two circles already existing and only one data
//element, exit() will execute on all extra existing elements.
setTimeout(function(){
	var bindCircles = canvas.selectAll("circle")
		.data(data)
		.exit()
			.attr("fill", "green");
		}, 2000);