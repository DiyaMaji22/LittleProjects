// ─────────────────────────────────────────────────────────────
//  FactionsOrders.jsx  —  "Factions & Orders" page
//
//  Dark fantasy codex aesthetic — ink-black, aged gold, per-faction
//  accent colours. Matches PaimonHub's Cinzel + Crimson Pro palette.
//
//  Props
//  ─────
//  onBack : () => void   (optional — renders back button if provided)
// ─────────────────────────────────────────────────────────────

import { useState, useRef, useEffect } from 'react'
import factionsImg from '../assets/factions.jpg'

// ── DESIGN TOKENS ─────────────────────────────────────────────
const T = {
  bg:         '#0c0b0f',
  bg2:        '#111018',
  bg3:        '#16141e',
  surface:    'rgba(255,255,255,0.04)',
  surface2:   'rgba(255,255,255,0.07)',
  gold:       '#c9923a',
  gold2:      '#e8b96a',
  goldGlow:   'rgba(201,146,58,0.18)',
  text:       '#e8e0d0',
  text2:      '#9e9388',
  muted:      '#5c5448',
  border:     'rgba(201,146,58,0.18)',
  borderAct:  'rgba(201,146,58,0.52)',
  divider:    'rgba(255,255,255,0.06)',
}

// ── DATA ──────────────────────────────────────────────────────
const FACTIONS = [
  {
    id: 'fatui',
    name: 'The Fatui',
    role: 'Military arm of Snezhnaya',
    constell: 'UNDECIM PRODITORES',
    icon: '❄',
    iconBg: 'linear-gradient(135deg,#0e1e38,#1a3558)',
    accent: '#5fa8d8',
    align: 'ANTAGONIST',
    alignStyle: { bg: 'rgba(180,50,50,.12)', border: 'rgba(180,50,50,.3)', color: '#d46060' },
    threat: 92,
    desc: "Snezhnaya's militant diplomatic corps. Beneath ambassadorial facades, the Fatui pursue the Tsaritsa's secret war to collect all seven Gnoses.",
    tags: ['Harbingers','Snezhnaya','Gnosis-hunters','Delusions','Tsaritsa'],
    entries: [
      { h: 'Origin & purpose',        b: "Created by the Cryo Archon Tsaritsa to collect all seven Gnoses. They masquerade as diplomats but operate as intelligence agents and soldiers across every nation in Teyvat." },
      { h: 'The Eleven Harbingers',   b: "Eleven chosen warriors ranked by power, each bearing a unique title from the Commedia dell'arte. Childe (Tartaglia), Arlecchino, and Dottore are among the most active. They answer only to the Tsaritsa." },
      { h: 'Delusion users',          b: "Unlike Vision holders, some Fatui agents wield Delusions — artificial devices that grant elemental power at a terrible cost to the user's life force, slowly consuming them from within." },
      { h: 'True goal',               b: "The Tsaritsa seeks to wage war on Celestia itself, aiming to dismantle the 'Script' — the predetermined fate imposed on Teyvat by the Sustainer of Heavenly Principles." },
    ],
  },
  {
    id: 'abyss',
    name: 'Abyss Order',
    role: 'Force of the depths',
    constell: 'ABYSSI IMPERIUM',
    icon: '◎',
    iconBg: 'linear-gradient(135deg,#1a1028,#2c1848)',
    accent: '#9b7ed4',
    align: 'ANTAGONIST',
    alignStyle: { bg: 'rgba(180,50,50,.12)', border: 'rgba(180,50,50,.3)', color: '#d46060' },
    threat: 85,
    desc: "An ancient army of abyssal creatures led by the Traveler's own twin sibling. They seek to overturn the world order imposed by Celestia — whatever the cost.",
    tags: ["Twin sibling","Khaenri'ah","Monsters","Descenders","The Abyss"],
    entries: [
      { h: 'The commander',                b: "The Traveler's twin sibling — also a Descender — witnessed the destruction of Khaenri'ah 500 years ago and chose to align with the Abyss, driven by vengeance against Celestia." },
      { h: "Khaenri'ah's cursed people",   b: "Many of the Order's warriors were once Khaenri'ahn citizens, cursed after their nation was destroyed. Some became abyssal monsters; others received painful immortality, unable to die." },
      { h: 'The Abyss itself',             b: "A dimension opposing the surface world of Teyvat. Its true nature — whether sentient, hostile, or something else entirely — remains one of the game's deepest unsolved mysteries." },
      { h: 'Relationship with the Traveler', b: "The Traveler's quest is fundamentally tied to their sibling. The twin appears to genuinely believe they are protecting the world, viewing Celestia as the true evil — yet their methods cause catastrophic destruction." },
    ],
  },
  {
    id: 'hexenzirkel',
    name: 'Hexenzirkel',
    role: 'Ancient circle of witches',
    constell: 'OCTO SORORES',
    icon: '✦',
    iconBg: 'linear-gradient(135deg,#280e1e,#3c1030)',
    accent: '#c87090',
    align: 'NEUTRAL',
    alignStyle: { bg: 'rgba(180,130,30,.1)', border: 'rgba(180,130,30,.28)', color: '#c09048' },
    threat: 40,
    desc: "Eight ancient witches of extraordinary power, operating outside all national authority. Their motives remain inscrutable even to the Archons themselves.",
    tags: ['Alice','Rhinedottir','Ancient magic','Eight members','Nicole'],
    entries: [
      { h: 'Membership',            b: "Eight witches (the 'Mages Tea Party'), each identified by a code letter. Alice (A) is the most visible. Others include Rhinedottir (R), the creator of Albedo, and Barbeloth (B), Mona's master." },
      { h: 'History with Archons',  b: "The Hexenzirkel once challenged the Anemo Archon Barbatos, but the conflict ended in a peaceful tea party agreement. They are ancient enough to remember Khaenri'ah before its fall." },
      { h: 'Their current work',    b: "They study forbidden magic independently, with no loyalty to Celestia or the Abyss. Their actions include maintaining the 'boundaries' of the world and observing the 'fated' paths of Teyvat." },
      { h: 'Why they matter',       b: "They represent a third power: neither Celestia's rigid order nor the Abyss's hunger. Their knowledge of pre-Archon secrets and 'Gold's' creations are vital to the world's survival." },
    ],
  },
  {
    id: 'akademiya',
    name: 'The Akademiya',
    role: "Sumeru's grand institution",
    constell: 'SCIENTIA SUMERU',
    icon: '◈',
    iconBg: 'linear-gradient(135deg,#0e2218,#142e1e)',
    accent: '#68b878',
    align: 'REFORMED',
    alignStyle: { bg: 'rgba(50,140,70,.1)', border: 'rgba(50,140,70,.28)', color: '#60a860' },
    threat: 25,
    desc: "Sumeru's all-powerful institution of learning — once a tool of corruption under Grand Sage Azar, now reformed under the gentle wisdom of the Dendro Archon Nahida.",
    tags: ['Sumeru','Nahida','Irminsul','Darshans','Grand Sage (former)'],
    entries: [
      { h: 'Structure & purpose',        b: "The Akademiya oversees all scholarly activity in Sumeru, divided into six Darshans. It controls access to Irminsul — the great tree that stores the collective memory of all Teyvat." },
      { h: 'The corruption of Azar',     b: "Grand Sage Azar suppressed Nahida for five hundred years, keeping her isolated in her Sanctuary of Surasthana, collaborating with the Fatui to create a synthetic god." },
      { h: "After the Traveler's intervention", b: "Nahida is now acknowledged as Lesser Lord Kusanali and guides the Akademiya directly. The institution has reopened toward broader scholarship and empathetic leadership." },
      { h: 'Irminsul & forbidden knowledge',    b: "Editing Irminsul changes what people remember — a power that was exploited by the Akademiya's former wing and nearly led to catastrophic consequences for Teyvat's history." },
    ],
  },
  {
    id: 'liyue',
    name: 'Qixing, Crux & Adepti',
    role: "Liyue's triple guardians",
    constell: 'TRIFORMA LIYUE',
    icon: '⚓',
    iconBg: 'linear-gradient(135deg,#281a08,#3c2810)',
    accent: '#d4a040',
    align: 'PROTECTOR',
    alignStyle: { bg: 'rgba(50,140,70,.1)', border: 'rgba(50,140,70,.28)', color: '#60a860' },
    threat: 15,
    desc: "Three intertwined powers that protect Liyue in the wake of Morax's departure: the merchant Qixing, the maritime Crux fleet, and the ancient Adepti who once served Rex Lapis.",
    tags: ['Qixing','Crux Fleet','Adepti','Rex Lapis','Xiao','Beidou'],
    entries: [
      { h: 'The Qixing',       b: "Seven merchant lords governing Liyue Harbour's trade and policy. After Rex Lapis staged his death, the Qixing took direct control — a test of whether humanity could govern without divine oversight." },
      { h: 'The Crux Fleet',   b: "Liyue's independent sea militia led by Captain Beidou. While officially neutral, the Crux acts in defence of Liyue's interests and was integral in fighting back the sea god Osial." },
      { h: 'The Adepti',       b: "Ancient beings who made a binding contract with Rex Lapis millennia ago to protect Liyue. Cloud Retainer and Mountain Shaper are among the oldest. Xiao is a yaksha bound by karmic debt." },
      { h: "Zhongli's legacy", b: "By willingly giving his Gnosis to the Tsaritsa, Morax forced Liyue to mature on its own terms. He believed its people were strong enough to protect themselves without a god." },
    ],
  },
  {
    id: 'guild',
    name: "Adventurers' Guild",
    role: "The world's connective tissue",
    constell: 'ORDO EXPLORATORUM',
    icon: '⚔',
    iconBg: 'linear-gradient(135deg,#1c1810,#2a2418)',
    accent: '#b8a878',
    align: 'NEUTRAL',
    alignStyle: { bg: 'rgba(120,110,80,.1)', border: 'rgba(120,110,80,.25)', color: '#907858' },
    threat: 5,
    desc: "A continent-spanning guild connecting explorers, monster hunters, and wanderers across every nation. The Traveler's closest institutional ally — and Paimon's favourite source of mora.",
    tags: ['Katheryne','Commissions','Mondstadt','Outlander rank','Paimon'],
    entries: [
      { h: 'What they do',          b: "The Adventurers' Guild posts commissions — contracts for monster hunting, exploration, and rescue. It operates in every nation, staffed by Katheryne receptionists who appear identical everywhere." },
      { h: "The Traveler's rank",   b: "The Traveler holds the exceptional designation of Outlander, given to those of extraordinary circumstance. Their rank advanced rapidly, eventually surpassing standard Guild records." },
      { h: "Paimon's role",         b: "Paimon acts as the Traveler's guide, navigator, and emergency translator. Her knowledge of Teyvat's geography and food establishments is encyclopaedic and essential." },
      { h: 'Political neutrality',  b: "The Guild maintains strict neutrality across national borders. This makes it uniquely positioned to coordinate responses to continent-wide threats without triggering diplomatic tensions." },
    ],
  },
]

