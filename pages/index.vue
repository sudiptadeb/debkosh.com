<template>
  <div>
    <SiteHeader :max-width="1080" nav-gap="2px">
      <template #brand>
        <SiteBrand domain="debkosh.com" />
      </template>
      <template #nav>
        <a href="#build" class="nav-link">Build</a>
        <a href="#work" class="nav-link">Work</a>
        <a href="#write" class="nav-link">Write</a>
        <a href="#about" class="nav-link">About</a>
      </template>
    </SiteHeader>

    <!-- HERO -->
    <section class="hero">
      <div class="hero-inner">
        <div>
          <div class="hero-eyebrow">
            <span class="hero-dot" />
            Sudipta Deb · India
          </div>
          <h1 class="hero-title">
            I <span class="hero-accent">build</span> the things I couldn't find, and write the
            things whitepapers won't.
          </h1>
          <p class="hero-sub">
            Tools I needed and couldn't find anywhere, usually the hard version. By day I lead
            Ulaa, a Chromium-based enterprise browser, and the SASE stack built into it, designed
            and shipped, not integrated. The writing is the part vendors leave out: how enforcement
            actually works, and what the tradeoffs really cost.
          </p>
          <div class="hero-links">
            <a href="https://github.com/sudiptadeb" target="_blank" rel="noopener" class="hero-link">
              <Icon name="github" />
              GitHub <span class="hero-handle">sudiptadeb</span>
            </a>
            <a
              href="https://www.linkedin.com/in/-sudiptadeb"
              target="_blank"
              rel="noopener"
              class="hero-link"
            >
              <Icon name="linkedin" />
              LinkedIn
            </a>
            <a href="mailto:hello@debkosh.com" class="hero-link">
              <Icon name="mail" />
              Email
            </a>
          </div>
        </div>
        <div class="meta-panel">
          <div class="meta-row"><span>Now</span><span class="meta-val">Ulaa · platform &amp; security lead</span></div>
          <div class="meta-row"><span>Focus</span><span class="meta-val">Enterprise browser security</span></div>
          <div class="meta-row"><span>Building</span><span class="meta-val meta-accent">memd</span></div>
          <div class="meta-row">
            <span>Writing</span>
            <NuxtLink to="/blogs" class="meta-val meta-link">blog.debkosh.com</NuxtLink>
          </div>
          <div class="meta-row meta-last"><span>Résumé</span><span class="meta-val">on request</span></div>
        </div>
      </div>
    </section>

    <!-- BUILD -->
    <section id="build" class="sec">
      <div class="sec-inner">
        <div class="sec-head">
          <h2 class="sec-title">Things I built</h2>
        </div>
        <p class="sec-lede">
          Tools I needed and couldn't find done right, so I built them. I gravitate to the hard
          ones.
        </p>

        <!-- memd flagship -->
        <div class="flagship">
          <div>
            <div class="flagship-pill">Flagship</div>
            <h3 class="flagship-name">memd</h3>
            <p class="flagship-tagline">Unified, file-first memory for AI agents.</p>
            <p class="flagship-body">
              The memory is a set of Markdown files the agent reads and maintains. You own them,
              version them in Git, and carry them between tools. The server is only an adapter, the
              files are the source of truth.
            </p>
            <div class="flagship-stack">
              Markdown · Git · MCP adapter · Claude Code / Codex / Cursor / Gemini CLI
            </div>
            <div class="flagship-links">
              <a href="https://github.com/sudiptadeb/memd" target="_blank" rel="noopener" class="flagship-btn">
                <span class="flagship-btn-label">Code</span>github.com/sudiptadeb/memd
                <Icon name="arrow-up-right" :size="13" stroke="var(--fg-3)" />
              </a>
              <a href="https://memd.debkosh.com" target="_blank" rel="noopener" class="flagship-btn">
                <span class="flagship-btn-label">Docs</span>memd.debkosh.com
                <Icon name="arrow-up-right" :size="13" stroke="var(--fg-3)" />
              </a>
            </div>
          </div>
          <div class="flagship-media">
            <img
              src="/images/memd.gif"
              alt="memd, an agent reading and maintaining its Markdown memory files"
              loading="lazy"
            />
          </div>
        </div>

        <!-- showcase cards -->
        <div class="cards-2">
          <div class="card card-media">
            <div class="card-img">
              <img
                src="/images/termulaa-hero.png"
                alt="termulaa, a coding agent and a streaming log in a single split terminal"
                loading="lazy"
              />
            </div>
            <div class="card-body">
              <div class="card-head">
                <h3 class="card-name">termulaa</h3>
                <span class="card-cat">Terminal</span>
              </div>
              <p class="card-tagline">
                Your terminal and your coding agents in a browser tab, next to the app they're
                building.
              </p>
              <p class="card-desc">
                One small Go binary instead of ttyd plus tmux with seams. PTY sessions survive the
                tab closing, scrollback replays on reconnect. Loopback-only.
              </p>
              <div class="card-stack">Go · xterm.js · WebSocket · go install</div>
              <a href="https://github.com/sudiptadeb/termulaa" target="_blank" rel="noopener" class="card-repo">
                sudiptadeb/termulaa <Icon name="arrow-up-right" :size="13" />
              </a>
            </div>
          </div>

          <div class="card card-media">
            <div class="card-img">
              <img
                src="/images/keysat-overview.png"
                alt="keysat, the overview dashboard, built on the Deb Design System"
                loading="lazy"
              />
            </div>
            <div class="card-body">
              <div class="card-head">
                <h3 class="card-name">keysat</h3>
                <span class="card-cat">macOS · same system</span>
              </div>
              <p class="card-tagline">A local-first keystroke and activity tracker for macOS.</p>
              <p class="card-desc">
                Everything you type, organized by app, domain, and directory, searchable and
                charted, and it never leaves your machine. Password-like input is hashed, not
                stored.
              </p>
              <div class="card-stack">Go · SQLite + FTS5 · Alpine.js</div>
              <a href="https://github.com/sudiptadeb/keysat" target="_blank" rel="noopener" class="card-repo">
                sudiptadeb/keysat <Icon name="arrow-up-right" :size="13" />
              </a>
            </div>
          </div>
        </div>

        <!-- sackup + more -->
        <div class="cards-2">
          <div class="card">
            <div class="card-body card-body-flat">
              <div class="card-head">
                <h3 class="card-name">sackup</h3>
                <span class="card-cat">Android</span>
              </div>
              <p class="card-tagline">
                Back up your phone to a USB drive, simple enough for your parents. I built it for
                exactly that.
              </p>
              <p class="card-desc">
                Offline, no cloud, no accounts. Resumable, verified copies, plain language. Built
                for people who find most apps overwhelming.
              </p>
              <div class="card-stack">Kotlin · Jetpack Compose · USB-OTG</div>
              <a href="https://github.com/sudiptadeb/sackup" target="_blank" rel="noopener" class="card-repo">
                sudiptadeb/sackup <Icon name="arrow-up-right" :size="13" />
              </a>
            </div>
          </div>
          <div class="more-card">
            <div class="more-head">
              <span class="more-label">More</span>
              <span class="more-sub">Smaller builds and experiments.</span>
            </div>
            <p class="more-body">
              Chrome sync analyzer, a Chrome Enterprise URL-pattern matcher, SmolLM3-3B
              fine-tuning, a child-learning kiosk, thermal receipt printing.
            </p>
            <div class="more-links">
              <NuxtLink to="/labs" class="more-link">
                Full index <Icon name="arrow-right" :size="13" />
              </NuxtLink>
              <a href="https://github.com/sudiptadeb" target="_blank" rel="noopener" class="more-link">
                All repos <Icon name="arrow-up-right" :size="13" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- WORK -->
    <section id="work" class="sec">
      <div class="sec-inner">
        <div class="sec-head sec-head-spaced">
          <h2 class="sec-title">The day job</h2>
          <span class="sec-aside">Ulaa, and the stack underneath it</span>
        </div>
        <div class="work-grid">
          <div>
            <p class="work-lead">
              By day I lead Ulaa, a Chromium-based enterprise browser, and I built the full SASE
              stack inside it from scratch: secure web gateway, ZTNA, CASB, DLP, and remote browser
              isolation. Designed and shipped, not integrated.
            </p>
            <p class="work-body">
              I designed the DLP pipeline, the inline TLS inspection layer, the RBI rendering
              architecture, and a post-quantum VPN stack for government customers, and I keep a
              sub-24-hour CVE-to-production pipeline on Chromium. I move between two seats: the
              architect writing the hard parts in Go, and the product lead owning the roadmap. The
              hard parts are written up, not bulleted here.
            </p>
            <NuxtLink to="/blogs" class="work-blog-link">
              Deep-dives at blog.debkosh.com <Icon name="arrow-right" :size="14" />
            </NuxtLink>
          </div>
          <div class="work-seats">
            <div class="seat-card">
              <div class="seat-label">Architect</div>
              <div class="seat-desc">DLP, TLS inspection, RBI, post-quantum VPN. In Go and C++.</div>
            </div>
            <div class="seat-card">
              <div class="seat-label">Product lead</div>
              <div class="seat-desc">Roadmap and direction.</div>
            </div>
          </div>
        </div>
        <div class="chips">
          <span v-for="chip in workChips" :key="chip" class="chip">{{ chip }}</span>
        </div>
      </div>
    </section>

    <!-- WRITE -->
    <section id="write" class="sec">
      <div class="sec-inner">
        <div class="sec-head sec-head-spaced">
          <h2 class="sec-title">What I write</h2>
          <span class="sec-aside">The part vendors leave out</span>
        </div>
        <p class="write-lede">
          I write about how enterprise browsers, proxies, and security actually work: the
          enforcement mechanics, the real tradeoffs, the parts whitepapers and product pages skip.
          Same voice and audience as my LinkedIn.
        </p>

        <div class="write-list">
          <NuxtLink to="/blogs/extension-ceiling-1-mandatory-screen-recording" class="write-row">
            <div>
              <div class="write-title">The extension ceiling</div>
              <p class="write-sum">
                Where browser-extension security tooling hits its limits: mandatory screen
                recording, Chrome sync MDM scoping, incognito bypass.
              </p>
            </div>
            <span class="write-tag">SERIES · 3 PARTS</span>
          </NuxtLink>
          <NuxtLink to="/blogs" class="write-row">
            <div>
              <div class="write-title">Browser + SASE consolidation</div>
              <p class="write-sum">What enforcement actually looks like when you merge them.</p>
            </div>
            <span />
          </NuxtLink>
          <NuxtLink to="/blogs" class="write-row">
            <div>
              <div class="write-title">Go vs Rust for proxy workloads</div>
              <p class="write-sum">The choice and why.</p>
            </div>
            <span />
          </NuxtLink>
          <NuxtLink to="/blogs" class="write-row write-row-last">
            <div>
              <div class="write-title">Enterprise browser metrics</div>
              <p class="write-sum">What productivity numbers really mean.</p>
            </div>
            <span />
          </NuxtLink>
        </div>

        <div class="write-foot">
          <div class="write-where">
            <div class="write-foot-label">Where it lives</div>
            <p class="write-foot-body">
              LinkedIn is where these get posted and reach the enterprise-browser-security crowd.
              blog.debkosh.com holds the canonical long-form versions.
            </p>
            <NuxtLink to="/blogs" class="write-foot-link">
              Read the blog <Icon name="arrow-right" :size="13" />
            </NuxtLink>
          </div>
          <div class="write-press">
            <div class="write-foot-label write-press-label">Featured / press</div>
            <a
              href="https://www.linkedin.com/in/-sudiptadeb"
              target="_blank"
              rel="noopener"
              class="press-card"
            >
              <span class="press-text">
                <span class="press-title">Securing the last mile: the browser is the new endpoint</span>
                <span class="press-src">Ulaa · byline</span>
              </span>
              <Icon name="arrow-up-right" :size="14" stroke="var(--fg-3)" />
            </a>
            <a
              href="https://www.linkedin.com/in/-sudiptadeb"
              target="_blank"
              rel="noopener"
              class="press-card"
            >
              <span class="press-text">
                <span class="press-title">Ulaa strikes the right balance between privacy and usability</span>
                <span class="press-src">Financial Express</span>
              </span>
              <Icon name="arrow-up-right" :size="14" stroke="var(--fg-3)" />
            </a>
          </div>
        </div>
      </div>
    </section>

    <!-- ABOUT -->
    <section id="about" class="sec">
      <div class="sec-inner">
        <div class="sec-head sec-head-spaced">
          <h2 class="sec-title">A bit about me</h2>
          <span class="sec-aside">Based in India</span>
        </div>
        <div class="about-row">
          <img src="/images/avatar.jpg" alt="Sudipta Deb" class="about-avatar" />
          <p class="about-text">
            I build things I needed and couldn't find, and I like the ones that are hard. I came up
            through offensive security and SOC architecture, and for the last few years I've led
            the team building Ulaa and its SASE stack from scratch. Ten years in, security
            architecture is still the most interesting engineering I know: you hold adversaries,
            performance, and product experience in your head at once, and getting any one of them
            wrong breaks the whole thing.
          </p>
        </div>
        <div class="about-actions">
          <a href="mailto:hello@debkosh.com" class="btn btn-primary">
            <Icon name="mail" :size="15" />Email
          </a>
          <a href="https://github.com/sudiptadeb" target="_blank" rel="noopener" class="btn">
            <Icon name="github" :size="15" />GitHub
          </a>
          <a href="https://www.linkedin.com/in/-sudiptadeb" target="_blank" rel="noopener" class="btn">
            <Icon name="linkedin" :size="15" />LinkedIn
          </a>
          <span class="about-cv">Résumé (PDF) on request</span>
        </div>
      </div>
    </section>

    <SiteFooter :max-width="1080" label="debkosh.com" :margin-top="56">
      <NuxtLink to="/blogs">blog</NuxtLink>
      <NuxtLink to="/labs">lab</NuxtLink>
      <a href="https://github.com/sudiptadeb" target="_blank" rel="noopener">github</a>
      <a href="https://www.linkedin.com/in/-sudiptadeb" target="_blank" rel="noopener">linkedin</a>
      <a href="mailto:hello@debkosh.com">email</a>
    </SiteFooter>
  </div>
