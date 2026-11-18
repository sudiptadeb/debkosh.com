<template>
  <div>
    <SiteHeader :max-width="1040" nav-gap="16px">
      <template #brand>
        <SiteBrand domain="debkosh.com/labs" />
      </template>
      <template #nav>
        <NuxtLink to="/" class="nav-link">debkosh.com</NuxtLink>
        <NuxtLink to="/blogs" class="nav-link">blog</NuxtLink>
      </template>
    </SiteHeader>

    <!-- MASTHEAD -->
    <section class="masthead">
      <div class="masthead-inner">
        <div class="eyebrow">The lab</div>
        <h1 class="masthead-title">The tools I keep running.</h1>
        <p class="masthead-sub">
          Each entry is real, builds, and did the job I made it for. Experiments graduate here
          once they're worth showing.
        </p>
        <div class="legend">
          <span class="legend-item"><span class="legend-dot" />Maintained</span>
        </div>
      </div>
    </section>

    <!-- MAINTAINED -->
    <section class="ledger">
      <div class="ledger-head-row">
        <h2 class="ledger-title">What I keep running</h2>
        <span class="ledger-count">{{ tools.length }} tools</span>
      </div>

      <div class="table-head">
        <span>Project</span>
        <span>What it is</span>
        <span>Stack</span>
        <span>Year</span>
        <span class="th-right">Link</span>
      </div>

      <div v-for="tool in tools" :key="tool.name" class="table-row">
        <div class="cell-project">
          <span class="dot" />
          <a
            :href="tool.home || repoUrl(tool)"
            :target="tool.home?.startsWith('/') ? undefined : '_blank'"
            rel="noopener"
            class="project-name row-link"
          >{{ tool.name }}</a>
          <span v-if="tool.flagship" class="flag-pill">Flagship</span>
        </div>
        <div class="cell-desc">{{ tool.desc }}</div>
        <div class="cell-mono">{{ tool.stack }}</div>
        <div class="cell-mono">{{ tool.year }}</div>
        <div class="cell-link">
          <a v-if="tool.home" :href="tool.home" :target="tool.home.startsWith('/') ? undefined : '_blank'" rel="noopener">
            {{ tool.home.startsWith('/') ? 'debkosh.com' + tool.home : tool.home.replace('https://', '') }}
            <Icon :name="tool.home.startsWith('/') ? 'arrow-right' : 'arrow-up-right'" :size="12" />
          </a>
          <a :href="repoUrl(tool)" target="_blank" rel="noopener">
            sudiptadeb/{{ tool.name }} <Icon name="arrow-up-right" :size="12" />
          </a>
        </div>
      </div>

      <div class="ledger-note">
        <span>Everything else lives at</span>
        <a href="https://github.com/sudiptadeb" target="_blank" rel="noopener">github.com/sudiptadeb</a>
      </div>
    </section>

    <SiteFooter :max-width="1040" label="debkosh.com/labs" :margin-top="72">
      <NuxtLink to="/">debkosh.com</NuxtLink>
      <NuxtLink to="/blogs">blog</NuxtLink>
      <a href="https://github.com/sudiptadeb" target="_blank" rel="noopener">github</a>
    </SiteFooter>
  </div>
</template>

<script setup lang="ts">
type Tool = { name: string; desc: string; stack: string; year: string; flagship?: boolean; home?: string }
const repoUrl = (t: Tool) => `https://github.com/sudiptadeb/${t.name}`

