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
    preference: 'light',
    fallback: 'light',
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
        {
          rel: 'preconnect',
          href: 'https://fonts.googleapis.com',
        },
        {
          rel: 'preconnect',
          href: 'https://fonts.gstatic.com',
          crossorigin: '',
        },
      ],
    },
  },

  // Static generation: prerender every page, follow links to find blog posts.
  nitro: {
    prerender: {
      crawlLinks: true,
      routes: ['/', '/blogs', '/labs'],
    },
  },
})
