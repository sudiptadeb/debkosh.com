<template>
  <div v-if="post">
    <SiteHeader :max-width="880" nav-gap="16px">
      <template #brand>
        <NuxtLink to="/blogs" class="back-link">
          <Icon name="arrow-left" :size="14" />
          debkosh.com/blogs
        </NuxtLink>
      </template>
      <template #nav>
        <span class="hdr-brand">
          <DMark :size="22" :font-size="12" />
          <span class="hdr-name">Sudipta Deb</span>
        </span>
      </template>
    </SiteHeader>

    <article class="article">
      <div v-if="eyebrow" class="article-eyebrow">{{ eyebrow }}</div>
      <h1 class="article-title">{{ post.heading || post.title }}</h1>
      <div class="article-meta">
        <span>{{ longDate(post.date) }}</span>
        <span v-if="post.minutes">{{ post.minutes }} min read</span>
        <span>Sudipta Deb</span>
      </div>

      <div v-if="post.short" class="short-card">
        <div class="short-label">The short version</div>
        <p class="short-text">{{ post.short }}</p>
      </div>

      <ContentRenderer :value="post" class="prose-deb article-body">
        <template #empty>
          <p class="article-stub">This one is still being written up. The LinkedIn version came first, the long-form lands here soon.</p>
        </template>
      </ContentRenderer>

      <div class="end-matter">
        <span>Posted first on</span>
        <a href="https://www.linkedin.com/in/-sudiptadeb" target="_blank" rel="noopener">LinkedIn</a>
      </div>

      <NuxtLink v-if="next" :to="postRoute(next)" class="next-card">
        <span class="next-text">
          <span class="next-label">Next in the series</span>
          <span class="next-title">Part {{ next.part }}: {{ next.heading || next.title }}</span>
        </span>
        <Icon name="arrow-right" :size="16" stroke="var(--fg-3)" />
      </NuxtLink>

      <nav class="post-nav">
        <NuxtLink v-if="older" :to="postRoute(older)" class="nav-card">
          <span class="nav-label">Older</span>
          <span class="nav-title">{{ older.heading || older.title }}</span>
        </NuxtLink>
        <span v-else></span>
        <NuxtLink v-if="newer" :to="postRoute(newer)" class="nav-card nav-card-right">
          <span class="nav-label">Newer</span>
          <span class="nav-title">{{ newer.heading || newer.title }}</span>
        </NuxtLink>
        <span v-else></span>
      </nav>
    </article>

    <SiteFooter :max-width="760" label="debkosh.com/blogs" :margin-top="72">
      <NuxtLink to="/blogs">all posts</NuxtLink>
      <NuxtLink to="/">debkosh.com</NuxtLink>
    </SiteFooter>
  </div>
</template>

<script setup lang="ts">
const route = useRoute()
const slug = route.params.slug as string

const { data: post } = await useAsyncData(`post-${slug}`, () =>
  queryContent('/blog', slug).findOne().catch(() => null),
)

if (!post.value) {
  throw createError({ statusCode: 404, statusMessage: 'Post not found', fatal: true })
}

// Next part of the same series, if any. Uses find() rather than findOne()
// because findOne 404s when there is no next part, which fails prerendering.
const { data: next } = await useAsyncData(`post-next-${slug}`, async () => {
  if (!post.value?.series || !post.value?.part) return null
  const matches = await queryContent('/blog')
    .where({ series: post.value.series, part: post.value.part + 1 })
    .find()
  return matches[0] ?? null
})

// Prev/next across all posts by date (newest first). Uses find() so empty
// neighbours never 404 during prerendering; everything is guarded with v-if.
const { data: neighbours } = await useAsyncData(`post-nav-${slug}`, async () => {
  const all = await queryContent('/blog')
    .only(['_path', 'title', 'heading', 'date'])
    .sort({ date: -1 })
    .find()
  const i = all.findIndex(p => p._path === post.value?._path)
  if (i === -1) return { newer: null, older: null }
  return {
    newer: i > 0 ? all[i - 1] : null,
    older: i < all.length - 1 ? all[i + 1] : null,
  }
})

const newer = computed(() => neighbours.value?.newer ?? null)
const older = computed(() => neighbours.value?.older ?? null)

const eyebrow = computed(() => {
  if (post.value?.series && post.value?.part) {
    return `${post.value.series} · Part ${post.value.part} of ${post.value.parts}`
  }
  return post.value?.tag || ''
})

function postRoute(doc: any) {
  return `/blogs/${doc._path.split('/').pop()}`
}

function longDate(date: string) {
  return new Date(date).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
    timeZone: 'UTC',
  })
}

const canonicalUrl = `https://debkosh.com/blogs/${slug}`
const ogImageUrl = `https://debkosh.com/og/${slug}.png`

