import { useState } from 'react';
import { Section, Label, ShapeOpt, ShadowOpt, Slider } from '../ui/index.jsx';
import { BUTTON_STYLES } from '../../constants.js';

const CARD_RADII   = [{ r:'0px',  br:0,   lbl:'None'   },{ r:'4px',  br:3,  lbl:'Tiny'   },{ r:'8px',  br:5,  lbl:'Soft'  },{ r:'16px', br:8,  lbl:'Round' },{ r:'28px', br:12, lbl:'Bubble' }];
const INPUT_RADII  = [{ r:'0px',  br:0,   lbl:'None'   },{ r:'4px',  br:3,  lbl:'Tiny'   },{ r:'8px',  br:5,  lbl:'Soft'  },{ r:'14px', br:8,  lbl:'Round' },{ r:'100px',br:14, lbl:'Pill'   }];
const SHADOWS = [
  { val:'none',                                                                    shadow:'none',                             lbl:'None'     },
  { val:'0 1px 4px rgba(0,0,0,0.2)',                                               shadow:'0 1px 6px rgba(0,0,0,0.5)',         lbl:'Feather'  },
  { val:'0 4px 16px rgba(0,0,0,0.25)',                                             shadow:'0 4px 12px rgba(0,0,0,0.6)',        lbl:'Soft'     },
  { val:'0 12px 40px rgba(0,0,0,0.4)',                                             shadow:'0 8px 24px rgba(0,0,0,0.7)',        lbl:'Deep'     },
  { val:'4px 4px 0px currentColor',                                                shadow:'3px 3px 0 #666',                    lbl:'Brutalist'},
  { val:'0 0 24px var(--pv-accent,#d4873a)55',                                     shadow:'0 0 12px rgba(212,135,58,0.7)',     lbl:'Glow'     },
  { val:'inset 0 0 0 1.5px rgba(255,255,255,0.08), 0 20px 60px rgba(0,0,0,0.5)', shadow:'inset 0 0 0 1px rgba(255,255,255,0.2), 0 8px 20px rgba(0,0,0,0.6)', lbl:'Glass' },
  { val:'-4px -4px 0px var(--pv-accent,#d4873a)',                                 shadow:'-3px -3px 0 #d4873a',               lbl:'Offset'   },
];

function StyleCard({ style, active, onClick }) {
  const [hov, setHov] = useState(false);
  return (
    <div
      onClick={onClick}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        background: active ? 'rgba(212,135,58,0.06)' : 'var(--ui-surface2)',
        border:`1.5px solid ${active ? 'var(--ui-accent)' : hov ? 'var(--ui-muted)' : 'var(--ui-border)'}`,
        padding:'0.8rem 0.5rem', cursor:'pointer', transition:'border-color 0.15s, transform 0.15s',
        borderRadius:4, display:'flex', flexDirection:'column', alignItems:'center', gap:'0.5rem',
        transform: hov ? 'translateY(-1px)' : 'none',
      }}
    >
      <div className={`db ${style.dbClass}`} style={{ pointerEvents:'none' }}>
        {style.dbClass.includes('ghost') || style.dbClass === 'neon' || style.dbClass === 'frosted' || style.dbClass === 'outline-fat' || style.dbClass === 'link-s' ? style.label.toUpperCase().split(' ')[0] : style.label.toUpperCase().split(' ')[0]}
      </div>
      <div style={{ fontSize:'0.52rem', letterSpacing:'1.5px', textTransform:'uppercase', color:'var(--ui-muted)', fontFamily:"'DM Mono', monospace" }}>{style.label}</div>
    </div>
  );
}

export default function ComponentsTab({ S, update }) {
  const [gap, setGap] = useState(2.5);
  const [pad, setPad] = useState(1.2);
  const [pvpad, setPvpad] = useState(2.5);

  return (
    <div>
      {/* Buttons */}
      <Section icon="□" title="Button Style">
        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:6 }}>
          {BUTTON_STYLES.map(bs => (
            <StyleCard key={bs.label} style={bs}
              active={S.btnType === bs.btnType && S.btnRadius === bs.btnRadius}
              onClick={() => update({ btnRadius: bs.btnRadius, btnShadow: bs.btnShadow, btnType: bs.btnType })} />
          ))}
        </div>
      </Section>

      {/* Border Radius */}
      <Section icon="⌒" title="Border Radius">
        <Label>Cards</Label>
        <div style={{ display:'grid', gridTemplateColumns:'repeat(5,1fr)', gap:5 }}>
          {CARD_RADII.map(r => (
            <ShapeOpt key={r.r} active={S.cardRadius === r.r} label={r.lbl} radius={r.br}
              onClick={() => update({ cardRadius: r.r })} />
          ))}
        </div>
        <Label>Inputs</Label>
        <div style={{ display:'grid', gridTemplateColumns:'repeat(5,1fr)', gap:5 }}>
          {INPUT_RADII.map(r => (
            <ShapeOpt key={r.r} active={S.inputRadius === r.r} label={r.lbl} radius={r.br} isInput
              onClick={() => update({ inputRadius: r.r })} />
          ))}
        </div>
      </Section>

      {/* Shadows */}
      <Section icon="◈" title="Shadows & Depth">
        <Label>Card Shadows</Label>
        <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:6 }}>
          {SHADOWS.map(sh => (
            <ShadowOpt key={sh.lbl} active={S.cardShadow === sh.val} label={sh.lbl}
              shadow={sh.shadow} onClick={() => update({ cardShadow: sh.val })} />
          ))}
        </div>
      </Section>

      {/* Spacing */}
      <Section icon="↔" title="Spacing & Density">
        <Slider label="Content Gap"      value={gap}   min={1}   max={5}   step={0.5} displayValue={gap + 'rem'}
          onChange={v => setGap(v)} />
        <Slider label="Card Padding"     value={pad}   min={0.5} max={2.5} step={0.25} displayValue={pad + 'rem'}
          onChange={v => setPad(v)} />
        <Slider label="Preview Padding"  value={pvpad} min={1}   max={5}   step={0.5} displayValue={pvpad + 'rem'}
          onChange={v => setPvpad(v)} />
      </Section>
    </div>
  );
}
