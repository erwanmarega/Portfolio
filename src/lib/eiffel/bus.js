// Tiny bridge between the fixed Eiffel scene and the sections: lets a section ask a floor to glow.

let highlightHandler = null;
let pendingHighlight = null;

export function setTowerHighlight(y) {
  pendingHighlight = y;
  highlightHandler?.(y);
}

export function registerHighlightHandler(fn) {
  highlightHandler = fn;
  if (fn && pendingHighlight !== null) fn(pendingHighlight);
  return () => {
    if (highlightHandler === fn) highlightHandler = null;
  };
}
