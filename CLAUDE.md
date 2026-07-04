# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## プロジェクト概要

士業試験(司法書士・社労士・行政書士など)受験者向けのWeb六法アプリ。React 18 + TypeScript + Vite + MUI v5。UI・コミットメッセージ・コードコメントはすべて日本語。

## コマンド

```bash
npm run dev        # 開発サーバー (http://localhost:5173)
npm run build      # tsc(型チェック) + 本番ビルド
npm run lint       # ESLint (src配下の ts/tsx)
npx vitest run     # テスト全実行
npx vitest run src/util/util.test.tsx   # 単一ファイルのテスト
npx tsc            # 型チェックのみ
```

変更後の検証は `npx tsc` → `npx vitest run` → `npm run lint` → `npm run build` の順で行う。

## アーキテクチャ

### データフロー(画面の階層と一致)

```
MainArea (試験選択プルダウン: professionExam番号)
└─ LawTabs ── useExamList(professionExam) → 法令リスト(LawNameInfo[])
   └─ LawTabPanel ── useLawArticles(lawId) → 法令1本の条文データ(LawData)
      │              キーワードで条文を絞り込み
      └─ Articles ── react-virtuoso による仮想スクロール(上下両方向の遅延読み込み)
         └─ Article(条) → 項ごとに:
            ├─ PopUpParagraph → BracketHighLighter(カッコのネスト階層を色分け)
            │   └─ TextHighLighter → ArticlePopUpBase(「第◯条」参照を検出しポップアップ)
            │       └─ PopUp → findArticleData で参照先条文を表示
            └─ Items(号のリスト)
```

### データ取得の二重モード(最重要)

データ取得は `src/libs/useLawData.ts` の2フック(`useExamList` / `useLawArticles`)に**一元化**されている:

- **開発モード**: `src/datasource/*.json` のローカルデータ(法令ID→JSONの対応は `util.tsx` の `getLawCode`)
- **本番モード**: REST API `https://tr-rest-api.vercel.app` から SWR で取得

useSWR は常に無条件で呼び出し、開発モードでは key に `null` を渡してフェッチを無効化する方式。**過去にフックを条件分岐内で呼びクラッシュしたことがあるため、この構造を崩さないこと**(ESLint の `react-hooks/rules-of-hooks` が error 設定で監視している)。

### 型とドメイン知識

- 型定義は `src/libs/lawTypes.ts`: `LawData`(法令) → `LawArticle`(条) → `LawParagraph`(項) → `items: string[]`(号)
- 条文番号は文字列(枝番号は `"38の2"` 形式)。漢数字→数値変換は `util.tsx` の `kanjiNumber2arabiaNumber`(千の位まで対応。民法は第1050条まである)
- カッコハイライトは全角カッコ `（）` を解析対象とする(3重までサポート)
- 条文参照の検出正規表現は `第.{1,5}条`(`ArticlePopUpBase.tsx`)

### 意図的な設計ポイント

- `LawTabPanel` → `Articles` の key は `` `${keyword}_${jumpIndex}` ``。検索やジャンプ時に Virtuoso の表示位置を初期化するための**意図的な再マウント**なので変更しない
- 対象試験の追加は `util.tsx` の `getExamList` + `src/datasource/lawNameInfos.json` + `examScopeOfProsKey.ts` の3箇所を揃える

## 運用ルール

- ブランチ: `feature/<内容>` を main から切り → `develop` に `--no-ff` でマージ → `main` に `--no-ff` でマージ(メッセージは `Merge branch 'develop'`)→ develop と main を両方 push
- コミットメッセージは日本語
- main への push は本番反映につながる可能性があるため、検証を通してから行う
- CI(GitHub Actions)が push ごとに lint / test / build を実行する。ESLint は既存コードの未使用変数などを warn 扱いにしている(段階的に解消中。新規コードで警告を増やさない)
