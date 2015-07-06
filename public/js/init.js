var SymbolFactory = (function() {
  var symbolElements, allowedKeyCodes, cachedSvgs = [];
  allowedKeyCodes = [ 65 ];
  function loadSvg( url ) {
    return $.get( url );
  }
  function preloadSvgs() {
    var cachedLoadSvgPromises = [];
    return $.Deferred(function( dfd ) {
      var i = 0;
      allowedKeyCodes.forEach(function( symbol ) {
        cachedLoadSvgPromises[ i ] = loadSvg( "images/char-" + symbol + ".svg" );
        i++;
      });
      $.when.apply( $, cachedLoadSvgPromises ).done(function() {
        // collects returned data in the arguments.
        var args = Array.prototype.slice.call( arguments ), i = 0;
        allowedKeyCodes.forEach(function( keyCode ) {
          cachedSvgs[ keyCode ] = $( args[ i ] ).find( "svg" );
          i++;
        });
        dfd.resolve();
      });
    }).promise();
  }

  return {
    ready: function( fn ) {
      preloadSvgs().done( fn );
    },
    create: function( keyCode ) {
      var colors, strokeColor, symbolContainer, paths, pathLength, maxPathLength = -1;

      colors = ["red", "green", "blue", "orange", "pink", "gray", "brown", "black"];
      strokeColor = colors[ Math.floor(Math.random() * colors.length) ];

      symbolContainer = Snap(cachedSvgs[ keyCode ].clone().get(0));

      paths = symbolContainer.selectAll("path");
      paths.forEach(function( path ) {
        pathLength = path.getTotalLength();
        if ( pathLength > maxPathLength ) maxPathLength = pathLength;
        path.attr({
          stroke: strokeColor,
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
    },
  };
})();

$( document ).ready(function () {
  SymbolFactory.ready(function() {
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
    function appendSymbol( container, keyCode ) {
      var symbol;

      symbol = SymbolFactory.create( keyCode );
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
        appendSymbol( editor, keyCode );
      }

      sel = window.getSelection();

      editor.scrollTop(editor.prop("scrollHeight"));

      event.preventDefault();
      return false;
    });

  });
});
