// X（旧Twitter）用のプレイ動画（縦 1080×1920・30fps）をコマ撮りで作る
// 使い方: PLAYWRIGHT=... node store/tools/video.js <outdir>   （CAPS=en で英語）
// できた PNG を ffmpeg で mp4 にする（README を参照）
const { chromium } = require(process.env.PLAYWRIGHT || 'playwright');
const fs = require('fs');
const OUT = process.argv[2] || __dirname + '/video';
const EN = process.env.CAPS === 'en';
const PAGE = 'file://' + require('path').resolve(__dirname, '../../index.html') + (EN ? '?lang=en' : '?lang=ja');
const FPS = 30;
fs.mkdirSync(OUT, { recursive: true });
for (const f of fs.readdirSync(OUT)) if (f.endsWith('.png')) fs.unlinkSync(OUT + '/' + f);
const COLL = JSON.stringify({ cats: ['tora', 'shiro', 'kuro', 'mike', 'saba', 'siam', 'hachi', 'blue', 'scot', 'maneki'],
  hammers: ['wood', 'pico', 'candy'], cat: 'tora', hammer: 'wood', fresh: [] });

(async () => {
  const b = await chromium.launch();
  const ctx = await b.newContext({ viewport: { width: 405, height: 720 }, deviceScaleFactor: 8 / 3, isMobile: true, hasTouch: true });
  await ctx.addInitScript(coll => {
    try { localStorage.setItem('nekoDaruma.collection.v1', coll); } catch (e) {}
    // 時計を止めて、__step() で 1 コマずつ進める
    let now = 0; const q = [];
    performance.now = () => now;
    window.requestAnimationFrame = cb => { q.push(cb); return q.length; };
    window.__step = ms => { now += ms; const cbs = q.splice(0); cbs.forEach(cb => cb(now)); };
    document.addEventListener('DOMContentLoaded', () => {
      const st = document.documentElement.style;
      st.setProperty('--sat', '0px'); st.setProperty('--sab', '0px');
    });
  }, COLL);
  const p = await ctx.newPage();
  p.on('pageerror', e => console.log('pageerror', e.message));
  await p.goto(PAGE);
  for (let i = 0; i < 10; i++) await p.evaluate(() => __step(16));
  await p.evaluate(() => window.dispatchEvent(new Event('resize')));

  let n = 0;
  const snap = async () => { await p.screenshot({ path: `${OUT}/${String(n++).padStart(4, '0')}.png` }); };
  // sec 秒ぶん、コマを進めながら撮る（every はコマごとに呼ぶ処理）
  const run = async (sec, every) => {
    for (let i = 0, k = Math.round(sec * FPS); i < k; i++) {
      if (every) await p.evaluate(every, i);
      await p.evaluate(ms => __step(ms), 1000 / FPS);
      await snap();
    }
  };
  const ev = (fn, arg) => p.evaluate(fn, arg);
  const perfect = () => ev(() => { const z = __neko.zones(); __neko.setMeter(z.center); __neko.strike(Math.random() < 0.5 ? -1 : 1); });
  // ねこを替えて、そのステージを始める（積み上げの演出は撮らずに進める）
  const stageWith = async (cat, stageNo) => {
    await ev(([c, s]) => { __neko.coll().cat = c; __neko.setStage(s - 1); __neko.nextStage(); __neko.setMiniAt(999); }, [cat, stageNo]);
    for (let i = 0; i < 300 && (await ev(() => __neko.state)) !== 'play'; i++) await ev(() => __step(1000 / 30));
  };
  // gap 秒ごとにパーフェクトでたたく。のこり 0 でクリアの演出まで撮る
  const knock = async (hits, gap) => {
    for (let h = 0; h < hits; h++) { await perfect(); await run(gap); }
  };

  // 1. タイトル（トラ）
  await run(0.7);
  await ev(() => document.getElementById('startBtn').click());
  await ev(() => __neko.setMiniAt(999));
  // 2. 高い塔（20段）をトラでテンポよくぬく
  await stageWith('tora', 18);
  await knock(5, 0.3);
  // 3. クロ：のらねこが来て押してくる
  await stageWith('kuro', 17);
  await knock(1, 0.3);
  await ev(() => __neko.startIntruder());
  await run(1.0);
  await knock(2, 0.3);
  // 4. ミケ：さかなのほねで、いろいろなねこが走ってくる
  await stageWith('mike', 16);
  await knock(1, 0.3);
  await ev(() => { __neko.spawnDrop('bone'); __neko.catchDrop(__neko.drops[__neko.drops.length - 1]); });
  await run(1.0);
  await knock(2, 0.3);
  // 5. ハチワレ：つよすぎで叩いてしまい、塔がたおれる
  await stageWith('hachi', 18);
  await knock(2, 0.3);
  for (let i = 0; i < 8 && (await ev(() => __neko.state)) === 'play'; i++) {
    await ev(() => { __neko.setMeter(1); __neko.strike(-1); });
    await run(0.25);
  }
  await run(1.6);
  // 6. ごほうび：ねこ・ハンマー・チートねこ（箱があく直前から）
  for (const it of [{ type: 'cat', id: 'blue' }, { type: 'hammer', id: 'paw' }, { type: 'cat', id: 'niji', cheat: true }]) {
    await ev(item => {
      document.querySelectorAll('.overlay').forEach(e => e.classList.add('hidden'));
      __neko.startGame(); __neko.setStage(3); __neko.nextStage(); __neko.setMiniAt(999); __neko.startReward(item, 'mini'); __neko.reward.t = 1.55;
    }, it);
    await run(1.35);
  }
  // 7. コレクション画面（ねこ全員）
  await ev(() => { __neko.coll().cat = 'maneki'; document.querySelectorAll('.overlay').forEach(e => e.classList.add('hidden')); });
  await ev(() => document.getElementById('collBtn').click());
  await run(0.8);
  // 8. 最後の画面（アプリ名と KAZE Application のロゴ）は別の PNG にする
  const end = await ctx.newPage();
  await end.goto('file://' + require('path').resolve(__dirname, 'endcard.html') + (EN ? '?lang=en' : ''));
  await end.waitForTimeout(300);
  await end.screenshot({ path: `${OUT}/end.png` });
  await b.close();
  console.log('frames', n);
})();
