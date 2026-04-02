// ─────────────────────────────────────────────────────────────
//  Artifacts.jsx  —  "Artifacts" codex page with set showcase
//
//  Display Genshin artifact sets with 2-piece and 4-piece bonuses.
//  Card grid with hover effects, rarity colors, detailed info.
//
//  Props
//  ─────
//  onBack : () => void   (optional)
// ─────────────────────────────────────────────────────────────

import { useState } from 'react'
import thunderingFuryImg from '../assets/thundering_fury.webp'
import blizzardStrayerImg from '../assets/blizzard_strayer-min.png'
import heartOfDepthImg from '../assets/flower_of_life_icon.webp'
import noblesseObligeImg from '../assets/noblesse_oblidge.png'
import viridescentVenererImg from '../assets/viridescent_venerer.webp'
import archaicPetraImg from '../assets/archaic_petra.png'
import maidenBelovedImg from '../assets/maiden_beloved.png'
import wanderersTroupeImg from '../assets/wanderer_troupe.webp'
import tenacityMillelithImg from '../assets/tenecity.webp'
import gildedDreamsImg from '../assets/glided_dreams.webp'
import echoesEternityImg from '../assets/echoes.webp'
import crimsonWitchImg from '../assets/crimson.png'
// ── ARTIFACT SETS DATA ─────────────────────────────────────────
const ARTIFACT_SETS = [
  {
    id: 'crimson-witch',
    name: 'Crimson Witch of Flames',
    rarity: 5,
    element: 'Pyro',
    icon: '🔥',
    color: '#ff6b6b',
    rgbColor: '255,107,107',
    image: crimsonWitchImg,
    description: 'Two-piece provides a fifteen percent Pyro damage bonus. Four-piece boosts Overloaded, Burning, Burgeon by forty percent, Vaporize, Melt by fifteen percent, and Skills increase the two-piece bonus by fifty percent.',
    bonus2pc: 'Grants fifteen percent Pyro damage bonus.',
    bonus4pc: 'Boosts reaction damage by forty percent while Elemental Skill usage improves the two-piece artifact set effect.',
    domain: 'Hidden Palace of Zhou Formula',
    location: 'Wuwang Hill / Liyue',
    idealFor: 'Hu Tao, Diluc, Klee, Xiangling',
    pieces: ['Flower of Life', 'Plume of Death', 'Sands of Eon', 'Goblet of Eonothem', 'Circlet of Logos'],
  },
  {
    id: 'thundering-fury',
    name: 'Thundering Fury',
    rarity: 5,
    element: 'Electro',
    icon: '⚡',
    color: '#6b5fff',
    rgbColor: '107,95,255',
    image: thunderingFuryImg,
    description: 'Two-piece provides a fifteen percent Electro damage bonus. Four-piece boosts Overloaded, Electro-Charged, Superconduct, Hyperbloom by forty percent, Aggravate by twenty percent, and reaction triggers reduce Skill cooldown by one second.',
    bonus2pc: 'Grants fifteen percent Electro damage bonus.',
    bonus4pc: 'Boosts reaction damage by forty percent while triggering reactions reduces the character Elemental Skill cooldown period.',
    domain: 'Midsummer Courtyard',
    location: 'Starfell Valley / Mondstadt',
    idealFor: 'Cyno, Keqing, Fischl, Yae Miko',
    pieces: ['Flower of Life', 'Plume of Death', 'Sands of Eon', 'Goblet of Eonothem', 'Circlet of Logos'],
  },
  {
    id: 'blizzard-strayer',
    name: 'Blizzard Strayer',
    rarity: 5,
    element: 'Cryo',
    icon: '❄️',
    color: '#5bc0de',
    rgbColor: '91,192,222',
    image: blizzardStrayerImg,
    description: 'Two-piece provides a fifteen percent Cryo damage bonus. Four-piece increases Critical Rate by twenty percent against Cryo-affected enemies, and provides an additional twenty percent Critical Rate against fully Frozen enemies.',
    bonus2pc: 'Grants fifteen percent Cryo damage bonus.',
    bonus4pc: 'Increases Critical Rate against Cryo-affected opponents plus additional Critical Rate when attacking those fully Frozen enemies.',
    domain: 'Peak of Vindagnyr',
    location: 'Dragonspine / Mondstadt',
    idealFor: 'Ayaka, Ganyu, Wriothesley, Shenhe',
    pieces: ['Flower of Life', 'Plume of Death', 'Sands of Eon', 'Goblet of Eonothem', 'Circlet of Logos'],
  },
  {
    id: 'heart-of-depth',
    name: 'Heart of Depth',
    rarity: 5,
    element: 'Hydro',
    icon: '💧',
    color: '#3498db',
    rgbColor: '52,152,219',
    image: heartOfDepthImg,
    description: 'Two-piece provides a fifteen percent Hydro damage bonus. Four-piece activates after utilizing an Elemental Skill, increasing your Normal Attack and Charged Attack damage output by thirty percent for fifteen seconds.',
    bonus2pc: 'Grants fifteen percent Hydro damage bonus.',
    bonus4pc: 'Using an Elemental Skill increases Normal and Charged Attack damage by thirty percent for fifteen seconds.',
    domain: 'Peak of Vindagnyr',
    location: 'Dragonspine / Mondstadt',
    idealFor: 'Tartaglia, Ayato, Neuvillette',
    pieces: ['Flower of Life', 'Plume of Death', 'Sands of Eon', 'Goblet of Eonothem', 'Circlet of Logos'],
  },
  {
    id: 'noblesse-oblige',
    name: 'Noblesse Oblige',
    rarity: 5,
    element: 'Utility',
    icon: '👑',
    color: '#d4af37',
    rgbColor: '212,175,55',
    image: noblesseObligeImg,
    description: 'Two-piece provides a twenty percent Elemental Burst damage bonus. Four-piece activates upon using an Elemental Burst, increasing the Attack stat of all party members by twenty percent for twelve seconds.',
    bonus2pc: 'Increases Elemental Burst damage twenty percent.',
    bonus4pc: 'Using Elemental Bursts increases the Attack stat of all party members by twenty percent twelve seconds.',
    domain: 'Clear Pool and Mountain Cavern',
    location: 'Minlin / Liyue',
    idealFor: 'Bennett, Xingqiu, Diona, Support Characters',
    pieces: ['Flower of Life', 'Plume of Death', 'Sands of Eon', 'Goblet of Eonothem', 'Circlet of Logos'],
  },
  {
    id: 'viridescent-venerer',
    name: 'Viridescent Venerer',
    rarity: 5,
    element: 'Anemo',
    icon: '🌪️',
    color: '#52c99f',
    rgbColor: '82,201,159',
    image: viridescentVenererImg,
    description: 'Two-piece provides a fifteen percent Anemo damage bonus. Four-piece increases Swirl damage by sixty percent, and decreases opponent Elemental Resistance to the element infused within Swirl by forty percent.',
    bonus2pc: 'Grants fifteen percent Anemo damage bonus.',
    bonus4pc: 'Increases Swirl damage sixty percent while decreasing enemy Elemental Resistance to the element infused into Swirl.',
    domain: 'Valley of Remembrance',
    location: 'Windwail Highland / Mondstadt',
    idealFor: 'Kazuha, Venti, Sucrose, Jean',
    pieces: ['Flower of Life', 'Plume of Death', 'Sands of Eon', 'Goblet of Eonothem', 'Circlet of Logos'],
  },
  {
    id: 'archaic-petra',
    name: 'Archaic Petra',
    rarity: 5,
    element: 'Geo',
    icon: '◆',
    color: '#e8b96a',
    rgbColor: '232,185,106',
    image: archaicPetraImg,
    description: 'Two-piece provides a fifteen percent Geo damage bonus. Four-piece activates upon collecting a Crystallize shard, providing all party members a thirty-five percent damage bonus for that specific infused elemental type.',
    bonus2pc: 'Grants fifteen percent Geo damage bonus.',
    bonus4pc: 'Obtaining Crystallize shards grants all party members thirty-five percent damage bonus for that specific elemental type.',
    domain: 'Domain of Guyun',
    location: 'Sea of Clouds / Liyue',
    idealFor: 'Zhongli, Albedo, Ningguang, Navia',
    pieces: ['Flower of Life', 'Plume of Death', 'Sands of Eon', 'Goblet of Eonothem', 'Circlet of Logos'],
  },
  {
    id: 'maiden-beloved',
    name: 'Maiden Beloved',
    rarity: 5,
    element: 'Healing',
    icon: '💚',
    color: '#f06292',
    rgbColor: '240,98,146',
    image: maidenBelovedImg,
    description: 'Two-piece provides a fifteen percent Character Healing Effectiveness bonus. Four-piece activates upon casting an Elemental Skill or Burst, increasing healing received by all party members by twenty percent temporarily.',
    bonus2pc: 'Increases character Healing Effectiveness fifteen percent.',
    bonus4pc: 'Using Elemental Skills or Bursts increases healing received by all party members for ten seconds.',
    domain: 'Valley of Remembrance',
    location: 'Windwail Highland / Mondstadt',
    idealFor: 'Barbara, Qiqi, Diona',
    pieces: ['Flower of Life', 'Plume of Death', 'Sands of Eon', 'Goblet of Eonothem', 'Circlet of Logos'],
  },
  {
    id: 'wanderers-troupe',
    name: 'Wanderer\'s Troupe',
    rarity: 5,
    element: 'Utility',
    icon: '🎭',
    color: '#c19a6b',
    rgbColor: '193,154,107',
    image: wanderersTroupeImg,
    description: 'Two-piece provides an eighty point Elemental Mastery stat bonus. Four-piece activates when the equipped character utilizes a Catalyst or Bow, increasing their Charged Attack damage output by exactly thirty-five percent.',
    bonus2pc: 'Increases Elemental Mastery by eighty points.',
    bonus4pc: 'Increases Charged Attack damage by thirty-five percent if characters utilize either Catalyst or Bow weaponry.',
    domain: 'World Bosses / Reliquaries',
    location: 'Teyvat',
    idealFor: 'Ganyu, Tighnari, Yanfei',
    pieces: ['Flower of Life', 'Plume of Death', 'Sands of Eon', 'Goblet of Eonothem', 'Circlet of Logos'],
  },
  {
    id: 'tenacity-millelith',
    name: 'Tenacity of the Millelith',
    rarity: 5,
    element: 'Support',
    icon: '🛡️',
    color: '#ffc107',
    rgbColor: '255,193,7',
    image: tenacityMillelithImg,
    description: 'Two-piece provides a twenty percent maximum Health stat bonus. Four-piece activates when Elemental Skills hit opponents, increasing party Attack by twenty percent and Shield Strength by thirty percent momentarily.',
    bonus2pc: 'Increases maximum Health by twenty percent.',
    bonus4pc: 'Elemental Skill hits increase party Attack by twenty percent and Shield Strength by thirty percent momentarily.',
    domain: 'Ridge Watch',
    location: 'Bishui Plain / Liyue',
    idealFor: 'Zhongli, Layla, Kokomi, Faruzan',
    pieces: ['Flower of Life', 'Plume of Death', 'Sands of Eon', 'Goblet of Eonothem', 'Circlet of Logos'],
  },
  {
    id: 'gilded-dreams',
    name: 'Gilded Dreams',
    rarity: 5,
    element: 'EM-Focused',
    icon: '✨',
    color: '#ffd700',
    rgbColor: '255,215,0',
    image: gildedDreamsImg,
    description: 'Two-piece provides an eighty point Elemental Mastery stat bonus. Four-piece activates upon triggering reactions, granting Attack bonuses for matching party elements and Elemental Mastery bonuses for differing party elemental types.',
    bonus2pc: 'Increases Elemental Mastery by eighty points.',
    bonus4pc: 'Triggering reactions provides Attack bonuses for matching elements and Elemental Mastery for different elemental types.',
    domain: 'Spire of Solitary Enlightenment',
    location: 'Avidya Forest / Sumeru',
    idealFor: 'Alhaitham, Nahida, Cyno, Yae Miko',
    pieces: ['Flower of Life', 'Plume of Death', 'Sands of Eon', 'Goblet of Eonothem', 'Circlet of Logos'],
  },
  {
    id: 'echoes-eternity',
    name: 'Echoes of an Offering',
    rarity: 5,
    element: 'ATK-Focused',
    icon: '🎵',
    color: '#ff69b4',
    rgbColor: '255,105,180',
    image: echoesEternityImg,
    description: 'Two-piece provides an eighteen percent overall Attack stat bonus. Four-piece offers a random chance upon hitting enemies with Normal Attacks to drastically increase your Normal Attack damage by seventy percent.',
    bonus2pc: 'Increases total Attack by eighteen percent.',
    bonus4pc: 'Normal Attacks have a chance to increase damage by seventy percent of the Attack stat.',
    domain: 'The Lost Valley',
    location: 'The Chasm / Liyue',
    idealFor: 'Ayato, Yoimiya, Wanderer',
    pieces: ['Flower of Life', 'Plume of Death', 'Sands of Eon', 'Goblet of Eonothem', 'Circlet of Logos'],
  },
];

