// ─────────────────────────────────────────────────────────────
//  ElementSigil.jsx
//  Animated orbital sigil rendered for each element.
//
//  Props
//  ─────
//  el   : element object (from ELEMENTS)
//  size : number (default 120) — diameter in px
// ─────────────────────────────────────────────────────────────

export default function ElementSigil({ el, size = 120 }) {
  const dots = 8

  return (
    <div style={{
      position: 'relative',
      width: size,
      height: size,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }}>
      {/* Radial glow background */}
      <div style={{
        position: 'absolute',
        inset: 0,
        borderRadius: '50%',
        background: `radial-gradient(circle, ${el.glow} 0%, transparent 68%)`,
        animation: 'el-glow 3s ease-in-out infinite',
      }} />

      {/* Outer spinning ring */}
      <div style={{
        position: 'absolute',
        width: size,
        height: size,
        borderRadius: '50%',
        border: `1px solid ${el.color}44`,
        borderTopColor: el.color,
        animation: `el-spin 6s linear infinite`,
      }} />

      {/* Inner counter-spinning dashed ring */}
      <div style={{
        position: 'absolute',
        width: size * 0.68,
        height: size * 0.68,
        borderRadius: '50%',
        border: `1px dashed ${el.color}55`,
        animation: `el-spinRev 4s linear infinite`,
      }} />

      {/* Orbiting dots */}
      {Array.from({ length: dots }, (_, i) => (
        <div
          key={i}
          style={{
            position: 'absolute',
            width: 4,
            height: 4,
            borderRadius: '50%',
            background: el.color,
            '--start': `${(i / dots) * 360}deg`,
            '--r': `${size * 0.44}px`,
            animation: `el-orbDot ${3 + i * 0.2}s linear infinite ${i * 0.15}s`,
            opacity: 0.7,
          }}
        />
      ))}

      {/* Central sigil character or image */}
      {typeof el.sigil === 'string' && el.sigil.length > 2 ? (
        // Render as image
        <img
          src={el.sigil}
          alt={`${el.name} sigil`}
          style={{
            position: 'relative',
            zIndex: 2,
            width: size * 0.6,
            height: size * 0.6,
            animation: 'el-runeGlow 3s ease-in-out infinite',
            objectFit: 'contain',
          }}
        />
      ) : (
        // Render as text
        <div
          className="el-cormorant"
          style={{
            position: 'relative',
            zIndex: 2,
            fontSize: size * 0.32,
            color: el.color,
            animation: 'el-runeGlow 3s ease-in-out infinite',
            lineHeight: 1,
          }}
        >
          {el.sigil}
        </div>
      )}
    </div>
  )
}