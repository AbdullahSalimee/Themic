// ── HELPERS ──
export function hexBlend(hex1, hex2, t) {
  try {
    const r1=parseInt(hex1.slice(1,3),16), g1=parseInt(hex1.slice(3,5),16), b1=parseInt(hex1.slice(5,7),16);
    const r2=parseInt(hex2.slice(1,3),16), g2=parseInt(hex2.slice(3,5),16), b2=parseInt(hex2.slice(5,7),16);
    return `rgb(${Math.round(r1+(r2-r1)*t)},${Math.round(g1+(g2-g1)*t)},${Math.round(b1+(b2-b1)*t)})`;
  } catch { return hex1; }
}

export function darken(hex) {
  try {
    let r=parseInt(hex.slice(1,3),16), g=parseInt(hex.slice(3,5),16), b=parseInt(hex.slice(5,7),16);
    r=Math.max(0,r-40); g=Math.max(0,g-40); b=Math.max(0,b-40);
    return `rgb(${r},${g},${b})`;
  } catch { return hex; }
}

// ── PRESETS ──
export const PRESETS = {
  midnight: { bg:'#0e0d0b', text:'#ede8df', accent:'#d4873a', btn:'#d4873a', df:'Playfair Display, serif', bf:'DM Mono, monospace', btnType:'solid', btnRadius:'0px', cardRadius:'0px', cardShadow:'none' },
  arctic:   { bg:'#eef4fb', text:'#0d1f38', accent:'#2563eb', btn:'#2563eb', df:'Syne, sans-serif',         bf:'Outfit, sans-serif',  btnType:'solid', btnRadius:'8px',   cardRadius:'8px',  cardShadow:'0 4px 16px rgba(0,0,0,0.1)' },
  velvet:   { bg:'#0c0b18', text:'#ebe8ff', accent:'#8b5cf6', btn:'#8b5cf6', df:'Fraunces, serif',           bf:'DM Mono, monospace',  btnType:'solid', btnRadius:'100px', cardRadius:'16px', cardShadow:'0 0 24px rgba(139,92,246,0.3)' },
  forest:   { bg:'#f4f0e8', text:'#1c2b1a', accent:'#3d7a50', btn:'#3d7a50', df:'Libre Baskerville, serif',  bf:'Outfit, sans-serif',  btnType:'solid', btnRadius:'4px',   cardRadius:'8px',  cardShadow:'0 2px 12px rgba(0,0,0,0.1)' },
  matrix:   { bg:'#050f07', text:'#d4f7da', accent:'#22c55e', btn:'#22c55e', df:'Unbounded, sans-serif',     bf:'JetBrains Mono, monospace', btnType:'neon', btnRadius:'0px', cardRadius:'0px', cardShadow:'0 0 20px rgba(34,197,94,0.2)' },
  sakura:   { bg:'#fff5f8', text:'#2d1520', accent:'#e8547a', btn:'#e8547a', df:'Cormorant Garamond, serif', bf:'Lora, serif',         btnType:'solid', btnRadius:'100px', cardRadius:'16px', cardShadow:'0 4px 20px rgba(232,84,122,0.15)' },
  bone:     { bg:'#f7f4ef', text:'#111111', accent:'#111111', btn:'#111111', df:'Bebas Neue, sans-serif',    bf:'Barlow Condensed, sans-serif', btnType:'solid', btnRadius:'0px', cardRadius:'0px', cardShadow:'none' },
  abyss:    { bg:'#040f11', text:'#d8f5f0', accent:'#0dd9b0', btn:'#0dd9b0', df:'Advent Pro, sans-serif',    bf:'JetBrains Mono, monospace',   btnType:'neon',  btnRadius:'0px', cardRadius:'4px',  cardShadow:'0 0 30px rgba(13,217,176,0.25)' },
};

// ── DEFAULT STATE ──
export const DEFAULT_STATE = {
  bg:'#0e0d0b', text:'#ede8df', accent:'#d4873a', btn:'#d4873a',
  surface:'#171410', border:'#2e2820',
  df:'Playfair Display, serif', bf:'DM Mono, monospace',
  btnRadius:'0px', btnType:'solid', btnShadow:'none',
  cardRadius:'0px', cardShadow:'none', inputRadius:'0px',
  pattern:'solid', transSpeed:'0.2s',
  bodyOp:65, cardOp:60,
  liftOn:true, glowOn:false, gradText:false, blurNav:false, italic:false,
};

