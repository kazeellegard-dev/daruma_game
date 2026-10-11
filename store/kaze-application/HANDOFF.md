# KAZE Application サイトへの追加依頼：ねこだるまおとし

`kazeellegard-dev/kaze-application` に「ねこだるまおとし」を追加するための材料一式です。
画像は同じフォルダの `assets/` に入っています（`public/assets/` にそのままコピーできる構成）。

---

## 1. まとめ方の方針

- サポートページ・プライバシーポリシーは KAZE Application サイトにまとめます。
- **プライバシーポリシーは今のままで対応できます。** すでに次の内容が書かれていて、ねこだるまおとしも同じ設定で作るためです。
  - Google AdMob を使うこと
  - EEA・英国の利用者には UMP で同意を確認すること
  - ATT（App Tracking Transparency）の確認はせず、IDFA は使わないこと
- 追加で書くとすれば次の1文です（任意）。「ゲームのハイスコア・ランキングに入力した名前などは端末の中にだけ保存し、送信しません。」
- **app-ads.txt**：今の `pub-8743645031370957` と同じ AdMob アカウントでアプリを登録するなら、変更はいりません。別アカウントの場合は1行追加します。

## 2. App Store Connect に入れる URL

| 項目 | URL |
|---|---|
| サポート URL | https://kaze-application.kazeellegard.workers.dev/apps/neko-daruma/ |
| プライバシーポリシー URL | https://kaze-application.kazeellegard.workers.dev/policy/ |
| マーケティング URL | https://kaze-application.kazeellegard.workers.dev/ （AdMob の app-ads.txt 確認に使われます） |

## 3. 追加・変更するファイル

| ファイル | 内容 |
|---|---|
| `public/apps/neko-daruma/index.html` | アプリ詳細ページ（新規。iPhone と iPad の画面があるので `apps/electrical-tools/` をコピーして中身を差し替えるのがおすすめ） |
| `public/en/apps/neko-daruma/index.html` | 英語版の詳細ページ（新規） |
| `public/index.html`・`public/en/index.html` | アプリ一覧に `app-card` を1件、お知らせに1件、問い合わせフォームの「対象のアプリ」に `<option>ねこだるまおとし</option>` を追加 |
| `public/assets/neko-daruma.png` | アプリアイコン（512×512） |
| `public/assets/neko-daruma/iph-1.png`〜`iph-7.png` | iPhone の画面（480×1043、日本語の見出しつき） |
| `public/assets/neko-daruma/ipad-1.png`〜`ipad-7.png` | iPad の画面（840×1120、日本語の見出しつき） |
| `public/assets/neko-daruma/en/` | 上と同じ画面で、見出しが英語のもの |
| `README.md` | アプリ一覧（`knit2` / `knit` / … ）とスクリーンショットの説明に `neko-daruma` を追加 |

- App Store の ID は審査が通ってから決まります。それまでは「App Storeで入手」ボタンを「近日公開」にしておくか、ページの公開をリリース後にしてください。
- ゲームの画面は日本語のみです。英語版ページでもスクリーンショットの中身は日本語です。英語版にはその旨を一言添えています。

---

## 4. ページの文面（日本語）

### head

- title：`ねこだるまおとし | KAZE Application`
- description：`ねこを落とさないように、お菓子の段をハンマーでたたき出す、だるま落としゲーム。ミニゲームやねこ・ハンマー集めも楽しめる無料ゲーム。iPhone・iPad対応。`
- og:description：`ねこがのった、お菓子のだるま落とし。タイミングよくたたいてPERFECTをねらおう。`
- JSON-LD：`"name": "ねこだるまおとし"`, `"operatingSystem": "iOS 15.0以降"`, `"applicationCategory": "GameApplication"`, 価格 0

### ヒーロー

