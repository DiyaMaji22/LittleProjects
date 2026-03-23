export function SectionLabel({ children }) {
  return (
    <div
      className="font-mono"
      style={{
        fontSize:      '0.7rem',
        letterSpacing: '0.18em',
        color:         'rgba(255,255,255,0.6)',
        marginBottom:  10,
      }}
    >
      {children}
    </div>
  )
}
 