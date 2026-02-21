import { useState } from 'react';
import { Section, Label, Slider, FontCard } from '../ui/index.jsx';
import { DISPLAY_SERIF, DISPLAY_SANS, BODY_FONTS } from '../../constants.js';

export default function TypeTab({ S, update }) {
  const [baseSize, setBaseSize] = useState(S.baseSize ?? 16);
  const [hwt,      setHwt]      = useState(S.hwt      ?? 900);
  const [bwt,      setBwt]      = useState(S.bwt      ?? 400);
  const [ls,       setLs]       = useState(S.ls       ?? 0);
  const [lh,       setLh]       = useState(S.lh       ?? 1.75);

  return (
    <div>
      <Section icon="H" title="Display Font">
        <Label>Serif</Label>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 6 }}>
          {DISPLAY_SERIF.map(f => (
            <FontCard key={f.family} {...f} active={S.df === f.family}
              onClick={() => update({ df: f.family })} />
          ))}
        </div>
        <Label>Sans Serif / Display</Label>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 6 }}>
          {DISPLAY_SANS.map(f => (
            <FontCard key={f.family} {...f} active={S.df === f.family}
              onClick={() => update({ df: f.family })} />
          ))}
        </div>
      </Section>

      <Section icon="p" title="Body Font">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 6 }}>
          {BODY_FONTS.map(f => (
            <FontCard key={f.family} {...f} previewText="Aa Bb Cc" active={S.bf === f.family}
              onClick={() => update({ bf: f.family })} />
          ))}
        </div>
      </Section>

      <Section icon="↕" title="Type Scale">
        <Slider label="Base Size" value={baseSize} min={13} max={22} step={1}
          displayValue={baseSize + 'px'}
          onChange={v => { setBaseSize(v); update({ baseSize: v }); }} />

        <Slider label="Heading Weight" value={hwt} min={400} max={900} step={100}
          displayValue={hwt}
          onChange={v => { setHwt(v); update({ hwt: v }); }} />

        <Slider label="Body Weight" value={bwt} min={200} max={700} step={100}
          displayValue={bwt}
          onChange={v => { setBwt(v); update({ bwt: v }); }} />

        <Slider label="Letter Spacing" value={ls} min={-2} max={8} step={0.5}
          displayValue={ls}
          onChange={v => { setLs(v); update({ ls: v }); }} />

        <Slider label="Line Height" value={lh} min={1.2} max={2.2} step={0.05}
          displayValue={lh}
          onChange={v => { setLh(v); update({ lh: v }); }} />
      </Section>
    </div>
  );
}