</template>

<script setup lang="ts">
const workChips = [
  'Secure web gateway',
  'ZTNA',
  'CASB',
  'DLP',
  'Remote browser isolation',
  'Post-quantum VPN',
  'Inline TLS inspection',
]

useSeoMeta({
  description:
    'Sudipta Deb builds the things he couldn\'t find and writes the things whitepapers won\'t. Ulaa, an enterprise browser, the SASE stack underneath it, and tools like memd, termulaa, keysat, and sackup.',
  ogTitle: 'Sudipta Deb · debkosh.com',
  ogDescription:
    'I build the things I couldn\'t find, and write the things whitepapers won\'t.',
})
</script>

<style scoped>
/* ----- header nav ----- */
.nav-link {
  color: var(--fg-2);
  padding: 6px 10px;
  border-radius: var(--radius-sm);
  text-decoration: none;
  font: 500 12.5px/1 var(--font-sans);
  letter-spacing: -0.005em;
  transition:
    background var(--dur-fast) var(--ease-out),
    color var(--dur-fast) var(--ease-out);
}

.nav-link:hover {
  background: var(--surface-2);
  color: var(--fg-1);
}

/* ----- hero ----- */
.hero {
  border-bottom: 1px solid var(--border);
}

.hero-inner {
  max-width: 1080px;
  margin: 0 auto;
  padding: 52px 40px 44px;
  display: grid;
  grid-template-columns: 1.55fr 1fr;
  gap: 48px;
  align-items: end;
}

