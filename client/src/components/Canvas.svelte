<script lang="ts">

import SvgContainer from "./SvgContainer.svelte";
import type {JsonPath} from "../../../lib/JsonPath";
import SvgPath from "./SvgPath.svelte";
import {getMousePosition} from "../utils/getMousePosition";
import {getMidpointsOfLine} from "../../../lib/LineMidpoints";
import {getLastElem} from "../../../lib/utils/ArrayUtils";
type Pen = 'cubic'
let svg = null
let cubicPath: JsonPath = {segments:[]}
let activePen: Pen | null = null

const togglePen = (pen: Pen) => {
  if(activePen === pen) activePen = null
  else activePen = pen
}
const handleClick = (e) => {
  const point = getMousePosition(e, svg)
  if(activePen === 'cubic') addCubic(e,point)
}
const similar = (n1: number, n2: number) => n1.toPrecision(2) === n2.toPrecision(2)
const addCubic = (e, p) => {
  const started = cubicPath.segments.length > 0
  if(!started){
    const startingPoint = p
    cubicPath.segments = [{type: 'move', absolute: true, end: startingPoint, handles: []}]
  }else if (started){
    const lastSeg = getLastElem(cubicPath.segments).end
    const firstSeg = cubicPath.segments[0].end
    if(similar(firstSeg.x, p.x) && similar(firstSeg.y, p.y)) {
      console.log('snapped')
      p = firstSeg
    }
    const [handleA, handleB] = getMidpointsOfLine({start: lastSeg, end: p, qty: 2})
    cubicPath.segments = [...cubicPath.segments, {type: 'cubic', handles: [handleA, handleB] , end: p, absolute: true}]
  }
}
let listeningForClick = false
$: if(!listeningForClick && svg) {
  listeningForClick = true
  svg.addEventListener('click', handleClick)
}
</script>

<div>

    <button on:click={()=>togglePen('cubic')}
            class:active={activePen==='cubic'}
            class="pen"
    >Cubic pen</button>

    <SvgContainer bind:svg>
        <SvgPath jsonPath={cubicPath} svg={svg}/>
    </SvgContainer>

</div>


<style>
    button.pen{
        border-radius: 0.25rem;
        border: 1px solid #0000;
        background: #0002;
        padding: 0.2rem;
    }
    button.active{
        background: #0006;
    }
</style>