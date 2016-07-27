/**
 * An example of a linear tree layout for a JSON tree.
 * Group 8
 * By: Michael Rhodas
 */

//Please edit this JSON variable to change the tree.
var json_data_tree = 
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
          "name":"Danielle"
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

//Pad for proper display.
var pad = 100;

// Create a svg canvas.
var canvas = d3.select("body").append("svg")
	.attr("width", width)
	.attr("height", height)
	.style("border", "solid 2px #000000")
		.append("g")
			.attr("transform", "translate(" + (width + pad) / 8 + ", 0)");
	 
// Start a d3 tree layout.
var structure = d3.layout.tree()
	.size([width, (height / 2) + 100]);

// Set the path type to link the tree nodes.
var diagonalPath = d3.svg
	.diagonal()
		.projection(function(d) {
			return [d.y, d.x];
		});

//d3 allows us to obtain nodes for a tree very easily.
var nodes = structure.nodes(json_data_tree);
//Very similarly for the links, d3 allows us to parse a 
//JSON variable and obtain a list of links with ease.
var paths = structure.links(nodes);

//Add paths for all the nodes.
canvas.selectAll("pathlink")
	.data(paths)
	.enter()
	.append("path")
		.attr("class", "link")
		.attr("d", diagonalPath)
		.attr("fill", "none")
		.attr("stroke", "#000000")
		.attr("stroke-width", "3px")
		.attr("stroke-opacity", ".4");

//Get a list of positions as a node and append them to a group.
var nodePositions = canvas.selectAll("g.node")
	.data(nodes)
	.enter()
	//Make a group to be able to translate the node depending on the point.
	.append("g")
		.attr("transform", function(d) {
			return "translate(" + d.y + "," + d.x + ")"; 
		});

//Put in a svg circle at every node position.
nodePositions.append("circle")
	.attr("r", 5)
	.attr("fill", "white")
	.attr("stroke","green")
	.attr("stroke-width","3px");
 
//Attach labels to all of the nodes using its name characteristic.
nodePositions.append("text")
	//This determines the correct orientation for the 
	//text position.
	.attr("dx", function(d) {
		if(d.children){
			return -8;
		} else {
			return 8;
		}
	})
	.attr("dy", 3)
	//This determins if the node has children or not.
	//Then it will place the text it the proper end of
	//the node.
	.attr("text-anchor", function(d) {
		if(d.children){
			return "end";
		} else {
			return "start";
	}})
	.attr("font-size", function(d) {
		if(d.children){
			return "20px";
		} else {
			return "14px";
	}})
	.text(function(d) {
		return d.name;
	})
	
	
	
	
	
	