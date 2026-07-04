//TODO:要モック化
import minpoArticleData from "../datasource/minpoArticle.json";
import kenpoArticleData from "../datasource/kenpo.json";
import kaisyahoArticleData from "../datasource/kaisyaho.json";
import hudosantoukihoArticleData from "../datasource/hudosantoukiho.json";
import syogyotoukihoArticleData from "../datasource/syogyotoukiho.json";
import syakaihokenroumushihoArticleData from "../datasource/syakaihokenroumushi.json";
import shihousyoshihoArticleData from "../datasource/shihousyoshiho.json";
import minjisosyouhoArticleData from "../datasource/minjisosyouho.json";
import minjishikkouhoArticleData from "../datasource/minjishikkouho.json";
import minjihozenhouArticleData from "../datasource/minjihozenhou.json";

import kyoutakuhoArticleData from "../datasource/kyoutakuho.json";
import keihoArticleData from "../datasource/keiho.json";

import examList from "../datasource/lawNameInfos.json";

// str: 日付文字列（yyyyMMdd）
export function toDate(str: string): string {
  const retDate =
    str.substring(0, 4) +
    "年" +
    str.substring(4, 6) +
    "月" +
    str.substring(6, 8) +
    "日";
  return retDate;
}

//TODO:将来的にモック対応
export const getLawCode = (lawId: string) => {
  let extArticleData;
  if (lawId === "129AC0000000089") {
    extArticleData = minpoArticleData;
  } else if (lawId === "321CONSTITUTION") {
    extArticleData = kenpoArticleData;
  } else if (lawId === "416AC0000000123") {
    extArticleData = hudosantoukihoArticleData;
  } else if (lawId === "417AC0000000086") {
    extArticleData = kaisyahoArticleData;
  } else if (lawId === "338AC0000000125") {
    extArticleData = syogyotoukihoArticleData;
  } else if (lawId === "343AC1000000089") {
    extArticleData = syakaihokenroumushihoArticleData;
  } else if (lawId === "325AC1000000197") {
    extArticleData = shihousyoshihoArticleData;
  } else if (lawId === "401AC0000000091") {
    extArticleData = minjihozenhouArticleData;
  } else if (lawId === "354AC0000000004") {
    extArticleData = minjishikkouhoArticleData;
  } else if (lawId === "408AC0000000109") {
    extArticleData = minjisosyouhoArticleData;
  } else if (lawId === "132AC0000000015") {
    extArticleData = kyoutakuhoArticleData;
  } else if (lawId === "140AC0000000045") {
    extArticleData = keihoArticleData;
  } else {
    extArticleData = kenpoArticleData;
  }

  return extArticleData;
};

export const getExamList = (profession: number) => {
  switch (profession) {
    case 0: //司法試験
      break;
    case 1: //司法予備試験
      break;
    case 2: //司法書士試験
      return examList.Shihoshoshi;
      break;
    case 3: //弁理士試験
      break;
    case 4: //税理士試験;
      break;
    case 5: //社会保険労務士試験
      return examList.Syakaihokenroumushi;
      break;
    case 6: //行政書士試験
      return examList.Gyoseishoshi;
      break;
    case 7: //土地家屋調査士試験
      break;
    case 8: //海事代理士試験
      break;
    default:
      console.log("想定外な士業試験です:professionNumber: " + profession);
      break;
  }
};

//条文データ(articles)から指定した条文番号の条文を探す純粋関数
//データ取得はフック(useLawArticles)側で行い、この関数は検索のみを担当する
export const findArticleData = (articles: any, _lawNo: string) => {
  if (!articles?.lawDataArticles) {
    return undefined;
  }

  const lawNo = kanjiNumber2arabiaNumber(
    _lawNo.substring(1, _lawNo.length - 1)
  );
  console.log("util.getArticleData.lawNo: " + lawNo);

  //TODO:効率のよい検索方法の実装 もしくはデータ構造
  let art;
  for (let index = 0; index < articles.lawDataArticles.length; index++) {
    if (articles.lawDataArticles[index].number === lawNo.toString()) {
      art = articles.lawDataArticles[index];
      break;
    }
  }
  console.log("util.getArticleData.art: " + art);
  return art;
};

