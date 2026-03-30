// ─────────────────────────────────────────────────────────────
//  ElementDetail.jsx
//  Full expanded detail panel for a single element.
//  Shown when a card is clicked in ElementsTab.
//
//  Props
//  ─────
//  el      : element object (from ELEMENTS)
//  onClose : () => void — returns to grid view
// ─────────────────────────────────────────────────────────────

import { T } from './styles/elements.styles'
import ElementSigil from './Elements.sigil'

export default function ElementDetail({ el, onClose }) {
  return (
    <div
      className="el-detail"
      style={{ '--dc': el.color + '55', padding: '28px 28px 32px' }}
    >
      {/* ── Header: sigil + name + description + chips ── */}
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: 24, marginBottom: 24 }}>
        <div style={{ flexShrink: 0 }}>
          <ElementSigil el={el} size={130} />
        </div>

        <div style={{ flex: 1 }}>
          {/* Latin name + archon */}
          <div className="el-mono" style={{
            fontSize: '.4rem',
            letterSpacing: '.2em',
            color: T.textMuted,
            marginBottom: 4,
          }}>
            {el.latin.toUpperCase()} · ARCHON: {el.archon.toUpperCase()}
          </div>

          {/* Element name */}
          <h2 className="el-rajdhani" style={{
            fontSize: '2.2rem',
            fontWeight: 700,
            color: el.color,
            lineHeight: 1,
            marginBottom: 8,
            textShadow: `0 0 40px ${el.glow}`,
          }}>
            {el.name}
          </h2>

          {/* Full description */}
          <p className="el-cormorant" style={{
            fontSize: '1rem',
            color: T.textSecond,
            lineHeight: 1.72,
            fontStyle: 'italic',
            marginBottom: 14,
          }}>
            {el.desc}
          </p>

          {/* Keyword chips */}
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: 6,
            '--ec2': el.color,
            '--ec3': el.color + '55',
            '--eb2': el.color + '14',
          }}>
            {el.keywords.map(k => (
              <span key={k} className="el-chip">{k}</span>
            ))}
          </div>
        </div>
      </div>

      {/* Divider */}
      <div style={{
        height: 1,
        background: `linear-gradient(90deg, ${el.color}88, transparent)`,
        marginBottom: 20,
      }} />

      {/* ── Lore entries ── */}
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 12,
        '--ec2': el.color,
      }}>
        {el.lore.map((entry, i) => (
          <div
            key={i}
            className="el-lore"
            style={{ animation: `el-fadeUp .38s ease both ${i * 0.08}s`, opacity: 0 }}
          >
            <div className="el-rajdhani" style={{
              fontWeight: 700,
              fontSize: '.78rem',
              letterSpacing: '.06em',
              color: el.color,
              marginBottom: 6,
            }}>
              {entry.h}
            </div>
            <p className="el-cormorant" style={{
              fontSize: '.95rem',
              color: T.textSecond,
              lineHeight: 1.76,
              margin: 0,
            }}>
              {entry.b}
            </p>
          </div>
        ))}
      </div>

      {/* Close button */}
      <button className="el-back" onClick={onClose} style={{ marginTop: 22 }}>
        ↩ CLOSE
      </button>
    </div>
  )
}