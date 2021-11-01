import { Point } from "./JsonPath"

/**
 * Reflects a point (x,y) around another point (x1,y1).
 * Params: point to reflect, around point
 */
export function reflectPointAround(point: Point, around: Point): Point {
  return { x: 2 * around.x - point.x, y: 2 * around.y - point.y }
}

/*
Reference material: SVG specification https://www.w3.org/TR/SVG2/paths.html#ReflectedControlPoints
Formula:
If the current point is (curx, cury) and the final control point of the previous path segment is (oldx2, oldy2), then
the reflected point (i.e., (newx1, newy1), the first control point of the current path segment) is:
(newx1, newy1) = (curx - (oldx2 - curx), cury - (oldy2 - cury))
               = (2*curx - oldx2, 2*cury - oldy2)
 */
