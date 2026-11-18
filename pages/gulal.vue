<template>
  <div>
    <SiteHeader :max-width="1080" nav-gap="16px">
      <template #brand>
        <SiteBrand domain="debkosh.com/gulal" />
      </template>
      <template #nav>
        <NuxtLink to="/" class="nav-link">debkosh.com</NuxtLink>
        <NuxtLink to="/labs" class="nav-link">labs</NuxtLink>
      </template>
    </SiteHeader>

    <section class="hero">
      <div class="inner">
        <div class="eyebrow">
          <span class="dot" />
          A colour library · Go and TypeScript · MIT
        </div>
        <h1 class="title">gulal: colours made for <span class="accent">where they sit</span>.</h1>
        <p class="sub">
          The colours an interface needs and has no designer for: a site's letter tile, a tag, a
          tab group, a chart's series. Tell gulal where they will sit, a light or dark scheme, a
          background and an accent, and every colour it makes fits that place, with the border and
          inks that read on it. Random, seeded or from text; the same output in Go and TypeScript.
        </p>
        <div class="ctas">
          <a :href="REPO" target="_blank" rel="noopener" class="btn btn-primary">
            <Icon name="github" :size="15" /> Source on GitHub
          </a>
          <a :href="`${REPO}/blob/main/spec.md`" target="_blank" rel="noopener" class="btn">
            The spec <Icon name="arrow-up-right" :size="14" />
          </a>
        </div>
      </div>
    </section>

    <section class="sec">
      <div class="inner">
        <div class="kicker">How it decides</div>
        <h2 class="h2">Saturation fits the theme. Lightness is for reading.</h2>
        <div class="points">
          <div class="point">
            <h3>Hue from text or the seed</h3>
            <p>
              Any text hashes to the same hue every time. Random ones come from one seed per
              environment, so a palette that looked good comes back from a short replay string.
            </p>
          </div>
          <div class="point">
            <h3>Strength from the accent</h3>
            <p>
              Colours take the accent's saturation, never weaker than the background's own, and
              lean toward its hue. A muted theme gets muted colours, a vivid one vivid.
            </p>
          </div>
          <div class="point">
            <h3>Inks that read</h3>
            <p>
              For any background: a border, the best of your inks, muted, tonal, complementary
              and every colour-wheel relation, each held to APCA Lc 60 and moved only as far as
              it must.
            </p>
          </div>
        </div>
      </div>
    </section>

    <section class="sec">
      <div class="inner">
        <div class="kicker">Playground</div>
        <h2 class="h2">Try it here.</h2>
        <div ref="mountEl" class="playground"><p class="loading">Loading the playground…</p></div>
      </div>
    </section>

    <section class="sec">
      <div class="inner">
        <div class="kicker">Install</div>
        <pre class="code">npm install @debkosh/gulal
go get github.com/sudiptadeb/gulal</pre>
      </div>
    </section>

    <SiteFooter :max-width="1080" label="debkosh.com/gulal" :margin-top="72">
      <NuxtLink to="/">debkosh.com</NuxtLink>
      <NuxtLink to="/labs">labs</NuxtLink>
      <a :href="REPO" target="_blank" rel="noopener">github</a>
    </SiteFooter>
  </div>
</template>

<script setup lang="ts">
const REPO = 'https://github.com/sudiptadeb/gulal'
const mountEl = ref<HTMLElement | null>(null)

onMounted(async () => {
  // served as they are from public/gulal, not bundled: a runtime path keeps Vite away from them
  const dir = '/gulal/'
  const lib = await import(/* @vite-ignore */ `${dir}gulal.js`)
  const { mount } = await import(/* @vite-ignore */ `${dir}playground.js`)
  if (mountEl.value) mount(mountEl.value, lib)
})

useSeoMeta({
  title: 'gulal',
  description:
    'gulal is a colour library for Go and TypeScript: colours made for the place they sit in, random, seeded or from text, palettes that sit well together, and for any background the border and inks that read on it.',
  ogTitle: 'gulal · colours made for where they sit',
  ogDescription:
    'Random, seeded or from text; palettes that sit well together; and for any background, the border and inks that read on it. Go and TypeScript, the same output.',
  ogUrl: 'https://debkosh.com/gulal',
})

useHead({
  link: [{ rel: 'canonical', href: 'https://debkosh.com/gulal' }],
})
</script>

<style scoped>
.nav-link {
  font: 500 13px/1 var(--font-sans);
  color: var(--fg-2);
  text-decoration: none;
  padding: 6px 8px;
  border-radius: var(--radius-sm);
}
.nav-link:hover {
  color: var(--fg-1);
}
.inner {
  max-width: 1080px;
  margin: 0 auto;
  padding: 0 32px;
}
@media (max-width: 640px) {
  .inner {
    padding: 0 16px;
  }
}
.hero {
  padding: 88px 0 0;
}
.eyebrow {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font: 500 11px/1 var(--font-mono);
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--fg-3);
}
.dot {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: var(--accent);
  box-shadow: 0 0 0 4px var(--accent-soft);
}
.title {
  font: 600 clamp(34px, 5.6vw, 58px) / 1.04 var(--font-sans);
  letter-spacing: -0.035em;
  color: var(--fg-1);
  margin: 20px 0 0;
  max-width: 860px;
}
.accent {
  color: var(--accent);
}
.sub {
  font: 400 17px/1.55 var(--font-sans);
  color: var(--fg-2);
  margin: 20px 0 0;
  max-width: 680px;
}
.ctas {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 28px;
}
.btn {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font: 500 13.5px/1 var(--font-sans);
  color: var(--fg-1);
  background: var(--surface-1);
  border: 1px solid var(--border-strong);
  border-radius: var(--radius-md);
  padding: 12px 16px;
  text-decoration: none;
}
.btn:hover {
  border-color: var(--accent);
}
.btn-primary {
  background: var(--accent);
  border-color: var(--accent);
  color: var(--accent-fg);
}
.btn-primary:hover {
  background: var(--accent-hover);
  border-color: var(--accent-hover);
}
.sec {
  padding: 72px 0 0;
}
.kicker {
  font: 500 10.5px/1 var(--font-mono);
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--accent);
}
.h2 {
  font: 600 clamp(24px, 3.4vw, 32px) / 1.15 var(--font-sans);
  letter-spacing: -0.025em;
  color: var(--fg-1);
  margin: 12px 0 0;
}
.points {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
  margin-top: 28px;
}
@media (max-width: 820px) {
  .points {
    grid-template-columns: 1fr;
  }
}
.point {
  background: var(--surface-1);
  border: 1px solid var(--border);
  border-radius: var(--radius-lg, 8px);
  padding: 18px;
}
.point h3 {
  font: 600 15px/1.3 var(--font-sans);
  color: var(--fg-1);
  margin: 0 0 8px;
}
.point p {
  font: 400 14px/1.6 var(--font-sans);
  color: var(--fg-2);
  margin: 0;
}
.playground {
  margin-top: 28px;
  --gp-bg: var(--bg);
  --gp-fg: var(--fg-1);
  --gp-muted: var(--fg-2);
  --gp-line: var(--border-strong);
  --gp-card: var(--surface-1);
  --gp-font: var(--font-sans);
  --gp-mono: var(--font-mono);
}
.loading {
  color: var(--fg-3);
  font: 400 14px var(--font-sans);
}
.code {
  margin: 16px 0 0;
  font: 13px/1.6 var(--font-mono);
  background: var(--surface-1);
  border: 1px solid var(--border);
  border-radius: var(--radius-md);
  padding: 14px 16px;
  color: var(--fg-1);
  overflow-x: auto;
}
</style>
