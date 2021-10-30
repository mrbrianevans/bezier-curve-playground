import {convertJsonToString, JsonPath} from "../../lib/JsonPath";
import * as expect from 'expect'

describe('convert json representation of path to a string', function () {
  it('should convert a single move segment correctly', function () {
    const json: JsonPath = {
      segments: [
        {type:'move', absolute: true, to: {x:10, y:20}}
      ]
    }
    const output = convertJsonToString(json)
    console.log(output)
    expect(output).toBe('M 10 20')
  });
  it('should convert a single line segment correctly', function () {
    const json: JsonPath = {
      segments: [
        {type:'line', absolute: false, to: {x:10, y:20}}
      ]
    }
    const output = convertJsonToString(json)
    console.log(output)
    expect(output).toBe('l 10 20')
  });
  it('should convert a single quadratic segment correctly', function () {
    const json: JsonPath = {
      segments: [
        {type:'quadratic', absolute: true, handle: {x: 10, y: 25}, end: {x: 12, y:32}}
      ]
    }
    const output = convertJsonToString(json)
    console.log(output)
    expect(output).toBe('Q 10 25, 12 32')
  });
  it('should convert a move and quadratic segment correctly', function () {
    const json: JsonPath = {
      segments: [
        {type:'move', absolute: true, to: {x:10, y:20}},
        {type:'quadratic', absolute: true, handle: {x: 30, y: 10}, end: {x: 50, y:20}}
      ]
    }
    const output = convertJsonToString(json)
    console.log(output)
    expect(output).toBe('M 10 20 Q 30 10, 50 20')
  });
});