import { readFile, writeFile } from 'node:fs/promises';

const path = 'dist/index.html';
let html = await readFile(path, 'utf8');
const partnerSection = `<section class="partners section-light" id="parteneri"><div class="wrap"><div class="partners-heading"><p class="eyebrow"><span class="square"></span> PARTENERI AVANGARD</p><h2>Oameni buni.<br><span class="muted">Lucrări pe măsură.</span></h2></div><div class="partner-list">
<a class="partner-tile" href="https://www.instagram.com/lucauto_service" target="_blank" rel="noopener noreferrer" aria-label="LucAuto — profilul oficial de Instagram"><img src="assets/partner-lucauto.png" alt="Logo LucAuto Avadis Group" width="550" height="151" loading="lazy"><span>LUCAUTO <i>AVADIS GROUP</i></span></a>
<a class="partner-tile partner-wordmark aquaart" href="https://www.tiktok.com/@aquaartmoldova" target="_blank" rel="noopener noreferrer" aria-label="Aquaart — profilul oficial de TikTok"><span>AQUA<span>ART</span></span><small>VEZI AQUAART PE TIKTOK ↗</small></a>
<a class="partner-tile" href="https://www.instagram.com/mdetailing.md" target="_blank" rel="noopener noreferrer" aria-label="Mdetailing — profilul oficial de Instagram"><img src="assets/partner-mdetailing.png" alt="Logo Mdetailing" width="600" height="600" loading="lazy"><span>MDETAILING</span></a>
<a class="partner-tile partner-wordmark retus" href="https://www.instagram.com/retus_auto_store" target="_blank" rel="noopener noreferrer" aria-label="Retuș Auto — profilul oficial de Instagram"><span>RETUȘ<span>AUTO</span></span><small>VEZI RETUȘ AUTO PE INSTAGRAM ↗</small></a>
<a class="partner-tile" href="https://www.instagram.com/unlimboost_moldova" target="_blank" rel="noopener noreferrer" aria-label="UnlimBoost — profilul oficial de Instagram"><img src="assets/partner-unlimboost.png" alt="Logo UnlimBoost Car Service and Tuning" width="600" height="248" loading="lazy"><span>UNLIMBOOST <i>CAR SERVICE &amp; TUNING</i></span></a>
<a class="partner-tile" href="https://www.carvertical.com/md" target="_blank" rel="noopener noreferrer" aria-label="carVertical — site-ul oficial"><img src="assets/partner-carvertical.png" alt="Logo carVertical" width="1000" height="138" loading="lazy"><span>CARVERTICAL <i>ISTORIC AUTO</i></span></a>
<a class="partner-tile" href="https://www.asterra.md" target="_blank" rel="noopener noreferrer" aria-label="Asterra Grup — site-ul oficial"><img src="assets/partner-asterra.png" alt="Logo Asterra Grup" width="268" height="100" loading="lazy"><span>ASTERRA <i>GRUP</i></span></a>
<a class="partner-tile" href="https://www.maib.md" target="_blank" rel="noopener noreferrer" aria-label="maib — site-ul oficial"><img src="assets/partner-maib.png" alt="Simbolul oficial maib" width="600" height="600" loading="lazy"><span>maib <i>BANCA TA</i></span></a>
</div></div></section>`;
if (!html.includes('partners-heading')) html = html.replace(/<section class="partners section-light"[\s\S]*?<\/section>/, partnerSection);
html = html.replace('<strong>Folosește codul AVANGARD2026 la programare.</strong>', '<strong>Folosește codul <code>AVANGARD2026</code> la programare.</strong>');
await writeFile(path, html);

