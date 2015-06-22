$(function () {
  var fontHeight = ($(window).height() / 3) + "px",
      $editor = $(".js-editor");

  $editor.fitText(1.0, { factor: 5 });
  $editor.focus();

  $("html").on( "keydown" , function( event ) {
    var keyCode = event.which,
        colors = ["red", "green", "blue", "orange", "pink", "gray", "brown", "black"],
        i = Math.floor(Math.random() * colors.length),
        letterContainer;

    if ( keyCode == 8 ) {
      $editor.children().last().remove();
    } else if ( keyCode >= 48 && keyCode <= 90 ) {
      letterContainer = $("<span style=\"color: " + colors[i] + ";\">" + String.fromCharCode( keyCode ) + "</span>").hide();
      $editor.append( letterContainer );
      letterContainer.show('slow');

      $editor.scrollTop($editor.prop("scrollHeight"));
    }

    event.preventDefault();
    return false;
  } );
});
