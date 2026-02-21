import { useMemo } from 'react';
import { hexBlend, darken, PATTERNS, PATTERN_SIZES } from '../constants.js';

function getButtonStyle(S) {
  const base = {
    fontFamily: S.bf,
    transition: `all ${S.transSpeed}`,
    borderRadius: S.btnRadius,
    fontSize: '0.72rem', fontWeight: 700, letterSpacing: '2px',
    textTransform: 'uppercase', padding: '0.75rem 1.8rem', cursor: 'pointer',
  };
  if (S.btnType === 'solid')   return { ...base, background: S.btn, color: S.bg, border: `2px solid ${S.btn}`, boxShadow: S.btnShadow.includes('currentColor') ? S.btnShadow.replace('currentColor', S.btn) : S.btnShadow };
  if (S.btnType === 'ghost')   return { ...base, background: 'transparent', color: S.accent, border: `2px solid ${S.accent}`, boxShadow: 'none' };
  if (S.btnType === 'neon')    return { ...base, background: 'transparent', color: S.accent, border: `2px solid ${S.accent}`, boxShadow: `0 0 16px ${S.accent}50, inset 0 0 16px ${S.accent}15` };
  if (S.btnType === 'link')    return { ...base, background: 'transparent', color: S.accent, border: 'none', borderBottom: `2px solid ${S.accent}`, borderRadius: 0, boxShadow: 'none' };
  if (S.btnType === 'frosted') return { ...base, background: `${S.accent}22`, color: S.accent, border: `1.5px solid ${S.accent}40`, backdropFilter: 'blur(8px)', boxShadow: 'none' };
  if (S.btnType === 'fat')     return { ...base, background: 'transparent', color: S.accent, border: `3px solid ${S.accent}`, boxShadow: 'none' };
  if (S.btnType === 'raised')  return { ...base, background: S.btn, color: S.bg, border: 'none', borderBottom: `4px solid ${darken(S.btn)}`, boxShadow: 'none' };
  return base;
}

function getBtn2Style(S) {
  return {
    fontFamily: S.bf, background: 'transparent', color: S.text,
    border: `2px solid ${S.text}50`, borderRadius: S.btnRadius,
    transition: `all ${S.transSpeed}`, fontSize: '0.72rem', fontWeight: 700,
    letterSpacing: '2px', textTransform: 'uppercase', padding: '0.75rem 1.8rem', cursor: 'pointer',
  };
}

function SectionLabel({ children, textColor }) {
  return (
    <div style={{
      fontSize: '0.5rem', letterSpacing: '3px', textTransform: 'uppercase',
      fontFamily: "'DM Mono', monospace", opacity: 0.3, display: 'flex',
      alignItems: 'center', gap: '0.7rem', marginBottom: '0.8rem', color: textColor,
    }}>
      {children}
      <span style={{ flex: 1, height: 1, background: 'currentColor', display: 'block' }} />
    </div>
  );
}

