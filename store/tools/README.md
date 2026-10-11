# スクリーンショットの作り方

ゲーム（Web版・広告なし）をブラウザで開いて場面を作り、App Store 用の画像を書き出します。

```sh
npm i -D playwright          # または PLAYWRIGHT=/path/to/playwright を指定
node store/tools/capture.js            # 生の画面を store/tools/shots/ に保存（引数1つめで場面をしぼれる）
node store/tools/compose.js            # 見出しをつけて store/screenshots/ に書き出す（CAPS=en で英語の見出し）
```

- iPhone 6.9 インチ（1320×2868）と iPad 13 インチ（2064×2752）の 2 サイズ
- 見出しの文字は `compose.js` の `ORDER` で変えられます
- 丸ゴシックで表示するには「Rounded Mplus 1c」フォントを入れておきます
