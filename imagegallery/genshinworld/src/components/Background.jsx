// ─────────────────────────────────────────────────────────────
//  components/Background.jsx
//
//  Renders every visual layer that sits behind the content:
//  character images, colour overlays, star field, particles,
//  scanline, accent glow, and the large decorative ✦ symbol.
// ─────────────────────────────────────────────────────────────

import { useMemo } from 'react'

// ── Constants ─────────────────────────────────────────────────
const STAR_COUNT    = 65
const PARTICLE_COUNT = 55

// Stars are stable — generated once at module load, never re-computed.
const STARS = Array.from({ length: STAR_COUNT }, (_, i) => ({
  id:       i,
  x:        Math.random() * 100,
  y:        Math.random() * 100,
  size:     0.8 + Math.random() * 1.8,
  duration: `${2 + Math.random() * 3}s`,
  delay:    `${Math.random() * 5}s`,
}))

// ── Sub-components ────────────────────────────────────────────

function StarField() {
  return (
    <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
      {STARS.map(s => (
        <div
          key={s.id}
          style={{
            position:     'absolute',
            left:         `${s.x}%`,
            top:          `${s.y}%`,
            width:        s.size,
            height:       s.size,
            borderRadius: '50%',
            background:   '#fff',
            animation:    `starTwinkle ${s.duration} ease-in-out infinite ${s.delay}`,
          }}
        />
      ))}
    </div>
  )
}

/** Re-mounts on each character change (pass `key={activeIndex}` from parent) */
function Particles({ char }) {
  // Random layout is stable per character thanks to useMemo + char.id dependency
  const particles = useMemo(() =>
    Array.from({ length: PARTICLE_COUNT }, (_, i) => ({
      id:       i,
      sym:      char.particleSymbols[i % char.particleSymbols.length],
      left:     `${8  + Math.random() * 55}%`,
      top:      `${50 + Math.random() * 45}%`,
      duration: `${5  + Math.random() * 6}s`,
      delay:    `${Math.random() * 7}s`,
      dx:       `${(Math.random() - 0.5) * 120}px`,
      fontSize: 8 + Math.random() * 10,
    })),
  [char.id]) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', overflow: 'hidden' }}>
      {particles.map(p => (
        <div
          key={p.id}
          style={{
            position:        'absolute',
            left:            p.left,
            top:             p.top,
            fontSize:        p.fontSize,
            color:           char.particleColor,
            opacity:         0,
            animation:       `particleRise ${p.duration} ease-in-out infinite ${p.delay}`,
            '--particle-dx': p.dx,
            filter:          `drop-shadow(0 0 5px ${char.accent})`,
          }}
        >
          {p.sym}
        </div>
      ))}
    </div>
  )
}

// ── Main export ───────────────────────────────────────────────

/**
 * @param {{ characters, activeIndex, isAnimating }} props
 */
export function Background({ characters, activeIndex, isAnimating }) {
  const char = characters[activeIndex]

  return (
    <>
      {/* Character images — all loaded, only active is visible */}
      {characters.map((c, i) => (
        <div
          key={c.id}
          style={{
            position:      'absolute',
            inset:         0,
            opacity:       i === activeIndex && !isAnimating ? 1 : 0,
            transition:    'opacity 0.5s ease',
            pointerEvents: 'none',
          }}
        >
          <img
            src={c.img}
            alt={c.name}
            style={{
              position:       'absolute',
              inset:          0,
              width:          '100%',
              height:         '100%',
              objectFit:      'cover',
              objectPosition: 'center',
              opacity:        0.8,
              animation:      i === activeIndex && !isAnimating ? 'bgReveal 0.7s ease both' : 'none',
            }}
          />
        </div>
      ))}

      {/* Accent glow — sits behind the content panel */}
      <div style={{
        position:      'absolute',
        right:         '5%',
        bottom:        0,
        width:         '45%',
        height:        '90%',
        background:    `radial-gradient(ellipse 60% 80% at 60% 80%, ${char.accent}18 0%, transparent 65%)`,
        pointerEvents: 'none',
        zIndex:        1,
        transition:    'background 0.8s ease',
      }} />

      {/* Left readability overlay */}
      <div style={{
        position:      'absolute',
        inset:         0,
        background:    char.overlayLeft,
        pointerEvents: 'none',
        zIndex:        2,
        transition:    'background 0.8s ease',
      }} />

      {/* Bottom vignette */}
      <div style={{
        position:      'absolute',
        inset:         0,
        background:    char.overlayBottom,
        pointerEvents: 'none',
        zIndex:        2,
        transition:    'background 0.8s ease',
      }} />

      {/* Top vignette */}
      <div style={{
        position:      'absolute',
        top:           0, left: 0, right: 0,
        height:        160,
        background:    'linear-gradient(to bottom, rgba(0,0,0,0.65), transparent)',
        pointerEvents: 'none',
        zIndex:        2,
      }} />

      {/* Scanline sweep */}
      <div style={{
        position:      'absolute',
        left:          0, right: 0,
        height:        2,
        background:    'linear-gradient(transparent, rgba(255,255,255,0.05), transparent)',
        animation:     'scanline 9s linear infinite',
        pointerEvents: 'none',
        zIndex:        3,
      }} />

      {/* Star field */}
      <div style={{ position: 'absolute', inset: 0, zIndex: 1, pointerEvents: 'none' }}>
        <StarField />
      </div>

      {/* Particles — key forces remount on character change */}
      <div style={{ position: 'absolute', inset: 0, zIndex: 3, pointerEvents: 'none' }}>
        <Particles key={activeIndex} char={char} />
      </div>

      {/* Large decorative symbol */}
      <div style={{
        position:      'absolute',
        right:         '-3%',
        top:           '50%',
        transform:     'translateY(-50%)',
        fontSize:      'clamp(220px, 35vw, 480px)',
        color:         char.accent,
        opacity:       0.035,
        fontFamily:    'serif',
        lineHeight:    1,
        pointerEvents: 'none',
        zIndex:        1,
        transition:    'color 0.8s ease',
        userSelect:    'none',
      }}>
        ✦
      </div>
    </>
  )
}