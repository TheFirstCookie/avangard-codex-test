import { parseHTML } from '../qa/dom.mjs';
const sites = ['https://lucauto.md/', 'https://mdetailing.md/', 'https://unlimboost.md/ro', 'https://asterra.md/', 'https://maib.md/', 'https://www.carvertical.com/md/'];
for (const url of sites) {
  try {
    const response = await fetch(url);
    const source = await response.text();
    const { document } = parseHTML(source);
    console.log(`\n${response.url} ${response.status} ${source.length}`);
    for (const image of [...document.querySelectorAll('img')].slice(0, 20)) console.log(image.getAttribute('src') || image.getAttribute('data-src') || '', image.alt);
    for (const tag of document.querySelectorAll('meta[property="og:image"],meta[name="twitter:image"]')) console.log(tag.getAttribute('property') || tag.getAttribute('name'), tag.content);
  } catch (error) { console.log(url, error.message); }
}
