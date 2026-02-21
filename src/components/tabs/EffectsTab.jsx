import { useState } from 'react';
import { Section, Slider, Toggle } from '../ui/index.jsx';
import { PATTERNS } from '../../constants.js';

const PATTERN_OPTS = [
  { key:'solid', label:'Solid' },
  { key:'grain', label:'Grain' },
  { key:'dots',  label:'Dots'  },
  { key:'grid',  label:'Grid'  },
  { key:'lines', label:'Lines' },
  { key:'diag',  label:'Diagonal' },
  { key:'mesh',  label:'Mesh'  },
  { key:'noise', label:'Noise' },
];

const ANIM_OPTS = [
  { speed:'0s',    label:'Instant' },
  { speed:'0.1s',  label:'Snap'    },
  { speed:'0.2s',  label:'Quick'   },
  { speed:'0.35s', label:'Smooth'  },
  { speed:'0.6s',  label:'Slow'    },
  { speed:'1s',    label:'Drift'   },
];

function PatternOpt({ opt, active, bg, onClick }) {
  const [hov, setHov] = useState(false);
  // Build inline style for preview
  const patFn = PATTERNS[opt.key];
  const bgImage = patFn ? patFn(bg || '#0e0d0b', '#ede8df', '#d4873a') : '';
  const sizes = { dots:'20px 20px', grid:'24px 24px', diag:'16px 16px' };

  return (
    <div
      onClick={onClick}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        border:`1.5px solid ${active ? 'var(--ui-accent)' : hov ? 'var(--ui-muted)' : 'var(--ui-border)'}`,
        aspectRatio:'1', cursor:'pointer', borderRadius:4, overflow:'hidden',
        transition:'border-color 0.15s, transform 0.15s',
        transform: hov ? 'scale(1.04)' : 'none',
        position:'relative',
        background: bg || '#0e0d0b',
        backgroundImage: bgImage || undefined,
        backgroundSize: sizes[opt.key] || undefined,
      }}
    >
      <div style={{
        position:'absolute', bottom:0, left:0, right:0,
        background:'rgba(0,0,0,0.7)', fontSize:'0.42rem', textAlign:'center', padding:2,
        fontFamily:"'DM Mono', monospace", letterSpacing:'1px', textTransform:'uppercase',
        color:'rgba(255,255,255,0.8)',
      }}>{opt.label}</div>
    </div>
  );
}

function AnimOpt({ opt, active, onClick }) {
  const [hov, setHov] = useState(false);
  return (
    <div
      onClick={onClick}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        border:`1.5px solid ${active ? 'var(--ui-accent)' : hov ? 'var(--ui-muted)' : 'var(--ui-border)'}`,
        padding:'0.7rem 0.3rem', cursor:'pointer', borderRadius:4, display:'flex',
        flexDirection:'column', alignItems:'center', gap:6,
        background: active ? 'rgba(212,135,58,0.06)' : 'var(--ui-surface2)',
        transition:'border-color 0.15s',
      }}
    >
      <div style={{ width:10, height:10, borderRadius:'50%', background:'var(--ui-accent)' }} />
      <div style={{
        fontSize:'0.48rem', letterSpacing:'1px', textTransform:'uppercase',
        fontFamily:"'DM Mono', monospace",
        color: active ? 'var(--ui-accent)' : 'var(--ui-muted)', textAlign:'center',
      }}>{opt.label}</div>
    </div>
  );
}

export default function EffectsTab({ S, update }) {
  const [bodyOp, setBodyOp] = useState(65);
  const [cardOp, setCardOp] = useState(60);
  const [surfOp, setSurfOp] = useState(100);

  return (
    <div>
      {/* Background Style */}
      <Section icon="▦" title="Background Style">
        <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:6 }}>
          {PATTERN_OPTS.map(opt => (
            <PatternOpt key={opt.key} opt={opt} bg={S.bg}
              active={S.pattern === opt.key}
              onClick={() => update({ pattern: opt.key })} />
          ))}
        </div>
      </Section>

      {/* Transition Speed */}
      <Section icon="◎" title="Transition Speed">
        <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:6 }}>
          {ANIM_OPTS.map(opt => (
            <AnimOpt key={opt.speed} opt={opt}
              active={S.transSpeed === opt.speed}
              onClick={() => update({ transSpeed: opt.speed })} />
          ))}
        </div>
      </Section>

      {/* Feature Toggles */}
      <Section icon="⚙" title="Feature Toggles">
        <Toggle name="Hover Lift"      desc="Cards lift on hover"      on={S.liftOn}   onClick={() => update({ liftOn:   !S.liftOn   })} />
        <Toggle name="Button Glow"     desc="Accent glow on hover"     on={S.glowOn}   onClick={() => update({ glowOn:   !S.glowOn   })} />
        <Toggle name="Gradient Text"   desc="Heading uses gradient"    on={S.gradText} onClick={() => update({ gradText: !S.gradText })} />
        <Toggle name="Blur Backdrop"   desc="Nav uses blur effect"     on={S.blurNav}  onClick={() => update({ blurNav:  !S.blurNav  })} />
        <Toggle name="Italic Headings" desc="Display font italic"      on={S.italic}   onClick={() => update({ italic:   !S.italic   })} />
      </Section>

      {/* Opacity */}
      <Section icon="◐" title="Opacity Controls">
        <Slider label="Body Text"     value={bodyOp} min={40} max={100} step={1} displayValue={bodyOp + '%'}  onChange={v => setBodyOp(v)} />
        <Slider label="Card Body"     value={cardOp} min={30} max={100} step={1} displayValue={cardOp + '%'}  onChange={v => setCardOp(v)} />
        <Slider label="Surface Blend" value={surfOp} min={50} max={100} step={1} displayValue={surfOp + '%'}  onChange={v => setSurfOp(v)} />
      </Section>
    </div>
  );
}
