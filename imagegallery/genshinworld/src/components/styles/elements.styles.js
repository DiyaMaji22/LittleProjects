// ── Theme tokens ──────────────────────────────────────────────
export const T = {
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

// ── Global CSS injected once at root ─────────────────────────
export const CSS = `
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
    color:#504870; cursor:pointer;
    transition:all .22s; position:relative; top:1px;
  }
  .el-tab:hover { color:#a098c0; }
  .el-tab.active {
    color:#f0eeff;
    border-color:rgba(255,255,255,0.07);
    background:#0d0b1a;
  }

  /* ── Element card ── */
  .el-card {
    position:relative; overflow:hidden;
    background:rgba(255,255,255,0.035);
    border:1px solid rgba(255,255,255,0.07);
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

  /* ── Back / close btn ── */
  .el-back {
    display:flex; align-items:center; gap:7px;
    padding:8px 18px; border-radius:50px;
    border:1px solid rgba(255,255,255,.1);
    background:rgba(255,255,255,.04);
    font-family:'Share Tech Mono',monospace;
    font-size:.48rem; letter-spacing:.16em; color:#504870;
    cursor:pointer; transition:all .2s;
  }
  .el-back:hover { background:rgba(255,255,255,.09); color:#f0eeff; border-color:rgba(255,255,255,.22); }

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