export function NavArrow({ onClick, accent, label, children }) {
  return (
    <button
      onClick={onClick}
      aria-label={label}
      style={{
        minWidth:       40,
        width:          40,
        height:         40,
        borderRadius:   '50%',
        border:         `1px solid ${accent}`,
        background:     'rgba(0,0,0,0.2)',
        color:          accent,
        fontSize:       '1.2rem',
        display:        'flex',
        alignItems:     'center',
        justifyContent: 'center',
        cursor:         'pointer',
        transition:     'background 0.2s, transform 0.2s',
        boxShadow:      `0 0 10px ${accent}33`,
        flexShrink:     0,
      }}
      onMouseEnter={e => {
        e.currentTarget.style.background = `${accent}22`
        e.currentTarget.style.transform  = 'scale(1.1)'
      }}
      onMouseLeave={e => {
        e.currentTarget.style.background = 'rgba(0,0,0,0.2)'
        e.currentTarget.style.transform  = 'scale(1)'
      }}
    >
      {children}
    </button>
  )
}
 