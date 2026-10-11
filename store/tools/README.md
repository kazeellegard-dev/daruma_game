# スクリーンショットの作り方

ゲーム（Web版・広告なし）をブラウザで開いて場面を作り、App Store 用の画像を書き出します。

```sh
npm i -D playwright          # または PLAYWRIGHT=/path/to/playwright を指定
node store/tools/capture.js            # 生の画面を store/tools/shots/ に保存（引数1つめで場面をしぼれる）
node store/tools/compose.js            # 見出しをつけて store/screenshots/ に書き出す（CAPS=en で英語の見出し）
```

- iPhone 6.9 インチ（1320×2868）と iPad 13 インチ（2064×2752）の 2 サイズ
- iPhone 6.3 インチ（1206×2622）は、6.9 インチの画像を縮小して作る（比率がほぼ同じ）：
  `python3 -c "from PIL import Image;import os;[Image.open(f'store/screenshots/iphone/{f}').resize((1206,2622),Image.LANCZOS).save(f'store/screenshots/iphone-6.3/{f}',quality=92) for f in os.listdir('store/screenshots/iphone')]"`
- 見出しの文字は `compose.js` の `ORDER` で変えられます
- 丸ゴシックで表示するには「Rounded Mplus 1c」フォントを入れておきます

## プロダクトページのヘッダ・検索結果の画像（クリエイティブアセット）

```sh
node store/tools/keyart.js header 1280 549 3 7      # 21:9 → 3840×1647（上下1pxを切って 3840×1646 に）
node store/tools/keyart.js search 1200 800 3.2 7    # 3:2  → 3840×2560
node store/tools/keyart.js universal 1311 738 4 7   # 16:9 → 5244×2952（切って 5244×2950 に）
```

引数は「ファイル名・画面の幅・高さ・倍率・ステージ（積み木の段数）」です。お菓子の並びは毎回変わります。
