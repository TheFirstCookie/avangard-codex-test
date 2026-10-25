import { writeFile } from 'node:fs/promises';
const ua = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36';
const css = await (await fetch('https://fonts.googleapis.com/css2?family=Manrope:wght@200..800&family=Barlow+Condensed:wght@600&display=swap', { headers: { 'User-Agent': ua } })).text();
let output = '';
for (const match of css.matchAll(/\/\* (latin(?:-ext)?) \*\/\s*(@font-face\s*\{[^}]+\})/g)) {
  let rule = match[2];
  const family = rule.includes('Manrope') ? 'manrope' : 'barlow-condensed';
  const url = rule.match(/url\(([^)]+)\)/)[1];
  const name = `${family}-${match[1]}.woff2`;
  const response = await fetch(url);
  if (!response.ok) throw new Error('Font download failed');
  await writeFile('dist/assets/' + name, Buffer.from(await response.arrayBuffer()));
  rule = rule.replace(url, 'assets/' + name).replace("'Barlow Condensed'", 'Barlow');
  output += rule + '\n';
}
await writeFile('dist/fonts.css', output);
console.log('Local fonts: Latin + Romanian extended glyphs.');
