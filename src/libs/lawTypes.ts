//法令データの型定義
//src/datasource/*.json および REST API のレスポンスと同じ構造

//項(第◯項)
export interface LawParagraph {
  sentence: string;
  items: string[]; //号(第◯号)
}

//条(第◯条)
export interface LawArticle {
  part: string | null; //編
  chapter: string | null; //章
  section: string | null; //節
  subSection: string | null; //款
  division: string | null; //目
  articleCaption: string | null; //条文見出し(例:「(基本原則)」)
  number: string; //条文番号(例:"1", "38_2")
  paragraphs: LawParagraph[];
}

//法令1本分の条文データ
export interface LawData {
  lawId: string; //法令ID(例:"129AC0000000089"=民法)
  lawNum: string; //法令番号(例:「明治二十九年法律第八十九号」)
  lawTOC: unknown; //目次(現状未使用)
  lawDataArticles: LawArticle[];
}

//法令の基本情報(lawNameInfos.json の各エントリ)
export interface LawNameInfo {
  lawId: string;
  lawName: string; //法令名(例:「民法」)
  lawNo: string; //法令番号
  promulgationDate: string; //公布日(yyyyMMdd)
}
