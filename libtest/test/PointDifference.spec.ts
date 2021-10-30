import { pointDifference } from "../../lib/PointDifference"
import * as expect from "expect"

describe("find the point difference between two points", function () {
  it("should find the correct difference between two points", function () {
    const point1 = { x: 5, y: 10 }
    const point2 = { x: 2, y: 3 }
    const output = pointDifference(point1, point2)
    expect(output.x).toBe(-3)
    expect(output.y).toBe(-7)
  })
})
