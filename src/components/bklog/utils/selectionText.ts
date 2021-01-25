// Usage:
// var x = document.querySelector('[contenteditable]');
// var caretPosition = getSelectionDirection(x) !== 'forward' ? getSelectionStart(x) : getSelectionEnd(x);
// setSelectionRange(x, caretPosition + 1, caretPosition + 1);
// var value = getValue(x);

// it will not work with "<img /><img />" and, perhaps, in many other cases.

export function isAfter(container:any, offset:any, node:any):any {
  var c = node;
  while (c.parentNode !== container) {
    c = c.parentNode;
  }
  var i = offset;
  while (c !== null && i > 0) {
    c = c.previousSibling;
    i -= 1;
  }
  return i > 0;
}

export function compareCaretPositons(node1: any, offset1: any, node2: any, offset2: any): any {
  if (node1 === node2) {
    return offset1 - offset2;
  }
  var c = node1.compareDocumentPosition(node2);
  if ((c & Node.DOCUMENT_POSITION_CONTAINED_BY) !== 0) {
    return isAfter(node1, offset1, node2) ? +1 : -1;
  } else if ((c & Node.DOCUMENT_POSITION_CONTAINS) !== 0) {
    return isAfter(node2, offset2, node1) ? -1 : +1;
  } else if ((c & Node.DOCUMENT_POSITION_FOLLOWING) !== 0) {
    return -1;
  } else if ((c & Node.DOCUMENT_POSITION_PRECEDING) !== 0) {
    return +1;
  }
}

export function stringifyElementStart(node: any, isLineStart: any): any {
  if (node.tagName.toLowerCase() === 'br') {
    if (true) {
      return '\n';
    }
  }
  if (node.tagName.toLowerCase() === 'div') { // Is a block-level element?
    if (!isLineStart) { //TODO: Is not at start of a line?
      return '\n';
    }
  }
  return '';
}

export function* positions(node:any, isLineStart = true):any {
  console.assert(node.nodeType === Node.ELEMENT_NODE);
  var child = node.firstChild;
  var offset = 0;
  yield {node: node, offset: offset, text: stringifyElementStart(node, isLineStart)};
  while (child != null) {
    if (child.nodeType === Node.TEXT_NODE) {
      yield {node: child, offset: 0/0, text: child.data};
      isLineStart = false;
    } else {
      isLineStart = yield* positions(child, isLineStart);
    }
    child = child.nextSibling;
    offset += 1;
    yield {node: node, offset: offset, text: ''};
  }
  return isLineStart;
}

export function getCaretPosition(contenteditable: any, textPosition: any): any {
  var textOffset = 0;
  var lastNode = null;
  var lastOffset = 0;
  for (var p of positions(contenteditable)) {
    if (p.text.length > textPosition - textOffset) {
      return {node: p.node, offset: p.node.nodeType === Node.TEXT_NODE ? textPosition - textOffset : p.offset};
    }
    textOffset += p.text.length;
    lastNode = p.node;
    lastOffset = p.node.nodeType === Node.TEXT_NODE ? p.text.length : p.offset;
  }
  return {node: lastNode, offset: lastOffset};
}

export function getTextOffset(contenteditable: any, selectionNode: any, selectionOffset: any): any {
  var textOffset = 0;
  for (var p of positions(contenteditable)) {
    if (selectionNode.nodeType !== Node.TEXT_NODE && selectionNode === p.node && selectionOffset === p.offset) {
      return textOffset;
    }
    if (selectionNode.nodeType === Node.TEXT_NODE && selectionNode === p.node) {
      return textOffset + selectionOffset;
    }
    textOffset += p.text.length;
  }
  return compareCaretPositons(selectionNode, selectionOffset, contenteditable, 0) < 0 ? 0 : textOffset;
}

export function getValue(contenteditable: any): any{
  var value = '';
  for (var p of positions(contenteditable)) {
    value += p.text;
  }
  return value;
}

export function setSelectionRange(contenteditable: any, start: any, end: any): any {
  var selection:any = window.getSelection();
  var s = getCaretPosition(contenteditable, start);
  var e = getCaretPosition(contenteditable, end);
  selection.setBaseAndExtent(s.node, s.offset, e.node, e.offset);
}

//TODO: Ctrl+A - rangeCount is 2
export function getSelectionDirection(contenteditable: any): any {
  var selection:any = window.getSelection();
  var c = compareCaretPositons(selection.anchorNode, selection.anchorOffset, selection.focusNode, selection.focusOffset);
  return c < 0 ? 'forward' : 'none';
}

export function getSelectionStart(contenteditable: any): any {
  var selection: any = window.getSelection();
  var c = compareCaretPositons(selection.anchorNode, selection.anchorOffset, selection.focusNode, selection.focusOffset);
  return c < 0 ? getTextOffset(contenteditable, selection.anchorNode, selection.anchorOffset) : getTextOffset(contenteditable, selection.focusNode, selection.focusOffset);
}

export function getSelectionEnd(contenteditable: any): any {
  var selection: any = window.getSelection();
  var c = compareCaretPositons(selection.anchorNode, selection.anchorOffset, selection.focusNode, selection.focusOffset);
  return c < 0 ? getTextOffset(contenteditable, selection.focusNode, selection.focusOffset) : getTextOffset(contenteditable, selection.anchorNode, selection.anchorOffset);
}