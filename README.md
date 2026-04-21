# CueStudio — Cuemath Social Media Studio

Turn a rough idea into a polished, ready-to-post social media creative.

## Project Structure

```
cue-studio/
├── index.html        ← UI markup
├── style.css         ← All styles
├── app.js            ← All frontend logic
├── server.js         ← Express proxy (keeps API key server-side)
├── package.json
└── cuemath_studio.html  ← Self-contained single-file version
```

## Quick Start

### Option A — Single file (no server needed, for local testing only)
Open `cuemath_studio.html` directly in a browser.
> Note: Requires CORS to be disabled or a browser extension. Not suitable for production.

### Option B — Full project with backend proxy (recommended)

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Set your Anthropic API key**
   ```bash
   export ANTHROPIC_API_KEY=sk-ant-...
   ```

3. **Start the server**
   ```bash
   npm start
   # or for development with auto-reload:
   npm run dev
   ```

4. **Open in browser**
   ```
   http://localhost:3000
   ```

## Features

- **3 formats** — Carousel (5 slides), Post (1:1), Story (9:16)
- **4 tones** — Warm & caring, Bold & punchy, Science-backed, Playful & fun
- **5 brand palettes** — Cuemath Orange, Ocean, Forest, Sunset, Dark
- **Live editing** — Edit headline, subtext, emoji in real time
- **Regenerate** — Regenerate any single slide with one click
- **Add / delete slides** — Full carousel control
- **Copy caption** — One-click copy of caption + hashtags

## How It Works

1. User types an idea in natural language
2. Frontend sends it to `/api/generate` (server.js)
3. Server proxies it to Anthropic's API with a structured prompt
4. Claude returns structured JSON (slides + caption + hashtags)
5. Frontend renders the slides as designed visual creatives

## Customisation

- **Brand colors** — Edit the `PALETTES` object in `app.js`
- **Tone guides** — Edit `TONE_GUIDES` in `app.js`
- **Slide counts** — Edit `FORMAT_INSTRUCTIONS` in `app.js`
- **Fonts** — Change the Google Fonts import in `style.css`
- **Logo / watermark** — Search for "CUEMATH" in `app.js`
