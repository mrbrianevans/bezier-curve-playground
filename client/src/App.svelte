<script lang="ts">
  import SvgContainer from "./components/SvgContainer.svelte";
  import SvgPath from "./components/SvgPath.svelte";
  import type {JsonPath} from "../../lib/JsonPath";
  import Canvas from "./components/Canvas.svelte";


  let jsonPath: JsonPath = {"segments":[{"type":"move","absolute":true,"end":{"x":11.371400801337758,"y":24.127069073730652},"handles":[]},{"type":"quadratic","absolute":true,"end":{"x":50,"y":20},"handles":[{"x":37.89919714534928,"y":8.634811473515672}]},{"type":"quadratic","absolute":true,"end":{"x":50,"y":60},"handles":[{"x":65.4110653004147,"y":37.0380233998648}]},{"type":"cubic","absolute":true,"end":{"x":10,"y":60},"handles":[{"x":35.19677012482242,"y":81.86698585285781},{"x":24.282355127471906,"y":44.811215961408244}]}]}
  let cubicOnly: JsonPath = {
    "segments": [{"type": "move", "end": {"x": 75, "y": 25}, handles: []}, {
      "type": "cubic",
      "end": {"x": 75, "y": 75},
      "absolute": true, handles: [{"x": 91.30619949617834, "y": 27.52043710506086},{"x": 92.32799786495187, "y": 72.22411573890291}]
    }, {
      "type": "cubic",
      "end": {"x": 25, "y": 75},
      "absolute": true, handles: [{"x": 47.11342004672306, "y": 78.61035554373748}, {"x": 32.55279329170022, "y": 98.79087332701475}]
    }]
  }
  let cubicString
  $: cubicString = JSON.stringify(cubicOnly)
  let svg = null
</script>

<main>
    <h1>Bézier cubic canvas</h1>
    <Canvas/>
    <hr/>
    <h1>SVG Bézier curves</h1>

    <SvgContainer bind:svg>
        <SvgPath jsonPath={jsonPath} svg={svg}/>
        <SvgPath jsonPath={cubicOnly} svg={svg}/>
    </SvgContainer>

    <button on:click={()=>{cubicOnly=cubicOnly;jsonPath=jsonPath}}>Rerender</button>
    <p>Path 1</p>
    <pre>
    {JSON.stringify(jsonPath)}
  </pre>
    <p>Path 2</p>
    <pre>
    {JSON.stringify(cubicOnly)}
  </pre>
</main>

<style>
    main {
        text-align: center;
        padding: 1em;
        margin: 0 auto;
    }

    pre {
        white-space: pre-wrap;
    }
</style>
