import { useState } from 'react';

/* ── SECTION ── */
export function Section({ id, icon, title, children, defaultOpen = true }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div style={{ borderBottom: '1px solid var(--ui-border)' }}>
      <div
        onClick={() => setOpen(o => !o)}
        style={{
          padding: '0.85rem 1.25rem', display:'flex', alignItems:'center',
          justifyContent:'space-between', cursor:'pointer', userSelect:'none',
          transition:'background 0.15s',
        }}
        onMouseEnter={e => e.currentTarget.style.background = 'var(--ui-surface2)'}
        onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
      >
        <div style={{ display:'flex', alignItems:'center', gap:'0.6rem' }}>
          <div style={{
            width:22, height:22, background:'var(--ui-surface2)', border:'1px solid var(--ui-border)',
            borderRadius:4, display:'flex', alignItems:'center', justifyContent:'center',
            fontSize:'0.7rem', flexShrink:0,
          }}>{icon}</div>
          <span style={{
            fontSize:'0.62rem', fontWeight:700, letterSpacing:'2.5px', textTransform:'uppercase',
            color:'var(--ui-text)', fontFamily:"'DM Mono', monospace",
          }}>{title}</span>
        </div>
        <span style={{
          fontSize:'0.55rem', color:'var(--ui-muted)',
          transform: open ? 'rotate(0)' : 'rotate(-90deg)', transition:'transform 0.2s',
        }}>▼</span>
      </div>
      {open && <div style={{ padding:'0 1.25rem 1.25rem' }}>{children}</div>}
    </div>
  );
}

/* ── LABEL ── */
export function Label({ children }) {
  return (
    <div style={{
      fontSize:'0.55rem', letterSpacing:'2px', textTransform:'uppercase', color:'var(--ui-muted)',
      fontFamily:"'DM Mono', monospace", fontWeight:600, marginBottom:'0.5rem', marginTop:'0.9rem',
      display:'flex', alignItems:'center', gap:'0.5rem',
    }}>
      {children}
      <span style={{ flex:1, height:1, background:'var(--ui-border)', display:'block' }}></span>
    </div>
  );
}

/* ── SLIDER ── */
export function Slider({ label, value, min, max, step, displayValue, onChange }) {
  return (
    <div style={{ marginBottom:'0.7rem' }}>
      <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:'0.35rem' }}>
        <span style={{ fontSize:'0.55rem', letterSpacing:'1.5px', textTransform:'uppercase', color:'var(--ui-muted)', fontFamily:"'DM Mono', monospace" }}>
          {label}
        </span>
        <span style={{
          fontSize:'0.6rem', fontFamily:"'DM Mono', monospace", color:'var(--ui-accent)',
          background:'rgba(212,135,58,0.08)', padding:'0.1rem 0.4rem', borderRadius:2,
        }}>
          {displayValue}
        </span>
      </div>
      <input type="range" min={min} max={max} step={step} value={value}
        onChange={e => onChange(parseFloat(e.target.value))} />
    </div>
  );
}

/* ── SWATCH ── */
export function Swatch({ color, tip, active, onClick }) {
  const [hov, setHov] = useState(false);
  return (
    <div
      onClick={onClick}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      title={tip}
      style={{
        aspectRatio:'1', borderRadius:3, cursor:'pointer', background:color,
        border: active ? '1.5px solid var(--ui-text)' : '1.5px solid transparent',
        transform: hov ? 'scale(1.15)' : active ? 'scale(1.1)' : 'scale(1)',
        boxShadow: hov ? '0 3px 10px rgba(0,0,0,0.5)' : 'none',
        transition:'transform 0.15s, border-color 0.15s, box-shadow 0.15s',
        position:'relative',
      }}
    />
  );
}

/* ── FONT CARD ── */
export function FontCard({ tag, sub, previewStyle, previewText='Headline', active, onClick }) {
  const [hov, setHov] = useState(false);
  return (
    <div
      onClick={onClick}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        background:'var(--ui-surface2)', border:`1.5px solid ${active ? 'var(--ui-accent)' : hov ? 'var(--ui-muted)' : 'var(--ui-border)'}`,
        padding:'0.7rem', cursor:'pointer', transition:'border-color 0.15s, transform 0.15s',
        borderRadius:4, transform: hov ? 'translateY(-1px)' : 'none',
        background: active ? 'rgba(212,135,58,0.06)' : 'var(--ui-surface2)',
      }}
    >
      <div style={{ fontSize:'0.5rem', letterSpacing:'1.5px', textTransform:'uppercase', color:'var(--ui-muted)', fontFamily:"'DM Mono', monospace", marginBottom:'0.3rem' }}>{tag}</div>
      <div style={{ fontSize:'1.25rem', color:'var(--ui-text)', lineHeight:1.15, ...previewStyle }}>{previewText}</div>
      <div style={{ fontSize:'0.58rem', color:'var(--ui-muted)', marginTop:'0.25rem' }}>{sub}</div>
    </div>
  );
}

