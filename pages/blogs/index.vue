<template>
  <div>
    <SiteHeader :max-width="880" nav-gap="16px">
      <template #brand>
        <SiteBrand domain="blog.debkosh.com" />
      </template>
      <template #nav>
        <NuxtLink to="/" class="nav-link">debkosh.com</NuxtLink>
        <NuxtLink to="/labs" class="nav-link">lab</NuxtLink>
      </template>
    </SiteHeader>

    <!-- MASTHEAD -->
    <section class="masthead">
      <div class="masthead-inner">
        <div class="eyebrow">The blog</div>
        <h1 class="masthead-title">The part vendors leave out.</h1>
        <p class="masthead-sub">
          Long-form on enterprise browsers, proxies, and enforcement. How it actually works, what
          the tradeoffs really cost. These are the canonical versions of what I post on LinkedIn.
        </p>
      </div>
    </section>

    <!-- POSTS -->
    <section class="posts">
      <div class="posts-inner">
        <template v-for="(group, idx) in groups" :key="group.year">
          <div class="year" :class="{ 'year-later': idx > 0 }">{{ group.year }}</div>
          <NuxtLink
            v-for="(post, i) in group.posts"
            :key="post._path"
            :to="postRoute(post)"
            class="post-row"
            :class="{ 'post-row-last': idx === groups.length - 1 && i === group.posts.length - 1 }"
          >
            <span class="post-date">{{ shortDate(post.date) }}</span>
            <div>
              <div class="post-head">
                <span class="post-title">{{ post.title }}</span>
                <span v-if="post.series" class="post-tag post-tag-series">Series</span>
                <span v-else-if="post.tag" class="post-tag">{{ post.tag }}</span>
              </div>
              <p class="post-sum">{{ post.summary }}</p>
            </div>
          </NuxtLink>
        </template>

        <div class="posts-note">
          <span>Posted first on</span>
          <a href="https://www.linkedin.com/in/-sudiptadeb" target="_blank" rel="noopener">LinkedIn</a>
          <span>· canonical versions live here</span>
        </div>
      </div>
    </section>

    <SiteFooter :max-width="880" label="blog.debkosh.com" :margin-top="56">
      <NuxtLink to="/">debkosh.com</NuxtLink>
      <NuxtLink to="/labs">lab</NuxtLink>
      <a href="https://github.com/sudiptadeb" target="_blank" rel="noopener">github</a>
    </SiteFooter>
  </div>
</template>

<script setup lang="ts">
const { data: posts } = await useAsyncData('blog-posts', () =>
  queryContent('/blog').sort({ date: -1 }).find(),
)

// Group posts by year, newest year first (posts already sorted desc).
const groups = computed(() => {
  const byYear = new Map<number, any[]>()
  for (const post of posts.value ?? []) {
    const year = new Date(post.date).getUTCFullYear()
    if (!byYear.has(year)) byYear.set(year, [])
    byYear.get(year)!.push(post)
  }
  return [...byYear.entries()].map(([year, items]) => ({ year, posts: items }))
})

function postRoute(post: any) {
  return `/blogs/${post._path.split('/').pop()}`
}

function shortDate(date: string) {
  return new Date(date).toLocaleDateString('en-US', {
    month: 'short',
    day: '2-digit',
    timeZone: 'UTC',
  })
}

useSeoMeta({
  title: 'Blog',
  description:
    'Long-form on enterprise browsers, proxies, and enforcement. How it actually works, what the tradeoffs really cost.',
  ogTitle: 'The part vendors leave out. · Sudipta Deb',
  ogDescription:
    'Long-form on enterprise browsers, proxies, and enforcement. How it actually works, what the tradeoffs really cost.',
})
</script>

<style scoped>
.nav-link {
  color: var(--fg-2);
  text-decoration: none;
  font: 500 12px/1 var(--font-mono);
  letter-spacing: 0.02em;
  transition: color var(--dur-fast) var(--ease-out);
}

.nav-link:hover {
  color: var(--accent);
}

.masthead {
  border-bottom: 1px solid var(--border);
}

.masthead-inner {
  max-width: 880px;
  margin: 0 auto;
  padding: 72px 40px 56px;
}

.eyebrow {
  font: 500 10.5px/1 var(--font-mono);
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--fg-3);
  margin-bottom: 22px;
}

.masthead-title {
  font: 600 44px/1.05 var(--font-sans);
  letter-spacing: -0.035em;
  color: var(--fg-1);
  margin: 0;
  max-width: 680px;
  text-wrap: balance;
}

.masthead-sub {
  font: 400 15.5px/1.6 var(--font-sans);
  color: var(--fg-2);
  margin: 18px 0 0;
  max-width: 600px;
}

.posts {
  padding-bottom: 40px;
}

.posts-inner {
  max-width: 880px;
  margin: 0 auto;
  padding: 48px 40px 0;
}

.year {
  font: 500 13px/1 var(--font-mono);
  color: var(--fg-3);
  letter-spacing: 0.04em;
  margin-bottom: 8px;
}

.year-later {
  margin-top: 40px;
}

.post-row {
  display: grid;
  grid-template-columns: 92px 1fr;
  gap: 24px;
  padding: 22px 14px;
  border-top: 1px solid var(--border);
  align-items: baseline;
  text-decoration: none;
  border-radius: var(--radius-md);
  transition: background var(--dur-fast) var(--ease-out);
}

.post-row:hover {
  background: var(--surface-1);
}

.post-row-last {
  border-bottom: 1px solid var(--border);
}

.post-date {
  font: 400 11.5px/1.5 var(--font-mono);
  color: var(--fg-3);
}

.post-head {
  display: flex;
  align-items: baseline;
  gap: 12px;
  flex-wrap: wrap;
}

.post-title {
  font: 600 17px/1.35 var(--font-sans);
  color: var(--fg-1);
  letter-spacing: -0.015em;
}

.post-tag {
  font: 500 9.5px/1 var(--font-mono);
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--fg-3);
}

.post-tag-series {
  color: var(--accent);
}

.post-sum {
  font: 400 13.5px/1.55 var(--font-sans);
  color: var(--fg-2);
  margin: 6px 0 0;
  max-width: 600px;
}

.posts-note {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-top: 32px;
  font: 400 12px/1.5 var(--font-mono);
  color: var(--fg-3);
  flex-wrap: wrap;
}

.posts-note a {
  color: var(--accent);
  text-decoration: none;
  transition: color var(--dur-fast) var(--ease-out);
}

.posts-note a:hover {
  color: var(--accent-hover);
}

@media (max-width: 640px) {
  .masthead-inner,
  .posts-inner {
    padding-left: 20px;
    padding-right: 20px;
  }

  .masthead-title {
    font-size: clamp(32px, 8vw, 44px);
  }

  .post-row {
    grid-template-columns: 1fr;
    gap: 6px;
  }
}
</style>