const tools: Tool[] = [
  {
    name: 'memd',
    home: 'https://memd.debkosh.com',
    flagship: true,
    desc: 'A file-first memory system for AI agents. Markdown files you own and version, the server is only an adapter.',
    stack: 'Markdown · Git · MCP',
    year: '2026',
  },
  {
    name: 'project-b',
    home: '/project-b',
    desc: 'An experiment in better browser architecture: a web-based shell anyone can customise, a small, safe Go core that owns every decision, and Chromium\'s unpatched content layer rendering pages behind one engine interface. Releases for Apple silicon Macs and arm64 Android. Development is ongoing.',
    stack: 'Go · HTML/JS shell · Chromium · C++',
    year: '2026',
  },
  {
    name: 'linfer',
    desc: 'The best local LLM setup for your machine: picks llama.cpp or MLX, installs it, fetches and sizes the model, serves one OpenAI-compatible URL.',
    stack: 'Go · llama.cpp · oMLX',
    year: '2026',
  },
  {
    name: 'linfer-bench',
    desc: 'Benchmarks OpenAI-compatible endpoints the way agents use them: decode and prefill speed, tool-calling accuracy, needle retrieval, tagged runs.',
    stack: 'Go · HTML report',
    year: '2026',
  },
  {
    name: 'amarit',
    desc: 'Keep it alive, keep it current: amarit run keeps any command up through crashes and reboots, and one line makes a Go program update itself with rollback. One-line install.',
    stack: 'Go · launchd · systemd',
    year: '2026',
  },
  {
    name: 'termulaa',
    desc: 'Terminal and coding agents in a browser tab. Sessions survive the tab closing; reach your machines through an outbound tunnel, an Android app, or termulaa exec.',
    stack: 'Go · xterm.js · WebSocket',
    year: '2025',
  },
  {
    name: 'etchosts',
    desc: 'An /etc/hosts file for Android without root: a local DNS-only VPN that answers your names on the phone and forwards the rest over DoH or UDP.',
    stack: 'Kotlin · VpnService · DoH',
    year: '2026',
  },
  {
    name: 'synckosh',
    desc: 'End-to-end encrypted sync for apps that keep the user\'s data on their devices. The server stores items but can\'t read them, the newest edit wins per item, and it mounts as a Go http.Handler behind your own sign-in.',
    stack: 'Go · bbolt',
    year: '2026',
  },
  {
    name: 'keykosh',
    desc: 'Signing keys and secrets in one folder, sealed with one passphrase using age, so it can live in a private git repo. Clone it on a new machine, unlock, and every key is back.',
    stack: 'Go · age · git',
    year: '2026',
  },
  {
    name: 'gulal',
    home: '/gulal',
    desc: 'Colours made for where they sit: random, seeded or from text, palettes that sit well together, and for any background the border and inks that read on it. The same output in Go and TypeScript.',
    stack: 'Go · TypeScript · OKLCH · APCA',
    year: '2026',
  },
  {
    name: 'deskrig',
    desc: 'One testing interface for agents: window screenshots, real clicks, keys and trackpad scrolls, a frame stream and DMG installs, on this Mac or a clean macOS VM. Works without a display.',
    stack: 'Go · macOS · Tart',
    year: '2026',
  },
  {
    name: 'keysat',
    desc: 'Local-first keystroke and activity tracking for macOS. Searchable, charted, never leaves the machine.',
    stack: 'Go · SQLite + FTS5 · Alpine.js',
    year: '2025',
  },
  {
    name: 'sackup',
    desc: 'Phone backup to a USB drive, simple enough for your parents. Offline, resumable, verified.',
    stack: 'Kotlin · Compose · USB-OTG',
    year: '2024',
  },
]

useSeoMeta({
  title: 'Lab',
  description:
    'The maintained tools, indexed: memd, project-b, linfer, linfer-bench, amarit, termulaa, etchosts, synckosh, keykosh, gulal, deskrig, keysat, and sackup. Each entry is real, builds, and did the job it was made for.',
  ogTitle: 'The lab · Sudipta Deb',
  ogDescription: 'The tools I keep running.',
  ogImage: 'https://debkosh.com/og/default.png',
  ogUrl: 'https://debkosh.com/labs',
})

useHead({
  link: [{ rel: 'canonical', href: 'https://debkosh.com/labs' }],
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
  max-width: 1040px;
  margin: 0 auto;
  padding: 44px 40px 30px;
}

.eyebrow {
  font: 500 10.5px/1 var(--font-mono);
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--fg-3);
  margin-bottom: 14px;
}

.masthead-title {
  font: 600 32px/1.05 var(--font-sans);
  letter-spacing: -0.035em;
  color: var(--fg-1);
  margin: 0;
  max-width: 680px;
  text-wrap: balance;
}

.masthead-sub {
  font: 400 14px/1.6 var(--font-sans);
  color: var(--fg-2);
  margin: 12px 0 0;
  max-width: 600px;
}

