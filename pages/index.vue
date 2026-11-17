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
            <NuxtLink to="/blogs" class="meta-val meta-link">debkosh.com/blogs</NuxtLink>
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
            <p class="flagship-tagline">Teach it once, every agent knows it.</p>
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
              src="/images/memd.webp"
              alt="memd, an agent reading and maintaining its Markdown memory files"
              loading="lazy"
            />
          </div>
        </div>

        <!-- project-b -->
        <div class="flagship flagship-second">
          <div>
            <div class="flagship-pill">Experiment · v0.2.79</div>
            <h3 class="flagship-name">Project B</h3>
            <p class="flagship-tagline">
              An experiment in how a browser could be built with a better architecture.
            </p>
            <p class="flagship-body">
              A Go core owns every decision. The interface on top is a web page you can swap, and
              Chromium's content layer renders the pages, unpatched, behind one engine interface. It
              runs as a daily browser: per-site settings with an ad blocker, link blocking and
              userscripts, downloads, printing, a first-run welcome, and default-browser support.
              One tree builds a Mac DMG and an Android APK, and installed copies update themselves.
            </p>
            <div class="flagship-stack">
              Go · Svelte shells · C++ · Chromium 155 content layer · macOS + Android
            </div>
            <div class="flagship-links">
              <NuxtLink to="/project-b" class="flagship-btn">
                <span class="flagship-btn-label">Tour</span>debkosh.com/project-b
                <Icon name="arrow-right" :size="13" stroke="var(--fg-3)" />
              </NuxtLink>
              <a href="https://github.com/sudiptadeb/project-b" target="_blank" rel="noopener" class="flagship-btn">
                <span class="flagship-btn-label">Code</span>sudiptadeb/project-b
                <Icon name="arrow-up-right" :size="13" stroke="var(--fg-3)" />
              </a>
              <a href="https://github.com/sudiptadeb/project-b/releases" target="_blank" rel="noopener" class="flagship-btn">
                <span class="flagship-btn-label">Get it</span>Releases
                <Icon name="arrow-up-right" :size="13" stroke="var(--fg-3)" />
              </a>
            </div>
          </div>
          <div class="flagship-media">
            <img
              src="/images/project-b.webp"
              alt="Project B in the dark theme with a teal frame on a Mac, showing stripe.com, and the Mobile shell on an Android phone"
              loading="lazy"
            />
          </div>
        </div>

        <!-- local AI stack -->
        <div class="cards-2">
          <div class="card card-media">
            <div class="card-img">
              <img
                src="/images/linfer-doctor.webp"
                alt="linfer doctor on a 256 GB Apple Silicon machine, picking the backend and printing the URL and model id for the client"
                loading="lazy"
              />
            </div>
            <div class="card-body">
              <div class="card-head">
                <h3 class="card-name">linfer</h3>
                <span class="card-cat">Local LLMs</span>
              </div>
              <p class="card-tagline">
                The best local inference setup for your machine, without the hassle.
              </p>
              <p class="card-desc">
                Picks llama.cpp or MLX for the hardware, installs it, fetches the model, sizes the
                launch to the memory left after the weights, and hands your client one URL that never
                changes. On one 256 GB Mac the right runtime made an agent call 2.6× faster than
                Ollama.
              </p>
              <div class="card-stack">Go · llama.cpp · oMLX · OpenAI-compatible</div>
              <a href="https://github.com/sudiptadeb/linfer" target="_blank" rel="noopener" class="card-repo">
                sudiptadeb/linfer <Icon name="arrow-up-right" :size="13" />
              </a>
            </div>
          </div>

          <div class="card card-media">
            <div class="card-img">
              <img
                src="/images/linfer-bench-report.webp"
                alt="a linfer-bench report comparing llama.cpp and MLX: verdict and throughput charts"
                loading="lazy"
              />
            </div>
            <div class="card-body">
              <div class="card-head">
                <h3 class="card-name">linfer-bench</h3>
                <span class="card-cat">Benchmark</span>
              </div>
              <p class="card-tagline">
                Benchmark any OpenAI-compatible endpoint the way an agent uses it.
              </p>
              <p class="card-desc">
                Decode and prefill speed cold and warm, tool-calling accuracy case by case, needle
                retrieval. Tag runs and compare them, so a backend upgrade gets a before and after
                instead of a feeling.
              </p>
              <div class="card-stack">Go · OpenAI-compatible · HTML report</div>
              <a href="https://github.com/sudiptadeb/linfer-bench" target="_blank" rel="noopener" class="card-repo">
                sudiptadeb/linfer-bench <Icon name="arrow-up-right" :size="13" />
              </a>
            </div>
          </div>
        </div>

        <!-- terminal and ops -->
        <div class="cards-2">
          <div class="card card-media">
            <div class="card-img">
              <img
                src="/images/termulaa-hero.webp"
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
                One small Go binary, loopback-only. Sessions survive the tab closing and come back
                exactly as they were. Reach your machines from anywhere through an outbound tunnel,
                from an Android app that pings you when an agent prints, or with
                <code>termulaa exec laptop -- make test</code> from a script.
              </p>
              <div class="card-stack">Go · xterm.js · WebSocket · Android</div>
              <a href="https://github.com/sudiptadeb/termulaa" target="_blank" rel="noopener" class="card-repo">
                sudiptadeb/termulaa <Icon name="arrow-up-right" :size="13" />
              </a>
            </div>
          </div>

          <div class="card card-media">
            <div class="card-img card-img-left">
              <img
                src="/images/amarit-keep-alive.gif"
                alt="amarit installing, running a web server, and bringing it back after a crash"
                loading="lazy"
              />
            </div>
            <div class="card-body">
              <div class="card-head">
                <h3 class="card-name">amarit</h3>
                <span class="card-cat">Ops · Go library</span>
              </div>
              <p class="card-tagline">Keep it alive. Keep it current.</p>
              <p class="card-desc">
                <code>amarit run</code> keeps any command running through crashes and reboots, with
                its logs kept. Add one line to a Go program and every installed copy updates itself,
                checksum-verified, rolling back if the new version doesn't come up. No config, no
                root, no ports.
              </p>
              <div class="card-stack card-install">curl -fsSL https://raw.githubusercontent.com/sudiptadeb/amarit/main/install.sh | sh</div>
              <a href="https://github.com/sudiptadeb/amarit" target="_blank" rel="noopener" class="card-repo">
                sudiptadeb/amarit <Icon name="arrow-up-right" :size="13" />
              </a>
            </div>
          </div>
        </div>

        <!-- synckosh, keykosh -->
        <div class="cards-2">
          <div class="card">
            <div class="card-body card-body-flat">
              <div class="card-head">
                <h3 class="card-name">synckosh</h3>
                <span class="card-cat">Sync · Go library</span>
              </div>
              <p class="card-tagline">Sync for apps that keep the user's data on their devices.</p>
              <p class="card-desc">
                The server stores every item but can't read it: each one is sealed with a key only
                the devices hold, and the server can't forge or alter one unnoticed. The newest edit
                wins per item, devices work offline, and the server is an
                <code>http.Handler</code> you mount behind your own sign-in.
              </p>
              <div class="card-stack">Go · bbolt · end-to-end encrypted</div>
              <a href="https://github.com/sudiptadeb/synckosh" target="_blank" rel="noopener" class="card-repo">
                sudiptadeb/synckosh <Icon name="arrow-up-right" :size="13" />
              </a>
            </div>
          </div>

          <div class="card">
            <div class="card-body card-body-flat">
              <div class="card-head">
                <h3 class="card-name">keykosh</h3>
                <span class="card-cat">Secrets · CLI</span>
              </div>
              <p class="card-tagline">Your keys in one folder, sealed with one passphrase.</p>
              <p class="card-desc">
                Signing keys and secrets are sealed with age, so the folder can live in a private git
                repo. On a new machine you clone it, type the passphrase, and every key is back where
                it was. Sealing needs no passphrase, so scripts and agents can add keys they cannot
                read.
              </p>
              <div class="card-stack">Go · age · git</div>
              <a href="https://github.com/sudiptadeb/keykosh" target="_blank" rel="noopener" class="card-repo">
                sudiptadeb/keykosh <Icon name="arrow-up-right" :size="13" />
              </a>
            </div>
          </div>
        </div>

        <!-- keysat, etchosts -->
        <div class="cards-2">
          <div class="card card-media">
            <div class="card-img">
              <img
                src="/images/keysat-overview.webp"
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

          <div class="card card-media">
            <div class="card-img">
              <img
                src="/images/etchosts.webp"
                alt="etc hosts on Android: the override on with three names, and recent lookups answered locally"
                loading="lazy"
              />
            </div>
            <div class="card-body">
              <div class="card-head">
                <h3 class="card-name">etchosts</h3>
                <span class="card-cat">Android</span>
              </div>
              <p class="card-tagline">An /etc/hosts file for your phone, without root.</p>
              <p class="card-desc">
                A local VPN that carries only DNS. Names in your list are answered on the phone,
                everything else goes to the resolver you pick over DoH or UDP. Point a phone at a
                staging box by name, per app if you like. Edits apply live.
              </p>
              <div class="card-stack">Kotlin · VpnService · DoH</div>
              <a href="https://github.com/sudiptadeb/etchosts" target="_blank" rel="noopener" class="card-repo">
                sudiptadeb/etchosts <Icon name="arrow-up-right" :size="13" />
              </a>
            </div>
          </div>
        </div>

        <!-- deskrig, sackup -->
        <div class="cards-2">
          <div class="card">
            <div class="card-body card-body-flat">
              <div class="card-head">
                <h3 class="card-name">deskrig</h3>
                <span class="card-cat">Testing · agents</span>
              </div>
              <p class="card-tagline">Let an agent test an app the way a person would.</p>
              <p class="card-desc">
                Screenshots of one window, real clicks, keys and trackpad scrolls, a live frame
                stream, and DMG installs, on this Mac's desktop or in a clean macOS VM with the same
                commands. Works from agent shells, ssh and CI, which have no display.
              </p>
              <div class="card-stack">Go · macOS · Tart</div>
              <a href="https://github.com/sudiptadeb/deskrig" target="_blank" rel="noopener" class="card-repo">
                sudiptadeb/deskrig <Icon name="arrow-up-right" :size="13" />
              </a>
            </div>
          </div>

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
        </div>

        <!-- more -->
        <div class="cards-2">
          <div class="more-card more-wide">
            <div class="more-head">
              <span class="more-label">More</span>
              <span class="more-sub">Smaller builds and experiments.</span>
            </div>
            <p class="more-body">
              A Chrome sync analyzer, a Chrome Enterprise URL-pattern matcher, a child-learning
              kiosk.
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
              Deep-dives on the blog <Icon name="arrow-right" :size="14" />
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
                recording, Chrome sync MDM scoping, incognito bypass, DLP on the page vs the wire.
              </p>
            </div>
            <span class="write-tag">SERIES · 4 PARTS</span>
          </NuxtLink>
          <NuxtLink to="/blogs/enterprise-browser-pam-collision" class="write-row">
            <div>
              <div class="write-title">The enterprise browser and PAM are on a collision course</div>
              <p class="write-sum">
                Two categories holding half of the same buyer's problem. Whoever closes the gap
                wins more than the extension argument.
              </p>
            </div>
            <span />
          </NuxtLink>
          <NuxtLink to="/blogs/why-rdp-cant-authenticate-like-ssh" class="write-row">
            <div>
              <div class="write-title">Why RDP can't authenticate like SSH</div>
              <p class="write-sum">
                SSH solved short-lived, identity-attributed access with a one-page config. RDP
                needs an Active Directory project. The gap is structural.
              </p>
            </div>
            <span />
          </NuxtLink>
          <NuxtLink to="/blogs/merging-the-browser-and-the-sase-stack" class="write-row write-row-last">
            <div>
              <div class="write-title">Merging the browser and the SASE stack</div>
              <p class="write-sum">What enforcement actually looks like when you merge them.</p>
            </div>
            <span />
          </NuxtLink>
        </div>

        <div class="write-foot">
          <div class="write-where">
            <div class="write-foot-label">Where it lives</div>
            <p class="write-foot-body">
              LinkedIn is where these get posted and reach the enterprise-browser-security crowd.
              The canonical long-form versions live here, at debkosh.com/blogs.
            </p>
            <NuxtLink to="/blogs" class="write-foot-link">
              Read the blog <Icon name="arrow-right" :size="13" />
            </NuxtLink>
          </div>
          <div class="write-press">
            <div class="write-foot-label write-press-label">Featured / press</div>
            <a
              href="https://ulaa.com/enterprise/blogs/browsers-new-endpoint.html"
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
    'Sudipta Deb builds the things he couldn\'t find and writes the things whitepapers won\'t. Ulaa, an enterprise browser, the SASE stack underneath it, and tools like memd, Project B, synckosh, linfer, amarit, and termulaa.',
  ogTitle: 'Sudipta Deb · debkosh.com',
  ogDescription:
    'I build the things I couldn\'t find, and write the things whitepapers won\'t.',
  ogImage: 'https://debkosh.com/og/default.png',
  ogUrl: 'https://debkosh.com/',
})

useHead({
  link: [{ rel: 'canonical', href: 'https://debkosh.com/' }],
  script: [
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'Person',
        name: 'Sudipta Deb',
        url: 'https://debkosh.com',
        sameAs: [
          'https://github.com/sudiptadeb',
          'https://www.linkedin.com/in/-sudiptadeb',
        ],
        jobTitle: 'Platform & security lead',
        description:
          'I build the things I couldn\'t find, and write the things whitepapers won\'t.',
      }),
    },
  ],
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

.more-wide {
  grid-column: 1 / -1;
}

.flagship-second {
  margin-top: 12px;
}

.card-install {
  overflow-wrap: anywhere;
  user-select: all;
}

.card-img-left img {
  object-position: left top;
}

.card-desc code {
  font: 400 0.92em/1 var(--font-mono);
  color: var(--fg-1);
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
