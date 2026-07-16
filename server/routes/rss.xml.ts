// RSS 2.0 feed for the blog, prerendered into the static output (see
// nitro.prerender.routes in nuxt.config.ts). Dependency-free on purpose.
import { serverQueryContent } from '#content/server'

const SITE = 'https://debkosh.com'

/** Escape text for use inside XML element content or attributes. */
function escapeXml(value: unknown): string {
  return String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;')
}

/** RFC-822 date, as RSS 2.0 expects (e.g. "Mon, 06 Jan 2025 00:00:00 GMT"). */
function toRfc822(date: unknown): string {
  const parsed = new Date(date as string)
  return Number.isNaN(parsed.getTime()) ? '' : parsed.toUTCString()
}

export default defineEventHandler(async (event) => {
  const posts = await serverQueryContent(event, '/blog').sort({ date: -1 }).find()

  const items = posts
    .map((post) => {
      const slug = (post._path ?? '').split('/').filter(Boolean).pop() ?? ''
      const link = `${SITE}/blogs/${slug}`
      const pubDate = toRfc822(post.date)
      return [
        '    <item>',
        `      <title>${escapeXml(post.title)}</title>`,
        `      <link>${escapeXml(link)}</link>`,
        `      <guid>${escapeXml(link)}</guid>`,
        pubDate ? `      <pubDate>${pubDate}</pubDate>` : null,
        `      <description>${escapeXml(post.summary)}</description>`,
        '    </item>',
      ]
        .filter(Boolean)
        .join('\n')
    })
    .join('\n')

  const feed = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<rss version="2.0">',
    '  <channel>',
    `    <title>${escapeXml('Sudipta Deb · debkosh.com')}</title>`,
    `    <link>${SITE}/blogs</link>`,
    `    <description>${escapeXml(
      'Long-form on enterprise browsers, proxies, and enforcement. How it actually works, what the tradeoffs really cost.'
    )}</description>`,
    '    <language>en</language>',
    items,
    '  </channel>',
    '</rss>',
    '',
  ].join('\n')

  setResponseHeader(event, 'content-type', 'application/rss+xml; charset=utf-8')
  return feed
})
