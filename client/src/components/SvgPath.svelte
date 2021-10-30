<script lang="ts">
  import type { JsonPath } from "../../../lib/JsonPath"
  import { convertJsonToString } from "../../../lib/JsonPath"
  import { getMousePosition } from "../utils/getMousePosition"
  import { applyPointDifference, pointDifference } from "../../../lib/PointDifference"

  export let jsonPath: JsonPath

  let draw: string
  $: draw = jsonPath ? convertJsonToString(jsonPath) : ""
  export let svg

  const dragStart = (index, handle) => () => {
    console.log("Now dragging", index, typeof handle === "number" ? "handle" : handle)
    const dragger = drag(index, handle)
    svg.addEventListener("mousemove", dragger)

    // cleans itself up
    function removeListener() {
      svg.removeEventListener("mousemove", dragger)
      svg.removeEventListener("mouseleave", removeListener)
      svg.removeEventListener("mouseup", removeListener)
    }

    svg.addEventListener("mouseleave", removeListener)
    svg.addEventListener("mouseup", removeListener)
  }
  const drag = (index, handle) => (e: MouseEvent) => {
    e.preventDefault()
    const xy = getMousePosition(e, svg)
    if (handle === "end") {
      const shift = pointDifference(jsonPath.segments[index][handle], xy)
      jsonPath.segments[index][handle] = xy
      const nearest = jsonPath.segments[index]["handles"].length - 1
      if (nearest >= 0) jsonPath.segments[index]["handles"][nearest] = applyPointDifference(jsonPath.segments[index]["handles"][nearest], shift)
      if (jsonPath.segments[index + 1]?.handles.length > 0) {
        jsonPath.segments[index + 1]["handles"][0] = applyPointDifference(jsonPath.segments[index + 1]["handles"][0], shift)
      } else if (jsonPath.segments.length === index + 1) {
        // snap to close path
      }
    } else {
      jsonPath.segments[index]["handles"][handle] = xy
    }
  }
  let focused = false
  let group
  let listeningForFocus = false
  $: if (listeningForFocus === false && svg) {
    listeningForFocus = true
    svg.addEventListener("mousedown", (e) => {
      focused = e.target.parentElement === group
    })
  }
</script>

<g bind:this={group} class:focus={focused}>
  <path d={draw} class={'path'} on:click={e=>focused=true}></path>
  {#if focused}
    {#each jsonPath.segments as segment, index}
      <!-- rectangle for each "end" point -->
      <rect class="point" x={segment.end.x-0.5} y={segment.end.y-0.5}
            on:mousedown={dragStart(index, 'end')}>
        <!-- minus 0.5 from x and y to compensate for 1px width and height -->
      </rect>
      {#each segment.handles as handle, handleIndex}
        <!-- circle for each handle -->
        <circle r="1" cx={handle.x} cy={handle.y}
                class={"handle "+segment.type}
                on:mousedown={dragStart(index, handleIndex)}
        ></circle>
        <!-- line to "end" point from each handle -->
        {#if jsonPath.segments[index - 1 + handleIndex]}
          <line x1={handle.x} y1={handle.y} x2={jsonPath.segments[index - 1 + handleIndex].end.x}
                y2={jsonPath.segments[index - 1 + handleIndex].end.y} class="handleConnector"></line>
        {/if}
      {/each}
    {/each}
  {/if}
</g>

<style>
    path.path {
        fill: none;
        stroke: #0007;
        stroke-width: 3px;
    }

    g.focus path {
        stroke: #00a8ff;
    }

    circle.handle {
        stroke: #0002;
        fill: #0001;
        stroke-width: 0.025rem;
    }

    g.focus circle.handle {
        fill: rgba(19, 51, 56, 0.2);
        stroke: #0007;
    }

    rect.point {
        width: 1px;
        height: 1px;
        stroke-width: 0.025rem;
        stroke: #0002;
        fill: #0001;
    }

    g.focus rect.point {
        fill: rgba(19, 51, 56, 0.2);
        stroke: #0007;
    }

    line.handleConnector {
        stroke: #0005;
        stroke-width: 0.025rem;
    }
</style>