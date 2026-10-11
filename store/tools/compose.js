// KAZE Application（Knit2）と同じ見た目：クリーム色の背景・こげ茶の見出し・影つきの画面
const { chromium } = require(process.env.PLAYWRIGHT || 'playwright');
const fs = require('fs');
const SRC = process.argv[3] || __dirname + '/shots', OUT = process.argv[2] || require('path').resolve(__dirname, '../screenshots');
const ORDER_JA = [
  ['title', 'ねこを落とさず、|お菓子をたたき出そう。'],
  ['perfect', 'タイミングよくたたいて、|PERFECTをねらう。'],
  ['intruder', 'のらねこや風が、|じゃまをしてくる。'],
  ['drops', 'ふってくるお菓子で、|ラッキー効果。'],
  ['mini', 'ときどき、|ミニゲームのチャンス。'],
  ['reward', 'ごほうびは、|チートねこやハンマー。'],
  ['collection', 'ねことハンマーを、|集めてコンプリート。'],
];
const ORDER_EN = [
  ['title', 'Tap out the sweets,|don\'t drop the cat.'],
  ['perfect', 'Time your swing|for a PERFECT hit.'],
  ['intruder', 'Stray cats and wind|get in your way.'],
  ['drops', 'Catch falling sweets|for lucky effects.'],
  ['mini', 'Mini-game chances|pop up now and then.'],
  ['reward', 'Win cheat cats|and cheat hammers.'],
  ['collection', 'Collect them all,|cats and hammers.'],
];
const ORDER = process.env.CAPS === 'en' ? ORDER_EN : ORDER_JA;
const DEV = {
  iphone: { vw: 440, vh: 956, dpr: 3, font: 34, shotH: 0.765, radius: 30, top: 0.06 },
  ipad: { vw: 1032, vh: 1376, dpr: 2, font: 50, shotH: 0.76, radius: 22, top: 0.04 },
};
(async () => {
  const b = await chromium.launch();
  for (const [d, c] of Object.entries(DEV)) {
    fs.mkdirSync(`${OUT}/${d}`, { recursive: true });
    fs.mkdirSync(`${OUT}/${d}-plain`, { recursive: true });
    const ctx = await b.newContext({ viewport: { width: c.vw, height: c.vh }, deviceScaleFactor: c.dpr });
    const p = await ctx.newPage();
    let i = 0;
    for (const [name, cap] of ORDER) {
      i++;
      const img = fs.readFileSync(`${SRC}/${d}-${name}.png`).toString('base64');
      const lines = cap.split('|').map(l => `<span>${l}</span>`).join('');
      await p.setContent(`<!doctype html><html><head><style>
        html,body{margin:0;width:${c.vw}px;height:${c.vh}px;overflow:hidden}
        body{background:linear-gradient(#f6f0e5,#f3ecdf);font-family:"Rounded Mplus 1c";display:flex;flex-direction:column;align-items:center}
        h1{margin:${Math.round(c.vh * c.top)}px 0 0;font-weight:800;font-size:${c.font}px;line-height:1.38;text-align:center;color:#46342c;letter-spacing:.04em}
        h1 span{display:block;white-space:nowrap}
        .shot{margin-top:auto;margin-bottom:${Math.round(c.vh * 0.035)}px;height:${Math.round(c.vh * c.shotH)}px;border-radius:${c.radius}px;
          box-shadow:0 ${c.font * 0.35}px ${c.font * 1.1}px rgba(70,52,44,.16), 0 ${c.font * 0.06}px ${c.font * 0.2}px rgba(70,52,44,.10)}
      </style></head><body><h1>${lines}</h1><img class="shot" src="data:image/png;base64,${img}">
        <script>/* 入りきらない見出しは文字を小さくする（フォントの読み込み後） */
          document.fonts.ready.then(() => {
            const h = document.querySelector('h1'); let f = ${c.font};
            while ([...h.children].some(s => s.scrollWidth > ${c.vw} * 0.9) && f > 12) { f -= 1; h.style.fontSize = f + 'px'; }
            document.body.dataset.ready = '1';
          });
        </script></body></html>`);
      await p.waitForSelector('body[data-ready="1"]');
      await p.waitForTimeout(150);
      const file = `${String(i).padStart(2, '0')}-${name}`;
      await p.screenshot({ path: `${OUT}/${d}/${file}.jpg`, type: 'jpeg', quality: 92 });
      await p.setContent(`<html><body style="margin:0"><img src="data:image/png;base64,${img}" style="width:${c.vw}px;height:${c.vh}px;display:block"></body></html>`);
      await p.screenshot({ path: `${OUT}/${d}-plain/${file}.jpg`, type: 'jpeg', quality: 92 });
      console.log(d, file);
    }
    await ctx.close();
  }
  await b.close();
})();