.hero-eyebrow {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font: 500 10.5px/1 var(--font-mono);
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--fg-3);
  margin-bottom: 18px;
}

.hero-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--accent);
}

.hero-title {
  font: 600 42px/1.05 var(--font-sans);
  letter-spacing: -0.035em;
  color: var(--fg-1);
  margin: 0;
  text-wrap: balance;
  max-width: 680px;
}

.hero-accent {
  color: var(--accent);
}

.hero-sub {
  font: 400 15px/1.55 var(--font-sans);
  color: var(--fg-2);
  margin: 16px 0 0;
  max-width: 600px;
}

.hero-links {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  margin-top: 22px;
}

.hero-link {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  color: var(--fg-2);
  text-decoration: none;
  font: 500 13px/1 var(--font-sans);
  letter-spacing: -0.005em;
  transition: color var(--dur-fast) var(--ease-out);
}

.hero-link:hover {
  color: var(--accent);
}

.hero-handle {
  color: var(--fg-3);
  font-family: var(--font-mono);
  font-size: 12px;
}

.meta-panel {
  display: flex;
  flex-direction: column;
  font-family: var(--font-mono);
  font-size: 12px;
  color: var(--fg-3);
  letter-spacing: 0.01em;
  border: 1px solid var(--border);
  border-radius: var(--radius-lg);
  background: var(--surface-1);
  padding: 6px 18px;
}

