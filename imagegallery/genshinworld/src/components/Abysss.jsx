// ─────────────────────────────────────────────────────────────
//  AbyssCelestia.jsx  —  "Abyss & Celestia" codex page
//
//  The page is literally split in two: Celestia (top / light) vs
//  the Abyss (bottom / dark). A glowing horizon divides them.
//  Clicking a side opens a full-screen immersive detail view that
//  slides in with a dramatic reveal. Topic cards and lore entries
//  fill each panel. Stars animate in Celestia; particles drift in
//  the Abyss.
//
//  Props
//  ─────
//  onBack : () => void   (optional)
// ─────────────────────────────────────────────────────────────

import { useState, useEffect, useRef, useCallback } from 'react'

// ── LORE DATA ─────────────────────────────────────────────────
const CELESTIA = {
  id: 'celestia',
  label: 'Celestia',
  subtitle: 'The Floating Realm Above',
  constell: 'SUPREMA CAELESTIA',
  emblem: '✦',
  tagline: 'Above the clouds, the script of all things is written — and erased.',
  colorPrimary: '#d4b86a',
  colorSecond: '#e8d4a0',
  colorGlow: 'rgba(212,184,106,0.22)',
  colorDeep: 'rgba(212,184,106,0.06)',
  bgFrom: '#0e0d18',
  bgTo: '#1a1830',
  accentRgb: '212,184,106',
  topics: [
    {
      id: 'c1', icon: '◈', title: 'What is Celestia?',
      short: 'A floating landmass above Teyvat — home of the gods, enforcer of fate.',
      body: "Celestia is a vast floating island that hovers above Teyvat, visible from the surface as a bright light in the sky. It serves as the seat of divine authority — the place from which the Seven Archons receive their power and the Gnoses are granted. Most mortals worship it as a paradise, believing that those of extraordinary deeds ascend there after death.",
    },
    {
      id: 'c2', icon: '◉', title: 'The Sustainer of Heavenly Principles',
      short: 'The enigmatic higher being who controls the script of Teyvat.',
      body: "Above even the Archons sits the Sustainer of Heavenly Principles — a mysterious entity who governs Celestia and enforces 'The Plan': a predetermined script for how Teyvat's history must unfold. The Sustainer erases those who deviate, including entire civilisations. Their true identity, motivations, and form remain one of Genshin Impact's deepest unsolved mysteries.",
    },
    {
      id: 'c3', icon: '✦', title: 'The Script & The Plan',
      short: 'Teyvat\'s fate is not free — it follows a written destiny enforced from above.',
      body: "The concept of 'The Script' implies that every major event in Teyvat — the Archon War, the rise of nations, the Cataclysm — was not random, but orchestrated by Celestia. Those who gain too much power, knowledge, or influence outside the plan are subject to divine punishment. The Traveler themselves exists outside The Script, making them uniquely dangerous to the established order.",
    },
    {
      id: 'c4', icon: '⚭', title: 'The Gnoses',
      short: 'Chess-piece artefacts connecting each Archon directly to Celestia\'s authority.',
      body: "Each of the Seven Archons possesses a Gnosis — a chess-piece-shaped divine instrument that serves as a conduit to Celestia's power. The Tsaritsa has been collecting them: Zhongli (Morax) willingly surrendered his, Ei gave hers away, and others were taken by force. What the Tsaritsa intends to do with a full set remains one of the story's central questions.",
    },
    {
      id: 'c5', icon: '◇', title: 'Ascending to Celestia',
      short: 'The promised reward for those of extraordinary virtue — or perhaps a lie.',
      body: "Teyvat's cultures teach that mortals who perform deeds of supreme significance may ascend to Celestia after death. Vennessa, founder of the Knights of Favonius, is said to have ascended. But the Traveler's journey increasingly raises doubt: is ascension a genuine reward, or a way Celestia removes exceptional individuals before they threaten The Plan?",
    },
    {
      id: 'c6', icon: '⊛', title: 'The Cataclysm & Celestia\'s Hand',
      short: 'Five hundred years ago, Celestia destroyed an entire nation to maintain control.',
      body: "The destruction of Khaenri'ah 500 years ago — a prosperous nation without an Archon — is believed to have been orchestrated by Celestia. Its people were cursed: some became monsters, others received immortality as eternal punishment. The event radicalised the Traveler's twin sibling and set in motion the events of the entire game.",
    },
  ],
}

