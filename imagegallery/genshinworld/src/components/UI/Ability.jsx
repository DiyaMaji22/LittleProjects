export function AbilityCard({ ability, accent, animationDelay }) {
  return (
    <div
      className="ability-card"
      style={{
        padding:          '10px 14px',
        '--ability-accent': accent,
        animation:        `fadeSlideUp 0.4s ease both ${animationDelay}`,
        opacity:          0,
      }}
    >
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, marginBottom: 3 }}>
        <span
          className="font-cinzel"
          style={{ fontSize: '0.85rem', fontWeight: 700, color: '#fff', letterSpacing: '0.06em' }}
        >
          {ability.name}
        </span>
        <span
          className="font-mono"
          style={{ fontSize: '0.65rem', letterSpacing: '0.12em', color: accent }}
        >
          {ability.type.toUpperCase()}
        </span>
      </div>
      <p
        className="font-crimson"
        style={{ fontSize: '0.95rem', color: 'rgba(255,255,255,0.85)', lineHeight: 1.55 }}
      >
        {ability.desc}
      </p>
    </div>
  )
}
 