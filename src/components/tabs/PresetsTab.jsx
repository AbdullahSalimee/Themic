import { useState } from 'react';
import { Section } from '../ui/index.jsx';
import { PRESET_LIST } from '../../constants.js';

function PresetCard({ preset, active, onClick }) {
  const [hov, setHov] = useState(false);
  return (
    <div
      onClick={onClick}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        border:`1.5px solid ${active ? 'var(--ui-accent)' : hov ? 'var(--ui-muted)' : 'var(--ui-border)'}`,
        borderRadius:5, overflow:'hidden', cursor:'pointer',
        transform: hov ? 'translateY(-2px)' : 'none',
        transition:'border-color 0.15s, transform 0.15s',
      }}
    >
      <div style={{ height:52, background:preset.bg, display:'flex', flexDirection:'column', padding:8, gap:4 }}>
        <div style={{ height:5, borderRadius:100, background:preset.bar, width:preset.barW }} />
        <div style={{ height:3, borderRadius:100, background:'rgba(128,128,128,0.3)', width:'60%' }} />
        <div style={{ height:10, width:'40%', borderRadius:2, marginTop:2, ...preset.btnDemo }} />
      </div>
      <div style={{ padding:'0.4rem 0.5rem', background:'var(--ui-surface2)', borderTop:'1px solid var(--ui-border)' }}>
        <div style={{ fontSize:'0.55rem', letterSpacing:'1.5px', textTransform:'uppercase', fontFamily:"'DM Mono', monospace", color:'var(--ui-text)' }}>{preset.name}</div>
        <div style={{ fontSize:'0.48rem', color:'var(--ui-muted)', fontFamily:"'DM Mono', monospace", marginTop:1 }}>{preset.sub}</div>
      </div>
    </div>
  );
}

export default function PresetsTab({ S, applyPreset }) {
  const [activePreset, setActivePreset] = useState('midnight');

  function handlePreset(key) {
    setActivePreset(key);
    applyPreset(key);
  }

  return (
    <div>
      <Section icon="★" title="Complete Presets">
        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:6 }}>
          {PRESET_LIST.map(p => (
            <PresetCard key={p.key} preset={p} active={activePreset === p.key}
              onClick={() => handlePreset(p.key)} />
          ))}
        </div>
      </Section>
    </div>
  );
}