const CSS = `*, *::before, *::after { box-sizing:border-box; margin:0; padding:0; }

  /* ── Keyframes ── */
  @keyframes art-fadeUp   { from{opacity:0;transform:translateY(24px)} to{opacity:1;transform:translateY(0)} }
  @keyframes art-fadeIn   { from{opacity:0} to{opacity:1} }
  @keyframes art-shimmer  { from{left:-100%;opacity:0} 10%{opacity:1} 90%{opacity:1} to{left:100%;opacity:0} }
  @keyframes art-scaleIn  { from{opacity:0;transform:scale(.88)} to{opacity:1;transform:scale(1)} }
  @keyframes art-float    { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-8px)} }
  @keyframes art-glow     { 0%,100%{box-shadow:0 0 12px rgba(255,255,255,.1)} 50%{box-shadow:0 0 24px rgba(255,255,255,.25)} }
  @keyframes art-slideR   { from{opacity:0;transform:translateX(40px)} to{opacity:1;transform:translateX(0)} }
  @keyframes art-borderGlow { 0%{border-color:currentColor;opacity:.3} 50%{opacity:1} 100%{border-color:currentColor;opacity:.3} }

  /* ── Fonts ── */
  .art-cinzel  { font-family:'Cinzel',serif; }
  .art-crimson { font-family:'Crimson Pro',serif; }
  .art-mono    { font-family:'Share Tech Mono',monospace; }

  /* ── Scrollbar ── */
  .art-scroll { scrollbar-width:thin; }
  .art-scroll::-webkit-scrollbar { width:3px; }
  .art-scroll::-webkit-scrollbar-track { background:transparent; }
  .art-scroll::-webkit-scrollbar-thumb { background:rgba(255,255,255,.15); border-radius:2px; }
  .art-scroll::-webkit-scrollbar-thumb:hover { background:rgba(255,255,255,.3); }

  /* ── Top bar ── */
  .art-back {
    display:inline-flex; align-items:center; gap:7px;
    padding:10px 20px; border-radius:50px;
    font-family:'Cinzel',serif; font-size:.5rem; font-weight:700; letter-spacing:.16em;
    cursor:pointer; transition:all .22s; border:none;
  }
`