const ABYSS = {
  id: 'abyss',
  label: 'The Abyss',
  subtitle: 'The Writhing Dark Below',
  constell: 'PROFUNDIS ABYSSI',
  emblem: '◎',
  tagline: 'Beneath the earth, something ancient and hungry stirs — and it wears a familiar face.',
  colorPrimary: '#8b6fd4',
  colorSecond: '#b49ae8',
  colorGlow: 'rgba(139,111,212,0.22)',
  colorDeep: 'rgba(139,111,212,0.06)',
  bgFrom: '#08060f',
  bgTo: '#100c1c',
  accentRgb: '139,111,212',
  topics: [
    {
      id: 'a1', icon: '◎', title: 'What is the Abyss?',
      short: 'A dark dimension beneath Teyvat, filled with corrupted creatures — and a terrible will.',
      body: "The Abyss is a dimension that exists beneath and in opposition to the surface world of Teyvat. It is home to the Abyss Order — an army of corrupted monsters and cursed Khaenri'ahn survivors. Unlike Celestia's rigid order, the Abyss represents chaos and destruction, though whether it has a guiding intelligence of its own — separate from the Traveler's twin — remains unknown.",
    },
    {
      id: 'a2', icon: '⌾', title: "The Traveler's Twin",
      short: 'A Descender who chose the Abyss after witnessing the destruction of Khaenri\'ah.',
      body: "The Traveler's sibling arrived in Teyvat alongside them but, after witnessing the Cataclysm and the suffering inflicted on Khaenri'ah's people, chose a different path. Now commanding the Abyss Order, the twin appears to believe they are fighting for justice — for the cursed people whom Celestia abandoned. Their methods are catastrophic, yet their grief is real.",
    },
    {
      id: 'a3', icon: '◑', title: "Khaenri'ah — The Cursed Nation",
      short: 'An advanced civilisation without an Archon, destroyed by Celestia 500 years ago.',
      body: "Khaenri'ah was a technologically advanced nation that rejected divine rule and the Archon system entirely. It built wonders without elemental blessings — alchemy, automatons, and technologies beyond anything else in Teyvat. For this transgression, Celestia destroyed it in the Cataclysm. Its citizens were cursed: many became the monsters that now fill Teyvat's dungeons.",
    },
    {
      id: 'a4', icon: '◐', title: 'Descenders',
      short: 'Beings who arrive from beyond the stars — outside The Script, outside Celestia\'s control.',
      body: "Both the Traveler and their twin are Descenders: beings who travel between worlds and arrive on Teyvat from beyond the stars. Celestia fears them because Descenders exist outside The Plan — they cannot be predicted or scripted. Their very presence threatens the stability of the controlled fate that the Sustainer maintains. This is why the Traveler's power grows in ways Teyvat's rules cannot explain.",
    },
    {
      id: 'a5', icon: '◫', title: 'The Abyss Herald & Lector',
      short: 'Elite commanders of the Abyss Order, wielding corrupted elemental power.',
      body: "The Abyss Herald and Abyss Lector are elite officers of the Order, encountered by the Traveler as major bosses. The Herald wields corrupted Hydro; the Lector commands Pyro. Their identities beneath their masks are unknown, but they speak with intelligence and purpose — hinting that the Abyss Order is far more organised and ideologically coherent than a mere army of monsters.",
    },
    {
      id: 'a6', icon: '⊙', title: 'What the Abyss Truly Wants',
      short: 'Vengeance? Freedom? Or something far older and stranger?',
      body: "The surface goal of the Abyss Order appears to be the destruction of the existing world order imposed by Celestia. But the deeper nature of the Abyss dimension itself — whether it is a place, a being, or a force — is deliberately kept mysterious. Some lore hints that the Abyss may predate Celestia, and that the conflict between them is older than Teyvat itself.",
    },
  ],
}

