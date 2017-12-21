////// LEFT/RIGHT NAV
// Resizing affecting the Nav
function redrawNav(){
  //let windowSize = Math.max($(window).width(),400)
  // RIGHT NAV
  // if less than 1201, don't include it.
  if (Math.max($(window).width(),400) < 1201) {
    $("#right-nav").addClass("invisible");
  } else {
    $("#right-nav").removeClass("invisible");
  }
  // LEFT NAV
  // You can always toggle to show or hide this but
  // this does somet hings automatically for resizing/sizes.
  // less than 721 then make it a toggle show nav
  if (Math.max($(window).width(),400) < 721) {
    // auto hide main left nav part.
    $("#left-nav").addClass("invisible"); // TEMPORARY LINE#@%#!@%!@#$!@
    // $("#left-nav")

  } else {
    $("#left-nav").removeClass("invisible"); // TEMPORARY LINE#@%#!@%!@#$!@
    // auto show unless toggled off earlier
    if (true) {
      // show it

    }
    // otherwise do nothing.
  }
}
// first
redrawNav();
window.addEventListener("resize", redrawNav);


///////// LEFT NAV SLIDING
