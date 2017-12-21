"use strict";

// Put all code within this if statement.  This way it only does something on the projects page.
// This is the optimal method of creating page specific JavaScript in Rails
var prev_width = 0; // set this to 0 to start.



if(document.querySelector(".projects.scala_java_network") != null) {
    $("#navbarNavAltMarkup").find(".active").removeClass("active");
    $("#nav_projects").addClass("active");

    // COMMANDS:  combine all scala files and remove the comment lines first
    // find src/ -name '*.scala' -exec cat {} \; > uber.scala
    // grep -v "^\s*//" uber.scala > uber2.scala


        var nodes;
        var edges;



    function buttonClicked() {
        var scala_code = document.getElementById("scala_code").value;
        var output = document.getElementById("output");
        var matches = []
        var re = /(def|object|class)[ \t]+([a-zA-Z_0-9]*)/g;
        //console.log(re);
        //console.log(typeof re);
        var match
        while ((match = re.exec(scala_code)) != null) {
          if (match[2] != '___apply' && // this condition should always be true
              match[2] != '___main' &&  // changed this because it was mis-attributing functions
              match[2] != '___canEqual' &&
              match[2] != '___toString') {
              //console.log(match);
              matches.push(match)
          }
        }

    /*
        for (var i = 0; i < myArray.length; i++) {
            output.innerHTML = output.innerHTML + myArray[i];
        } */


        //console.log(matches.length)
        //console.log("TEST");
        //console.log(matches[150][1]);

        // LOOP over each function, add a hash key for each function and
        // the values are the indicies in which that match was found.


        for (var i = 0; i < matches.length; i++) {

            // if a function
            if (matches[i][1] == 'def') {
                matches[i].references = [];
                matches[i].unique_id = i;
                // find all character indices that name is used for that function.
                // \b is for break points.  Just added to help avoid substrings.
                //var str = "\\b" + matches[i][2] + "\\b"
                //console.log(str);
                var reg = new RegExp(matches[i][2], "g")  // decided to leave out the \\b
                //console.log(reg);

                // loop the scala code
                while ((match = reg.exec(scala_code)) != null) {
                  matches[i].references.push(match.index);
                }
                //console.log(matches[i]);
            }
        }

        // loop over all functions and associate them to the correct class by
        // adding the class attribute and putting the right class name.

        var prev_class = "";
        //var prev_index = 0;
        var cur_index = 0;
        var cur_class = "";
        var broke = false;

        // LOOP THROUGH FUNCTIONS
        for (var i = 0; i < matches.length; i++) {


            // if a function
            if (matches[i][1] == 'def') {
                // find all character indices that name is used for that function.

                // loop through the matches to look for classes/objects
                // belonging to the function.
                // LOOP THROUGH CLASSES
                prev_class = "";
                broke = false;
                for (var j = 0; j < matches.length; j++) {
                    if (matches[j][1] == 'object' || matches[j][1] == "class") {
                        cur_class = matches[j][2];
                        cur_index = matches[j].index;
                        if (cur_index > matches[i].index) {
                            // add this as a class to the function.
                            matches[i].class = prev_class;
                            broke = true;
                            break;
                        }
                        prev_class = cur_class;
                    }
                }
                if (broke == false) {
                    matches[i].class = prev_class;
                }
              //console.log(matches[i]);
            }
        }


        var cur_index = 0;
        var cur_function = "";
        var prev_function = "";
        var prev_index = 0;
        var cur_function_id = 0;
        var prev_function_id = 0;

      // Generate the refences names
        for (var i = 0; i < matches.length; i++) {
            matches[i].reference_functions = [];
            matches[i].reference_function_ids = [];
            if (matches[i][1] == 'def') {

                // loop through each "references" value
                for (var j = 0; j < matches[i].references.length; j++ ) {
                    broke = false;
                    // loop through all functions again
                    for (var k = 0; k < matches.length; k++) {
                        if (matches[k][1] == 'def') {
                            cur_function = "" + matches[k].class + "." + matches[k][2];
                            cur_index = matches[k].index;
                            cur_function_id = k;
                            if (cur_index > matches[i].references[j]) {
                              // may as well not put in the id if it is the same as the function unique id.
                                if (prev_function_id != i) {
                                    matches[i].reference_functions.push(prev_function);
                                    matches[i].reference_function_ids.push(prev_function_id);
                                }
                                broke = true;
                                break;
                            }
                            prev_function = cur_function;
                            prev_function_id = cur_function_id;
                        }
                    }
                    if (broke == false) {
                        matches[i].reference_functions.push(prev_function);
                        matches[i].reference_function_ids.push(prev_function_id);
                    }
                }
            }
        }



        // network.getPositions()



    /*   console.log(nodes);
      console.log(edges); */


      // CREATE THE NODES
        // array of objects with {id: 1, label: "JavaScript"},
     nodes = []
     var tmp_object
     for (var i = 0; i < matches.length; i++) {
       if (matches[i][1] == 'def') {
         if (matches[i][2].match(/apply/i) ||
             matches[i][2].match(/canequal/i) ||
             matches[i][2].match(/tostring/i) ||
             matches[i][2].match(/tolong/i) ||
             matches[i][2].match(/toint/i) ||
             matches[i][2].match(/todouble/i) ||
             matches[i][2].match(/todate/i)) {
           // nothing
         } else {
           tmp_object = {}
           if (matches[i][2] == 'main') {
              tmp_object.value = 2;
           } else {
              tmp_object.value = 1;
           }
           tmp_object.id = i;
           tmp_object.label = matches[i].class + "." + matches[i][2];
           nodes.push(tmp_object)
         }
       }
     }


      // CREATE THE EDGES
        // array of objects with "from" and "to"
      edges = []
      var tmp_object
        for (var i = 0; i < matches.length; i++) {
            if (matches[i][1] == 'def') {
                for (var j = 0; j < matches[i].reference_function_ids.length; j++) {
                   tmp_object = {}
                   tmp_object.to = i;
                   tmp_object.from = matches[i].reference_function_ids[j];
                   edges.push(tmp_object);
                }
            }
        }

    /*   var invisible_output_nodes = document.getElementById("invisible_output_nodes");
      var invisible_output_edges = document.getElementById("invisible_output_edges");
      invisible_output_nodes.innerHTML = JSON.stringify(nodes);
      invisible_output_edges.innerHTML = JSON.stringify(edges); */
        console.log(nodes);
        console.log(edges);

        var network;
        // vis is defined in vis.js
        nodesDataset = new vis.DataSet(nodes); // see dataset.js
        // vis is defined in vis.js
        edgesDataset = new vis.DataSet(edges); // see dataset.js

        redrawAll2()

    }

    function redrawAll2() {
      //console.log(nodes)
      //console.log(edges)

      if (prev_width == Math.max($(window).width(),400)) {
        return;
      }
      prev_width = Math.max($(window).width(),400)
      // Used to size the network container.
      var network_width;
      if (Math.max($(window).width(),400) < 721) {
          network_width = Math.max($(window).width(),400) * .80;
      } else {
          network_width = Math.max($(window).width(),400) * .80; // Maybe change this to .60 when enabling the left nav on the site again.
      }
      var network_height = Math.min(Math.max($(window).width(),400)/1220 * 600,600);

      $("#mynetwork").width(network_width);
      $("#mynetwork").height(network_height);

        var container = document.getElementById("mynetwork");
        var options = {
            layout: {
                randomSeed: undefined,
                improvedLayout:false,
                hierarchical: {
                enabled: true,
                nodeSpacing: 200,
                blockShifting: false,
                edgeMinimization: false,
                sortMethod: "directed",
                    direction: 'UD',        // UD, DU, LR, RL
                    sortMethod: 'directed'   // hubsize, directed
                }
            },
            nodes: {
              color: {
                border: '#2B7CE9',
                background: '#97C2FC',
                highlight: {
                  border: '#2B7CE9',
                  background: '#D2E5FF'
                },
                hover: {
                  border: '#2B7CE9',
                  background: '#D2E5FF'
                }
              },
                shape: "dot",
                scaling: {
                    min: 10,
                    max: 14,
                    label: {
                        min: 8,
                        max: 10,
                        drawThreshold: 6,
                        maxVisible: 10
                    }
                },
                font: {
                    size: 12,
                    face: "Tahoma"
                }
            },
            edges: {
                width: 0.15,
                color: {inherit: "from"},
                smooth: {
                    type: "continuous"
                },
                arrows:'to'
            },
            physics: false /*{
                barnesHut: {
                    avoidOverlap: 1
                }
            }*/,
            interaction: {
                tooltipDelay: 200,
                hideEdgesOnDrag: true
            }
        };
        var data = {nodes:nodesDataset, edges:edgesDataset};
        //console.log(data);

        // vis is defined in vis.js
        network = new vis.Network(container, data, options);

        // set the initial zoom
        //network.fit()
        //test.focusOnNode(1,{scale: 1, offset:{x: -(1000/3)}})
        // focus on the JavaScript node
        network.focus(3);
        // zooms in
        var zoomLevel = Math.min((Math.max($(window).width(),400) / 1220) * 1.7/9,1.7/9);
        network.moveTo({scale: zoomLevel});

        // get a JSON object
        // defined in vis.js
        var allNodes = nodesDataset.get({returnType:"Object"});

    }


    // CALLBACKS
    document.getElementById("button1").addEventListener("click", buttonClicked);
    //////


    var nodes;
    var edges;
    var network;
    // vis is defined in vis.js
    var nodesDataset; // see dataset.js
    // vis is defined in vis.js
    var edgesDataset; // see dataset.js






    /*
        var network;
        // vis is defined in vis.js
        var nodesDataset = new vis.DataSet(nodes); // see dataset.js
        // vis is defined in vis.js
        var edgesDataset = new vis.DataSet(edges); // see dataset.js
    */









}
