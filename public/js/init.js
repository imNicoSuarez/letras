$(function () {
  var fontHeight = ($(window).height() / 3) + "px",
      $editor = $("#theEditor");

  $editor.focus();
  // $editor.css("line-height", fontHeight);

  $("body").keypress(function( event ) {
    var chr = event.charCode,
        colors = ["red", "green", "blue", "orange", "pink", "gray", "brown", "black"],
        i = Math.floor(Math.random() * colors.length);

    $editor.append("<span style=\"color: " + colors[i] + ";\">" + String.fromCharCode(chr) + "</span>");

    $editor.scrollTop($editor.prop("scrollHeight"));

    event.preventDefault();
  });
});
