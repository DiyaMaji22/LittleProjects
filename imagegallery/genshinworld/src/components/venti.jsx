import React, { useState, useEffect } from 'react'

// ─── Import your character images here ───
import ventiImg   from '../assets/venti.png'
import zhongliImg from '../assets/zhongli.webp'
// Add more: import raidenImg from '../assets/raiden.png'
// import nahidaImg from '../assets/nahida.png'
import raidenImg from '../assets/raiden.jpg'
import nahidaImg from '../assets/nahida.jpg'
import furinaImg from '../assets/furina.jpeg'
import mauvikaImg from '../assets/mauvika.jpeg'
const css = `
  @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;600;700;900&family=Crimson+Pro:ital,wght@0,300;0,400;0,600;1,300;1,400&family=Share+Tech+Mono&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  @keyframes fadeSlideUp {
    from { opacity: 0; transform: translateY(22px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  @keyframes fadeSlideLeft {
    from { opacity: 0; transform: translateX(30px); }
    to   { opacity: 1; transform: translateX(0); }
  }
  @keyframes imgReveal {
    from { opacity: 0; transform: scale(1.05) translateX(20px); }
    to   { opacity: 1; transform: scale(1) translateX(0); }
  }
  @keyframes lineGrow {
    from { width: 0; opacity: 0; }
    to   { width: 100%; opacity: 1; }
  }
  @keyframes barFill {
    from { width: 0; } to { width: var(--w); }
  }
  @keyframes starTwinkle {
    0%,100% { opacity: 0.25; transform: scale(1); }
    50%      { opacity: 0.9;  transform: scale(1.6); }
  }
  @keyframes particleRise {
    0%   { opacity: 0; transform: translateY(0) translateX(0); }
    12%  { opacity: 0.8; }
    88%  { opacity: 0.3; }
    100% { opacity: 0; transform: translateY(-160px) translateX(var(--pdx)); }
  }
  @keyframes orbFloat {
    0%,100% { transform: translateY(0) rotate(0deg); opacity: 0.7; }
    50%      { transform: translateY(-14px) rotate(180deg); opacity: 1; }
  }
  @keyframes ringPulse {
    0%   { transform: scale(1);   opacity: 0.6; }
    100% { transform: scale(2.5); opacity: 0; }
  }
  @keyframes scanline {
    from { transform: translateY(-100vh); }
    to   { transform: translateY(100vh); }
  }
  @keyframes navBtnGlow {
    0%,100% { box-shadow: 0 0 12px var(--nc), 0 0 24px var(--nc-dim); }
    50%      { box-shadow: 0 0 22px var(--nc), 0 0 44px var(--nc-far); }
  }
  @keyframes portraitFloat {
    0%,100% { transform: translateY(0px) rotate(0deg); }
    33%      { transform: translateY(-8px) rotate(-0.4deg); }
    66%      { transform: translateY(-4px) rotate(0.4deg); }
  }
  @keyframes bgTransition {
    from { opacity: 0; }
    to   { opacity: 1; }
  }
  @keyframes shimmerSweep {
    from { left: -80%; }
    to   { left: 130%; }
  }
  @keyframes tagPop {
    0%   { opacity: 0; transform: scale(0.7) translateY(5px); }
    70%  { transform: scale(1.05); }
    100% { opacity: 1; transform: scale(1) translateY(0); }
  }

  .cinzel  { font-family: 'Cinzel', serif; }
  .crimson { font-family: 'Crimson Pro', serif; }
  .mono    { font-family: 'Share Tech Mono', monospace; }

  .nav-btn {
    position: relative; overflow: hidden;
    display: flex; align-items: center; gap: 8px;
    padding: 12px 24px;
    border: 1.5px solid;
    background: rgba(0,0,0,0.4);
    backdrop-filter: blur(14px);
    font-family: 'Cinzel', serif;
    font-size: 0.7rem; font-weight: 700;
    letter-spacing: 0.18em;
    cursor: pointer;
    clip-path: polygon(10px 0,100% 0,calc(100% - 10px) 100%,0 100%);
    transition: all 0.22s;
  }
  .nav-btn::after {
    content: '';
    position: absolute; top: -50%; left: -60%;
    width: 38%; height: 200%;
    background: linear-gradient(90deg,transparent,rgba(255,255,255,0.18),transparent);
    transform: skewX(-18deg);
    transition: left 0.4s;
  }
  .nav-btn:hover::after { left: 130%; }

  .stat-bar-track {
    height: 4px; border-radius: 2px;
    background: rgba(255,255,255,0.08);
    overflow: hidden;
  }
  .stat-bar-fill {
    height: 100%; border-radius: 2px;
    animation: barFill 1.1s ease-out both;
  }

  .ability-card {
    border: 1px solid rgba(255,255,255,0.12);
    background: rgba(0,0,0,0.3);
    backdrop-filter: blur(10px);
    transition: all 0.22s;
    cursor: default;
    position: relative; overflow: hidden;
  }
  .ability-card::before {
    content: '';
    position: absolute; top: 0; left: 0; right: 0; height: 1px;
    background: linear-gradient(90deg,transparent,var(--ac),transparent);
    opacity: 0.6;
  }
  .ability-card:hover {
    border-color: rgba(255,255,255,0.25);
    background: rgba(255,255,255,0.08);
    transform: translateY(-2px);
  }

  /* Custom scrollbar hiding */
  .no-scrollbar::-webkit-scrollbar {
    display: none;
  }
  .no-scrollbar {
    -ms-overflow-style: none;
    scrollbar-width: none;
  }
`;

