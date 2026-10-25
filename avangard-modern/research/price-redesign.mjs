import { readFile, writeFile } from 'node:fs/promises';
const path = 'dist/index.html';
let html = await readFile(path, 'utf8');
html = html.replace(/<div class="price">(\d+)<span>€ \/ ([^<]+)<\/span><\/div>/g, (_, amount, unit) =>
  `<div class="price" aria-label="${amount} euro per ${unit}"><span class="price-amount">${amount}</span><span class="price-unit"><b>€</b><i>/ ${unit}</i></span></div>`
);
await writeFile(path, html);

let css = await readFile('dist/styles.css', 'utf8');
css = css.split('/* Pricing built as clear, high contrast package offers. */')[0];
css += `
/* Pricing built as clear, high contrast package offers. */
.pricing-grid{gap:24px;align-items:stretch;padding-top:32px}
.price-card{background:#fff;border:2px solid #d5e4f0;padding:32px 28px 28px;overflow:visible;box-shadow:0 12px 32px #0D47A10D;transition:transform .3s,border-color .3s,box-shadow .3s}
.price-card:not(.featured):hover{transform:translateY(-6px);border-color:#1E88E5;box-shadow:0 20px 42px #0D47A11A}
.price-card>.eyebrow{display:inline-flex;align-self:flex-start;background:#e8f1f9;color:#0D47A1;padding:8px 11px;margin-bottom:18px;min-height:29px}
.price-card h3{font-family:var(--body);font-size:23px;letter-spacing:-.035em;font-weight:750}
.price-card>p:not(.eyebrow){min-height:50px;font-size:12px;line-height:1.8}
.price{display:flex;align-items:baseline;gap:9px;margin:14px 0 8px;font-family:var(--display);font-size:1em;font-weight:700;line-height:1;white-space:nowrap}
.price-amount{font-family:var(--display);font-size:clamp(76px,7vw,104px);font-weight:700;letter-spacing:-.055em;line-height:.94}
.price-unit{display:inline-flex;align-items:baseline;gap:5px;white-space:nowrap}
.price-unit b{font:750 26px/1 var(--body);color:#1565C0}
.price-unit i{font:600 10px/1.2 var(--body);font-style:normal;color:#626D77}
.price-card .price .price-amount{font-size:clamp(76px,7vw,104px);margin:0;line-height:.94}
.price-card .price .price-unit{font-size:inherit;margin:0;color:#626D77;line-height:1.2}
.price-card .check-list{margin-bottom:28px}
.price-card .check-list li{font-size:11px;padding-block:12px;color:#344454;border-color:#dfe6eb}
.price-card .check-list li:before{color:#287D2B}
.price-card .button{margin-top:auto;min-height:52px;padding:14px 17px;font-size:11px}
.price-card.featured{position:relative;z-index:2;transform:translateY(-12px);background:#0D47A1;border:0;border-top:6px solid #4CAF50;color:#fff;padding:64px 32px 32px;box-shadow:0 24px 56px #0D47A135}
.price-card.featured:after{content:'99 €';position:absolute;right:18px;top:53px;font:600 10px/1 var(--body);color:#fff;background:#ffffff20;border:1px solid #ffffff45;border-radius:999px;padding:8px 12px;letter-spacing:.03em}
.price-card.featured:hover{transform:translateY(-17px)}
.price-card.featured>.eyebrow{background:#ffffff18;color:#e0f1ff;margin-bottom:19px}
.price-card.featured h3{font-size:28px;color:#fff}
.price-card.featured>p:not(.eyebrow){color:#d2e2f2}
.price-card.featured .price{margin-block:19px 11px}
.price-card.featured .price-amount{font-size:clamp(100px,9.2vw,138px);color:#fff}
.price-card.featured .price-unit b{font-size:34px;color:#8be09a}
.price-card.featured .price-unit i{font-size:11px;color:#d2e2f2}
.price-card.featured .price .price-amount{font-size:clamp(100px,9.2vw,138px)}
.price-card.featured .price .price-unit{margin:0;color:#d2e2f2}
.price-card.featured .check-list li{font-size:12px;color:#f0f5fb;border-color:#ffffff33}
.price-card.featured .check-list li:before{color:#8be09a}
.price-card.featured .recommended{top:16px;left:32px;right:auto;height:auto;position:absolute;background:transparent;color:#9cebaa;font-size:10px;letter-spacing:.13em;padding:0;display:flex;gap:9px}
.price-card.featured .recommended span{display:none}
.price-card.featured .button-primary{background:#4CAF50;color:#0b2a10;font-size:12px;min-height:58px}
.price-card.featured .button-primary:hover{background:#79cc72;color:#071909}
.promo-strip{margin-top:34px;background:#4CAF50;border:0;color:#09260d;padding:0;min-height:94px;gap:22px}
.promo-value{display:grid;place-items:center;align-self:stretch;background:#0D47A1;color:#fff;font-size:46px;padding-inline:24px}
.promo-strip p,.promo-strip p strong{color:#09260d;font-size:12px;line-height:1.8}
.promo-strip p strong{font-weight:800}
.promo-strip .inline-link{align-self:center;margin-left:auto;margin-right:22px;background:#0D47A1;color:#fff;border:0;padding:12px 15px;font-size:10px}
@media(max-width:1150px){.price-card{padding:28px 22px 24px}.price-card.featured{padding:61px 24px 27px}.price-card.featured .recommended{left:24px}.price-amount{font-size:82px}.price-card.featured .price-amount{font-size:108px}.price-unit b{font-size:22px}.price-unit i{font-size:9px}}
@media(max-width:900px){.price-amount{font-size:74px}.price-card.featured .price-amount{font-size:99px}.price-card{padding:24px 17px}.price-card.featured{padding:60px 20px 24px}.price-card.featured .recommended{left:20px}.price-card h3{font-size:19px}.price-card.featured h3{font-size:24px}.price-unit{gap:3px}.price-unit b{font-size:19px}.price-card .check-list li{font-size:10px}.price-card.featured .check-list li{font-size:11px}}
@media(max-width:640px){.pricing-grid{gap:36px;padding-top:18px}.price-card{padding:28px 25px}.price-card.featured{order:-1;margin-top:12px;padding:67px 25px 29px;transform:none}.price-card.featured:hover{transform:translateY(-3px)}.price-card.featured .recommended{left:25px;top:22px}.price-card h3{font-size:24px}.price-card.featured h3{font-size:29px}.price-amount{font-size:92px}.price-card.featured .price-amount{font-size:122px}.price-unit b{font-size:24px}.price-card.featured .price-unit b{font-size:34px}.price-unit i{font-size:11px}.price-card .check-list li{font-size:12px}.price-card .button{font-size:12px}.promo-strip{display:grid;grid-template-columns:auto 1fr;gap:0;margin-top:32px}.promo-value{grid-row:span 2;padding-inline:20px;font-size:42px}.promo-strip p{padding:14px 15px 5px;font-size:11px}.promo-strip p strong{font-size:11px}.promo-strip .inline-link{grid-column:2;justify-self:start;margin:4px 0 14px 15px}}
`;
await writeFile('dist/styles.css', css);
