var SymbolFactory = (function() {
  var colors, symbolElements;
  colors = ["red", "green", "blue", "orange", "pink", "gray", "brown", "black"];
  symbolElements = {
    'A': function() {
      var symbolContainer, paths, pathLength, maxPathLength = -1;
      symbolContainer = Snap.parse("<svg version=\"1.1\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" x=\"0px\" y=\"0px\" width=\"118.909px\" height=\"155.824px\" viewBox=\"0 0 118.909 155.824\" enable-background=\"new 0 0 118.909 155.824\" xml:space=\"preserve\"><g fill=\"none\" stroke-width=\"6\" stroke=\"" + colors[ Math.floor(Math.random() * colors.length) ] + "\" stroke-linejoin=\"round\" class=\"c-char-a\"><path class=\"c-char-a_first\" fill=\"none\" stroke-miterlimit=\"10\"d=\"M0.467,155.638L59.442,0.5h0.025l58.974,155.146\"/><path class=\"c-char-a_second\" fill=\"none\" stroke-miterlimit=\"10\" d=\"M18.006,109.5h83\"/></g></svg>");
      paths = symbolContainer.selectAll("path");
      paths.forEach(function( path ) {
        pathLength = path.getTotalLength();
        if ( pathLength > maxPathLength ) maxPathLength = pathLength;
        path.attr({
          strokeDasharray: pathLength + " " + pathLength,
          strokeDashoffset: pathLength
        });
      });
      return {
        element: function() { return $(symbolContainer.node); },
        animate: function() {
          var defChain = $.Deferred().resolve();
          paths.forEach(function( path ) {
            defChain = defChain.then(function() {
              var duration = 300;
              return $.Deferred(function( dfd ) {
                path.animate( { strokeDashoffset: "0" }, duration * path.getTotalLength() / maxPathLength, mina.linea, dfd.resolve );
              }).promise();
            });
          });
        }
      }
    }
  };

  return {
    create: function( character ) {
      return symbolElements[ character ]();
    },
  };
})();

$( document ).ready(function () {

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
    var symbol;

    symbol = SymbolFactory.create( symbol );
    container.append( symbol.element() );
    symbol.animate();

    moveCursorAfter( symbol.element()[0] );
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
