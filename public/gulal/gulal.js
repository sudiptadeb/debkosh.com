// gulal: colours made for where they sit.
//
// An environment (a seed, light or dark, a background, an accent) narrows what can be drawn;
// colours come from a seeded stream or from text, and any background gives a swatch: the
// border and the inks that read on it. spec.md is the contract; this file and the Go package
// give the same output for the same input, checked by vectors/vectors.json.
const WHITE = [255, 255, 255];
const NEAR_BLACK = [31, 31, 31];
function parse(hex) {
    const m = /^#?([0-9a-f]{3}|[0-9a-f]{6})$/i.exec(String(hex).trim());
    if (!m)
        throw new Error(`gulal: not a colour: ${hex}`);
    let h = m[1];
    if (h.length === 3)
        h = h[0] + h[0] + h[1] + h[1] + h[2] + h[2];
    return [parseInt(h.slice(0, 2), 16), parseInt(h.slice(2, 4), 16), parseInt(h.slice(4, 6), 16)];
}
function hexOf(c) {
    return '#' + c.map((v) => v.toString(16).padStart(2, '0')).join('');
}
function toLinear(v8) {
    const v = v8 / 255;
    return v <= 0.04045 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
}
function fromLinear(v) {
    const x = Math.min(1, Math.max(0, v));
    const s = x <= 0.0031308 ? 12.92 * x : 1.055 * Math.pow(x, 1 / 2.4) - 0.055;
    return Math.floor(s * 255 + 0.5);
}
/** OKLCH of an 8-bit colour: [L, C, H]. A colour with almost no chroma has hue 0. */
function lch(c) {
    const r = toLinear(c[0]), g = toLinear(c[1]), b = toLinear(c[2]);
    const l = Math.cbrt(0.4122214708 * r + 0.5363325363 * g + 0.0514459929 * b);
    const m = Math.cbrt(0.2119034982 * r + 0.6806995451 * g + 0.1073969566 * b);
    const s = Math.cbrt(0.0883024619 * r + 0.2817188376 * g + 0.6299787005 * b);
    const L = 0.2104542553 * l + 0.793617785 * m - 0.0040720420 * s;
    const A = 1.9779984951 * l - 2.428592205 * m + 0.4505937099 * s;
    const B = 0.0259040371 * l + 0.7827717662 * m - 0.808675766 * s;
    const C = Math.sqrt(A * A + B * B);
    if (C < 1e-4)
        return [L, C, 0];
    let H = (Math.atan2(B, A) * 180) / Math.PI;
    if (H < 0)
        H += 360;
    return [L, C, H];
}
function linear(L, C, H) {
    const hr = (H * Math.PI) / 180;
    const a = C * Math.cos(hr), b = C * Math.sin(hr);
    const l_ = L + 0.3963377774 * a + 0.2158037573 * b;
    const m_ = L - 0.1055613458 * a - 0.0638541728 * b;
    const s_ = L - 0.0894841775 * a - 1.291485548 * b;
    const l = l_ * l_ * l_, m = m_ * m_ * m_, s = s_ * s_ * s_;
    return [
        4.0767416621 * l - 3.3077115913 * m + 0.2309699292 * s,
        -1.2684380046 * l + 2.6097574011 * m - 0.3413193965 * s,
        -0.0041960863 * l - 0.7034186147 * m + 1.707614701 * s,
    ];
}
const inGamut = (v) => v.every((x) => x >= -1e-4 && x <= 1 + 1e-4);
/** An OKLCH colour as 8-bit sRGB: lightness and hue kept, chroma lowered until it fits. */
function rgb(L, C, H) {
    L = Math.min(1, Math.max(0, L));
    C = Math.max(0, C);
    let v = linear(L, C, H);
    if (!inGamut(v)) {
        let lo = 0, hi = C;
        for (let i = 0; i < 16; i++) {
            const mid = (lo + hi) / 2;
            if (inGamut(linear(L, mid, H)))
                lo = mid;
            else
                hi = mid;
        }
        v = linear(L, lo, H);
    }
    return [fromLinear(v[0]), fromLinear(v[1]), fromLinear(v[2])];
}
/** OKLab distance of two colours. */
function apart(x, y) {
    const p = lch(x), q = lch(y);
    const pa = p[1] * Math.cos((p[2] * Math.PI) / 180), pb = p[1] * Math.sin((p[2] * Math.PI) / 180);
    const qa = q[1] * Math.cos((q[2] * Math.PI) / 180), qb = q[1] * Math.sin((q[2] * Math.PI) / 180);
    const d0 = p[0] - q[0], d1 = pa - qa, d2 = pb - qb;
    return Math.sqrt(d0 * d0 + d1 * d1 + d2 * d2);
}
// ---------------------------------------------------------------------------------------
// Contrast: APCA 0.0.98G's lightness contrast (a magnitude), or WCAG 2's ratio.
function apcaY(c) {
    let y = 0.2126729 * Math.pow(c[0] / 255, 2.4) +
        0.7151522 * Math.pow(c[1] / 255, 2.4) +
        0.072175 * Math.pow(c[2] / 255, 2.4);
    if (y < 0.022)
        y += Math.pow(0.022 - y, 1.414);
    return y;
}
function apca(text, bg) {
    const t = apcaY(text), b = apcaY(bg);
    if (b > t) {
        const s = (Math.pow(b, 0.56) - Math.pow(t, 0.57)) * 1.14;
        return s < 0.1 ? 0 : (s - 0.027) * 100;
    }
    const s = (Math.pow(b, 0.65) - Math.pow(t, 0.62)) * 1.14;
    return s > -0.1 ? 0 : -(s + 0.027) * 100;
}
function wcag(a, b) {
    const y = (c) => 0.2126 * toLinear(c[0]) + 0.7152 * toLinear(c[1]) + 0.0722 * toLinear(c[2]);
    const x = y(a), z = y(b);
    return (Math.max(x, z) + 0.05) / (Math.min(x, z) + 0.05);
}
const LEVELS = {
    apca: { ink: 60, border: 15, mark: 30 },
    wcag2: { ink: 4.5, border: 1.3, mark: 3 },
};
// ---------------------------------------------------------------------------------------
// Hashing and the seeded stream.
function utf8(s) {
    return Array.from(new TextEncoder().encode(s));
}
/** FNV-1a over the UTF-8 bytes, then murmur3's finaliser. */
export function hash(text, extra) {
    let h = 0x811c9dc5;
    const bytes = utf8(text);
    if (extra !== undefined)
        bytes.push(extra);
    for (const b of bytes)
        h = Math.imul(h ^ b, 0x01000193) >>> 0;
    h ^= h >>> 16;
    h = Math.imul(h, 0x85ebca6b) >>> 0;
    h ^= h >>> 13;
    h = Math.imul(h, 0xc2b2ae35) >>> 0;
    h ^= h >>> 16;
    return h >>> 0;
}
const unit = (n) => n / 4294967296;
const GOLDEN = 0x9e3779b9;
/** SplitMix32: state steps by the golden ratio, output is murmur3's finaliser of the state. */
function splitmix(state) {
    let z = state >>> 0;
    z = Math.imul(z ^ (z >>> 16), 0x85ebca6b) >>> 0;
    z = Math.imul(z ^ (z >>> 13), 0xc2b2ae35) >>> 0;
    return (z ^ (z >>> 16)) >>> 0;
}
function pickSeed() {
    const b = new Uint8Array(4);
    globalThis.crypto.getRandomValues(b);
    return Array.from(b, (x) => x.toString(16).padStart(2, '0')).join('');
}
function wrap(h) {
    h %= 360;
    return h < 0 ? h + 360 : h;
}
function circular(a, b) {
    const d = Math.abs(wrap(a) - wrap(b));
    return Math.min(d, 360 - d);
}
function bandsOf(hues) {
    const out = [];
    for (const [a0, b0] of hues ?? [[0, 360]]) {
        if (b0 - a0 >= 360)
            return [[0, 360]];
        const a = wrap(a0), b = wrap(b0);
        if (a < b)
            out.push([a, b]);
        else if (a > b)
            out.push([a, 360], [0, b]);
    }
    return out;
}
function subtract(set, [a, b]) {
    const out = [];
    for (const [x, y] of set) {
        if (b <= x || a >= y)
            out.push([x, y]);
        else {
            if (a > x)
                out.push([x, a]);
            if (b < y)
                out.push([b, y]);
        }
    }
    return out;
}
function allowed(bands, avoid, spread) {
    let set = bands.slice();
    for (const h of avoid) {
        const a = h - spread, b = h + spread;
        for (const piece of [[a, b], [a - 360, b - 360], [a + 360, b + 360]])
            set = subtract(set, piece);
    }
    const total = set.reduce((n, [x, y]) => n + y - x, 0);
    return total > 0 ? set : bands;
}
function along(set, u) {
    const total = set.reduce((n, [x, y]) => n + y - x, 0);
    let x = u * total;
    for (const [a, b] of set) {
        if (x < b - a)
            return a + x;
        x -= b - a;
    }
    return set[set.length - 1][1] - 1e-9;
}
function inSet(set, h) {
    return set.some(([a, b]) => h >= a && h < b);
}
/** The hue farthest from every hue in `from`, on a 0.5° grid of the allowed hues. */
function farthest(set, from) {
    let best = -1, bestScore = -1;
    for (let k = 0; k < 720; k++) {
        const h = k * 0.5;
        if (!inSet(set, h))
            continue;
        let score = 360;
        for (const f of from)
            score = Math.min(score, circular(h, f));
        if (score > bestScore) {
            bestScore = score;
            best = h;
        }
    }
    return best < 0 ? 0 : best;
}
function hueOf(x) {
    if (typeof x === 'number')
        return wrap(x);
    const [, C, H] = lch(parse(x));
    return C < 0.02 ? undefined : H;
}
const SCHEME_BG = { light: [255, 255, 255], dark: [28, 29, 32] };
function resolve(o) {
    const page = o.background ? parse(o.background) : o.scheme ? SCHEME_BG[o.scheme] : undefined;
    const [pageL, pageC] = page ? lch(page) : [1, 0];
    const pageDark = page ? pageL < 0.45 || (pageL < 0.8 && o.scheme === 'dark') : o.scheme === 'dark';
    let chroma, accentH;
    const accent = o.accent ? parse(o.accent) : undefined;
    if (accent) {
        const [, aC, aH] = lch(accent);
        if (aC < 0.03)
            chroma = 0.06;
        else {
            chroma = Math.min(0.15, Math.max(0.04, 0.8 * aC));
            accentH = aH;
        }
    }
    const avoid = [];
    for (const a of o.avoid ?? []) {
        const h = hueOf(a);
        if (h !== undefined)
            avoid.push(h);
    }
    return {
        scheme: o.scheme,
        page,
        pageL,
        pageC,
        pageDark,
        accent,
        accentH,
        chroma,
        measure: o.contrast ?? 'apca',
        bands: bandsOf(o.hues),
        avoid,
        spread: o.spread ?? 25,
        inks: (o.inks ?? []).map(parse),
    };
}
/** Make an environment. Everything else is a method on it. */
export function env(options = {}) {
    return new Gulal(options);
}
export class Gulal {
    constructor(options = {}) {
        this.at = 0;
        this.seed = options.seed ?? pickSeed();
        this.options = Object.freeze({ ...options, seed: this.seed });
        this.r = resolve(options);
    }
    // ---- the stream
    draw() {
        this.at++;
        return unit(splitmix((hash(this.seed) + Math.imul(this.at, GOLDEN)) >>> 0));
    }
    replayOf(method, args, at) {
        const o = this.options;
        const parts = ['gulal1', method];
        const put = (k, v) => {
            if (v === undefined || v === false)
                return;
            // only what would break the string is escaped: %, ; and =
            parts.push(`${k}=${(v === true ? '1' : String(v)).replace(/[%;=]/g, (c) => '%' + c.charCodeAt(0).toString(16).toUpperCase())}`);
        };
        for (const [k, v] of Object.entries(args))
            put(k, v);
        put('scheme', o.scheme);
        put('bg', o.background);
        put('accent', o.accent);
        put('contrast', o.contrast);
        put('hues', o.hues?.map(([a, b]) => `${a}..${b}`).join(','));
        put('eavoid', avoidList(o.avoid));
        put('espread', o.spread);
        put('inks', o.inks?.join(','));
        put('seed', this.seed);
        put('at', at);
        return parts.join(';');
    }
    // ---- making colours
    /** The strength of a colour: the accent's, or drawn; never below the background's own. */
    chromaFor(u) {
        let C = this.r.chroma ?? 0.06 + (u ?? 0.5) * 0.09;
        if (this.r.page)
            C = Math.max(C, 0.9 * this.r.pageC);
        return Math.min(0.16, C);
    }
    lean(H) {
        const a = this.r.accentH;
        if (a === undefined)
            return H;
        const d = wrap(a - H);
        const diff = d > 180 ? 360 - d : d;
        const turn = Math.min(diff / 2, 15);
        return wrap(H + (d > 180 ? -turn : turn));
    }
    colour(H, C, L, replay) {
        return new Colour(this, this.r, H, C, L, replay);
    }
    random(n, options = {}) {
        const at = this.at;
        if (n === undefined) {
            const c = this.drawn(this.r.bands);
            c.replay = this.replayOf('random', {}, at);
            return c;
        }
        const spread = options.spread ?? this.r.spread;
        const extra = (options.avoid ?? []).map(hueOf).filter((h) => h !== undefined);
        const set = allowed(allowed(this.r.bands, this.r.avoid, this.r.spread), extra, spread);
        const out = [];
        if (options.independent) {
            for (let i = 0; i < n; i++)
                out.push(this.drawn(set));
        }
        else {
            const taken = [];
            for (let i = 0; i < n; i++) {
                const H = i === 0 ? along(set, this.draw()) : farthest(set, [...taken, ...extra]);
                taken.push(H);
                out.push(this.colour(this.lean(H), this.chromaFor(this.r.chroma === undefined ? this.draw() : undefined), this.r.page ? undefined : 0.45 + this.draw() * 0.3));
            }
        }
        const replay = this.replayOf('random', { n, avoid: avoidList(options.avoid), spread: options.spread, independent: options.independent }, at);
        return Object.assign(out, { replay });
    }
    drawn(bands) {
        const set = allowed(bands, this.r.avoid, this.r.spread);
        const H = along(set, this.draw());
        const C = this.chromaFor(this.r.chroma === undefined ? this.draw() : undefined);
        const L = this.r.page ? undefined : 0.45 + this.draw() * 0.3;
        return this.colour(this.lean(H), C, L);
    }
    /** The same colour for the same text, every time, in every language gulal has. */
    fromText(text) {
        const set = allowed(this.r.bands, this.r.avoid, this.r.spread);
        const H = along(set, unit(hash(text)));
        const C = this.chromaFor(this.r.chroma === undefined ? unit(hash(text, 1)) : undefined);
        const L = this.r.page ? undefined : 0.45 + unit(hash(text, 2)) * 0.3;
        return this.colour(this.lean(H), C, L);
    }
    start(from, fallback) {
        const f = from ?? (this.r.accentH !== undefined ? 'accent' : fallback);
        if (f === 'accent')
            return { H: this.r.accentH ?? 0, drew: false };
        if (f === 'zero')
            return { H: 0, drew: false };
        if (f === 'random')
            return { H: this.draw() * 360, drew: true };
        return { H: unit(hash(f)) * 360, drew: false };
    }
    /** `n` colours that sit well side by side: one strength and lightness, hues in even steps. */
    fluent(n, options = {}) {
        const at = this.at;
        const { H: s, drew } = this.start(options.from, 'random');
        let arc = options.arc ?? Math.min(360, 40 * n);
        const stepOf = (a) => (a >= 360 ? 360 / n : n > 1 ? a / (n - 1) : 0);
        let step = stepOf(arc);
        if (n > 1 && step < 18) {
            arc = Math.min(360, 18 * n);
            step = stepOf(arc);
        }
        const alternate = n > 1 && step < 18;
        const C = this.chromaFor(this.r.chroma === undefined ? 0.5 : undefined);
        const out = [];
        for (let i = 0; i < n; i++) {
            const base = this.r.page ? undefined : 0.6;
            const c = this.colour(wrap(s + i * step), C, base);
            if (alternate)
                c.shift = i % 2 === 0 ? 0.06 : -0.06;
            out.push(c);
        }
        const replay = drew ? this.replayOf('fluent', { n, arc: options.arc, from: options.from }, at) : undefined;
        return Object.assign(out, { replay });
    }
    /** The `n` most different colours in this environment, the same every time. */
    distinct(n, options = {}) {
        const at = this.at;
        const spread = options.spread ?? this.r.spread;
        const extra = (options.avoid ?? []).map(hueOf).filter((h) => h !== undefined);
        const set = allowed(allowed(this.r.bands, this.r.avoid, this.r.spread), extra, spread);
        const { H: s, drew } = this.start(options.from, 'zero');
        const first = inSet(set, wrap(s)) ? wrap(s) : farthest(set, extra.length ? extra : [wrap(s) + 180]);
        const taken = [first];
        for (let i = 1; i < n; i++)
            taken.push(farthest(set, [...taken, ...extra]));
        const C = this.chromaFor(this.r.chroma === undefined ? 0.5 : undefined);
        const out = taken.map((H) => this.colour(H, C, this.r.page ? undefined : 0.6));
        const replay = drew ? this.replayOf('distinct', { n, from: options.from, avoid: avoidList(options.avoid), spread: options.spread }, at) : undefined;
        return Object.assign(out, { replay });
    }
    /** The one colour most different from those in use. */
    next(existing) {
        const hues = existing.map((e) => hueOf(typeof e === 'string' ? e : e.hex)).filter((h) => h !== undefined);
        const set = allowed(this.r.bands, this.r.avoid, this.r.spread);
        const H = hues.length ? farthest(set, [...hues, ...this.r.avoid]) : along(set, 0);
        return this.colour(H, this.chromaFor(this.r.chroma === undefined ? 0.5 : undefined), this.r.page ? undefined : 0.6);
    }
    /** A colour you already have, its hue kept, made at home in this environment. */
    adapt(hex) {
        const [, C0, H0] = lch(parse(hex));
        let C = this.r.chroma ?? Math.min(0.15, Math.max(0.04, C0));
        if (this.r.page)
            C = Math.min(0.16, Math.max(C, 0.9 * this.r.pageC));
        return this.colour(this.lean(H0), C, this.r.page ? undefined : 0.6);
    }
    // ---- swatches and contrast
    /** Any background: its border, and the inks that read on it. */
    swatch(background, options = {}) {
        const around = options.around ? parse(options.around) : this.r.page;
        const inks = options.inks ? options.inks.map(parse) : this.r.inks;
        return new Swatch(this.r, parse(background), around, inks);
    }
    /** The contrast of an ink on a background, by this environment's measure. */
    contrast(ink, background) {
        return measureOf(this.r.measure)(parse(ink), parse(background));
    }
    /** The colours a replay string made, again. */
    static replay(s) {
        const [tag, method, ...rest] = s.split(';');
        if (tag !== 'gulal1')
            throw new Error(`gulal: a replay from another version: ${tag}`);
        const kv = {};
        for (const p of rest) {
            const i = p.indexOf('=');
            kv[p.slice(0, i)] = decodeURIComponent(p.slice(i + 1));
        }
        // a colour is written with its #, a hue as a plain number
        const list = (v) => (v ? v.split(',').map((x) => (x.startsWith('#') ? x : Number(x))) : undefined);
        const e = new Gulal({
            seed: kv.seed,
            scheme: kv.scheme,
            background: kv.bg,
            accent: kv.accent,
            contrast: kv.contrast,
            hues: kv.hues ? kv.hues.split(',').map((p) => p.split('..').map(Number)) : undefined,
            avoid: list(kv.eavoid),
            spread: kv.espread ? Number(kv.espread) : undefined,
            inks: kv.inks ? kv.inks.split(',') : undefined,
        });
        e.at = Number(kv.at ?? 0);
        const n = kv.n ? Number(kv.n) : undefined;
        if (method === 'random') {
            return n === undefined
                ? e.random()
                : e.random(n, { avoid: list(kv.avoid), spread: kv.spread ? Number(kv.spread) : undefined, independent: kv.independent === '1' });
        }
        if (method === 'fluent')
            return e.fluent(n ?? 1, { arc: kv.arc ? Number(kv.arc) : undefined, from: kv.from });
        if (method === 'distinct')
            return e.distinct(n ?? 1, { from: kv.from, avoid: list(kv.avoid), spread: kv.spread ? Number(kv.spread) : undefined });
        throw new Error(`gulal: nothing to replay for ${method}`);
    }
    replay(s) {
        return Gulal.replay(s);
    }
}
/** An avoid list as replay writes it: colours as #rrggbb, hues as plain numbers. */
function avoidList(a) {
    return a?.map((x) => (typeof x === 'number' ? String(x) : hexOf(parse(x)))).join(',');
}
function measureOf(m) {
    return m === 'wcag2' ? wcag : apca;
}
/**
 * The colour of hue H and chroma C, lightness moved from L0 as little as it must for it to
 * read on `against` at `level`: the least move up past the background's lightness, or down,
 * each by bisection; the smaller wins.
 */