// ─── CHARACTER DATABASE ───
// Replace image imports and add your actual characters
const CHARACTERS = [
  {
    id: "venti",
    name: "Venti",
    title: "Venti · Wine-Sighted Bard",
    archon: "Barbatos",
    region: "Mondstadt",
    vision: "Anemo",
    weapon: "Bow",
    rarity: 5,
    constellation: "Carmen Dei",
    img: ventiImg,
    accent: "#72d9c0",
    accentDim: "rgba(114,217,192,0.35)",
    accentFar: "rgba(114,217,192,0.12)",
    starColor: "#b0fff0",
    bg: "radial-gradient(ellipse 90% 80% at 60% 40%, #041a14 0%, #021008 45%, #010806 100%)",
    overlayLeft: "linear-gradient(to right, rgba(2,8,6,0.96) 0%, rgba(2,8,6,0.75) 40%, rgba(2,8,6,0.25) 65%, transparent 100%)",
    overlayBottom: "linear-gradient(to top, rgba(2,8,6,0.9) 0%, rgba(2,8,6,0.35) 30%, transparent 65%)",
    particleColor: "rgba(114,217,192,0.75)",
    particleSymbols: ["♪", "♫", "✦", "♬", "◆"],
    quote: "\"Come on, Traveler, let's go! The world is full of songs we haven't heard yet.\"",
    lore: "A carefree, wine-loving bard who wanders the streets of Mondstadt. He is actually the mortal vessel of Barbatos, the Anemo Archon. 2,600 years ago, he led the revolution that freed Mondstadt from the tyrant Decarabian, establishing a land where 'freedom' is the only law.",
    stats: [
        { label: "EM",    val: 95, color: "#72d9c0" },
        { label: "ER",    val: 85, color: "#8aeedc" },
        { label: "CC",    val: 100, color: "#50b09a" },
        { label: "ATK",   val: 70, color: "#b0fff0" },
    ],
    abilities: [
        { name: "Skyward Sonnet", type: "Elemental Skill", desc: "Summons a Wind Domain at the enemy's location that deals AoE Anemo DMG and launches them into the air. Holding the skill summons a larger domain around Venti and creates an upcurrent for gliding." },
        { name: "Wind's Grand Ode", type: "Elemental Burst", desc: "Fires an arrow that creates a massive Stormeye. It sucks in nearby objects and enemies, dealing continuous Anemo DMG. If it comes into contact with Hydro/Pyro/Cryo/Electro, it deals additional Elemental DMG of that type." },
        { name: "Stormeye", type: "Passive", desc: "Regenerates 15 Energy to Venti after the effects of Wind's Grand Ode end. If an Elemental Absorption occurred, it also restores 15 Energy to all party members of that absorbed element." },
    ],
    tags: ["Crowd Control", "Battery", "Anemo Enabler", "Exploration"],
},
  {
    id: "zhongli",
    name: "Zhongli",
    title: "Zhongli · Vago Mundo",
    archon: "Morax",
    region: "Liyue",
    vision: "Geo",
    weapon: "Polearm",
    rarity: 5,
    constellation: "Lapis Dei",
    img: zhongliImg,
    accent: "#E2AD5C",
    accentDim: "rgba(226,173,92,0.35)",
    accentFar: "rgba(226,173,92,0.12)",
    starColor: "#FFE699",
    bg: "radial-gradient(ellipse 90% 80% at 60% 40%, #1a150b 0%, #100c06 45%, #080603 100%)",
    overlayLeft: "linear-gradient(to right, rgba(12,10,6,0.96) 0%, rgba(12,10,6,0.75) 40%, rgba(12,10,6,0.25) 65%, transparent 100%)",
    overlayBottom: "linear-gradient(to top, rgba(12,10,6,0.9) 0%, rgba(12,10,6,0.35) 30%, transparent 65%)",
    particleColor: "rgba(226,173,92,0.75)",
    particleSymbols: ["🔶", "◇", "⟡", "✦", "▪"],
    quote: "\"Osmanthus wine tastes the same as I remember... but where are those who share the memory?\"",
    lore: "The consultant of the Wangsheng Funeral Parlor who is actually the vessel for the Geo Archon, Morax. Having reigned over Liyue for millennia as the God of Contracts, he staged his own 'death' to test if his city was ready to move into the age of mortals.",
    stats: [
        { label: "HP",    val: 100, color: "#E2AD5C" },
        { label: "ATK",   val: 60, color: "#D19B4C" },
        { label: "DEF",   val: 85, color: "#BF8A3D" },
        { label: "SHIELD", val: 99, color: "#E2AD5C" },
    ],
    abilities: [
        { name: "Dominus Lapidis", type: "Elemental Skill", desc: "Creates a Jade Shield that possesses 150% DMG Absorption against all Elemental and Physical DMG. Additionally, characters protected by the shield decrease the Elemental and Physical RES of opponents in a small AoE by 20%." },
        { name: "Planet Befall", type: "Elemental Burst", desc: "Summons a falling meteor that deals massive Geo DMG to opponents caught in its AoE and applies the Petrification status to them, rendering them unable to move." },
        { name: "Dominance of Earth", type: "Passive", desc: "Zhongli deals bonus DMG based on his Max HP, including his Normal Attacks, Stone Stele resonance, and Planet Befall DMG." },
    ],
    tags: ["Shielder", "Universal Shred", "CC", "Geo Construct"],
},
  {
    id: "raiden",
    name: "Raiden Shogun",
    title: "Raiden Shogun · Plane of Euthymia",
    archon: "Beelzebul", 
    region: "Inazuma",
    vision: "Electro",
    weapon: "Polearm",
    rarity: 5,
    constellation: "Imperatrix Umbrosa",
    img: raidenImg,
    accent: "#b06aff",
    accentDim: "rgba(176,106,255,0.35)",
    accentFar: "rgba(176,106,255,0.12)",
    starColor: "#e0a0ff",
    bg: "radial-gradient(ellipse 90% 80% at 60% 40%, #1e0f2c 0%, #12081a 45%, #080409 100%)",
    overlayLeft: "linear-gradient(to right, rgba(24,12,9,0.96) 0%, rgba(24,12,9,0.75) 40%, rgba(24,12,9,0.25) 65%, transparent 100%)",
    overlayBottom: "linear-gradient(to top, rgba(24,12,9,0.9) 0%, rgba(24,12,9,0.35) 30%, transparent 65%)",
    particleColor: "rgba(176,106,255,0.75)",
    particleSymbols: ["⚡", "✦", "◆", "⟡", "▪"],
    quote: "\"Inactivity serves no purpose whatsoever. Hmph. Tell me, what is it you wish to do?\"",
    lore: "The Almighty Shogun, the undisputed ruler of Inazuma. While the puppet Shogun governs the nation, the true Electro Archon, Ei (Beelzebul), meditates within the Plane of Euthymia. Seeking to preserve an 'Eternity' that never changes, she once isolated her nation from the world.",
    stats: [
        { label: "HP",    val: 80, color: "#b06aff" },
        { label: "ATK",   val: 85, color: "#b06aff" },
        { label: "ER",    val: 150, color: "#b06aff" },
        { label: "CRIT",  val: 60, color: "#b06aff" },
    ],
    abilities: [
        { name: "Transcendence: Baleful Omen", type: "Elemental Skill", desc: "Unveils the Eye of Stormy Judgment, dealing Electro DMG and performing coordinated attacks. It also increases the Elemental Burst DMG of all party members based on their Burst's Energy cost." },
        { name: "Secret Art: Musou Shinsetsu", type: "Elemental Burst", desc: "Unleashes the Musou no Hitotachi, dealing massive AoE Electro DMG and entering the Musou Isshin state. While in this state, Raiden uses her Tachi and regenerates Energy for all nearby party members when she hits enemies." },
        { name: "Enlightened One", type: "Passive", desc: "Each 1% above 100% Energy Recharge that the Raiden Shogun possesses grants her 0.6% greater Energy restoration from Musou Isshin and 0.4% Electro DMG Bonus." },
    ],
    tags: ["Burst DPS", "Battery", "Electro Enabler", "Buffer"],
},
  {
    id: "nahida",
    name: "Nahida",
    title: "Nahida · Physic of Purity",
    archon: "Buer",
    region: "Sumeru",
    vision: "Dendro",
    weapon: "Catalyst",
    rarity: 5,
    constellation: "Sapientia Oromasdis",
    img: nahidaImg,
    accent: "#7acb5a",
    accentDim: "rgba(122,203,90,0.35)",
    accentFar: "rgba(122,203,90,0.12)",
    starColor: "#a0e6a8",
    bg: "radial-gradient(ellipse 90% 80% at 60% 40%, #12210c 0%, #0a1306 45%, #050903 100%)",
    overlayLeft: "linear-gradient(to right, rgba(18,33,12,0.96) 0%, rgba(18,33,12,0.75) 40%, rgba(18,33,12,0.25) 65%, transparent 100%)",
    overlayBottom: "linear-gradient(to top, rgba(18,33,12,0.9) 0%, rgba(18,33,12,0.35) 30%, transparent 65%)",
    particleColor: "rgba(122,203,90,0.75)",
    particleSymbols: ["🌿", "✦", "◆", "⟡", "▪"],
    quote: "\"The world is but a dream, and I am the one who must wake it.\"",
    lore: "Known as Lesser Lord Kusanali and the avatar of Irminsul, Nahida is the Dendro Archon (Buer). After being confined in the Sanctuary of Surasthana for centuries, she was freed by the Traveler. She now guides Sumeru with her vast wisdom, acting as the moon that reflects the sun's light.",
    stats: [
        { label: "HP",    val: 70, color: "#7acb5a" },
        { label: "ATK",   val: 65, color: "#7acb5a" },
        { label: "EM",    val: 150, color: "#7acb5a" },
        { label: "CRIT",  val: 80, color: "#7acb5a" },
    ],
    abilities: [
        { name: "All Schemes to Know", type: "Elemental Skill", desc: "Enters an aiming mode to mark enemies with the Seed of Skandha. Marked enemies are linked; triggering Elemental Reactions on them deals Tri-Karma Purification Dendro DMG based on Nahida's ATK and EM." },
        { name: "Illusory Heart", type: "Elemental Burst", desc: "Manifests the Shrine of Maya. Depending on the Elements present in the party (Pyro, Electro, Hydro), provides various buffs to the Tri-Karma Purification effects while within the field." },
        { name: "Compassion Illuminated", type: "Passive", desc: "When unleashing Illusory Heart, the Shrine of Maya will increase the active character's Elemental Mastery by 25% of the EM of the party member with the highest EM (up to 250 EM)." },
    ],
    tags: ["Sub-DPS", "Dendro Application", "EM Buffer", "Enabler"],
},
  {
    id: "furina",
    name: "Furina",
    title: "Furina · Soloist of Solitary Eternity",
    archon: "Focalors",
    region: "Fontaine",
    vision: "Hydro",
    weapon: "Sword",
    rarity: 5,
    constellation: "Animula Choragi",
    img: furinaImg,
    accent: "#4fa0ff",
    accentDim: "rgba(79,160,255,0.35)",
    accentFar: "rgba(79,160,255,0.12)",
    starColor: "#a0d4ff",
    bg: "radial-gradient(ellipse 90% 80% at 60% 40%, #0b1a2c 0%, #050d16 45%, #020608 100%)",
    overlayLeft: "linear-gradient(to right, rgba(11,26,44,0.96) 0%, rgba(11,26,44,0.75) 40%, rgba(11,26,44,0.25) 65%, transparent 100%)",
    overlayBottom: "linear-gradient(to top, rgba(11,26,44,0.9) 0%, rgba(11,26,44,0.35) 30%, transparent 65%)",
    particleColor: "rgba(79,160,255,0.75)",
    particleSymbols: ["💧", "✦", "◆", "⟡", "▪"],
    quote: "\"The world is but a stage, and I shall be its most dazzling star!\"",
    lore: "The former Hydro Archon who spent 500 years playing a part to save Fontaine from a prophecy of ruin. Now a celebrated performer, Furina has regained her freedom and lives as a human, though she still commands the power of the tides through her vision and the memories of Focalors.",
    stats: [
        { label: "HP",    val: 95, color: "#4fa0ff" },
        { label: "ATK",   val: 65, color: "#4fa0ff" },
        { label: "ER",    val: 85, color: "#4fa0ff" },
        { label: "CRIT",  val: 70, color: "#4fa0ff" },
    ],
    abilities: [
        { name: "Salon Solitaire", type: "Elemental Skill", desc: "Invites the Salon Members (Ousia) to attack enemies and drain party HP, or the Singer of Many Waters (Pneuma) to heal the active character." },
        { name: "Let the People Rejoice", type: "Elemental Burst", desc: "Creates a stage of foam that causes the party to enter the Universal Revelry state, granting DMG bonuses based on HP changes (Fanfare)." },
        { name: "Endless Waltz", type: "Passive", desc: "When the active character receives healing from a source other than Furina and is already at full HP, Furina will heal nearby party members over time." },
    ],
    tags: ["Support", "Off-field DPS", "Buff", "Healer"],
},
  
    {
    id: "mavuika",
    name: "Mavuika",
    title: "Mavuika · Kiongozi",
    archon: "Haborym",
    region: "Natlan",
    vision: "Pyro",
    weapon: "Claymore",
    rarity: 5,
    constellation: "Ignis Dea",
    img: mauvikaImg, // Make sure to update your variable name if it was mauvikaImg
    accent: "#ff6a6a",
    accentDim: "rgba(255,106,106,0.35)",
    accentFar: "rgba(255,106,106,0.12)",
    starColor: "#ffb0b0",
    bg: "radial-gradient(ellipse 90% 80% at 60% 40%, #2c0b0b 0%, #160505 45%, #080202 100%)",
    overlayLeft: "linear-gradient(to right, rgba(44,11,11,0.96) 0%, rgba(44,11,11,0.75) 40%, rgba(44,11,11,0.25) 65%, transparent 100%)",
    overlayBottom: "linear-gradient(to top, rgba(44,11,11,0.9) 0%, rgba(44,11,11,0.35) 30%, transparent 65%)",
    particleColor: "rgba(255,106,106,0.75)",
    particleSymbols: ["🔥", "✦", "◆", "⟡", "▪"],
    quote: "\"A warrior should always feel fortunate to meet their match on the battlefield.\"",
    lore: "Mavuika is the current Pyro Archon of Natlan, governing under the divine name Haborym. Originally a human who claimed the Archon's seat through a martial tournament, she sacrificed her life 500 years ago to the Sacred Flame to save Natlan from the Abyss, resurrecting in the present era to lead her people to victory.",
    stats: [
        { label: "HP",    val: 92, color: "#ff6a6a" },
        { label: "ATK",   val: 95, color: "#ff6a6a" },
        { label: "CRIT",  val: 80, color: "#ff6a6a" },
        { label: "ER",    val: 75, color: "#ff6a6a" },
    ],
    abilities: [
        { name: "The Named Moment", type: "Elemental Skill", desc: "Summons a Flamestrider and Ring of Searing Radiance, dealing Nightsoul-aligned AoE Pyro DMG and performing coordinated attacks alongside the active character." },
        { name: "Hour of Burning Skies", type: "Elemental Burst", desc: "Consumes accumulated Fighting Spirit to unleash a devastating Sunfell Slice from her Flamestrider, dealing massive Nightsoul-aligned AoE Pyro DMG." },
        { name: "Gift of Flaming Flowers", type: "Passive", desc: "When a nearby party member triggers a Nightsoul Burst, Mavuika's ATK increases by 30% for 10s." },
    ],
    tags: ["Main DPS", "Sub-DPS", "Pyro Application", "Nightsoul"],


  }
];

