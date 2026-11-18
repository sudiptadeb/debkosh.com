// The gulal playground: mount(el, { env }) draws it into el. It takes its colours and type
// from the page through CSS variables (--gp-bg, --gp-fg, --gp-muted, --gp-line, --gp-card,
// --gp-font, --gp-mono), so it sits in any page; index.html beside it gives them values.

const STYLE = `
.gp { display: grid; gap: 28px; color: var(--gp-fg, #111); font-family: var(--gp-font, system-ui, sans-serif); }
.gp * { box-sizing: border-box; }
.gp h3 { font-size: 15px; margin: 0 0 4px; }
.gp p { margin: 0; color: var(--gp-muted, #666); font-size: 13px; max-width: 68ch; }
.gp .row { display: flex; flex-wrap: wrap; gap: 10px 18px; align-items: center; }
.gp label.f { display: flex; gap: 8px; align-items: center; font-size: 13px; }
.gp .lbl { font-size: 12px; color: var(--gp-muted, #666); }
.gp input[type=color] { width: 32px; height: 32px; border: 1px solid var(--gp-line, #ddd); border-radius: 6px; padding: 0; background: none; cursor: pointer; }
.gp input[type=color]::-webkit-color-swatch-wrapper { padding: 0; }
.gp input[type=color]::-webkit-color-swatch { border: 0; border-radius: 5px; }
.gp input[type=text], .gp input[type=number] { font: 13px var(--gp-mono, ui-monospace, monospace); padding: 6px 8px; border: 1px solid var(--gp-line, #ddd); border-radius: 6px; background: var(--gp-card, #fff); color: var(--gp-fg, #111); min-width: 0; }
.gp input[type=number] { width: 64px; }
.gp .seg { display: inline-flex; border: 1px solid var(--gp-line, #ddd); border-radius: 6px; overflow: hidden; }
.gp .seg button, .gp button.b { font: 500 12px var(--gp-font, system-ui); border: 0; background: transparent; color: var(--gp-fg, #111); padding: 6px 10px; cursor: pointer; }
.gp button.b { border: 1px solid var(--gp-line, #ddd); border-radius: 6px; }
.gp .seg button[aria-pressed=true] { background: var(--gp-fg, #111); color: var(--gp-bg, #fff); }
.gp button:focus-visible, .gp input:focus-visible { outline: 2px solid var(--gp-fg, #111); outline-offset: 2px; }
.gp .stage { border-radius: 10px; padding: 16px; border: 1px solid var(--gp-line, #ddd); display: grid; gap: 14px; min-width: 0; }
.gp .two { display: grid; grid-template-columns: minmax(0, 300px) minmax(0, 1fr); gap: 16px; align-items: start; }
@media (max-width: 720px) { .gp .two { grid-template-columns: 1fr; } }
.gp .card { border: 1.5px solid; border-radius: 8px; padding: 12px 14px; display: grid; gap: 2px; }
.gp .card .t { font-weight: 700; font-size: 15px; margin-bottom: 4px; }
.gp .card .ln { display: flex; justify-content: space-between; gap: 10px; font-weight: 600; font-size: 13px; }
.gp .card .ln span { font-weight: 400; font-size: 11px; opacity: .75; font-family: var(--gp-mono, ui-monospace, monospace); }
.gp table { border-collapse: collapse; font-size: 12.5px; width: 100%; }
.gp td, .gp th { text-align: left; padding: 5px 8px; border-bottom: 1px solid var(--gp-line, #ddd); white-space: nowrap; }
.gp th { color: var(--gp-muted, #666); font-weight: 500; }
.gp td code { font: 12px var(--gp-mono, ui-monospace, monospace); }
.gp .chip { display: inline-block; width: 14px; height: 14px; border-radius: 4px; vertical-align: -2px; margin-right: 6px; border: 1px solid var(--gp-line, #ddd); }
.gp .scroll { overflow-x: auto; }
.gp .tiles { display: grid; grid-template-columns: repeat(auto-fill, minmax(70px, 1fr)); gap: 12px 8px; }
.gp .tile { display: grid; justify-items: center; gap: 6px; font-size: 11px; min-width: 0; }
.gp .tile span { max-width: 70px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.gp .mark { width: 40px; height: 40px; border-radius: 8px; display: grid; place-items: center; font-weight: 700; font-size: 17px; }
.gp .strip { display: flex; flex-wrap: wrap; gap: 6px; }
.gp .strip i { width: 34px; height: 34px; border-radius: 6px; display: block; }
.gp pre { margin: 0; font: 12px/1.55 var(--gp-mono, ui-monospace, monospace); background: var(--gp-card, #f6f6f6); border: 1px solid var(--gp-line, #ddd); border-radius: 8px; padding: 12px; overflow-x: auto; white-space: pre; }
.gp .replay { font: 11.5px var(--gp-mono, ui-monospace, monospace); color: var(--gp-muted, #666); word-break: break-all; }
`;