// ── PATTERNS ──
export const PATTERNS = {
  solid: () => '',
  grain: () => `url("data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' width='200' height='200'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4'/><feColorMatrix type='saturate' values='0'/></filter><rect width='200' height='200' filter='url(%23n)' opacity='0.06'/></svg>")`,
  dots: (bg, text) => `radial-gradient(circle, ${hexBlend(bg, text, 0.08)} 1px, transparent 1px)`,
  grid: (bg, text) => `linear-gradient(${hexBlend(bg, text, 0.07)} 1px,transparent 1px),linear-gradient(90deg,${hexBlend(bg, text, 0.07)} 1px,transparent 1px)`,
  lines: (bg, text) => `repeating-linear-gradient(0deg,${hexBlend(bg, text, 0.05)} 0px,${hexBlend(bg, text, 0.05)} 1px,transparent 1px,transparent 22px)`,
  diag: (bg, text) => `repeating-linear-gradient(45deg,${hexBlend(bg, text, 0.04)} 0,${hexBlend(bg, text, 0.04)} 1px,transparent 0,transparent 50%)`,
  mesh: (bg, acc) => `radial-gradient(ellipse at 20% 30%,${acc}28 0%,transparent 55%),radial-gradient(ellipse at 80% 70%,${acc}18 0%,transparent 55%)`,
  noise: () => `url("data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' width='150' height='150'><filter id='t'><feTurbulence type='turbulence' baseFrequency='0.5' numOctaves='2'/></filter><rect width='150' height='150' filter='url(%23t)' opacity='0.035'/></svg>")`
};

export const PATTERN_SIZES = { dots:'20px 20px', grid:'24px 24px', diag:'16px 16px' };

// ── PALETTES ──
export const DARK_PALETTES = [
  { name:'Midnight Ember', chips:['#0e0d0b','#1e1a14','#ede8df','#d4873a','#a05c20'], args:['#0e0d0b','#ede8df','#d4873a','#d4873a','#0e0d0b'] },
  { name:'Velvet Night',   chips:['#0c0b18','#1a1730','#ebe8ff','#8b5cf6','#c084fc'], args:['#0c0b18','#ebe8ff','#8b5cf6','#8b5cf6','#0c0b18'] },
  { name:'Abyss Teal',     chips:['#040f11','#082028','#d8f5f0','#0dd9b0','#0891b2'], args:['#040f11','#d8f5f0','#0dd9b0','#0dd9b0','#040f11'] },
  { name:'Carbon Rose',    chips:['#100d0d','#221418','#fce8ee','#f43f7f','#fb923c'], args:['#100d0d','#fce8ee','#f43f7f','#f43f7f','#100d0d'] },
  { name:'Matrix Green',   chips:['#050f07','#0a1f0d','#d4f7da','#22c55e','#4ade80'], args:['#050f07','#d4f7da','#22c55e','#22c55e','#050f07'] },
  { name:'Cobalt Ink',     chips:['#080e1f','#101e40','#dce8ff','#3b82f6','#60a5fa'], args:['#080e1f','#dce8ff','#3b82f6','#3b82f6','#080e1f'] },
];

export const LIGHT_PALETTES = [
  { name:'Cream & Rust',  chips:['#fdf8f2','#f0dcc8','#2c1810','#c0392b','#e67e22'], args:['#fdf8f2','#2c1810','#c0392b','#c0392b','#ffffff'] },
  { name:'Forest Linen',  chips:['#f4f0e8','#d9e8d1','#1c2b1a','#3d7a50','#86bc95'], args:['#f4f0e8','#1c2b1a','#3d7a50','#3d7a50','#ffffff'] },
  { name:'Arctic Glass',  chips:['#eef4fb','#c8dcf8','#0d1f38','#2563eb','#38bdf8'], args:['#eef4fb','#0d1f38','#2563eb','#2563eb','#ffffff'] },
  { name:'Sakura Mist',   chips:['#fff5f8','#ffd6e4','#2d1520','#e8547a','#b87ab8'], args:['#fff5f8','#2d1520','#e8547a','#e8547a','#ffffff'] },
  { name:'Bone Minimal',  chips:['#f7f4ef','#e8e4de','#999','#444','#111'],          args:['#f7f4ef','#111111','#111111','#111111','#f7f4ef'] },
  { name:'Sand & Indigo', chips:['#f5f0e0','#e0d8c0','#1e1b4b','#4f46e5','#818cf8'], args:['#f5f0e0','#1e1b4b','#4f46e5','#4f46e5','#ffffff'] },
];