.meta-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 16px;
  padding: 9px 0;
  border-bottom: 1px solid var(--border);
}

.meta-row.meta-last {
  border-bottom: none;
}

.meta-val {
  color: var(--fg-1);
  font-family: var(--font-sans);
  font-weight: 500;
  letter-spacing: -0.01em;
  text-align: right;
}

.meta-accent {
  color: var(--accent);
}

.meta-link {
  text-decoration: none;
  transition: color var(--dur-fast) var(--ease-out);
}

.meta-link:hover {
  color: var(--accent);
}

/* ----- shared section chrome ----- */
.sec-inner {
  max-width: 1080px;
  margin: 0 auto;
  padding: 52px 40px 0;
}

.sec {
  scroll-margin-top: 64px;
}

.sec-head {
  display: flex;
  align-items: baseline;
  gap: 14px;
  margin-bottom: 14px;
  padding-bottom: 11px;
  border-bottom: 1px solid var(--border);
}

.sec-head-spaced {
  margin-bottom: 20px;
}

.sec-title {
  font: 600 22px/1 var(--font-sans);
  letter-spacing: -0.025em;
  color: var(--fg-1);
  margin: 0;
}

.sec-aside {
  margin-left: auto;
  font: 400 12.5px/1.4 var(--font-sans);
  color: var(--fg-3);
  text-align: right;
}

