<script lang="ts">
    import type {JsonPath} from "../../../lib/JsonPath";
    import {convertJsonToString} from "../../../lib/JsonPath";
    import {onMount} from "svelte";

    export let jsonPath: JsonPath

    let draw: string
    $: draw = jsonPath?convertJsonToString(jsonPath):''
    let handles = jsonPath.segments.map(()=>undefined)
    export let svg

    function getMousePosition(evt) {
      var CTM = svg.getScreenCTM();
      return {
        x: (evt.clientX - CTM.e) / CTM.a,
        y: (evt.clientY - CTM.f) / CTM.d
      };
    }
    const dragStart = (index, handle) => () => {
      const dragger = drag(index, handle)
      svg.addEventListener('mousemove', dragger)
      // cleans itself up
      function removeListener(){
        svg.removeEventListener('mousemove', dragger)
        svg.removeEventListener('mouseleave', removeListener)
        svg.removeEventListener('mouseup', removeListener)
      }
      svg.addEventListener('mouseleave', removeListener)
      svg.addEventListener('mouseup', removeListener)
    }
    const drag = (index, handle) => (e: MouseEvent) => {
      e.preventDefault()
      const xy = getMousePosition(e)
      jsonPath.segments[index][handle] = xy
    }
    let focused = false
    let group
    let listeningForFocus = false
    $: if(listeningForFocus === false && svg) {
      listeningForFocus = true
      console.log('listening for focus click')
      svg.addEventListener('mousedown', (e) => {
        // console.log(e.target.parentElement === group)
        focused = e.target.parentElement === group
      })
    }
</script>

<g bind:this={group} class:focus={focused}>
    <path d={draw} class={'path'} on:click={e=>focused=true}></path>
{#each jsonPath.segments as segment, index}
    {#if segment.type === 'cubic'}
        <circle r="1" cx={segment.handleA.x} cy={segment.handleA.y}
                class="cubic handle"
                on:mousedown={dragStart(index, 'handleA')}
        ></circle>
        <circle r="1" cx={segment.handleB.x} cy={segment.handleB.y}
                class="cubic handle"
                on:mousedown={dragStart(index, 'handleB')}
        ></circle>
    {/if}
    {#if segment.type === 'quadratic'}
        <circle r="1" cx={segment.handle.x} cy={segment.handle.y}
                class="quadratic handle"
                on:mousedown={dragStart(index, 'handle')}
        ></circle>
    {/if}
{/each}
</g>

<style>
    path.path{
        fill: none;
        stroke: black;
        stroke-width: 3px;
    }
    g.focus path{
        stroke: brown;
    }
    circle.handle{
        stroke: #0002;
        fill: #0001;
        stroke-width: 0.025rem;
    }
    g.focus circle.handle{
        fill: rgba(19, 51, 56, 0.2);
        stroke: #0007;
    }
</style>