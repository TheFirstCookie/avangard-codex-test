import { writeFile, mkdir } from 'node:fs/promises';
export async function browser() {
  const target = await (await fetch('http://127.0.0.1:9222/json/new?about:blank', { method: 'PUT' })).json();
  const ws = new WebSocket(target.webSocketDebuggerUrl);
  await new Promise((resolve, reject) => { ws.addEventListener('open', resolve, { once: true }); ws.addEventListener('error', reject, { once: true }); });
  let id = 0;
  const pending = new Map();
  const errors = [];
  ws.addEventListener('message', event => {
    const data = JSON.parse(event.data);
    if (data.id) { const task = pending.get(data.id); if (task) { pending.delete(data.id); data.error ? task.reject(new Error(JSON.stringify(data.error))) : task.resolve(data.result); } }
    if (data.method === 'Runtime.exceptionThrown') errors.push(data.params.exceptionDetails.text + ': ' + data.params.exceptionDetails.exception?.description);
    if (data.method === 'Log.entryAdded' && data.params.entry.level === 'error') errors.push(data.params.entry.text);
  });
  const send = (method, params = {}) => new Promise((resolve, reject) => { const current = ++id; pending.set(current, { resolve, reject }); ws.send(JSON.stringify({ id: current, method, params })); });
  await send('Page.enable'); await send('Runtime.enable'); await send('Log.enable');
  const evaluate = async expression => {
    const result = await send('Runtime.evaluate', { expression, returnByValue: true, awaitPromise: true });
    if (result.exceptionDetails) throw new Error(JSON.stringify(result.exceptionDetails));
    return result.result.value;
  };
  const wait = ms => new Promise(resolve => setTimeout(resolve, ms));
  return {
    send, evaluate, errors, wait,
    async size(width, height, mobile = false) { await send('Emulation.setDeviceMetricsOverride', { width, height, deviceScaleFactor: 1, mobile }); },
    async navigate(url) { await send('Page.navigate', { url }); for (let i = 0; i < 60; i++) { await wait(100); if (await evaluate('document.readyState === "complete"')) break; } await evaluate('document.fonts.ready.then(()=>true)'); await wait(1100); },
    async screenshot(name, full = false) { await mkdir('qa', { recursive: true }); const shot = await send('Page.captureScreenshot', { format: 'png', captureBeyondViewport: full }); await writeFile('qa/' + name + '.png', Buffer.from(shot.data, 'base64')); },
    async close() { await send('Page.close'); ws.close(); }
  };
}
if (process.argv[1].endsWith('browser.mjs')) {
  const b = await browser();
  await b.size(1440, 1000);
  await b.navigate(process.argv[2] || 'http://127.0.0.1:4173');
  await b.screenshot('desktop-hero');
  console.log(await b.evaluate('JSON.stringify({title:document.title,fonts:document.fonts.status,overflow:document.documentElement.scrollWidth>innerWidth,images:[...document.images].filter(i=>!i.complete||!i.naturalWidth).map(i=>i.src)})'));
  console.log('Browser errors:', b.errors);
  await b.close();
}
