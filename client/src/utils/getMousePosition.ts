export function getMousePosition(evt, svg) {
  let CTM = svg.getScreenCTM()
  return {
    x: (evt.clientX - CTM.e) / CTM.a,
    y: (evt.clientY - CTM.f) / CTM.d
  }
}
