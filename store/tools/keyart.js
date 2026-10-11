const { chromium } = require(process.env.PLAYWRIGHT || 'playwright');
const sleep = ms => new Promise(r => setTimeout(r, ms));
const [,, name, vw, vh, dpr, stageNo] = process.argv;
(async () => {
  const b = await chromium.launch();
  const ctx = await b.newContext({ viewport: { width: +vw, height: +vh }, deviceScaleFactor: +dpr });
  await ctx.addInitScript(() => {
    try { localStorage.setItem('nekoDaruma.collection.v1', JSON.stringify({ cats: ['tora'], hammers: ['wood'], cat: 'tora', hammer: 'wood', fresh: [] })); } catch (e) {}
    document.addEventListener('DOMContentLoaded', () => {
      const st = document.createElement('style');
      st.textContent = '.topbtns,.bagbtn,.overlay{display:none!important}';
      document.head.appendChild(st);
    });
  });
  const p = await ctx.newPage();
  const errs = []; p.on('pageerror', e => errs.push(e.message));
  await p.goto('file://' + require('path').resolve(__dirname, '../../index.html')); await sleep(400);
  await p.evaluate(s => { const n = __neko; n.setArt(true); n.startGame(); n.setStage(s - 1); n.nextStage(); n.setMiniAt(999); }, +stageNo);
  for (let i = 0; i < 60 && (await p.evaluate(() => __neko.state)) !== 'play'; i++) await sleep(100);
  // ふってくるお菓子は、ねこと重ならない位置に置く
  await p.evaluate(() => {
    const n = __neko, W = innerWidth, H = innerHeight;
    n.spawnDrop('candy'); n.spawnDrop('konpeito');
    const [a, b] = n.drops;
    Object.assign(a, { x: W * 0.3, y: H * 0.3, vy: 0, sway: 0, t: 0, ph: 0 });
    Object.assign(b, { x: W * 0.69, y: H * 0.22, vy: 0, sway: 0, t: 0, ph: 0 });
  });
  await sleep(300);
  await p.evaluate(() => { __neko.catMood('happy'); });
  await sleep(170);
  // 文字は「PERFECT!」と点数だけ残す
  await p.evaluate(() => { const ps = __neko.popups; for (let i = ps.length - 1; i >= 0; i--) if (!/^PERFECT|^\+\d/.test(ps[i].text)) ps.splice(i, 1); });
  await sleep(30);
  await p.screenshot({ path: `${name}.png` });
  console.log(name, errs);
  await b.close();
})();
