/**
 * An example of a radial cluster layout for a JSON tree.
 * Group 8
 * By: Michael Rhodas
 */

//Please edit this JSON variable to change the cluster.
var json_data_cluster = 
{  
  "name":"Family Tree",
  "children":[  
    {  
      "name":"Thanh",
      "children":[
        {  
          "name":"Tova",
          "children":[  
            {  
              "name":"Delora"
            },
            {  
              "name":"Frank"
            },
            {  
              "name":"Karie"
            },
            {  
              "name":"Abraham"
            }
          ]
        },
        {  
          "name":"Neely"
        },
        {  
          "name":"Tina"
        },
        {  
          "name":"Wiley"
        },
        {  
          "name":"Betty"
        },
        {  
          "name":"Tori"
        }
      ]
    },
    {  
      "name":"Wilber",
      "children":[  
        {  
          "name":"Brian"
        },
        {  
          "name":"Estell",
          "children":[  
            {  
              "name":"Bee"
            },
            {  
              "name":"Tony"
            },
            {  
              "name":"Laci"
            },
            {  
              "name":"Lacy"
            }
          ]
        },
        {  
          "name":"Michael"
        },
        {  
          "name":"Jane"
        },
        {  
          "name":"Jayne"
        }
      ]
    },
    {  
      "name":"Crystal",
      "children":[  
        {  
          "name":"Terisa"
        },
        {  
          "name":"Dan",
          "children":[  
            {  
              "name":"Craig"
            },
            {  
              "name":"Kathy"
            },
            {  
              "name":"Tara"
            },
            {  
              "name":"Tom"
            }
          ]
        },
        {  
          "name":"Brock"
        }
      ]
    }
  ]
};
//Width of the svg plane.
var width = 800;

//Height of the svg plane. 
var height = 800;

// Initialize a svg DOM plane to work with.
var canvas = d3.select("body").append("svg")
	.attr("width", width)
	.attr("height", height)
	.style("background", "black")
	.style("border", "solid 5px #0FF")
	//It is important to make a new group so everything can be centered.
	.append("g")
		.attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");
 
// Initialize d3's cluster layout and set its size.
var structure = d3.layout.cluster()
	.size([(width / 2), (width / 2) - height / 8]);
 
//This will set the type of paths to link the nodes in a radial fashion.
var diagonalPathRadial = d3.svg.diagonal
	.radial()
		.projection(function(d) {
			return [d.y, d.x / 180 * Math.PI];
		});

//d3 allows us to obtain nodes for a cluster very easily.
var nodeList = structure.nodes(json_data_cluster);

//Very similarly for the links, d3 allows us to parse a 
//JSON variable and obtain a list of links with ease.
var linkList = structure.links(nodeList);
 
//Add paths for all the nodes.
canvas.selectAll("pathlink")
	.data(linkList)
	.enter()
	.append("path")
		.attr("class", "link")
		.attr("d", diagonalPathRadial)
		.attr("fill", "none")
		.attr("stroke", "#33C7FF")
		.attr("stroke-width", "3px")
		.attr("stroke-opacity", ".6");

//Get a list of positions as a node and append them to a group.
var radialNodes = canvas.selectAll("g.node")
	.data(nodeList)
	.enter()
	//Make a group to be able to rotate the plane depending on the point.
	.append("g")
		.attr("transform", function(d) { 
			return "rotate(" + (d.x - 90) + ")translate(" + d.y + ")"; 
		});
 
//Put in a svg circle at every node position.
radialNodes.append("circle")
	.attr("r", 7)
	.attr("fill", "red")
	.attr("stroke","orange")
	.attr("stroke-width","3px");

//Attach labels to all of the nodes using its name characteristic.
radialNodes.append("text")
	.attr("fill", "white")
	//Decided how to offset the coordinates of x.
	.attr("dx", function(d) { 
		if(d.x < 180){
			return 8;
		} else {
			return -8;
		}
	})
	.attr("dy", ".51em")
	.attr("font-size", "" + width * .02)
	.attr("font-family", "sans-serif")
	//Decide if the text should be on the left or right orientation 
	//around the node.
	.attr("text-anchor", function(d) {
		if(d.x < 180){
			return "start";
		} else {
			return "end";
		}
	})
	//Depending what half of the cluster we are on, rotate the text.
	.attr("transform", function(d) { 
		if(d.x < 180){
			return null;
		} else {
			return "rotate(180)";
		}})
	.text(function(d) {
		return d.name; 
	});