- eyebrow：`CASUAL GAME`
- h1：`ねこだるまおとし`
- lead：`ねこがのった、お菓子のだるま落とし。ハンマーで一番下のお菓子をたたき出して、ねこを床までおろしてあげよう。`
- badges：`無料` / `広告あり` / `iOS 15.0以降` / `iPhone / iPad` / `4+`
- ボタン：`App Storeで入手`（ID は審査後） / `お問い合わせ`（`/?app=ねこだるまおとし#support`）

### 画面イメージ（figcaption と alt）

| 画像 | figcaption |
|---|---|
| iph-1 / ipad-1 | タイトル画面 |
| iph-2 / ipad-2 | タイミングよくたたいてPERFECT |
| iph-3 / ipad-3 | のらねこや風のじゃま |
| iph-4 / ipad-4 | ふってくるお菓子でラッキー効果 |
| iph-5 / ipad-5 | ミニゲーム（ねこあわせ） |
| iph-6 / ipad-6 | ごほうびのチートねこ |
| iph-7 / ipad-7 | ねこ・ハンマーのコレクション |

### 主な機能（feature-grid）

1. **だるま落とし** — 画面の左半分・右半分をタップして、左右からハンマーでたたきます。パワーメーターのまんなか（PERFECT）で止めるほど、きれいにぬけます。
2. **いろいろなお菓子** — ドーナツ、マカロン、板チョコ、プリン、おもち、金のカステラなど。お菓子ごとに、ぬけやすさやPERFECTの位置がちがいます。
3. **じゃまものとラッキー** — 風がふいたり、のらねこが乱入して段をずらしてきます。空からふってくるお菓子をタップすると、メーターがゆっくりになるなどのいいことが起こります。
4. **ミニゲーム** — 3〜5ステージごとにミニゲームのチャンス。おさかなキャッチ、ねずみたたき、ねこあわせ、かつおぶしけずり、ねこドロップの5種類です。
5. **チートアイテム** — ミニゲームをクリアすると、チートねこ・チートハンマーがもらえます。肉球バッグに入れておいて、好きなステージで1回使えます。
6. **ねこ・ハンマー集め** — 5ステージクリアするごとに、新しいねこやハンマーがもらえます。ねこは10種類、ハンマーは6種類。それぞれにとくちょうがあります。

### 使い方（steps）

1. **スタート** — タイトル画面の「スタート」を押します。
2. **たたく** — 下のメーターを見て、左半分か右半分をタップ。ゆれている側からたたくと、ゆれをおさえられます。
3. **ねこを床へ** — 時間内にお菓子をぜんぶぬいて、ねこが床にすわればステージクリアです。

### よくある質問（faq）

- **料金はかかりますか？** — 無料でご利用いただけます。
- **対応している機種・OSは？** — iOS 15.0以降のiPhone・iPadに対応しています。
- **広告は表示されますか？** — はい、画面の下に広告が表示されます。広告の配信には Google AdMob を利用しています（プライバシーポリシーへのリンク）。
- **音が鳴りません** — 本体の消音スイッチ（サイレントモード）がオンだと鳴りません。ゲーム右上の 🎵（BGM）と 🔊（効果音）がオフになっていないかも確認してください。
- **データを消したい** — タイトル画面の「ねこ・ハンマー」→ いちばん下の「データリセット」で、ハイスコア・ランキング・集めたねこやハンマーを消せます。
- **アプリを消すとデータはどうなりますか？** — データは端末の中にだけ保存しているので、アプリを削除すると消えます。
- **チートねこ・チートハンマーが消えました** — チートアイテムはそのゲームの間だけ持てて、使うとそのステージが終わるまで効果が続きます。使ったあとやゲームが終わるとなくなります。
- **不具合の報告やご要望は？** — お問い合わせフォームから、対象アプリに「ねこだるまおとし」を選んでお送りください。

### 更新履歴（history）

- **Ver.1.0.0**（リリース日）— 公開しました。

### トップページの app-card

