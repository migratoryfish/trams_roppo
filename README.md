# Trams Roppo (Beta)

士業試験の受験者向け Web 六法アプリです。対象の試験を選ぶと、その試験範囲の法令がタブで表示され、ブラウザ上で条文を快適に読むことができます。

## 特徴

- **カッコハイライト** — 法令条文の読みにくさの原因である入れ子のカッコ(括弧)を、ネストの深さごとに色分けして表示します
- **条文ポップアップ** — 条文中の「第◯条」などの参照箇所から、参照先の条文をその場でポップアップ表示できます
- **条文番号ジャンプ** — テンキーで条文番号(「38の2」のような枝番号にも対応)を入力して、目的の条文へ直接ジャンプできます
- **法令内検索** — キーワードを含む条文だけを絞り込み、ヒット箇所をハイライト表示します
- **仮想スクロール** — react-virtuoso により、会社法(979条)のような長大な法令もスムーズにスクロールできます

## 対応試験

| 試験 | 状態 |
|---|---|
| 司法書士試験 | ✅ 対応済み |
| 社会保険労務士試験 | ✅ 対応済み |
| 行政書士試験 | ✅ 対応済み |
| 司法試験・司法予備試験・弁理士試験・税理士試験・土地家屋調査士試験・海事代理士試験 | 🚧 実装予定 |

収録法令(一部): 日本国憲法 / 民法 / 会社法 / 刑法 / 民事訴訟法 / 民事執行法 / 民事保全法 / 不動産登記法 / 商業登記法 / 供託法 / 司法書士法 / 社会保険労務士法 / 行政手続法 / 行政不服審査法 など

## 技術スタック

- [React 18](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vitejs.dev/) — ビルドツール
- [MUI v5](https://mui.com/) — UI コンポーネント
- [SWR](https://swr.vercel.app/) + [axios](https://axios-http.com/) — データ取得
- [react-virtuoso](https://virtuoso.dev/) — 仮想スクロール
- [Vitest](https://vitest.dev/) — テスト

## セットアップ

```bash
git clone https://github.com/migratoryfish/trams_roppo.git
cd trams_roppo
npm install

# 開発サーバーを起動 (http://localhost:5173)
npm run dev
```

### その他のコマンド

```bash
npm run build      # 型チェック + 本番ビルド (dist/ に出力)
npm run preview    # 本番ビルドをローカルで確認 (http://localhost:8080)
npx vitest run     # テストを実行
```

## 動作モード

条文データの取得元はモードによって切り替わります(`src/libs/useLawData.ts`)。

| モード | データ取得元 |
|---|---|
| 開発 (`npm run dev`) | ローカルの JSON ファイル (`src/datasource/`) |
| 本番 (`npm run build`) | REST API (`tr-rest-api.vercel.app`) |

## ディレクトリ構成

```
src/
├── components/     # React コンポーネント
│   ├── MainArea.tsx            # 画面全体のレイアウト(ヘッダ・ドロワー)
│   ├── LawTabs.tsx             # 法令タブ
│   ├── LawTabPanel.tsx         # 法令ごとのパネル(検索・ジャンプ・条文リスト)
│   ├── Articles.tsx            # 条文リスト(仮想スクロール)
│   ├── Article.tsx             # 条文1件の表示
│   ├── BracketHighLighter.tsx  # カッコの階層ハイライト
│   ├── PopUp.tsx               # 参照条文のポップアップ
│   └── ArticleJumpByNumber.tsx # 条文番号ジャンプ
├── datasource/     # 法令データ(JSON・開発モード用)
├── libs/           # カスタムフック・Context
└── util/           # ユーティリティ(漢数字変換など)
```

## ブランチ運用

`feature/*` → `develop` → `main` の順にマージしています。
