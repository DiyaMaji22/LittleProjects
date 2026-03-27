// ─────────────────────────────────────────────────────────────
//  RegionsPage.jsx  —  "The Seven Nations" deep-dive
//
//  Creative display: a full-bleed "World Wheel" —
//  nations are arranged in a rotating 3-D carousel ring.
//  The active nation explodes into a split-panel reveal:
//    LEFT  → rotating nation crest + elemental particles
//    RIGHT → lore scrolls in with staggered typography
//
//  Props
//  ─────
//  onBack : () => void   — return to PaimonHub
// ─────────────────────────────────────────────────────────────

import { useState, useEffect, useRef } from 'react'
import mondstadtBg from '../../assets/mondstat.jpg'
import anemoCrest from '../../assets/anemo.png'
import geoCrest from '../../assets/geo.png'
import dendroCrest from '../../assets/dendro.png'
import hydroCrest from '../../assets/hydro.png'
import pyroCrest from '../../assets/pyro.png'
import cryoCrest from '../../assets/cryo.png'
import liyueBg from '../../assets/liyue.png'
import inazumaBg from '../../assets/inazuma.jpg'
import sumeruBg from '../../assets/sumeru1.jpg'
import fontaineBg from '../../assets/fontaine.jpg'
import natlanBg from '../../assets/natlan.webp'
// ── NATION DATA ───────────────────────────────────────────────
export const NATIONS = [
  {
    id: 'mondstadt',
    name: 'Mondstadt',
    subtitle: 'City of Freedom',
    archon: 'Barbatos',
    element: 'Anemo',
    elementColor: '#4ec9b0',
    elementGlow: 'rgba(78,201,176,0.35)',
    bgImage: `url(${mondstadtBg})`,
    bgGradient: 'linear-gradient(135deg, rgba(0, 15, 25, 0.68) 0%, rgba(0, 10, 18, 0.65) 42%, rgba(0, 5, 12, 0.72) 100%)',
    accentLight: '#7ee8d4',
    accentMid: '#4ec9b0',
    accentDark: '#1a7a68',
    symbol: '🌿',
    crestImage: anemoCrest,
    crest: '❋',
    crumbs: ['Wind · Freedom · Song', 'NE of Liyue', '~2600 years old'],
    lore: [
      {
        heading: 'The Land of the Wind God',
        body: "Mondstadt is a city-state nestled among rolling green hills and ancient ruins, ruled spiritually by Barbatos — the God of Freedom who dwells in the wind itself. Unlike other nations, it has no king. The Knights of Favonius serve as its protectors while Barbatos watches from afar, unwilling to impose his will on the people he set free.",
      },
      {
        heading: 'The Liberation of Decarabian',
        body: "Two thousand six hundred years ago, the tyrant god Decarabian imprisoned Mondstadt in a vortex of storms. A young bard named Venti, who would one day become Barbatos, led a rebellion alongside a warrior named Rhinedottir. They broke the eternal storm and gave humanity freedom — at great cost. Venti still mourns those lost in that battle.",
      },
      {
        heading: 'Knights of Favonius',
        body: "The Knights of Favonius are Mondstadt's defense force, sworn to protect the nation in the absence of a ruling deity. Historically connected to the noble houses — including the infamous Lawrence Clan — the Knights now recruit based on merit. Jean, the Acting Grand Master, holds the city together with quiet, exhausting dedication.",
      },
      {
        heading: "Stormterror & the Dragon's Roost",
        body: "Dvalin, known as Stormterror, was once a close friend of Barbatos and guardian of Mondstadt. Poisoned by the Abyss Order, he turned his wrath on the city. The Traveler and the Windblume Festival helped restore his spirit — a reminder that even legends can be saved from darkness.",
      },
    ],
  },
  {
    id: 'liyue',
    name: 'Liyue',
    subtitle: 'Harbor of Stone and Gold',
    archon: 'Morax / Rex Lapis',
    element: 'Geo',
    elementColor: '#e5c97e',
    elementGlow: 'rgba(229,201,126,0.35)',
    bgImage: `url(${liyueBg})`,
    bgGradient: 'linear-gradient(135deg, rgba(35, 22, 0, 0.68) 0%, rgba(20, 12, 0, 0.65) 40%, rgba(10, 6, 0, 0.72) 100%)',
    accentLight: '#f5dfa0',
    accentMid: '#e5c97e',
    accentDark: '#8a6a10',
    symbol: '⛰',
    crestImage: geoCrest,
    crest: '◆',
    crumbs: ['Geo · Commerce · Tradition', 'SE coast of Teyvat', '6000+ years old'],
    lore: [
      {
        heading: 'The God of Contracts',
        body: "Morax — Rex Lapis — is the oldest of the Seven Archons, having fought in the Archon War six thousand years ago. He shaped Liyue Harbor literally: the towering stone pillars called the Sea of Clouds were raised by his power during ancient battles. He ruled through contracts, never imposing but always honoring agreements to the letter.",
      },
      {
        heading: 'The Rite of Descension',
        body: "Every year, Liyue Harbor holds the Rite of Descension — a sacred ceremony where Rex Lapis appears as a golden dragon to deliver the contract stones that guide the coming year's trade. For thousands of years, no one questioned it. Then came the year Rex Lapis fell from the sky, dead — and the Traveler was accused of his murder.",
      },
      {
        heading: 'The Qixing',
        body: "Liyue's government is now run by the Qixing — seven merchant lords of immense wealth and political influence. After Zhongli staged his own death and relinquished his Gnosis, the Qixing assumed full governance. Ningguang, the Tianquan, is the de facto leader: calculating, ruthless, and utterly devoted to Liyue's prosperity.",
      },
      {
        heading: 'The Adepti',
        body: "Ancient beings who made a contract with Rex Lapis to protect Liyue from demons, the Adepti are mountain spirits of immense power. Xiao, the yaksha, still roams the peaks haunted by the karma of ten thousand demons he has slain. Most have retreated from human contact — but Liyue's safety still rests on their shoulders.",
      },
    ],
  },
  {
    id: 'inazuma',
    name: 'Inazuma',
    subtitle: 'Land of Eternity',
    archon: 'Ei / Raiden Shogun',
    element: 'Electro',
    elementColor: '#b08ee0',
    elementGlow: 'rgba(176,142,224,0.35)',
    bgImage: `url(${inazumaBg})`,
    bgGradient: 'linear-gradient(135deg, rgba(15, 5, 28, 0.68) 0%, rgba(9, 3, 16, 0.65) 40%, rgba(4, 1, 8, 0.72) 100%)',
    accentLight: '#d4b8f5',
    accentMid: '#b08ee0',
    accentDark: '#5a3a90',
    symbol: '⚡',
    crest: '菊',
    crumbs: ['Electro · Eternity · Isolation', 'Island archipelago', 'Sealed for 200 years'],
    lore: [
      {
        heading: 'The Eternal Shogun',
        body: "The Electro Archon Ei chose a particular form of immortality: she entered a plane of consciousness called the Plane of Euthymia to pursue her ideal of eternity, leaving behind a puppet — the Raiden Shogun — to rule in her stead. The Shogun is not Ei; it is an automaton running on Ei's will, devoid of emotion, executing her final decree with mechanical precision.",
      },
      {
        heading: 'The Vision Hunt Decree',
        body: "Fearing that ambition and change erode eternity, Ei commanded through the Shogun that all Visions be confiscated. To keep Inazuma eternal, it would be sealed from the rest of the world and its people stripped of elemental power. The decree tore families apart, sparked rebellion, and left deep scars — ones Ei herself did not fully comprehend until she faced the Traveler.",
      },
      {
        heading: 'The Resistance',
        body: "Led by Gorou and the enigmatic Sangonomiya Kokomi — a scholar-general who quotes strategy manuals before sleeping — the Resistance fought from Watatsumi Island. Their struggle was not just military but spiritual: Watatsumi worships Orobashi, a god killed by Morax and Ei in ancient times. Old grief runs deep in Inazuma's islands.",
      },
      {
        heading: "Ei's True Nature",
        body: "Ei is defined by loss. She watched her siblings — the gods Makoto, Orobashi, and others — die during the Cataclysm and chose to preserve what remained by eliminating all that could change. Meeting the Traveler cracked her isolation. She returned to rule with greater openness, though the tension between eternity and change still shapes her every decision.",
      },
    ],
  },
  {
    id: 'sumeru',
    name: 'Sumeru',
    subtitle: 'Land of Wisdom',
    archon: 'Nahida / Lesser Lord Kusanali',
    element: 'Dendro',
    elementColor: '#76c442',
    elementGlow: 'rgba(118,196,66,0.35)',
    bgImage: `url(${sumeruBg})`,
    bgGradient: 'linear-gradient(135deg, rgba(5, 16, 0, 0.68) 0%, rgba(3, 10, 0, 0.65) 40%, rgba(1, 5, 0, 0.72) 100%)',
    accentLight: '#b0e870',
    accentMid: '#76c442',
    accentDark: '#3a7010',
    symbol: '🌿',
    crestImage: dendroCrest,
    crest: '✦',
    crumbs: ['Dendro · Knowledge · Duality', 'Rainforest & Desert', 'Seat of the Akademiya'],
    lore: [
      {
        heading: 'The Imprisoned God',
        body: "Nahida — the Dendro Archon known as Lesser Lord Kusanali — spent five hundred years imprisoned in a golden cage inside the Sanctuary of Surasthana. The Akademiya's Grand Sage Azar declared her too young and inexperienced to rule, using the dried God of Wisdom's corpse as a false deity to maintain control. Nahida could only touch the outside world through dreams.",
      },
      {
        heading: 'Irminsul, the World Tree',
        body: "At the heart of Sumeru stands Irminsul — a great cosmic tree whose roots connect to every living mind in Teyvat. It is the repository of all mortal memories and knowledge. When the Akademiya's Sages attempted to use Irminsul for their Akasha experiment, they risked unraveling the very memory of the world. Nahida's intimate connection to the tree is her greatest power.",
      },
      {
        heading: 'Desert and Rainforest',
        body: "Sumeru is split between two vastly different environments. The rainforest teems with life and the Aranara — small plant spirits who only appear to those who still hold a child's sense of wonder. The desert holds the ruins of ancient King Deshret's civilization, whose people made a Faustian bargain with forbidden knowledge. Both halves carry ancient wounds.",
      },
      {
        heading: "The Sages' Betrayal",
        body: "Grand Sage Azar manipulated Sumeru's Akasha Terminal — a divine communication network that connected citizens to accumulated knowledge — as a surveillance and control tool. He engineered a catastrophe using the remnant consciousness of the Scarlet King to seize absolute power. Nahida dismantled the plot with the Traveler's help, then dismantled the Akasha itself, freeing minds to grow unmonitored.",
      },
    ],
  },
  {
    id: 'fontaine',
    name: 'Fontaine',
    subtitle: 'Land of Justice',
    archon: 'Focalors / Furina',
    element: 'Hydro',
    elementColor: '#5ab4e8',
    elementGlow: 'rgba(90,180,232,0.35)',
    bgImage: `url(${fontaineBg})`,
    bgGradient: 'linear-gradient(135deg, rgba(0, 12, 20, 0.68) 0%, rgba(0, 8, 14, 0.65) 40%, rgba(0, 3, 7, 0.72) 100%)',
    accentLight: '#90d4f8',
    accentMid: '#5ab4e8',
    accentDark: '#1a6090',
    symbol: '💧',
    crestImage: hydroCrest,
    crest: '⚖',
    crumbs: ['Hydro · Justice · Theatre', 'Oceanic nation', '500-year-old prophecy'],
    lore: [
      {
        heading: 'The Nation Built on Law',
        body: "Fontaine is a steampunk nation of grand opera houses, automated clockwork, and an obsessive devotion to the court system. Every dispute — from theft to murder to the fate of nations — is resolved through theatrical public trials presided over by the Iudex. The nation's love of spectacle and justice are inseparable, and Furina, the Hydro Archon, performed as a god for five hundred years as her contribution to this stage.",
      },
      {
        heading: 'The Prophecy',
        body: "A prophecy declared that all of Fontaine's people — whose bodies are made partly of Hydro — would dissolve into the primordial sea when a great flood came. For centuries this hung over the nation. Furina, who held the true Hydro Gnosis while a mortal shell performed as Archon, carried the weight of this secret alone, grieving in her private room while performing divinity on stage.",
      },
      {
        heading: "Focalors's Sacrifice",
        body: "The real Hydro Archon Focalors spent five hundred years engineering her own death at the hands of the Iudex — the Oratrice Mecanique d'Analyse Cardinale — to strip herself of divine status and transfer that power to all of Fontaine's people, immunizing them against the prophecy. She succeeded. The flood came. The people survived. And Focalors ceased to exist.",
      },
      {
        heading: 'Furina After',
        body: "With Focalors gone, Furina — the mortal who played Archon — was left adrift. No longer divine, no longer needed as a performer, she had to discover who she was outside the role she had inhabited her entire life. Her arc is among the most emotionally resonant in the game: the cost of playing a god when you are very much human.",
      },
    ],
  },
  {
    id: 'natlan',
    name: 'Natlan',
    subtitle: 'Land of Battle',
    archon: 'Mavuika',
    element: 'Pyro',
    elementColor: '#f07830',
    elementGlow: 'rgba(240,120,48,0.35)',
    bgImage: `url(${natlanBg})`,
    bgGradient: 'linear-gradient(135deg, rgba(25, 5, 0, 0.68) 0%, rgba(15, 3, 0, 0.65) 40%, rgba(8, 1, 0, 0.72) 100%)',
    accentLight: '#f8b070',
    accentMid: '#f07830',
    accentDark: '#8a3010',
    symbol: '🔥',
    crestImage: pyroCrest,
   
    crumbs: ['Pyro · Battle · Sacred Flame', 'Volcanic highlands', 'Besieged by the Abyss'],
    lore: [
      {
        heading: 'Culture of the Sacred Flame',
        body: "Natlan's civilization is built around the Sacred Flame — an eternal fire believed to be the physical manifestation of the nation's fighting spirit. Its tribes do not fear battle; they celebrate it as the highest expression of the Pyro Archon's blessing. Warriors who fall in defense of Natlan are said to be absorbed into the Sacred Flame and reborn as its embers.",
      },
      {
        heading: 'The Nightsoul',
        body: "Natlan introduced a new mechanic to Teyvat's elemental system: Nightsoul Blessing. Certain warriors of Natlan can tap into a primal energy that transcends normal Vision use, transforming their bodies into living conduits of pure Pyro. This power is tied to the land itself — and to the Pyro Archon's covenant with the Sacred Beast.",
      },
      {
        heading: 'The Abyss Siege',
        body: "Unlike other nations that faced the Abyss as a distant threat, Natlan endured a full military invasion. The Abyss Order — under the direction of the Traveler's sibling — drove Natlan's tribes from their ancestral lands and extinguished sacred sites. The entire nation mobilized for total war, with the Pyro Archon Mavuika leading from the frontlines rather than from a throne.",
      },
      {
        heading: 'Mavuika — The Warrior Archon',
        body: "Where other Archons govern through law, contract, or art, Mavuika rules through shared sacrifice. She is not above her people — she is among them, bleeding and burning beside warriors half her divine age. Her relationship with the Traveler is forged in the fire of genuine combat, creating one of the most direct Archon connections in the game.",
      },
    ],
  },
  {
    id: 'snezhnaya',
    name: 'Snezhnaya',
    subtitle: 'The Frozen Kingdom',
    archon: 'Tsaritsa',
    element: 'Cryo',
    elementColor: '#a8d8f0',
    elementGlow: 'rgba(168,216,240,0.35)',
    bgImage: null,
    bgGradient: 'linear-gradient(135deg, #001020 0%, #00080f 40%, #00030a 100%)',
    accentLight: '#d4eef8',
    accentMid: '#a8d8f0',
    accentDark: '#3080b0',
    symbol: '❄',
    crestImage: cryoCrest,
    crest: '✦',
    crumbs: ['Cryo · Ambition · Shadow', 'Far north of Teyvat', 'Not yet playable'],
    lore: [
      {
        heading: "The Tsaritsa's Revolution",
        body: "The Cryo Archon — the Tsaritsa — is the most feared ruler in Teyvat, commanding the Fatui's vast military-industrial empire. But her goal is not dominion for its own sake. She has been collecting the Gnoses of the other Archons with the stated purpose of waging war on Celestia itself — to tear down the divine order that she believes has kept Teyvat enslaved to a predetermined fate.",
      },
      {
        heading: 'The Eleven Harbingers',
        body: "The Fatui Harbingers are the Tsaritsa's eleven most powerful agents. Each holds a title: Pierro the Jester commands them all, followed by Columbina, Dottore, Arlecchino, Scaramouche (now Wanderer), Signora (deceased), Pantalone, Sandrone, Capitano, Il Dottore's clones, and Childe. Each is a walking catastrophe with political and military reach that spans nations.",
      },
      {
        heading: 'A God Without Love',
        body: "Zhongli describes the Tsaritsa as a god who once overflowed with love for humanity — and then had that love taken from her by Celestia. What she pursues now is not revenge from hatred but a calculated plan to free Teyvat from the script written for it. She has given the Fatui her own divine power to strengthen them, an act that has cost her dearly.",
      },
      {
        heading: 'The Land of Ice',
        body: "Snezhnaya remains the only major nation not yet available to explore in-game. What is known: it is a vast frozen empire, technologically advanced beyond most nations through Fatui-funded research, and deeply stratified between the privileged who live in heated cities and the cold masses outside them. Its culture is tied to performance, masks, and the Commedia dell'arte tradition the Harbingers embody.",
      },
    ],
  },
]

