// ─────────────────────────────────────────────────────────────
//  ElementsPage.jsx  —  "Elements & Reactions" deep-dive
//
//  Three-tab layout inside a dark alchemical lab aesthetic:
//
//  TAB 1 · ELEMENTS  — Seven element cards in a radial/grid
//          layout, each with animated sigil, lore, Vision info
//
//  TAB 2 · REACTIONS — Interactive 7×7 reaction matrix.
//          Hover a cell → reaction name + description glows in.
//          Click → full reaction detail panel slides up.
//
//  TAB 3 · VISIONS   — What is a Vision? The divine spark lore.
//
//  Props
//  ─────
//  onBack : () => void
// ─────────────────────────────────────────────────────────────

import { useState, useEffect, useRef } from 'react'

// ── ELEMENT DATA ──────────────────────────────────────────────
export const ELEMENTS = [
  {
    id: 'pyro',
    name: 'Pyro',
    latin: 'Ignis',
    archon: 'Mavuika',
    color: '#ff6b35',
    colorDim: '#c44820',
    glow: 'rgba(255,107,53,0.4)',
    bg: 'linear-gradient(145deg,#1a0800,#2a0e00,#0d0300)',
    symbol: '🔥',
    sigil: '▲',
    keywords: ['Fire', 'Passion', 'Destruction', 'Sacred Flame'],
    desc: "The element of burning ambition. Pyro is the most aggressive element in Teyvat — it ignites, melts, and detonates. Nations touched by Pyro burn brightest and fall hardest.",
    lore: [
      { h: 'Nature of Fire', b: "Pyro is not mere heat — it is will made visible. The Pyro Archon Mavuika channels it as the Sacred Flame, a primal force older than nations. When two fire-touched souls fight side by side, their flames synchronize into something neither could conjure alone." },
      { h: 'Nightsoul Blessing', b: "Natlan's warriors discovered a deeper layer of Pyro: the Nightsoul. This primal resonance transcends normal Vision use, transforming the body into a living conduit that draws energy directly from the land's sacred fire rather than from personal ambition." },
      { h: 'Combat Role', b: "Pyro excels at triggering the most explosive reactions: Vaporize (2× or 1.5×), Melt (2× or 1.5×), Overloaded (AoE burst), and Burning (DoT field). A skilled Pyro user is an engine — they apply the element that makes every other element hit harder." },
    ],
  },
  {
    id: 'hydro',
    name: 'Hydro',
    latin: 'Aqua',
    archon: 'Focalors',
    color: '#4db8ff',
    colorDim: '#1a7ab8',
    glow: 'rgba(77,184,255,0.4)',
    bg: 'linear-gradient(145deg,#00101a,#001828,#00070f)',
    symbol: '💧',
    sigil: '◯',
    keywords: ['Water', 'Cleansing', 'Justice', 'Memory'],
    desc: "The element of flowing truth. Hydro enables — it is the primer that makes Electro arc further, makes Pyro explode larger, makes Cryo shatter. Without Hydro, most reactions go silent.",
    lore: [
      { h: 'The Flowing Truth', b: "Hydro is associated with memory and truth in Teyvat's cosmology. Fontaine's people were literally made of Hydro — their bodies carried elemental water as a divine condition, one the prophecy threatened to dissolve back into the primordial sea." },
      { h: 'Enabling Element', b: "Hydro's combat role is uniquely generative. It does not destroy on its own — it prepares. Wet status enables Freeze, Vaporize, Electro-Charged, and Bloom. A Hydro applier is the silent architect behind every team's reaction chain." },
      { h: 'Neuvillette & Sovereign Power', b: "The Hydro Dragon Sovereign Neuvillette holds power that predates the current Archon system. His tears — literally Hydro — reshape battlefields. He represents what elemental mastery looks like when divorced from human limitation." },
    ],
  },
  {
    id: 'anemo',
    name: 'Anemo',
    latin: 'Ventus',
    archon: 'Barbatos',
    color: '#70e8c0',
    colorDim: '#2aaa84',
    glow: 'rgba(112,232,192,0.4)',
    bg: 'linear-gradient(145deg,#001a12,#002a1c,#000f09)',
    symbol: '🌪',
    sigil: '~',
    keywords: ['Wind', 'Freedom', 'Song', 'Swirl'],
    desc: "The element of liberation. Anemo carries other elements across the battlefield, amplifying them and spreading their reach. Barbatos chose it as his element because wind cannot be owned.",
    lore: [
      { h: 'Wind Cannot Be Owned', b: "Barbatos chose Anemo not for its power but for its meaning. Wind has no master — it blows past kings and beggars alike. His nation, Mondstadt, embodies this: no ruling god, no imperial court, just knights sworn to protect the freedom of ordinary people." },
      { h: 'Swirl Mechanics', b: "Anemo's primary reaction, Swirl, takes an existing element on an enemy and spreads it to nearby targets. This makes Anemo a force multiplier: the same Pyro or Electro or Cryo application now hits five enemies instead of one. Kazuha and Venti are considered some of the game's most powerful supports because of this." },
      { h: 'Absorption', b: "Certain Anemo skills can absorb another element — an Anemo tornado can become a Hydro tornado or a Pyro vortex. This absorption represents the wind taking on the character of what it carries, a subtle nod to Barbatos's empathetic nature." },
    ],
  },
  {
    id: 'electro',
    name: 'Electro',
    latin: 'Fulgur',
    archon: 'Ei',
    color: '#c080ff',
    colorDim: '#7a3ab8',
    glow: 'rgba(192,128,255,0.4)',
    bg: 'linear-gradient(145deg,#0d0020,#160030,#060010)',
    symbol: '⚡',
    sigil: '↯',
    keywords: ['Lightning', 'Eternity', 'Superconduct', 'Quicken'],
    desc: "The element of persistence. Electro lingers — it arcs, it chains, it Superconduces away resistances. In the Dendro era, it unlocked an entirely new reaction tree that redefined team-building.",
    lore: [
      { h: 'The Eternity Paradox', b: "Ei chose Electro because lightning is instantaneous yet eternal — a single moment of perfect clarity. Her pursuit of eternity through stasis is reflected in the element: Electro interrupts, resets, and persists. It cannot be ignored the way Cryo or Hydro applications sometimes can." },
      { h: 'The Dendro Revolution', b: "Before Sumeru's patch, Electro was considered underpowered. Then Dendro arrived. Quicken enables Aggravate (Electro bonus damage) and Spread (Dendro bonus damage). Hyperbloom and Electrocharged became the backbone of the game's strongest team archetypes overnight." },
      { h: 'Superconduct', b: "Electro + Cryo creates Superconduct — it deals minor AoE damage but more importantly shreds Physical resistance by 40%. This reaction exists specifically to enable Physical DPS characters like Eula and Razor, making Electro a hidden support element in Physical comps." },
    ],
  },
  {
    id: 'dendro',
    name: 'Dendro',
    latin: 'Silva',
    archon: 'Nahida',
    color: '#88d840',
    colorDim: '#4a8a10',
    glow: 'rgba(136,216,64,0.4)',
    bg: 'linear-gradient(145deg,#041200,#081e00,#020800)',
    symbol: '🌿',
    sigil: '⊕',
    keywords: ['Nature', 'Wisdom', 'Growth', 'Bloom'],
    desc: "The newest element to arrive in Teyvat. Dendro rewrote the meta — its reactions are multiplicative where others are additive, and it enabled entirely new team compositions never before possible.",
    lore: [
      { h: 'The Absent Element', b: "For years, Dendro had no playable Archon and no playable characters. The element existed in the game as enemy attacks only. Its absence was lore-accurate: Nahida was imprisoned, and the God of Wisdom's corpse was used as a false deity. When she was freed, Dendro came alive." },
      { h: 'Irminsul and Memory', b: "Dendro is tied to Irminsul — the world tree storing all mortal memory. Nahida's power literally flows through the roots of knowledge. When she healed Irminsul, she proved that growth and repair are more powerful than stasis — a direct rebuke of Ei's eternity ideal." },
      { h: 'The Bloom Reaction Tree', b: "Dendro + Hydro = Bloom (AoE seed explosion). Bloom + Electro = Hyperbloom (homing seed missiles). Bloom + Pyro = Burgeon (AoE burst centered on character). Quicken + Electro = Aggravate. Quicken + Dendro = Spread. No other element has this branching reaction depth." },
    ],
  },
  {
    id: 'cryo',
    name: 'Cryo',
    latin: 'Gelu',
    archon: 'Tsaritsa',
    color: '#a8e8ff',
    colorDim: '#4898c0',
    glow: 'rgba(168,232,255,0.4)',
    bg: 'linear-gradient(145deg,#00101e,#001828,#00060e)',
    symbol: '❄',
    sigil: '✦',
    keywords: ['Ice', 'Preservation', 'Freeze', 'Shatter'],
    desc: "The element of crystalline preservation. Cryo freezes enemies in place, enabling free damage. Combined with Hydro, entire groups can be locked down. Combined with Electro, armor shatters.",
    lore: [
      { h: 'The Coldest Archon', b: "The Tsaritsa was once described as overflowing with love — and then Celestia took that love from her. What remains is the cold clarity of someone who has decided to burn the world's institutions down to free humanity from a predetermined script. Her element mirrors her: preserved, distant, crystalline, lethal." },
      { h: 'Freeze Compositions', b: "Cryo + Hydro = Freeze. Frozen enemies cannot move, cannot attack, and take 200% Shatter damage from Claymore and Plunging attacks. Freeze comps dominated early meta because of their near-perfect crowd control — a frozen enemy is a dead enemy." },
      { h: 'Melt and Superconduct', b: "Cryo enables Melt (Cryo+Pyro for up to 2× multiplier) and Superconduct (Cryo+Electro for 40% Physical shred). This makes Cryo one of the most versatile reaction elements — it slots into Pyro DPS teams, Physical teams, and its own Freeze comps equally well." },
    ],
  },
  {
    id: 'geo',
    name: 'Geo',
    latin: 'Terra',
    archon: 'Morax',
    color: '#f0c040',
    colorDim: '#a07010',
    glow: 'rgba(240,192,64,0.4)',
    bg: 'linear-gradient(145deg,#120800,#1e0e00,#080400)',
    symbol: '⛰',
    sigil: '◈',
    keywords: ['Earth', 'Contract', 'Crystallize', 'Shield'],
    desc: "The element of unbreakable foundations. Geo cannot trigger most reactions — it crystallizes. But Crystallize is unique: it creates elemental shields, turning offense into defense simultaneously.",
    lore: [
      { h: "The God Who Walked Away", b: "Morax is 6,000 years old — the oldest Archon, the survivor of the Archon War, the god who shaped Liyue's geography with his own hands. He willingly gave his Gnosis to the Tsaritsa and retired as a human, going by Zhongli, because he believed his people had grown strong enough to govern themselves." },
      { h: 'Crystallize Mechanics', b: "Geo cannot Swirl, Vaporize, or Melt. Instead, Geo + any element = Crystallize, spawning an elemental shard. Picking up the shard grants a 250-750 HP shield of that element's type. This is uniquely defensive — Geo turns every elemental encounter into a shield factory." },
      { h: 'Geo Resonance', b: "Two Geo characters in a team grant Geo Resonance: 15% damage bonus, 20% shield strength, and shields cause Geo DMG bonus. Zhongli's shield + a second Geo triggers what players call 'Petra stacking' — a fortress-offense playstyle that defines one of the game's most reliable team archetypes." },
    ],
  },
]

