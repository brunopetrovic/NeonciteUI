export function renderErrorPage(): string {
  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <title>This page didn't load — Neoncite/UI</title>
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;700&display=swap" rel="stylesheet" />
    <style>
      * { margin: 0; padding: 0; box-sizing: border-box; }
      body {
        font-family: 'JetBrains Mono', ui-monospace, monospace;
        background: #000000;
        color: #f2f2f7;
        display: grid;
        place-items: center;
        min-height: 100vh;
        padding: 1.5rem;
        -webkit-font-smoothing: antialiased;
      }
      .card {
        max-width: 28rem;
        width: 100%;
        text-align: center;
        padding: 3rem 2rem;
        border: 1px solid #2c2c2e;
        border-radius: 16px;
        background: linear-gradient(180deg, #121214 0%, #0a0a0c 100%);
        box-shadow: 0 16px 32px rgba(0,0,0,0.5), inset 0 1px 1px rgba(255,255,255,0.05);
      }
      .icon {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        width: 48px;
        height: 48px;
        border-radius: 12px;
        border: 1px solid rgba(255, 42, 157, 0.3);
        background: rgba(255, 42, 157, 0.05);
        margin-bottom: 1.5rem;
        box-shadow: 0 0 24px rgba(255, 42, 157, 0.2);
      }
      .icon svg { color: #ff2a9d; filter: drop-shadow(0 0 8px rgba(255,42,157,0.5)); }
      .code { font-size: 11px; text-transform: uppercase; letter-spacing: 0.15em; color: #ff2a9d; margin-bottom: 0.75rem; text-shadow: 0 0 12px rgba(255,42,157,0.5); }
      h1 { font-size: 1.5rem; font-weight: 700; margin-bottom: 0.75rem; color: #fff; text-shadow: 0 0 8px rgba(255,255,255,0.4); }
      p { font-size: 13px; color: #8e8e93; line-height: 1.6; margin-bottom: 2rem; }
      .actions { display: flex; gap: 0.5rem; justify-content: center; flex-wrap: wrap; }
      a, button {
        padding: 0.5rem 1.25rem;
        border-radius: 10px;
        font: 12px/1 'JetBrains Mono', monospace;
        font-weight: 600;
        text-transform: uppercase;
        letter-spacing: 0.1em;
        cursor: pointer;
        text-decoration: none;
        border: 1px solid transparent;
        transition: all 0.2s;
      }
      .primary {
        background: #ff2a9d;
        color: #fff;
        box-shadow: 0 0 24px rgba(255,42,157,0.4), inset 0 1px 1px rgba(255,255,255,0.3);
      }
      .primary:hover { box-shadow: 0 0 32px rgba(255,42,157,0.6), inset 0 1px 1px rgba(255,255,255,0.3); }
      .secondary {
        background: transparent;
        color: #f2f2f7;
        border-color: #2c2c2e;
      }
      .secondary:hover { background: rgba(255,255,255,0.05); }
    </style>
  </head>
  <body>
    <div class="card">
      <div class="icon">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon></svg>
      </div>
      <p class="code">500 — Internal Error</p>
      <h1>This page didn't load</h1>
      <p>Something went wrong on our end. You can try refreshing or head back home.</p>
      <div class="actions">
        <button class="primary" onclick="location.reload()">Try again</button>
        <a class="secondary" href="/">Go home</a>
      </div>
    </div>
  </body>
</html>`;
}
