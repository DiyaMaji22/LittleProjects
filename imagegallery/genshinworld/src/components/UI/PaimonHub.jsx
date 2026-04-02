// ─────────────────────────────────────────────────────────────
//  PaimonHub.jsx  —  "Know the Genshin World" hub
//
//  Light, airy Genshin palette — soft cream, sky blue, warm gold.
//  Paimon appears as a real cutout image with layered CSS animations
//  creating a convincing 3-D floating illusion:
//    1. p-float   — slow sinusoidal bob + micro-rotation
//    2. p-glow    — warm radial light behind her, pulsing
//    3. p-shadow  — ground shadow scales/fades as she rises
//    4. p-halo    — rose glow at halo position
//
//  Setup
//  ─────
//  1. Copy paimon_cutout.png  →  src/assets/paimon_cutout.png
//  2. The import below picks it up via Vite's asset pipeline.
//
//  Props
//  ─────
//  onBack : () => void
// ─────────────────────────────────────────────────────────────

import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import paimonCutout from '../../assets/paimon_cutout.png'

// ── DESIGN TOKENS ─────────────────────────────────────────────
const T = {
  pageBg:      '#f5f0e8',
  skyTop:      '#cfe8f5',
  skyMid:      '#e2f0f8',
  cardBg:      'rgba(255,252,248,0.84)',
  cardHover:   'rgba(255,252,248,0.98)',
  drawerBg:    'rgba(251,248,243,0.97)',
  overlayBg:   'rgba(210,195,175,0.5)',
  textPrimary: '#28200f',
  textSecond:  '#6b5840',
  textMuted:   '#9e8c74',
  gold:        '#b8840a',
  goldGlow:    'rgba(184,132,10,0.18)',
  rose:        '#b86878',
  roseLight:   '#e8a8a8',
  border:      'rgba(175,148,105,0.28)',
  borderHover: 'rgba(175,148,105,0.65)',
  divider:     'rgba(175,148,105,0.22)',
}

// Per-section accent colours — warm/natural for light theme
const PALETTES = [
  { accent:'#1e7a62', bg:'rgba(30,122,98,.07)',  border:'rgba(30,122,98,.28)'  },
  { accent:'#9a7008', bg:'rgba(154,112,8,.07)',   border:'rgba(154,112,8,.28)'  },
  { accent:'#5840a0', bg:'rgba(88,64,160,.07)',   border:'rgba(88,64,160,.28)'  },
  { accent:'#942828', bg:'rgba(148,40,40,.07)',   border:'rgba(148,40,40,.28)'  },
  { accent:'#1a58a0', bg:'rgba(26,88,160,.07)',   border:'rgba(26,88,160,.28)'  },
  { accent:'#2a7020', bg:'rgba(42,112,32,.07)',   border:'rgba(42,112,32,.28)'  },
  { accent:'#c19a6b', bg:'rgba(193,154,107,.07)', border:'rgba(193,154,107,.28)' },
]

