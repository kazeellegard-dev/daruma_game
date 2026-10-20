# App Store 申請用メモ（英語）

1.1.0 から英語に対応したので、App Store Connect に「英語（米国）」のページを追加するときに使う文面です。
アプリの左上の言語メニュー（「日本語」と書いてあるところ）から「英語（米国）」を追加して、各欄に貼り付けます。
（ ）内は文字数と上限です。

---

## 1. 名前とサブタイトル

| 項目 | 入力する内容 |
|---|---|
| 名前 | Daruma Cat （10 / 30） |
| サブタイトル | Knock out sweets, save the cat （30 / 30） |

名前がほかのアプリに使われていて登録できないときは、`Daruma Cat: Sweet Stack` にします（ホーム画面の名前は Daruma Cat のまま変わりません）。

## 2. プロモーションテキスト（170 まで）

```
Tap the bottom sweet out with your hammer and keep the cat from falling! Time it right for a PERFECT, and win cheat cats and hammers in mini-games.
```

## 3. 説明（4000 字まで）

```
A daruma otoshi game with sweets — and a cat on top!
Knock the bottom sweet out with your hammer and bring the cat safely down to the floor.

■ How to play
・Tap the left half of the screen to hit from the left, the right half to hit from the right
・Stop the power meter in the middle (PERFECT) for a clean hit
・Every hit makes the stack wobble. If the cat falls, it's game over!
・Knock out every sweet in time so the cat sits on the floor to clear the stage
・Each stage adds another layer, up to 30!
・Failed? Watch a short ad once per game to try that stage again

■ All kinds of sweets
Donuts, macarons, chocolate, pudding, mochi, golden castella…
Each sweet has its own feel and its own PERFECT spot.

■ Trouble and luck
・Wind blows, and stray cats barge in to shove the layers
・Tap the sweets falling from the sky for good things, like a slower meter
・But tap something that isn't a sweet, and something bad may happen

■ Mini-games and cheat items
Every 3–5 stages you get a mini-game chance!
Fish Catch, Whack-a-Mouse, Cat Match, Bonito Shaving and Cat Drop.
Clear one to get a rare cheat cat or cheat hammer.
Keep it in your Paw Bag and use it on the stage that matters!

■ Collect cats and hammers
Every 5 stages you clear, you get a new cat or hammer.
10 cats and 6 hammers, each with its own trait: more time, wind-proof, bonus points and more.
There might even be a secret hammer…?

■ Ranking
Your high scores are saved in the ranking on your device. Beat your best!

* This app shows ads.
* You can play offline (ads need an internet connection).
```

## 4. キーワード（100 まで、半角カンマ区切り）

```
daruma,otoshi,cat,kitty,sweets,candy,timing,hammer,stack,balance,tap,casual,cute,kawaii,mini game
```

## 5. このバージョンの新機能（1.1.0）

```
・English is now supported
・Failed a stage? Watch a short ad once per game to try it again
・The app name under the home screen icon is now shorter
・Tall stacks were too hard, so wobble, wind and stray cats are gentler
```

## 6. スクリーンショット

英語の画面と英語の見出しで作ったものが `store/screenshots/en/` に入っています（広告は写っていません）。
英語（米国）のページの各欄に、1 枚目から順に 7 枚入れます。

| フォルダ | サイズ | App Store Connect の欄 |
|---|---|---|
| `en/iphone/` | 1320 × 2868 | iPhone 6.9 インチディスプレイ |
| `en/iphone-6.3/` | 1206 × 2622 | iPhone 6.3 インチディスプレイ |
| `en/ipad/` | 2064 × 2752 | iPad 13 インチディスプレイ |
| `en/*-plain/` | 同上 | 文字なし版（お好みで） |

作り直すときは `store/tools/README.md` の手順を `CAPS=en` を付けて実行します。

## 7. URL

| 項目 | URL |
|---|---|
| サポート URL（必須） | https://kaze-application.kazeellegard.workers.dev/en/apps/neko-daruma/ （英語のページ） |
| マーケティング URL | https://kaze-application.kazeellegard.workers.dev/ （日本語版と同じ。AdMob が app-ads.txt を確認するので入れておく） |
| プライバシーポリシー URL（必須・「App 情報」の欄） | https://kazeellegard-dev.github.io/daruma_game/privacy.html （日本語版と同じ） |

## 8. App Review に関する情報（審査メモ・英語）

日本語の審査メモ（`metadata-ja.md` の 10 章）と同じ内容を英語にしたものです。審査メモは言語ごとではなく 1 つなので、こちらを貼ります。

```
No sign-in is required. Tap "Start" on the title screen to play right away.
Tap the left or right half of the screen to hit the bottom sweet with the hammer from that side.
Every 3–5 stages, a screen appears asking whether to play a mini-game.

Language:
The app is shown in Japanese when the device language is Japanese, and in English otherwise.

Ads (Google AdMob, with Unity Ads through AdMob mediation):
- A banner ad is shown at the bottom of the screen.
- When a stage is failed, the player can choose "Watch an ad to continue" once per game. After watching the rewarded ad, the player retries that stage. This is optional; the player can keep playing without it.

App Tracking Transparency:
- The App Tracking Transparency permission request appears on first launch, right after the title screen is displayed.
- In the EEA, the UK and Switzerland, Google's GDPR consent message is shown first, and the App Tracking Transparency request appears after it is closed (regardless of the choice).
- Ads are loaded only after the App Tracking Transparency request has been answered.
```
