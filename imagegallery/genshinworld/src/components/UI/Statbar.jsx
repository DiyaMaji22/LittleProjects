export function StatBar({ label, val, color, animationDelay }) {
  return (
    <div style={{ marginBottom: 10 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
        <span
          className="font-mono"
          style={{ fontSize: '0.85rem', letterSpacing: '0.16em', color: 'rgba(255,255,255,0.8)' }}
        >
          {label}
        </span>
        <span
          className="font-mono"
          style={{ fontSize: '0.85rem', color, textShadow: `0 0 6px ${color}` }}
        >
          {val}
        </span>
      </div>
 
      <div style={{ height: 6, borderRadius: 3, background: 'rgba(255,255,255,0.15)', overflow: 'hidden' }}>
        <div style={{
          height:        '100%',
          borderRadius:  3,
          '--bar-width': `${val}%`,
          width:         `${val}%`,
          background:    `linear-gradient(90deg, ${color}77, ${color})`,
          boxShadow:     `0 0 7px ${color}`,
          animation:     `barFill 1.1s ease-out both ${animationDelay}`,
        }} />
      </div>
    </div>
  )
}
 