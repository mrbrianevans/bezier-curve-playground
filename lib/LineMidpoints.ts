import { Point } from "./JsonPath"

export function getMidpointsOfLine({
  start,
  end,
  qty = 1
}: {
  start: Point
  end: Point
  qty?: number
}): Point[] {
  const portion = 1 / (qty + 1)
  return Array(qty)
    .fill(null)
    .map((e, i) => {
      const numerator = i + 1
      return {
        x: start.x + (end.x - start.x) * numerator * portion,
        y: start.y + (end.y - start.y) * numerator * portion
      }
    })
}