// ── REACTION DATA ─────────────────────────────────────────────
const NA = null
const REACTIONS = {
  'pyro+hydro':   { name:'Vaporize',      color:'#ff8c42', symbol:'💦🔥', mult:'1.5× / 2×',   desc:"One of the two multiplicative reactions. Hydro on Pyro deals 2× Vaporize; Pyro on Hydro deals 1.5×. The direction matters. Xiangling's Pyronado Vaporizing off a Xingqiu burst is the game's most iconic damage spike." },
  'hydro+pyro':   { name:'Vaporize',      color:'#ff8c42', symbol:'💦🔥', mult:'1.5× / 2×',   desc:"One of the two multiplicative reactions. Hydro on Pyro deals 2× Vaporize; Pyro on Hydro deals 1.5×. The direction matters. Xiangling's Pyronado Vaporizing off a Xingqiu burst is the game's most iconic damage spike." },
  'pyro+cryo':    { name:'Melt',          color:'#ffb060', symbol:'❄🔥', mult:'1.5× / 2×',   desc:"The other multiplicative reaction. Pyro on Cryo = 2× Melt; Cryo on Pyro = 1.5×. Ganyu's Cryo Bloom hitting a Pyro-applied enemy for 2× damage is considered the highest single-hit damage ceiling in the game." },
  'cryo+pyro':    { name:'Melt',          color:'#ffb060', symbol:'❄🔥', mult:'1.5× / 2×',   desc:"The other multiplicative reaction. Pyro on Cryo = 2× Melt; Cryo on Pyro = 1.5×. Ganyu's Cryo Bloom hitting a Pyro-applied enemy for 2× damage is considered the highest single-hit damage ceiling in the game." },
  'pyro+electro': { name:'Overloaded',    color:'#ff4488', symbol:'⚡🔥', mult:'AoE DMG',     desc:"Pyro + Electro detonates in a Pyro explosion dealing AoE damage and knocking enemies back. Powerful but scattering — experienced players time Overloaded to blast enemies into corners rather than into the abyss." },
  'electro+pyro': { name:'Overloaded',    color:'#ff4488', symbol:'⚡🔥', mult:'AoE DMG',     desc:"Pyro + Electro detonates in a Pyro explosion dealing AoE damage and knocking enemies back. Powerful but scattering — experienced players time Overloaded to blast enemies into corners rather than into the abyss." },
  'pyro+dendro':  { name:'Burning',       color:'#ff6020', symbol:'🌿🔥', mult:'DoT field',   desc:"Pyro + Dendro creates a Burning field that continuously deals Pyro DMG to anything standing in it. Burning enemies also have Pyro applied repeatedly — useful for enabling Vaporize and Melt chains but tricky to control the area." },
  'dendro+pyro':  { name:'Burning',       color:'#ff6020', symbol:'🌿🔥', mult:'DoT field',   desc:"Pyro + Dendro creates a Burning field that continuously deals Pyro DMG to anything standing in it. Burning enemies also have Pyro applied repeatedly — useful for enabling Vaporize and Melt chains but tricky to control the area." },
  'hydro+cryo':   { name:'Freeze',        color:'#88ddff', symbol:'💧❄', mult:'Hard CC',     desc:"The crowd-control king. Hydro + Cryo freezes enemies solid — they cannot move, attack, or dodge. Frozen enemies take 200% Shattered damage from Claymore/Geo attacks. Freeze comps pair Ayaka or Ganyu with Mona or Kokomi to lock entire rooms." },
  'cryo+hydro':   { name:'Freeze',        color:'#88ddff', symbol:'💧❄', mult:'Hard CC',     desc:"The crowd-control king. Hydro + Cryo freezes enemies solid — they cannot move, attack, or dodge. Frozen enemies take 200% Shattered damage from Claymore/Geo attacks. Freeze comps pair Ayaka or Ganyu with Mona or Kokomi to lock entire rooms." },
  'hydro+electro':{ name:'Electro-Charged',color:'#a060ff',symbol:'💧⚡',mult:'Chain DMG',   desc:"Hydro + Electro creates a persistent Electro-Charged state that deals Electro DMG every second and arcs to nearby Wet enemies. In water or with grouping, one EC application damages an entire mob pack simultaneously — terrifying in Abyss." },
  'electro+hydro':{ name:'Electro-Charged',color:'#a060ff',symbol:'💧⚡',mult:'Chain DMG',   desc:"Hydro + Electro creates a persistent Electro-Charged state that deals Electro DMG every second and arcs to nearby Wet enemies. In water or with grouping, one EC application damages an entire mob pack simultaneously — terrifying in Abyss." },
  'hydro+dendro': { name:'Bloom',         color:'#60d840', symbol:'💧🌿', mult:'Seed burst',  desc:"The reaction that spawned an entire meta. Hydro + Dendro creates a Dendro Core — a glowing seed that explodes after a moment for massive AoE Dendro DMG. Cores can then be reacted further: Electro → Hyperbloom (homing missile), Pyro → Burgeon (AoE blast)." },
  'dendro+hydro': { name:'Bloom',         color:'#60d840', symbol:'💧🌿', mult:'Seed burst',  desc:"The reaction that spawned an entire meta. Hydro + Dendro creates a Dendro Core — a glowing seed that explodes after a moment for massive AoE Dendro DMG. Cores can then be reacted further: Electro → Hyperbloom (homing missile), Pyro → Burgeon (AoE blast)." },
  'cryo+electro': { name:'Superconduct',  color:'#c0a0ff', symbol:'❄⚡',  mult:'-40% Phys RES',desc:"Cryo + Electro deals minor AoE Cryo DMG but, critically, reduces all nearby enemies' Physical RES by 40% for 12s. This hidden utility reaction exists purely to enable Physical DPS archetypes — Eula, Razor, Fischl battery comps all rely on it." },
  'electro+cryo': { name:'Superconduct',  color:'#c0a0ff', symbol:'❄⚡',  mult:'-40% Phys RES',desc:"Cryo + Electro deals minor AoE Cryo DMG but, critically, reduces all nearby enemies' Physical RES by 40% for 12s. This hidden utility reaction exists purely to enable Physical DPS archetypes — Eula, Razor, Fischl battery comps all rely on it." },
  'electro+dendro':{ name:'Quicken',      color:'#a8e840', symbol:'⚡🌿', mult:'Aggravate/Spread',desc:"Electro + Dendro creates the Quicken state, which enables two further reactions: Aggravate (Electro hits deal bonus Electro DMG) and Spread (Dendro hits deal bonus Dendro DMG). Both are additive flat damage bonuses that scale with Elemental Mastery — enabling EM builds as primary DPS for the first time." },
  'dendro+electro':{ name:'Quicken',      color:'#a8e840', symbol:'⚡🌿', mult:'Aggravate/Spread',desc:"Electro + Dendro creates the Quicken state, which enables two further reactions: Aggravate (Electro hits deal bonus Electro DMG) and Spread (Dendro hits deal bonus Dendro DMG). Both are additive flat damage bonuses that scale with Elemental Mastery — enabling EM builds as primary DPS for the first time." },
  'anemo+pyro':   { name:'Swirl',         color:'#ff6b35', symbol:'🌪🔥', mult:'Spread+Shred', desc:"Anemo absorbs and spreads Pyro to all nearby enemies, dealing Pyro DMG to each. Swirl also shreds Elemental RES by 40% if the Anemo character has the Viridescent Venerer artifact set — the most powerful support debuff in the game." },
  'anemo+hydro':  { name:'Swirl',         color:'#4db8ff', symbol:'🌪💧', mult:'Spread+Shred', desc:"Anemo spreads Hydro to all nearby enemies. With VV set, shreds Hydro RES by 40%. Sucrose and Kazuha are the primary Swirl supports, with Kazuha's Elemental Mastery snapshot being one of the game's most complex interaction chains." },
  'anemo+electro':{ name:'Swirl',         color:'#c080ff', symbol:'🌪⚡', mult:'Spread+Shred', desc:"Anemo spreads Electro to all nearby enemies. Swirl + VV debuff is particularly potent in Electro-based teams where the 40% RES shred applies to all subsequent Electro reactions in the chain." },
  'anemo+cryo':   { name:'Swirl',         color:'#a8e8ff', symbol:'🌪❄', mult:'Spread+Shred', desc:"Anemo spreads Cryo to all nearby enemies. Freeze teams use this to apply Cryo aura to mobs before a Hydro unit freezes them all simultaneously. The spread radius makes Venti's burst a Freeze team's best friend." },
  'anemo+dendro': { name:'Swirl',         color:'#88d840', symbol:'🌪🌿', mult:'Spread',       desc:"Anemo can spread Dendro, though this is rarer in practice. Burning + Anemo spread creates an area-denial fire field, and in Natlan team comps, Anemo spreading Dendro enables unique Quicken + Swirl hybrid plays." },
  'geo+pyro':     { name:'Crystallize',   color:'#f0c040', symbol:'⛰🔥', mult:'Pyro Shield',  desc:"Geo + any element = Crystallize, spawning a crystal shard. Picking it up grants a 1-3s elemental shield of that element's type. Pyro Crystallize creates a Pyro shield that absorbs incoming Pyro damage — valuable against fire-heavy floors." },
  'geo+hydro':    { name:'Crystallize',   color:'#4db8ff', symbol:'⛰💧', mult:'Hydro Shield', desc:"Hydro Crystallize shard grants a Hydro shield. While less commonly targeted than other Crystallize types, it matters in Hydro-heavy content and is a free mini-shield pickup for any team running a Geo character." },
  'geo+cryo':     { name:'Crystallize',   color:'#a8e8ff', symbol:'⛰❄', mult:'Cryo Shield',  desc:"Cryo Crystallize is sought-after for Freeze teams — it provides a Cryo shield while keeping the Cryo aura on enemies intact for subsequent Freeze applications. Zhongli teams in Cryo comps intentionally farm these shards." },
  'geo+electro':  { name:'Crystallize',   color:'#c080ff', symbol:'⛰⚡', mult:'Electro Shield',desc:"Electro Crystallize creates a free Electro shield. In Electro-heavy teams, this provides occasional chip defense without interrupting the reaction chain. Less game-changing than the Electro RES shred approach, but free sustain is never wasted." },
  'geo+dendro':   { name:'Crystallize',   color:'#88d840', symbol:'⛰🌿', mult:'Dendro Shield', desc:"Dendro Crystallize is rarer but functional — a Dendro shield absorbs incoming Dendro DMG, useful in Burning-heavy content. The shard appears near where the reaction occurred, requiring the player to move to collect it." },
  'geo+anemo':    { name:'No Reaction',   color:'#666',    symbol:'—',   mult:'None',         desc:"Geo and Anemo do not react with each other. Geo cannot be Swirled, and Anemo cannot be Crystallized. This is intentional — both are 'neutral' elements that modify other reactions rather than being modified themselves." },
  'pyro+pyro':    { name:'Resonance',     color:'#ff6b35', symbol:'🔥🔥', mult:'+25% ATK',    desc:"Two Pyro characters in the team trigger Pyro Resonance: all party members gain +25% ATK. The simplest and most universally powerful resonance, which is why double-Pyro appears in nearly every meta team composition." },
  'hydro+hydro':  { name:'Resonance',     color:'#4db8ff', symbol:'💧💧', mult:'+25% HP',     desc:"Hydro Resonance grants +25% max HP to all party members. With Furina's kit scaling off HP and triggering healing-based buffs, double-Hydro Resonance became the backbone of the Furina team archetype." },
  'cryo+cryo':    { name:'Resonance',     color:'#a8e8ff', symbol:'❄❄', mult:'+15% CRIT vs frozen', desc:"Cryo Resonance grants 15% CRIT Rate against enemies affected by Cryo or Frozen. In pure Cryo/Freeze teams, this is a free CRIT Rate sub-stat — allowing characters to invest in CRIT DMG instead." },
  'electro+electro':{ name:'Resonance',   color:'#c080ff', symbol:'⚡⚡', mult:'Energy Recharge',desc:"Electro Resonance triggers a mini-particle generator: when Electro reactions occur, a flat Energy particle is created every 5s. In teams with high Electro uptime, this effectively solves Energy Recharge needs, freeing artifact slots for offensive stats." },
  'anemo+anemo':  { name:'Resonance',     color:'#70e8c0', symbol:'🌪🌪', mult:'+10% SPD -5% Stamina', desc:"Anemo Resonance increases movement speed by 10% and reduces Stamina consumption for dashing and gliding by 15%. Primarily a quality-of-life resonance — helpful in exploration but rarely worth the team slot over a combat-focused option." },
  'geo+geo':      { name:'Resonance',     color:'#f0c040', symbol:'⛰⛰', mult:'+15% Geo DMG + Shield', desc:"Geo Resonance grants +15% DMG to shielded characters and empowers Crystallize shards to deal Geo DMG on pickup. With Zhongli's near-permanent shield, double-Geo teams maintain the damage buff almost 100% of uptime." },
  'dendro+dendro':{ name:'Resonance',     color:'#88d840', symbol:'🌿🌿', mult:'+50 EM',      desc:"Dendro Resonance grants +50 Elemental Mastery. In reaction-focused Dendro teams where EM is the primary stat, this resonance effectively gives every team member a free EM sands substat — significant in Bloom and Hyperbloom comps." },
}

