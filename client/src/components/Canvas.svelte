<script lang="ts">

    import SvgContainer from "./SvgContainer.svelte"
    import type { JsonPath } from "../../../lib/JsonPath"
    import SvgPath from "./SvgPath.svelte"
    import { getMousePosition } from "../utils/getMousePosition"
    import { getMidpointsOfLine } from "../../../lib/LineMidpoints"
    import { getLastElem } from "../../../lib/utils/ArrayUtils"

    type Pen =  null | JsonPath['segments'][number]['type']
  let svg = null
  let cubicPath: JsonPath = { segments: [] }
  let activePen: Pen | null = null

  const togglePen = (pen: Pen) => {
    if (activePen === pen) activePen = null
    else activePen = pen
  }
  const handleClick = (e) => {
    let point = getMousePosition(e, svg)
    if(activePen !== null){
        const started = cubicPath.segments.length > 0
          if (!started) {
              cubicPath.segments = [{ type: "move", absolute: true, end: point, handles: [] }]
          }else{
              const handlesQty = activePen === 'cubic' ? 2: 1
              const lastSeg = getLastElem(cubicPath.segments).end
              const firstSeg = cubicPath.segments[0].end
              const closesPath = similar(firstSeg.x, point.x) && similar(firstSeg.y, point.y)
              if (closesPath) point = firstSeg
              const handles = getMidpointsOfLine({ start: lastSeg, end: point, qty: handlesQty })
              //@ts-ignore
              cubicPath.segments = [...cubicPath.segments, {
                  type: activePen,
                  handles,
                  end: point,
                  absolute: true
              }]
              if(closesPath){
                  console.log('Path closed')
                  cubicPath.segments = [...cubicPath.segments, {
                      type: "zeroClosePath",
                      handles: [],
                      end: point,
                      absolute: true
                  }]
              }
          }
    }
  }
  const nearest = (num: number, nearestUnit: number) => Math.round(num / nearestUnit) * nearestUnit
  const similar = (n1: number, n2: number) => nearest(n1, 10) === nearest(n2, 10)
  let listeningForClick = false
  $: if (!listeningForClick && svg) {
    listeningForClick = true
    svg.addEventListener("click", handleClick)
  }
</script>

<div>
  {#each ['cubic', 'quadratic', 'smoothCubic', 'tsmoothQuadratic'] as penType}
    <button on:click={()=>togglePen(penType)}
            class:active={activePen===penType}
            class="pen"
    >{penType}
    </button>
  {/each}
  <SvgContainer bind:svg>
    <SvgPath jsonPath={cubicPath} svg={svg} bind:activePen />
  </SvgContainer>

</div>


<style>
    button.pen {
        border-radius: 0.25rem;
        border: 1px solid #0000;
        background: #0002;
        padding: 0.2rem;
    }

    button.active {
        background: #0006;
    }
</style>