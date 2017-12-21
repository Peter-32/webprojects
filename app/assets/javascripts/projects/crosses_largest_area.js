"use strict";


if(document.querySelector(".projects.crosses_largest_area") != null) {
    $("#navbarNavAltMarkup").find(".active").removeClass("active");
    $("#nav_projects").addClass("active");

    var answer_shown = false;
    var auto_show_answer_on = false;
    var canvas = document.getElementById("the_canvas");
    var output = document.getElementById("the_output");
    var green_likelihood_div = document.getElementById("green_likelihood");
    var jq_canvas = $("canvas");
    var width = jq_canvas.width() / 12 / 3; // no idea why I have to divide by 3
    var height = jq_canvas.height() / 12 / 3; // no idea why I have to divide by 3
    var ctx = canvas.getContext("2d");
    var max_area = 1;
    var up, down, left, right, cross_arm_size_largest, up2, down2, left2, right2, cross_arm_size2, area;
    var final_x1;
    var final_y1;
    var final_x2;
    var final_y2;
    var final_cross_arm_size1;
    var final_cross_arm_size2;

    function randomize() {
      function how_many(arr1, y, x, direction) {
        var count = 0
        if (direction == "down") {
          y = y + 1;
          while (y <= arr.length-1) {
            if (arr1[y][x] == "G") {
              count +=1;
            } else {
              break;
            }
            y+=1;
          }
        } else if (direction == "up") {
          y = y - 1;
          while (y >= 0) {
            if (arr1[y][x] == "G") {
              count +=1
            } else {
              break;
            }
            y-=1;
          }
        } else if (direction == "right") {
          x = x + 1;
          while (x <= arr[0].length-1) {
            if (arr1[y][x] == "G") {
              count +=1;
            } else {
              break;
            }
            x+=1;
          }
        } else {  // left
          x = x - 1;
          while (x >= 0) {
            if (arr1[y][x] == "G") {
              count +=1;
            } else {
              break
            }
            x-=1;
          }
        }
        return count;
      }


      // Initialize variables
      var arr = [];
      var rand = ""
      var row = 0;
      var col = 0;
      var current_row;
      var green_likelihood = parseFloat(green_likelihood_div.value);
      answer_shown = false;
      ctx.globalAlpha = 1.0;
      ctx.fillStyle = "#ffffff";
      ctx.fillRect(0,0,12*width,12*height);
      // Initialize 2D array
      for (var i = 0; i < 12; i++) {
        current_row = []
        for (var j = 0; j < 12; j++) {
        if (Math.random() < green_likelihood) {
          ctx.fillStyle = "#66ff99";
          rand = "G"; // good
          ctx.fillRect(0+(width*j),0+(height*i),width-1,height-1);
        } else {
          ctx.fillStyle = "#FF0000";
          rand = "B"; // bad
          ctx.fillRect(0+(width*j),0+(height*i),width-1,height-1);
        }
        current_row.push(rand);
      }
      arr.push(current_row);
      }

      max_area = 0;
      up=0; down = 0; left = 0; right = 0; cross_arm_size_largest = 0;
      up2 = 0; down2 = 0; left2 = 0; right2 = 0; cross_arm_size2 = 0; area = 0;
      final_x1 = 0;
      final_y1 = 0;
      final_x2 = 0;
      final_y2 = 0;
      final_cross_arm_size1 = 0;
      final_cross_arm_size2 = 0;
      // Find the answer
      for (var y = 0; y < arr.length - 1; y++) {
        for (var x = 0; x < arr[0].length - 1; x++) {
          if (arr[y][x] == "B") {
            continue;
          }
          up = how_many(arr,y,x,"up");
          down = how_many(arr,y,x,"down");
          left = how_many(arr,y,x,"left");
          right = how_many(arr,y,x,"right");
          cross_arm_size_largest = Math.min(up, down, left, right);
          for (var cross_arm_size = 0; cross_arm_size <= cross_arm_size_largest; cross_arm_size++) {
            // copy array by values
            var arr_temp = []
            for (var z = 0; z < arr.length; z++) {
              arr_temp[z] = arr[z].slice();
            }
            arr_temp[y][x] = "B"
            for (var i = 0; i <= cross_arm_size; i++) {
              arr_temp[y][x+i] = "B"
              arr_temp[y][x-i] = "B"
              arr_temp[y+i][x] = "B"
              arr_temp[y-i][x] = "B"
            }
            for (var y2 = 0; y2 < arr.length - 1; y2++) {
              for (var x2 = 0; x2 < arr[0].length - 1; x2++) {
                if (y2 == y && x2 == x) {
                  continue;
                }
                if (arr_temp[y2][x2] == "B") {
                  continue;
                }
                up2 = how_many(arr_temp,y2,x2,"up");
                down2 = how_many(arr_temp,y2,x2,"down");
                left2 = how_many(arr_temp,y2,x2,"left");
                right2 = how_many(arr_temp,y2,x2,"right");
                cross_arm_size2 = Math.min(up2, down2, left2, right2);
                area = ((cross_arm_size2*4) + 1) * ((cross_arm_size*4) + 1)
                if (area >= max_area) {
                  final_x1 = x;
                  final_y1 = y;
                  final_x2 = x2;
                  final_y2 = y2;
                  final_cross_arm_size1 = cross_arm_size;
                  final_cross_arm_size2 = cross_arm_size2;
                  max_area = area;
                }
              }
            }
          }
        }
      }
      // console.log(max_area)
      // console.log(final_x1);
      // console.log(final_y1);
      // console.log(final_x2);
      // console.log(final_y2);
      // console.log(final_cross_arm_size1);
      // console.log(final_cross_arm_size2);
      if (auto_show_answer_on) {
        get_crosses_answer();
      }
    }


    function get_crosses_answer() {
      if (!answer_shown && max_area > 0) {
        ctx.globalAlpha = 0.4;
        ctx.fillStyle = "#4286f4";
        for (var i = 0; i <= final_cross_arm_size1; i++) {
          ctx.fillRect(0+(width*(final_x1+i)),0+(height*(final_y1)),width-1,height-1);
          ctx.fillRect(0+(width*(final_x1-i)),0+(height*(final_y1)),width-1,height-1);
          ctx.fillRect(0+(width*(final_x1)),0+(height*(final_y1+i)),width-1,height-1);
          ctx.fillRect(0+(width*(final_x1)),0+(height*(final_y1-i)),width-1,height-1);
        }
        for (var i = 0; i <= final_cross_arm_size2; i++) {
          ctx.fillRect(0+(width*(final_x2+i)),0+(height*(final_y2)),width-1,height-1);
          ctx.fillRect(0+(width*(final_x2-i)),0+(height*(final_y2)),width-1,height-1);
          ctx.fillRect(0+(width*(final_x2)),0+(height*(final_y2+i)),width-1,height-1);
          ctx.fillRect(0+(width*(final_x2)),0+(height*(final_y2-i)),width-1,height-1);
        }
      }
      output.innerHTML = "The area is: " + max_area;
      answer_shown = true;
    }

    function auto_show_answer() {
      auto_show_answer_on = true;
      get_crosses_answer();
    }

    randomize();
    document.getElementById("crosses_answer_button").addEventListener("click", get_crosses_answer);
    document.getElementById("randomize_button").addEventListener("click", randomize);
    document.getElementById("auto_show_answer_button").addEventListener("click", auto_show_answer);


}