// ─── Stars ───
const STARS = Array.from({ length: 65 }, (_, i) => ({
  id: i, x: Math.random()*100, y: Math.random()*100,
  s: 0.8+Math.random()*1.8,
  dur: `${2+Math.random()*3}s`, del: `${Math.random()*5}s`,
}));

// ─── Floating particles ───
function Particles({ char }) {
  const p = Array.from({ length: 18 }, (_, i) => ({
    id: i,
    sym: char.particleSymbols[i % char.particleSymbols.length],
    l: `${8 + Math.random()*55}%`,
    t: `${50 + Math.random()*45}%`,
    dur: `${5+Math.random()*6}s`,
    del: `${Math.random()*7}s`,
    dx: `${(Math.random()-0.5)*120}px`,
    sz: 8+Math.random()*10,
  }));
  return (
    <div style={{ position:"absolute", inset:0, pointerEvents:"none", overflow:"hidden" }}>
      {p.map(pt => (
        <div key={pt.id} style={{
          position:"absolute", left:pt.l, top:pt.t,
          fontSize:pt.sz, color:char.particleColor, opacity:0,
          animation:`particleRise ${pt.dur} ease-in-out infinite ${pt.del}`,
          "--pdx": pt.dx,
          filter:`drop-shadow(0 0 5px ${char.accent})`,
        }}>{pt.sym}</div>
      ))}
    </div>
  );
}

