// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-01-01',
  devtools: { enabled: true },

  modules: ['@nuxt/content', '@nuxtjs/color-mode', '@nuxtjs/sitemap'],

  css: ['~/assets/css/tokens.css', '~/assets/css/prose.css'],

  // Site-wide metadata, also consumed by the sitemap module.
  site: {
    url: 'https://debkosh.com',
    name: 'Sudipta Deb',
  },

  // Light/dark, persisted, written as data-theme on <html> to match the
  // Deb Design System tokens. No flash on load (module injects an inline guard).
  colorMode: {
    preference: 'dark',
    fallback: 'dark',
    classSuffix: '',
    dataValue: 'theme',
    storageKey: 'debkosh-theme',
  },

  content: {
    // Inline `code` chips only; no fenced code blocks in these posts, so
    // skip the syntax highlighter to keep the build lean.
    markdown: {
      anchorLinks: false,
    },
  },

  app: {
    head: {
      htmlAttrs: { lang: 'en' },
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      ],
      link: [
        { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
        // Self-hosted fonts (see assets/css/tokens.css @font-face). Preload the
        // two above-the-fold faces; Space Mono 700 loads on demand.
        {
          rel: 'preload',
          as: 'font',
          type: 'font/woff2',
          href: '/fonts/space-grotesk-var.woff2',
          crossorigin: '',
        },
        {
          rel: 'preload',
          as: 'font',
          type: 'font/woff2',
          href: '/fonts/space-mono-400.woff2',
          crossorigin: '',
        },
        {
          rel: 'alternate',
          type: 'application/rss+xml',
          title: 'Sudipta Deb · blog',
          href: '/rss.xml',
        },
      ],
    },
  },

  // Static generation: prerender every page, follow links to find blog posts.
  // The preset is pinned to `static` so Nitro does not auto-detect Cloudflare
  // Workers Builds and switch to its server preset, which generates a redirected
  // wrangler config expecting a server entry-point and breaks `wrangler deploy`
  // of the assets-only Worker defined in wrangler.toml.
  nitro: {
    preset: 'static',
    prerender: {
      crawlLinks: true,
      routes: ['/', '/blogs', '/labs', '/rss.xml'],
    },
  },
})