- app-type：`CASUAL GAME`
- h3：`ねこだるまおとし`
- 本文：`ねこを落とさないように、お菓子の段をハンマーでたたき出すだるま落としゲーム。ミニゲームでもらえるチートアイテムや、ねこ・ハンマー集めも楽しめます。`

### お知らせ

`<strong>ねこだるまおとし</strong> Ver.1.0.0 をリリースしました。ねこがのった、お菓子のだるま落としゲームです。`

---

## 5. ページの文面（English）

### head

- title：`Neko Daruma Otoshi | KAZE Application`
- description：`A daruma otoshi game: tap out the stack of sweets with a hammer without dropping the cat. Free, with mini-games and cats & hammers to collect. For iPhone and iPad.`
- og:description：`A daruma otoshi of sweets with a cat on top. Time your swing for a PERFECT hit.`

### Hero

- eyebrow：`CASUAL GAME`
- h1：`Neko Daruma Otoshi`
- lead：`A daruma otoshi of sweets with a cat on top. Knock out the bottom sweet with your hammer and bring the cat safely down to the floor.`
- badges：`Free` / `Contains ads` / `iOS 15.0 or later` / `iPhone / iPad` / `4+`
- 補足（ギャラリーの下などに）：`The game is in Japanese only.`

### Screenshots (figcaption)

| Image | figcaption |
|---|---|
| 1 | Title screen |
| 2 | Time your swing for a PERFECT hit |
| 3 | Stray cats and wind get in the way |
| 4 | Catch falling sweets for lucky effects |
| 5 | Mini-game (cat matching) |
| 6 | Cheat cat reward |
| 7 | Cat & hammer collection |

### Features

1. **Daruma otoshi** — Tap the left or right half of the screen to swing the hammer from that side. Stop the power meter in the middle (PERFECT) for a clean hit.
2. **All kinds of sweets** — Donuts, macarons, chocolate bars, pudding, mochi, golden castella and more. Each sweet has its own feel and PERFECT spot.
3. **Obstacles and luck** — Wind blows and stray cats burst in to shift the stack. Tap falling sweets for lucky effects, like a slower meter.
4. **Mini-games** — Every 3–5 stages you get a mini-game chance: Fish Catch, Whack-a-Mouse, Cat Match, Bonito Shaving and Cat Drop.
5. **Cheat items** — Clear a mini-game to win a cheat cat or cheat hammer. Keep it in your paw bag and use it on any stage you like.
6. **Collect cats & hammers** — Get a new cat or hammer every 5 stages. 10 cats and 6 hammers, each with its own perk.

### How to play

1. **Start** — Tap "スタート" (Start) on the title screen.
2. **Swing** — Watch the meter and tap the left or right half. Hitting from the leaning side calms the wobble.
3. **Bring the cat down** — Knock out all the sweets in time and let the cat sit on the floor to clear the stage.

### FAQ

- **Is it free?** — Yes, it is free to use.
- **Which devices are supported?** — iPhone and iPad running iOS 15.0 or later.
- **Does it show ads?** — Yes, a banner ad appears at the bottom of the screen, served by Google AdMob (link to the privacy policy).
- **There is no sound.** — Sound is muted while the silent switch is on. Also check that 🎵 (music) and 🔊 (sound effects) at the top right are not turned off.
- **How do I delete my data?** — On the title screen, open "ねこ・ハンマー" (Cats & Hammers) and tap "データリセット" (Reset data) at the bottom.
- **What happens to my data if I delete the app?** — Data is stored only on your device, so it is removed with the app.
- **Bug reports and requests** — Please use the contact form and choose "ねこだるまおとし" as the app.

### History

- **Ver.1.0.0** (release date) — First release.

### App card (top page)

- h3：`Neko Daruma Otoshi`
- text：`A daruma otoshi game where you tap out a stack of sweets without dropping the cat. With mini-games, cheat items and cats & hammers to collect.`

### News

`<strong>Neko Daruma Otoshi</strong> Ver.1.0.0 is now available — a daruma otoshi game of sweets with a cat on top.`
