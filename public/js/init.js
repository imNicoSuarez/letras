$(function () {
  $("body").keypress(function( event ) {
    var obj = $("#theEditor"),
        chr = event.charCode,
        colors = ["red", "green", "blue", "orange", "pink", "gray", "brown", "black"],
        i = Math.floor(Math.random() * colors.length);

    obj.append("<span style=\"color: " + colors[i] + ";\">" + String.fromCharCode(chr) + "</span>");
    event.preventDefault();
  });
});