// ── GLOBAL STYLES ─────────────────────────────────────────────
const CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;600;700;900&family=Crimson+Pro:ital,wght@0,300;0,400;0,600;1,300;1,400&family=Share+Tech+Mono&display=swap');

  /* Keyframes */
  @keyframes fo-fadeUp   { from{opacity:0;transform:translateY(22px)} to{opacity:1;transform:translateY(0)} }
  @keyframes fo-fadeIn   { from{opacity:0} to{opacity:1} }
  @keyframes fo-shimmer  { from{left:-80%} to{left:130%} }
  @keyframes fo-runeRot  { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
  @keyframes fo-bglow    { 0%,100%{box-shadow:0 0 0 1px var(--acc-a),0 0 14px var(--acc-g)} 50%{box-shadow:0 0 0 1px var(--acc-a),0 0 24px var(--acc-gg)} }
  @keyframes fo-tagPop   { 0%{opacity:0;transform:scale(.72)} 70%{transform:scale(1.06)} 100%{opacity:1;transform:scale(1)} }
  @keyframes fo-entryIn  { from{opacity:0;transform:translateX(14px)} to{opacity:1;transform:translateX(0)} }
  @keyframes fo-drawerIn { from{opacity:0;transform:translateY(-8px)} to{opacity:1;transform:translateY(0)} }
  @keyframes fo-pulse    { 0%,100%{opacity:.55} 50%{opacity:1} }

  /* Utilities */
  .fo-cinzel  { font-family:'Cinzel',serif; }
  .fo-crimson { font-family:'Crimson Pro',serif; }
  .fo-mono    { font-family:'Share Tech Mono',monospace; }

  /* Card base */
  .fo-card {
    position:relative; overflow:hidden;
    background:#16141e;
    border:1px solid rgba(201,146,58,.18);
    border-radius:14px; cursor:pointer;
    transition:transform .3s cubic-bezier(.22,.68,0,1.2),
               border-color .25s, box-shadow .25s;
    animation: fo-fadeUp .5s ease both;
  }
  .fo-card::before {
    content:''; position:absolute; inset:0; border-radius:inherit; pointer-events:none;
    background:linear-gradient(135deg,rgba(255,255,255,.04) 0%,transparent 60%);
  }
  .fo-card::after {
    content:''; position:absolute; top:0; left:-80%; width:38%; height:100%;
    background:linear-gradient(90deg,transparent,rgba(255,255,255,.07),transparent);
    transform:skewX(-16deg); pointer-events:none; opacity:0;
  }
  .fo-card:hover {
    transform:translateY(-7px) scale(1.016);
    border-color:var(--acc-a);
    box-shadow:0 16px 38px rgba(0,0,0,.35),0 0 20px var(--acc-g);
  }
  .fo-card:hover::after { animation:fo-shimmer .65s ease both; opacity:1; }
  .fo-card.fo-active   { animation:fo-bglow 2.4s ease-in-out infinite; }

  /* Detail drawer */
  .fo-drawer-wrap {
    position:absolute; left:0; right:0; width:100%;
    overflow:hidden; opacity:0; margin:0;
    transition:opacity .35s ease;
    pointer-events:none;
  }
  .fo-drawer-wrap.fo-open { opacity:1; margin:0 0 24px; pointer-events:auto; }

  .fo-drawer {
    background:#16141e;
    border:1px solid var(--acc-a);
    border-radius:16px; padding:28px 32px 30px;
    position:relative; overflow:hidden;
    animation:fo-drawerIn .4s ease both;
  }
  .fo-drawer::before {
    content:''; position:absolute; top:0; left:0; right:0; height:2px;
    background:linear-gradient(90deg,var(--acc),var(--acc-half),transparent);
  }

  /* Watermark rune */
  .fo-rune {
    position:absolute; top:-18px; right:-18px;
    font-size:130px; line-height:1;
    color:rgba(255,255,255,.022);
    pointer-events:none; user-select:none;
    font-family:'Cinzel',serif;
    animation:fo-runeRot 42s linear infinite;
  }

  /* Entries */
  .fo-entry {
    padding:16px 0;
    border-bottom:1px solid rgba(255,255,255,.06);
    animation:fo-entryIn .4s ease both;
  }
  .fo-entry:last-child { border-bottom:none; padding-bottom:0; }

  /* Tag pop */
  .fo-dtag { animation:fo-tagPop .32s ease both; }

  /* Threat fill transition */
  .fo-threat-fill { transition:width .9s cubic-bezier(.22,.68,0,1.2); }

  /* Noise overlay */
  .fo-noise {
    position:fixed; inset:0; z-index:0; pointer-events:none;
    background-image:url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.015'/%3E%3C/svg%3E");
    background-size:180px; opacity:.5;
  }

  /* Back button */
  .fo-back {
    display:flex; align-items:center; gap:7px;
    padding:9px 20px; border-radius:50px;
    border:1px solid rgba(201,146,58,.22);
    background:rgba(255,255,255,.04);
    font-family:'Cinzel',serif; font-size:.58rem; font-weight:700; letter-spacing:.16em;
    color:#9e9388; cursor:pointer;
    transition:all .22s;
  }
  .fo-back:hover { background:rgba(255,255,255,.08); color:#e8e0d0; border-color:rgba(201,146,58,.5); }

  /* Close btn */
  .fo-close {
    display:flex; align-items:center; gap:6px;
    font-family:'Share Tech Mono',monospace; font-size:.44rem; letter-spacing:.14em;
    color:#5c5448; background:rgba(255,255,255,.04);
    border:1px solid rgba(255,255,255,.08); border-radius:30px;
    padding:7px 16px; cursor:pointer;
    transition:all .2s; flex-shrink:0;
  }
  .fo-close:hover { background:rgba(255,255,255,.09); color:#e8e0d0; }

  /* Scrollbar */
  .fo-scroll::-webkit-scrollbar { width:3px; }
  .fo-scroll::-webkit-scrollbar-thumb { background:rgba(201,146,58,.22); border-radius:2px; }
`

// ── SUB-COMPONENTS ────────────────────────────────────────────

function AlignBadge({ style: s }) {
  return (
    <span style={{
      fontFamily: "'Share Tech Mono', monospace",
      fontSize: '.44rem', letterSpacing: '.12em',
      padding: '3px 10px', borderRadius: 20,
      border: `1px solid ${s.border}`,
      background: s.bg, color: s.color,
      whiteSpace: 'nowrap',
    }}>
      {/* label passed from parent */}
    </span>
  )
}

function ThreatBar({ pct, color }) {
  const [width, setWidth] = useState(0)
  useEffect(() => { const t = setTimeout(() => setWidth(pct), 80); return () => clearTimeout(t) }, [pct])
  return (
    <div style={{ display:'flex', alignItems:'center', gap:10 }}>
      <span className="fo-mono" style={{ fontSize:'.42rem', letterSpacing:'.12em', color:T.muted, whiteSpace:'nowrap' }}>THREAT</span>
      <div style={{ flex:1, height:3, borderRadius:2, background:'rgba(255,255,255,.06)', overflow:'hidden' }}>
        <div className="fo-threat-fill" style={{ width:`${width}%`, height:'100%', borderRadius:2, background:color }} />
      </div>
      <span className="fo-mono" style={{ fontSize:'.42rem', color:T.muted, minWidth:28, textAlign:'right' }}>{pct}%</span>
    </div>
  )
}

function FactionCard({ faction: f, index, isActive, onClick }) {
  return (
    <div
      className={`fo-card${isActive ? ' fo-active' : ''}`}
      onClick={onClick}
      style={{
        '--acc':    f.accent,
        '--acc-a':  f.accent + '80',
        '--acc-g':  f.accent + '22',
        '--acc-gg': f.accent + '44',
        animationDelay: `${0.48 + index * 0.08}s`,
      }}
    >
      {/* Accent top line */}
      <div style={{ height:2, background:`linear-gradient(90deg,${f.accent},transparent)`, opacity:.75 }} />

      <div style={{ padding:'20px 22px 18px' }}>
        {/* Icon + alignment row */}
        <div style={{ display:'flex', alignItems:'flex-start', justifyContent:'space-between', marginBottom:14 }}>
          <div style={{
            width:48, height:48, borderRadius:12, flexShrink:0,
            display:'flex', alignItems:'center', justifyContent:'center',
            fontSize:20, border:'1px solid rgba(255,255,255,.08)',
            background:f.iconBg, position:'relative', overflow:'hidden',
          }}>
            <span style={{ position:'relative', zIndex:1 }}>{f.icon}</span>
            <div style={{ position:'absolute', inset:0, background:'linear-gradient(135deg,rgba(255,255,255,.12),transparent)' }} />
          </div>
          <span style={{
            fontFamily:"'Share Tech Mono',monospace", fontSize:'.44rem', letterSpacing:'.12em',
            padding:'3px 10px', borderRadius:20,
            border:`1px solid ${f.alignStyle.border}`,
            background:f.alignStyle.bg, color:f.alignStyle.color,
          }}>
            {f.align}
          </span>
        </div>

        {/* Text */}
        <div className="fo-mono" style={{ fontSize:'.42rem', letterSpacing:'.2em', color:T.muted, marginBottom:3 }}>{f.constell}</div>
        <h3 className="fo-cinzel" style={{ fontSize:'1rem', fontWeight:700, color:'#fff', letterSpacing:'.04em', margin:'0 0 2px', lineHeight:1.2 }}>{f.name}</h3>
        <div className="fo-crimson" style={{ fontSize:'.82rem', color:'#6b6050', marginBottom:10 }}>{f.role}</div>
        <p className="fo-crimson" style={{ fontSize:'.88rem', color:'#8a7f70', lineHeight:1.65, margin:'0 0 13px' }}>{f.desc}</p>

        {/* Tags */}
        <div style={{ display:'flex', flexWrap:'wrap', gap:5, marginBottom:13 }}>
          {f.tags.map(tag => (
            <span key={tag} className="fo-mono" style={{
              fontSize:'.44rem', letterSpacing:'.09em',
              padding:'2px 9px', borderRadius:20,
              border:'1px solid rgba(255,255,255,.07)',
              color:'#6e6456', background:'rgba(255,255,255,.03)',
            }}>{tag}</span>
          ))}
        </div>

        <ThreatBar pct={f.threat} color={f.accent} />
      </div>

      {/* Explore caret */}
      <div className="fo-mono" style={{
        position:'absolute', bottom:18, right:20,
        fontSize:'.42rem', letterSpacing:'.14em', color:f.accent, opacity:.7,
      }}>
        EXPLORE ›
      </div>
    </div>
  )
}

function FactionDrawer({ faction: f, onClose }) {
  return (
    <div
      className="fo-drawer"
      style={{ '--acc': f.accent, '--acc-a': f.accent + '80', '--acc-half': f.accent + '55' }}
    >
      {/* Watermark */}
      <div className="fo-rune">{f.icon}</div>

      {/* Header */}
      <div style={{ display:'flex', alignItems:'center', gap:14, marginBottom:20, paddingBottom:18, borderBottom:`1px solid ${T.divider}` }}>
        <div style={{
          width:52, height:52, borderRadius:13, flexShrink:0,
          display:'flex', alignItems:'center', justifyContent:'center',
          fontSize:22, border:'1px solid rgba(255,255,255,.1)',
          background:f.iconBg, position:'relative', overflow:'hidden',
        }}>
          <span style={{ position:'relative', zIndex:1 }}>{f.icon}</span>
          <div style={{ position:'absolute', inset:0, background:'linear-gradient(135deg,rgba(255,255,255,.15),transparent)' }} />
        </div>
        <div style={{ flex:1, minWidth:0 }}>
          <h2 className="fo-cinzel" style={{ fontSize:'1.4rem', fontWeight:700, color:'#fff', letterSpacing:'.04em', lineHeight:1.15, margin:0 }}>{f.name}</h2>
          <div className="fo-crimson" style={{ fontSize:'.85rem', color:'#7a6f5e', marginTop:2 }}>{f.role} · <span className="fo-mono" style={{ fontSize:'.44rem', letterSpacing:'.12em' }}>{f.constell}</span></div>
        </div>
        <button className="fo-close" onClick={onClose}>✕ CLOSE</button>
      </div>

      {/* Lore entries */}
      <div>
        {f.entries.map((e, i) => (
          <div key={i} className="fo-entry" style={{ animationDelay:`${i * .07}s` }}>
            <div className="fo-cinzel" style={{ fontSize:'.72rem', fontWeight:600, letterSpacing:'.05em', color:f.accent, marginBottom:7 }}>{e.h}</div>
            <p className="fo-crimson" style={{ fontSize:'.95rem', color:'#8a7f70', lineHeight:1.78, margin:0 }}>{e.b}</p>
          </div>
        ))}
      </div>

      {/* Tags */}
      <div style={{ display:'flex', flexWrap:'wrap', gap:5, marginTop:16, paddingTop:16, borderTop:`1px solid ${T.divider}` }}>
        {f.tags.map((tag, i) => (
          <span key={tag} className="fo-mono fo-dtag" style={{
            fontSize:'.44rem', letterSpacing:'.1em',
            padding:'3px 11px', borderRadius:20,
            border:'1px solid rgba(255,255,255,.1)',
            color:'#7a7060', background:'rgba(255,255,255,.04)',
            animationDelay:`${i * .04}s`,
          }}>{tag}</span>
        ))}
      </div>
    </div>
  )
}

// ── MAIN ──────────────────────────────────────────────────────
export default function FactionsOrders({ onBack }) {
  const [activeId, setActiveId] = useState(null)
  const drawerRef = useRef(null)

  const toggle = (id) => {
    setActiveId(prev => prev === id ? null : id)
  }

  // Scroll drawer into view when opened
  useEffect(() => {
    if (activeId && drawerRef.current) {
      setTimeout(() => {
        drawerRef.current?.scrollIntoView({ behavior:'auto', block:'nearest' })
      }, 100)
    }
  }, [activeId])

  return (
    <>
      <style>{CSS}</style>

      {/* ── PAGE ── */}
      <div className="fo-scroll" style={{
        position:'fixed', inset:0,
        backgroundColor:T.bg,
        backgroundImage:`url(${factionsImg})`,
        backgroundSize:'cover',
        backgroundPosition:'center',
        backgroundAttachment:'fixed',
        overflowY:'auto',
      }}>
        {/* Semi-transparent overlay for readability */}
        <div style={{
          position:'fixed', inset:0, zIndex:0, pointerEvents:'none',
          background:'linear-gradient(180deg,rgba(12,11,15,.75) 0%,rgba(12,11,15,.82) 50%,rgba(12,11,15,.78) 100%)',
        }} />
        {/* Noise overlay */}
        <div className="fo-noise" />

        {/* Atmospheric glows */}
        <div style={{ position:'fixed', top:-120, left:-140, width:600, height:400, background:'rgba(100,60,160,.08)', borderRadius:'50%', filter:'blur(120px)', pointerEvents:'none', zIndex:0 }} />
        <div style={{ position:'fixed', bottom:-160, right:-100, width:500, height:500, background:'rgba(40,90,160,.06)', borderRadius:'50%', filter:'blur(120px)', pointerEvents:'none', zIndex:0 }} />
        <div style={{ position:'fixed', top:'40%', left:'50%', transform:'translateX(-50%)', width:300, height:300, background:'rgba(201,146,58,.03)', borderRadius:'50%', filter:'blur(120px)', pointerEvents:'none', zIndex:0 }} />

        {/* ── CONTENT ── */}
        <div style={{ position:'relative', zIndex:1, maxWidth:1100, margin:'0 auto', padding:'60px 32px 100px' }}>

          {/* Top bar */}
          {onBack && (
            <div style={{ marginBottom:44, animation:'fo-fadeIn .5s ease both' }}>
              <button className="fo-back" onClick={onBack}>← WORLD HUB</button>
            </div>
          )}

          {/* ── HEADER ── */}
          <header style={{ textAlign:'center', marginBottom:64, animation:'fo-fadeUp .7s ease both' }}>
            <div className="fo-mono" style={{
              display:'inline-flex', alignItems:'center', gap:8,
              fontSize:'.52rem', letterSpacing:'.25em', color:T.gold,
              border:`1px solid ${T.border}`, padding:'5px 16px', borderRadius:40,
              marginBottom:20, background:'rgba(201,146,58,.06)',
            }}>
              — TEYVAT CODEX · VOL. III —
            </div>
            <h1 className="fo-cinzel" style={{
              fontSize:'clamp(2rem,5vw,3.6rem)', fontWeight:900,
              letterSpacing:'.04em', color:'#fff', marginBottom:6,
              textShadow:'0 0 40px rgba(201,146,58,.12)', lineHeight:1.1,
            }}>
              Factions &amp; <span style={{ color:T.gold2 }}>Orders</span>
            </h1>
            <p className="fo-crimson" style={{ fontSize:'1.08rem', fontStyle:'italic', color:'#7a705f', marginBottom:28 }}>
              From scheming Harbingers to ancient circles of witches — powers that shape Teyvat from the shadows.
            </p>
            {/* Rule */}
            <div style={{ display:'flex', alignItems:'center', gap:14, justifyContent:'center', maxWidth:520, margin:'0 auto' }}>
              <div style={{ flex:1, height:1, background:`linear-gradient(90deg,transparent,${T.border},transparent)` }} />
              <div style={{ width:7, height:7, background:T.gold, transform:'rotate(45deg)', boxShadow:`0 0 8px ${T.gold}` }} />
              <div style={{ flex:1, height:1, background:`linear-gradient(90deg,${T.border},transparent)` }} />
            </div>
          </header>

          {/* ── FACTION GRID + DRAWERS ── */}
          <div style={{ position:'relative' }}>
            {/* Cards grid */}
            <div style={{
              display:'grid',
              gridTemplateColumns:'repeat(auto-fill,minmax(300px,1fr))',
              gap:16, marginBottom:4,
            }}>
              {FACTIONS.map((f, i) => (
                <FactionCard
                  key={f.id}
                  faction={f}
                  index={i}
                  isActive={activeId === f.id}
                  onClick={() => toggle(f.id)}
                />
              ))}
            </div>

            {/* Full-width drawers below grid */}
            {FACTIONS.map(f => (
              <div
                key={f.id}
                ref={activeId === f.id ? drawerRef : null}
                className={`fo-drawer-wrap${activeId === f.id ? ' fo-open' : ''}`}
              >
                {activeId === f.id && (
                  <FactionDrawer faction={f} onClose={() => setActiveId(null)} />
                )}
              </div>
            ))}
          </div>

          {/* ── FOOTER ── */}
          <footer style={{
            textAlign:'center', marginTop:72, paddingTop:24,
            borderTop:`1px solid ${T.divider}`,
            animation:'fo-fadeIn 1s ease both 1.2s', opacity:0,
          }}>
            <p className="fo-mono" style={{ fontSize:'.46rem', letterSpacing:'.2em', color:T.muted }}>
              TRAVELER'S CODEX · FACTIONS & ORDERS · TEYVAT
            </p>
          </footer>
        </div>
      </div>
    </>
  )
}