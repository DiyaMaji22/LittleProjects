import React from 'react'
import { SectionLabel } from './UI/SectionLabel'
import { Badge } from './UI/Badge'
import { StarRating } from './UI/Starrating'
import { StatBar } from './UI/Statbar'
import { AbilityCard } from './UI/Ability'

export function ContentPanel({ char, contentKey }) {
  const key = `content-${contentKey}`

  return (
    <div 
      className="content-panel"
      key={key}
      style={{
        position: 'absolute',
        inset: 0,
        zIndex: 5,
        pointerEvents: 'none',
        display: 'grid',
        gridTemplateColumns: 'minmax(300px, 400px) 1fr minmax(280px, 340px)',
        padding: '100px 60px 40px',
        gap: 20
      }}
    >
      <div style={{ pointerEvents: 'auto', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <div style={{ animation: 'fadeSlideRight 0.6s cubic-bezier(0.2, 0.8, 0.2, 1) both' }}>
          <h1 className="font-cinzel" style={{
            fontSize: '5rem',
            lineHeight: 0.9,
            color: '#fff',
            margin: '0 0 10px 0',
            textShadow: `0 0 30px ${char.accent}66`
          }}>
            {char.name.toUpperCase()}
          </h1>
          <div className="font-mono" style={{
            fontSize: '1.2rem',
            color: char.accent,
            letterSpacing: '0.2em',
            marginBottom: 24,
            textTransform: 'uppercase',
            fontWeight: 600
          }}>
            {char.title}
          </div>
        </div>

        <div style={{ display: 'flex', gap: 10, marginBottom: 35, flexWrap: 'wrap' }}>
          <Badge accent={char.accent} delay="0.1s" tinted>{char.vision}</Badge>
          <Badge accent={char.accent} delay="0.2s">{char.weapon}</Badge>
          <Badge accent={char.accent} delay="0.3s">{char.region}</Badge>
        </div>

        <div style={{ marginBottom: 40, animation: 'fadeUp 0.6s ease-out both 0.2s' }}>
          <StarRating count={char.rarity} color={char.accent} />
        </div>

        <div style={{ animation: 'fadeUp 0.8s ease-out both 0.35s' }}>
          <blockquote style={{
            fontFamily: '"Crimson Pro", serif',
            fontSize: '1.4rem',
            fontStyle: 'italic',
            color: 'rgba(255,255,255,0.95)',
            margin: '0 0 20px 0',
            paddingLeft: 20,
            borderLeft: `3px solid ${char.accent}`,
            lineHeight: 1.4
          }}>
            “{char.quote}”
          </blockquote>
          <p className="font-crimson" style={{
            fontSize: '1.15rem',
            lineHeight: 1.6,
            color: 'rgba(255,255,255,0.75)',
            maxWidth: '90%'
          }}>
            {char.lore}
          </p>
        </div>
      </div>

      <div></div>

      <div style={{ pointerEvents: 'auto', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <div style={{ marginBottom: 50 }}>
          <SectionLabel>COMBAT ATTRIBUTES</SectionLabel>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            {char.stats.map((s, i) => (
              <StatBar
                key={s.label}
                label={s.label}
                val={s.value}
                color={char.accent}
                animationDelay={`${0.5 + (i * 0.1)}s`}
              />
            ))}
          </div>
        </div>

        <div>
          <SectionLabel>TALENTS</SectionLabel>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {char.abilities.map((a, i) => (
              <AbilityCard
                key={a.name}
                ability={a}
                accent={char.accent}
                animationDelay={`${0.8 + (i * 0.1)}s`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
 }