.sec-lede {
  font: 400 15px/1.55 var(--font-sans);
  color: var(--fg-2);
  margin: 0 0 20px;
  max-width: 620px;
}

/* ----- build: flagship ----- */
.flagship {
  border: 1px solid var(--border-strong);
  border-radius: var(--radius-xl);
  background: var(--surface-1);
  padding: 28px;
  display: grid;
  grid-template-columns: 1fr 1.05fr;
  gap: 32px;
  align-items: center;
}

.flagship-pill {
  display: inline-flex;
  align-items: center;
  gap: 7px;
  font: 500 9.5px/1 var(--font-mono);
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--accent);
  background: var(--accent-soft);
  padding: 5px 9px;
  border-radius: var(--radius-pill);
  margin-bottom: 18px;
}

.flagship-name {
  font: 600 28px/1 var(--font-sans);
  letter-spacing: -0.03em;
  color: var(--fg-1);
  margin: 0;
}

.flagship-tagline {
  font: 500 15.5px/1.4 var(--font-sans);
  color: var(--fg-1);
  margin: 10px 0 0;
}

.flagship-body {
  font: 400 13.5px/1.55 var(--font-sans);
  color: var(--fg-2);
  margin: 8px 0 0;
  max-width: 520px;
}

.flagship-stack {
  font: 400 11px/1.6 var(--font-mono);
  color: var(--fg-3);
  letter-spacing: 0.01em;
  margin-top: 12px;
}

.flagship-links {
  display: flex;
  gap: 9px;
  flex-wrap: wrap;
  margin-top: 16px;
}

.flagship-btn {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font: 500 11.5px/1 var(--font-mono);
  color: var(--fg-1);
  background: var(--bg);
  border: 1px solid var(--border);
  border-radius: var(--radius-md);
  padding: 10px 13px;
  text-decoration: none;
  transition: border-color var(--dur-fast) var(--ease-out);
}

.flagship-btn:hover {
  border-color: var(--accent);
}

.flagship-btn-label {
  font: 500 9px/1 var(--font-mono);
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--fg-3);
}

.flagship-media {
  border: 1px solid var(--border);
  border-radius: var(--radius-lg);
  overflow: hidden;
  background: var(--bg);
}

.flagship-media img {
  width: 100%;
  display: block;
}

/* ----- build: cards ----- */
.cards-2 {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
  margin-top: 12px;
}

.card {
  border: 1px solid var(--border);
  border-radius: var(--radius-lg);
  background: var(--surface-1);
  overflow: hidden;
  display: flex;
  flex-direction: column;
  transition: border-color var(--dur-fast) var(--ease-out);
}

.card:hover {
  border-color: var(--accent);
}

.card-img {
  aspect-ratio: 16 / 10;
  background: var(--surface-2);
  border-bottom: 1px solid var(--border);
  overflow: hidden;
}

.card-img img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center top;
  display: block;
}

.card-body {
  padding: 18px;
  display: flex;
  flex-direction: column;
  gap: 9px;
  flex: 1;
}

