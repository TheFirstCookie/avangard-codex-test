import { readFile, readdir, access, writeFile } from 'node:fs/promises';
import { resolve, extname } from 'node:path';
import vm from 'node:vm';
import assert from 'node:assert/strict';
import { parseHTML } from '../qa/dom.mjs';
const root = resolve('dist');
const pages = (await readdir(root)).filter(name => name.endsWith('.html'));
const documents = new Map();
const results = [];
for (const name of pages) {
  const { document } = parseHTML(await readFile(resolve(root, name), 'utf8'));
  documents.set(name, document);
  assert.equal(document.documentElement.lang, 'ro', `${name}: language`);
  assert.equal(document.querySelectorAll('h1').length, 1, `${name}: unique H1`);
  assert.ok(document.title.includes('Avangard'), `${name}: title`);
  assert.ok(document.querySelector('meta[name="description"]')?.getAttribute('content'), `${name}: description`);
  const ids = [...document.querySelectorAll('[id]')].map(element => element.id);
  assert.equal(ids.length, new Set(ids).size, `${name}: duplicate IDs`);
  assert.equal(document.querySelectorAll('header.site-header').length, 1);
  assert.equal(document.querySelectorAll('footer.site-footer').length, 1);
  for (const image of document.querySelectorAll('img')) assert.ok(image.hasAttribute('alt'), `${name}: image alt`);
}
let references = 0;
for (const [name, document] of documents) {
  for (const element of document.querySelectorAll('[href], [src]')) {
    const value = element.getAttribute('href') || element.getAttribute('src');
    if (!value || /^(https?:|mailto:|tel:|data:)/.test(value)) continue;
    const url = new URL(value, 'http://test/' + name);
    const file = decodeURIComponent(url.pathname.slice(1)) || 'index.html';
    await access(resolve(root, file));
    if (url.hash && extname(file) === '.html') assert.ok(documents.get(file)?.getElementById(decodeURIComponent(url.hash.slice(1))), `${name}: missing anchor ${value}`);
    references++;
  }
  const response = await fetch('http://127.0.0.1:4173/' + name);
  assert.equal(response.status, 200, name);
}
results.push(`${pages.length} pages: headings, metadata, image alt, unique IDs and HTTP 200.`);
results.push(`${references} local links/assets and anchors resolved.`);
const script = await readFile('dist/app.js', 'utf8');
function app(name, reduced = false) {
  const { window, document } = parseHTML(documents.get(name).toString());
  const storage = new Map();
  Object.assign(window, { innerWidth: 390, innerHeight: 844, scrollY: 0, matchMedia: () => ({ matches: reduced, addEventListener() {} }), localStorage: { getItem: key => storage.get(key), setItem: (key, value) => storage.set(key, value) }, requestAnimationFrame: callback => { callback(); return 1; }, setTimeout, clearTimeout });
  // No browser layout engine is available; this suite verifies DOM behavior only.
  const context = vm.createContext(window);
  vm.runInContext(script, context);
  return { window, document };
}
const { document: home } = app('index.html');
const menu = home.querySelector('.menu-toggle');
menu.click(); assert.equal(menu.getAttribute('aria-expanded'), 'true'); assert.ok(home.querySelector('#main-nav').classList.contains('is-open'));
home.querySelector('#main-nav a').click(); assert.equal(menu.getAttribute('aria-expanded'), 'false'); assert.ok(!home.body.classList.contains('menu-open'));
for (let i = 0; i < 4; i++) {
  home.querySelector(`.hotspot[data-inspection="${i}"]`).click();
  assert.equal(home.querySelector('#inspection-panel').getAttribute('aria-labelledby'), 'tab-' + i);
  assert.equal(home.querySelectorAll('[role=tab][aria-selected=true]').length, 1);
  assert.equal(home.querySelectorAll('.hotspot[aria-pressed=true]').length, 1);
  assert.equal(home.querySelectorAll('#inspection-panel li').length, 4);
}
const quote = home.querySelector('#review-quote').textContent;
home.querySelector('[data-review="1"]').click(); assert.notEqual(home.querySelector('#review-quote').textContent, quote);
home.querySelector('[data-review="-1"]').click(); assert.equal(home.querySelector('#review-quote').textContent, quote);
const motion = home.querySelector('.motion-toggle');
motion.click(); assert.ok(home.documentElement.classList.contains('motion-paused')); assert.equal(motion.getAttribute('aria-pressed'), 'true');
motion.click(); assert.ok(!home.documentElement.classList.contains('motion-paused'));
assert.ok(app('index.html', true).document.documentElement.classList.contains('motion-paused'));
results.push('DOM interactions: mobile menu, all four inspection hotspots/tabs, review next/previous, motion pause and reduced motion passed.');
const { document: blog } = app('blog.html');
for (const filter of blog.querySelectorAll('[data-filter]')) {
  filter.click();
  assert.equal(blog.querySelectorAll('[data-filter][aria-pressed=true]').length, 1);
  for (const card of blog.querySelectorAll('[data-category]')) assert.equal(card.hidden, filter.dataset.filter !== 'all' && card.dataset.category !== filter.dataset.filter);
}
results.push('Blog: every category filter shows matching articles.');
const source = await readFile('dist/app.js', 'utf8');
assert.ok(source.includes('encodeURIComponent(subject)') && source.includes('encodeURIComponent(body)'));
assert.equal(home.querySelectorAll('#contact-form [required]').length, 4);
assert.equal(home.querySelectorAll('#service-select option').length, 6);
for (const link of home.querySelectorAll('[data-service]')) assert.ok([...home.querySelectorAll('#service-select option')].some(option => option.textContent === link.dataset.service));
results.push('Contact: required fields, six valid service mappings and email encoding checked; no real messages sent.');
for (const stylesheet of ['styles.css', 'fonts.css']) {
  const css = await readFile('dist/' + stylesheet, 'utf8');
  for (const match of css.matchAll(/url\(['"]?([^)'"\s]+)['"]?\)/g)) await access(resolve(root, match[1]));
}
results.push('CSS font references resolved, including Romanian glyph subsets.');
results.push('LIMIT: visual rendering, viewport layout, native form validation and mail client handoff not browser-verified. Chrome launch denied by environment IPC permissions.');
await writeFile('qa/results.txt', results.join('\n') + '\n');
console.log(results.join('\n'));