// ── GLOBAL CSS ────────────────────────────────────────────────
const CSS = `
  *, *::before, *::after { box-sizing:border-box; margin:0; padding:0; }

  /* ── Keyframes ── */
  @keyframes ac-fadeUp   { from{opacity:0;transform:translateY(24px)} to{opacity:1;transform:translateY(0)} }
  @keyframes ac-fadeIn   { from{opacity:0} to{opacity:1} }
  @keyframes ac-shimmer  { from{left:-100%;opacity:0} 10%{opacity:1} 90%{opacity:1} to{left:100%;opacity:0} }
  @keyframes ac-slideR   { from{opacity:0;transform:translateX(60px)} to{opacity:1;transform:translateX(0)} }
  @keyframes ac-slideL   { from{opacity:0;transform:translateX(-60px)} to{opacity:1;transform:translateX(0)} }
  @keyframes ac-scaleIn  { from{opacity:0;transform:scale(.92)} to{opacity:1;transform:scale(1)} }
  @keyframes ac-tagPop   { 0%{opacity:0;transform:scale(.72)} 70%{transform:scale(1.06)} 100%{opacity:1;transform:scale(1)} }
  @keyframes ac-entryIn  { from{opacity:0;transform:translateX(16px)} to{opacity:1;transform:translateX(0)} }
  @keyframes ac-runeRot  { from{transform:rotate(0deg) scale(1)} to{transform:rotate(360deg) scale(1)} }
  @keyframes ac-horizPulse { 0%,100%{opacity:.6;filter:blur(12px)} 50%{opacity:1;filter:blur(6px)} }
  @keyframes ac-starTwinkle { 0%,100%{opacity:.3;transform:scale(1)} 50%{opacity:1;transform:scale(1.4)} }
  @keyframes ac-iconPulse { 0%,100%{transform:scale(1)} 50%{transform:scale(1.15)} }
  @keyframes ac-glowPulse { 0%,100%{filter:drop-shadow(0 0 8px currentColor)} 50%{filter:drop-shadow(0 0 16px currentColor)} }
  @keyframes ac-particleDrift {
    0%   { transform:translateY(0px) translateX(0px); opacity:0; }
    15%  { opacity:.7; }
    85%  { opacity:.4; }
    100% { transform:translateY(-120px) translateX(var(--dx)); opacity:0; }
  }
  @keyframes ac-float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-8px)} }
  @keyframes ac-emblemSpin { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
  @keyframes ac-detailSlideUp { from{opacity:0;transform:translateY(40px)} to{opacity:1;transform:translateY(0)} }
  @keyframes ac-ripple { 0%{transform:scale(0);opacity:.8} 100%{transform:scale(4);opacity:0} }
  @keyframes ac-borderGlow { 0%,100%{border-color:rgba(currentColor,.3)} 50%{border-color:rgba(currentColor,.7)} }

  /* ── Fonts ── */
  .ac-cinzel  { font-family:'Cinzel',serif; }
  .ac-crimson { font-family:'Crimson Pro',serif; }
  .ac-mono    { font-family:'Share Tech Mono',monospace; }

  /* ── Stars ── */
  .ac-star {
    position:absolute; border-radius:50%;
    background:#fff;
    animation:ac-starTwinkle var(--dur,2s) ease-in-out infinite;
    animation-delay:var(--del,0s);
  }

  /* ── Particles ── */
  .ac-particle {
    position:absolute; border-radius:50%;
    animation:ac-particleDrift var(--dur,3s) ease-in-out infinite;
    animation-delay:var(--del,0s);
    --dx: 0px;
  }

  /* ── Half panel ── */
  .ac-half {
    position:relative; overflow:hidden;
    cursor:pointer;
    transition:flex .5s cubic-bezier(.22,.68,0,1.2);
    flex:1;
  }
  .ac-half:hover { flex:1.06; }

  /* ── Topic card ── */
  .ac-topic-card {
    position:relative; overflow:hidden;
    border-radius:12px; cursor:pointer;
    transition:transform .28s cubic-bezier(.22,.68,0,1.2),
               border-color .22s, box-shadow .22s;
    animation:ac-fadeUp .45s ease both;
  }
  .ac-topic-card::after {
    content:''; position:absolute; top:0; left:-80%; width:36%; height:100%;
    background:linear-gradient(90deg,transparent,rgba(255,255,255,.08),transparent);
    transform:skewX(-16deg); pointer-events:none; opacity:0;
  }
  .ac-topic-card:hover { transform:translateY(-4px) scale(1.02); }
  .ac-topic-card:hover::after { animation:ac-shimmer .55s ease both; opacity:1; }

  /* ── Detail overlay ── */
  .ac-detail-overlay {
    position:fixed; inset:0; z-index:100;
    display:flex; flex-direction:column;
    animation:ac-scaleIn .4s cubic-bezier(.22,.68,0,1.2) both;
  }
  .ac-detail-content {
    flex:1; overflow-y:auto; padding:0 0 60px;
  }
  .ac-detail-content::-webkit-scrollbar { width:3px; }
  .ac-detail-content::-webkit-scrollbar-thumb { border-radius:2px; }

  /* ── Horizon line ── */
  .ac-horizon { animation:ac-horizPulse 3s ease-in-out infinite; }

  /* ── Back button ── */
  .ac-back {
    display:inline-flex; align-items:center; gap:7px;
    padding:9px 20px; border-radius:50px;
    font-family:'Cinzel',serif; font-size:.58rem; font-weight:700; letter-spacing:.16em;
    cursor:pointer; transition:all .22s; border:none;
  }

  /* ── Scroll ── */
  .ac-scroll { scrollbar-width:thin; }
  .ac-scroll::-webkit-scrollbar { width:3px; }
`

// ── STARS LAYER (for Celestia) ────────────────────────────────
function Stars({ count = 60 }) {
  const stars = useRef(
    Array.from({ length: count }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 2 + 0.5,
      dur: (Math.random() * 2 + 1.5).toFixed(1),
      del: (Math.random() * 3).toFixed(1),
      opacity: Math.random() * 0.5 + 0.2,
    }))
  ).current

  return (
    <div style={{ position:'absolute', inset:0, pointerEvents:'none' }}>
      {stars.map(s => (
        <div
          key={s.id}
          className="ac-star"
          style={{
            left:`${s.x}%`, top:`${s.y}%`,
            width:s.size, height:s.size,
            opacity:s.opacity,
            '--dur': `${s.dur}s`,
            '--del': `${s.del}s`,
          }}
        />
      ))}
    </div>
  )
}

// ── PARTICLES LAYER (for Abyss) ───────────────────────────────
function AbyssParticles({ count = 40 }) {
  const particles = useRef(
    Array.from({ length: count }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 3 + 1,
      dur: (Math.random() * 4 + 2).toFixed(1),
      del: (Math.random() * 5).toFixed(1),
      dx: `${(Math.random() - 0.5) * 40}px`,
      color: Math.random() > 0.5 ? 'rgba(139,111,212,' : 'rgba(90,60,160,',
      alpha: (Math.random() * 0.4 + 0.2).toFixed(2),
    }))
  ).current

  return (
    <div style={{ position:'absolute', inset:0, pointerEvents:'none', overflow:'hidden' }}>
      {particles.map(p => (
        <div
          key={p.id}
          className="ac-particle"
          style={{
            left:`${p.x}%`, top:`${p.y}%`,
            width:p.size, height:p.size,
            background:`${p.color}${p.alpha})`,
            '--dur': `${p.dur}s`,
            '--del': `${p.del}s`,
            '--dx': p.dx,
          }}
        />
      ))}
    </div>
  )
}

