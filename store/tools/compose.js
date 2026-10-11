const { chromium } = require(process.env.PLAYWRIGHT || 'playwright');
const fs = require('fs');
const SRC = process.argv[3] || __dirname + '/shots', OUT = process.argv[2] || require('path').resolve(__dirname, '../screenshots');
const ORDER = [
  ['title', 'ねこを落とさず<br>お菓子をたたき出せ！'],
  ['perfect', 'タイミングよくたたいて<br><em>PERFECT！</em>'],
  ['intruder', 'のらねこや風が<br>じゃまをしてくる！'],
  ['drops', 'ふってくるお菓子で<br>ラッキー効果！'],
  ['mini', 'ときどき<em>ミニゲーム</em>の<br>チャンスが来る！'],
  ['reward', 'ごほうびは<br><em>チートねこ</em>・ハンマー'],
  ['collection', 'ねこやハンマーを<br>集めてあそぼう！'],
];
const DEV = {
  iphone: { vw: 440, vh: 956, dpr: 3, font: 38, shotH: 0.74, radius: 34, top: 0.065 },
  ipad: { vw: 1032, vh: 1376, dpr: 2, font: 56, shotH: 0.76, radius: 26, top: 0.05 },
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
      await p.setContent(`<!doctype html><html><head><style>
        html,body{margin:0;width:${c.vw}px;height:${c.vh}px;overflow:hidden}
        body{background:radial-gradient(circle at 20% 15%,#fff 0 3px,transparent 4px) 0 0/34px 34px,linear-gradient(#ffc2da,#ffe9f2 55%,#fff6fa);
          font-family:"Rounded Mplus 1c";display:flex;flex-direction:column;align-items:center}
        h1{margin:${Math.round(c.vh * c.top)}px 0 0;font-weight:900;font-size:${c.font}px;line-height:1.28;text-align:center;color:#fff;
          -webkit-text-stroke:${c.font * 0.2}px #5b3a29;paint-order:stroke fill;letter-spacing:.02em;text-shadow:0 ${c.font * 0.1}px 0 #5b3a29}
        h1 em{font-style:normal;color:#ffd23f}
        .shot{margin-top:auto;margin-bottom:${Math.round(c.vh * 0.035)}px;height:${Math.round(c.vh * c.shotH)}px;border-radius:${c.radius}px;
          border:${Math.round(c.font * 0.14)}px solid #5b3a29;box-shadow:0 ${c.font * 0.2}px 0 #5b3a29, 0 ${c.font * 0.5}px ${c.font}px rgba(91,58,41,.25)}
      </style></head><body><h1>${cap}</h1><img class="shot" src="data:image/png;base64,${img}"></body></html>`);
      await p.waitForTimeout(150);
      const file = `${String(i).padStart(2, '0')}-${name}`;
      await p.screenshot({ path: `${OUT}/${d}/${file}.jpg`, type: 'jpeg', quality: 92 });
      fs.writeFileSync(`${OUT}/${d}-plain/${file}.png`, fs.readFileSync(`${SRC}/${d}-${name}.png`));
      console.log(d, file);
    }
    await ctx.close();
  }
  await b.close();
})();
