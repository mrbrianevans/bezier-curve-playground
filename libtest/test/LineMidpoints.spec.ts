import { getMidpointsOfLine } from "../../lib/LineMidpoints"
import * as expect from "expect"

describe("find the midpoints of any line", function () {
  it("should find the midpoint of a horizontal line", function () {
    const start = { x: 0, y: 0 },
      end = { x: 10, y: 0 }
    const [midpoint] = getMidpointsOfLine({ start, end })
    expect(midpoint.x).toBe(5)
    expect(midpoint.y).toBe(0)
  })

  it("should find 2 midpoints of a horizontal line", function () {
    const start = { x: 0, y: 0 },
      end = { x: 12, y: 0 }
    const [midpoint1, midpoint2] = getMidpointsOfLine({ start, end, qty: 2 })
    expect(midpoint1.x).toBe(4)
    expect(midpoint1.y).toBe(0)
    expect(midpoint2.x).toBe(8)
    expect(midpoint2.y).toBe(0)
  })
})
