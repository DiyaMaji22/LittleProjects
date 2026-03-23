export function Badge({ children, accent, delay, tinted = false }) {
  return (
    <div style={{
      padding:        '4px 14px',
      border:         `1px solid ${tinted ? `${accent}66` : 'rgba(255,255,255,0.18)'}`,
      background:     tinted ? `${accent}15` : 'rgba(255,255,255,0.06)',
      backdropFilter: 'blur(8px)',
      clipPath:       'polygon(6px 0, 100% 0, calc(100% - 6px) 100%, 0 100%)',
      animation:      `fadeSlideUp 0.5s ease both ${delay}`,
      opacity:        0,
    }}>
      <span
        className="font-cinzel"
        style={{
          fontSize:      '0.9rem',
          letterSpacing: '0.22em',
          color:         tinted ? accent : 'rgba(255,255,255,0.9)',
          textShadow:    tinted ? `0 0 8px ${accent}` : 'none',
        }}
      >
        {children}
      </span>
    </div>
  )
}