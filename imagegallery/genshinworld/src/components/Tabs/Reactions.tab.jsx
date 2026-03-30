// ─────────────────────────────────────────────────────────────
//  ReactionsTab.jsx
//  Tab 2: interactive 7×7 reaction matrix.
//  Hover a cell → reaction preview on the right.
//  Click a cell → pins the reaction detail (click again to unpin).
// ─────────────────────────────────────────────────────────────

import { useState } from 'react'
import { ELEMENTS } from '../constants/elements.data'
import { EL, getReaction } from '../constants/Reactions.data'
import { T } from '../styles/elements.styles'

// Emoji shorthand for column/row headers
const EL_EMOJI = {
  pyro: '🔥',
  hydro: '💧',
  anemo: '🌪',
  electro: '⚡',
  dendro: '🌿',
  cryo: '❄',
  geo: '⛰',
}

export default function ReactionsTab() {
  const [hovered, setHovered] = useState(null)
  const [selected, setSelected] = useState(null)

  // Show pinned reaction, otherwise hovered, otherwise nothing
  const reaction = selected || hovered

  return (
    <div style={{ display: 'flex', gap: 30, height: '100%', minHeight: 0, overflow: 'hidden' }}>

      {/* ── Left: matrix ── */}
      <div style={{ flexShrink: 0 }}>
        <div className="el-mono" style={{
          fontSize: '.5rem',
          letterSpacing: '.18em',
          color: T.textMuted,
          marginBottom: 14,
        }}>
          REACTION MATRIX — HOVER TO PREVIEW · CLICK TO LOCK
        </div>

        {/* Column headers */}
        <div style={{ display: 'grid', gridTemplateColumns: '42px repeat(7, 70px)', gap: 6, marginBottom: 6 }}>
          <div />
          {EL.map(e => (
            <div key={e} className="el-mono" style={{ fontSize: '.72rem', textAlign: 'center', color: T.textSecond }}>
              {EL_EMOJI[e]}
            </div>
          ))}
        </div>

        {/* Rows */}
        {EL.map(rowEl => (
          <div
            key={rowEl}
            style={{ display: 'grid', gridTemplateColumns: '42px repeat(7, 70px)', gap: 6, marginBottom: 6 }}
          >
            {/* Row label */}
            <div className="el-mono" style={{
              fontSize: '.72rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: T.textSecond,
            }}>
              {EL_EMOJI[rowEl]}
            </div>

            {/* Cells */}
            {EL.map(colEl => {
              const rx = getReaction(rowEl, colEl)
              const isSelf = rowEl === colEl
              const isActive = selected?.name === rx?.name

              return (
                <div
                  key={colEl}
                  className={`el-cell ${isSelf ? 'self' : ''} ${isActive ? 'active' : ''}`}
                  style={{
                    '--rc': rx?.color || 'rgba(255,255,255,.12)',
                    '--rb': rx ? `${rx.color}18` : 'rgba(255,255,255,.04)',
                    '--rg': rx ? `${rx.color}40` : 'transparent',
                  }}
                  onMouseEnter={() => { if (!selected) setHovered(rx) }}
                  onMouseLeave={() => { if (!selected) setHovered(null) }}
                  onClick={() => setSelected(s => s?.name === rx?.name ? null : rx)}
                >
                  {rx ? (
                    <>
                      <div style={{ fontSize: '1.15rem', lineHeight: 1 }}>
                        {rx.symbol.split('').slice(-1)[0]}
                      </div>
                      <div className="el-mono" style={{
                        fontSize: '.38rem',
                        letterSpacing: '.06em',
                        color: rx.color,
                        textAlign: 'center',
                        lineHeight: 1.2,
                        paddingInline: 3,
                      }}>
                        {rx.name.length > 10 ? rx.name.slice(0, 9) + '…' : rx.name}
                      </div>
                    </>
                  ) : (
                    <div style={{ color: 'rgba(255,255,255,.08)', fontSize: '.9rem' }}>—</div>
                  )}
                </div>
              )
            })}
          </div>
        ))}
      </div>

      {/* ── Right: reaction detail panel ── */}
      <div style={{
        flex: 1,
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: reaction ? 'flex-start' : 'center',
      }}>
        {reaction ? (
          <div
            key={reaction.name}
            className="el-detail"
            style={{ '--dc': reaction.color + '66', padding: '32px 34px 34px', animation: 'el-slideUp .3s ease both' }}
          >
            {/* Header */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 16 }}>
              <div style={{ fontSize: '3rem', lineHeight: 1, filter: `drop-shadow(0 0 14px ${reaction.color})` }}>
                {reaction.symbol}
              </div>
              <div>
                <div className="el-mono" style={{ fontSize: '.48rem', letterSpacing: '.16em', color: T.textMuted, marginBottom: 5 }}>
                  ELEMENTAL REACTION
                </div>
                <h3 className="el-rajdhani" style={{
                  fontSize: '2.2rem',
                  fontWeight: 700,
                  color: reaction.color,
                  lineHeight: 1,
                  textShadow: `0 0 30px ${reaction.color}88`,
                }}>
                  {reaction.name}
                </h3>
              </div>

              {/* Multiplier badge */}
              <div style={{ marginLeft: 'auto' }}>
                <div className="el-mono" style={{
                  padding: '6px 16px',
                  borderRadius: 50,
                  border: `1px solid ${reaction.color}55`,
                  background: `${reaction.color}18`,
                  fontSize: '.54rem',
                  letterSpacing: '.1em',
                  color: reaction.color,
                }}>
                  {reaction.mult}
                </div>
              </div>
            </div>

            {/* Divider */}
            <div style={{ height: 1, background: `linear-gradient(90deg, ${reaction.color}88, transparent)`, marginBottom: 16 }} />

            {/* Description */}
            <p className="el-cormorant" style={{ fontSize: '1.14rem', color: T.textSecond, lineHeight: 1.8, fontStyle: 'italic' }}>
              {reaction.desc}
            </p>

            {/* Unpin button (only when pinned) */}
            {selected && (
              <button className="el-back" onClick={() => setSelected(null)} style={{ marginTop: 16 }}>
                UNPIN
              </button>
            )}
          </div>
        ) : (
          // Empty state
          <div style={{ textAlign: 'center', animation: 'el-fadeIn .4s ease both' }}>
            <div style={{ fontSize: '3.6rem', marginBottom: 14, opacity: .2 }}>⚗</div>
            <div className="el-mono" style={{ fontSize: '.54rem', letterSpacing: '.18em', color: T.textMuted }}>
              HOVER A CELL TO SEE THE REACTION
            </div>
          </div>
        )}
      </div>
    </div>
  )
}