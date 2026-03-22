import React, { useState, useEffect } from 'react'

// ─── Import your character images here ───
import ventiImg   from '../assets/venti.png'
// Add more: import raidenImg from '../assets/raiden.png'
// import nahidaImg from '../assets/nahida.png'

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
`;

// ─── CHARACTER DATABASE ───
// Replace image imports and add your actual characters
const CHARACTERS = [
  {
    id: "venti",
    name: "Venti",
    title: "Windborne Bard",
    archon: "Anemo Archon · Barbatos",
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
    // Background gradient — teal/deep teal for Anemo/Mondstadt
    bg: "radial-gradient(ellipse 90% 80% at 60% 40%, #041a14 0%, #021008 45%, #010806 100%)",
    overlayLeft: "linear-gradient(to right, rgba(2,8,6,0.96) 0%, rgba(2,8,6,0.75) 40%, rgba(2,8,6,0.25) 65%, transparent 100%)",
    overlayBottom: "linear-gradient(to top, rgba(2,8,6,0.9) 0%, rgba(2,8,6,0.35) 30%, transparent 65%)",
    particleColor: "rgba(114,217,192,0.75)",
    particleSymbols: ["♪","♫","✦","♬","◆"],
    quote: "\"Freedom is the wind — you cannot grasp it, only feel it pass through you.\"",
    lore: "The carefree bard who wanders Mondstadt is secretly Barbatos, the Anemo Archon. He helped the people of Mondstadt overthrow a tyrant god 2,600 years ago and asked for nothing in return — only freedom. He now spends his days drinking wine, composing ballads, and watching over his beloved city.",
    stats: [
      { label: "ATK",    val: 78, color: "#8aeedc" },
      { label: "EM",     val: 90, color: "#72d9c0" },
      { label: "BURST",  val: 97, color: "#50b09a" },
      { label: "SKILL",  val: 99, color: "#b0fff0" },
    ],
    abilities: [
      { name: "Skyward Sonnet",    type: "Elemental Skill",  desc: "Summons a Wind Domain that launches enemies and objects skyward." },
      { name: "Wind's Grand Ode",  type: "Elemental Burst",  desc: "Fires an Ode to the Wind that pulls in and damages enemies in a large AoE." },
      { name: "Stormeye",          type: "Passive",          desc: "Generates 15 Energy for the team when Venti's Elemental Burst is used." },
    ],
    tags: ["Crowd Control", "Sub-DPS", "Support", "EM Build"],
  },
  // ─── ADD MORE CHARACTERS HERE ───
  // {
  //   id: "raiden",
  //   name: "Raiden Shogun",
  //   img: raidenImg,
  //   accent: "#b06aff",
  //   ... (copy pattern above)
  // },
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
          style={{
            position:"absolute", left:0, top:0, bottom:0,
            width:"clamp(330px,44%,520px)",
            display:"flex", flexDirection:"column", justifyContent:"center",
            padding:"100px 44px 100px",
            zIndex:10,
            opacity: animating ? 0 : 1,
            transform: animating
              ? `translateX(${dir === "right" ? "-24px" : "24px"})`
              : "translateX(0)",
            transition:"opacity 0.32s ease, transform 0.32s ease",
          }}
        >
          {/* Region + Vision badges */}
          <div style={{ display:"flex", gap:8, marginBottom:18, flexWrap:"wrap" }}>
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
          <div style={{ display: "flex", alignItems: "center", gap: 20, marginBottom: 4, animation: "fadeSlideUp 0.55s ease both 0.15s", opacity: 0 }}>
            <button
               onClick={prev}
               style={{
                 width: 40, height: 40, borderRadius: "50%",
                 border: `1px solid ${char.accent}`,
                 background: "rgba(0,0,0,0.2)",
                 color: char.accent, fontSize: "1.2rem",
                 display: "flex", alignItems: "center", justifyContent: "center",
                 cursor: "pointer", transition: "all 0.2s",
                 boxShadow: `0 0 10px ${char.accent}33`
               }}
               onMouseEnter={e => { e.currentTarget.style.background = `${char.accent}22`; e.currentTarget.style.transform = "scale(1.1)"; }}
               onMouseLeave={e => { e.currentTarget.style.background = "rgba(0,0,0,0.2)"; e.currentTarget.style.transform = "scale(1)"; }}
            >❮</button>

            <h1 className="cinzel" style={{
              fontSize:"clamp(2.8rem,5vw,4.2rem)",
              fontWeight:900, lineHeight:1.0, color:"#fff",
              textShadow:`0 0 30px ${char.accent}66, 0 0 60px ${char.accent}33`,
              margin: 0,
            }}>
              {char.name}
            </h1>

            <button
               onClick={next}
               style={{
                 width: 40, height: 40, borderRadius: "50%",
                 border: `1px solid ${char.accent}`,
                 background: "rgba(0,0,0,0.2)",
                 color: char.accent, fontSize: "1.2rem",
                 display: "flex", alignItems: "center", justifyContent: "center",
                 cursor: "pointer", transition: "all 0.2s",
                 boxShadow: `0 0 10px ${char.accent}33`
               }}
               onMouseEnter={e => { e.currentTarget.style.background = `${char.accent}22`; e.currentTarget.style.transform = "scale(1.1)"; }}
               onMouseLeave={e => { e.currentTarget.style.background = "rgba(0,0,0,0.2)"; e.currentTarget.style.transform = "scale(1)"; }}
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