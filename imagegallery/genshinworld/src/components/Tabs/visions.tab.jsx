// ─────────────────────────────────────────────────────────────
//  VisionsTab.jsx
//  Tab 3: lore cards explaining Visions, Gnosis, Delusions, etc.
// ─────────────────────────────────────────────────────────────

import { VISION_LORE } from '../constants/Visions.data'
import { T } from '../styles/elements.styles'

export default function VisionsTab() {
  return (
    <div className="el-noscroll" style={{ overflowY: 'auto', height: '100%' }}>
      <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 16, paddingBottom: 24 }}>

        {/* ── Hero header ── */}
        <div style={{ textAlign: 'center', padding: '32px 0 24px', animation: 'el-fadeIn .5s ease both' }}>
          <div style={{
            fontSize: '4rem',
            marginBottom: 12,
            animation: 'el-float 3s ease-in-out infinite',
            display: 'inline-block',
          }}>
            ◈
          </div>
          <h2 className="el-rajdhani" style={{ fontSize: '2rem', fontWeight: 700, color: T.textPrimary, marginBottom: 8 }}>
            Visions &amp; Divine Sparks
          </h2>
          <p className="el-cormorant" style={{ fontSize: '1.05rem', color: T.textSecond, fontStyle: 'italic', lineHeight: 1.7 }}>
            "A Vision is proof that the gods have acknowledged a person's ambition — and extended them a chance at eternity."
          </p>
        </div>

        {/* ── Lore cards ── */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16, alignItems: 'stretch' }}>
          {VISION_LORE.map((entry, i) => (
            <div
              key={i}
              className="el-detail"
              style={{
                '--dc': entry.color + '44',
                padding: '20px 22px',
                animation: `el-fadeUp .4s ease both ${i * 0.07}s`,
                opacity: 0,
                flex: '1 1 360px',
              }}
            >
              {/* Icon + heading */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
                <div style={{
                  fontSize: '1.4rem',
                  color: entry.color,
                  textShadow: `0 0 20px ${entry.color}`,
                  animation: 'el-runeGlow 3s ease-in-out infinite',
                  animationDelay: `${i * 0.4}s`,
                }}>
                  {entry.icon}
                </div>
                <h3 className="el-rajdhani" style={{
                  fontWeight: 700,
                  fontSize: '.9rem',
                  letterSpacing: '.06em',
                  color: entry.color,
                  margin: 0,
                }}>
                  {entry.title}
                </h3>
              </div>

              {/* Body */}
              <p className="el-cormorant" style={{ fontSize: '.98rem', color: T.textSecond, lineHeight: 1.76, margin: 0 }}>
                {entry.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}