// ── TOPIC CARD ────────────────────────────────────────────────
function TopicCard({ topic, side, index }) {
  const [isHovered, setIsHovered] = useState(false)
  const accent = side.colorPrimary
  const border = `rgba(${side.accentRgb},0.18)`
  const borderHov = `rgba(${side.accentRgb},0.7)`
  const bg = `rgba(${side.accentRgb},0.05)`
  const bgHov = `rgba(${side.accentRgb},0.12)`

  return (
    <div
      className="ac-topic-card"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        background: isHovered ? bgHov : bg,
        border: `2px solid ${isHovered ? borderHov : border}`,
        padding: '20px 22px',
        cursor:'pointer',
        borderRadius: 16,
        position: 'relative',
        overflow: 'hidden',
        transition:'all .4s cubic-bezier(.25,.46,0,1.2)',
        transform: isHovered ? 'translateY(-8px) scale(1.05)' : 'scale(1)',
        boxShadow: isHovered 
          ? `0 0 28px rgba(${side.accentRgb},0.3), 0 12px 32px rgba(0,0,0,.35), inset 0 1px 1px ${borderHov}`
          : `0 4px 16px rgba(0,0,0,.25), inset 0 1px 1px rgba(255,255,255,.06)`,
        animationDelay: `${0.6 + index * 0.07}s`,
        opacity: 0,
        animation: `ac-fadeUp .5s ease both`,
      }}
    >
      {/* Accent top line */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: '3px',
        background: `linear-gradient(90deg,transparent,${accent}cc,transparent)`,
        opacity: isHovered ? 1 : 0.3,
        transition: 'opacity .4s',
        boxShadow: isHovered ? `0 0 12px ${accent}77` : 'none',
      }} />

      {/* Background glow effect */}
      {isHovered && (
        <div style={{
          position: 'absolute', inset:0,
          background: `radial-gradient(ellipse 300px 100px at 50% 0%,rgba(${side.accentRgb},.15),transparent)`,
          pointerEvents: 'none',
        }} />
      )}

      <div style={{ display:'flex', alignItems:'flex-start', gap:14, position:'relative', zIndex:2 }}>
        <span style={{
          fontSize:24,
          flexShrink:0,
          lineHeight:1,
          marginTop:2,
          color:accent,
          transition:'all .4s cubic-bezier(.25,.46,0,1.2)',
          transform: isHovered ? 'scale(1.3) rotate(12deg)' : 'scale(1) rotate(0deg)',
          textShadow: isHovered ? `0 0 16px ${accent}88` : 'none',
          filter: isHovered ? `drop-shadow(0 0 8px ${accent}66)` : 'drop-shadow(0 0 2px rgba(0,0,0,.3))',
        }}>
          {topic.icon}
        </span>
        <div style={{ flex:1, minWidth:0 }}>
          <div className="ac-cinzel" style={{
            fontSize:'.82rem',
            fontWeight:700,
            letterSpacing:'.04em',
            color: isHovered ? '#fff' : '#e8dcc8',
            marginBottom:8,
            lineHeight:1.2,
            transition: 'all .3s cubic-bezier(.25,.46,0,1)',
            textTransform: 'uppercase',
            textShadow: isHovered ? `0 0 12px rgba(${side.accentRgb},.3)` : 'none',
          }}>
            {topic.title}
          </div>
          <p className="ac-crimson" style={{
            fontSize:'.83rem',
            color: isHovered ? 'rgba(255,255,255,.75)' : 'rgba(255,255,255,.58)',
            lineHeight:1.7,
            margin:0,
            transition: 'color .3s',
          }}>
            {topic.short}
          </p>
        </div>
        <span className="ac-mono" style={{
          fontSize:'.6rem',
          color:accent,
          opacity: isHovered ? 1 : .3,
          transform: isHovered ? 'translateX(8px) scale(1.4)' : 'translateX(0) scale(1)',
          transition:'all .4s cubic-bezier(.25,.46,0,1.2)',
          flexShrink:0,
          alignSelf:'center',
          fontWeight: 'bold',
          textShadow: isHovered ? `0 0 8px ${accent}77` : 'none',
        }}>
          ›
        </span>
      </div>

      {/* Shimmer effect */}
      {isHovered && (
        <div style={{
          position: 'absolute',
          top: 0,
          left: '-100%',
          width: '100%',
          height: '100%',
          background: `linear-gradient(90deg,transparent,rgba(255,255,255,.12),transparent)`,
          animation: 'ac-shimmer .7s ease-in-out',
          pointerEvents: 'none',
          zIndex: 1,
        }} />
      )}
    </div>
  )
}

