import { Point } from "./JsonPath"

export const pointDifference = (p1: Point, p2: Point) => {
  return { x: p2.x - p1.x, y: p2.y - p1.y }
}

export const applyPointDifference = (point: Point, difference: Point) => {
  return { x: point.x + difference.x, y: point.y + difference.y }
}
