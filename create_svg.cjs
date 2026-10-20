const fs = require('fs');
const { path } = JSON.parse(fs.readFileSync('public/ac_path.json', 'utf8'));

const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="211.09 144.2 572.84 572.98" width="100%" height="100%">
  <path fill="#FFFFFF" d="${path}" />
</svg>`;

fs.writeFileSync('public/ac_logo_white.svg', svg);
console.log('Saved to public/ac_logo_white.svg');