// ── DESIGN TOKENS ─────────────────────────────────────────────
const T = {
  pageBg:      '#060810',
  textPrimary: '#f0ece0',
  textSecond:  '#b8b0a0',
  textMuted:   '#706860',
  border:      'rgba(255,255,255,0.08)',
  borderHover: 'rgba(255,255,255,0.22)',
  gold:        '#c8a84a',
  goldGlow:    'rgba(200,168,74,0.2)',
}

// ── GLOBAL CSS ────────────────────────────────────────────────
const CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;600;700;900&family=Crimson+Pro:ital,wght@0,300;0,400;0,600;1,300;1,400&family=Share+Tech+Mono&display=swap');
  *, *::before, *::after { box-sizing:border-box; margin:0; padding:0; }

  @keyframes rp-fadeUp    { from{opacity:0;transform:translateY(20px)} to{opacity:1;transform:translateY(0)} }
  @keyframes rp-fadeIn    { from{opacity:0} to{opacity:1} }
  @keyframes rp-fadeLeft  { from{opacity:0;transform:translateX(-28px)} to{opacity:1;transform:translateX(0)} }
  @keyframes rp-fadeRight { from{opacity:0;transform:translateX(28px)} to{opacity:1;transform:translateX(0)} }
  @keyframes rp-scaleIn   { from{opacity:0;transform:scale(.85)} to{opacity:1;transform:scale(1)} }
  @keyframes rp-spin      { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
  @keyframes rp-spinRev   { from{transform:rotate(0deg)} to{transform:rotate(-360deg)} }
  @keyframes rp-pulse     { 0%,100%{opacity:.5;transform:scale(1)} 50%{opacity:1;transform:scale(1.06)} }
  @keyframes rp-particle  { 0%{opacity:0;transform:translate(0,0) scale(0)} 20%{opacity:1} 100%{opacity:0;transform:translate(var(--px),var(--py)) scale(.3)} }
  @keyframes rp-shimmer   { from{left:-80%} to{left:140%} }
  @keyframes rp-blink     { 0%,100%{opacity:1} 50%{opacity:.3} }
  @keyframes rp-glow-ring { 0%,100%{opacity:.4;transform:scale(1)} 50%{opacity:.8;transform:scale(1.04)} }
  @keyframes rp-float-dot { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-6px)} }

  .rp-cinzel  { font-family:'Cinzel',serif; }
  .rp-crimson { font-family:'Crimson Pro',serif; }
  .rp-mono    { font-family:'Share Tech Mono',monospace; }

  .rp-noscroll::-webkit-scrollbar{display:none}
  .rp-noscroll{-ms-overflow-style:none;scrollbar-width:none}

  /* ── Thumb pill nav ── */
  .rp-thumb {
    position:relative; overflow:hidden;
    padding:10px 14px; border-radius:12px;
    border:1px solid rgba(255,255,255,.06);
    background:rgba(255,255,255,.03);
    cursor:pointer; transition:all .25s;
    text-align:left;
  }
  .rp-thumb:hover { background:rgba(255,255,255,.07); border-color:rgba(255,255,255,.14); }
  .rp-thumb.active { border-color:var(--na); background:var(--nb); }
  .rp-thumb.active::before {
    content:''; position:absolute; left:0; top:4px; bottom:4px;
    width:3px; border-radius:0 2px 2px 0; background:var(--na);
  }

  /* ── Lore card ── */
  .rp-lore {
    padding:20px 22px; border-radius:14px;
    border:1px solid rgba(255,255,255,.07);
    background:rgba(255,255,255,.03);
    transition:border-color .2s, background .2s;
  }
  .rp-lore:hover { border-color:var(--na-border); background:rgba(255,255,255,.05); }

  /* ── Back btn ── */
  .rp-back {
    display:flex; align-items:center; gap:7px;
    padding:8px 18px; border-radius:50px;
    border:1px solid rgba(255,255,255,.12);
    background:rgba(255,255,255,.04);
    font-family:'Share Tech Mono',monospace;
    font-size:.5rem; letter-spacing:.18em; color:${T.textMuted};
    cursor:pointer; transition:all .2s;
  }
  .rp-back:hover { background:rgba(255,255,255,.09); color:${T.textPrimary}; border-color:rgba(255,255,255,.24); }

  /* ── Progress bar ── */
  .rp-progress { height:2px; border-radius:1px; background:rgba(255,255,255,.08); overflow:hidden; }
  .rp-progress-fill { height:100%; border-radius:1px; transition:width .4s ease; }
