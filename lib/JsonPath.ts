export interface JsonPath {
  segments: Segment[]
}
// types of segments:
// M point
// C point point point
// Q point point
// L point

export interface PathSegment{
  type: 'move' | 'cubic' | 'quadratic' | 'line'
  absolute?: boolean
}
interface Point {
  x: number,
  y: number
}
interface MoveSegment extends PathSegment{
  type: 'move'
  to: Point
}

interface LineSegment extends PathSegment{
  type: 'line'
  to: Point
}

interface CubicSegment extends PathSegment{
  type: 'cubic',
  handleA: Point,
  handleB: Point,
  end: Point
}

interface QuadraticSegment extends PathSegment{
  type: 'quadratic',
  handle: Point,
  end: Point
}

type Segment = MoveSegment | LineSegment | CubicSegment | QuadraticSegment

let seg: Segment = {
  type: 'line',
  to: {x:1,y:1}
}

seg = {
  type: 'cubic',
  handleA:  {x:1,y:1},
  handleB:  {x:1,y:1},
  end:  {x:1,y:1}
}
const stringifyPoint = (p: Point) => {
  return `${p.x} ${p.y}`
}
const getChar = seg => {
  const char = seg.type[0]
  if(seg.absolute) return char.toUpperCase()
  return char.toLowerCase()
}
export const convertJsonToString = (jsonPath: JsonPath): string => {
  return jsonPath.segments.map(seg=>{
    switch (seg.type) {
      case "move":
      case "line":
        return `${getChar(seg)} ${stringifyPoint(seg.to)}`
      case "cubic":
        return `${getChar(seg)} ${stringifyPoint(seg.handleA)}, ${stringifyPoint(seg.handleB)}, ${stringifyPoint(seg.end)}`
      case "quadratic":
        return `${getChar(seg)} ${stringifyPoint(seg.handle)}, ${stringifyPoint(seg.end)}`
    }
  }).join(' ')
}