// ─────────────────────────────────────────────────────────────
//  data/defaults.js
//
//  createCharacter(overrides) — the ONLY function you need when
//  adding a new character.  Pass the fields that are unique to
//  the character; everything else is derived automatically.
//
//  REQUIRED overrides
//  ──────────────────
//  id, name, title, archon, region, vision, weapon, rarity,
//  constellation, img, accent, quote, lore, tags, stats, abilities
//
//  OPTIONAL overrides  (all auto-generated from `accent` if omitted)
//  ─────────────────────────────────────────────────────────────────
//  accentDim, accentFar, starColor,
//  bg, overlayLeft, overlayBottom,
//  particleColor, particleSymbols
// ─────────────────────────────────────────────────────────────

/** Default particle symbols used when none are specified */
const DEFAULT_SYMBOLS = ['✦', '◆', '⟡', '▪', '◇']

/**
 * Derive rgba() strings from a hex colour.
 * Supports 3- and 6-digit hex.
 */
function hexToRgb(hex) {
  const clean = hex.replace('#', '')
  const full  = clean.length === 3
    ? clean.split('').map(c => c + c).join('')
    : clean
  const r = parseInt(full.slice(0, 2), 16)
  const g = parseInt(full.slice(2, 4), 16)
  const b = parseInt(full.slice(4, 6), 16)
  return { r, g, b }
}

function rgba(hex, alpha) {
  const { r, g, b } = hexToRgb(hex)
  return `rgba(${r},${g},${b},${alpha})`
}

/**
 * Darken a hex colour for background use.
 * `factor` 0–1: lower = darker.
 */
function darken(hex, factor = 0.12) {
  const { r, g, b } = hexToRgb(hex)
  return `rgb(${Math.round(r * factor)},${Math.round(g * factor)},${Math.round(b * factor)})`
}

// ─────────────────────────────────────────────────────────────
//  PUBLIC API
// ─────────────────────────────────────────────────────────────

/**
 * Build a complete character config from a minimal set of fields.
 *
 * @example
 * createCharacter({
 *   id:     'ayaka',
 *   name:   'Kamisato Ayaka',
 *   accent: '#a8d8ff',
 *   img:    ayakaImg,
 *   // ... required content fields
 * })
 */
export function createCharacter(overrides) {
  const accent = overrides.accent ?? '#ffffff'
  const { r, g, b } = hexToRgb(accent)

  // Derived dark tones for backgrounds
  const dark1 = `${Math.round(r * 0.14)},${Math.round(g * 0.14)},${Math.round(b * 0.14)}`
  const dark2 = `${Math.round(r * 0.08)},${Math.round(g * 0.08)},${Math.round(b * 0.08)}`
  const dark3 = `${Math.round(r * 0.04)},${Math.round(g * 0.04)},${Math.round(b * 0.04)}`

  const defaults = {
    // Colour tokens — all derived from `accent`
    accentDim:  rgba(accent, 0.35),
    accentFar:  rgba(accent, 0.12),
    starColor:  `rgb(${Math.min(255, r + 80)},${Math.min(255, g + 80)},${Math.min(255, b + 80)})`,

    // Backgrounds — dark tint pulled from accent colour
    bg: `radial-gradient(ellipse 90% 80% at 60% 40%, rgb(${dark1}) 0%, rgb(${dark2}) 45%, rgb(${dark3}) 100%)`,
    overlayLeft:
      `linear-gradient(to right, rgba(${dark2},0.96) 0%, rgba(${dark2},0.75) 40%, rgba(${dark2},0.25) 65%, transparent 100%)`,
    overlayBottom:
      `linear-gradient(to top, rgba(${dark2},0.9) 0%, rgba(${dark2},0.35) 30%, transparent 65%)`,

    // Particles
    particleColor:   rgba(accent, 0.75),
    particleSymbols: DEFAULT_SYMBOLS,
  }

  return { ...defaults, ...overrides }
}