const PRESETS = [
  ['Light', { scheme: 'light', background: '#ffffff', accent: '#0faaaa' }],
  ['Dark', { scheme: 'dark', background: '#1c1d20', accent: '#faa804' }],
  ['Navy on cream', { scheme: 'light', background: '#f6efe3', accent: '#1d3557' }],
  ['Pine on sage', { scheme: 'light', background: '#608a82', accent: '#104746' }],
  ['Teal on mint', { scheme: 'light', background: '#00ffcc', accent: '#034948' }],
  ['Coral on midnight', { scheme: 'dark', background: '#1b1f3b', accent: '#ff7a5c' }],
];

const HOSTS = 'example.com, news.example.com, shop.example.com, notes.example.org, mail.example.org, recipes.example.net, maps.example.net, docs.example.com';

const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c]);

export function mount(el, lib) {
  if (!document.getElementById('gp-style')) {
    const st = document.createElement('style');
    st.id = 'gp-style';
    st.textContent = STYLE;
    document.head.append(st);
  }
  const s = { scheme: 'light', background: '#ffffff', accent: '#0faaaa', seed: 'playground', card: '#5b2a86', hosts: HOSTS, n: 6, kind: 'random' };
  el.innerHTML = `
  <div class="gp">
    <section style="display:grid;gap:12px">
      <div><h3>The environment</h3><p>Where the colours will sit. Everything below is made for it.</p></div>
      <div class="row" id="gp-presets"></div>
      <div class="row">
        <div class="seg" id="gp-scheme"><button data-v="light">Light</button><button data-v="dark">Dark</button></div>
        <label class="f"><input type="color" id="gp-bg">Background</label>
        <label class="f"><input type="color" id="gp-accent">Accent</label>
        <label class="f"><span class="lbl">Seed</span><input type="text" id="gp-seed" size="12"></label>
      </div>
      <pre id="gp-code"></pre>
    </section>
    <section style="display:grid;gap:12px">
      <div><h3>A background you have</h3><p>Any background in; its border, and every ink that reads on it, out. Each ink is held to APCA Lc 60.</p></div>
      <label class="f"><input type="color" id="gp-card">Background</label>
      <div class="stage" id="gp-swatch-stage"><div class="two"><div id="gp-swatch-card"></div><div class="scroll" id="gp-swatch-table"></div></div></div>
    </section>
    <section style="display:grid;gap:12px">
      <div><h3>Colours from text</h3><p>The same text, the same colour, every time, in Go and in TypeScript. As a soft tile and a solid one.</p></div>
      <input type="text" id="gp-hosts" style="width:100%">
      <div class="stage" id="gp-text-stage"><div class="tiles" id="gp-soft"></div><div class="tiles" id="gp-solid"></div></div>
    </section>
    <section style="display:grid;gap:12px">
      <div><h3>Palettes</h3><p>Random ones kept apart, fluent ones that sit side by side, distinct ones as different as they can be. Each random one comes with a replay string that makes it again.</p></div>
      <div class="row">
        <div class="seg" id="gp-kind"><button data-v="random">Random</button><button data-v="fluent">Fluent</button><button data-v="distinct">Distinct</button></div>
        <label class="f"><span class="lbl">How many</span><input type="number" id="gp-n" min="1" max="24"></label>
        <button class="b" id="gp-again">Draw again</button>
      </div>
      <div class="stage" id="gp-pal-stage"><div class="strip" id="gp-pal"></div><div class="replay" id="gp-replay"></div></div>
    </section>
  </div>`;

  const $ = (id) => el.querySelector('#' + id);
  const pres = $('gp-presets');
  for (const [name, p] of PRESETS) {
    const b = document.createElement('button');
    b.className = 'b';
    b.textContent = name;
    b.onclick = () => { Object.assign(s, p); sync(); render(); };
    pres.append(b);
  }
  const seg = (id, key) => $(id).addEventListener('click', (e) => {
    const b = e.target.closest('button');
    if (!b) return;
    s[key] = b.dataset.v;
    render();
  });
  seg('gp-scheme', 'scheme');
  seg('gp-kind', 'kind');
  for (const [id, key] of [['gp-bg', 'background'], ['gp-accent', 'accent'], ['gp-seed', 'seed'], ['gp-card', 'card'], ['gp-hosts', 'hosts']]) {
    $(id).addEventListener('input', (e) => { s[key] = e.target.value; render(); });
  }
  $('gp-n').addEventListener('input', (e) => { s.n = Math.max(1, Math.min(24, Number(e.target.value) || 1)); render(); });
  let draws = 0;
  $('gp-again').onclick = () => { draws++; render(); };

  function sync() {
    $('gp-bg').value = s.background;
    $('gp-accent').value = s.accent;
    $('gp-seed').value = s.seed;
    $('gp-card').value = s.card;
    $('gp-hosts').value = s.hosts;
    $('gp-n').value = s.n;
  }

  function render() {
    for (const [id, v] of [['gp-scheme', s.scheme], ['gp-kind', s.kind]]) {
      for (const b of $(id).querySelectorAll('button')) b.setAttribute('aria-pressed', String(b.dataset.v === v));
    }
    const opts = { seed: s.seed, scheme: s.scheme, background: s.background, accent: s.accent };
    const gulal = lib.env(opts);
    $('gp-code').textContent =
      `import { env } from 'gulal';\n\nconst gulal = env(${JSON.stringify(opts, null, 2).replace(/"(\w+)":/g, '$1:').replace(/"/g, "'")});\n\n` +
      `gulal.swatch('${s.card}');         // a border and the inks for a background\n` +
      `gulal.fromText('news.example.com'); // the same colour every time\n` +
      `gulal.${s.kind}(${s.n});${' '.repeat(Math.max(1, 26 - s.kind.length - String(s.n).length))}// a palette`;

    // the stages are the environment's background, their words in its own inks
    const page = gulal.swatch(s.background);
    for (const st of ['gp-swatch-stage', 'gp-text-stage', 'gp-pal-stage']) {
      const el = $(st);
      el.style.background = s.background;
      el.style.color = page.ink;
      el.style.setProperty('--gp-fg', page.ink);
      el.style.setProperty('--gp-muted', page.muted);
      el.style.setProperty('--gp-line', page.border);
    }

    // swatch
    const w = gulal.swatch(s.card);
    const lines = [['ink', w.ink], ['muted', w.muted], ['tonal', w.tonal], ['complementary', w.complementary]];
    if (w.accent) lines.push(['accent', w.accent]);
    const h = w.harmony;
    const rel = [];
    for (const [k, list] of Object.entries(h)) list.forEach((c, i) => rel.push([`harmony.${k}[${i}]`, c]));
    const lc = (c) => gulal.contrast(c, w.background).toFixed(0);
    $('gp-swatch-card').innerHTML = `<div class="card" style="background:${w.background};border-color:${w.border}">
      <div class="t" style="color:${w.ink}">A card on ${esc(w.background)}</div>
      ${lines.map(([k, c]) => `<div class="ln" style="color:${c}">${k}<span>Lc ${lc(c)}</span></div>`).join('')}
      ${rel.map(([k, c]) => `<div class="ln" style="color:${c}">${k}<span>Lc ${lc(c)}</span></div>`).join('')}</div>`;
    const row = (k, c, note) => `<tr><td><code>${k}</code></td><td><span class="chip" style="background:${c}"></span><code>${c}</code></td><td>${note}</td></tr>`;
    $('gp-swatch-table').innerHTML = `<table><tr><th>Key</th><th>Colour</th><th>Reads at</th></tr>
      ${row('background', w.background, 'given')}${row('border', w.border, 'shows on the background around it')}
      ${lines.map(([k, c]) => row(k, c, 'Lc ' + lc(c))).join('')}${rel.map(([k, c]) => row(k, c, 'Lc ' + lc(c))).join('')}</table>`;

    // from text
    const hosts = s.hosts.split(',').map((x) => x.trim()).filter(Boolean).slice(0, 24);
    const tile = (t, sw) => `<div class="tile"><div class="mark" style="background:${sw.background};color:${sw.tonal};box-shadow: inset 0 0 0 1px ${sw.border}">${esc((t.replace(/^www\./, '')[0] || '?').toUpperCase())}</div><span>${esc(t)}</span></div>`;
    $('gp-soft').innerHTML = hosts.map((t) => tile(t, gulal.fromText(t).soft)).join('');
    $('gp-solid').innerHTML = hosts.map((t) => {
      const sw = gulal.fromText(t).solid;
      return `<div class="tile"><div class="mark" style="background:${sw.background};color:${sw.ink}">${esc((t[0] || '?').toUpperCase())}</div><span>${esc(t)}</span></div>`;
    }).join('');

    // palettes
    for (let i = 0; i < draws; i++) gulal.random();
    const p = s.kind === 'random' ? gulal.random(s.n) : s.kind === 'fluent' ? gulal.fluent(s.n, { from: draws ? 'random' : undefined }) : gulal.distinct(s.n, draws ? { from: 'random' } : {});
    $('gp-pal').innerHTML = p.map((c) => `<i style="background:${c.hex}" title="${c.hex}"></i>`).join('');
    $('gp-replay').textContent = p.replay ? `replay: ${p.replay}` : 'The same every time: no replay needed.';
  }

  sync();
  render();
}
