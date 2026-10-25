import { copyFile, readFile, writeFile } from 'node:fs/promises';

await copyFile('research/logo-original.png', 'dist/assets/logo-original.png');
let home = await readFile('dist/index.html', 'utf8');
home = home.replace(/(<a href="index\.html" class="brand"[^>]*>)<svg[\s\S]*?<\/svg>/, '$1<img class="brand-logo" src="assets/logo-original.png" alt="" width="1103" height="1049">');
home = home.replace('<a href="#home" class="footer-wordmark">AVANGARD<span>®</span></a>', '<a href="#home" class="footer-wordmark" aria-label="Avangard Autocheck — înapoi sus"><img class="footer-logo" src="assets/logo-original.png" alt="" width="1103" height="1049"><span class="footer-brand-name">AVANGARD<small>AUTOCHECK</small></span></a>');
home = home.replaceAll('href="favicon.svg" type="image/svg+xml"', 'href="assets/logo-original.png" type="image/png"');
home = home.replaceAll('button-red', 'button-primary').replaceAll('#151615', '#0A0A0A').replaceAll('#ed4a31', '#4CAF50');
await writeFile('dist/index.html', home);

let generator = await readFile('generate-pages.mjs', 'utf8');
generator = generator.replaceAll('button-red', 'button-primary').replaceAll('href="favicon.svg" type="image/svg+xml"', 'href="assets/logo-original.png" type="image/png"').replaceAll('#191b18', '#0A0A0A');
await writeFile('generate-pages.mjs', generator);

let css = await readFile('dist/styles.css', 'utf8');
css = css.replaceAll('--red', '--accent').replaceAll('button-red', 'button-primary');
const colors = {
  '#191b18': '#0A0A0A', '#f1f0e9': '#F5F5F5', '#787d73': '#737B84',
  '#e84a32': '#1E88E5', '#cc3823': '#1565C0', '#c53a25': '#1565C0', '#ff8068': '#66BB6A',
  '#d6d7ce': '#D9DEE3', '#363a33': '#252C34', '#191b18f5': '#0A0A0AF5',
  '#111512': '#0A0A0A', '#10140fe8': '#0A0A0AE8', '#10140fba': '#0A0A0ABA', '#10140f13': '#0A0A0A13',
  '#11150ff2': '#050505F2', '#11150f66': '#05050566', '#10140fd9': '#0A0A0AD9', '#10140f50': '#0A0A0A50',
  '#10140f': '#0A0A0A', '#10140f11': '#0A0A0A11', '#191b18e6': '#0A0A0AE6',
  '#e84a321a': '#1E88E51A', '#e84a321c': '#00BCD41C', '#e84a3217': '#00BCD417',
  '#141712': '#050505', '#363c30': '#263441', '#1d2419': '#0D1B2A',
  '#e5e7dc': '#E9EEF2', '#e3e6da': '#E7EDF2', '#e2e5d9': '#E7EDF2',
  '#737a69': '#65717D', '#747b69': '#65717D', '#747d68': '#65717D', '#747e68': '#65717D',
  '#646f57': '#526170', '#636d57': '#526170', '#414a38': '#344454', '#6b765e': '#526170',
  '#323c29': '#252C34', '#536046': '#465361', '#4b5541': '#465361', '#49513f': '#465361', '#58634c': '#465361',
  '#c8cbbf': '#C8CFD6', '#c1c5ba': '#BAC5CF', '#b7bdaf': '#B2BDC8', '#bbc0b1': '#B2BDC8',
  '#6d7268': '#626D77', '#707569': '#626D77', '#777d70': '#626D77', '#747b69': '#626D77',
  '#a7ac9f': '#A7B4C0', '#a5ae9b': '#A7B4C0', '#a9b59a': '#A7B4C0', '#aeb9a1': '#A7B4C0',
  '#9eaa90': '#A7B4C0', '#a8b19b': '#A7B4C0', '#c3cbb8': '#CBD4DD', '#c0c7b7': '#CBD4DD',
  '#a5b096': '#A7B4C0', '#7f8b72': '#93A2B0', '#8e9b7f': '#93A2B0', '#8f9e7f': '#93A2B0',
  '#8d9b7d': '#93A2B0', '#8d9980': '#93A2B0', '#717e64': '#93A2B0',
};
css = css.replace(/#[0-9a-f]{3,8}\b/gi, value => colors[value.toLowerCase()] || value);
css = css.replace('--accent:#1E88E5;', '--primary-blue:#1E88E5;--primary-green:#4CAF50;--accent-cyan:#00BCD4;--accent:var(--primary-blue);');
css += `
/* Original Avangard identity: blue / green, with cyan for the inspection scan. */
.brand-logo{width:52px;height:50px;object-fit:contain;flex-shrink:0;border-radius:3px}
.brand>span{color:var(--primary-blue)}
.brand small{color:var(--primary-green)}
.footer-wordmark{display:flex;align-items:center;gap:20px}
.footer-logo{width:96px;height:92px;object-fit:contain;flex-shrink:0;border-radius:4px}
.footer-wordmark>.footer-brand-name{font-family:var(--display);font-size:inherit;line-height:.95;margin:0;color:var(--primary-blue)}
.footer-brand-name small{display:block;font-family:var(--body);font-size:11px;letter-spacing:.5em;color:var(--primary-green);margin-top:15px}
.button-primary{background:var(--primary-blue);color:#061321}
.button-primary:hover{background:#1565C0;color:#fff}
.section-light em{color:#1565C0}
.hero em,.section-dark em{color:var(--primary-green)}
.status-dot{background:var(--primary-green);box-shadow:0 0 0 4px #4CAF501A}
.scroll-progress{background:linear-gradient(90deg,var(--primary-blue),var(--primary-green))}
.hero-bottom strong>span,.report-icon,.contact-phone>span{color:var(--primary-green)}
.scan-line{background:var(--accent-cyan);box-shadow:0 -7px 18px 3px #00BCD41C}
.scan-line:after{background:linear-gradient(0deg,#00BCD417,transparent)}
.hotspot:hover,.hotspot.active{background:var(--primary-green);border-color:var(--primary-green);box-shadow:0 0 0 6px #4CAF501A;color:#081508}
.inspection-tabs button[aria-selected=true]{border-color:var(--primary-green)}
.panel-label,.section-dark .check-list li:before{color:var(--primary-green)}
.recommended{background:var(--primary-green);color:#081508}
.price-card.featured .check-list li:before{color:var(--primary-green)}
.promo-value{color:#287D2B}
.process-steps article>span{color:#1565C0}
.case-arrow{background:var(--primary-blue);color:#061321}
.article-body .current-offer a{color:#66BB6A}
@media(max-width:1150px){.site-header{gap:28px}.site-header nav{gap:19px}.brand-logo{width:46px;height:45px}}
@media(max-width:640px){.brand-logo{width:43px;height:42px}.brand{gap:9px}.footer-wordmark{gap:12px;font-size:clamp(35px,9.5vw,60px)}.footer-logo{width:58px;height:56px}.footer-brand-name small{font-size:7px;letter-spacing:.4em;margin-top:9px}.footer-top{column-gap:10px}}
`;
await writeFile('dist/styles.css', css);

let readme = await readFile('README.md', 'utf8');
readme = readme.replace('Paletă grafit, alb cald și roșu', 'Logo original și paletă originală albastru (#1E88E5), verde (#4CAF50), cyan (#00BCD4), negru și gri deschis');
await writeFile('README.md', readme);
console.log('Original logo and original brand palette restored.');
