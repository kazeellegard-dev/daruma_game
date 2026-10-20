const { chromium } = require(process.env.PLAYWRIGHT || 'playwright');
const sleep = ms => new Promise(r => setTimeout(r, ms));
const OUT = process.argv[3] || __dirname + '/shots';
const EN = process.env.CAPS === 'en'; // CAPS=en で英語の画面を撮る
const PAGE = 'file://' + require('path').resolve(__dirname, '../../index.html') + (EN ? '?lang=en' : '?lang=ja');
require('fs').mkdirSync(OUT, { recursive: true });
const DEVICES = {
  iphone: { viewport: { width: 440, height: 956 }, deviceScaleFactor: 3, sat: 62, sab: 34 },
  ipad:   { viewport: { width: 1032, height: 1376 }, deviceScaleFactor: 2, sat: 0, sab: 20 },
};
const RANK = JSON.stringify([
  { id: 'a', name: EN ? 'CatLover' : 'ねこすき', score: 18640, stage: 14, tier: 16, combo: 22, date: '2026-10-01T00:00:00Z' },
  { id: 'b', name: EN ? 'Tama' : 'たま', score: 12480, stage: 11, tier: 13, combo: 15, date: '2026-10-02T00:00:00Z' },
]);
// 見せるのは、ねこ半分・ハンマー3種類だけ（のこりは「？？？」のまま）
const COLL = JSON.stringify({ cats: ['tora', 'shiro', 'kuro', 'mike', 'siam'], hammers: ['wood', 'pico', 'candy'], cat: 'tora', hammer: 'wood', fresh: [] });

async function play(p, stageNo, score) {
  await p.click('#startBtn', { force: true });
  await sleep(200);
  await p.evaluate(([s, sc]) => { __neko.setStage(s - 1); __neko.nextStage(); __neko.setScore(sc); __neko.setMiniAt(999); }, [stageNo, score]);
  for (let i = 0; i < 60 && (await p.evaluate(() => __neko.state)) !== 'play'; i++) await sleep(100);
}
async function perfect(p) {
  await p.evaluate(() => { const z = __neko.zones(); __neko.setMeter(z.center); __neko.strike(-1); });
}
const SCENES = {
  async title(p) {
    await sleep(1200);
    await p.evaluate(() => { __neko.tcat.jumpT = -1; __neko.tcat.nextJump = 99; });
    await sleep(400);
  },
  async perfect(p) {
    await play(p, 10, 8420);
    for (let i = 0; i < 3; i++) { await perfect(p); await sleep(i < 2 ? 650 : 160); }
  },
  async intruder(p) {
    await play(p, 7, 5260);
    await perfect(p); await sleep(700);
    await p.evaluate(() => __neko.startIntruder());
    await sleep(1100);
  },
  async drops(p) {
    await play(p, 5, 3180);
    await p.evaluate(() => { __neko.spawnDrop('candy'); });
    await sleep(500);
    await p.evaluate(() => { __neko.spawnDrop('konpeito'); });
    await sleep(900);
  },
  async mini(p) {
    await play(p, 4, 2100);
    await p.evaluate(() => { __neko.offerMini(); __neko.startMini('memory'); });
    await sleep(2600);
    await p.evaluate(() => {
      const n = __neko, M = n.mini, rs = n.memoryRects(n.miniArea());
      const a = 0, b = M.cards.findIndex((c, i) => i !== a && c.cat.id === M.cards[a].cat.id);
      for (const i of [a, b]) n.miniTap(rs[i].x + rs[i].w / 2, rs[i].y + rs[i].h / 2);
      const c = M.cards.findIndex(x => !x.done);
      n.miniTap(rs[c].x + rs[c].w / 2, rs[c].y + rs[c].h / 2);
    });
    await sleep(450);
  },
  async reward(p) {
    await play(p, 4, 2100);
    await p.evaluate(() => __neko.startReward({ type: 'cat', id: 'niji', cheat: true }, 'mini'));
    for (let i = 0; i < 50 && (await p.evaluate(() => __neko.reward && __neko.reward.phase)) !== 'show'; i++) await sleep(100);
    await sleep(500);
  },
  async collection(p) {
    await p.click('#collBtn', { force: true });
    await sleep(500);
    await p.evaluate(() => { const s = [...document.querySelectorAll('#catGrid .slot')]; s[5] && s[5].click(); });
    await sleep(300);
  },
};

(async () => {
  const b = await chromium.launch();
  const only = process.argv[2];
  for (const [dname, d] of Object.entries(DEVICES)) {
    for (const [sname, fn] of Object.entries(SCENES)) {
      if (only && only !== sname) continue;
      const ctx = await b.newContext({ viewport: d.viewport, deviceScaleFactor: d.deviceScaleFactor, isMobile: true, hasTouch: true });
      await ctx.addInitScript(([rank, coll, sat, sab]) => {
        try { localStorage.setItem('nekoDaruma.ranking.v1', rank); localStorage.setItem('nekoDaruma.collection.v1', coll); } catch (e) {}
        document.addEventListener('DOMContentLoaded', () => {
          const st = document.documentElement.style;
          st.setProperty('--sat', sat + 'px'); st.setProperty('--sab', sab + 'px');
        });
      }, [RANK, COLL, d.sat, d.sab]);
      const p = await ctx.newPage();
      const errs = []; p.on('pageerror', e => errs.push(e.message));
      await p.goto(PAGE);
      await sleep(300);
      await p.evaluate(() => window.dispatchEvent(new Event('resize')));
      await sleep(300);
      await fn(p);
      await p.screenshot({ path: `${OUT}/${dname}-${sname}.png` });
      console.log(dname, sname, errs.length ? errs : 'ok');
      await ctx.close();
    }
  }
  await b.close();
})();
