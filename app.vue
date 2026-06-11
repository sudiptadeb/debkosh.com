<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup lang="ts">
// Site-wide defaults. Per-page overrides come from useSeoMeta in each page.
useHead({
  titleTemplate: (title) => (title ? `${title} · Sudipta Deb` : 'Sudipta Deb · debkosh.com'),
})

useSeoMeta({
  ogType: 'website',
  ogSiteName: 'Sudipta Deb',
  twitterCard: 'summary_large_image',
})
</script>