// ── ACCENT SWATCHES ──
export const ACCENT_STANDARD = [
  { color:'#d4873a', tip:'Amber'  },{ color:'#e8572a', tip:'Ember'  },{ color:'#c0392b', tip:'Ruby'    },
  { color:'#f43f7f', tip:'Rose'   },{ color:'#8b5cf6', tip:'Violet' },{ color:'#6366f1', tip:'Indigo'  },
  { color:'#3b82f6', tip:'Blue'   },{ color:'#0dd9b0', tip:'Teal'   },{ color:'#22c55e', tip:'Green'   },
  { color:'#f59e0b', tip:'Gold'   },{ color:'#f97316', tip:'Orange' },{ color:'#06b6d4', tip:'Cyan'    },
];
export const ACCENT_VIVID = [
  { color:'#ff0080', tip:'Hot Pink' },{ color:'#ff4d00', tip:'Neon Red' },{ color:'#ffcc00', tip:'Electric' },
  { color:'#00ff88', tip:'Neon Grn' },{ color:'#00d4ff', tip:'Neon Sky' },{ color:'#bf5fff', tip:'Neon Pur' },
  { color:'#ff6b35', tip:'Coral'    },{ color:'#fbbf24', tip:'Honey'    },{ color:'#10b981', tip:'Emerald'  },
  { color:'#db2777', tip:'Fuchsia'  },{ color:'#7c3aed', tip:'Purple'   },{ color:'#0369a1', tip:'Ocean'    },
];
export const ACCENT_MUTED = [
  { color:'#9b8b7a', tip:'Taupe' },{ color:'#7a8c6e', tip:'Sage'  },{ color:'#8c6e7a', tip:'Mauve' },
  { color:'#7a6e8c', tip:'Slate' },{ color:'#8c7a6e', tip:'Clay'  },{ color:'#6e8c7a', tip:'Fern'  },
];

// ── FONTS ──
export const DISPLAY_SERIF = [
  { tag:'Playfair', family:'Playfair Display, serif', sub:'Classic elegance', previewStyle:{fontFamily:"'Playfair Display',serif",fontWeight:'700'} },
  { tag:'Fraunces', family:'Fraunces, serif', sub:'Optical quirky', previewStyle:{fontFamily:"'Fraunces',serif",fontWeight:'900'} },
  { tag:'Cormorant', family:'Cormorant Garamond, serif', sub:'Luxury italic', previewStyle:{fontFamily:"'Cormorant Garamond',serif",fontWeight:'600',fontStyle:'italic',fontSize:'1.4rem'} },
  { tag:'DM Serif', family:'DM Serif Display, serif', sub:'Editorial serif', previewStyle:{fontFamily:"'DM Serif Display',serif"} },
  { tag:'Baskerville', family:'Libre Baskerville, serif', sub:'Literary classic', previewStyle:{fontFamily:"'Libre Baskerville',serif",fontWeight:'700'} },
  { tag:'Lora', family:'Lora, serif', sub:'Warm serif', previewStyle:{fontFamily:"'Lora',serif",fontWeight:'700',fontStyle:'italic'} },
  { tag:'Italiana', family:'Italiana, serif', sub:'Fashion house', previewStyle:{fontFamily:"'Italiana',serif",fontSize:'1.4rem'} },
  { tag:'Kaisei Decol', family:'Kaisei Decol, serif', sub:'Japanese-inspired', previewStyle:{fontFamily:"'Kaisei Decol',serif",fontWeight:'700'} },
];
export const DISPLAY_SANS = [
  { tag:'Bebas Neue', family:'Bebas Neue, sans-serif', sub:'Bold all-caps', previewStyle:{fontFamily:"'Bebas Neue',sans-serif",fontSize:'1.6rem',letterSpacing:'2px'}, previewText:'HEADLINE' },
  { tag:'Syne', family:'Syne, sans-serif', sub:'Geometric grotesque', previewStyle:{fontFamily:"'Syne',sans-serif",fontWeight:'800'} },
  { tag:'Unbounded', family:'Unbounded, sans-serif', sub:'Techy wide', previewStyle:{fontFamily:"'Unbounded',sans-serif",fontWeight:'900',fontSize:'1rem'}, previewText:'HEAD' },
  { tag:'Righteous', family:'Righteous, sans-serif', sub:'Retro friendly', previewStyle:{fontFamily:"'Righteous',sans-serif",fontSize:'1.2rem'} },
  { tag:'Barlow Cond.', family:'Barlow Condensed, sans-serif', sub:'Condensed clean', previewStyle:{fontFamily:"'Barlow Condensed',sans-serif",fontWeight:'700',fontSize:'1.5rem'} },
  { tag:'Advent Pro', family:'Advent Pro, sans-serif', sub:'Futuristic thin', previewStyle:{fontFamily:"'Advent Pro',sans-serif",fontWeight:'700'} },
];
export const BODY_FONTS = [
  { tag:'DM Mono', family:'DM Mono, monospace', sub:'Clean mono', previewStyle:{fontFamily:"'DM Mono',monospace",fontSize:'1rem'} },
  { tag:'Outfit', family:'Outfit, sans-serif', sub:'Friendly sans', previewStyle:{fontFamily:"'Outfit',sans-serif",fontSize:'1.1rem'} },
  { tag:'JetBrains', family:'JetBrains Mono, monospace', sub:'Dev-grade mono', previewStyle:{fontFamily:"'JetBrains Mono',monospace",fontSize:'0.9rem'} },
  { tag:'Syne', family:'Syne, sans-serif', sub:'Matching display', previewStyle:{fontFamily:"'Syne',sans-serif",fontSize:'1rem'} },
  { tag:'Barlow', family:'Barlow Condensed, sans-serif', sub:'Condensed clean', previewStyle:{fontFamily:"'Barlow Condensed',sans-serif",fontSize:'1.1rem'} },
  { tag:'Lora', family:'Lora, serif', sub:'Readable serif', previewStyle:{fontFamily:"'Lora',serif",fontSize:'0.95rem'} },
];

