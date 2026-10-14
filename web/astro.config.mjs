// @ts-check
import { defineConfig, sessionDrivers } from 'astro/config'
import tailwindcss from '@tailwindcss/vite'
import netlify from '@astrojs/netlify'

// Casi todo es estático. Las páginas que enseñan lo que la autoescuela sube desde /admin (portada, galería,
// fichas de permiso y la autoescuela) llevan `prerender = false`: se sirven bajo demanda con caché corta.
export default defineConfig({
  site: 'https://www.laserenaautoescuelas.com',
  // Sin sesiones de Astro: la web no las usa. Con las de Netlify Blobs por defecto, `npm run dev` fallaba
  // (@netlify/blobs no queda instalado arriba del todo) y en local intentaba arrancar Deno para las edge functions.
  session: { driver: sessionDrivers.memory() },
  adapter: netlify({ devFeatures: { edgeFunctions: false } }),
  vite: {
    plugins: [tailwindcss()],
  },
})
