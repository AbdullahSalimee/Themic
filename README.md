# Theme Studio II — React App

A theme design tool built with React + Vite.

## Getting Started

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Deployment

### Vercel
```bash
npm install -g vercel
vercel
```

### Netlify
```bash
npm run build
# Upload the `dist/` folder to Netlify, or connect your git repo
```

### GitHub Pages
```bash
npm install --save-dev gh-pages
# Add "homepage": "https://yourusername.github.io/repo-name" to package.json
# Add deploy script: "deploy": "gh-pages -d dist"
npm run build && npm run deploy
```

### Any static host
Just run `npm run build` and deploy the `dist/` directory.