.legend {
  display: flex;
  gap: 24px;
  margin-top: 18px;
  font: 400 11.5px/1 var(--font-mono);
  color: var(--fg-3);
  letter-spacing: 0.02em;
}

.legend-item {
  display: inline-flex;
  align-items: center;
  gap: 7px;
}

.legend-dot,
.dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--success);
  flex-shrink: 0;
}

.ledger {
  max-width: 1040px;
  margin: 0 auto;
  padding: 30px 40px 0;
}

.ledger-head-row {
  display: flex;
  align-items: baseline;
  gap: 14px;
  margin-bottom: 12px;
}

.ledger-title {
  font: 600 18px/1 var(--font-sans);
  letter-spacing: -0.02em;
  color: var(--fg-1);
  margin: 0;
}

.ledger-count {
  margin-left: auto;
  font: 400 12px/1 var(--font-mono);
  color: var(--fg-3);
}

.table-head,
.table-row {
  display: grid;
  grid-template-columns: 170px minmax(0, 1fr) 190px 52px 170px;
  gap: 20px;
}

.table-head {
  padding: 0 14px 10px;
  border-bottom: 1px solid var(--border-strong);
}

.table-head span {
  font: 500 9.5px/1 var(--font-mono);
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--fg-3);
}

.th-right {
  text-align: right;
}

.table-row {
  align-items: baseline;
  padding: 12px 14px;
  border-bottom: 1px solid var(--border);
  border-radius: var(--radius-md);
  transition: background var(--dur-fast) var(--ease-out);
}

.table-row:hover {
  background: var(--surface-1);
}

/* The project name is the row's link; the whole row clicks through to it. */
.table-row {
  position: relative;
}

.row-link {
  text-decoration: none;
  background-image: linear-gradient(var(--accent), var(--accent));
  background-size: 0 1.5px;
  background-position: 0 100%;
  background-repeat: no-repeat;
  transition: color var(--dur-fast) var(--ease-out), background-size var(--dur-fast) var(--ease-out);
}

.row-link::after {
  content: '';
  position: absolute;
  inset: 0;
}

.table-row:hover .row-link,
.row-link:focus-visible {
  color: var(--accent);
  background-size: 100% 1.5px;
}

.cell-link {
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 8px;
}

.cell-project {
  display: flex;
  align-items: center;
  gap: 9px;
}

.project-name {
  font: 600 14px/1.2 var(--font-sans);
  letter-spacing: -0.02em;
  color: var(--fg-1);
}

.flag-pill {
  font: 500 8.5px/1 var(--font-mono);
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--accent);
  background: var(--accent-soft);
  padding: 3px 6px;
  border-radius: var(--radius-pill);
}

.cell-desc {
  font: 400 12.5px/1.5 var(--font-sans);
  color: var(--fg-2);
}

.cell-mono {
  font: 400 11px/1.6 var(--font-mono);
  color: var(--fg-3);
}

.cell-link {
  text-align: right;
}

.cell-link a {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  font: 500 11px/1 var(--font-mono);
  color: var(--accent);
  text-decoration: none;
  white-space: nowrap;
  transition: color var(--dur-fast) var(--ease-out);
}

.cell-link a:hover {
  color: var(--accent-hover);
}

.ledger-note {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-top: 20px;
  font: 400 12px/1.5 var(--font-mono);
  color: var(--fg-3);
  flex-wrap: wrap;
}

.ledger-note a {
  color: var(--accent);
  text-decoration: none;
  transition: color var(--dur-fast) var(--ease-out);
}

.ledger-note a:hover {
  color: var(--accent-hover);
}

@media (max-width: 880px) {
  .table-head {
    display: none;
  }

  .table-row {
    grid-template-columns: 1fr;
    gap: 8px;
  }

  .cell-link {
    text-align: left;
    flex-direction: row;
    flex-wrap: wrap;
    gap: 14px;
    align-items: center;
  }
}

@media (max-width: 640px) {
  .masthead-inner,
  .ledger {
    padding-left: 20px;
    padding-right: 20px;
  }

  .masthead-title {
    font-size: clamp(26px, 7vw, 32px);
  }
}
</style>
