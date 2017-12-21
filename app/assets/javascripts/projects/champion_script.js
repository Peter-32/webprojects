if(document.querySelector(".projects.champion") != null) {
    $("#navbarNavAltMarkup").find(".active").removeClass("active");
    $("#nav_projects").addClass("active");
    // Just made three functions so don't have to pass parameters in HTML.
    // Can refactor later.
    function loadXMLJungle() {
      loadXMLDoc("Jungle")
    }
    function loadXMLMiddle() {
      loadXMLDoc("Middle")
    }
    function loadXMLTop() {
      loadXMLDoc("Top")
    }

    function htmlDecode(value) {
      return $("<textarea/>").html(value).text();
    }

    function toggleSQL() {
      $("#sql-champion").toggleClass("invisible");
    }

    function loadXMLDoc(type) {
      var xmlhttp = new XMLHttpRequest();
      xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
          //console.log(this.responseText);
          // console.log(this);
          outputToTable(this);
        }
      };
      // if refactoring, make sure they don't request other files
      //xmlhttp.open("GET", "xml/" + type + ".xml", true);
      xmlhttp.open("GET", "xml/" + type, true);
      // override so it comes as xml
      //xmlhttp.overrideMimeType('application/xml'); // might want to try removing this!!!
      xmlhttp.send();
    }
    function outputToTable(responseObject) {
      //let response = ;
      //let responseXMLObject = ;
      // Uses jQuery to get the XML.
      //let responseXML =

      //console.log(x[0])
      //console.log(x[0].childNodes[1].innerHTML)
      //console.log(x[0].childNodes[3].innerHTML)
      //console.log(x[0].childNodes[5].innerHTML)

      // nextElementSibling.childNodes.text.data

      var table="<tr><th>Role</th><th>Champion1</th><th>Champion2</th><th>Champion3</th><th>Avg Win Rate Best Pick</th><th>Number of Champions in Role</th><th>Matchups Considered</th><th>Avg Winrate Champion1</th><th>Avg Winrate Champion2</th><th>Avg Winrate Champion3</th></tr>";
      // There is better way to do this but this seems to work. (using array indices)
      var x = $($(htmlDecode(responseObject.response))[4]).find("row")
      var i;
      for (i = 0; i <x.length; i++) {
        table += "<tr><td>" +
        x[i].childNodes[1].innerHTML + "</td><td>" +
        x[i].childNodes[3].innerHTML + "</td><td>" +
        x[i].childNodes[5].innerHTML + "</td><td>" +
        x[i].childNodes[7].innerHTML + "</td><td>" +
        x[i].childNodes[9].innerHTML + "</td><td>" +
        x[i].childNodes[11].innerHTML + "</td><td>" +
        x[i].childNodes[13].innerHTML + "</td><td>" +
        x[i].childNodes[15].innerHTML + "</td><td>" +
        x[i].childNodes[17].innerHTML + "</td><td>" +
        x[i].childNodes[19].innerHTML +
        "</td></tr>";
      }
      document.getElementById("the-table").innerHTML = table;
    }


}
