<template>
  <div>
    <SiteHeader :max-width="1080" nav-gap="16px">
      <template #brand>
        <SiteBrand domain="debkosh.com/project-b" />
      </template>
      <template #nav>
        <NuxtLink to="/" class="nav-link">debkosh.com</NuxtLink>
        <NuxtLink to="/labs" class="nav-link">labs</NuxtLink>
      </template>
    </SiteHeader>

    <!-- HERO -->
    <section class="hero">
      <div class="inner">
        <div class="eyebrow">
          <span class="dot" />
          An experiment · v0.2.80 · development ongoing
        </div>
        <h1 class="title">
          Project B: a browser you can <span class="accent">DIY</span>.
        </h1>
        <p class="sub">
          An experiment in better browser architecture. The interface is a web-based shell anyone
          can customise or replace. Under it, a small, safe Go core makes every decision, and
          Chromium's content layer renders the pages, unpatched. It runs on Apple silicon Macs and
          arm64 Android phones. Development is ongoing.
        </p>
        <div class="ctas">
          <a :href="RELEASES" target="_blank" rel="noopener" class="btn btn-primary">
            Download for Mac <Icon name="arrow-up-right" :size="14" />
          </a>
          <a :href="RELEASES" target="_blank" rel="noopener" class="btn">
            Android APK <Icon name="arrow-up-right" :size="14" />
          </a>
          <a :href="REPO" target="_blank" rel="noopener" class="btn">
            <Icon name="github" :size="15" /> Source on GitHub
          </a>
        </div>
      </div>
      <div class="hero-shot">
        <img
          class="for-dark"
          src="/images/project-b.webp"
          alt="Project B in the dark theme with a teal frame on a Mac, showing stripe.com, and the Mobile shell on an Android phone showing the same site"
          width="1600"
          height="1000"
        />
        <img
          class="for-light"
          src="/images/project-b/hero-light.webp"
          alt="Project B in the light theme with a blue frame on a Mac, showing stripe.com, and the Mobile shell on an Android phone showing the same site"
          width="1600"
          height="1000"
        />
      </div>
    </section>

    <!-- NUMBERS -->
    <section class="sec sec-tight">
      <div class="inner">
        <div class="stats">
          <div class="stat">
            <span class="stat-val">0</span>
            <span class="stat-label">patches to Chromium</span>
          </div>
          <div class="stat">
            <span class="stat-val">1</span>
            <span class="stat-label">engine interface between the browser and the renderer</span>
          </div>
          <div class="stat">
            <span class="stat-val">2</span>
            <span class="stat-label">platforms from one tree: macOS and Android</span>
          </div>
          <div class="stat">
            <span class="stat-val">&lt;1 min</span>
            <span class="stat-label">to rebuild after the first Chromium build</span>
          </div>
        </div>
      </div>
    </section>

    <!-- WHY -->
    <section class="sec">
      <div class="inner two-col">
        <div>
          <div class="kicker">Why build another browser</div>
          <h2 class="h2">Most browsers are Chrome with changes on top.</h2>
        </div>
        <div class="prose">
          <p>
            A typical browser is a fork of Chrome's whole browser. Its team carries its changes as
            patches and rebases them on every Chromium release. Tabs, windows, permissions and
            settings live deep in C++ that only that team can find their way around.
          </p>
          <p>
            Project B starts one layer lower. Chromium's content layer, the part that loads and
            renders pages, comes in as it is. Everything above it is ours, in a language and a size
            one person can read: Go for the decisions, a web page for the interface, and a thin C++
            adapter between them and the engine.
          </p>
          <p>
            The question it answers is simple. If you could build the browser part again, knowing
            what we know now, what would it look like?
          </p>
        </div>
      </div>
    </section>

    <!-- ARCHITECTURE -->
    <section class="sec">
      <div class="inner">
        <div class="kicker">How it is built</div>
        <h2 class="h2">Three layers, each with one job.</h2>
        <div class="stack">
          <div class="layer layer-shell">
            <div class="layer-head">
              <span class="layer-name">Shell</span>
              <span class="layer-tech">a web page · HTML, CSS and JS</span>
            </div>
            <p class="layer-desc">
              Draws the browser: tabs, the address field, menus, settings. Anyone can restyle it,
              swap it, or write their own. Standard on the desktop, Mobile on a phone.
            </p>
          </div>
          <div class="link">messages</div>
          <div class="layer layer-core">
            <div class="layer-head">
              <span class="layer-name">Core</span>
              <span class="layer-tech">Go · about 30,000 lines</span>
            </div>
            <p class="layer-desc">
              Small and safe. Owns every decision: tabs, windows, profiles, workspaces, downloads,
              site settings, the ad blocker, history, bookmarks, updates. It knows nothing about how
              pages render.
            </p>
          </div>
          <div class="link">one engine interface</div>
          <div class="layer layer-engine">
            <div class="layer-head">
              <span class="layer-name">Engine</span>
              <span class="layer-tech">C++ adapter · Chromium 155 content layer</span>
            </div>
            <p class="layer-desc">
              The fast part. Chromium's content layer, unpatched, gives the core page views and
              nothing more. The window stays ours, so another engine could take its place behind
              the same interface.
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- GALLERY -->
    <section class="sec">
      <div class="inner">
        <div class="kicker">What it looks like</div>
        <h2 class="h2">Your browser, your colours.</h2>
        <div class="gallery">
          <figure class="shot shot-wide">
            <img src="/images/project-b/site.webp" alt="The site panel over stripe.com: the ad blocker on, one blocked, and links to other sites allowed" loading="lazy" width="1600" height="1000" />
            <figcaption><strong>Every site, its own rules.</strong> The ad blocker and link blocking, one tap from the address field.</figcaption>
          </figure>
          <figure class="shot shot-wide">
            <img src="/images/project-b/themes.webp" alt="The same page in Project B twice: the light theme with a blue frame, and the dark theme with a teal frame" loading="lazy" width="1600" height="1000" />
            <figcaption><strong>Light or dark, any frame colour.</strong> Pick a theme and a colour in settings and the whole window follows, live.</figcaption>
          </figure>
          <figure class="shot">
            <img src="/images/project-b/dark2.webp" alt="Project B in the dark theme with a teal frame, showing linear.app" loading="lazy" width="1600" height="1000" />
            <figcaption><strong>Made for long sessions.</strong> The dark theme with tabs down the side.</figcaption>
          </figure>
          <figure class="shot">
            <img src="/images/project-b/tabs.webp" alt="Project B with tabs on top and a teal frame, showing nasa.gov" loading="lazy" width="1600" height="1000" />
            <figcaption><strong>Tabs down the side or on top.</strong> One switch in settings, applied live.</figcaption>
          </figure>
          <figure class="shot">
            <img src="/images/project-b/phone.webp" alt="The Mobile shell on Android in the light theme, with stripe.com and nasa.gov" loading="lazy" width="1600" height="1000" />
            <figcaption><strong>The same browser on a phone.</strong> The Go core and the shell come along to Android.</figcaption>
          </figure>
          <figure class="shot">
            <img src="/images/project-b/phone-dark.webp" alt="The Mobile shell on Android in the dark theme, with stripe.com and linear.app" loading="lazy" width="1600" height="1000" />
            <figcaption><strong>And dark on the phone too.</strong> It follows the phone's own setting.</figcaption>
          </figure>
        </div>
      </div>
    </section>

    <!-- FEATURES -->
    <section class="sec">
      <div class="inner">
        <div class="kicker">What's in it</div>
        <h2 class="h2">What works today.</h2>
        <div class="features">
          <div v-for="f in features" :key="f.name" class="feature">
            <h3 class="feature-name">{{ f.name }}</h3>
            <p class="feature-desc">{{ f.desc }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- HONEST STATUS -->
    <section class="sec">
      <div class="inner two-col">
        <div>
          <div class="kicker">Where it stands</div>
          <h2 class="h2">An experiment, said plainly.</h2>
        </div>
        <div>
          <ul class="notyet">
            <li>Apple silicon Macs and arm64 Android only.</li>
            <li>No saved passwords or form autofill of its own yet.</li>
            <li>No Safe Browsing warnings and no popup blocker yet.</li>
            <li>Chrome extensions are built in, but off behind a flag in Settings, Flags.</li>
            <li>
              Sync is planned, not shipped. It will use
              <a href="https://github.com/sudiptadeb/synckosh" target="_blank" rel="noopener">synckosh</a>,
              an end-to-end encrypted sync library, which is public.
            </li>
            <li>The Mac app isn't notarized, so macOS asks once before the first launch.</li>
            <li>
              The code is on GitHub to read. It is not open source: the
              <a :href="REPO + '/blob/main/LICENSE'" target="_blank" rel="noopener">licence</a>
              reserves all rights.
            </li>
            <li>
              Development is ongoing, so expect rough edges. Bugs and ideas are welcome in the
              <a :href="REPO + '/issues'" target="_blank" rel="noopener">issues</a>.
            </li>
          </ul>
        </div>
      </div>
    </section>

    <!-- GET IT -->
    <section class="sec">
      <div class="inner">
        <div class="get">
          <div>
            <div class="kicker">Try it</div>
            <h2 class="h2">Install once. It keeps itself current.</h2>
            <ol class="steps">
              <li>
                <strong>Mac:</strong> download the DMG from the
                <a :href="RELEASES" target="_blank" rel="noopener">latest release</a> and drag
                Project B to Applications. The first time, macOS blocks it: open System Settings,
                Privacy &amp; Security, and choose Open Anyway.
              </li>
              <li>
                <strong>Android:</strong> install the APK from the same release, on an arm64 phone.
              </li>
              <li>
                <strong>From source:</strong> the
                <a :href="REPO + '#readme'" target="_blank" rel="noopener">README</a> walks through
                fetching Chromium and the first build, and has the details this page leaves out.
                Without Chromium, the shell runs on a mock engine in a minute.
              </li>
            </ol>
          </div>
          <div class="get-links">
            <a :href="RELEASES" target="_blank" rel="noopener" class="btn btn-primary">
              Latest release <Icon name="arrow-up-right" :size="14" />
            </a>
            <a :href="REPO" target="_blank" rel="noopener" class="btn">
              <Icon name="github" :size="15" /> sudiptadeb/project-b
            </a>
          </div>
        </div>
      </div>
    </section>

    <SiteFooter :max-width="1080" label="debkosh.com/project-b" :margin-top="72">
      <NuxtLink to="/">debkosh.com</NuxtLink>
      <NuxtLink to="/labs">labs</NuxtLink>
      <a :href="REPO" target="_blank" rel="noopener">github</a>
    </SiteFooter>
  </div>
</template>

<script setup lang="ts">
const REPO = 'https://github.com/sudiptadeb/project-b'
const RELEASES = 'https://github.com/sudiptadeb/project-b/releases/latest'

const features = [
  {
    name: 'A shell you can change',
    desc: 'The whole interface is a web page on a small SDK. Change how the browser looks without touching the core or the engine.',
  },
  {
    name: 'Site settings',
    desc: 'A built-in ad blocker, blocking links to other sites, and the camera, microphone and notification choices you made, per site.',
  },
  {
    name: 'Sparks',
    desc: 'Your own scripts for the pages they match, each run apart from the page\'s own scripts.',
  },
  {
    name: 'Workspaces',
    desc: 'Sets of tabs inside a profile, each with cookies and site storage of its own. Work and home, side by side.',
  },
  {
    name: 'Profiles',
    desc: 'Each profile is kept apart in a copy of the app of its own, with a picker to choose between them.',
  },
  {
    name: 'Updates itself',
    desc: 'Installed copies notice a new release within a minute and offer a relaunch. Mac and Android alike.',
  },
  {
    name: 'Bookmark folders',
    desc: 'Sort bookmarks into folders, move them by drag, and search across every folder. New in 0.2.80.',
  },
  {
    name: 'The everyday basics',
    desc: 'Downloads, printing, find in page, history, camera and microphone for calls, video full screen, and tabs that come back.',
  },
  {
    name: 'Built to be tested',
    desc: 'DevTools and ChromeDriver work against it. Tests drive the real app on the Mac, in a clean macOS VM and on Android emulators.',
  },
]

useSeoMeta({
  title: 'Project B',
  description:
    'Project B is an experiment in better browser architecture: a web-based shell anyone can customise, a small, safe Go core that makes every decision, and Chromium\'s unpatched content layer to render pages. For Apple silicon Macs and arm64 Android. Development is ongoing.',
  ogTitle: 'Project B · a browser you can DIY',
  ogDescription:
    'An experiment in better browser architecture: a web-based shell anyone can customise, a small Go core, and Chromium\'s unpatched content layer. Mac and Android.',
  ogImage: 'https://debkosh.com/images/project-b.webp',
  ogUrl: 'https://debkosh.com/project-b',
  twitterCard: 'summary_large_image',
})

useHead({
  link: [{ rel: 'canonical', href: 'https://debkosh.com/project-b' }],
  script: [
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'SoftwareApplication',
        name: 'Project B',
        applicationCategory: 'BrowserApplication',
        operatingSystem: 'macOS, Android',
        softwareVersion: '0.2.80',
        url: 'https://debkosh.com/project-b',
        downloadUrl: 'https://github.com/sudiptadeb/project-b/releases/latest',
        author: { '@type': 'Person', name: 'Sudipta Deb', url: 'https://debkosh.com' },
        offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
      }),
    },
  ],
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

