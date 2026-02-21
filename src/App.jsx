import { useState, useCallback } from 'react';
import { DEFAULT_STATE, PRESETS, PATTERNS, PATTERN_SIZES, PRESET_LIST } from './constants.js';
import TopBar from './components/TopBar.jsx';
import Panel from './components/Panel.jsx';
import Preview from './components/Preview.jsx';

export default function App() {
  const [S, setS] = useState({ ...DEFAULT_STATE });
  const [activeTab, setActiveTab] = useState('colors');
  const [exportLabel, setExportLabel] = useState('↓ Export CSS');

  const update = useCallback((changes) => {
    setS(prev => ({ ...prev, ...changes }));
  }, []);

  const applyPalette = useCallback((bg, text, accent, btn) => {
    setS(prev => ({ ...prev, bg, text, accent, btn }));
  }, []);

  const applyPreset = useCallback((name) => {
    const p = PRESETS[name];
    setS(prev => ({ ...prev, ...p, btnShadow: 'none' }));
  }, []);

  const randomize = useCallback(() => {
    const keys = Object.keys(PRESETS);
    const pick = keys[Math.floor(Math.random() * keys.length)];
    const patKeys = Object.keys(PATTERNS);
    const pickedPat = patKeys[Math.floor(Math.random() * patKeys.length)];
    setS(prev => ({ ...prev, ...PRESETS[pick], pattern: pickedPat }));
  }, []);

  const resetAll = useCallback(() => {
    setS({ ...DEFAULT_STATE });
  }, []);

  const exportCSS = useCallback(() => {
    const css = `:root {
  /* Colors */
  --color-bg: ${S.bg};
  --color-text: ${S.text};
  --color-accent: ${S.accent};
  --color-button: ${S.btn};
  --color-surface: ${S.surface};
  --color-border: ${S.border};

  /* Typography */
  --font-display: ${S.df};
  --font-body: ${S.bf};

  /* Shapes */
  --radius-card: ${S.cardRadius};
  --radius-button: ${S.btnRadius};
  --radius-input: ${S.inputRadius};

  /* Shadows */
  --shadow-card: ${S.cardShadow};

  /* Transitions */
  --transition: all ${S.transSpeed} ease;
}`;
    navigator.clipboard.writeText(css).then(() => {
      setExportLabel('✓ Copied!');
      setTimeout(() => setExportLabel('↓ Export CSS'), 2000);
    });
  }, [S]);

  return (
    <div style={{ display:'flex', flexDirection:'column', height:'100vh', overflow:'hidden' }}>
      <TopBar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onRandomize={randomize}
        onReset={resetAll}
        onExport={exportCSS}
        exportLabel={exportLabel}
      />
      <div style={{ display:'grid', gridTemplateColumns:'360px 1fr', height:'calc(100vh - 52px)', overflow:'hidden' }}>
        <Panel
          S={S}
          update={update}
          activeTab={activeTab}
          applyPalette={applyPalette}
          applyPreset={applyPreset}
        />
        <Preview S={S} />
      </div>
    </div>
  );
}
