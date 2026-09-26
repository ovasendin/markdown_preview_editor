// Minimal RFC 3492 decoder, enough to show IDN hostnames the way a human sees them.
const BASE = 36, TMIN = 1, TMAX = 26, SKEW = 38, DAMP = 700, INITIAL_BIAS = 72, INITIAL_N = 128;

function adapt(delta: number, numPoints: number, first: boolean): number {
  delta = first ? Math.floor(delta / DAMP) : delta >> 1;
  delta += Math.floor(delta / numPoints);
  let k = 0;
  while (delta > ((BASE - TMIN) * TMAX) >> 1) {
    delta = Math.floor(delta / (BASE - TMIN));
    k += BASE;
  }
  return k + Math.floor(((BASE - TMIN + 1) * delta) / (delta + SKEW));
}

function digit(cp: number): number {
  if (cp >= 48 && cp < 58) return cp - 22;
  if (cp >= 65 && cp < 91) return cp - 65;
  if (cp >= 97 && cp < 123) return cp - 97;
  return BASE;
}

function decodeLabel(input: string): string {
  const out: number[] = [];
  const basic = input.lastIndexOf('-');
  for (let j = 0; j < Math.max(basic, 0); j++) out.push(input.charCodeAt(j));
  let n = INITIAL_N, bias = INITIAL_BIAS, i = 0;
  for (let idx = basic > 0 ? basic + 1 : 0; idx < input.length;) {
    const oldi = i;
    for (let w = 1, k = BASE; ; k += BASE) {
      if (idx >= input.length) throw new RangeError('punycode: bad input');
      const d = digit(input.charCodeAt(idx++));
      if (d >= BASE) throw new RangeError('punycode: bad digit');
      i += d * w;
      const t = k <= bias ? TMIN : k >= bias + TMAX ? TMAX : k - bias;
      if (d < t) break;
      w *= BASE - t;
    }
    bias = adapt(i - oldi, out.length + 1, oldi === 0);
    n += Math.floor(i / (out.length + 1));
    i %= out.length + 1;
    out.splice(i++, 0, n);
  }
  return String.fromCodePoint(...out);
}

/** Converts `xn--` labels to Unicode; returns the input unchanged on any error. */
export function toUnicodeHost(host: string): string {
  return host
    .split('.')
    .map((label) => {
      if (!label.toLowerCase().startsWith('xn--')) return label;
      try {
        return decodeLabel(label.slice(4));
      } catch {
        return label;
      }
    })
    .join('.');
}