/* ── SHAPE OPTION ── */
export function ShapeOpt({ active, onClick, radius, label, isInput }) {
  const [hov, setHov] = useState(false);
  return (
    <div
      onClick={onClick}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        border:`1.5px solid ${active ? 'var(--ui-accent)' : hov ? 'var(--ui-muted)' : 'var(--ui-border)'}`,
        aspectRatio:'1', cursor:'pointer', display:'flex', flexDirection:'column',
        alignItems:'center', justifyContent:'center', gap:4, transition:'border-color 0.15s',
        borderRadius:4, background: active ? 'rgba(212,135,58,0.06)' : 'var(--ui-surface2)',
      }}
    >
      <div style={{
        width:22, height:14, borderRadius:radius,
        background: isInput ? 'none' : 'var(--ui-muted)',
        border: isInput ? '1.5px solid var(--ui-muted)' : 'none',
      }} />
      <div style={{
        fontSize:'0.45rem', letterSpacing:'1px', textTransform:'uppercase',
        fontFamily:"'DM Mono', monospace", color: active ? 'var(--ui-accent)' : 'var(--ui-muted)',
      }}>{label}</div>
    </div>
  );
}

/* ── SHADOW OPTION ── */
export function ShadowOpt({ active, onClick, shadow, label }) {
  const [hov, setHov] = useState(false);
  return (
    <div
      onClick={onClick}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        border:`1.5px solid ${active ? 'var(--ui-accent)' : hov ? 'var(--ui-muted)' : 'var(--ui-border)'}`,
        padding:'0.6rem 0.3rem', cursor:'pointer', display:'flex', flexDirection:'column',
        alignItems:'center', gap:6, transition:'border-color 0.15s',
        borderRadius:4, background: active ? 'rgba(212,135,58,0.06)' : 'var(--ui-surface2)',
      }}
    >
      <div style={{ width:28, height:18, background:'var(--ui-muted)', borderRadius:2, boxShadow:shadow }} />
      <div style={{
        fontSize:'0.45rem', letterSpacing:'1px', textTransform:'uppercase', textAlign:'center',
        fontFamily:"'DM Mono', monospace", color: active ? 'var(--ui-accent)' : 'var(--ui-muted)',
      }}>{label}</div>
    </div>
  );
}

/* ── TOGGLE ── */
export function Toggle({ on, onClick, name, desc }) {
  return (
    <div style={{
      display:'flex', alignItems:'center', justifyContent:'space-between',
      padding:'0.55rem 0', borderBottom:'1px solid var(--ui-border)',
    }}>
      <div style={{ display:'flex', flexDirection:'column', gap:2 }}>
        <div style={{ fontSize:'0.65rem', color:'var(--ui-text)' }}>{name}</div>
        <div style={{ fontSize:'0.53rem', color:'var(--ui-muted)', fontFamily:"'DM Mono', monospace" }}>{desc}</div>
      </div>
      <div
        onClick={onClick}
        style={{
          width:34, height:18, background: on ? 'var(--ui-accent)' : 'var(--ui-border)',
          borderRadius:100, cursor:'pointer', position:'relative', transition:'background 0.2s', flexShrink:0,
        }}
      >
        <div style={{
          position:'absolute', width:12, height:12, background:'white', borderRadius:'50%',
          top:3, left:3, transition:'transform 0.2s', boxShadow:'0 1px 3px rgba(0,0,0,0.4)',
          transform: on ? 'translateX(16px)' : 'translateX(0)',
        }} />
      </div>
    </div>
  );
}

/* ── COLOR PICKER ── */
export function ColorPicker({ label, value, onChange }) {
  return (
    <div style={{ display:'flex', flexDirection:'column', gap:3 }}>
      <div style={{ fontSize:'0.5rem', letterSpacing:'2px', textTransform:'uppercase', color:'var(--ui-muted)', fontFamily:"'DM Mono', monospace" }}>{label}</div>
      <div style={{
        display:'flex', alignItems:'center', gap:6, background:'var(--ui-surface2)',
        border:'1px solid var(--ui-border)', padding:'0.28rem 0.5rem', borderRadius:3,
      }}>
        <input type="color" value={value} onChange={e => onChange(e.target.value)} />
        <input
          type="text"
          value={value}
          onChange={e => { if(/^#[0-9a-fA-F]{6}$/.test(e.target.value)) onChange(e.target.value); }}
          style={{
            fontSize:'0.6rem', fontFamily:"'DM Mono', monospace", color:'var(--ui-text)',
            border:'none', background:'transparent', width:62, outline:'none',
          }}
        />
      </div>
    </div>
  );
}
