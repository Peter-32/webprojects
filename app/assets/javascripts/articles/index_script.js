"use strict";

// Put all code within this if statement.  This way it only does something on the projects page.
// This is the optimal method of creating page specific JavaScript in Rails


if(document.querySelector(".articles.index") != null) {
    $("#navbarNavAltMarkup").find(".active").removeClass("active");
    $("#nav_articles").addClass("active");
}
