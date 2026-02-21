import { useState } from 'react';
import { Section, Label, Swatch, ColorPicker } from '../ui/index.jsx';
import { DARK_PALETTES, LIGHT_PALETTES, ACCENT_STANDARD, ACCENT_VIVID, ACCENT_MUTED } from '../../constants.js';

function PaletteRow({ name, chips, args, active, onClick }) {
  const [hov, setHov] = useState(false);
  return (
    <>
      <div style={{ fontSize:'0.55rem', fontFamily:"'DM Mono', monospace", color:'var(--ui-muted)', marginBottom:3, marginTop:'0.6rem', letterSpacing:'1px', textTransform:'uppercase' }}>{name}</div>
      <div
        onClick={onClick}
        onMouseEnter={() => setHov(true)}
        onMouseLeave={() => setHov(false)}
        style={{
          display:'flex', borderRadius:4, overflow:'hidden', marginBottom:6, cursor:'pointer',
          border:`1.5px solid ${active ? 'var(--ui-accent)' : 'transparent'}`,
          transform: hov ? 'translateY(-1px)' : 'none',
          boxShadow: active ? '0 0 0 1px rgba(212,135,58,0.3)' : hov ? '0 4px 16px rgba(0,0,0,0.4)' : 'none',
          transition:'transform 0.15s, box-shadow 0.15s, border-color 0.15s',
        }}
      >
        {chips.map((c, i) => <div key={i} style={{ flex:1, height:32, background:c }} />)}
      </div>
    </>
  );
}

export default function ColorsTab({ S, update, applyPalette }) {
  const [activePalette, setActivePalette] = useState('Midnight Ember');

  function handlePalette(name, args) {
    setActivePalette(name);
    applyPalette(args[0], args[1], args[2], args[3]);
  }

  function handleAccent(color) {
    update({ accent: color, btn: color });
  }

  return (
    <div>
      {/* Palettes */}
      <Section icon="🎨" title="Palettes">
        <Label>Dark Themes</Label>
        {DARK_PALETTES.map(p => (
          <PaletteRow key={p.name} {...p} active={activePalette === p.name}
            onClick={() => handlePalette(p.name, p.args)} />
        ))}
        <Label>Light Themes</Label>
        {LIGHT_PALETTES.map(p => (
          <PaletteRow key={p.name} {...p} active={activePalette === p.name}
            onClick={() => handlePalette(p.name, p.args)} />
        ))}
      </Section>

      {/* Accents */}
      <Section icon="●" title="Accent Colors">
        <Label>Standard</Label>
        <div style={{ display:'grid', gridTemplateColumns:'repeat(6,1fr)', gap:5 }}>
          {ACCENT_STANDARD.map(a => (
            <Swatch key={a.color} color={a.color} tip={a.tip} active={S.accent === a.color}
              onClick={() => handleAccent(a.color)} />
          ))}
        </div>
        <Label>Vivid</Label>
        <div style={{ display:'grid', gridTemplateColumns:'repeat(6,1fr)', gap:5 }}>
          {ACCENT_VIVID.map(a => (
            <Swatch key={a.color} color={a.color} tip={a.tip} active={S.accent === a.color}
              onClick={() => handleAccent(a.color)} />
          ))}
        </div>
        <Label>Muted / Earthy</Label>
        <div style={{ display:'grid', gridTemplateColumns:'repeat(6,1fr)', gap:5 }}>
          {ACCENT_MUTED.map(a => (
            <Swatch key={a.color} color={a.color} tip={a.tip} active={S.accent === a.color}
              onClick={() => handleAccent(a.color)} />
          ))}
        </div>
      </Section>

      {/* Custom */}
      <Section icon="🖌" title="Custom Colors">
        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:6 }}>
          <ColorPicker label="Background" value={S.bg}      onChange={v => update({ bg:v })} />
          <ColorPicker label="Text"       value={S.text}    onChange={v => update({ text:v })} />
          <ColorPicker label="Accent"     value={S.accent}  onChange={v => update({ accent:v })} />
          <ColorPicker label="Button"     value={S.btn}     onChange={v => update({ btn:v })} />
          <ColorPicker label="Surface"    value={S.surface} onChange={v => update({ surface:v })} />
          <ColorPicker label="Border"     value={S.border}  onChange={v => update({ border:v })} />
        </div>
      </Section>
    </div>
  );
}