// ─── Star field ───
function StarField() {
  return (
    <div style={{ position:"absolute", inset:0, pointerEvents:"none" }}>
      {STARS.map(s => (
        <div key={s.id} style={{
          position:"absolute", left:`${s.x}%`, top:`${s.y}%`,
          width:s.s, height:s.s, borderRadius:"50%", background:"#fff",
          animation:`starTwinkle ${s.dur} ease-in-out infinite ${s.del}`,
        }} />
      ))}
    </div>
  );
}

// ─── Stat bar ───
function StatBar({ label, val, color, delay }) {
  return (
    <div style={{ marginBottom: 10 }}>
      <div style={{ display:"flex", justifyContent:"space-between", marginBottom:4 }}>
        <span className="mono" style={{ fontSize:"0.57rem", letterSpacing:"0.16em", color:"rgba(255,255,255,0.42)" }}>{label}</span>
        <span className="mono" style={{ fontSize:"0.57rem", color, textShadow:`0 0 6px ${color}` }}>{val}</span>
      </div>
      <div className="stat-bar-track">
        <div
          className="stat-bar-fill"
          style={{
            "--w": `${val}%`, width:`${val}%`,
            background:`linear-gradient(90deg,${color}77,${color})`,
            boxShadow:`0 0 7px ${color}`,
            animationDelay: delay,
          }}
        />
      </div>
    </div>
  );
}

