import React, { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import bg from '../assets/bg.jpg'

const css = `
  @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;600;700;900&family=Crimson+Pro:ital,wght@0,300;0,400;0,600;1,300;1,400&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  /* ── PHYSICS BOUNCE ──
     Ball rises, peaks, falls, squishes on "ground", bounces back up.
     Total duration 2s to feel natural.
  */
  @keyframes ballBounce {
    0%   { transform: translateY(0px); animation-timing-function: cubic-bezier(0.33,0,0.66,0); }
    40%  { transform: translateY(-52px); animation-timing-function: cubic-bezier(0.33,1,0.66,1); }
    75%  { transform: translateY(0px); animation-timing-function: cubic-bezier(0.33,0,0.66,0); }
    87%  { transform: translateY(-18px); animation-timing-function: cubic-bezier(0.33,1,0.66,1); }
    95%  { transform: translateY(0px); animation-timing-function: cubic-bezier(0.33,0,0.66,0); }
    100% { transform: translateY(0px); }
  }

  /* Squish on impact — wider, flatter, then stretch on launch */
  @keyframes ballSquish {
    0%   { transform: scaleX(1)    scaleY(1);    animation-timing-function: ease-in; }
    70%  { transform: scaleX(1)    scaleY(1);    animation-timing-function: ease-out; }
    75%  { transform: scaleX(1.28) scaleY(0.72); animation-timing-function: cubic-bezier(0.34,1.5,0.64,1); }
    82%  { transform: scaleX(0.9)  scaleY(1.1);  animation-timing-function: ease-out; }
    88%  { transform: scaleX(1)    scaleY(1); }
    92%  { transform: scaleX(1.12) scaleY(0.88); }
    96%  { transform: scaleX(1)    scaleY(1); }
    100% { transform: scaleX(1)    scaleY(1); }
  }

  /* Shadow grows when ball is high, shrinks on impact */
  @keyframes shadowSync {
    0%   { transform: scaleX(1);    opacity: 0.3; }
    40%  { transform: scaleX(0.45); opacity: 0.1; }
    75%  { transform: scaleX(1);    opacity: 0.3; }
    87%  { transform: scaleX(0.7);  opacity: 0.18; }
    95%  { transform: scaleX(1);    opacity: 0.3; }
    100% { transform: scaleX(1);    opacity: 0.3; }
  }

  @keyframes titleReveal {
    0%   { opacity: 0; letter-spacing: 0.7em; transform: translateY(-8px); }
    100% { opacity: 1; letter-spacing: 0.25em; transform: translateY(0); }
  }
  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(14px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  @keyframes starTwinkle {
    0%,100% { opacity: 0.25; transform: scale(1); }
    50%      { opacity: 0.9;  transform: scale(1.6); }
  }
  @keyframes particleRise {
    0%   { opacity: 0; transform: translateY(0) translateX(0); }
    12%  { opacity: 0.75; }
    88%  { opacity: 0.3; }
    100% { opacity: 0; transform: translateY(-150px) translateX(var(--pdx)); }
  }
  @keyframes scanline {
    from { transform: translateY(-100vh); }
    to   { transform: translateY(100vh); }
  }
  @keyframes ringPulse {
    0%   { transform: scale(1);   opacity: 0.55; }
    100% { transform: scale(2.4); opacity: 0; }
  }
  @keyframes innerGlow {
    0%,100% { box-shadow: 0 0 22px rgba(255,255,255,0.2), inset 0 0 18px rgba(255,255,255,0.1); }
    50%      { box-shadow: 0 0 40px rgba(255,255,255,0.4), inset 0 0 28px rgba(255,255,255,0.18); }
  }
  @keyframes shimmerSweep {
    from { left: -80%; }
    to   { left: 130%; }
  }
  @keyframes scrollDot {
    0%,100% { transform: translateY(0); opacity: 0.8; }
    50%      { transform: translateY(9px); opacity: 0.2; }
  }
  @keyframes logoIn {
    from { opacity: 0; transform: translateY(-5px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  @keyframes vigPulse {
    0%,100% { opacity: 0.55; }
    50%      { opacity: 0.4; }
  }

  .cinzel  { font-family: 'Cinzel', serif; }
  .crimson { font-family: 'Crimson Pro', serif; }

  /* Bounce wrapper — moves the whole button up/down */
  .bounce-wrapper {
    animation: ballBounce 2s ease-in-out infinite;
    transform-origin: center bottom;
  }
  /* Squish layer — sits inside, deforms the shape */
  .squish-layer {
    animation: ballSquish 2s ease-in-out infinite;
    transform-origin: center bottom;
  }

  .ring {
    position: absolute; inset: -5px;
    border-radius: 50%;
    border: 1.5px solid rgba(255,255,255,0.45);
    animation: ringPulse 2.4s ease-out infinite;
    pointer-events: none;
  }
  .ring2 { animation-delay: 1.2s; }

  .shimmer {
    position: absolute; top: 0; height: 100%;
    width: 55%; left: -80%;
    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
    transform: skewX(-14deg);
    animation: shimmerSweep 3.5s ease-in-out infinite 0.8s;
    pointer-events: none;
    border-radius: 50%;
    overflow: hidden;
  }
`;

const STARS = Array.from({ length: 80 }, (_, i) => ({
  id: i, x: Math.random() * 100, y: Math.random() * 100,
  s: 0.8 + Math.random() * 1.8,
  dur: `${2 + Math.random() * 3}s`,
  del: `${Math.random() * 5}s`,
}));

const PARTS = Array.from({ length: 20 }, (_, i) => ({
  id: i,
  sym: ["✦","◆","✧","⬡"][i % 4],
  l: `${8 + Math.random() * 84}%`,
  t: `${45 + Math.random() * 50}%`,
  dur: `${5 + Math.random() * 6}s`,
  del: `${Math.random() * 7}s`,
  dx: `${(Math.random() - 0.5) * 110}px`,
  sz: 7 + Math.random() * 9,
}));

export default function Intro() {
  const [mounted, setMounted] = useState(false);
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 80);
    return () => clearTimeout(t);
  }, []);

  const ELEMENTS = [
    { sym:"⚡", color:"#b06aff", label:"Electro" },
    { sym:"✿",  color:"#48d084", label:"Dendro" },
    { sym:"◆",  color:"#3ab8ff", label:"Hydro" },
    { sym:"⬡",  color:"#d4a84a", label:"Geo" },
    { sym:"♪",  color:"#72d9c0", label:"Anemo" },
  ];

  return (
    <>
      <style>{css}</style>

      <div style={{
        width:"100vw", height:"100vh",
        position:"relative", overflow:"hidden",
        background:"linear-gradient(180deg, #05000f 0%, #0a0515 50%, #0f030a 100%)",
        display:"flex", flexDirection:"column",
        alignItems:"center", justifyContent:"center",
      }}>

        {/* ── BACKGROUND IMAGE ── */}
        <img
          src={bg}
          alt="background"
          style={{
            position:"absolute", inset:0,
            width:"100%", height:"100%",
            objectFit:"cover", objectPosition:"center 25%",
            zIndex:0,
            opacity:0.5,
            filter:"brightness(0.55) saturate(1.15)",
          }}
        />

        {/* ── VIGNETTE ── */}
        <div style={{
          position:"absolute", inset:0, zIndex:1, pointerEvents:"none",
          background:"radial-gradient(ellipse 78% 65% at 50% 50%, transparent 25%, rgba(0,0,0,0.75) 100%)",
          animation:"vigPulse 5s ease-in-out infinite",
        }} />

        {/* Top + bottom darkening */}
        <div style={{ position:"absolute", top:0, left:0, right:0, height:180, zIndex:1, pointerEvents:"none",
          background:"linear-gradient(to bottom,rgba(0,0,0,0.68),transparent)" }} />
        <div style={{ position:"absolute", bottom:0, left:0, right:0, height:200, zIndex:1, pointerEvents:"none",
          background:"linear-gradient(to top,rgba(0,0,0,0.72),transparent)" }} />

        {/* Scanline */}
        <div style={{
          position:"absolute", left:0, right:0, height:2, zIndex:2, pointerEvents:"none",
          background:"linear-gradient(transparent,rgba(255,255,255,0.05),transparent)",
          animation:"scanline 9s linear infinite",
        }} />

        {/* Stars */}
        <div style={{ position:"absolute", inset:0, zIndex:1, pointerEvents:"none" }}>
          {STARS.map(s => (
            <div key={s.id} style={{
              position:"absolute", left:`${s.x}%`, top:`${s.y}%`,
              width:s.s, height:s.s, borderRadius:"50%", background:"#fff",
              animation:`starTwinkle ${s.dur} ease-in-out infinite ${s.del}`,
            }} />
          ))}
        </div>

        {/* Particles */}
        <div style={{ position:"absolute", inset:0, zIndex:2, pointerEvents:"none" }}>
          {PARTS.map(p => (
            <div key={p.id} style={{
              position:"absolute", left:p.l, top:p.t,
              fontSize:p.sz, color:"rgba(255,215,90,0.7)", opacity:0,
              animation:`particleRise ${p.dur} ease-in-out infinite ${p.del}`,
              "--pdx":p.dx,
              filter:"drop-shadow(0 0 4px rgba(255,190,60,0.55))",
            }}>{p.sym}</div>
          ))}
        </div>

        {/* ══════════ CENTRE CONTENT ══════════ */}
        <div style={{
          position:"relative", zIndex:10,
          display:"flex", flexDirection:"column",
          alignItems:"center", textAlign:"center",
          padding:"0 20px",
        }}>

          {/* "HOYOVERSE PRESENTS" */}
          <div style={{
            display:"flex", alignItems:"center", gap:12, marginBottom:28,
            opacity: mounted ? 1 : 0,
            animation: mounted ? "fadeUp 0.7s ease both 0.2s" : "none",
          }}>
            <div style={{ width:48, height:1, background:"linear-gradient(to right,transparent,rgba(255,200,80,0.55))" }} />
            <span className="cinzel" style={{ fontSize:"0.6rem", letterSpacing:"0.35em", color:"rgba(255,200,80,0.7)", textShadow:"0 0 10px rgba(255,180,50,0.4)" }}>
              HOYOVERSE PRESENTS
            </span>
            <div style={{ width:48, height:1, background:"linear-gradient(to left,transparent,rgba(255,200,80,0.55))" }} />
          </div>

          {/* GENSHIN */}
          <h1 className="cinzel" style={{
            fontSize:"clamp(3.2rem,9vw,7.5rem)",
            fontWeight:900, color:"#fff",
            letterSpacing:"0.25em", lineHeight:1.0,
            textShadow:"0 0 40px rgba(255,200,80,0.28), 0 0 80px rgba(100,60,220,0.2), 0 3px 18px rgba(0,0,0,0.7)",
            marginBottom:5,
            opacity: mounted ? 1 : 0,
            animation: mounted ? "titleReveal 1.1s cubic-bezier(0.16,1,0.3,1) both 0.45s" : "none",
          }}>GENSHIN</h1>

          {/* IMPACT */}
          <h2 className="cinzel" style={{
            fontSize:"clamp(1.2rem,3.8vw,2.8rem)",
            fontWeight:400, color:"rgba(255,215,140,0.82)",
            letterSpacing:"0.6em",
            textShadow:"0 0 18px rgba(255,180,60,0.38)",
            marginBottom:24,
            opacity: mounted ? 1 : 0,
            animation: mounted ? "fadeUp 0.9s ease both 1s" : "none",
          }}>IMPACT</h2>

          {/* Ornament row */}
          <div style={{
            display:"flex", alignItems:"center", gap:14, marginBottom:20,
            opacity: mounted ? 1 : 0,
            animation: mounted ? "fadeUp 0.7s ease both 1.2s" : "none",
          }}>
            <div style={{ width:72, height:1, background:"linear-gradient(to right,transparent,rgba(255,200,80,0.5))" }} />
            <span style={{ fontSize:13, color:"rgba(255,200,80,0.8)", filter:"drop-shadow(0 0 5px rgba(255,180,50,0.6))" }}>✦</span>
            <span className="cinzel" style={{ fontSize:"0.58rem", letterSpacing:"0.3em", color:"rgba(255,255,255,0.38)" }}>ARCHON COMPENDIUM</span>
            <span style={{ fontSize:13, color:"rgba(255,200,80,0.8)", filter:"drop-shadow(0 0 5px rgba(255,180,50,0.6))" }}>✦</span>
            <div style={{ width:72, height:1, background:"linear-gradient(to left,transparent,rgba(255,200,80,0.5))" }} />
          </div>

          {/* Tagline */}
          <p className="crimson" style={{
            fontSize:"clamp(0.92rem,2vw,1.15rem)",
            fontStyle:"italic", color:"rgba(255,255,255,0.48)",
            lineHeight:1.75, maxWidth:400, marginBottom:54,
            opacity: mounted ? 1 : 0,
            animation: mounted ? "fadeUp 0.8s ease both 1.4s" : "none",
          }}>
            Journey across seven nations.<br/>Discover the gods who shaped the world.
          </p>

          {/* ══════════ PING-PONG BUTTON ══════════ */}
          <div style={{
            display:"flex", flexDirection:"column", alignItems:"center",
            opacity: mounted ? 1 : 0,
            animation: mounted ? "fadeUp 0.6s ease both 1.75s" : "none",
          }}>

            {/* ↑ Bounce wrapper — translates Y only */}
            <div className="bounce-wrapper">

              {/* ↑ Squish layer — scales X/Y on bounce */}
              <div className="squish-layer">
                <Link
                  to="/hub"
                  onMouseEnter={() => setHovered(true)}
                  onMouseLeave={() => setHovered(false)}
                  style={{
                    position:"relative",
                    width: 132,
                    height: 132,
                    borderRadius:"50%",
                    border:"1.5px solid rgba(255,255,255,0.5)",
                    background: hovered
                      ? "rgba(255,255,255,0.22)"
                      : "rgba(255,255,255,0.11)",
                    backdropFilter:"blur(18px)",
                    WebkitBackdropFilter:"blur(18px)",
                    cursor:"pointer",
                    overflow:"hidden",
                    animation:"innerGlow 2.8s ease-in-out infinite",
                    transform: hovered ? "scale(1.09)" : "scale(1)",
                    transition:"transform 0.25s cubic-bezier(.34,1.3,.64,1), background 0.2s",
                    display:"flex",
                    flexDirection:"column",
                    alignItems:"center",
                    justifyContent:"center",
                    gap:6,
                    outline:"none",
                    textDecoration: "none",
                  }}
                >
                  {/* Pulse rings */}
                  <div className="ring" />
                  <div className="ring ring2" />

                  {/* Shimmer sweep */}
                  <div className="shimmer" />

                  {/* Inner highlight arc */}
                  <div style={{
                    position:"absolute", top:6, left:"18%",
                    width:"64%", height:"30%",
                    borderRadius:"50%",
                    background:"radial-gradient(ellipse at 50% 0%, rgba(255,255,255,0.28), transparent 70%)",
                    pointerEvents:"none",
                  }} />

                  {/* Icon */}
                  <div style={{
                    fontSize:24, color:"#fff",
                    filter:"drop-shadow(0 0 8px rgba(255,210,80,0.9))",
                    transform: hovered ? "scale(1.18)" : "scale(1)",
                    transition:"transform 0.22s",
                    lineHeight:1, position:"relative", zIndex:1,
                  }}>✦</div>

                  {/* Label */}
                  <div className="cinzel" style={{
                    fontSize:"0.76rem", fontWeight:700,
                    letterSpacing:"0.2em", color:"#fff",
                    textShadow:"0 0 10px rgba(255,255,255,0.7)",
                    position:"relative", zIndex:1, lineHeight:1,
                  }}>EXPLORE</div>
                </Link>
              </div>
            </div>

            {/* Ball shadow — synced to bounce timing */}
            <div style={{
              width:84, height:14,
              borderRadius:"50%",
              background:"rgba(0,0,0,0.5)",
              filter:"blur(7px)",
              marginTop:4,
              animation:"shadowSync 2s ease-in-out infinite",
            }} />
          </div>

        </div>

        {/* ══════════ TOP LEFT LOGO ══════════ */}
        <div style={{
          position:"absolute", top:22, left:30, zIndex:20,
          display:"flex", alignItems:"center", gap:10,
          opacity: mounted ? 1 : 0,
          animation: mounted ? "logoIn 0.7s ease both 0.1s" : "none",
        }}>
          <div style={{
            width:32, height:32, borderRadius:"50%",
            border:"1.5px solid rgba(255,200,80,0.55)",
            background:"rgba(255,200,80,0.1)",
            display:"flex", alignItems:"center", justifyContent:"center",
            fontSize:13, color:"rgba(255,210,80,0.9)",
          }}>✦</div>
          <div>
            <div className="cinzel" style={{ fontSize:"0.63rem", letterSpacing:"0.2em", color:"rgba(255,200,80,0.78)" }}>
              GENSHIN IMPACT
            </div>
            <div style={{ fontFamily:"monospace", fontSize:"0.45rem", color:"rgba(255,255,255,0.25)", letterSpacing:"0.14em" }}>
              ARCHON COMPENDIUM
            </div>
          </div>
        </div>

        {/* ══════════ TOP RIGHT VERSION ══════════ */}
        <div style={{
          position:"absolute", top:22, right:30, zIndex:20,
          opacity: mounted ? 1 : 0,
          animation: mounted ? "fadeUp 0.6s ease both 0.85s" : "none",
        }}>
          <div style={{
            padding:"5px 14px",
            border:"1px solid rgba(255,200,80,0.3)",
            background:"rgba(0,0,0,0.28)",
            backdropFilter:"blur(8px)",
          }}>
            <span className="cinzel" style={{ fontSize:"0.56rem", letterSpacing:"0.18em", color:"rgba(255,200,80,0.6)" }}>
              v5.0 · NATLAN
            </span>
          </div>
        </div>

        {/* ══════════ BOTTOM LEFT ELEMENTS ══════════ */}
        <div style={{
          position:"absolute", bottom:28, left:28, zIndex:20,
          display:"flex", gap:10,
          opacity: mounted ? 1 : 0,
          animation: mounted ? "fadeUp 0.6s ease both 2.1s" : "none",
        }}>
          {ELEMENTS.map(el => (
            <div key={el.label} style={{
              display:"flex", flexDirection:"column", alignItems:"center", gap:3,
              cursor:"pointer",
              transition:"transform 0.2s",
            }}
            onMouseEnter={e => e.currentTarget.style.transform="translateY(-3px)"}
            onMouseLeave={e => e.currentTarget.style.transform="translateY(0)"}
            >
              <div style={{
                width:30, height:30, borderRadius:"50%",
                border:`1px solid ${el.color}50`,
                background:`${el.color}16`,
                backdropFilter:"blur(6px)",
                display:"flex", alignItems:"center", justifyContent:"center",
                fontSize:14,
              }}>{el.sym}</div>
              <span className="cinzel" style={{ fontSize:"0.4rem", letterSpacing:"0.1em", color:`${el.color}77` }}>
                {el.label.slice(0,4).toUpperCase()}
              </span>
            </div>
          ))}
        </div>

        {}
        <div style={{
          position:"absolute", bottom:24, left:"50%", transform:"translateX(-50%)",
          zIndex:20,
          display:"flex", flexDirection:"column", alignItems:"center", gap:5,
          opacity: mounted ? 0.45 : 0,
          animation: mounted ? "fadeUp 0.5s ease both 2.3s" : "none",
        }}>
          <span className="cinzel" style={{ fontSize:"0.5rem", letterSpacing:"0.28em", color:"rgba(255,255,255,0.4)" }}>
            MEET THE ARCHONS
          </span>
          <div style={{
            width:1, height:24,
            background:"linear-gradient(to bottom,rgba(255,255,255,0.5),transparent)",
            animation:"scrollDot 1.9s ease-in-out infinite",
          }} />
        </div>

      </div>
    </>
  );
}
