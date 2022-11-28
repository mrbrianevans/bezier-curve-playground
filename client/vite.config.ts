import { defineConfig } from "vite"
import { svelte } from "@sveltejs/vite-plugin-svelte"
import sveltePreprocess from "svelte-preprocess"

const svelteConfig = {
  // Consult https://github.com/sveltejs/svelte-preprocess
  // for more information about preprocessors
  preprocess: sveltePreprocess()
}

// https://vitejs.dev/config/
export default defineConfig({
  base: "/bezier-curve-playground/",
  plugins: [svelte(svelteConfig)]
})
