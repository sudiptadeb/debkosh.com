<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup lang="ts">
// Site-wide defaults. Per-page overrides come from useSeoMeta in each page.
const route = useRoute()

useHead({
  titleTemplate: (title) => (title ? `${title} · Sudipta Deb` : 'Sudipta Deb · debkosh.com'),
  link: [
    {
      rel: 'canonical',
      href: computed(() => `https://debkosh.com${route.path === '/' ? '' : route.path}`),
    },
  ],
})

useSeoMeta({
  ogType: 'website',
  ogSiteName: 'Sudipta Deb',
  twitterCard: 'summary_large_image',
})
</script>