// ─── Star rating ───
function Stars({ count, color }) {
  return (
    <div style={{ display:"flex", gap:3 }}>
      {Array.from({ length: count }).map((_, i) => (
        <svg key={i} width="14" height="14" viewBox="0 0 24 24" style={{ fill: color }}>
          <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26"/>
        </svg>
      ))}
    </div>
  );
}


const Venti = () => {
  const [idx, setIdx] = useState(0);
  const [animating, setAnimating] = useState(false);
  const [contentKey, setContentKey] = useState(0);
  const [dir, setDir] = useState("right"); // for slide direction

  const char = CHARACTERS[idx];
  const total = CHARACTERS.length;

  const goTo = (newIdx, direction = "right") => {
    if (animating || newIdx === idx) return;
    setDir(direction);
    setAnimating(true);
    setTimeout(() => {
      setIdx(newIdx);
      setContentKey(k => k + 1);
      setAnimating(false);
    }, 360);
  };

  const prev = () => goTo((idx - 1 + total) % total, "left");
  const next = () => goTo((idx + 1) % total, "right");

  useEffect(() => {
    const fn = (e) => {
      if (e.key === "ArrowLeft")  prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", fn);
    return () => window.removeEventListener("keydown", fn);
  }, [idx, animating]);

  return (
    <>
      <style>{css}</style>

      {/* ── FULL SCREEN SHELL ── */}
      <div style={{
        position:"fixed", inset:0, overflow:"hidden",
        background: char.bg,
        transition:"background 0.9s ease",
      }}>

        {/* ── BACKGROUND CHARACTER IMAGE ── */}
        {CHARACTERS.map((c, i) => (
          <div key={c.id} style={{
            position:"absolute", inset:0,
            opacity: i === idx ? (animating ? 0 : 1) : 0,
            transition:"opacity 0.5s ease",
            pointerEvents:"none",
          }}>
            <img
              src={c.img}
              alt={c.name}
              style={{
                position:"absolute",
                inset: 0,
                width: "100%",
                height: "100%",
                objectFit: "cover",
                objectPosition: "center",
                opacity: 0.8,
                animation: i === idx && !animating ? "bgTransition 0.7s ease both" : "none",
              }}
            />
          </div>
        ))}

        {/* ── CHARACTER GLOW AURA (behind the image) ── */}
        <div style={{
          position:"absolute",
          right:"5%", bottom:"0%",
          width:"45%", height:"90%",
          background:`radial-gradient(ellipse 60% 80% at 60% 80%, ${char.accent}18 0%, transparent 65%)`,
          pointerEvents:"none", zIndex:1,
          transition:"background 0.8s ease",
        }} />

        {/* ── LEFT DARK GRADIENT (readability) ── */}
        <div style={{
          position:"absolute", inset:0, zIndex:2, pointerEvents:"none",
          background: char.overlayLeft,
          transition:"background 0.8s ease",
        }} />

        {/* ── BOTTOM GRADIENT ── */}
        <div style={{
          position:"absolute", inset:0, zIndex:2, pointerEvents:"none",
          background: char.overlayBottom,
          transition:"background 0.8s ease",
        }} />

        {/* ── TOP GRADIENT ── */}
        <div style={{
          position:"absolute", top:0, left:0, right:0, height:160,
          background:"linear-gradient(to bottom,rgba(0,0,0,0.65),transparent)",
          zIndex:2, pointerEvents:"none",
        }} />

        {/* ── SCANLINE ── */}
        <div style={{
          position:"absolute", left:0, right:0, height:2, zIndex:3, pointerEvents:"none",
          background:"linear-gradient(transparent,rgba(255,255,255,0.05),transparent)",
          animation:"scanline 9s linear infinite",
        }} />

        {/* ── STAR FIELD ── */}
        <div style={{ position:"absolute", inset:0, zIndex:1, pointerEvents:"none" }}>
          <StarField />
        </div>

        {/* ── PARTICLES ── */}
        <div style={{ position:"absolute", inset:0, zIndex:3, pointerEvents:"none" }}>
          <Particles key={idx} char={char} />
        </div>

        {/* ── BIG BACKGROUND SYMBOL ── */}
        <div style={{
          position:"absolute", right:"-3%", top:"50%", transform:"translateY(-50%)",
          fontSize:"clamp(220px,35vw,480px)",
          color: char.accent, opacity:0.035,
          fontFamily:"serif", lineHeight:1,
          pointerEvents:"none", zIndex:1,
          transition:"color 0.8s ease",
          userSelect:"none",
        }}>✦</div>

        {}
        <div style={{
          position:"absolute", top:0, left:0, right:0,
          display:"flex", alignItems:"center", justifyContent:"space-between",
          padding:"20px 38px",
          zIndex:20,
        }}>
          {/* Logo */}
          <div style={{ display:"flex", alignItems:"center", gap:10 }}>
            <div style={{
              width:30, height:30, borderRadius:"50%",
              border:`1.5px solid ${char.accent}66`,
              background:`${char.accent}15`,
              display:"flex", alignItems:"center", justifyContent:"center",
              fontSize:12, color:char.accent,
              transition:"all 0.5s",
            }}>✦</div>
            <div>
              <div className="cinzel" style={{ fontSize:"0.62rem", letterSpacing:"0.2em", color:char.accent, textShadow:`0 0 8px ${char.accentDim}` }}>
                GENSHIN IMPACT
              </div>
              <div className="mono" style={{ fontSize:"0.46rem", color:"rgba(255,255,255,0.25)", letterSpacing:"0.15em" }}>
                CHARACTER ARCHIVE
              </div>
            </div>
          </div>

          {/* Page dots */}
          <div style={{ display:"flex", gap:8, alignItems:"center" }}>
            {CHARACTERS.map((c, i) => (
              <button
                key={c.id}
                onClick={() => goTo(i, i > idx ? "right" : "left")}
                style={{
                  height:7, width: i === idx ? 24 : 7,
                  borderRadius:4, border:"none", padding:0, cursor:"pointer",
                  background: i === idx ? char.accent : "rgba(255,255,255,0.22)",
                  boxShadow: i === idx ? `0 0 10px ${char.accentDim}` : "none",
                  transition:"all 0.35s cubic-bezier(.34,1.3,.64,1)",
                }}
              />
            ))}
          </div>

          {/* Counter */}
          <div className="mono" style={{ fontSize:"0.55rem", color:"rgba(255,255,255,0.28)", letterSpacing:"0.14em" }}>
            {String(idx+1).padStart(2,"0")} / {String(total).padStart(2,"0")}
          </div>
        </div>

        {}
        <div
          key={contentKey}
          className="no-scrollbar"
          style={{
            position:"absolute", left:0, top:0, bottom:0,
            width:"clamp(330px,44%,520px)",
            display:"flex", flexDirection:"column", justifyContent:"flex-start",
            padding:"60px 44px 100px",
            zIndex:10,
            opacity: animating ? 0 : 1,
            transform: animating
              ? `translateX(${dir === "right" ? "-24px" : "24px"})`
              : "translateX(0)",
            transition:"opacity 0.32s ease, transform 0.32s ease",
            overflowY: "auto",
            maxHeight: "100vh",
          }}
        >
          {/* Region + Vision badges */}
          <div style={{ display:"flex", gap:8, marginBottom:4, flexWrap:"wrap" }}>
            <div style={{
              padding:"4px 14px",
              border:`1px solid ${char.accent}66`,
              background:`${char.accent}15`,
              backdropFilter:"blur(8px)",
              clipPath:"polygon(6px 0,100% 0,calc(100% - 6px) 100%,0 100%)",
              animation:"fadeSlideUp 0.5s ease both 0.05s",
              opacity:0,
            }}>
              <span className="cinzel" style={{ fontSize:"0.6rem", letterSpacing:"0.22em", color:char.accent, textShadow:`0 0 8px ${char.accent}` }}>
                {char.region.toUpperCase()}
              </span>
            </div>
            <div style={{
              padding:"4px 14px",
              border:"1px solid rgba(255,255,255,0.18)",
              background:"rgba(255,255,255,0.06)",
              backdropFilter:"blur(8px)",
              clipPath:"polygon(6px 0,100% 0,calc(100% - 6px) 100%,0 100%)",
              animation:"fadeSlideUp 0.5s ease both 0.1s",
              opacity:0,
            }}>
              <span className="cinzel" style={{ fontSize:"0.6rem", letterSpacing:"0.22em", color:"rgba(255,255,255,0.6)" }}>
                {char.vision.toUpperCase()} · {char.weapon.toUpperCase()}
              </span>
            </div>
          </div>

          {/* Name with Navigation */}
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4, animation: "fadeSlideUp 0.55s ease both 0.15s", opacity: 0 }}>
            <button
               onClick={prev}
               style={{
                 minWidth: 40, width: 40, height: 40, borderRadius: "50%",
                 border: `1px solid ${char.accent}`,
                 background: "rgba(0,0,0,0.2)",
                 color: char.accent, fontSize: "1.2rem",
                 display: "flex", alignItems: "center", justifyContent: "center",
                 cursor: "pointer", transition: "all 0.2s",
                 boxShadow: `0 0 10px ${char.accent}33`,
                 flexShrink: 0,
               }}
               onMouseEnter={e => { e.currentTarget.style.background = `${char.accent}22`; e.currentTarget.style.transform = "scale(1.1)"; }}
               onMouseLeave={e => { e.currentTarget.style.background = "rgba(0,0,0,0.2)"; e.currentTarget.style.transform = "scale(1)"; }}
               title="Previous Character"
            >❮</button>

            <h1 className="cinzel" style={{
              fontSize:"clamp(2.8rem,5vw,4.2rem)",
              fontWeight:900, lineHeight:1.0, color:"#fff",
              textShadow:`0 0 30px ${char.accent}66, 0 0 60px ${char.accent}33`,
              margin: 0,
              textAlign: "center",
            }}>
              {char.name}
            </h1>

            <button
               onClick={next}
               style={{
                 minWidth: 40, width: 40, height: 40, borderRadius: "50%",
                 border: `1px solid ${char.accent}`,
                 background: "rgba(0,0,0,0.2)",
                 color: char.accent, fontSize: "1.2rem",
                 display: "flex", alignItems: "center", justifyContent: "center",
                 cursor: "pointer", transition: "all 0.2s",
                 boxShadow: `0 0 10px ${char.accent}33`,
                 flexShrink: 0,
               }}
               onMouseEnter={e => { e.currentTarget.style.background = `${char.accent}22`; e.currentTarget.style.transform = "scale(1.1)"; }}
               onMouseLeave={e => { e.currentTarget.style.background = "rgba(0,0,0,0.2)"; e.currentTarget.style.transform = "scale(1)"; }}
               title="Next Character"
            >❯</button>
          </div>

          {/* Title */}
          <div className="cinzel" style={{
            fontSize:"0.85rem", fontWeight:400,
            letterSpacing:"0.22em", color:`${char.accent}cc`,
            textShadow:`0 0 10px ${char.accentDim}`,
            marginBottom:4,
            animation:"fadeSlideUp 0.5s ease both 0.2s", opacity:0,
          }}>
            {char.title}
          </div>

          {/* Archon label */}
          <div className="crimson" style={{
            fontSize:"0.92rem", fontStyle:"italic",
            color:`${char.accent}99`, marginBottom:14,
            animation:"fadeSlideUp 0.5s ease both 0.23s", opacity:0,
          }}>
            {char.archon} · {char.constellation}
          </div>

          {/* Stars */}
          <div style={{ marginBottom:16, animation:"fadeSlideUp 0.5s ease both 0.27s", opacity:0 }}>
            <Stars count={char.rarity} color={char.starColor} />
          </div>

          {/* Divider */}
          <div style={{
            height:1, marginBottom:14,
            background:`linear-gradient(90deg,${char.accent}88,${char.accent}22,transparent)`,
            animation:"lineGrow 0.7s ease both 0.3s", opacity:0,
          }} />

          {/* Quote */}
          <blockquote className="crimson" style={{
            fontSize:"0.98rem", fontStyle:"italic",
            color:"rgba(255,255,255,0.62)", lineHeight:1.65,
            paddingLeft:12, borderLeft:`2px solid ${char.accent}55`,
            marginBottom:12,
            animation:"fadeSlideUp 0.5s ease both 0.33s", opacity:0,
          }}>
            {char.quote}
          </blockquote>

          {/* Lore */}
          <p className="crimson" style={{
            fontSize:"0.88rem", color:"rgba(255,255,255,0.44)",
            lineHeight:1.72, marginBottom:20,
            animation:"fadeSlideUp 0.5s ease both 0.38s", opacity:0,
          }}>
            {char.lore}
          </p>

          {/* Tags */}
          <div style={{
            display:"flex", flexWrap:"wrap", gap:7, marginBottom:20,
            animation:"fadeSlideUp 0.5s ease both 0.42s", opacity:0,
          }}>
            {char.tags.map((tag, i) => (
              <span
                key={tag}
                className="mono"
                style={{
                  fontSize:"0.55rem", letterSpacing:"0.12em",
                  padding:"4px 12px",
                  border:`1px solid ${char.accent}55`,
                  background:`${char.accent}11`,
                  color:char.accent,
                  clipPath:"polygon(4px 0,100% 0,calc(100% - 4px) 100%,0 100%)",
                  animation:`tagPop 0.35s ease both ${0.44 + i*0.06}s`,
                  opacity:0,
                  "--ac": char.accent,
                }}
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Stat bars */}
          <div style={{ marginBottom:20, animation:"fadeSlideUp 0.5s ease both 0.46s", opacity:0 }}>
            <div className="mono" style={{ fontSize:"0.52rem", letterSpacing:"0.18em", color:"rgba(255,255,255,0.3)", marginBottom:10 }}>
              COMBAT STATS
            </div>
            {char.stats.map((s, si) => (
              <StatBar key={s.label} label={s.label} val={s.val} color={s.color} delay={`${0.5 + si*0.08}s`} />
            ))}
          </div>

          {/* Abilities */}
          <div style={{ animation:"fadeSlideUp 0.5s ease both 0.62s", opacity:0 }}>
            <div className="mono" style={{ fontSize:"0.52rem", letterSpacing:"0.18em", color:"rgba(255,255,255,0.3)", marginBottom:10 }}>
              ABILITIES
            </div>
            <div style={{ display:"flex", flexDirection:"column", gap:7 }}>
              {char.abilities.map((ab, ai) => (
                <div
                  key={ab.name}
                  className="ability-card"
                  style={{
                    padding:"10px 14px",
                    "--ac": char.accent,
                    animation:`fadeSlideUp 0.4s ease both ${0.65 + ai*0.07}s`,
                    opacity:0,
                  }}
                >
                  <div style={{ display:"flex", alignItems:"baseline", gap:8, marginBottom:3 }}>
                    <span className="cinzel" style={{ fontSize:"0.68rem", fontWeight:700, color:"#fff", letterSpacing:"0.06em" }}>
                      {ab.name}
                    </span>
                    <span className="mono" style={{ fontSize:"0.5rem", letterSpacing:"0.12em", color:char.accent }}>
                      {ab.type.toUpperCase()}
                    </span>
                  </div>
                  <p className="crimson" style={{ fontSize:"0.82rem", color:"rgba(255,255,255,0.5)", lineHeight:1.55 }}>
                    {ab.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* ── KEYBOARD HINT ── */}
        <div className="mono" style={{
          position:"absolute", bottom:68, left:"50%", transform:"translateX(-50%)",
          fontSize:"0.46rem", color:"rgba(255,255,255,0.18)", letterSpacing:"0.14em",
          zIndex:20, whiteSpace:"nowrap",
        }}>
          ← → ARROW KEYS TO NAVIGATE
        </div>

      </div>
    </>
  );
}

export default Venti;