function reach(L0, C, H, against, level, ctx) {
    const bgL = lch(against)[0];
    const reads = (L) => ctx.score(rgb(L, C, H), against) >= level;
    const side = (from, to) => {
        if (!reads(to))
            return undefined;
        if (reads(from))
            return from;
        let lo = from, hi = to; // lo does not read, hi does
        for (let i = 0; i < 20; i++) {
            const mid = (lo + hi) / 2;
            if (reads(mid))
                hi = mid;
            else
                lo = mid;
        }
        return hi;
    };
    const up = side(Math.max(L0, bgL), 1);
    const down = side(Math.min(L0, bgL), 0);
    let L;
    if (up === undefined && down === undefined) {
        L = ctx.score(rgb(1, C, H), against) >= ctx.score(rgb(0, C, H), against) ? 1 : 0;
    }
    else if (up === undefined)
        L = down;
    else if (down === undefined)
        L = up;
    else {
        const du = up - L0, dd = L0 - down;
        L = Math.abs(du - dd) < 1e-9 ? (ctx.prefersUp ? up : down) : du < dd ? up : down;
    }
    return rgb(L, C, H);
}
// ---------------------------------------------------------------------------------------
// A made colour.
export class Colour {
    /** @internal */
    constructor(g, r, hue, chroma, free, replay) {
        this.g = g;
        this.r = r;
        this.hue = hue;
        this.chroma = chroma;
        this.free = free;
        /** @internal lightness offset for fluent palettes that alternate. */
        this.shift = 0;
        this.cache = {};
        this.replay = replay;
    }
    ctx() {
        return { score: measureOf(this.r.measure), prefersUp: this.r.pageDark };
    }
    /** The colour as a solid fill: its hex. */
    get hex() {
        if (this.cache.hex)
            return this.cache.hex;
        const r = this.r;
        let L0;
        if (this.free !== undefined || !r.page)
            L0 = this.free ?? 0.6;
        else {
            L0 = r.pageDark ? 0.62 : 0.6;
            if (Math.abs(L0 - r.pageL) < 0.15)
                L0 = r.pageL >= 0.5 ? r.pageL - 0.15 : r.pageL + 0.15;
        }
        L0 += this.shift;
        const fill = rgb(L0, this.chroma, this.hue);
        const ink = best(r.inks.length ? r.inks : [WHITE, NEAR_BLACK], fill, this.ctx().score);
        const level = LEVELS[r.measure].ink;
        let out = fill;
        if (this.ctx().score(ink, fill) < level) {
            // move the fill away from its ink until the ink reads
            const inkUp = lch(ink)[0] > L0;
            const end = inkUp ? 0 : 1;
            const reads = (L) => this.ctx().score(ink, rgb(L, this.chroma, this.hue)) >= level;
            if (reads(end)) {
                let lo = L0, hi = end;
                for (let i = 0; i < 20; i++) {
                    const mid = (lo + hi) / 2;
                    if (reads(mid))
                        hi = mid;
                    else
                        lo = mid;
                }
                out = rgb(hi, this.chroma, this.hue);
            }
            else
                out = rgb(end, this.chroma, this.hue);
        }
        return (this.cache.hex = hexOf(out));
    }
    get oklch() {
        const [l, c, h] = lch(parse(this.hex));
        return { l, c, h };
    }
    get css() {
        const { l, c, h } = this.oklch;
        return `oklch(${l.toFixed(3)} ${c.toFixed(3)} ${h.toFixed(1)})`;
    }
    page() {
        return this.r.page ?? WHITE;
    }
    /** The swatch on its solid fill. */
    get solid() {
        var _a;
        return ((_a = this.cache).solid ?? (_a.solid = new Swatch(this.r, parse(this.hex), this.r.page, this.r.inks)));
    }
    /** The swatch on its soft tint, a step off the background. */
    get soft() {
        if (this.cache.soft)
            return this.cache.soft;
        const page = this.page();
        const pL = this.r.page ? this.r.pageL : 1, pC = this.r.page ? this.r.pageC : 0;
        const dark = this.r.page ? this.r.pageDark : this.r.scheme === 'dark';
        const C = Math.max(this.chroma * (dark ? 0.55 : 0.45), 0.85 * pC);
        let L = pL < 0.45 ? Math.max(0.3, pL + 0.09) : pL < 0.8 ? (dark ? 0.3 : 0.93) : Math.min(0.93, pL - 0.05);
        const away = L > pL ? 0.005 : -0.005;
        const need = 0.05 + 0.65 * pC;
        let fill = rgb(L, C, this.hue);
        for (let i = 0; i < 200 && apart(fill, page) < need && L > 0 && L < 1; i++) {
            L += away;
            fill = rgb(L, C, this.hue);
        }
        return (this.cache.soft = new Swatch(this.r, fill, this.r.page, this.r.inks));
    }
    /** Its colour as ink on the environment's background. */
    get ink() {
        if (this.cache.ink)
            return this.cache.ink;
        const page = this.page();
        const light = !this.r.pageDark;
        return (this.cache.ink = hexOf(reach(light ? 0.5 : 0.8, Math.min(Math.max(this.chroma * 1.3, 0.06), 0.15), this.hue, page, LEVELS[this.r.measure].ink, this.ctx())));
    }
    /** Its colour as a dot or a line on the environment's background. */
    get mark() {
        if (this.cache.mark)
            return this.cache.mark;
        const page = this.page();
        const light = !this.r.pageDark;
        return (this.cache.mark = hexOf(reach(light ? 0.62 : 0.66, Math.min(Math.max(this.chroma * 1.3, 0.06), 0.15), this.hue, page, LEVELS[this.r.measure].mark, this.ctx())));
    }
    toString() {
        return this.hex;
    }
    toJSON() {
        return { hex: this.hex, replay: this.replay };
    }
}
function best(inks, bg, score) {
    let pick = inks[0], top = score(inks[0], bg);
    for (const c of inks.slice(1)) {
        const s = score(c, bg);
        if (s > top) {
            top = s;
            pick = c;
        }
    }
    return pick;
}
// ---------------------------------------------------------------------------------------
// A swatch: a background with what goes on it.
const RELATIONS = [
    ['analogous', [50, -50]],
    ['complementary', [180]],
    ['split', [150, -150]],
    ['triadic', [120, -120]],
    ['square', [90, 180, -90]],
];
export class Swatch {
    /** @internal */
    constructor(r, bg, around, inks) {
        this.r = r;
        const score = measureOf(r.measure);
        const [L, C, H] = lch(bg);
        this.bg = bg;
        this.light = score(NEAR_BLACK, bg) >= score(WHITE, bg);
        this.c = { score, prefersUp: r.scheme ? r.scheme === 'dark' : !this.light };
        this.level = LEVELS[r.measure].ink;
        this.baseH = C < 0.02 ? (r.accentH ?? 0) : H;
        this.background = hexOf(bg);
        // border: its hue, away from what is around it (or toward the ink's side), until it shows
        const bc = Math.min(C * 1.1, 0.37);
        const aL = around ? lch(around)[0] : L;
        const down = around && Math.abs(aL - L) > 0.02 ? aL > L : this.light;
        let bl = L + (down ? -0.12 : 0.12);
        let border = rgb(bl, bc, H);
        const shows = (x) => !around || Math.max(score(x, around), score(around, x)) >= LEVELS[r.measure].border;
        for (let i = 0; i < 200 && !shows(border) && bl > 0 && bl < 1; i++) {
            bl += down ? -0.005 : 0.005;
            border = rgb(bl, bc, H);
        }
        this.border = hexOf(border);
        // ink: the best of the inks given, else white or near-black
        const ink = best(inks.length ? inks : [WHITE, NEAR_BLACK], bg, score);
        this.ink = hexOf(ink);
        // muted: the ink moved toward the background until it only just reads
        let muted = ink;
        if (score(ink, bg) >= this.level) {
            const [iL, iC, iH] = lch(ink);
            const at = (t) => rgb(iL + (L - iL) * t, iC, iH);
            let lo = 0, hi = 1; // lo reads, hi does not
            for (let i = 0; i < 20; i++) {
                const mid = (lo + hi) / 2;
                if (score(at(mid), bg) >= this.level)
                    lo = mid;
                else
                    hi = mid;
            }
            muted = at(lo);
        }
        this.muted = hexOf(muted);
        this.tonal = hexOf(reach(this.start(), C < 0.02 ? C : Math.min(Math.max(C * 1.3, 0.06), 0.15), H, bg, this.level, this.c));
        this.complementary = this.turn(180);
        if (r.accent && r.accentH !== undefined) {
            const aC = lch(r.accent)[1];
            this.accent = hexOf(reach(this.start(), Math.min(Math.max(aC, 0.06), 0.15), r.accentH, bg, this.level, this.c));
        }
    }
    start() {
        return this.light ? 0.5 : 0.8;
    }
    /** Ink in the background's hue turned by `degrees`, made to read. */
    turn(degrees) {
        return hexOf(reach(this.start(), 0.15, wrap(this.baseH + degrees), this.bg, this.level, this.c));
    }
    /** Ink in every relation on the colour wheel, made when first read. */
    get harmony() {
        if (this.h)
            return this.h;
        const h = {};
        for (const [name, angles] of RELATIONS)
            h[name] = angles.map((a) => this.turn(a));
        return (this.h = h);
    }
    /** CSS custom properties: --<prefix>-background, -border, -ink, … */
    vars(prefix = 'gulal') {
        const out = {
            [`--${prefix}-background`]: this.background,
            [`--${prefix}-border`]: this.border,
            [`--${prefix}-ink`]: this.ink,
            [`--${prefix}-muted`]: this.muted,
            [`--${prefix}-tonal`]: this.tonal,
            [`--${prefix}-complementary`]: this.complementary,
        };
        if (this.accent)
            out[`--${prefix}-accent`] = this.accent;
        return out;
    }
    toJSON() {
        return {
            background: this.background,
            border: this.border,
            ink: this.ink,
            muted: this.muted,
            tonal: this.tonal,
            complementary: this.complementary,
            ...(this.accent ? { accent: this.accent } : {}),
            harmony: this.harmony,
        };
    }
}
/** The colours a replay string made, again. */
export const replay = Gulal.replay;