.card-head {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 8px;
}

.card-name {
  font: 600 19px/1.1 var(--font-sans);
  letter-spacing: -0.02em;
  color: var(--fg-1);
  margin: 0;
}

.card-cat {
  font: 400 9.5px/1 var(--font-mono);
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--fg-3);
}

.card-tagline {
  font: 500 13.5px/1.45 var(--font-sans);
  color: var(--fg-1);
  margin: 0;
}

.card-desc {
  font: 400 13px/1.55 var(--font-sans);
  color: var(--fg-2);
  margin: 0;
}

.card-stack {
  font: 400 11px/1.6 var(--font-mono);
  color: var(--fg-3);
  margin-top: auto;
  padding-top: 6px;
}

.card-repo {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font: 500 11.5px/1 var(--font-mono);
  color: var(--accent);
  text-decoration: none;
  transition: color var(--dur-fast) var(--ease-out);
}

.card-repo:hover {
  color: var(--accent-hover);
}

.more-card {
  border: 1px solid var(--border);
  border-radius: var(--radius-lg);
  background: transparent;
  padding: 18px;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.more-head {
  display: flex;
  align-items: baseline;
  gap: 12px;
  flex-wrap: wrap;
}

.more-label {
  font: 500 10px/1 var(--font-mono);
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--fg-3);
}

.more-sub {
  font: 400 13px/1.5 var(--font-sans);
  color: var(--fg-2);
}

.more-body {
  font: 400 13px/1.6 var(--font-sans);
  color: var(--fg-2);
  margin: 0;
}

.more-links {
  display: flex;
  gap: 22px;
  flex-wrap: wrap;
  margin-top: auto;
  padding-top: 2px;
}

.more-link {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font: 500 12.5px/1 var(--font-sans);
  color: var(--accent);
  text-decoration: none;
  letter-spacing: -0.005em;
  white-space: nowrap;
  transition: color var(--dur-fast) var(--ease-out);
}

.more-link:hover {
  color: var(--accent-hover);
}

/* ----- work ----- */
.work-grid {
  display: grid;
  grid-template-columns: 1.5fr 1fr;
  gap: 44px;
  align-items: start;
}

.work-lead {
  font: 400 15px/1.6 var(--font-sans);
  color: var(--fg-1);
  margin: 0;
  max-width: 600px;
}

.work-body {
  font: 400 13.5px/1.6 var(--font-sans);
  color: var(--fg-2);
  margin: 12px 0 0;
  max-width: 600px;
}

.work-blog-link {
  display: inline-flex;
  align-items: center;
  gap: 7px;
  font: 500 13.5px/1 var(--font-sans);
  color: var(--accent);
  text-decoration: none;
  letter-spacing: -0.005em;
  margin-top: 18px;
  transition: color var(--dur-fast) var(--ease-out);
}

.work-blog-link:hover {
  color: var(--accent-hover);
}

.work-seats {
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.seat-card {
  border: 1px solid var(--border);
  border-radius: var(--radius-lg);
  background: var(--surface-1);
  padding: 14px 16px;
}

.seat-label {
  font: 500 10px/1 var(--font-mono);
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--fg-3);
  margin-bottom: 8px;
}

.seat-desc {
  font: 400 13.5px/1.5 var(--font-sans);
  color: var(--fg-2);
}

.chips {
  display: flex;
  flex-wrap: wrap;
  gap: 7px;
  margin-top: 22px;
}

.chip {
  font: 400 11.5px/1 var(--font-mono);
  color: var(--fg-2);
  background: var(--surface-2);
  border: 1px solid var(--border);
  padding: 7px 11px;
  border-radius: var(--radius-pill);
  letter-spacing: 0.01em;
}

/* ----- write ----- */
.write-lede {
  font: 400 15px/1.6 var(--font-sans);
  color: var(--fg-1);
  margin: 0 0 4px;
  max-width: 640px;
}

.write-list {
  margin-top: 16px;
}

.write-row {
  display: grid;
  grid-template-columns: 1fr auto;
  gap: 22px;
  padding: 13px 12px;
  border-top: 1px solid var(--border);
  align-items: baseline;
  text-decoration: none;
  border-radius: var(--radius-md);
  transition: background var(--dur-fast) var(--ease-out);
}

.write-row:hover {
  background: var(--surface-1);
}

.write-row-last {
  border-bottom: 1px solid var(--border);
}

