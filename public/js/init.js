$(function () {
  var fontHeight = ($(window).height() / 3) + "px",
      $editor = $("#theEditor");

  $editor.fitText(1.0, { factor: 5 });
  $editor.focus();

  $("body").keypress(function( event ) {
    var chr = event.charCode,
        colors = ["red", "green", "blue", "orange", "pink", "gray", "brown", "black"],
        i = Math.floor(Math.random() * colors.length),
        span = $("<span style=\"color: " + colors[i] + ";\">" + String.fromCharCode(chr) + "</span>").hide();


    $editor.append(span);
    span.show('slow');

    $editor.scrollTop($editor.prop("scrollHeight"));

    event.preventDefault();
  });
});
