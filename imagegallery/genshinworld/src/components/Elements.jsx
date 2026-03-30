// ─────────────────────────────────────────────────────────────
//  ElementsPage.jsx  —  Root component
//
//  Responsibilities:
//    • Injects global CSS once
//    • Renders the page shell (top bar, title, tab bar)
//    • Owns the active tab state
//    • Mounts the correct tab component
//
//  Props
//  ─────
//  onBack : () => void — navigate back to world hub
// ─────────────────────────────────────────────────────────────

import { useState } from 'react'
import { CSS, T } from './styles/elements.styles'
import { ELEMENTS } from './constants/elements.data'
import { REACTIONS } from './constants/Reactions.data'
import ElementsTab from './Tabs/Elements.tab'
import ReactionsTab from './Tabs/Reactions.tab'
import VisionsTab from './Tabs/visions.tab'

const TABS = [
  { id: 'elements',  label: 'ELEMENTS' },
  { id: 'reactions', label: 'REACTIONS' },
  { id: 'visions',   label: 'VISIONS' },
]

export default function ElementsPage({ onBack }) {
  const [tab, setTab] = useState('elements')

  return (
    <>
      <style>{CSS}</style>

      <div style={{
        position: 'fixed',
        inset: 0,
        background: T.bg,
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        fontFamily: 'sans-serif',
      }}>

        {/* ── Alchemical grid texture ── */}
        <div style={{
          position: 'absolute',
          inset: 0,
          pointerEvents: 'none',
          zIndex: 0,
          backgroundImage: `
            linear-gradient(rgba(255,255,255,.015) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,.015) 1px, transparent 1px)`,
          backgroundSize: '60px 60px',
        }} />

        {/* ── Atmospheric glow orbs ── */}
        <div style={{
          position: 'absolute', top: '10%', left: '5%',
          width: 400, height: 400, borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(192,128,255,.04) 0%, transparent 70%)',
          pointerEvents: 'none', zIndex: 0,
        }} />
        <div style={{
          position: 'absolute', bottom: '15%', right: '8%',
          width: 300, height: 300, borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(77,184,255,.04) 0%, transparent 70%)',
          pointerEvents: 'none', zIndex: 0,
        }} />

        {/* ── Top bar ── */}
        <div style={{
          flexShrink: 0,
          position: 'relative',
          zIndex: 10,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '14px 28px 0',
          animation: 'el-fadeIn .4s ease both',
        }}>
          <button className="el-back" onClick={onBack}>← WORLD HUB</button>

          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <div className="el-mono" style={{ fontSize: '.42rem', letterSpacing: '.22em', color: T.textMuted }}>
              ELEMENTAL CODEX
            </div>
            <div style={{ fontSize: '.9rem', animation: 'el-glow 2s ease-in-out infinite', color: T.gold }}>⚗</div>
          </div>

          <div className="el-mono" style={{ fontSize: '.4rem', letterSpacing: '.14em', color: T.textMuted }}>
            {ELEMENTS.length} ELEMENTS · {Math.floor(Object.keys(REACTIONS).length / 2)}+ REACTIONS
          </div>
        </div>

        {/* ── Page title ── */}
        <div style={{
          flexShrink: 0,
          padding: '18px 28px 0',
          position: 'relative',
          zIndex: 10,
          animation: 'el-fadeUp .45s ease both .1s',
          opacity: 0,
        }}>
          <div className="el-mono" style={{ fontSize: '.38rem', letterSpacing: '.24em', color: T.textMuted, marginBottom: 4 }}>
            SEPTEM ELEMENTA
          </div>
          <h1 className="el-cormorant" style={{
            fontSize: 'clamp(1.8rem,4vw,3rem)',
            fontWeight: 700,
            color: T.textPrimary,
            lineHeight: 1,
            margin: '0 0 2px',
          }}>
            Elements &amp; Reactions
          </h1>
          <p className="el-cormorant" style={{ fontSize: '1rem', fontStyle: 'italic', color: T.textSecond }}>
            Seven forces that govern all things in Teyvat — and the alchemy of their collision.
          </p>
        </div>

        {/* ── Tab bar ── */}
        <div style={{
          flexShrink: 0,
          padding: '16px 28px 0',
          borderBottom: `1px solid ${T.border}`,
          position: 'relative',
          zIndex: 10,
          display: 'flex',
          gap: 4,
          animation: 'el-fadeIn .4s ease both .2s',
          opacity: 0,
        }}>
          {TABS.map(t => (
            <button
              key={t.id}
              className={`el-tab ${tab === t.id ? 'active' : ''}`}
              onClick={() => setTab(t.id)}
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* ── Tab body ── */}
        <div style={{ flex: 1, overflow: 'hidden', position: 'relative', zIndex: 5, padding: '22px 28px' }}>
          {tab === 'elements'  && <ElementsTab />}
          {tab === 'reactions' && <ReactionsTab />}
          {tab === 'visions'   && <VisionsTab />}
        </div>

      </div>
    </>
  )
}