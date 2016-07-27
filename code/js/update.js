/**
 * This is an example of how you update the current DOM
 * elements that exist already.
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
var updateCircle = canvas
	.append("circle")
		.attr("cx", 250)
		.attr("cy", 250)
		.attr("r", 100);

//After the delay, the data is bound to the circles in the DOM and 
//enter creates more circles because of the data the circles represent.
//In addition to this, before enter is executed, the existing DOM
//elements can be updated as well.
setTimeout(function(){
	var bindCircles = canvas.selectAll("circle")
		.data(data)
		//This is where the current elements are updated.
		.attr("fill","blue")
		.enter()
			.append("circle")
				.attr("cx", 500)
				.attr("cy", 250)
				.attr("r", 100)
				.attr("fill", "red");
		}, 2000);