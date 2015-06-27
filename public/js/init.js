$(function () {

  var fontHeight = ($(window).height() / 3) + "px",
      editor = $(".js-editor");

  editor.fitText(1.0, { factor: 5 });
  editor.focus();

  function moveCursorAfter( node ) {
    var sel = window.getSelection(),
        range = document.createRange();

    range.setStartAfter( node );
    range.collapse( true );
    sel.removeAllRanges();
    sel.addRange( range );
  }

  // Symbols can be, e.g. "A", "1", "&nbsp;", etc.
  function appendSymbol( container, symbol ) {
    var colors = ["red", "green", "blue", "orange", "pink", "gray", "brown", "black"],
        i = Math.floor(Math.random() * colors.length),
        symbolContainer;

        symbolContainer = $("<span><svg version=\"1.1\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" x=\"0px\" y=\"0px\" width=\"118.909px\" height=\"155.824px\" viewBox=\"0 0 118.909 155.824\" enable-background=\"new 0 0 118.909 155.824\" xml:space=\"preserve\"><g fill=\"none\" stroke-width=\"5\" stroke=\"" + colors[i] + "\" class=\"c-char-a\"><path class=\"c-char-a_first\" fill=\"none\" stroke-miterlimit=\"10\"d=\"M0.467,155.638L59.442,0.5h0.025l58.974,155.146\"/><path class=\"c-char-a_second\" fill=\"none\" stroke-miterlimit=\"10\" d=\"M18.006,109.5h83\"/></g></svg></span>");

    var paths, lengths;

    paths = [ Snap( symbolContainer.find(".c-char-a_first").get(0) ), Snap( symbolContainer.find(".c-char-a_second").get(0) ) ];
    lengths = [ paths[0].getTotalLength(), paths[1].getTotalLength() ];

    paths[0].attr({
      strokeDasharray: lengths[0] + " " + lengths[0],
      strokeDashoffset: lengths[0]
    });

    paths[1].attr({
      strokeDasharray: lengths[1] + " " + lengths[1],
      strokeDashoffset: lengths[1]
    });

    container.append( symbolContainer );

    paths[0].animate({
      strokeDashoffset: "0"
    }, 300, mina.linear, function() {
      paths[1].animate({
        strokeDashoffset: "0"
      }, 100);
    });

    moveCursorAfter( symbolContainer[0] );
  }

  $("html").keydown( function( event ) {
    var keyCode = event.which,
        sel, range, caretTop;

    editor.focus();

    if ( keyCode == 8 ) {
      editor.children().last().remove();
    } else if ( keyCode >= 48 && keyCode <= 90 ) {
      appendSymbol( editor, String.fromCharCode( keyCode ) );
    } else if ( keyCode == 32 ) {
      appendSymbol( editor, "&nbsp;" );
    }

    sel = window.getSelection();

    editor.scrollTop(editor.prop("scrollHeight"));

    event.preventDefault();
    return false;
  } );

});
