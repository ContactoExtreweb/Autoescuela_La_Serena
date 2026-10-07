// @ts-check
import { defineConfig } from 'astro/config'
import tailwindcss from '@tailwindcss/vite'

// Web estática: el formulario va por Netlify Forms, no hace falta adaptador.
export default defineConfig({
  site: 'https://www.laserenaautoescuelas.com',
  vite: {
    plugins: [tailwindcss()],
  },
})
