export interface JsonPath {
  segments: Segment[]
}
// types of segments:
// M point
// C point point point
// Q point point
// L point

export interface PathSegment {
  type:
    | "move"
    | "cubic"
    | "quadratic"
    | "line"
    | "smoothCubic"
    | "tsmoothQuadratic"
    | "zeroClosePath"
  absolute?: boolean
  end: Point
  handles: Point[]
}
export interface Point {
  x: number
  y: number
}
interface MoveSegment extends PathSegment {
  type: "move"
  handles: []
}

interface LineSegment extends PathSegment {
  type: "line"
  handles: []
}

export interface CubicSegment extends PathSegment {
  type: "cubic"
  handles: [Point, Point]
}

interface QuadraticSegment extends PathSegment {
  type: "quadratic"
  handles: [Point]
}

interface SmoothCubicSegment extends PathSegment {
  type: "smoothCubic"
  handles: [Point]
}

interface SmoothQuadraticSegment extends PathSegment {
  type: "tsmoothQuadratic"
  handles: []
}
interface ZeroClosePathSegment extends PathSegment {
  type: "zeroClosePath"
  handles: []
}

type Segment =
  | MoveSegment
  | LineSegment
  | CubicSegment
  | QuadraticSegment
  | SmoothCubicSegment
  | SmoothQuadraticSegment
  | ZeroClosePathSegment

let seg: Segment = {
  type: "line",
  end: { x: 1, y: 1 },
  handles: []
}

seg = {
  type: "cubic",
  handles: [
    { x: 1, y: 1 },
    { x: 1, y: 1 }
  ],
  end: { x: 1, y: 1 }
}
const stringifyPoint = (p: Point) => {
  return `${p.x} ${p.y}`
}
const getChar = (seg) => {
  const char = seg.type[0]
  if (seg.absolute) return char.toUpperCase()
  return char.toLowerCase()
}
export const convertJsonToString = (jsonPath: JsonPath): string => {
  return jsonPath.segments
    .map((seg) => {
      return [
        getChar(seg),
        [...seg.handles, seg.end].map((h) => stringifyPoint(h)).join(", ")
      ]
        .filter((s) => String(s).length > 0)
        .join(" ")
    })
    .join(" ")
}
