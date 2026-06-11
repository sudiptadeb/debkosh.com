# debkosh.com

Personal site for Sudipta Deb. Not a CV: it shows what he builds and how he thinks.

Built with Nuxt 3 + @nuxt/content on the Deb Design System (Space Grotesk + Space Mono,
layered surfaces, single Sky accent, hairline borders). Static generation, no server.

## Pages

| Route | What it is |
|---|---|
| `/` | The hub: hero + meta panel, Build (memd flagship, termulaa/keysat/sackup), Work (Ulaa + SASE stack), Write, About |
| `/blogs` | Blog index, year-grouped, driven by `content/blog/*.md` |
| `/blogs/<slug>` | Article template: series eyebrow, short-version callout, prose, next-in-series card |
| `/labs` | Project index, maintained tools only |

## Content

Blog posts are Markdown files in `content/blog/` with frontmatter:

```yaml
title: 'The extension ceiling, part 1: mandatory screen recording'  # index + SEO title
heading: Mandatory screen recording   # article h1 (falls back to title)
date: 2026-01-20
minutes: 7                            # read time shown in the meta row
series: The extension ceiling         # optional, drives the eyebrow + Series tag
part: 1                               # optional, with series
parts: 3                              # optional, with series
tag: Byline                           # optional, shown when there is no series
summary: One or two sentences for the index row and meta description.
short: The "short version" callout shown at the top of the article.
---
Body in Markdown. Tables render as the design's comparison table.
```

Four posts are fully written, three are frontmatter-only stubs (their pages show a
"still being written up" line). Add a body to complete a stub.

## Develop and build

```sh
npm install
npm run dev        # dev server on :3000
npm run generate   # static site → .output/public
```

## Deploy

GitHub Actions (`.github/workflows/deploy.yml`) builds on every push to `main` or
`claude/**` and deploys to the Cloudflare Pages project `debkosh-com`:

- `main` → production, https://debkosh-com.pages.dev
- other branches → preview deployments

The workflow needs two repository secrets (Settings → Secrets and variables → Actions):
`CLOUDFLARE_API_TOKEN` (custom token with Account → Cloudflare Pages → Edit) and
`CLOUDFLARE_ACCOUNT_ID`. Without them it still builds and uploads the bundle as a
workflow artifact, it just skips the deploy.

Going live on the real domain is one click once you're ready:
Cloudflare → Workers & Pages → debkosh-com → Custom domains → add `debkosh.com`.

## Placeholders to replace

These shipped as invented values, swap in the real ones:

- `hello@debkosh.com` (all mailto links)
- Post dates in `content/blog/*.md`
- Project years on `/labs`
- Hero meta panel rows ("Now", "Focus", "Building")
- Featured/press links currently point at the LinkedIn profile, not the actual articles
- `memd.debkosh.com` docs link on the memd flagship card