.write-title {
  font: 600 15.5px/1.3 var(--font-sans);
  color: var(--fg-1);
  letter-spacing: -0.015em;
}

.write-sum {
  font: 400 13px/1.5 var(--font-sans);
  color: var(--fg-2);
  margin: 4px 0 0;
  max-width: 640px;
}

.write-tag {
  font: 400 10.5px/1 var(--font-mono);
  color: var(--fg-3);
  letter-spacing: 0.04em;
}

.write-foot {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 14px;
  margin-top: 22px;
}

.write-where {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.write-foot-label {
  font: 500 10.5px/1 var(--font-mono);
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--fg-3);
}

.write-foot-body {
  font: 400 13.5px/1.6 var(--font-sans);
  color: var(--fg-2);
  margin: 0;
  max-width: 440px;
}

.write-foot-link {
  display: inline-flex;
  align-items: center;
  gap: 7px;
  font: 500 13px/1 var(--font-sans);
  color: var(--accent);
  text-decoration: none;
  letter-spacing: -0.005em;
  transition: color var(--dur-fast) var(--ease-out);
}

.write-foot-link:hover {
  color: var(--accent-hover);
}

.write-press {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.write-press-label {
  margin-bottom: 6px;
}

.press-card {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  border: 1px solid var(--border);
  border-radius: var(--radius-md);
  background: var(--surface-1);
  padding: 14px 16px;
  text-decoration: none;
  transition: border-color var(--dur-fast) var(--ease-out);
}

.press-card:hover {
  border-color: var(--accent);
}

.press-text {
  display: flex;
  flex-direction: column;
  gap: 3px;
}

.press-title {
  font: 600 13.5px/1.3 var(--font-sans);
  color: var(--fg-1);
}

.press-src {
  font: 400 11.5px/1 var(--font-mono);
  color: var(--fg-3);
}

/* ----- about ----- */
.about-row {
  display: flex;
  gap: 24px;
  align-items: flex-start;
}

.about-avatar {
  width: 52px;
  height: 52px;
  border-radius: 50%;
  border: 1px solid var(--border);
  object-fit: cover;
  flex-shrink: 0;
  margin-top: 5px;
}

.about-text {
  font: 400 15px/1.6 var(--font-sans);
  color: var(--fg-1);
  margin: 0;
  max-width: 620px;
  letter-spacing: -0.01em;
  text-wrap: pretty;
}

.about-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 22px;
  align-items: center;
}

.btn {
  display: inline-flex;
  align-items: center;
  gap: 7px;
  font: 600 13px/1 var(--font-sans);
  background: var(--bg);
  color: var(--fg-1);
  border: 1px solid var(--border);
  padding: 10px 15px;
  border-radius: var(--radius-md);
  text-decoration: none;
  letter-spacing: -0.005em;
  transition:
    background var(--dur-fast) var(--ease-out),
    border-color var(--dur-fast) var(--ease-out);
}

.btn:hover {
  background: var(--surface-2);
}

.btn-primary {
  background: var(--ink);
  color: var(--bg);
  border-color: var(--ink);
}

.btn-primary:hover {
  background: var(--fg-2);
  border-color: var(--fg-2);
}

.about-cv {
  font: 400 12px/1 var(--font-mono);
  color: var(--fg-3);
  margin-left: 6px;
}

/* ----- responsive ----- */
@media (max-width: 880px) {
  .hero-inner {
    grid-template-columns: 1fr;
    gap: 40px;
    align-items: start;
    padding-top: 64px;
  }

  .hero-title {
    font-size: clamp(32px, 6.5vw, 42px);
  }

  .work-grid {
    grid-template-columns: 1fr;
    gap: 28px;
  }

  .write-foot {
    grid-template-columns: 1fr;
    gap: 32px;
  }
}

@media (max-width: 760px) {
  .flagship {
    grid-template-columns: 1fr;
    gap: 28px;
    padding: 28px;
  }

  .cards-2 {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 640px) {
  .nav-link {
    padding: 5px 6px;
    font-size: 12px;
  }

  .hero-inner,
  .sec-inner {
    padding-left: 20px;
    padding-right: 20px;
  }

  .sec-aside {
    display: none;
  }

  .write-row {
    grid-template-columns: 1fr;
    gap: 8px;
  }

  .about-row {
    flex-direction: column;
    gap: 18px;
  }
}
</style>
