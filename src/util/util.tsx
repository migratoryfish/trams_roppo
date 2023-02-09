import minpoArticleData from "../datasource/minpoArticle.json";

import kenpoArticleData from "../datasource/kenpo.json";
import kaisyahoArticleData from "../datasource/kaisyaho.json";
import hudosantoukihoArticleData from "../datasource/hudosantoukiho.json";
import syogyotoukihoArticleData from "../datasource/syogyotoukiho.json";

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
  } else {
    extArticleData = kenpoArticleData;
  }

  return extArticleData;
};

export const getExamList = (profession: string) => {
  switch (profession) {
    case "0":
      break;
    case "1":
      return examList.Shihoshoshi;
      break;
    case "2":
      return examList.Gyoseishoshi;
      break;
    default:
      console.log("想定外な士業試験です:professionNumber: " + profession);
      break;
  }
};

export const getArticleData = (lawId: string, _lawNo: string) => {
  const articles = getLawCode(lawId);
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

//漢数字を数値へ変換する
export const kanjiNumber2arabiaNumber = (kanjiNumber: string) => {
  let hundredsPlace = 0;
  let tensPlace = 0;
  let onesPlace = 0;
  let temp = "";

  //漢数字sに百が含まれていない場合
  if (kanjiNumber.indexOf("百") === -1) {
    hundredsPlace = 0;
    temp = kanjiNumber.slice(0);
  } else if (kanjiNumber.indexOf("百") === 0) {
    //漢数字sの先頭に百が含まれている場合
    hundredsPlace = 100;
    temp = kanjiNumber.slice(1);
  } else if (kanjiNumber.indexOf("百") === 1) {
    //漢数字sの2文字目に百が含まれている場合
    hundredsPlace = kanjiToken2arabiaToken(kanjiNumber.charAt(0)) * 100;
    temp = kanjiNumber.slice(2);
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

  return hundredsPlace + tensPlace + onesPlace;
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
    default:
      atoken = 0;
      break;
  }

  return atoken;
};
