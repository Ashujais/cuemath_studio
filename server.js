// ─────────────────────────────────────────────
//  server.js  —  CueStudio API Proxy
//
//  Proxies requests from the browser to Anthropic's
//  API so the API key is never exposed client-side.
//
//  Usage:
//    npm install
//    ANTHROPIC_API_KEY=sk-ant-... node server.js
// ─────────────────────────────────────────────

const express = require('express');
const cors    = require('cors');
const fetch   = (...args) => import('node-fetch').then(({default: f}) => f(...args));
const path    = require('path');

const app  = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Serve static files (index.html, style.css, app.js)
app.use(express.static(path.join(__dirname)));

// ── Proxy endpoint ───────────────────────────
app.post('/api/generate', async (req, res) => {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: 'ANTHROPIC_API_KEY not set in environment' });
  }

  const { messages, max_tokens = 1200 } = req.body;

  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type':      'application/json',
        'x-api-key':         apiKey,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model:      'claude-sonnet-4-20250514',
        max_tokens,
        messages
      })
    });

    if (!response.ok) {
      const err = await response.text();
      return res.status(response.status).json({ error: err });
    }

    const data = await response.json();
    res.json(data);
  } catch (err) {
    console.error('Proxy error:', err);
    res.status(500).json({ error: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`CueStudio running at http://localhost:${PORT}`);
  console.log(`API key set: ${!!process.env.ANTHROPIC_API_KEY}`);
});