function getReaction(a, b) {
  if (a === b) return REACTIONS[`${a}+${a}`] || null
  return REACTIONS[`${a}+${b}`] || REACTIONS[`${b}+${a}`] || null
}

const EL = ELEMENTS.map(e => e.id)

// ── DESIGN ────────────────────────────────────────────────────
const T = {
  bg: '#07060e',
  bgMid: '#0d0b1a',
  surface: 'rgba(255,255,255,0.035)',
  surfaceHover: 'rgba(255,255,255,0.07)',
  border: 'rgba(255,255,255,0.07)',
  borderHover: 'rgba(255,255,255,0.18)',
  textPrimary: '#f0eeff',
  textSecond: '#a098c0',
  textMuted: '#504870',
  gold: '#c8a84a',
}

// ── GLOBAL CSS ────────────────────────────────────────────────
const CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;0,700;1,300;1,400;1,600&family=Rajdhani:wght@400;500;600;700&family=Share+Tech+Mono&display=swap');
  *, *::before, *::after { box-sizing:border-box; margin:0; padding:0; }

  @keyframes el-fadeUp   { from{opacity:0;transform:translateY(18px)} to{opacity:1;transform:translateY(0)} }
  @keyframes el-fadeIn   { from{opacity:0} to{opacity:1} }
  @keyframes el-scaleIn  { from{opacity:0;transform:scale(.88)} to{opacity:1;transform:scale(1)} }
  @keyframes el-glow     { 0%,100%{opacity:.5;transform:scale(1)} 50%{opacity:1;transform:scale(1.08)} }
  @keyframes el-spin     { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
  @keyframes el-spinRev  { from{transform:rotate(0deg)} to{transform:rotate(-360deg)} }
  @keyframes el-pulse    { 0%,100%{opacity:.6} 50%{opacity:1} }
  @keyframes el-slideUp  { from{opacity:0;transform:translateY(30px)} to{opacity:1;transform:translateY(0)} }
  @keyframes el-shimmer  { from{background-position:-200% 0} to{background-position:200% 0} }
  @keyframes el-float    { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-8px)} }
  @keyframes el-orbDot   { 0%{transform:rotate(var(--start)) translateX(var(--r)) scale(1);opacity:.8} 50%{opacity:1;transform:rotate(calc(var(--start) + 180deg)) translateX(var(--r)) scale(1.4)} 100%{transform:rotate(calc(var(--start) + 360deg)) translateX(var(--r)) scale(1);opacity:.8} }
  @keyframes el-runeGlow { 0%,100%{text-shadow:0 0 10px currentColor} 50%{text-shadow:0 0 30px currentColor, 0 0 60px currentColor} }

  .el-cormorant { font-family:'Cormorant Garamond',serif; }
  .el-rajdhani  { font-family:'Rajdhani',sans-serif; }
  .el-mono      { font-family:'Share Tech Mono',monospace; }

  .el-noscroll::-webkit-scrollbar{display:none}
  .el-noscroll{-ms-overflow-style:none;scrollbar-width:none}

  /* ── Tabs ── */
  .el-tab {
    padding:9px 22px; border-radius:6px 6px 0 0;
    border:1px solid transparent; border-bottom:none;
    background:transparent;
    font-family:'Rajdhani',sans-serif; font-weight:600;
    font-size:.8rem; letter-spacing:.12em;
    color:${T.textMuted}; cursor:pointer;
    transition:all .22s; position:relative; top:1px;
  }
  .el-tab:hover { color:${T.textSecond}; }
  .el-tab.active {
    color:${T.textPrimary};
    border-color:${T.border};
    background:${T.bgMid};
  }

  /* ── Element card ── */
  .el-card {
    position:relative; overflow:hidden;
    background:${T.surface};
    border:1px solid ${T.border};
    border-radius:14px;
    cursor:pointer;
    transition:transform .25s cubic-bezier(.22,.68,0,1.2), border-color .2s, background .2s;
  }
  .el-card:hover {
    transform:translateY(-6px) scale(1.02);
    border-color:var(--ec);
    background:var(--eb);
    box-shadow:0 0 30px var(--eg), 0 8px 32px rgba(0,0,0,.4);
  }

  /* ── Matrix cell ── */
  .el-cell {
    width:100%; aspect-ratio:1;
    border:1px solid rgba(255,255,255,.04);
    border-radius:10px;
    background:rgba(255,255,255,.02);
    cursor:pointer; transition:all .18s;
    display:flex; flex-direction:column;
    align-items:center; justify-content:center;
    font-size:.68rem; gap:4px;
    position:relative; overflow:hidden;
  }
  .el-cell:hover {
    border-color:var(--rc,rgba(255,255,255,.2));
    background:var(--rb,rgba(255,255,255,.07));
    box-shadow:0 0 16px var(--rg,rgba(255,255,255,.1));
    transform:scale(1.06);
    z-index:2;
  }
  .el-cell.self {
    background:rgba(255,255,255,.05);
    border-style:dashed;
  }
  .el-cell.active {
    border-color:var(--rc);
    background:var(--rb);
    box-shadow:0 0 20px var(--rg);
  }

  /* ── Detail panel ── */
  .el-detail {
    border-radius:16px;
    border:1px solid var(--dc,rgba(255,255,255,.12));
    background:linear-gradient(145deg, rgba(255,255,255,.04), rgba(255,255,255,.01));
    animation:el-slideUp .35s cubic-bezier(.22,.68,0,1.2) both;
  }

  /* ── Back btn ── */
  .el-back {
    display:flex; align-items:center; gap:7px;
    padding:8px 18px; border-radius:50px;
    border:1px solid rgba(255,255,255,.1);
    background:rgba(255,255,255,.04);
    font-family:'Share Tech Mono',monospace;
    font-size:.48rem; letter-spacing:.16em; color:${T.textMuted};
    cursor:pointer; transition:all .2s;
  }
  .el-back:hover { background:rgba(255,255,255,.09); color:${T.textPrimary}; border-color:rgba(255,255,255,.22); }

  /* ── Lore entry ── */
  .el-lore {
    padding:16px 18px; border-radius:12px;
    border-left:2px solid var(--ec2);
    background:rgba(255,255,255,.03);
    border-top:1px solid rgba(255,255,255,.05);
    border-right:1px solid rgba(255,255,255,.05);
    border-bottom:1px solid rgba(255,255,255,.05);
  }

  /* ── Keyword chip ── */
  .el-chip {
    padding:3px 10px; border-radius:50px;
    border:1px solid var(--ec3);
    font-family:'Share Tech Mono',monospace;
    font-size:.42rem; letter-spacing:.1em; color:var(--ec2);
    background:var(--eb2);
  }
