// アプリに入れる Web ファイルを www/ にまとめる（GitHub Pages と同じ中身）
import { rmSync, mkdirSync, cpSync, existsSync } from 'node:fs';

const FILES = ['index.html', 'manifest.webmanifest', 'sw.js', 'icons'];
rmSync('www', { recursive: true, force: true });
mkdirSync('www');
for (const f of FILES) if (existsSync(f)) cpSync(f, `www/${f}`, { recursive: true });
console.log('www/ を作成しました');
