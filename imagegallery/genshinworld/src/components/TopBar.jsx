// ─────────────────────────────────────────────────────────────
//  components/TopBar.jsx
//
//  Fixed top strip: logo left, dot navigation centre, counter right.
// ─────────────────────────────────────────────────────────────

/**
 * @param {{ characters, activeIndex, char, goTo }} props
 */
export function TopBar({ characters, activeIndex, char, goTo }) {
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

      {/* Logo */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <div style={{
          width:          30,
          height:         30,
          borderRadius:   '50%',
          border:         `1.5px solid ${char.accent}66`,
          background:     `${char.accent}15`,
          display:        'flex',
          alignItems:     'center',
          justifyContent: 'center',
          fontSize:       12,
          color:          char.accent,
          transition:     'all 0.5s',
        }}>
          ✦
        </div>
        <div>
          <div
            className="font-cinzel"
            style={{ fontSize: '0.62rem', letterSpacing: '0.2em', color: char.accent, textShadow: `0 0 8px ${char.accentDim}` }}
          >
            GENSHIN IMPACT
          </div>
          <div
            className="font-mono"
            style={{ fontSize: '0.46rem', color: 'rgba(255,255,255,0.25)', letterSpacing: '0.15em' }}
          >
            CHARACTER ARCHIVE
          </div>
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