`

// ── ORBITAL SIGIL ─────────────────────────────────────────────
function ElementSigil({ el, size = 120 }) {
  const dots = 8
  return (
    <div style={{ position:'relative', width:size, height:size, display:'flex', alignItems:'center', justifyContent:'center' }}>
      {/* Glow bg */}
      <div style={{ position:'absolute', inset:0, borderRadius:'50%', background:`radial-gradient(circle, ${el.glow} 0%, transparent 68%)`, animation:'el-glow 3s ease-in-out infinite' }} />
      {/* Outer ring */}
      <div style={{ position:'absolute', width:size, height:size, borderRadius:'50%', border:`1px solid ${el.color}44`, borderTopColor:el.color, animation:`el-spin ${6}s linear infinite` }} />
      {/* Inner ring */}
      <div style={{ position:'absolute', width:size*.68, height:size*.68, borderRadius:'50%', border:`1px dashed ${el.color}55`, animation:`el-spinRev 4s linear infinite` }} />
      {/* Orbiting dots */}
      {Array.from({length:dots},(_,i) => (
        <div key={i} style={{ position:'absolute', width:4, height:4, borderRadius:'50%', background:el.color, '--start':`${(i/dots)*360}deg`, '--r':`${size*.44}px`, animation:`el-orbDot ${3+i*.2}s linear infinite ${i*.15}s`, opacity:.7 }} />
      ))}
      {/* Sigil */}
      <div className="el-cormorant" style={{ position:'relative', zIndex:2, fontSize:size*.32, color:el.color, animation:'el-runeGlow 3s ease-in-out infinite', lineHeight:1 }}>
        {el.sigil}
      </div>
    </div>
  )
}

// ── ELEMENT CARD (grid) ───────────────────────────────────────
function ElementCard({ el, index, onClick }) {
  return (
    <div
      className="el-card"
      onClick={() => onClick(el)}
      style={{
        '--ec':el.color,
        '--eb':`${el.color}18`,
        '--eg':el.glow,
        padding:'30px 24px 24px',
        animation:`el-fadeUp .4s ease both ${.3+index*.07}s`,
        opacity:0,
        minHeight:0,
        height:'100%',
        display:'flex',
        flexDirection:'column',
      }}
    >
      {/* Top accent */}
      <div style={{ position:'absolute', top:0, left:0, right:0, height:2, background:`linear-gradient(90deg, transparent, ${el.color}, transparent)` }} />

      <div style={{ display:'flex', justifyContent:'center', marginBottom:18 }}>
        <ElementSigil el={el} size={126} />
      </div>

      <div className="el-mono" style={{ fontSize:'.48rem', letterSpacing:'.2em', color:T.textMuted, marginBottom:5, textAlign:'center' }}>
        {el.latin.toUpperCase()}
      </div>
      <h3 className="el-rajdhani" style={{ fontSize:'1.5rem', fontWeight:700, color:el.color, letterSpacing:'.06em', margin:'0 0 8px', textAlign:'center', textShadow:`0 0 20px ${el.glow}` }}>
        {el.name}
      </h3>
      <div className="el-mono" style={{ fontSize:'.5rem', letterSpacing:'.1em', color:T.textMuted, textAlign:'center', marginBottom:12 }}>
        ARCHON: {el.archon.toUpperCase()}
      </div>
      <p className="el-cormorant" style={{ fontSize:'1.05rem', color:T.textSecond, lineHeight:1.72, textAlign:'center', margin:0 }}>
        {el.desc.slice(0, 140)}…
      </p>

      <div className="el-mono" style={{ marginTop:'auto', paddingTop:16, fontSize:'.52rem', letterSpacing:'.14em', color:el.colorDim, textAlign:'center' }}>
        LEARN MORE ›
      </div>
    </div>
  )
}

// ── ELEMENT DETAIL PANEL ──────────────────────────────────────
function ElementDetail({ el, onClose }) {
  return (
    <div className="el-detail" style={{ '--dc':el.color+'55', padding:'28px 28px 32px' }}>
      {/* Header */}
      <div style={{ display:'flex', alignItems:'flex-start', gap:24, marginBottom:24 }}>
        <div style={{ flexShrink:0 }}>
          <ElementSigil el={el} size={130} />
        </div>
        <div style={{ flex:1 }}>
          <div className="el-mono" style={{ fontSize:'.4rem', letterSpacing:'.2em', color:T.textMuted, marginBottom:4 }}>
            {el.latin.toUpperCase()} · ARCHON: {el.archon.toUpperCase()}
          </div>
          <h2 className="el-rajdhani" style={{ fontSize:'2.2rem', fontWeight:700, color:el.color, lineHeight:1, marginBottom:8, textShadow:`0 0 40px ${el.glow}` }}>
            {el.name}
          </h2>
          <p className="el-cormorant" style={{ fontSize:'1rem', color:T.textSecond, lineHeight:1.72, fontStyle:'italic', marginBottom:14 }}>
            {el.desc}
          </p>
          <div style={{ display:'flex', flexWrap:'wrap', gap:6, '--ec2':el.color, '--ec3':el.color+'55', '--eb2':el.color+'14' }}>
            {el.keywords.map(k => <span key={k} className="el-chip">{k}</span>)}
          </div>
        </div>
      </div>

      {/* Divider */}
      <div style={{ height:1, background:`linear-gradient(90deg, ${el.color}88, transparent)`, marginBottom:20 }} />

      {/* Lore */}
      <div style={{ display:'flex', flexDirection:'column', gap:12, '--ec2':el.color }}>
        {el.lore.map((entry, i) => (
          <div key={i} className="el-lore" style={{ animation:`el-fadeUp .38s ease both ${i*.08}s`, opacity:0 }}>
            <div className="el-rajdhani" style={{ fontWeight:700, fontSize:'.78rem', letterSpacing:'.06em', color:el.color, marginBottom:6 }}>
              {entry.h}
            </div>
            <p className="el-cormorant" style={{ fontSize:'.95rem', color:T.textSecond, lineHeight:1.76, margin:0 }}>
              {entry.b}
            </p>
          </div>
        ))}
      </div>

      <button className="el-back" onClick={onClose} style={{ marginTop:22 }}>↩ CLOSE</button>
    </div>
  )
}

// ── REACTION MATRIX ───────────────────────────────────────────
function ReactionsTab() {
  const [hovered, setHovered] = useState(null)
  const [selected, setSelected] = useState(null)
  const reaction = selected || hovered

  const elShort = { pyro:'🔥', hydro:'💧', anemo:'🌪', electro:'⚡', dendro:'🌿', cryo:'❄', geo:'⛰' }

  return (
    <div style={{ display:'flex', gap:30, height:'100%', minHeight:0, overflow:'hidden' }}>
      {/* Matrix */}
      <div style={{ flexShrink:0 }}>
        <div className="el-mono" style={{ fontSize:'.5rem', letterSpacing:'.18em', color:T.textMuted, marginBottom:14 }}>
          REACTION MATRIX — HOVER TO PREVIEW · CLICK TO LOCK
        </div>

        {/* Column headers */}
        <div style={{ display:'grid', gridTemplateColumns:`42px repeat(7, 70px)`, gap:6, marginBottom:6 }}>
          <div />
          {EL.map(e => (
            <div key={e} className="el-mono" style={{ fontSize:'.72rem', textAlign:'center', color:T.textSecond }}>
              {elShort[e]}
            </div>
          ))}
        </div>

        {/* Rows */}
        {EL.map((rowEl, ri) => {
          const rowData = ELEMENTS.find(e => e.id === rowEl)
          return (
            <div key={rowEl} style={{ display:'grid', gridTemplateColumns:`42px repeat(7, 70px)`, gap:6, marginBottom:6 }}>
              {/* Row label */}
              <div className="el-mono" style={{ fontSize:'.72rem', display:'flex', alignItems:'center', justifyContent:'center', color:T.textSecond }}>
                {elShort[rowEl]}
              </div>
              {EL.map((colEl, ci) => {
                const rx = getReaction(rowEl, colEl)
                const isSelf = rowEl === colEl
                const isActive = selected?.name === rx?.name
                const isHovered = hovered?.name === rx?.name

                return (
                  <div
                    key={colEl}
                    className={`el-cell ${isSelf ? 'self' : ''} ${isActive ? 'active' : ''}`}
                    style={{
                      '--rc': rx?.color || 'rgba(255,255,255,.12)',
                      '--rb': rx ? `${rx.color}18` : 'rgba(255,255,255,.04)',
                      '--rg': rx ? `${rx.color}40` : 'transparent',
                    }}
                    onMouseEnter={() => { if (!selected) setHovered(rx) }}
                    onMouseLeave={() => { if (!selected) setHovered(null) }}
                    onClick={() => setSelected(s => s?.name === rx?.name ? null : rx)}
                  >
                    {rx ? (
                      <>
                        <div style={{ fontSize:'1.15rem', lineHeight:1 }}>{rx.symbol.split('').slice(-1)[0]}</div>
                        <div className="el-mono" style={{ fontSize:'.38rem', letterSpacing:'.06em', color: rx.color, textAlign:'center', lineHeight:1.2, paddingInline:3 }}>
                          {rx.name.length > 10 ? rx.name.slice(0,9)+'…' : rx.name}
                        </div>
                      </>
                    ) : (
                      <div style={{ color:'rgba(255,255,255,.08)', fontSize:'.9rem' }}>—</div>
                    )}
                  </div>
                )
              })}
            </div>
          )
        })}
      </div>

      {/* Reaction detail */}
      <div style={{ flex:1, overflow:'hidden', display:'flex', flexDirection:'column', justifyContent: reaction ? 'flex-start' : 'center' }}>
        {reaction ? (
          <div key={reaction.name} className="el-detail" style={{ '--dc': reaction.color+'66', padding:'32px 34px 34px', animation:'el-slideUp .3s ease both' }}>
            <div style={{ display:'flex', alignItems:'center', gap:14, marginBottom:16 }}>
              <div style={{ fontSize:'3rem', lineHeight:1, filter:`drop-shadow(0 0 14px ${reaction.color})` }}>
                {reaction.symbol}
              </div>
              <div>
                <div className="el-mono" style={{ fontSize:'.48rem', letterSpacing:'.16em', color:T.textMuted, marginBottom:5 }}>
                  ELEMENTAL REACTION
                </div>
                <h3 className="el-rajdhani" style={{ fontSize:'2.2rem', fontWeight:700, color:reaction.color, lineHeight:1, textShadow:`0 0 30px ${reaction.color}88` }}>
                  {reaction.name}
                </h3>
              </div>
              <div style={{ marginLeft:'auto' }}>
                <div className="el-mono" style={{ padding:'6px 16px', borderRadius:50, border:`1px solid ${reaction.color}55`, background:`${reaction.color}18`, fontSize:'.54rem', letterSpacing:'.1em', color:reaction.color }}>
                  {reaction.mult}
                </div>
              </div>
            </div>

            <div style={{ height:1, background:`linear-gradient(90deg, ${reaction.color}88, transparent)`, marginBottom:16 }} />

            <p className="el-cormorant" style={{ fontSize:'1.14rem', color:T.textSecond, lineHeight:1.8, fontStyle:'italic' }}>
              {reaction.desc}
            </p>

            {selected && (
              <button className="el-back" onClick={() => setSelected(null)} style={{ marginTop:16 }}>
                UNPIN
              </button>
            )}
          </div>
        ) : (
          <div style={{ textAlign:'center', animation:'el-fadeIn .4s ease both' }}>
            <div style={{ fontSize:'3.6rem', marginBottom:14, opacity:.2 }}>⚗</div>
            <div className="el-mono" style={{ fontSize:'.54rem', letterSpacing:'.18em', color:T.textMuted }}>
              HOVER A CELL TO SEE THE REACTION
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

// ── VISIONS TAB ───────────────────────────────────────────────
const VISION_LORE = [
  { icon:'◈', heading:'What is a Vision?', color:'#c8a84a', body:"A Vision is a small gemstone-like object granted by the gods to mortals of exceptional ambition, will, or potential. It allows its bearer to wield elemental power — a fragment of the divine granted to those who dream fiercely enough. In Teyvat, receiving a Vision is considered proof of being chosen by fate itself." },
  { icon:'✦', heading:'The Grant of a Vision', color:'#a8d8ff', body:"No one knows exactly how Visions are granted. They appear spontaneously — often at a pivotal moment of resolve, loss, or breakthrough. A young swordsman who decides to challenge the strongest fighter in Mondstadt might awaken to find an Anemo Vision at his feet. A merchant who vows to save her family's failing trade finds a Geo Vision in her hand. The element chosen seems tied to the nature of the ambition." },
  { icon:'◎', heading:"Inazuma's Vision Hunt Decree", body:"Under the Electro Archon Ei's decree, all Visions in Inazuma were confiscated. Those stripped of their Visions became hollow — their ambitions erased, their personalities dulled, as if the Vision had been carrying a piece of their soul. This horror revealed that Visions are not just weapons but spiritual anchors for those who bear them.", color:'#c080ff' },
  { icon:'⚗', heading:'Gnosis vs Vision', color:'#88d840', body:"A Gnosis is categorically different from a Vision. Where a Vision grants an individual elemental power, a Gnosis connects an Archon directly to Celestia's divine mechanism — it is a piece of the world's engine. Zhongli described the Gnosis as a chess piece used to play a game he no longer wished to participate in. Its loss did not diminish his power; it merely ended his formal obligation to Celestia." },
  { icon:'☽', heading:'Visions and the Afterlife', color:'#f0c040', body:"In Teyvat's cosmology, mortals who bear Visions are said to be 'chosen by fate' and may ascend to Celestia after death. Those without Visions become fuel for the Ley Lines — their memories and energy absorbed into the world without leaving individual trace. The Archon War's survivors enshrined this hierarchy deliberately, using Visions as a promise of personal immortality to motivate exceptional mortals." },
  { icon:'✧', heading:'False Visions (Delusions)', color:'#ff4060', body:"The Fatui created artificial Vision-analogues called Delusions — devices that grant elemental power by consuming the user's lifespan. Delusions mimic Visions but at terrible cost: prolonged use accelerates aging and erodes the user's will. Scaramouche was the only person able to use a Delusion without deteriorating, because he was created without a human soul." },
]

function VisionsTab() {
  return (
    <div className="el-noscroll" style={{ overflowY:'auto', height:'100%' }}>
      <div style={{ width:'100%', display:'flex', flexDirection:'column', gap:16, paddingBottom:24 }}>
        {/* Hero */}
        <div style={{ textAlign:'center', padding:'32px 0 24px', animation:'el-fadeIn .5s ease both' }}>
          <div style={{ fontSize:'4rem', marginBottom:12, animation:'el-float 3s ease-in-out infinite', display:'inline-block' }}>◈</div>
          <h2 className="el-rajdhani" style={{ fontSize:'2rem', fontWeight:700, color:T.textPrimary, marginBottom:8 }}>Visions & Divine Sparks</h2>
          <p className="el-cormorant" style={{ fontSize:'1.05rem', color:T.textSecond, fontStyle:'italic', lineHeight:1.7 }}>
            "A Vision is proof that the gods have acknowledged a person's ambition — and extended them a chance at eternity."
          </p>
        </div>

        <div style={{ display:'flex', flexWrap:'wrap', gap:16, alignItems:'stretch' }}>
          {VISION_LORE.map((entry, i) => (
            <div key={i} className="el-detail"
              style={{ '--dc': entry.color+'44', padding:'20px 22px', animation:`el-fadeUp .4s ease both ${i * .07}s`, opacity:0, flex:'1 1 360px' }}
            >
              <div style={{ display:'flex', alignItems:'center', gap:10, marginBottom:10 }}>
                <div style={{ fontSize:'1.4rem', color:entry.color, textShadow:`0 0 20px ${entry.color}`, animation:'el-runeGlow 3s ease-in-out infinite', animationDelay:`${i*.4}s` }}>
                  {entry.icon}
                </div>
                <h3 className="el-rajdhani" style={{ fontWeight:700, fontSize:'.9rem', letterSpacing:'.06em', color:entry.color, margin:0 }}>
                  {entry.heading}
                </h3>
              </div>
              <p className="el-cormorant" style={{ fontSize:'.98rem', color:T.textSecond, lineHeight:1.76, margin:0 }}>
                {entry.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

// ── ELEMENTS TAB ──────────────────────────────────────────────
function ElementsTab() {
  const [selected, setSelected] = useState(null)

  return (
    <div style={{ height:'100%', overflow:'hidden', display:'flex', flexDirection:'column' }}>
      {selected ? (
        <div className="el-noscroll" style={{ overflowY:'auto', flex:1, animation:'el-scaleIn .3s ease both' }}>
          <ElementDetail el={selected} onClose={() => setSelected(null)} />
        </div>
      ) : (
        <div className="el-noscroll" style={{ overflowY:'auto', flex:1 }}>
          <div style={{
            display:'flex',
            flexDirection:'column',
            gap:16,
            height:'100%',
            minHeight:0,
            paddingBottom:24,
          }}>
            <div style={{
              display:'grid',
              gridTemplateColumns:'repeat(4, minmax(0, 1fr))',
              gap:16,
              flex:1,
              minHeight:0,
            }}>
              {ELEMENTS.slice(0, 4).map((el, i) => (
                <ElementCard key={el.id} el={el} index={i} onClick={setSelected} />
              ))}
            </div>

            <div style={{
              display:'grid',
              gridTemplateColumns:'repeat(3, minmax(0, 1fr))',
              gap:16,
              width:'75%',
              margin:'0 auto',
              flex:1,
              minHeight:0,
            }}>
              {ELEMENTS.slice(4).map((el, i) => (
                <ElementCard key={el.id} el={el} index={i + 4} onClick={setSelected} />
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

// ── ROOT ──────────────────────────────────────────────────────
export default function ElementsPage({ onBack }) {
  const [tab, setTab] = useState('elements')
  const TABS = [
    { id:'elements',  label:'ELEMENTS' },
    { id:'reactions', label:'REACTIONS' },
    { id:'visions',   label:'VISIONS' },
  ]

  return (
    <>
      <style>{CSS}</style>

      <div style={{
        position:'fixed', inset:0,
        background:T.bg,
        display:'flex', flexDirection:'column',
        overflow:'hidden',
        fontFamily:'sans-serif',
      }}>
        {/* Alchemical grid texture */}
        <div style={{ position:'absolute', inset:0, pointerEvents:'none', zIndex:0,
          backgroundImage:`
            linear-gradient(rgba(255,255,255,.015) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,.015) 1px, transparent 1px)`,
          backgroundSize:'60px 60px',
        }} />

        {/* Atmospheric orbs */}
        <div style={{ position:'absolute', top:'10%', left:'5%', width:400, height:400, borderRadius:'50%', background:'radial-gradient(circle, rgba(192,128,255,.04) 0%, transparent 70%)', pointerEvents:'none', zIndex:0 }} />
        <div style={{ position:'absolute', bottom:'15%', right:'8%', width:300, height:300, borderRadius:'50%', background:'radial-gradient(circle, rgba(77,184,255,.04) 0%, transparent 70%)', pointerEvents:'none', zIndex:0 }} />

        {/* ── TOP BAR ── */}
        <div style={{
          flexShrink:0, position:'relative', zIndex:10,
          display:'flex', alignItems:'center', justifyContent:'space-between',
          padding:'14px 28px 0',
          animation:'el-fadeIn .4s ease both',
        }}>
          <button className="el-back" onClick={onBack}>← WORLD HUB</button>

          <div style={{ display:'flex', alignItems:'center', gap:8 }}>
            <div className="el-mono" style={{ fontSize:'.42rem', letterSpacing:'.22em', color:T.textMuted }}>
              ELEMENTAL CODEX
            </div>
            <div style={{ fontSize:'.9rem', animation:'el-glow 2s ease-in-out infinite', color:T.gold }}>⚗</div>
          </div>

          <div className="el-mono" style={{ fontSize:'.4rem', letterSpacing:'.14em', color:T.textMuted }}>
            {ELEMENTS.length} ELEMENTS · {Object.keys(REACTIONS).length / 2 | 0}+ REACTIONS
          </div>
        </div>

        {/* ── PAGE TITLE ── */}
        <div style={{ flexShrink:0, padding:'18px 28px 0', position:'relative', zIndex:10, animation:'el-fadeUp .45s ease both .1s', opacity:0 }}>
          <div className="el-mono" style={{ fontSize:'.38rem', letterSpacing:'.24em', color:T.textMuted, marginBottom:4 }}>
            SEPTEM ELEMENTA
          </div>
          <h1 className="el-cormorant" style={{ fontSize:'clamp(1.8rem,4vw,3rem)', fontWeight:700, color:T.textPrimary, lineHeight:1, margin:'0 0 2px' }}>
            Elements &amp; Reactions
          </h1>
          <p className="el-cormorant" style={{ fontSize:'1rem', fontStyle:'italic', color:T.textSecond }}>
            Seven forces that govern all things in Teyvat — and the alchemy of their collision.
          </p>
        </div>

        {/* ── TABS ── */}
        <div style={{ flexShrink:0, padding:'16px 28px 0', borderBottom:`1px solid ${T.border}`, position:'relative', zIndex:10, display:'flex', gap:4, animation:'el-fadeIn .4s ease both .2s', opacity:0 }}>
          {TABS.map(t => (
            <button key={t.id} className={`el-tab ${tab === t.id ? 'active' : ''}`} onClick={() => setTab(t.id)}>
              {t.label}
            </button>
          ))}
        </div>

        {/* ── TAB BODY ── */}
        <div style={{ flex:1, overflow:'hidden', position:'relative', zIndex:5, padding:'22px 28px' }}>
          {tab === 'elements'  && <ElementsTab />}
          {tab === 'reactions' && <ReactionsTab />}
          {tab === 'visions'   && <VisionsTab />}
        </div>
      </div>
    </>
  )
}