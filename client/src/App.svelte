<script lang="ts">
  import SvgContainer from "./components/SvgContainer.svelte";
  import SvgPath from "./components/SvgPath.svelte";
  import type {JsonPath} from "../../lib/JsonPath";
  import Canvas from "./components/Canvas.svelte";


  let jsonPath: JsonPath = {
    "segments": [{
      "type": "move",
      "absolute": true,
      "end": {"x": 10, "y": 20}, handles: []
    }, {
      "type": "quadratic",
      "absolute": true,
      "handle": {"x": 57.58685332665176, "y": 1.4645787013357816},
      "end": {"x": 50, "y": 20}, handles: [{"x": 57.58685332665176, "y": 1.4645787013357816}]
    }, {
      "type": "quadratic",
      "absolute": true,
      "handle": {"x": 25.91110389467226, "y": 68.90327104038893},
      "end": {"x": 50, "y": 60}, handles: [{"x": 25.91110389467226, "y": 68.90327104038893}]
    }, {
      "type": "cubic",
      "absolute": true,
      "handleB": {"x": 15.43767061474355, "y": 29.81948343480131},
      "handleA": {"x": 73.6801776348349, "y": 50.25545081027196},
      "end": {"x": 10, "y": 60}, handles: [{"x": 15.43767061474355, "y": 29.81948343480131},{"x": 73.6801776348349, "y": 50.25545081027196}]
    }]
  }
  let cubicOnly: JsonPath = {
    "segments": [{"type": "move", "end": {"x": 75, "y": 25}, handles: []}, {
      "type": "cubic",
      "handleA": {"x": 91.30619949617834, "y": 27.52043710506086},
      "handleB": {"x": 92.32799786495187, "y": 72.22411573890291},
      "end": {"x": 75, "y": 75},
      "absolute": true, handles: [{"x": 91.30619949617834, "y": 27.52043710506086},{"x": 92.32799786495187, "y": 72.22411573890291}]
    }, {
      "type": "cubic",
      "handleA": {"x": 47.11342004672306, "y": 78.61035554373748},
      "handleB": {"x": 32.55279329170022, "y": 98.79087332701475},
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