// ── BUTTON STYLES ──
export const BUTTON_STYLES = [
  { label:'Sharp Edge',  btnRadius:'0px',   btnShadow:'none', btnType:'solid',   dbClass:'sharp'       },
  { label:'Full Pill',   btnRadius:'100px', btnShadow:'none', btnType:'solid',   dbClass:'pill'        },
  { label:'Soft Round',  btnRadius:'8px',   btnShadow:'none', btnType:'solid',   dbClass:'soft'        },
  { label:'Brutalist',   btnRadius:'0px',   btnShadow:'4px 4px 0 rgba(0,0,0,0.8)', btnType:'solid', dbClass:'brutalist' },
  { label:'Ghost Sharp', btnRadius:'0px',   btnShadow:'none', btnType:'ghost',   dbClass:'ghost'       },
  { label:'Ghost Round', btnRadius:'8px',   btnShadow:'none', btnType:'ghost',   dbClass:'ghost-r'     },
  { label:'Ghost Pill',  btnRadius:'100px', btnShadow:'none', btnType:'ghost',   dbClass:'ghost-p'     },
  { label:'Underline',   btnRadius:'0px',   btnShadow:'none', btnType:'link',    dbClass:'link-s'      },
  { label:'Neon Glow',   btnRadius:'0px',   btnShadow:'0 0 16px rgba(212,135,58,0.5)', btnType:'neon', dbClass:'neon' },
  { label:'Frosted',     btnRadius:'6px',   btnShadow:'none', btnType:'frosted', dbClass:'frosted'     },
  { label:'Fat Outline', btnRadius:'0',     btnShadow:'none', btnType:'fat',     dbClass:'outline-fat' },
  { label:'3D Raised',   btnRadius:'4px',   btnShadow:'none', btnType:'raised',  dbClass:'raised'      },
];

// ── PRESETS LIST ──
export const PRESET_LIST = [
  { key:'midnight', name:'Midnight Ember', sub:'Dark warm serif',   bg:'#0e0d0b', bar:'#d4873a', barW:'55%', btnDemo:{background:'#d4873a',borderRadius:'0'} },
  { key:'arctic',   name:'Arctic Glass',   sub:'Light blue clean',  bg:'#eef4fb', bar:'#3b82f6', barW:'60%', btnDemo:{background:'#2563eb',borderRadius:'8px'} },
  { key:'velvet',   name:'Velvet Night',   sub:'Dark purple pill',  bg:'#0c0b18', bar:'#8b5cf6', barW:'50%', btnDemo:{background:'#8b5cf6',borderRadius:'100px'} },
  { key:'forest',   name:'Forest Linen',   sub:'Light earthy soft', bg:'#f4f0e8', bar:'#3d7a50', barW:'48%', btnDemo:{background:'#3d7a50',borderRadius:'4px'} },
  { key:'matrix',   name:'Matrix Green',   sub:'Dark neon mono',    bg:'#050f07', bar:'#22c55e', barW:'45%', btnDemo:{background:'transparent',border:'1.5px solid #22c55e',boxShadow:'0 0 6px rgba(34,197,94,0.3)'} },
  { key:'sakura',   name:'Sakura Mist',    sub:'Light pink luxury', bg:'#fff5f8', bar:'#e8547a', barW:'52%', btnDemo:{background:'#e8547a',borderRadius:'100px'} },
  { key:'bone',     name:'Bone Minimal',   sub:'Light mono stark',  bg:'#f7f4ef', bar:'#111',    barW:'42%', btnDemo:{background:'#111',borderRadius:'0'} },
  { key:'abyss',    name:'Abyss Teal',     sub:'Dark neon techy',   bg:'#040f11', bar:'#0dd9b0', barW:'58%', btnDemo:{background:'transparent',border:'1.5px solid #0dd9b0',boxShadow:'0 0 8px rgba(13,217,176,0.38)'} },
];