const WORLD_SECTIONS = [
  {
    id:'regions', label:'The Seven Nations', symbol:'🗺', constellation:'Septem Mundi',
    desc:'From wind-swept Mondstadt to flame-scorched Natlan — each nation breathes with the soul of its Archon.',
    tags:['Mondstadt','Liyue','Inazuma','Sumeru','Fontaine','Natlan','Snezhnaya'],
    lore:[
      { heading:'Mondstadt — Land of Freedom', body:"Governed by the wind and the bard Barbatos, Mondstadt is a city-state built on freedom. Freed from the tyrant Decarabian 2,600 years ago, its people have no king — only the Knights of Favonius to protect them." },
      { heading:'Liyue — Land of Geo', body:"The most prosperous port nation in Teyvat, shaped by the God of Contracts, Morax (Rex Lapis). Commerce, tradition, and stone define its identity. The Qixing merchant council now governs after Morax's staged death." },
      { heading:'Inazuma — Land of Eternity', body:"A nation of islands ruled by the Electro Archon Ei through her puppet Shogun. Once sealed behind a storm barrier during the Vision Hunt Decree, Inazuma has reopened to the world, carrying deep wounds of isolation." },
      { heading:'Sumeru — Land of Wisdom', body:"Home of the Dendro Archon Nahida and the Grand Sage's Academy. A nation split between rainforest and desert, where the great tree Irminsul stores all knowledge of the world." },
      { heading:'Fontaine — Land of Justice', body:"A steampunk nation built on law and performance, ruled by the Hydro Archon Focalors (Furina). Following the prophecy of Fontaine's destruction, the nation has found a new path forward." },
      { heading:'Natlan — Land of Battle', body:"Nation of the Pyro Archon Mavuika, where culture revolves around the Sacred Flame and Nightsoul. Besieged by the Abyss, its warriors fought back and reclaimed their home." },
    ],
  },
  {
    id:'archons', label:'The Seven Archons', symbol:'✦', constellation:'Septem Dei',
    desc:'The Seven gods who hold the Gnoses — divine instruments connecting them to the Sustainer of Heavenly Principles.',
    tags:['Barbatos','Morax','Beelzebul','Buer','Focalors','Haborym','Tsaritsa'],
    lore:[
      { heading:'What is an Archon?', body:"Archons are gods who won the Archon War 2,000 years ago. Each victor was granted a Gnosis by Celestia and made ruler of one of Teyvat's seven nations. They must maintain divine power or risk fading." },
      { heading:'The Gnosis', body:"A chess-piece shaped divine instrument connecting an Archon to the Sustainer. The Tsaritsa has been collecting them — Zhongli willingly gave his away, as did Ei, while others were taken by force." },
      { heading:'The Sustainer of Heavenly Principles', body:"A mysterious higher being who controls Celestia. The Sustainer enforces 'The Plan' — a script for the world — and erases those who deviate. The Traveler's journey is tied to challenging this order." },
    ],
  },
  {
    id:'elements', label:'Elements & Reactions', symbol:'⚗', constellation:'Septem Elementa',
    desc:'Seven elements flow through all things in Teyvat. Their interactions form the backbone of all combat and creation.',
    tags:['Anemo','Geo','Electro','Dendro','Hydro','Pyro','Cryo'],
    lore:[
      { heading:'The Seven Elements', body:"Anemo (wind), Geo (earth), Electro (lightning), Dendro (nature), Hydro (water), Pyro (fire), Cryo (ice). Every Vision grants a wielder the ability to channel one element." },
      { heading:'Elemental Reactions', body:"When two elements meet, powerful reactions occur: Vaporize (Hydro+Pyro), Melt (Cryo+Pyro), Overloaded (Electro+Pyro), Superconduct, Swirl, Crystallize, and the Dendro reaction chain — Quicken, Bloom, Hyperbloom." },
      { heading:'Visions & Gnoses', body:"A Vision is a gem granted to mortals with exceptional ambition, allowing elemental power. A Gnosis is far more powerful — held only by Archons as a connection to Celestia itself." },
      { heading:'The Ley Lines', body:"Elemental energy flows through Teyvat via invisible Ley Lines. Major disruptions — like the Cataclysm 500 years ago — leave permanent scars on the land and create Ley Line Outcroppings." },
    ],
  },
  {
    id:'factions', label:'Factions & Orders', symbol:'⚔', constellation:'Ordines Mundi',
    desc:'From the scheming Fatui to the mysterious Hexenzirkel — powerful organisations shape Teyvat from the shadows.',
    tags:['Fatui','Abyss Order','Hexenzirkel','Akademiya','Adventurers'],
    lore:[
      { heading:'The Fatui', body:"The military arm of Snezhnaya, controlled by the Cryo Archon Tsaritsa. Their Eleven Harbingers are some of Teyvat's most powerful individuals. Their true goal: collect all seven Gnoses to wage war on Celestia." },
      { heading:'The Abyss Order', body:"A force of abyssal monsters led by the Traveler's own sibling. The Abyss Order seeks to destroy the existing world order. Their true relationship with the Descenders remains shrouded in mystery." },
      { heading:'The Hexenzirkel', body:"An ancient circle of eight witches, including the sorceress Alice (Klee's mother). Once close with the Archons, the Hexenzirkel now operates independently, studying ancient magic for inscrutable reasons." },
      { heading:'The Akademiya', body:"Sumeru's grand institution of learning, once controlled by the corrupt Grand Sage Azar who suppressed Lesser Lord Kusanali. After the Traveler's intervention, it has been reformed under Nahida's guidance." },
    ],
  },
  {
    id:'abyss', label:'Abyss & Celestia', symbol:'◎', constellation:'Abyssi Caelique',
    desc:'Above the clouds floats Celestia. Below the earth writhes the Abyss. Between them — Teyvat, caught in eternal conflict.',
    tags:["Celestia","The Abyss","Khaenri'ah","Descenders","The Script"],
    lore:[
      { heading:'Celestia', body:"A floating landmass above Teyvat and home of the Seven. In truth, Celestia enforces a predetermined 'script' for the world and erases those who deviate from The Plan — including entire nations." },
      { heading:'The Abyss', body:"An opposing force filled with corrupted monsters, led by the Traveler's sibling who chose alignment with the Abyss after witnessing Khaenri'ah's destruction. Its true nature remains one of the game's deepest mysteries." },
      { heading:"Khaenri'ah — The Cursed Nation", body:"A technologically advanced nation with no Archon. 500 years ago it was destroyed by Celestia in the Cataclysm. Its people were cursed — some became monsters, others gained immortality. The Traveler's sibling witnessed this and chose vengeance." },
      { heading:'Descenders', body:"Beings who descend upon Teyvat from beyond the stars. Both the Traveler and their sibling are Descenders. Celestia fears them because they exist outside The Script and can alter the predetermined fate of the world." },
    ],
  },
  {
    id:'artifacts', label:'Artifacts & Legends', symbol:'◈', constellation:'Reliquiae Mundi',
    desc:'Ancient relics imbued with elemental memory — each set tells the story of a forgotten age or fallen civilisation.',
    tags:['Flower','Plume','Sands','Goblet','Circlet'],
    lore:[
      { heading:'What are Artifacts?', body:"Artifacts are ancient relics carrying elemental resonance. Adventurers equip up to five pieces — Flower of Life, Plume of Death, Sands of Eon, Goblet of Eonothem, and Circlet of Logos. Each set tells its original owner's story." },
      { heading:'Pale Flame — The Spindrift Knight', body:"This set tells the story of Rostam, a fallen knight of Mondstadt known as the Knight of Boreas. He died in battle but his legend inspired the Wolf's Gravestone. His story is mourned by Eula, a Lawrence Clan descendant." },
      { heading:'Echoes of an Offering', body:"Tied to the ancient rituals of Liyue, where offerings were made to Rex Lapis during the Rite of Descension. The goblet in this set held Osmanthus wine shared between Zhongli and the adepti at countless past Rites." },
      { heading:"Nymph's Dream", body:"Connected to the opera houses of Fontaine, worn by performers who danced for the Hydro Archon. Each piece captures a moment from a grand performance that never ended — a metaphor for Furina's 500 years of acting." },
    ],
  },
]