//TODO:findArticleDataと統合
//条文データ(articles)から指定した条文番号のインデックスを探す純粋関数
export const findArticleIndex = (articles: any, _lawNo: string) => {
  if (!articles?.lawDataArticles) {
    return -1;
  }

  const lawNos = _lawNo.split("の");
  //"の"が2つ以上含まれている場合 tokenは3つ
  if (lawNos.length >= 3) {
    return -1;
  }
  //先頭の条文番号を取得
  const lawNo = Number(lawNos[0]);
  console.log("util.getArticleData.lawNo: " + lawNo);

  if (isNaN(lawNo)) {
    return -1;
  }
  //TODO:効率のよい検索方法の実装 もしくはデータ構造
  let articleIndex = -1;
  for (let index = 0; index < articles.lawDataArticles.length; index++) {
    if (articles.lawDataArticles[index].number === lawNo.toString()) {
      articleIndex = index;
      break;
    }
  }
  console.log("util.getArticleIndex.articleIndex: " + articleIndex);

  //後半の条文番号があれば取得して加算する
  //TODO:"の"が存在しない条文が後に続いた場合意図した条文に飛ばない
  if (lawNos[1]) {
    articleIndex += Number(lawNos[1]) - 1;
  }

  return articleIndex;
};

//漢数字を数値へ変換する
export const kanjiNumber2arabiaNumber = (kanjiNumber: string) => {
  let thousandsPlace = 0;
  let hundredsPlace = 0;
  let tensPlace = 0;
  let onesPlace = 0;
  let temp0 = "";
  let temp = "";

  //漢数字に千が含まれていない場合
  if (kanjiNumber.indexOf("千") === -1) {
    thousandsPlace = 0;
    temp0 = kanjiNumber.slice(0);
  } else if (kanjiNumber.indexOf("千") === 0) {
    //漢数字の先頭に千が含まれている場合
    thousandsPlace = 1000;
    temp0 = kanjiNumber.slice(1);
  } else if (kanjiNumber.indexOf("千") === 1) {
    //漢数字の2文字目に千が含まれている場合
    thousandsPlace = kanjiToken2arabiaToken(kanjiNumber.charAt(0)) * 1000;
    temp0 = kanjiNumber.slice(2);
  }

  //漢数字に百が含まれていない場合
  if (temp0.indexOf("百") === -1) {
    hundredsPlace = 0;
    temp = temp0.slice(0);
  } else if (temp0.indexOf("百") === 0) {
    //漢数字の先頭に百が含まれている場合
    hundredsPlace = 100;
    temp = temp0.slice(1);
  } else if (temp0.indexOf("百") === 1) {
    //漢数字の2文字目に百が含まれている場合
    hundredsPlace = kanjiToken2arabiaToken(temp0.charAt(0)) * 100;
    temp = temp0.slice(2);
  }

  let temp2 = "";
  if (temp.indexOf("十") === -1) {
    tensPlace = 0;
    temp2 = temp.slice(0);
  } else if (temp.indexOf("十") === 0) {
    tensPlace = 10;
    temp2 = temp.slice(1);
  } else if (temp.indexOf("十") === 1) {
    tensPlace = kanjiToken2arabiaToken(temp.charAt(0)) * 10;
    temp2 = temp.slice(2);
  }

  if (temp2.length > 0) {
    onesPlace = kanjiToken2arabiaToken(temp2);
  }

  return thousandsPlace + hundredsPlace + tensPlace + onesPlace;
};

//漢数字1文字を数値へ変換します
export const kanjiToken2arabiaToken = (ktoken: string) => {
  let atoken = 0;
  switch (ktoken) {
    case "一":
      atoken = 1;
      break;
    case "二":
      atoken = 2;
      break;
    case "三":
      atoken = 3;
      break;
    case "四":
      atoken = 4;
      break;
    case "五":
      atoken = 5;
      break;
    case "六":
      atoken = 6;
      break;
    case "七":
      atoken = 7;
      break;
    case "八":
      atoken = 8;
      break;
    case "九":
      atoken = 9;
      break;
    case "十":
      atoken = 10;
      break;
    case "百":
      atoken = 100;
      break;
    case "千":
      atoken = 1000;
      break;
    default:
      atoken = 0;
      break;
  }

  return atoken;
};

export const getMatchObject = (targetStr: string, matcher: string) => {
  const reg = new RegExp(matcher);
  const matching = targetStr.match(matcher);

  const leftContext = RegExp.leftContext;
  const lastMatch = RegExp.lastMatch;
  const rightContext = RegExp.rightContext;

  return {
    leftContext,
    lastMatch,
    rightContext,
  };
};