// ── ARTIFACT CARD ─────────────────────────────────────────────
function ArtifactCard({ artifact, index }) {
  const [isHovered, setIsHovered] = useState(false)

  const rarityStars = Array(artifact.rarity).fill('★').join('')
  const border = `rgba(${artifact.rgbColor},0.2)`
  const borderHov = `rgba(${artifact.rgbColor},0.8)`
  const bg = `rgba(${artifact.rgbColor},0.04)`
  const bgHov = `rgba(${artifact.rgbColor},0.1)`

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        background: isHovered ? bgHov : bg,
        border: `2px solid ${isHovered ? borderHov : border}`,
        padding: '20px',
        cursor: 'pointer',
        borderRadius: 16,
        position: 'relative',
        overflow: 'hidden',
        transition: 'all .4s cubic-bezier(.25,.46,0,1.2)',
        transform: isHovered ? 'translateY(-8px) scale(1.05)' : 'scale(1)',
        boxShadow: isHovered
          ? `0 0 28px rgba(${artifact.rgbColor},0.3), 0 12px 32px rgba(0,0,0,.35), inset 0 1px 1px ${borderHov}`
          : `0 4px 16px rgba(0,0,0,.25), inset 0 1px 1px rgba(255,255,255,.06)`,
        animationDelay: `${0.2 + index * 0.06}s`,
        opacity: 0,
        animation: `art-fadeUp .5s ease both`,
      }}
    >
      {/* Accent top line */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: '3px',
        background: `linear-gradient(90deg,transparent,${artifact.color}cc,transparent)`,
        opacity: isHovered ? 1 : 0.3,
        transition: 'opacity .4s',
        boxShadow: isHovered ? `0 0 12px ${artifact.color}77` : 'none',
      }} />

      {/* Background glow */}
      {isHovered && (
        <div style={{
          position: 'absolute',
          inset: 0,
          background: `radial-gradient(ellipse 300px 100px at 50% 0%,rgba(${artifact.rgbColor},.15),transparent)`,
          pointerEvents: 'none',
        }} />
      )}

      <div style={{ position: 'relative', zIndex: 2 }}>
        {/* Header with icon */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: 12,
          marginBottom: 12,
        }}>
          {artifact.image ? (
            <img
              src={artifact.image}
              alt={artifact.name}
              style={{
                width: 56,
                height: 56,
                borderRadius: 8,
                objectFit: 'cover',
                boxShadow: `0 0 12px rgba(${artifact.rgbColor},0.4)`,
                transform: isHovered ? 'scale(1.1)' : 'scale(1)',
                transition: 'all .4s cubic-bezier(.25,.46,0,1.2)',
                flexShrink: 0,
              }}
            />
          ) : (
            <span style={{
              fontSize: 32,
              transform: isHovered ? 'scale(1.25) rotate(15deg)' : 'scale(1) rotate(0deg)',
              transition: 'all .4s cubic-bezier(.25,.46,0,1.2)',
              textShadow: isHovered ? `0 0 16px ${artifact.color}88` : 'none',
              filter: isHovered ? `drop-shadow(0 0 8px ${artifact.color}66)` : 'drop-shadow(0 0 2px rgba(0,0,0,.3))',
            }}>
              {artifact.icon}
            </span>
          )}
          <div style={{ flex: 1 }}>
            <div
              className="art-cinzel"
              style={{
                fontSize: '.85rem',
                fontWeight: 700,
                letterSpacing: '.03em',
                color: isHovered ? '#fff' : '#e8dcc8',
                lineHeight: 1.2,
                transition: 'all .3s',
                textShadow: isHovered ? `0 0 12px rgba(${artifact.rgbColor},.3)` : 'none',
                marginBottom: 4,
              }}
            >
              {artifact.name}
            </div>
            <div
              className="art-mono"
              style={{
                fontSize: '.38rem',
                letterSpacing: '.12em',
                color: artifact.color,
                textTransform: 'uppercase',
                fontWeight: 700,
              }}
            >
              {rarityStars}
            </div>
          </div>
        </div>

        {/* Description */}
        <p
          className="art-crimson"
          style={{
            fontSize: '.78rem',
            color: isHovered ? 'rgba(255,255,255,.75)' : 'rgba(255,255,255,.6)',
            lineHeight: 1.6,
            margin: '10px 0 10px 0',
            transition: 'color .3s',
          }}
        >
          {artifact.description}
        </p>

        {/* Bonuses */}
        <div style={{ display: 'flex', gap: 8, marginTop: 10 }}>
          <div
            style={{
              flex: 1,
              padding: '8px 10px',
              background: `rgba(${artifact.rgbColor},0.08)`,
              border: `1px solid rgba(${artifact.rgbColor},0.25)`,
              borderRadius: 8,
              fontSize: '.72rem',
              color: 'rgba(255,255,255,.65)',
              lineHeight: 1.4,
            }}
          >
            <strong style={{ color: artifact.color }}>2PC</strong>
            <br />
            {artifact.bonus2pc}
          </div>
          <div
            style={{
              flex: 1,
              padding: '8px 10px',
              background: `rgba(${artifact.rgbColor},0.12)`,
              border: `1px solid rgba(${artifact.rgbColor},0.4)`,
              borderRadius: 8,
              fontSize: '.72rem',
              color: 'rgba(255,255,255,.75)',
              lineHeight: 1.4,
            }}
          >
            <strong style={{ color: artifact.color }}>4PC</strong>
            <br />
            {artifact.bonus4pc}
          </div>
        </div>
      </div>

      {/* Shimmer effect */}
      {isHovered && (
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: '-100%',
            width: '100%',
            height: '100%',
            background: `linear-gradient(90deg,transparent,rgba(255,255,255,.12),transparent)`,
            animation: 'art-shimmer .7s ease-in-out',
            pointerEvents: 'none',
            zIndex: 1,
          }}
        />
      )}
    </div>
  )
}

