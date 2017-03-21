$(function () {
  var fontHeight = ($(window).height() / 3) + "px",
      $editor = $(".js-editor");

  $editor.fitText(1.0, { factor: 5 });
  $editor.focus();

  $("html").on( "keydown", function(event) {
    var keyCode = event.which,
        colors = ["#ED5565", "#DA4453", "#FC6E51", "#E9573F", "#FFCE54", "#F6BB42", "#A0D468", "#8CC152",
                  "#48CFAD", "#37BC9B", "#4FC1E9", "#3BAFDA", "#5D9CEC", "#4A89DC", "#AC92EC", "#967ADC",
                  "#EC87C0", "#D770AD", "#434A54"],
        randomNum = Math.floor(Math.random() * colors.length),
        letterContainer;

    if ( keyCode == 8 ) {
    
      $editor.children().last().remove();
    
    } else if ( keyCode >= 48 && keyCode <= 90 ) {
      
      var urlSVGFile = "/resources/letter-" + String.fromCharCode(keyCode).toLowerCase();
      
      loadSVG(urlSVGFile, function(svg){
        $editor.append(svg);
        $editor.scrollTop($editor.prop("scrollHeight"));
      });
    }

    event.preventDefault();
    return false;
  } );
});
