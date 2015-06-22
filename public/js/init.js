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

  function insertAtCursor( node ) {
    var sel, range;
    sel = window.getSelection();
    range = sel.getRangeAt(0);
    if ( range.collapsed && range.endContainer.nodeType == 3 ) {
      // selected node is text. we need to select its parent.
      range.setStartAfter( range.endContainer.parentNode );
    } else {
      // span elements can only contain 1 character so the selection contains 1..N span elements.
      range.deleteContents();
    }
    range.insertNode( node );

    moveCursorAfter( node );
  }

  editor.click( function( event ) {
    moveCursorAfter( editor.children().last()[0] );
  } );

  editor.keypress( function( event ) {
    var chr = event.charCode,
    colors = ["red", "green", "blue", "orange", "pink", "gray", "brown", "black"],
    i = Math.floor(Math.random() * colors.length),
      span = $("<span style=\"color: " + colors[i] + ";\">" + String.fromCharCode(chr) + "</span>");

    insertAtCursor( span[0] );

    moveCursorAfter( editor.children().last()[0] );

    event.preventDefault();
  } );

});