// ── DETAIL OVERLAY ────────────────────────────────────────────
function DetailOverlay({ topic, side, onClose }) {
  const accent = side.colorPrimary
  const scrollRef = useRef(null)

  useEffect(() => {
    const handleKey = (e) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [onClose])

  const isCelestia = side.id === 'celestia'

  return (
    <div
      className="ac-detail-overlay"
      style={{
        background: isCelestia
          ? 'linear-gradient(180deg,#0e0d18 0%,#12102a 100%)'
          : 'linear-gradient(180deg,#08060f 0%,#0e0a1c 100%)',
      }}
    >
      {/* Ambient glow */}
      <div style={{
        position:'fixed', top:-200, left:'50%', transform:'translateX(-50%)',
        width:700, height:500, borderRadius:'50%',
        background:`radial-gradient(ellipse,rgba(${side.accentRgb},.14) 0%,transparent 70%)`,
        pointerEvents:'none',
      }} />

      {/* Stars / Particles */}
      {isCelestia ? <Stars count={80} /> : <AbyssParticles count={60} />}

      {/* Top bar */}
      <div style={{
        display:'flex', alignItems:'center', justifyContent:'space-between',
        padding:'24px 40px',
        borderBottom:`1px solid rgba(${side.accentRgb},.12)`,
        flexShrink:0, position:'relative', zIndex:2,
        animation:'ac-fadeIn .4s ease both',
      }}>
        <button
          className="ac-back"
          onClick={onClose}
          style={{
            background:`rgba(${side.accentRgb},.08)`,
            border:`1px solid rgba(${side.accentRgb},.25)`,
            color:accent,
          }}
          onMouseEnter={e => e.currentTarget.style.background=`rgba(${side.accentRgb},.18)`}
          onMouseLeave={e => e.currentTarget.style.background=`rgba(${side.accentRgb},.08)`}
        >
          ← {side.label.toUpperCase()}
        </button>
        <div className="ac-mono" style={{ fontSize:'.46rem', letterSpacing:'.22em', color:`rgba(${side.accentRgb},.5)` }}>
          {side.constell}
        </div>
      </div>

      <div ref={scrollRef} className="ac-detail-content ac-scroll" style={{ position:'relative', zIndex:2 }}>
        <div style={{ maxWidth:760, margin:'0 auto', padding:'52px 40px 0' }}>

          {/* Icon */}
          <div style={{
            width:72, height:72, borderRadius:18,
            background:`rgba(${side.accentRgb},.1)`,
            border:`1px solid rgba(${side.accentRgb},.28)`,
            display:'flex', alignItems:'center', justifyContent:'center',
            fontSize:28, marginBottom:20,
            animation:'ac-detailSlideUp .5s ease both .1s', opacity:0,
          }}>
            <span>{topic.icon}</span>
          </div>

          {/* Title */}
          <h1 className="ac-cinzel" style={{
            fontSize:'clamp(1.6rem,4vw,2.6rem)', fontWeight:900,
            color:'#fff', letterSpacing:'.04em', lineHeight:1.1,
            marginBottom:12, textShadow:`0 0 60px rgba(${side.accentRgb},.3)`,
            animation:'ac-detailSlideUp .5s ease both .15s', opacity:0,
          }}>
            {topic.title}
          </h1>

          {/* Accent line */}
          <div style={{
            width:80, height:2,
            background:`linear-gradient(90deg,${accent},transparent)`,
            marginBottom:28,
            animation:'ac-detailSlideUp .5s ease both .2s', opacity:0,
          }} />

          {/* Short */}
          <p className="ac-crimson" style={{
            fontSize:'1.15rem', fontStyle:'italic',
            color:`rgba(${side.accentRgb},.75)`,
            lineHeight:1.7, marginBottom:28,
            animation:'ac-detailSlideUp .5s ease both .25s', opacity:0,
          }}>
            "{topic.short}"
          </p>

          {/* Divider */}
          <div style={{
            height:1, background:`rgba(${side.accentRgb},.15)`,
            marginBottom:28,
            animation:'ac-detailSlideUp .5s ease both .28s', opacity:0,
          }} />

          {/* Full body */}
          <p className="ac-crimson" style={{
            fontSize:'1.05rem', color:'rgba(255,255,255,.65)',
            lineHeight:1.88, marginBottom:48,
            animation:'ac-detailSlideUp .5s ease both .32s', opacity:0,
          }}>
            {topic.body}
          </p>

          {/* Other topics from same side */}
          <div style={{
            borderTop:`1px solid rgba(${side.accentRgb},.12)`,
            paddingTop:32, marginBottom:20,
          }}>
            <div className="ac-mono" style={{ fontSize:'.46rem', letterSpacing:'.2em', color:`rgba(${side.accentRgb},.45)`, marginBottom:16 }}>
              MORE FROM {side.label.toUpperCase()}
            </div>
            <div style={{ display:'flex', flexDirection:'column', gap:10 }}>
              {side.topics.filter(t => t.id !== topic.id).map((t, i) => (
                <div
                  key={t.id}
                  style={{
                    display:'flex', alignItems:'center', gap:12,
                    padding:'12px 16px', borderRadius:10, cursor:'pointer',
                    background:`rgba(${side.accentRgb},.04)`,
                    border:`1px solid rgba(${side.accentRgb},.14)`,
                    transition:'all .2s',
                    animation:'ac-entryIn .4s ease both',
                    animationDelay:`${i * .05}s`, opacity:0,
                  }}
                  onClick={() => {
                    // Navigate to another topic in same overlay — swap topic via parent
                    onClose()
                  }}
                  onMouseEnter={e => { e.currentTarget.style.background=`rgba(${side.accentRgb},.1)`; e.currentTarget.style.borderColor=`rgba(${side.accentRgb},.3)` }}
                  onMouseLeave={e => { e.currentTarget.style.background=`rgba(${side.accentRgb},.04)`; e.currentTarget.style.borderColor=`rgba(${side.accentRgb},.14)` }}
                >
                  <span style={{ color:accent, fontSize:15 }}>{t.icon}</span>
                  <span className="ac-cinzel" style={{ fontSize:'.72rem', fontWeight:600, color:'rgba(255,255,255,.7)', letterSpacing:'.03em' }}>{t.title}</span>
                  <span className="ac-mono" style={{ marginLeft:'auto', fontSize:'.42rem', color:`rgba(${side.accentRgb},.5)` }}>›</span>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}

// ── HALF PANEL ────────────────────────────────────────────────
function HalfPanel({ side, isTop }) {
  const isCelestia = side.id === 'celestia'

  return (
    <div style={{
      position:'relative', flex:1, overflow:'hidden',
      background:isCelestia
        ? 'linear-gradient(180deg,#0a0920 0%,#12102a 60%,#16142e 100%)'
        : 'linear-gradient(180deg,#100c1c 0%,#0a0714 60%,#06040e 100%)',
      display:'flex', flexDirection:'column',
    }}>

      {/* Ambient radial glow */}
      <div style={{
        position:'absolute',
        ...(isCelestia ? { top:'-15%', left:'50%', transform:'translateX(-50%)' } : { bottom:'-15%', left:'50%', transform:'translateX(-50%)' }),
        width:'80%', height:'60%', borderRadius:'50%',
        background:`radial-gradient(ellipse,rgba(${side.accentRgb},.13) 0%,transparent 70%)`,
        pointerEvents:'none',
      }} />

      {/* Geometric grid overlay */}
      <div style={{
        position:'absolute', inset:0, pointerEvents:'none', opacity:.03,
        backgroundImage:`linear-gradient(rgba(${side.accentRgb},1) 1px,transparent 1px),
                         linear-gradient(90deg,rgba(${side.accentRgb},1) 1px,transparent 1px)`,
        backgroundSize:'60px 60px',
      }} />

      {/* Stars or Particles */}
      {isCelestia ? <Stars count={50} /> : <AbyssParticles count={30} />}

      {/* Content */}
      <div style={{
        position:'relative', zIndex:2,
        flex:1, overflowY:'auto',
        padding: '48px 48px 32px',
        display:'flex', flexDirection:'column',
        justifyContent: 'flex-start',
      }}
        className="ac-scroll"
      >
        {/* Header */}
        <div style={{
          marginBottom: 40,
          marginTop: 0,
          animation:'ac-fadeUp .6s ease both .2s', opacity:0,
          position:'relative',
        }}>
          {/* Decorative top line */}
          <div style={{
            display:'flex', alignItems:'center', gap:12, marginBottom:20,
          }}>
            <div style={{
              flex:1, height:'1px',
              background:`linear-gradient(90deg,transparent,rgba(${side.accentRgb},.25))`,
            }} />
            <div className="ac-mono" style={{
              fontSize:'.38rem', letterSpacing:'.18em', color:`rgba(${side.accentRgb},.5)`,
              textTransform:'uppercase',
            }}>
              {side.id}
            </div>
            <div style={{
              flex:1, height:'1px',
              background:`linear-gradient(90deg,rgba(${side.accentRgb},.25),transparent)`,
            }} />
          </div>

          {/* Main title with emblem */}
          <div style={{ display:'flex', alignItems:'baseline', gap:14, marginBottom:14 }}>
            <span style={{
              display:'inline-flex', alignItems:'center', justifyContent:'center',
              width:12, height:12, borderRadius:'50%',
              background:`rgba(${side.accentRgb},.2)`,
              border:`1px solid rgba(${side.accentRgb},.45)`,
              boxShadow:`0 0 12px rgba(${side.accentRgb},.2)`,
              color:side.colorPrimary, fontSize:'.5rem',
            }}>
              {side.emblem}
            </span>
            <h2 className="ac-cinzel" style={{
              fontSize:'clamp(1.8rem,4vw,3rem)', fontWeight:900,
              color:'#fff', letterSpacing:'.02em', lineHeight:1,
              textShadow:`0 0 60px rgba(${side.accentRgb},.3), 0 0 20px rgba(${side.accentRgb},.15)`,
              margin:0,
            }}>
              {side.label}
            </h2>
            <span style={{
              display:'inline-flex', alignItems:'center', justifyContent:'center',
              width:12, height:12, borderRadius:'50%',
              background:`rgba(${side.accentRgb},.2)`,
              border:`1px solid rgba(${side.accentRgb},.45)`,
              boxShadow:`0 0 12px rgba(${side.accentRgb},.2)`,
              color:side.colorPrimary, fontSize:'.5rem',
            }}>
              {side.emblem}
            </span>
          </div>

          {/* Constell badge */}
          <div className="ac-mono" style={{
            display:'inline-block',
            fontSize:'.40rem', letterSpacing:'.24em', color:side.colorPrimary,
            border:`1px solid rgba(${side.accentRgb},.25)`,
            padding:'6px 16px', borderRadius:24,
            background:`rgba(${side.accentRgb},.08)`,
            marginBottom:16,
            boxShadow:`0 0 12px rgba(${side.accentRgb},.1)`,
          }}>
            {side.constell}
          </div>

          {/* Subtitle */}
          <div className="ac-cinzel" style={{
            fontSize:'clamp(.8rem,1.6vw,1rem)', color:`rgba(${side.accentRgb},.65)`,
            letterSpacing:'.06em', marginBottom:14, fontStyle:'italic',
          }}>
            {side.subtitle}
          </div>

          {/* Tagline with border */}
          <p className="ac-crimson" style={{
            fontSize:'clamp(.85rem,1.4vw,.95rem)', fontStyle:'italic',
            color:'rgba(255,255,255,.45)', lineHeight:1.75, maxWidth:500,
            borderLeft:`2px solid rgba(${side.accentRgb},.4)`,
            paddingLeft:16, margin:0,
          }}>
            {side.tagline}
          </p>
        </div>

        {/* Topic cards */}
        <div style={{
          display:'grid',
          gridTemplateColumns:'repeat(auto-fill,minmax(240px,1fr))',
          gap:14,
          marginBottom: 48,
        }}>
          {side.topics.map((topic, i) => (
            <TopicCard
              key={topic.id}
              topic={topic}
              side={side}
              index={i}
            />
          ))}
        </div>

        {/* Footer accent */}
        <div style={{
          marginTop: 'auto',
          paddingTop: 24,
          borderTop: `1px solid rgba(${side.accentRgb},.2)`,
          animation: 'ac-fadeUp .7s ease both .8s',
          opacity: 0,
        }}>
          <div className="ac-mono" style={{
            fontSize: '.44rem',
            letterSpacing: '.16em',
            color: `rgba(${side.accentRgb},.6)`,
            textAlign: 'center',
          }}>
            { side.id === 'celestia' ? '✦ REALM OF ETERNAL ORDER ✦' : '◎ DEPTHS OF BOUNDLESS CHAOS ◎' }
          </div>
        </div>
      </div>
    </div>
  )
}

// ── HORIZON DIVIDER ───────────────────────────────────────────
function Horizon() {
  return (
    <div style={{ position:'relative', flexShrink:0, height:72, zIndex:10, overflow:'visible' }}>

      {/* Background gradient fade */}
      <div style={{
        position:'absolute', inset:0,
        background:'linear-gradient(180deg,rgba(212,184,106,.04) 0%,transparent 40%,transparent 60%,rgba(139,111,212,.04) 100%)',
      }} />

      {/* Core line */}
      <div style={{
        position:'absolute', top:'50%', left:0, right:0,
        height:1, background:'rgba(255,255,255,.08)',
        transform:'translateY(-50%)',
      }} />

      {/* Gold-to-Purple gradient glow */}
      <div className="ac-horizon" style={{
        position:'absolute', top:'50%', left:'8%', right:'8%',
        height:3, transform:'translateY(-50%)',
        background:'linear-gradient(90deg,transparent,rgba(212,184,106,.4) 20%,rgba(212,184,106,.65) 45%,rgba(139,111,212,.65) 55%,rgba(139,111,212,.4) 80%,transparent)',
        borderRadius:2,
        filter:'drop-shadow(0 0 12px rgba(212,184,106,.25)) drop-shadow(0 0 8px rgba(139,111,212,.25))',
      }} />

      {/* Central decoration cluster */}
      <div style={{
        position:'absolute', top:'50%', left:'50%',
        transform:'translate(-50%,-50%)',
        display:'flex', alignItems:'center', gap:24,
      }}>
        {/* Left ornament */}
        <div style={{
          display:'flex', flexDirection:'column', alignItems:'center', gap:6,
        }}>
          <div style={{
            display:'flex', gap:6,
            opacity:0.6, animation:'ac-float 3s ease-in-out infinite',
          }}>
            <div style={{ width:4, height:4, background:'#d4b86a', borderRadius:'50%', boxShadow:'0 0 6px #d4b86a' }} />
            <div style={{ width:4, height:4, background:'#d4b86a', borderRadius:'50%', boxShadow:'0 0 6px #d4b86a' }} />
            <div style={{ width:4, height:4, background:'#d4b86a', borderRadius:'50%', boxShadow:'0 0 6px #d4b86a' }} />
          </div>
          <div style={{ width:1, height:16, background:'linear-gradient(180deg,rgba(212,184,106,.4),transparent)' }} />
        </div>

        {/* Center diamonds */}
        <div style={{
          display:'flex', flexDirection:'column', alignItems:'center', gap:8,
        }}>
          {/* Top diamond - Celestia */}
          <div style={{
            width:8, height:8, background:'#d4b86a',
            transform:'rotate(45deg)',
            boxShadow:'0 0 16px rgba(212,184,106,.8), inset 0 1px 2px rgba(255,255,255,.3)',
            animation:'ac-float 2.8s ease-in-out infinite',
          }} />

          {/* Central divider */}
          <div style={{
            width:48, height:2,
            background:'linear-gradient(90deg,transparent,rgba(212,184,106,.3),rgba(139,111,212,.3),transparent)',
            margin:'4px 0',
          }} />

          {/* Bottom diamond - Abyss */}
          <div style={{
            width:8, height:8, background:'#8b6fd4',
            transform:'rotate(45deg)',
            boxShadow:'0 0 16px rgba(139,111,212,.8), inset 0 1px 2px rgba(255,255,255,.3)',
            animation:'ac-float 3.2s ease-in-out infinite',
            animationDelay:'.5s',
          }} />
        </div>

        {/* Right ornament */}
        <div style={{
          display:'flex', flexDirection:'column', alignItems:'center', gap:6,
        }}>
          <div style={{
            display:'flex', gap:6, flexDirection:'row-reverse',
            opacity:0.6, animation:'ac-float 3.4s ease-in-out infinite',
          }}>
            <div style={{ width:4, height:4, background:'#8b6fd4', borderRadius:'50%', boxShadow:'0 0 6px #8b6fd4' }} />
            <div style={{ width:4, height:4, background:'#8b6fd4', borderRadius:'50%', boxShadow:'0 0 6px #8b6fd4' }} />
            <div style={{ width:4, height:4, background:'#8b6fd4', borderRadius:'50%', boxShadow:'0 0 6px #8b6fd4' }} />
          </div>
          <div style={{ width:1, height:16, background:'linear-gradient(180deg,transparent,rgba(139,111,212,.4))' }} />
        </div>
      </div>

      {/* Side lines */}
      <div style={{
        position:'absolute', top:'50%', left:'5%',
        width:'20%', height:1, transform:'translateY(-50%)',
        background:'linear-gradient(90deg,transparent,rgba(212,184,106,.25))',
      }} />
      <div style={{
        position:'absolute', top:'50%', right:'5%',
        width:'20%', height:1, transform:'translateY(-50%)',
        background:'linear-gradient(90deg,rgba(139,111,212,.25),transparent)',
      }} />

      {/* Labels */}
      <div className="ac-mono" style={{
        position:'absolute', top:'50%', left:20,
        transform:'translateY(-50%)',
        fontSize:'.38rem', letterSpacing:'.2em', color:'rgba(212,184,106,.35)',
        textTransform:'uppercase', fontWeight:700,
      }}>
        ◆ CELESTIA ◆
      </div>
      <div className="ac-mono" style={{
        position:'absolute', top:'50%', right:20,
        transform:'translateY(-50%)',
        fontSize:'.38rem', letterSpacing:'.2em', color:'rgba(139,111,212,.35)',
        textTransform:'uppercase', fontWeight:700,
      }}>
        ◆ ABYSS ◆
      </div>
    </div>
  )
}

// ── MAIN ──────────────────────────────────────────────────────
export default function AbyssCelestia({ onBack }) {
  return (
    <>
      <style>{CSS}</style>

      <div style={{
        position:'fixed', inset:0,
        display:'flex', flexDirection:'column',
        background:'#08060f',
        fontFamily:"'Crimson Pro', serif",
      }}>

        {/* ── TOP BAR ── */}
        <div style={{
          display:'flex', alignItems:'center', justifyContent:'space-between',
          padding:'16px 36px', flexShrink:0,
          borderBottom:'1px solid rgba(255,255,255,.08)',
          background:'linear-gradient(90deg,rgba(8,6,15,.9),rgba(8,6,15,.85),rgba(8,6,15,.9))',
          backdropFilter:'blur(16px)',
          position:'relative', zIndex:20,
          animation:'ac-fadeIn .6s ease both',
        }}>
          {onBack
            ? <button
                className="ac-back"
                onClick={onBack}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                  background:'rgba(255,255,255,.06)',
                  border:'1px solid rgba(255,255,255,.12)',
                  color:'#9e9388',
                  padding: '10px 20px',
                  borderRadius: 50,
                  fontSize: '.5rem',
                  fontFamily: "'Cinzel', serif",
                  fontWeight: 700,
                  letterSpacing: '.1em',
                  cursor: 'pointer',
                  transition: 'all .28s',
                }}
                onMouseEnter={e => { e.currentTarget.style.background='rgba(255,255,255,.12)'; e.currentTarget.style.borderColor='rgba(255,255,255,.3)'; e.currentTarget.style.color='#e8e0d0' }}
                onMouseLeave={e => { e.currentTarget.style.background='rgba(255,255,255,.06)'; e.currentTarget.style.borderColor='rgba(255,255,255,.12)'; e.currentTarget.style.color='#9e9388' }}
              >
                ← HUB
              </button>
            : <div style={{ width: 100 }} />
          }
          <div style={{
            display:'flex', alignItems:'center', gap:12, justifyContent:'center', flex:1,
          }}>
            <div style={{ width:6, height:6, background:'#d4b86a', borderRadius:'50%', boxShadow:'0 0 8px #d4b86a', animation: 'ac-float 3s ease-in-out infinite' }} />
            <div className="ac-mono" style={{
              fontSize:'.46rem',
              letterSpacing:'.24em',
              color:'rgba(255,255,255,.25)',
              textTransform: 'uppercase',
            }}>
              CODEX · VOL. V
            </div>
            <div style={{ width:6, height:6, background:'#8b6fd4', borderRadius:'50%', boxShadow:'0 0 8px #8b6fd4', animation: 'ac-float 3.5s ease-in-out infinite' }} />
          </div>
          <div style={{ display:'flex', alignItems:'center', gap:12, width: 100 }}>
            <span style={{ width:6, height:6, background:'#d4b86a', transform:'rotate(45deg)', boxShadow:'0 0 6px rgba(212,184,106,.6)', display:'inline-block' }} />
            <span style={{ width:6, height:6, background:'#8b6fd4', transform:'rotate(45deg)', boxShadow:'0 0 6px rgba(139,111,212,.6)', display:'inline-block' }} />
          </div>
        </div>

        {/* ── SPLIT WORLD ── */}
        <div style={{ flex:1, display:'flex', flexDirection:'column', overflow:'hidden', minHeight:0 }}>
          <HalfPanel side={CELESTIA} isTop={true} />
          <Horizon />
          <HalfPanel side={ABYSS}    isTop={false} />
        </div>

      </div>
    </>
  )
}