export default function Preview({ S }) {
  const btnStyle  = useMemo(() => getButtonStyle(S), [S]);
  const btn2Style = useMemo(() => getBtn2Style(S),   [S]);

  const navBg          = hexBlend(S.bg, S.text, 0.08);
  const cardBg         = hexBlend(S.bg, S.text, 0.06);
  const cardBorder     = `1px solid ${hexBlend(S.bg, S.text, 0.12)}`;
  const statBg         = hexBlend(S.bg, S.text, 0.05);
  const inputBorderColor = hexBlend(S.bg, S.text, 0.2);

  const cardStyle = {
    background:   cardBg,
    borderRadius: S.cardRadius,
    boxShadow:    S.cardShadow.includes('currentColor') ? S.cardShadow.replace('currentColor', S.accent) : S.cardShadow,
    border:       cardBorder,
    transition:   `all ${S.transSpeed}`,
    padding:      `${S.pad}rem`,        // ← uses S.pad
  };

  const h1Style = {
    fontFamily:    S.df,
    color:         S.text,
    fontStyle:     S.italic ? 'italic' : 'normal',
    fontSize:      'clamp(2.2rem, 4vw, 3.8rem)',
    fontWeight:    S.hwt,               // ← uses S.hwt
    lineHeight:    1.03,
    marginBottom:  '1rem',
    letterSpacing: `${S.ls}px`,         // ← uses S.ls
    ...(S.gradText ? {
      background:            `linear-gradient(135deg, ${S.text}, ${S.accent})`,
      WebkitBackgroundClip:  'text',
      WebkitTextFillColor:   'transparent',
      backgroundClip:        'text',
    } : {}),
  };

  const patFn   = PATTERNS[S.pattern];
  const bgImage = patFn ? patFn(S.bg, S.text, S.accent) : '';
  const bgSize  = PATTERN_SIZES[S.pattern] || '';

  const previewClasses = [
    S.liftOn ? 'lift-on' : '',
    S.glowOn ? 'glow-on' : '',
  ].filter(Boolean).join(' ');

  return (
    <div
      className={previewClasses}
      style={{
        overflowY:       'auto',
        scrollbarWidth:  'thin',
        padding:         `${S.pvpad}rem`,   // ← uses S.pvpad
        display:         'flex',
        flexDirection:   'column',
        gap:             `${S.gap}rem`,     // ← uses S.gap
        fontSize:        `${S.baseSize}px`, // ← uses S.baseSize
        transition:      'background 0.4s, padding 0.3s',
        background:      S.bg,
        color:           S.text,
        backgroundImage: bgImage || undefined,
        backgroundSize:  bgSize  || undefined,
      }}
    >
      {/* NAV */}
      <div>
        <SectionLabel textColor={S.text}>Navigation</SectionLabel>
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '1rem 1.5rem',
          background:     S.blurNav ? `${hexBlend(S.bg, S.text, 0.05)}cc` : navBg,
          backdropFilter: S.blurNav ? 'blur(12px)' : 'none',
          transition:     'all 0.3s',
        }}>
          <div className="flex justify-center items-center gap-1 text-lg font-bold"
            style={{ fontFamily: S.df, fontSize: '1.1rem', fontWeight: 700, color: S.text }}
          >
            <img
              src="/logo.png"
              alt="Brand Logo"
              className={`h-16 transition-all duration-300 ease-in-out ${
                S.bg && parseInt(S.bg.replace('#', ''), 16) < 0x444444 ? 'invert brightness-105' : ''
              }`}
            />
            Themic.
          </div>
          <div style={{ display: 'flex', gap: '1.5rem' }}>
            {['Home', 'Work', 'About', 'Journal'].map((l, i) => (
              <div key={l} style={{
                fontSize: '0.68rem', letterSpacing: '1px', textTransform: 'uppercase',
                fontFamily: S.bf, color: i === 0 ? S.accent : S.text, opacity: i === 0 ? 1 : 0.5,
              }}>{l}</div>
            ))}
          </div>
          <button style={btnStyle}>Let's Talk</button>
        </div>
      </div>

      <div style={{ height: 1, opacity: 0.1, background: S.text }} />

      {/* HERO */}
      <div>
        <SectionLabel textColor={S.text}>Hero</SectionLabel>
        <div style={{
          fontFamily: S.bf, fontSize: '0.6rem', letterSpacing: '3px',
          textTransform: 'uppercase', opacity: 0.6, marginBottom: '0.7rem', color: S.accent,
        }}>
          Design Studio · Est. 2024
        </div>
        <h1 style={h1Style}>Build Things<br />Worth Feeling.</h1>
        <p style={{
          fontFamily:   S.bf,
          fontSize:     '0.9rem',
          lineHeight:   S.lh,             // ← uses S.lh
          fontWeight:   S.bwt,            // ← uses S.bwt
          opacity:      S.bodyOp / 100,
          maxWidth:     440,
          marginBottom: '1.5rem',
          color:        S.text,
        }}>
          We craft interfaces that breathe — where motion has purpose, type has soul, and every detail earns its place.
        </p>
        <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.2rem' }}>
          <div style={{
            fontFamily: S.bf, fontSize: '0.52rem', letterSpacing: '2px',
            textTransform: 'uppercase', fontWeight: 700, padding: '0.2rem 0.55rem',
            background: S.accent, color: S.bg, borderRadius: S.btnRadius,
          }}>New</div>
          <div style={{
            fontFamily: S.bf, fontSize: '0.52rem', letterSpacing: '2px',
            textTransform: 'uppercase', fontWeight: 700, padding: '0.2rem 0.55rem',
            color: S.accent, borderRadius: S.btnRadius, border: `1.5px solid ${S.accent}`,
          }}>v3.0</div>
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.8rem', alignItems: 'center' }}>
          <button className="pv-btn-1" style={btnStyle}>Start Project</button>
          <button style={btn2Style}>View Work →</button>
        </div>
      </div>

      <div style={{ height: 1, opacity: 0.1, background: S.text }} />

      {/* STATS */}
      <div>
        <SectionLabel textColor={S.text}>Stats</SectionLabel>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: '1rem' }}>
          {[['240+','Projects'],['98%','Satisfaction'],['12yr','Experience'],['40+','Countries']].map(([num, lbl]) => (
            <div key={lbl} style={{
              padding: `${S.pad}rem`,     // ← uses S.pad
              background: statBg, borderRadius: S.cardRadius,
              border: `1px solid ${hexBlend(S.bg, S.text, 0.1)}`,
            }}>
              <div style={{
                fontFamily: S.df, fontSize: '2rem', fontWeight: S.hwt,
                lineHeight: 1, marginBottom: '0.3rem', color: S.accent,
              }}>{num}</div>
              <div style={{
                fontSize: '0.6rem', letterSpacing: '1.5px', textTransform: 'uppercase',
                opacity: 0.5, fontFamily: "'DM Mono', monospace", color: S.text,
              }}>{lbl}</div>
            </div>
          ))}
        </div>
      </div>

      <div style={{ height: 1, opacity: 0.1, background: S.text }} />

      {/* CARDS */}
      <div>
        <SectionLabel textColor={S.text}>Cards</SectionLabel>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '1rem' }}>
          {[
            ['◈','Interaction Design','Every hover, every click, crafted with intention and delight.'],
            ['✦','Visual Systems','Cohesive design languages that scale and breathe across products.'],
            ['⬡','Motion & Feel','Animation that communicates meaning, not just movement.'],
          ].map(([icon, title, body]) => (
            <div key={title} style={cardStyle}>
              <span style={{ fontSize: '1.4rem', marginBottom: '0.6rem', display: 'block' }}>{icon}</span>
              <div style={{
                fontFamily: S.df, fontSize: '1rem', fontWeight: S.hwt,
                marginBottom: '0.4rem', color: S.text,
                fontStyle: S.italic ? 'italic' : 'normal',
              }}>{title}</div>
              <div style={{
                fontFamily:  S.bf,
                fontSize:    '0.72rem',
                fontWeight:  S.bwt,           // ← uses S.bwt
                opacity:     S.cardOp / 100,
                lineHeight:  S.lh,            // ← uses S.lh
                color:       S.text,
              }}>{body}</div>
            </div>
          ))}
        </div>
      </div>

      <div style={{ height: 1, opacity: 0.1, background: S.text }} />

      {/* CHIPS */}
      <div>
        <SectionLabel textColor={S.text}>Tags & Chips</SectionLabel>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
          {['Branding','UI Design','Motion','Typography','Systems'].map((tag, i) => (
            <div key={tag} style={{
              fontFamily: S.bf, fontSize: '0.6rem', letterSpacing: '1px',
              textTransform: 'uppercase', padding: '0.25rem 0.65rem',
              transition: `all ${S.transSpeed}`,
              borderRadius: S.btnRadius === '100px' ? '100px' : S.cardRadius,
              ...(i % 2 === 0
                ? { background: hexBlend(S.bg, S.accent, 0.18), color: S.accent, border: `1px solid ${S.accent}40` }
                : { background: 'transparent', color: S.text, border: `1px solid ${hexBlend(S.bg, S.text, 0.18)}`, opacity: 0.7 }
              ),
            }}>{tag}</div>
          ))}
        </div>
      </div>

      {/* PROGRESS */}
      <div>
        <SectionLabel textColor={S.text}>Progress Bars</SectionLabel>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', maxWidth: 400 }}>
          {[['Typography','92%',92],['Color','85%',85],['Motion','78%',78]].map(([name, pct, val]) => (
            <div key={name} style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ fontSize: '0.6rem', fontFamily: "'DM Mono', monospace", opacity: 0.6, color: S.text }}>{name}</span>
                <span style={{ fontSize: '0.6rem', fontFamily: "'DM Mono', monospace", opacity: 0.6, color: S.text }}>{pct}</span>
              </div>
              <div style={{
                height: 4, width: '100%', opacity: 0.15,
                background: hexBlend(S.bg, S.text, 0.1),
                borderRadius: S.inputRadius,
              }}>
                <div style={{
                  height: '100%', borderRadius: 100,
                  background: S.accent, width: `${val}%`, transition: 'width 0.3s',
                }} />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div style={{ height: 1, opacity: 0.1, background: S.text }} />

      {/* FORM */}
      <div>
        <SectionLabel textColor={S.text}>Form Elements</SectionLabel>
        <div style={{ maxWidth: 340, display: 'flex', flexDirection: 'column', gap: '0.9rem' }}>
          {[['Your Name','Jane Smith'],['Email Address','jane@studio.com']].map(([lbl, ph]) => (
            <div key={lbl} style={{ display: 'flex', flexDirection: 'column', gap: '0.3rem' }}>
              <label style={{
                fontSize: '0.55rem', letterSpacing: '2px', textTransform: 'uppercase',
                fontFamily: S.bf, opacity: 0.5, color: S.text,
              }}>{lbl}</label>
              <input readOnly placeholder={ph} style={{
                background: 'transparent', fontFamily: S.bf, fontSize: '0.82rem',
                padding: '0.65rem 0.9rem', outline: 'none', width: '100%',
                borderWidth: '1.5px', borderStyle: 'solid', transition: `all ${S.transSpeed}`,
                color: S.text, borderColor: inputBorderColor, borderRadius: S.inputRadius,
              }} />
            </div>
          ))}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.3rem' }}>
            <label style={{
              fontSize: '0.55rem', letterSpacing: '2px', textTransform: 'uppercase',
              fontFamily: S.bf, opacity: 0.5, color: S.text,
            }}>Project Type</label>
            <select style={{
              background: 'transparent', fontFamily: S.bf, fontSize: '0.75rem',
              padding: '0.6rem 0.9rem', outline: 'none', width: '100%',
              borderWidth: '1.5px', borderStyle: 'solid', appearance: 'none', cursor: 'pointer',
              color: S.text, borderColor: inputBorderColor, borderRadius: S.inputRadius,
            }}>
              <option>Brand Identity</option>
              <option>Web Design</option>
              <option>Motion</option>
            </select>
          </div>
          <button className="pv-btn-1" style={{ ...btnStyle, alignSelf: 'flex-start' }}>Send Message</button>
        </div>
      </div>

      {/* TOAST */}
      <div>
        <SectionLabel textColor={S.text}>Notification</SectionLabel>
        <div style={{
          padding: '0.8rem 1rem', display: 'flex', alignItems: 'center', gap: '0.8rem',
          maxWidth: 340, background: hexBlend(S.bg, S.text, 0.07),
          borderRadius: S.cardRadius, border: `1px solid ${hexBlend(S.bg, S.text, 0.14)}`,
          transition: `all ${S.transSpeed}`,
        }}>
          <div style={{
            width: 8, height: 8, borderRadius: '50%', background: S.accent,
            boxShadow: `0 0 6px ${S.accent}80`, flexShrink: 0,
          }} />
          <div style={{ fontSize: '0.75rem', opacity: 0.8, fontFamily: S.bf, color: S.text }}>
            Your theme has been applied successfully. ✓
          </div>
        </div>
      </div>
    </div>
  );
}