/* ----- hero ----- */
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
  transition: border-color var(--dur-fast) var(--ease-out), background var(--dur-fast) var(--ease-out);
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

.hero-shot {
  max-width: 1180px;
  margin: 48px auto 0;
  padding: 0 32px;
}

.for-light {
  display: none !important;
}

:root[data-theme='light'] .for-light {
  display: block !important;
}

:root[data-theme='light'] .for-dark {
  display: none !important;
}

.hero-shot img {
  width: 100%;
  height: auto;
  display: block;
  border-radius: var(--radius-xl);
  border: 1px solid var(--border);
}

/* ----- sections ----- */
.sec {
  padding: 72px 0 0;
}

.sec-tight {
  padding-top: 40px;
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

.two-col {
  display: grid;
  grid-template-columns: 0.9fr 1.1fr;
  gap: 48px;
  align-items: start;
}

.prose p {
  font: 400 15px/1.65 var(--font-sans);
  color: var(--fg-2);
  margin: 0 0 14px;
}

.prose a,
.notyet a,
.steps a {
  color: var(--accent);
  text-decoration: none;
}

/* ----- stats ----- */
.stats {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  border: 1px solid var(--border);
  border-radius: var(--radius-lg);
  background: var(--surface-1);
}

.stat {
  padding: 20px 22px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  border-left: 1px solid var(--border);
}

.stat:first-child {
  border-left: 0;
}

.stat-val {
  font: 600 30px/1 var(--font-sans);
  letter-spacing: -0.03em;
  color: var(--fg-1);
}

.stat-label {
  font: 400 12.5px/1.45 var(--font-sans);
  color: var(--fg-3);
}

/* ----- architecture ----- */
.stack {
  margin-top: 28px;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  max-width: 760px;
}

.layer {
  border: 1px solid var(--border-strong);
  border-radius: var(--radius-lg);
  background: var(--surface-1);
  padding: 18px 20px;
  border-left-width: 3px;
}

.layer-shell {
  border-left-color: #a855f7;
}

.layer-core {
  border-left-color: var(--accent);
}

.layer-engine {
  border-left-color: #22c55e;
}

.layer-head {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  gap: 12px;
  flex-wrap: wrap;
}

.layer-name {
  font: 600 17px/1.2 var(--font-sans);
  color: var(--fg-1);
}

.layer-tech {
  font: 400 11px/1.4 var(--font-mono);
  color: var(--fg-3);
}

.layer-desc {
  font: 400 14px/1.55 var(--font-sans);
  color: var(--fg-2);
  margin: 8px 0 0;
}

.link {
  align-self: flex-start;
  margin-left: 28px;
  padding: 10px 0 10px 16px;
  border-left: 1px dashed var(--border-strong);
  font: 400 11px/1 var(--font-mono);
  color: var(--fg-3);
}

/* ----- gallery ----- */
.gallery {
  margin-top: 28px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
}

.shot {
  margin: 0;
  border: 1px solid var(--border);
  border-radius: var(--radius-lg);
  background: var(--surface-1);
  overflow: hidden;
}

.shot-wide {
  grid-column: 1 / -1;
}

.shot img {
  width: 100%;
  height: auto;
  display: block;
}

.shot figcaption {
  font: 400 13.5px/1.5 var(--font-sans);
  color: var(--fg-2);
  padding: 14px 16px;
  border-top: 1px solid var(--border);
}

.shot figcaption strong {
  color: var(--fg-1);
  font-weight: 600;
}

/* ----- features ----- */
.features {
  margin-top: 28px;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 12px;
}

.feature {
  border: 1px solid var(--border);
  border-radius: var(--radius-lg);
  background: var(--surface-1);
  padding: 18px;
}

.feature-name {
  font: 600 15px/1.25 var(--font-sans);
  color: var(--fg-1);
  margin: 0;
}

.feature-desc {
  font: 400 13px/1.55 var(--font-sans);
  color: var(--fg-2);
  margin: 8px 0 0;
}

/* ----- status ----- */
.notyet {
  list-style: none;
  margin: 0;
  padding: 0;
  border: 1px solid var(--border);
  border-radius: var(--radius-lg);
  background: var(--surface-1);
}

.notyet li {
  font: 400 14px/1.55 var(--font-sans);
  color: var(--fg-2);
  padding: 13px 18px;
  border-top: 1px solid var(--border);
}

.notyet li:first-child {
  border-top: 0;
}

/* ----- get it ----- */
.get {
  border: 1px solid var(--border-strong);
  border-radius: var(--radius-xl);
  background: var(--surface-1);
  padding: 32px;
  display: grid;
  grid-template-columns: 1.4fr 0.6fr;
  gap: 32px;
  align-items: end;
}

.steps {
  margin: 20px 0 0;
  padding-left: 20px;
}

.steps li {
  font: 400 14.5px/1.6 var(--font-sans);
  color: var(--fg-2);
  margin-bottom: 10px;
}

.steps strong {
  color: var(--fg-1);
}

.get-links {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.get-links .btn {
  justify-content: center;
}

/* ----- responsive ----- */
@media (max-width: 900px) {
  .features {
    grid-template-columns: 1fr 1fr;
  }

  .stats {
    grid-template-columns: 1fr 1fr;
  }

  .stat:nth-child(3) {
    border-left: 0;
  }

  .stat:nth-child(n + 3) {
    border-top: 1px solid var(--border);
  }
}

@media (max-width: 760px) {
  .two-col,
  .get {
    grid-template-columns: 1fr;
    gap: 24px;
  }

  .gallery {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 640px) {
  .inner,
  .hero-shot {
    padding: 0 16px;
  }

  .hero {
    padding-top: 56px;
  }

  .features {
    grid-template-columns: 1fr;
  }

  .sub {
    font-size: 15.5px;
  }
}
</style>
