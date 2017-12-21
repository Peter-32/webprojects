"use strict";
if(document.querySelector(".projects.network") != null) {

  $("#navbarNavAltMarkup").find(".active").removeClass("active");
  $("#nav_projects").addClass("active");

var prev_width = 0; // set this to 0 to start.

function redrawAll() {
  //let windowSize2 = Math.max($(window).width(),400)
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
        improvedLayout:false
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
                max: 30,
                label: {
                    min: 8,
                    max: 30,
                    drawThreshold: 12,
                    maxVisible: 20
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
            }
        },
        physics: false,
        interaction: {
            tooltipDelay: 200,
            hideEdgesOnDrag: true
        }
    };
    var data = {nodes:nodesDataset, edges:edgesDataset};

    // vis is defined in vis.js
    network = new vis.Network(container, data, options);

    // set the initial zoom
    //network.fit()
    //test.focusOnNode(1,{scale: 1, offset:{x: -(1000/3)}})
    // focus on the JavaScript node
    network.focus(22);
    // zooms in
    var zoomLevel = Math.min((Math.max($(window).width(),400) / 1220) * 1.7,1.7);
    network.moveTo({scale: zoomLevel});

    // get a JSON object
    // defined in vis.js
    var allNodes = nodesDataset.get({returnType:"Object"});

}


    // network.getPositions()
    var edges = [
        {from: 6, to: 7},
        {from: 6, to: 8},
        {from: 1, to: 9},
        {from: 1, to: 11},
        {from: 1, to: 12},
        {from: 15, to: 13},
        {from: 1, to: 17},
        {from: 5, to: 18},
        {from: 1, to: 19},
        {from: 1, to: 20},
        {from: 1, to: 21},
        {from: 1, to: 25},
        {from: 1, to: 26},
        {from: 1, to: 27},
        {from: 1, to: 28},
        {from: 1, to: 29},
        {from: 1, to: 18},
        {from: 15, to: 18},
        {from: 1, to: 15},
        {from: 1, to: 5},
        {from: 15, to: 5},
        {from: 13, to: 1},
        {from: 30, to: 1},
        {from: 22, to: 1},
        {from: 22, to: 5},
        {from: 22, to: 15},
        {from: 24, to: 5},
        {from: 24, to: 6},
        {from: 24, to: 10},
        {from: 24, to: 2},
        {from: 24, to: 15},
        {from: 26, to: 31},
        {from: 26, to: 2},
        {from: 26, to: 5},
        {from: 26, to: 15},
        {from: 24, to: 8},
        {from: 4, to: 2},
        {from: 31, to: 2},
        {from: 31, to: 4},
        {from: 1, to: 23}
    ];


    var nodes = [
        {id: 1, label: "JavaScript", value: 18, x: 102, y: -174},
        {id: 2, label: "SQL", value: 3, x: -266, y: 99},
        {id: 3, label: "Git", value: 1, x: -330, y: 106},
        {id: 4, label: "R", value: 2, x: -232, y: 102},
        {id: 5, label: "HTML", value: 5, x: -351, y: -168},
        {id: 6, label: "Ruby", value: 4, x: -237, y: -160},
        {id: 7, label: "Sinatra", value: 2, x: -225, y: 48},
        {id: 8, label: "Rails", value: 2, x: -269, y: -94},
        {id: 9, label: "AngularJS", value: 2, x: -27, y: -187},
        {id: 10, label: "PHP", value: 2, x: -264, y: 43},
        {id: 11, label: "jQuery", value: 2, x: 30, y: -187},
        {id: 12, label: "D3", value: 2, x: 80, y: 1},
        {id: 13, label: "Bootstrap", value: 3, x: -348, y: -96},
        {id: 14, label: "JIRA", value: 1, x: -365, y: 108},
        {id: 15, label: "CSS", value: 8, x: -294, y: -168},
        {id: 16, label: "Unix/Linux", value: 1, x: -346, y: 53},
        {id: 17, label: "Lodash", value: 2, x: -138, y: -192},
        {id: 18, label: "PWAs", value: 2, x: -185, y: 50},
        {id: 19, label: "Generators\nand async/await", value: 2, x: 139, y: -72},
        {id: 20, label: "JavaScript\nClasses", value: 2, x: 62, y: -73},
        {id: 21, label: "AJAX", value: 2, x: -82, y: -189},
        {id: 22, label: "Page Performance", value: 1, x: -95, y: -32},
        {id: 23, label: "npm (Install)", value: 2, x: 152, y: -165},
        {id: 24, label: "Atom", value: 6, x: 170, y: 60},
        {id: 25, label: "ESLint", value: 2, x: -94, y: -83},
        {id: 26, label: "Light Table\n with Tern.js Plugin", value: 5, x: 124, y: 82},
        {id: 27, label: "Webpack", value: 2, x: -45, y: 102},
        {id: 28, label: "Babel", value: 2, x: -91, y: 101},
        {id: 29, label: "npm (Publish)", value: -3, x: -13, y: 101},
        {id: 30, label: "vis.js", value: 2, x: 125, y: -0},
        {id: 31, label: "Python", value: 2, x: -197, y: 103}
    ];

    var network;
    // vis is defined in vis.js
    var nodesDataset = new vis.DataSet(nodes); // see dataset.js
    // vis is defined in vis.js
    var edgesDataset = new vis.DataSet(edges); // see dataset.js
    redrawAll();

    // First drawing
    //redraw();
    // Redraw based on the new size whenever the browser window is resized.

    window.addEventListener("resize", redrawAll);

}