let css = await readFile('dist/styles.css', 'utf8');
css = css.split('/* Partner marks and promo offer, sourced and enlarged. */')[0];
css += `
/* Partner marks and promo offer, sourced and enlarged. */
.promo-strip{min-height:114px;gap:0}
.promo-value{font-size:55px;padding-inline:30px}
.promo-strip p{font-size:15px;line-height:1.7;padding:0 27px}
.promo-strip p strong{font-size:15px}
.promo-strip code{display:inline-block;margin:3px 4px;padding:3px 9px;background:#fff;color:#0D47A1;border:1px solid #0D47A12b;font:850 19px/1.3 var(--body);letter-spacing:.055em}
.promo-strip .inline-link{font-size:12px;padding:14px 19px}
.partners{padding:76px 0 85px;background:#f5f5f5;border-top:1px solid #dbe3ea}
.partners-heading{display:flex;align-items:end;justify-content:space-between;gap:20px;margin-bottom:36px}
.partners-heading .eyebrow{font-size:10px}
.partners-heading h2{font-size:39px}
.partner-list{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:16px}
.partner-list .partner-tile{position:relative;min-height:154px;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:8px;padding:20px;background:#fff;border:1px solid #d5e1eb;box-shadow:0 5px 16px #0D47A10A;overflow:hidden;transition:transform .25s,border-color .25s,box-shadow .25s}
.partner-list .partner-tile:after{content:'↗';position:absolute;right:12px;top:10px;color:#0D47A1;font-size:17px;opacity:0;transform:translate(-3px,3px);transition:opacity .2s,transform .2s}
.partner-list .partner-tile:hover,.partner-list .partner-tile:focus-visible{transform:translateY(-4px);border-color:#1E88E5;box-shadow:0 13px 28px #0D47A11a}
.partner-list .partner-tile:hover:after,.partner-list .partner-tile:focus-visible:after{opacity:1;transform:none}
.partner-list .partner-tile img{width:100%;height:88px;object-fit:contain;object-position:center}
.partner-list .partner-tile>span:not(.inline){font:750 12px/1.2 var(--body);letter-spacing:.09em;color:#344454;text-align:center}
.partner-list .partner-tile>span>i{display:block;margin-top:4px;font:600 8px/1.4 var(--body);font-style:normal;letter-spacing:.11em;color:#6b7d8b}
.partner-list .partner-tile.partner-wordmark>span{font:850 31px/.95 var(--body);letter-spacing:.015em}
.partner-list .partner-wordmark.aquaart>span{color:#0D47A1}
.partner-list .partner-wordmark.aquaart>span>span{color:#1E88E5}
.partner-list .partner-wordmark.retus>span{color:#0D47A1;letter-spacing:.09em}
.partner-list .partner-wordmark.retus>span>span{display:block;margin-top:4px;font-size:15px;color:#4CAF50}
.partner-list .partner-tile>small{font:700 8px/1.5 var(--body);letter-spacing:.055em;color:#68798a;text-align:center}
@media(max-width:900px){.partners-heading h2{font-size:34px}.partner-list{grid-template-columns:repeat(4,minmax(0,1fr));gap:12px}.partner-list .partner-tile{min-height:136px;padding:14px}.partner-list .partner-tile img{height:76px}}
@media(max-width:640px){.partners{padding:55px 0 62px}.partners-heading{align-items:start;flex-direction:column;margin-bottom:24px}.partners-heading .eyebrow{font-size:8px}.partners-heading h2{font-size:36px}.partner-list{grid-template-columns:repeat(2,minmax(0,1fr));gap:11px}.partner-list .partner-tile{min-height:128px;padding:12px;gap:7px}.partner-list .partner-tile img{height:72px}.partner-list .partner-tile>span:not(.inline){font-size:10px}.partner-list .partner-tile.partner-wordmark>span{font-size:25px}.partner-list .partner-tile>small{font-size:7px}.promo-value{font-size:43px;padding-inline:17px}.promo-strip p{font-size:12px;line-height:1.7;padding:12px 14px 4px}.promo-strip p strong{font-size:12px}.promo-strip code{font-size:16px;letter-spacing:.035em;padding:3px 6px}.promo-strip .inline-link{font-size:10px;padding:10px 13px}}
`;
await writeFile('dist/styles.css', css);
console.log('Partner grid now uses Avangard supplied official logo files and larger promo code.');