`

// ── PARTICLES ─────────────────────────────────────────────────
function Particles({ color, count = 12 }) {
  const particles = Array.from({ length: count }, (_, i) => {
    const angle = (i / count) * 360
    const dist = 60 + Math.random() * 90
    const px = `${Math.cos((angle * Math.PI) / 180) * dist}px`
    const py = `${Math.sin((angle * Math.PI) / 180) * dist}px`
    const delay = `${Math.random() * 3}s`
    const dur = `${2.5 + Math.random() * 2}s`
    return { px, py, delay, dur, size: 2 + Math.random() * 3 }
  })

  return (
    <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 0 }}>
      {particles.map((p, i) => (
        <div
          key={i}
          style={{
            position: 'absolute',
            top: '50%', left: '50%',
            width: p.size, height: p.size,
            borderRadius: '50%',
            background: color,
            '--px': p.px, '--py': p.py,
            animation: `rp-particle ${p.dur} ease-in-out infinite ${p.delay}`,
          }}
        />
      ))}
    </div>
  )
}

// ── CREST DISPLAY ─────────────────────────────────────────────
function NationCrest({ nation, size = 220 }) {
  return (
    <div style={{
      position: 'relative',
      width: size, height: size,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
    }}>
      {/* Particles */}
      <Particles color={nation.elementColor} count={16} />

      {/* Outer spinning ring */}
      <div style={{
        position: 'absolute',
        width: size, height: size, borderRadius: '50%',
        border: `1px solid ${nation.elementColor}44`,
        borderTopColor: nation.elementColor,
        animation: 'rp-spin 8s linear infinite',
      }} />

      {/* Mid ring counter-spin */}
      <div style={{
        position: 'absolute',
        width: size * 0.75, height: size * 0.75, borderRadius: '50%',
        border: `1px dashed ${nation.elementColor}66`,
        animation: 'rp-spinRev 5s linear infinite',
      }} />

      {/* Glow ring */}
      <div style={{
        position: 'absolute',
        width: size * 0.6, height: size * 0.6, borderRadius: '50%',
        background: `radial-gradient(circle, ${nation.elementGlow} 0%, transparent 70%)`,
        animation: 'rp-glow-ring 3s ease-in-out infinite',
      }} />

      {/* Crest symbol */}
      <div style={{
        position: 'relative', zIndex: 2,
        fontSize: size * 0.28,
        color: nation.accentLight,
        textShadow: `0 0 30px ${nation.elementColor}, 0 0 60px ${nation.elementColor}88`,
        animation: 'rp-pulse 3s ease-in-out infinite',
        lineHeight: 1,
        width: size * 0.32,
        height: size * 0.32,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
        {nation.crestImage ? (
          <img
            src={nation.crestImage}
            alt={`${nation.name} crest`}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'contain',
              filter: `drop-shadow(0 0 16px ${nation.elementColor}) drop-shadow(0 0 28px ${nation.elementColor}88)`,
            }}
          />
        ) : (
          nation.crest
        )}
      </div>

    </div>
  )
}

// ── NATION THUMB ──────────────────────────────────────────────
function NationThumb({ nation, isActive, onClick }) {
  return (
    <button
      className={`rp-thumb ${isActive ? 'active' : ''}`}
      onClick={onClick}
      style={{
        '--na': nation.accentMid,
        '--nb': `${nation.accentMid}18`,
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <span style={{ fontSize: '1rem', lineHeight: 1, flexShrink: 0 }}>{nation.symbol}</span>
        <div>
          <div className="rp-cinzel" style={{
            fontSize: '.6rem', fontWeight: 700, letterSpacing: '.04em',
            color: isActive ? nation.accentMid : T.textSecond,
            transition: 'color .25s',
          }}>
            {nation.name}
          </div>
          <div className="rp-mono" style={{ fontSize: '.42rem', letterSpacing: '.1em', color: T.textMuted, marginTop: 2 }}>
            {nation.element.toUpperCase()}
          </div>
        </div>
      </div>
    </button>
  )
}

// ── LORE PANEL ────────────────────────────────────────────────
function LorePanel({ nation, key: _k }) {
  return (
    <div
      key={nation.id}
      className="rp-noscroll"
      style={{
        flex: 1, overflowY: 'auto',
        display: 'flex', flexDirection: 'column', gap: 14,
        animation: 'rp-fadeRight .38s ease both',
      }}
    >
      {nation.lore.map((entry, i) => (
        <div
          key={i}
          className="rp-lore"
          style={{
            '--na-border': `${nation.accentMid}40`,
            animation: `rp-fadeUp .4s ease both ${i * .08}s`,
            opacity: 0,
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 9 }}>
            <div style={{
              width: 3, height: '1.2rem', borderRadius: 2,
              background: `linear-gradient(180deg, ${nation.accentMid}, ${nation.accentDark})`,
              flexShrink: 0,
            }} />
            <h3 className="rp-cinzel" style={{
              fontSize: '.68rem', fontWeight: 700, letterSpacing: '.05em',
              color: nation.accentLight, margin: 0,
              textShadow: '0 0 10px rgba(0,0,0,0.6), 1px 1px 3px rgba(0,0,0,0.7)',
            }}>
              {entry.heading}
            </h3>
          </div>
          <p className="rp-crimson" style={{
            fontSize: '.92rem', color: T.textSecond, lineHeight: 1.78, margin: 0,
            textShadow: '0 0 8px rgba(0,0,0,0.5), 1px 1px 2px rgba(0,0,0,0.6)',
          }}>
            {entry.body}
          </p>
        </div>
      ))}
    </div>
  )
}

// ── MAIN STAGE ────────────────────────────────────────────────
function NationStage({ nation, onPrev, onNext, total, index }) {
  return (
    <div style={{
      flex: 1,
      display: 'flex', flexDirection: 'column',
      overflow: 'hidden',
      position: 'relative',
    }}>
      {/* Bg image + dark overlay */}
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: nation.bgImage,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundAttachment: 'fixed',
        zIndex: 0,
      }} />
      {/* Dark shadow overlay for text readability */}
      <div style={{
        position: 'absolute', inset: 0,
        background: nation.bgGradient,
        transition: 'background 0.6s ease',
        zIndex: 1,
      }} />

      {/* Content */}
      <div style={{
        position: 'relative', zIndex: 2,
        flex: 1, display: 'flex', flexDirection: 'column',
        padding: '28px 32px 24px',
        overflow: 'hidden',
      }}>
        {/* Nation header */}
        <div style={{ marginBottom: 24, animation: 'rp-fadeLeft .4s ease both' }}>
          <div className="rp-mono" style={{
            fontSize: '.44rem', letterSpacing: '.24em',
            color: nation.accentMid, marginBottom: 6,
            textShadow: '0 0 10px rgba(0,0,0,0.6), 1px 1px 2px rgba(0,0,0,0.7)',
          }}>
            {nation.element.toUpperCase()} · {nation.archon.toUpperCase()}
          </div>
          <h2 className="rp-cinzel" style={{
            fontSize: 'clamp(1.6rem, 4vw, 2.6rem)', fontWeight: 900,
            color: T.textPrimary, lineHeight: 1,
            textShadow: `0 0 60px ${nation.elementGlow}, 0 0 30px rgba(0,0,0,0.8), 2px 2px 8px rgba(0,0,0,0.9)`,
            margin: '0 0 4px',
          }}>
            {nation.name}
          </h2>
          <div className="rp-crimson" style={{
            fontSize: '1rem', fontStyle: 'italic',
            color: nation.accentMid,
            textShadow: '0 0 20px rgba(0,0,0,0.7), 1px 1px 4px rgba(0,0,0,0.8)',
          }}>
            {nation.subtitle}
          </div>

          {/* Crumbs */}
          <div style={{ display: 'flex', gap: 12, marginTop: 10, flexWrap: 'wrap' }}>
            {nation.crumbs.map((c, i) => (
              <div key={i} className="rp-mono" style={{
                fontSize: '.42rem', letterSpacing: '.12em',
                color: T.textMuted, display: 'flex', alignItems: 'center', gap: 5,
                textShadow: '0 0 6px rgba(0,0,0,0.5)',
              }}>
                <span style={{ color: nation.accentDark }}>▸</span> {c}
              </div>
            ))}
          </div>
        </div>

        {/* Divider */}
        <div style={{
          height: 1, marginBottom: 24,
          background: `linear-gradient(90deg, ${nation.accentMid}66, transparent)`,
        }} />

        {/* Split: crest + lore */}
        <div style={{ flex: 1, display: 'flex', gap: 32, overflow: 'hidden', minHeight: 0 }}>
          {/* LEFT: crest */}
          <div style={{
            flexShrink: 0, width: 230,
            display: 'flex', flexDirection: 'column',
            alignItems: 'center', justifyContent: 'flex-start', gap: 20,
          }}>
            <div style={{ animation: 'rp-scaleIn .5s ease both .1s', opacity: 0 }}>
              <NationCrest nation={nation} size={200} />
            </div>

            {/* Nav buttons */}
            <div style={{ display: 'flex', gap: 10, animation: 'rp-fadeUp .4s ease both .3s', opacity: 0 }}>
              <button
                onClick={onPrev}
                style={{
                  width: 40, height: 40, borderRadius: '50%',
                  border: `1px solid ${nation.accentMid}55`,
                  background: `${nation.accentMid}18`,
                  color: nation.accentLight,
                  fontFamily: 'Share Tech Mono', fontSize: '.75rem',
                  cursor: 'pointer', transition: 'all .2s',
                }}
                onMouseEnter={e => { e.currentTarget.style.background = `${nation.accentMid}35` }}
                onMouseLeave={e => { e.currentTarget.style.background = `${nation.accentMid}18` }}
              >
                ‹
              </button>
              <button
                onClick={onNext}
                style={{
                  width: 40, height: 40, borderRadius: '50%',
                  border: `1px solid ${nation.accentMid}55`,
                  background: `${nation.accentMid}18`,
                  color: nation.accentLight,
                  fontFamily: 'Share Tech Mono', fontSize: '.75rem',
                  cursor: 'pointer', transition: 'all .2s',
                }}
                onMouseEnter={e => { e.currentTarget.style.background = `${nation.accentMid}35` }}
                onMouseLeave={e => { e.currentTarget.style.background = `${nation.accentMid}18` }}
              >
                ›
              </button>
            </div>

            {/* Dot indicators */}
            <div style={{ display: 'flex', gap: 5 }}>
              {Array.from({ length: total }, (_, i) => (
                <div key={i} style={{
                  width: i === index ? 18 : 5, height: 5, borderRadius: 3,
                  background: i === index ? nation.accentMid : 'rgba(255,255,255,.12)',
                  transition: 'all .3s',
                }} />
              ))}
            </div>

            {/* Progress bar */}
            <div className="rp-mono" style={{
              fontSize: '.4rem', letterSpacing: '.15em', color: T.textMuted, textAlign: 'center',
            }}>
              {String(index + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
            </div>
          </div>

          {/* RIGHT: lore */}
          <LorePanel key={nation.id} nation={nation} />
        </div>
      </div>
    </div>
  )
}

// ── ROOT ──────────────────────────────────────────────────────
export default function RegionsPage({ onBack }) {
  const [current, setCurrent] = useState(0)
  const total = NATIONS.length
  const nation = NATIONS[current]

  const prev = () => setCurrent(i => (i - 1 + total) % total)
  const next = () => setCurrent(i => (i + 1) % total)

  // Keyboard navigation
  useEffect(() => {
    const handler = (e) => {
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') next()
      if (e.key === 'ArrowLeft'  || e.key === 'ArrowUp')   prev()
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [])

  return (
    <>
      <style>{CSS}</style>
      <div style={{
        position: 'fixed', inset: 0,
        background: T.pageBg,
        display: 'flex', flexDirection: 'column',
        overflow: 'hidden', fontFamily: 'sans-serif',
      }}>
        {/* ── TOP BAR ── */}
        <div style={{
          flexShrink: 0,
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '14px 28px',
          borderBottom: `1px solid ${T.border}`,
          background: 'rgba(0,0,0,.25)',
          backdropFilter: 'blur(12px)',
          zIndex: 20,
          animation: 'rp-fadeIn .4s ease both',
        }}>
          <button className="rp-back" onClick={onBack}>← WORLD HUB</button>

          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div className="rp-mono" style={{ fontSize: '.46rem', letterSpacing: '.22em', color: T.textMuted }}>
              THE SEVEN NATIONS
            </div>
            <div style={{
              width: 6, height: 6, borderRadius: '50%',
              background: nation.accentMid,
              animation: 'rp-blink 1.4s ease-in-out infinite',
              boxShadow: `0 0 8px ${nation.accentMid}`,
            }} />
          </div>

          <div className="rp-mono" style={{ fontSize: '.44rem', letterSpacing: '.16em', color: T.textMuted }}>
            ← → NAVIGATE
          </div>
        </div>

        {/* ── BODY ── */}
        <div style={{ flex: 1, display: 'flex', overflow: 'hidden', minHeight: 0 }}>
          {/* LEFT SIDEBAR — nation thumbnails */}
          <div style={{
            flexShrink: 0, width: 178,
            borderRight: `1px solid ${T.border}`,
            background: 'rgba(0,0,0,.3)',
            display: 'flex', flexDirection: 'column',
            padding: '16px 10px',
            gap: 6, overflowY: 'auto',
            animation: 'rp-fadeLeft .45s ease both .1s', opacity: 0,
          }}>
            <div className="rp-mono" style={{
              fontSize: '.38rem', letterSpacing: '.2em', color: T.textMuted,
              padding: '0 6px', marginBottom: 6,
            }}>
              NATIONS
            </div>
            {NATIONS.map((n, i) => (
              <NationThumb
                key={n.id}
                nation={n}
                isActive={i === current}
                onClick={() => setCurrent(i)}
              />
            ))}
          </div>

          {/* MAIN STAGE */}
          <NationStage
            key={nation.id}
            nation={nation}
            onPrev={prev}
            onNext={next}
            total={total}
            index={current}
          />
        </div>
      </div>
    </>
  )
}