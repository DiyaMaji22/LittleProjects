// ─────────────────────────────────────────────────────────────
//  ElementCard.jsx
//  Grid card shown in the Elements tab.
//  Clicking it calls onClick(el) to open ElementDetail.
//
//  Props
//  ─────
//  el      : element object (from ELEMENTS)
//  index   : number — used for staggered entrance animation delay
//  onClick : (el) => void
// ─────────────────────────────────────────────────────────────

import { T } from './styles/elements.styles'
import ElementSigil from './Elements.sigil'

export default function ElementCard({ el, index, onClick }) {
  return (
    <div
      className="el-card"
      onClick={() => onClick(el)}
      style={{
        '--ec': el.color,
        '--eb': `${el.color}18`,
        '--eg': el.glow,
        padding: '30px 24px 24px',
        animation: `el-fadeUp .4s ease both ${0.3 + index * 0.07}s`,
        opacity: 0,
        minHeight: 0,
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* Top accent line */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: 2,
        background: `linear-gradient(90deg, transparent, ${el.color}, transparent)`,
      }} />

      {/* Sigil */}
      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 18 }}>
        <ElementSigil el={el} size={126} />
      </div>

      {/* Latin name */}
      <div className="el-mono" style={{
        fontSize: '.48rem',
        letterSpacing: '.2em',
        color: T.textMuted,
        marginBottom: 5,
        textAlign: 'center',
      }}>
        {el.latin.toUpperCase()}
      </div>

      {/* Element name */}
      <h3 className="el-rajdhani" style={{
        fontSize: '1.5rem',
        fontWeight: 700,
        color: el.color,
        letterSpacing: '.06em',
        margin: '0 0 8px',
        textAlign: 'center',
        textShadow: `0 0 20px ${el.glow}`,
      }}>
        {el.name}
      </h3>

      {/* Archon */}
      <div className="el-mono" style={{
        fontSize: '.5rem',
        letterSpacing: '.1em',
        color: T.textMuted,
        textAlign: 'center',
        marginBottom: 12,
      }}>
        ARCHON: {el.archon.toUpperCase()}
      </div>

      {/* Description preview */}
      <p className="el-cormorant" style={{
        fontSize: '1.05rem',
        color: T.textSecond,
        lineHeight: 1.72,
        textAlign: 'center',
        margin: 0,
      }}>
        {el.desc.slice(0, 140)}…
      </p>

      {/* CTA */}
      <div className="el-mono" style={{
        marginTop: 'auto',
        paddingTop: 16,
        fontSize: '.52rem',
        letterSpacing: '.14em',
        color: el.colorDim,
        textAlign: 'center',
      }}>
        LEARN MORE ›
      </div>
    </div>
  )
}