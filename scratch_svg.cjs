const fs = require('fs');

const svg = fs.readFileSync('public/favicon.svg', 'utf8');
const dMatch = svg.match(/\sd="([^"]+)"/);
const d = dMatch[1];
const subpaths = d.split(/(?=[Mm])/).filter(s => s.trim().length > 0);

// Let's create an html file with:
// 1. Full original favicon:
// 2. Just subpath 1 + 2 (without subpath 0):
// 3. Subpath 0 alone:
// 4. Full path with fill-rule="evenodd" vs "nonzero"

const html = `<!DOCTYPE html>
<html>
<head>
<style>
  body { background: #0b0c10; color: white; font-family: sans-serif; display: grid; grid-template-columns: repeat(2, 1fr); gap: 20px; padding: 20px; }
  .card { background: #1f2833; padding: 15px; border-radius: 8px; text-align: center; }
  svg { background: #000; border: 1px solid #45f3ff; }
</style>
</head>
<body>
  <div class="card">
    <h3>Original favicon (circle + all subpaths)</h3>
    <svg width="200" height="200" viewBox="211.09 144.2 572.84 572.98">
      <circle cx="497.5" cy="430.7" r="280" fill="#FFFFFF" />
      <path fill="#000000" d="${d}" />
    </svg>
  </div>

  <div class="card">
    <h3>Subpaths 1 & 2 ONLY (fill="white")</h3>
    <svg width="200" height="200" viewBox="211.09 144.2 572.84 572.98">
      <path fill="#ffffff" d="${subpaths[1]} ${subpaths[2]}" />
    </svg>
  </div>

  <div class="card">
    <h3>Subpath 0 ONLY (fill="white")</h3>
    <svg width="200" height="200" viewBox="211.09 144.2 572.84 572.98">
      <path fill="#ffffff" d="${subpaths[0]}" />
    </svg>
  </div>

  <div class="card">
    <h3>All subpaths fill="white" (no circle)</h3>
    <svg width="200" height="200" viewBox="211.09 144.2 572.84 572.98">
      <path fill="#ffffff" fill-rule="evenodd" d="${d}" />
    </svg>
  </div>
</body>
</html>`;

fs.writeFileSync('public/test_svg_render.html', html);
console.log('public/test_svg_render.html written');