const DIALOGUE = [
  "Paimon's been waiting for you!",
  "The world of Teyvat is SO much bigger than the characters you've met…",
  "Ancient Archons, secret factions, hidden lore, and elemental mysteries!",
  "Come on, Traveler — let Paimon be your guide! ✦",
]

// ── GLOBAL CSS ────────────────────────────────────────────────
const CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;600;700;900&family=Crimson+Pro:ital,wght@0,300;0,400;0,600;1,300;1,400&family=Share+Tech+Mono&display=swap');
  *, *::before, *::after { box-sizing:border-box; margin:0; padding:0; }

  @keyframes p-fadeUp  { from{opacity:0;transform:translateY(22px)} to{opacity:1;transform:translateY(0)} }
  @keyframes p-fadeIn  { from{opacity:0} to{opacity:1} }
  @keyframes p-grow    { from{width:0;opacity:0} to{width:100%;opacity:1} }
  @keyframes p-cardIn  { from{opacity:0;transform:translateY(16px) scale(.96)} to{opacity:1;transform:translateY(0) scale(1)} }
  @keyframes p-tagPop  { 0%{opacity:0;transform:scale(.7)} 70%{transform:scale(1.05)} 100%{opacity:1;transform:scale(1)} }
  @keyframes p-dialogIn{ from{opacity:0;transform:translateY(8px) scale(.97)} to{opacity:1;transform:translateY(0) scale(1)} }

  /* ── Floating Paimon ── */
  @keyframes p-float {
    0%,100%{ transform:translateY(0px)   rotate(0deg)  scale(1);    }
    28%    { transform:translateY(-14px) rotate(.7deg) scale(1.012); }
    55%    { transform:translateY(-22px) rotate(0deg)  scale(1.018); }
    78%    { transform:translateY(-11px) rotate(-.6deg) scale(1.01); }
  }
  @keyframes p-shadow {
    0%,100%{ transform:scaleX(1)   translateY(0px);   opacity:.2;  }
    55%    { transform:scaleX(.55) translateY(10px);  opacity:.07; }
  }
  @keyframes p-glow {
    0%,100%{ opacity:.45; transform:scale(1);    }
    55%    { opacity:.75; transform:scale(1.1);  }
  }
  @keyframes p-halo {
    0%,100%{ opacity:.6;  transform:rotate(0deg)  scale(1);    }
    50%    { opacity:.95; transform:rotate(6deg)  scale(1.05); }
  }

  /* ── Clouds ── */
  @keyframes p-cloud1{ from{transform:translateX(-5%)} to{transform:translateX(108%)} }
  @keyframes p-cloud2{ from{transform:translateX(112%)} to{transform:translateX(-8%)} }

  /* ── Drawer ── */
  @keyframes p-slideIn { from{opacity:0;transform:translateX(52px)} to{opacity:1;transform:translateX(0)} }
  @keyframes p-slideOut{ from{opacity:1;transform:translateX(0)} to{opacity:0;transform:translateX(52px)} }

  /* ── Shimmer on card hover ── */
  @keyframes p-shimmer{ from{left:-80%} to{left:130%} }

  .p-cinzel  { font-family:'Cinzel',serif; }
  .p-crimson { font-family:'Crimson Pro',serif; }
  .p-mono    { font-family:'Share Tech Mono',monospace; }

  /* ── Card ── */
  .p-card {
    position:relative; overflow:hidden;
    background:${T.cardBg};
    border:1px solid ${T.border};
    border-radius:16px;
    cursor:pointer;
    transition:transform .28s cubic-bezier(.22,.68,0,1.2),
                box-shadow .28s, border-color .22s, background .22s;
  }
  .p-card::after {
    content:''; position:absolute; top:0; left:-80%;
    width:40%; height:100%;
    background:linear-gradient(90deg,transparent,rgba(255,255,255,.55),transparent);
    transform:skewX(-16deg); pointer-events:none; opacity:0;
  }
  .p-card:hover {
    transform:translateY(-7px) scale(1.025);
    background:${T.cardHover};
    border-color:var(--ca-border);
    box-shadow:0 16px 44px rgba(0,0,0,.09),0 3px 10px rgba(0,0,0,.05),
               0 0 0 1px var(--ca-border);
  }
  .p-card:hover::after{ animation:p-shimmer .65s ease both; opacity:1; }

  /* ── Drawer ── */
  .p-drawer{
    position:fixed; right:0; top:0; bottom:0;
    width:min(520px,93vw);
    background:${T.drawerBg};
    border-left:1px solid ${T.border};
    box-shadow:-6px 0 40px rgba(0,0,0,.09);
    z-index:200; overflow-y:auto;
  }
  .p-drawer.open { animation:p-slideIn  .36s cubic-bezier(.22,.68,0,1.2) both; }
  .p-drawer.close{ animation:p-slideOut .24s ease both; }
  .p-drawer::-webkit-scrollbar{width:3px}
  .p-drawer::-webkit-scrollbar-thumb{background:${T.border};border-radius:2px}

  /* ── Scrollbar hidden ── */
  .p-noscroll::-webkit-scrollbar{display:none}
  .p-noscroll{-ms-overflow-style:none;scrollbar-width:none}

  /* ── Speech bubble ── */
  .p-bubble{
    background:${T.cardBg};
    border:1px solid ${T.border};
    border-radius:18px 18px 18px 6px;
    box-shadow:0 6px 28px rgba(0,0,0,.07);
    position:relative;
  }
  .p-bubble::after{
    content:''; position:absolute; bottom:-11px; left:22px;
    border:11px solid transparent;
    border-top-color:${T.border};
    border-bottom:none; border-left:none;
  }
  .p-bubble::before{
    content:''; position:absolute; bottom:-9px; left:23px; z-index:1;
    border:10px solid transparent;
    border-top-color:${T.cardBg};
    border-bottom:none; border-left:none;
  }

  /* ── Back button ── */
  .p-back{
    display:flex; align-items:center; gap:7px;
    padding:9px 20px; border-radius:50px;
    border:1px solid ${T.border};
    background:${T.cardBg};
    font-family:'Cinzel',serif; font-size:.6rem; font-weight:700; letter-spacing:.16em;
    color:${T.textSecond}; cursor:pointer;
    box-shadow:0 2px 14px rgba(0,0,0,.06);
    transition:all .22s;
  }
  .p-back:hover{background:#fff;color:${T.textPrimary};box-shadow:0 4px 22px rgba(0,0,0,.1);border-color:${T.borderHover};}

  /* ── Lore entry card ── */
  .p-lore-card{
    padding:16px 18px;
    background:rgba(255,255,255,.75);
    border-radius:12px;
    border-left:3px solid var(--la);
    border-top:1px solid var(--lb);
    border-right:1px solid var(--lb);
    border-bottom:1px solid var(--lb);
  }
`

// ── CLOUDS ────────────────────────────────────────────────────
function Clouds() {
  return (
    <div style={{ position:'absolute', inset:0, pointerEvents:'none', overflow:'hidden', zIndex:0 }}>
      <div style={{ position:'absolute', top:'6%',  width:300, height:56, background:'rgba(255,255,255,.72)', borderRadius:50, filter:'blur(14px)', animation:'p-cloud1 58s linear infinite' }} />
      <div style={{ position:'absolute', top:'16%', width:200, height:38, background:'rgba(255,255,255,.5)',  borderRadius:50, filter:'blur(9px)',  animation:'p-cloud2 74s linear infinite' }} />
      <div style={{ position:'absolute', top:'4%',  width:380, height:48, background:'rgba(255,255,255,.38)', borderRadius:50, filter:'blur(20px)', animation:'p-cloud1 96s linear infinite 14s' }} />
    </div>
  )
}

// ── FLOATING PAIMON ───────────────────────────────────────────
function FloatingPaimon({ size = 260 }) {
  return (
    <div style={{ position:'relative', display:'inline-flex', justifyContent:'center' }}>

      {/* Warm ambient light behind */}
      <div style={{
        position:'absolute', top:'5%', left:'50%', transform:'translateX(-50%)',
        width:size * 1.15, height:size * 1.15, borderRadius:'50%',
        background:'radial-gradient(circle, rgba(255,210,170,.38) 0%, rgba(235,195,145,.16) 45%, transparent 72%)',
        animation:'p-glow 4s ease-in-out infinite',
        pointerEvents:'none', zIndex:0,
      }} />

      {/* Rose halo glow */}
      <div style={{
        position:'absolute', top: size * 0.01, left:'50%', transform:'translateX(-50%)',
        width:size * 0.58, height:size * 0.13, borderRadius:'50%',
        background:'radial-gradient(ellipse, rgba(210,130,130,.55) 0%, transparent 70%)',
        animation:'p-halo 3.8s ease-in-out infinite',
        pointerEvents:'none', zIndex:0,
      }} />

      {/* Paimon image — floats */}
      <div style={{
        position:'relative', zIndex:1,
        animation:'p-float 4.8s ease-in-out infinite',
        transformOrigin:'center bottom',
        willChange:'transform',
      }}>
        <img
          src={paimonCutout}
          alt="Paimon"
          width={size}
          draggable={false}
          style={{
            display:'block',
            // multiply removes white bg remnants; for the pre-cut PNG this also works
            filter:'drop-shadow(0 12px 32px rgba(150,100,70,.22)) drop-shadow(0 3px 10px rgba(100,70,40,.15))',
            userSelect:'none',
            pointerEvents:'none',
          }}
        />
      </div>

      {/* Ground shadow — scales & fades as she rises */}
      <div style={{
        position:'absolute', bottom: -(size * 0.04), left:'50%', transform:'translateX(-50%)',
        width:size * 0.42, height:size * 0.042,
        borderRadius:'50%',
        background:'rgba(160,120,80,.2)',
        filter:'blur(9px)',
        animation:'p-shadow 4.8s ease-in-out infinite',
        zIndex:0,
      }} />
    </div>
  )
}

// ── SECTION DRAWER ────────────────────────────────────────────
function SectionDrawer({ section, palette, onClose }) {
  const [closing, setClosing] = useState(false)
  const close = () => { setClosing(true); setTimeout(onClose, 250) }

  return (
    <>
      {/* Backdrop */}
      <div onClick={close} style={{
        position:'fixed', inset:0, zIndex:199,
        background:T.overlayBg,
        backdropFilter:'blur(7px)',
        animation:'p-fadeIn .3s ease both',
      }} />

      <div className={`p-drawer ${closing ? 'close' : 'open'}`}>
        {/* Accent bar */}
        <div style={{ height:3, background:`linear-gradient(90deg,${palette.accent},${palette.accent}44)` }} />

        <div style={{ padding:'26px 28px 70px' }}>
          {/* Close button */}
          <button onClick={close} style={{
            display:'flex', alignItems:'center', gap:6, marginBottom:24,
            padding:'8px 16px', borderRadius:50,
            border:`1px solid ${palette.border}`,
            background:palette.bg,
            color:palette.accent,
            fontFamily:'Share Tech Mono', fontSize:'.58rem', letterSpacing:'.14em',
            cursor:'pointer', transition:'all .2s',
          }}>
            ← CLOSE
          </button>

          {/* Symbol + meta */}
          <div style={{ fontSize:'2rem', marginBottom:8 }}>{section.symbol}</div>
          <div className="p-mono" style={{ fontSize:'.48rem', letterSpacing:'.2em', color:T.textMuted, marginBottom:5 }}>
            {section.constellation.toUpperCase()}
          </div>
          <h2 className="p-cinzel" style={{ fontSize:'1.5rem', fontWeight:900, color:T.textPrimary, margin:'0 0 10px', lineHeight:1.2 }}>
            {section.label}
          </h2>
          <p className="p-crimson" style={{ fontSize:'.95rem', color:T.textSecond, lineHeight:1.72, marginBottom:16 }}>
            {section.desc}
          </p>

          {/* Tags */}
          <div style={{ display:'flex', flexWrap:'wrap', gap:6, marginBottom:22 }}>
            {section.tags.map((tag, i) => (
              <span key={tag} style={{
                padding:'3px 12px', borderRadius:50,
                border:`1px solid ${palette.border}`,
                background:palette.bg, color:palette.accent,
                fontFamily:'Share Tech Mono', fontSize:'.5rem', letterSpacing:'.1em',
                animation:`p-tagPop .3s ease both ${i * .04}s`, opacity:0,
              }}>
                {tag}
              </span>
            ))}
          </div>

          {/* Divider */}
          <div style={{ height:1, marginBottom:22, background:`linear-gradient(90deg,${palette.accent}55,transparent)` }} />

          {/* Lore entries */}
          <div style={{ display:'flex', flexDirection:'column', gap:16 }}>
            {section.lore.map((entry, i) => (
              <div key={i}
                className="p-lore-card"
                style={{
                  '--la': palette.accent,
                  '--lb': palette.border,
                  animation:`p-fadeUp .4s ease both ${i * .07}s`,
                  opacity:0,
                }}
              >
                <h3 className="p-cinzel" style={{ fontSize:'.7rem', fontWeight:700, color:palette.accent, letterSpacing:'.06em', marginBottom:7 }}>
                  {entry.heading}
                </h3>
                <p className="p-crimson" style={{ fontSize:'.9rem', color:T.textSecond, lineHeight:1.76, margin:0 }}>
                  {entry.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}

// ── WORLD CARD ────────────────────────────────────────────────
function WorldCard({ section, palette, index, onClick }) {
  return (
    <div
      className="p-card"
      onClick={() => onClick(section, palette)}
      style={{
        padding:'22px 20px 18px',
        '--ca-border': palette.border,
        animation:`p-cardIn .44s cubic-bezier(.22,.68,0,1.2) both ${.52 + index * .09}s`,
        opacity:0,
      }}
    >
      {/* Top accent line */}
      <div style={{ position:'absolute', top:0, left:18, right:18, height:2, background:`linear-gradient(90deg,transparent,${palette.accent}55,transparent)`, borderRadius:2 }} />

      <div style={{ fontSize:'1.55rem', marginBottom:9, lineHeight:1 }}>{section.symbol}</div>

      <div className="p-mono" style={{ fontSize:'.44rem', letterSpacing:'.18em', color:T.textMuted, marginBottom:3 }}>
        {section.constellation.toUpperCase()}
      </div>

      <h3 className="p-cinzel" style={{ fontSize:'.88rem', fontWeight:700, color:T.textPrimary, letterSpacing:'.04em', margin:'0 0 8px' }}>
        {section.label}
      </h3>

      <p className="p-crimson" style={{ fontSize:'.82rem', color:T.textSecond, lineHeight:1.6, margin:'0 0 13px' }}>
        {section.desc.length > 82 ? section.desc.slice(0, 82) + '…' : section.desc}
      </p>

      <div style={{ fontSize:'.5rem', fontFamily:'Share Tech Mono', letterSpacing:'.14em', color:palette.accent }}>
        EXPLORE ›
      </div>

      {/* Bottom accent */}
      <div style={{ position:'absolute', bottom:0, left:18, right:18, height:1, background:`linear-gradient(90deg,transparent,${palette.accent}44,transparent)` }} />
    </div>
  )
}

// ── MAIN ──────────────────────────────────────────────────────
export default function PaimonHub({ onBack }) {
  const navigate = useNavigate()
  const [dialogueIdx,  setDialogueIdx]  = useState(0)
  const [showDialogue, setShowDialogue] = useState(true)
  const [showCards,    setShowCards]    = useState(false)
  const [activeSection,setActiveSection]= useState(null)
  const [activePalette,setActivePalette]= useState(null)
  const timer = useRef(null)

  useEffect(() => {
    if (!showDialogue) return
    timer.current = setTimeout(() => {
      if (dialogueIdx < DIALOGUE.length - 1) {
        setDialogueIdx(i => i + 1)
      } else {
        setTimeout(() => { setShowDialogue(false); setShowCards(true) }, 1900)
      }
    }, 2300)
    return () => clearTimeout(timer.current)
  }, [dialogueIdx, showDialogue])

  const skip = () => { clearTimeout(timer.current); setShowDialogue(false); setShowCards(true) }

  return (
    <>
      <style>{CSS}</style>

      {/* ── PAGE — sky-to-cream gradient ── */}
      <div style={{
        position:'fixed', inset:0, overflow:'hidden',
        background:`linear-gradient(180deg, ${T.skyTop} 0%, ${T.skyMid} 28%, #ece4d4 62%, ${T.pageBg} 100%)`,
      }}>
        <Clouds />

        {/* Subtle dot texture */}
        <div style={{
          position:'absolute', inset:0, zIndex:0, pointerEvents:'none',
          backgroundImage:`radial-gradient(circle, rgba(170,140,90,.1) 1px, transparent 1px)`,
          backgroundSize:'30px 30px',
        }} />

        {/* Top bar */}
        <div style={{
          position:'absolute', top:0, left:0, right:0,
          display:'flex', alignItems:'center', justifyContent:'space-between',
          padding:'18px 34px', zIndex:20,
          animation:'p-fadeIn .55s ease both',
        }}>
          <button className="p-back" onClick={onBack}>← BACK TO HOME</button>
          <div className="p-mono" style={{ fontSize:'.5rem', letterSpacing:'.22em', color:T.textMuted }}>
            TRAVELER'S CODEX
          </div>
        </div>

        {/* ── DIALOGUE SCENE ── */}
        {showDialogue && (
          <div style={{
            position:'absolute', inset:0, zIndex:10,
            display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center',
            padding:'80px 24px 48px', gap:0,
          }}>
            <FloatingPaimon size={250} />

            <div className="p-cinzel" style={{
              fontSize:'.58rem', letterSpacing:'.24em', color:T.rose, marginBottom:14, marginTop:4,
              animation:'p-fadeIn .4s ease both',
            }}>
              PAIMON · EMERGENCY FOOD
            </div>

            <div key={dialogueIdx} className="p-bubble"
              style={{ maxWidth:440, width:'90%', padding:'18px 22px', animation:'p-dialogIn .3s ease both' }}
            >
              <p className="p-crimson" style={{ fontSize:'1.08rem', fontStyle:'italic', color:T.textPrimary, lineHeight:1.7, margin:0 }}>
                {DIALOGUE[dialogueIdx]}
              </p>
              <div style={{ display:'flex', gap:5, marginTop:12, justifyContent:'flex-end' }}>
                {DIALOGUE.map((_,i) => (
                  <div key={i} style={{
                    width: i === dialogueIdx ? 18 : 5, height:5, borderRadius:3,
                    background: i === dialogueIdx ? T.rose : T.border,
                    transition:'all .3s',
                  }} />
                ))}
              </div>
            </div>

            <button onClick={skip}
              className="p-mono"
              style={{
                marginTop:18, padding:'7px 18px', borderRadius:50,
                border:`1px solid ${T.border}`,
                background:'rgba(255,255,255,.55)',
                color:T.textMuted, fontSize:'.5rem', letterSpacing:'.15em',
                cursor:'pointer', transition:'all .2s',
              }}
              onMouseEnter={e=>{e.currentTarget.style.background='rgba(255,255,255,.92)';e.currentTarget.style.color=T.textPrimary}}
              onMouseLeave={e=>{e.currentTarget.style.background='rgba(255,255,255,.55)';e.currentTarget.style.color=T.textMuted}}
            >
              SKIP →
            </button>
          </div>
        )}

        {/* ── HUB SCENE ── */}
        {showCards && (
          <div className="p-noscroll" style={{
            position:'absolute', inset:0, overflowY:'auto', zIndex:10,
            display:'flex', flexDirection:'column', alignItems:'center',
            padding:'90px 30px 60px',
          }}>
            {/* Header strip with small Paimon */}
            <div style={{
              display:'flex', alignItems:'center', gap:22, marginBottom:26,
              width:'100%', maxWidth:860,
              animation:'p-fadeUp .5s ease both',
            }}>
              <div style={{ flexShrink:0, animation:'p-float 4.8s ease-in-out infinite' }}>
                <FloatingPaimon size={96} />
              </div>
              <div>
                <div className="p-mono" style={{ fontSize:'.46rem', letterSpacing:'.22em', color:T.textMuted, marginBottom:3 }}>
                  PAIMON SAYS
                </div>
                <h2 className="p-cinzel" style={{
                  fontSize:'clamp(1.1rem,3.2vw,1.9rem)', fontWeight:900,
                  color:T.textPrimary, lineHeight:1.1, margin:'0 0 5px',
                }}>
                  Know the Genshin World
                </h2>
                <p className="p-crimson" style={{ fontSize:'.88rem', color:T.textSecond, fontStyle:'italic' }}>
                  Each path holds its own secrets, Traveler. Choose wisely.
                </p>
              </div>
            </div>

            {/* Divider */}
            <div style={{
              width:'100%', maxWidth:860, height:1, marginBottom:26,
              background:`linear-gradient(90deg,transparent,${T.divider},transparent)`,
              animation:'p-grow .7s ease both .38s', opacity:0,
            }} />

            {/* Cards grid */}
            <div style={{
              display:'grid',
              gridTemplateColumns:'repeat(auto-fit,minmax(248px,1fr))',
              gap:14, width:'100%', maxWidth:860,
            }}>
              {WORLD_SECTIONS.map((s,i) => (
                <WorldCard
                  key={s.id} section={s} palette={PALETTES[i]} index={i}
                  onClick={(sec,pal) => {
                    if (sec.id === 'regions') {
                      setActiveSection(null)
                      setActivePalette(null)
                      navigate('/regions')
                      return
                    }
                    if (sec.id === 'archons') {
                      setActiveSection(null)
                      setActivePalette(null)
                      navigate('/archons')
                      return
                    }
                    if (sec.id === 'elements') {
                      setActiveSection(null)
                      setActivePalette(null)
                      navigate('/elements')
                      return
                    }
                    if (sec.id === 'factions') {
                      setActiveSection(null)
                      setActivePalette(null)
                      navigate('/factions')
                      return
                    }
                    if (sec.id === 'abyss') {
                      setActiveSection(null)
                      setActivePalette(null)
                      navigate('/abyss')
                      return
                    }
                    if (sec.id === 'artifacts') {
                      setActiveSection(null)
                      setActivePalette(null)
                      navigate('/artifacts')
                      return
                    }
                    setActiveSection(sec)
                    setActivePalette(pal)
                  }}
                />
              ))}
            </div>

            <div className="p-mono" style={{
              marginTop:32, fontSize:'.43rem', letterSpacing:'.14em', color:T.textMuted,
              animation:'p-fadeIn .6s ease both 1.5s', opacity:0,
            }}>
              CLICK ANY CARD TO BEGIN YOUR JOURNEY
            </div>
          </div>
        )}

        {/* Drawer */}
        {activeSection && activeSection.id !== 'regions' && activeSection.id !== 'archons' && activeSection.id !== 'elements' && activeSection.id !== 'factions' && activeSection.id !== 'abyss' && activeSection.id !== 'artifacts' && (
          <SectionDrawer
            section={activeSection}
            palette={activePalette}
            onClose={() => { setActiveSection(null); setActivePalette(null) }}
          />
        )}
      </div>
    </>
  )
}