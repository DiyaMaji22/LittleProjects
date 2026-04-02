// ─────────────────────────────────────────────────────────────
//  components/TopBar.jsx
//
//  Fixed top strip: logo left, dot navigation centre, counter right.
// ─────────────────────────────────────────────────────────────

/**
 * @param {{ characters, activeIndex, char, goTo, onBack }} props
 */
export function TopBar({ characters, activeIndex, char, goTo, onBack }) {
  return (
    <div style={{
      position:       'absolute',
      top:            0, left: 0, right: 0,
      display:        'flex',
      alignItems:     'center',
      justifyContent: 'space-between',
      padding:        '20px 38px',
      zIndex:         20,
    }}>

      {/* Left: Back Button + Text */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
        {onBack && (
          <button
            onClick={onBack}
            style={{
              display:       'flex',
              alignItems:    'center',
              justifyContent: 'center',
              width:         36,
              height:        36,
              borderRadius:  '50%',
              border:        `1.5px solid ${char.accent}66`,
              background:    `${char.accent}15`,
              color:         char.accent,
              cursor:        'pointer',
              fontSize:      20,
              transition:    'all 0.3s ease',
              flexShrink:    0,
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = `${char.accent}30`
              e.currentTarget.style.borderColor = `${char.accent}cc`
              e.currentTarget.style.boxShadow = `0 0 12px ${char.accentDim}`
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = `${char.accent}15`
              e.currentTarget.style.borderColor = `${char.accent}66`
              e.currentTarget.style.boxShadow = 'none'
            }}
          >
            ←
          </button>
        )}
        <div
          className="font-cinzel"
          style={{ fontSize: '0.62rem', letterSpacing: '0.2em', color: char.accent, textShadow: `0 0 8px ${char.accentDim}` }}
        >
          GENSHIN IMPACT
        </div>
      </div>

      {/* Dot navigation */}
      <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
        {characters.map((c, i) => (
          <button
            key={c.id}
            onClick={() => goTo(i, i > activeIndex ? 'right' : 'left')}
            aria-label={`Go to ${c.name}`}
            style={{
              height:     7,
              width:      i === activeIndex ? 24 : 7,
              borderRadius: 4,
              border:     'none',
              padding:    0,
              cursor:     'pointer',
              background: i === activeIndex ? char.accent : 'rgba(255,255,255,0.22)',
              boxShadow:  i === activeIndex ? `0 0 10px ${char.accentDim}` : 'none',
              transition: 'all 0.35s cubic-bezier(.34,1.3,.64,1)',
            }}
          />
        ))}
      </div>

      {/* Counter */}
      <div
        className="font-mono"
        style={{ fontSize: '0.55rem', color: 'rgba(255,255,255,0.28)', letterSpacing: '0.14em' }}
      >
        {String(activeIndex + 1).padStart(2, '0')} / {String(characters.length).padStart(2, '0')}
      </div>

    </div>
  )
}