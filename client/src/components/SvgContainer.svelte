
<script lang="ts">
    export let size: number = 100
    export let svg
</script>

<svg viewBox={`0 0 ${size} ${size}`} class="svgContainer" bind:this={svg}>
    <slot></slot>
</svg>


<style>
    svg.svgContainer{
        border: 1px solid black;
        margin: 1rem;
        background: white;
    }
</style>