// ── MAIN ──────────────────────────────────────────────────────
export default function Artifacts({ onBack }) {
  return (
    <>
      <style>{CSS}</style>

      <div
        style={{
          position: 'fixed',
          inset: 0,
          display: 'flex',
          flexDirection: 'column',
          background: '#08060f',
          fontFamily: "'Crimson Pro', serif",
        }}
      >
        {/* ── TOP BAR ── */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '16px 36px',
            flexShrink: 0,
            borderBottom: '1px solid rgba(255,255,255,.08)',
            background: 'linear-gradient(90deg,rgba(8,6,15,.9),rgba(8,6,15,.85),rgba(8,6,15,.9))',
            backdropFilter: 'blur(16px)',
            position: 'relative',
            zIndex: 20,
            animation: 'art-fadeIn .6s ease both',
          }}
        >
          {onBack ? (
            <button
              className="art-back"
              onClick={onBack}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                background: 'rgba(255,255,255,.06)',
                border: '1px solid rgba(255,255,255,.12)',
                color: '#9e9388',
                padding: '10px 20px',
                borderRadius: 50,
                fontSize: '.5rem',
                fontFamily: "'Cinzel', serif",
                fontWeight: 700,
                letterSpacing: '.1em',
                cursor: 'pointer',
                transition: 'all .28s',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(255,255,255,.12)'
                e.currentTarget.style.borderColor = 'rgba(255,255,255,.3)'
                e.currentTarget.style.color = '#e8e0d0'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'rgba(255,255,255,.06)'
                e.currentTarget.style.borderColor = 'rgba(255,255,255,.12)'
                e.currentTarget.style.color = '#9e9388'
              }}
            >
              ← HUB
            </button>
          ) : (
            <div style={{ width: 100 }} />
          )}
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, justifyContent: 'center', flex: 1 }}>
            <div
              style={{
                width: 6,
                height: 6,
                background: '#d4b86a',
                borderRadius: '50%',
                boxShadow: '0 0 8px #d4b86a',
                animation: 'art-float 3s ease-in-out infinite',
              }}
            />
            <div className="art-mono" style={{ fontSize: '.46rem', letterSpacing: '.24em', color: 'rgba(255,255,255,.25)', textTransform: 'uppercase' }}>
              ARTIFACT COMPENDIUM
            </div>
            <div
              style={{
                width: 6,
                height: 6,
                background: '#f06292',
                borderRadius: '50%',
                boxShadow: '0 0 8px #f06292',
                animation: 'art-float 3.5s ease-in-out infinite',
              }}
            />
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, width: 100 }}>
            <span style={{ width: 6, height: 6, background: '#d4b86a', transform: 'rotate(45deg)', boxShadow: '0 0 6px rgba(212,184,106,.6)', display: 'inline-block' }} />
            <span style={{ width: 6, height: 6, background: '#f06292', transform: 'rotate(45deg)', boxShadow: '0 0 6px rgba(240,98,146,.6)', display: 'inline-block' }} />
          </div>
        </div>

        {/* ── MAIN CONTENT ── */}
        <div
          style={{
            flex: 1,
            overflowY: 'auto',
            padding: '36px 48px',
            position: 'relative',
            zIndex: 2,
          }}
          className="art-scroll"
        >
          {/* ── HEADER ── */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 20,
              justifyContent: 'center',
              padding: '24px 32px 32px',
              position: 'relative',
              animation: 'art-fadeIn .6s ease both',
              marginBottom: 32,
            }}
          >
            <div
              style={{
                flex: 1,
                height: '1px',
                background: 'linear-gradient(90deg,transparent,rgba(212,184,106,.3),transparent)',
              }}
            />
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, justifyContent: 'center' }}>
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: 10,
                  height: 10,
                  borderRadius: '50%',
                  background: 'rgba(212,184,106,.15)',
                  border: '1px solid rgba(212,184,106,.4)',
                  boxShadow: '0 0 12px rgba(212,184,106,.2)',
                }}
              >
                <span style={{ width: 4, height: 4, background: 'rgb(212,184,106)', borderRadius: '50%' }} />
              </div>
              <div
                className="art-mono"
                style={{
                  fontSize: '.52rem',
                  fontWeight: 900,
                  letterSpacing: '.24em',
                  color: '#d4b86a',
                  textTransform: 'uppercase',
                  textShadow: '0 0 16px rgba(212,184,106,.25)',
                  animation: 'art-float 4s ease-in-out infinite',
                }}
              >
                ARTIFACT SETS
              </div>
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: 10,
                  height: 10,
                  borderRadius: '50%',
                  background: 'rgba(212,184,106,.15)',
                  border: '1px solid rgba(212,184,106,.4)',
                  boxShadow: '0 0 12px rgba(212,184,106,.2)',
                }}
              >
                <span style={{ width: 4, height: 4, background: 'rgb(212,184,106)', borderRadius: '50%' }} />
              </div>
            </div>
            <div
              style={{
                flex: 1,
                height: '1px',
                background: 'linear-gradient(90deg,transparent,rgba(212,184,106,.3),transparent)',
              }}
            />
          </div>

          {/* ── DESCRIPTION ── */}
          <div
            style={{
              textAlign: 'center',
              padding: '0 32px 32px',
              fontSize: '.38rem',
              lineHeight: 1.8,
              color: 'rgba(255,255,255,.42)',
              fontStyle: 'italic',
              animation: 'art-fadeIn .7s ease both',
              animationDelay: '.1s',
            }}
          >
            Artifacts are the foundation of character power in Teyvat. Each set grants powerful bonuses when collected,
            allowing adventurers to specialize their strength. Explore the vast collection of artifact sets and discover
            the perfect combination for your team's playstyle.
          </div>

          {/* ── ARTIFACT GRID ── */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
              gap: 20,
              marginBottom: 48,
            }}
          >
            {ARTIFACT_SETS.map((artifact, idx) => (
              <ArtifactCard key={artifact.id} artifact={artifact} index={idx} />
            ))}
          </div>
        </div>
      </div>
    </>
  )
}