useSeoMeta({
  title: post.value.title,
  description: post.value.summary,
  ogTitle: post.value.title,
  ogDescription: post.value.summary,
  ogType: 'article',
  ogImage: ogImageUrl,
  ogUrl: canonicalUrl,
  articlePublishedTime: new Date(post.value.date).toISOString(),
  articleAuthor: ['Sudipta Deb'],
})

useHead({
  link: [{ rel: 'canonical', href: canonicalUrl }],
  script: [
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'BlogPosting',
        headline: post.value.title,
        description: post.value.summary,
        datePublished: new Date(post.value.date).toISOString(),
        author: {
          '@type': 'Person',
          name: 'Sudipta Deb',
          url: 'https://debkosh.com',
        },
        image: ogImageUrl,
        mainEntityOfPage: canonicalUrl,
      }),
    },
  ],
})
</script>

<style scoped>
.back-link {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  color: var(--fg-2);
  text-decoration: none;
  font: 500 12px/1 var(--font-mono);
  letter-spacing: 0.02em;
  transition: color var(--dur-fast) var(--ease-out);
}

.back-link:hover {
  color: var(--accent);
}

.hdr-brand {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  flex-shrink: 0;
}

.hdr-name {
  font: 600 13px/1 var(--font-sans);
  letter-spacing: -0.02em;
  color: var(--fg-1);
  white-space: nowrap;
}

.article {
  max-width: 760px;
  margin: 0 auto;
  padding: 44px 40px 0;
}

.article-eyebrow {
  display: flex;
  align-items: center;
  gap: 10px;
  font: 500 10.5px/1 var(--font-mono);
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--accent);
  margin-bottom: 20px;
}

.article-title {
  font: 600 30px/1.1 var(--font-sans);
  letter-spacing: -0.035em;
  color: var(--fg-1);
  margin: 0;
  text-wrap: balance;
}

.article-meta {
  display: flex;
  flex-wrap: wrap;
  gap: 18px;
  margin-top: 12px;
  padding-bottom: 18px;
  border-bottom: 1px solid var(--border);
  font: 400 12px/1 var(--font-mono);
  color: var(--fg-3);
  letter-spacing: 0.02em;
}

.short-card {
  border: 1px solid var(--border);
  border-radius: var(--radius-lg);
  background: var(--surface-1);
  padding: 14px 18px;
  margin-top: 22px;
}

.short-label {
  font: 500 10px/1 var(--font-mono);
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--fg-3);
  margin-bottom: 8px;
}

.short-text {
  font: 400 14px/1.6 var(--font-sans);
  color: var(--fg-1);
  margin: 0;
}

.article-body {
  margin-top: 24px;
}

.article-stub {
  font: 400 14.5px/1.6 var(--font-sans);
  color: var(--fg-2);
  margin: 0;
}

.end-matter {
  display: flex;
  align-items: center;
  gap: 14px;
  margin-top: 32px;
  padding-top: 18px;
  border-top: 1px solid var(--border);
  font: 400 12px/1.5 var(--font-mono);
  color: var(--fg-3);
}

.end-matter a {
  font: 500 12px/1.5 var(--font-mono);
  color: var(--accent);
  text-decoration: none;
  transition: color var(--dur-fast) var(--ease-out);
}

.end-matter a:hover {
  color: var(--accent-hover);
}

.next-card {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  border: 1px solid var(--border);
  border-radius: var(--radius-lg);
  background: var(--surface-1);
  padding: 16px 20px;
  margin-top: 12px;
  text-decoration: none;
  transition: border-color var(--dur-fast) var(--ease-out);
}

.next-card:hover {
  border-color: var(--accent);
}

.next-text {
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.next-label {
  font: 500 9.5px/1 var(--font-mono);
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--fg-3);
}

.next-title {
  font: 600 16px/1.3 var(--font-sans);
  color: var(--fg-1);
  letter-spacing: -0.015em;
}

.post-nav {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
  margin-top: 12px;
}

.nav-card {
  display: flex;
  flex-direction: column;
  gap: 5px;
  border: 1px solid var(--border);
  border-radius: var(--radius-lg);
  background: var(--surface-1);
  padding: 14px 18px;
  text-decoration: none;
  transition: border-color var(--dur-fast) var(--ease-out);
}

.nav-card:hover {
  border-color: var(--accent);
}

.nav-card-right {
  text-align: right;
}

.nav-label {
  font: 500 9.5px/1 var(--font-mono);
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--fg-3);
}

.nav-title {
  font: 600 13.5px/1.3 var(--font-sans);
  color: var(--fg-1);
  letter-spacing: -0.01em;
}

@media (max-width: 640px) {
  .article {
    padding: 36px 20px 0;
  }

  .article-title {
    font-size: clamp(24px, 6.5vw, 30px);
  }

  .post-nav {
    grid-template-columns: 1fr;
  }
}
</style>
