import minpoArticleData from "../datasource/minpoArticle.json";

import kenpoArticleData from "../datasource/kenpo.json";
import kaisyahoArticleData from "../datasource/kaisyaho.json";
import hudosantoukihoArticleData from "../datasource/hudosantoukiho.json";
import syogyotoukihoArticleData from "../datasource/syogyotoukiho.json";

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
