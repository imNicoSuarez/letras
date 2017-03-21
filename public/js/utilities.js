/*********************************
** Load SVG
**
** Function for get external SVG 
** and incluid in the DOM.
**********************************/

function loadSVG(filename, callback) {

 if (typeof SVGRect != "undefined") {
    // Request the SVG file
    var ajax = new XMLHttpRequest();
    console.log(filename);
    ajax.open("GET", filename + ".svg", true);
    ajax.send();

    // Return SVG
    ajax.onload = function(e) {
      callback(ajax.responseText);		
    }
  } else {
  	// Fallback to png
  	callback("<img src='" + filename + ".png' />")
  }
}