//仕様として3重括弧までサポートする
const highLStrInBracketsInfo: string[] = [
  // "<Box component='span' sx={{background:'linear-gradient( to bottom, #FFFBB4, #FFFBB4)'}}> ",
  // "<Box component='span' sx={{background:'linear-gradient( to bottom, transparent 50%,#C9E3FF 0%)'}}> ",
  // "<Box component='span' sx={{background:'linear-gradient( to bottom, transparent 75%,#FFC1E0 0%)'}}> ",
  "<span style = 'background:linear-gradient( to bottom, #FFFBB4, #FFFBB4)'>",
  "<span style = 'background:linear-gradient( to bottom, transparent 50%,#C9E3FF 0%)'>",
  "<span style = 'background:linear-gradient( to bottom, transparent 75%,#FFC1E0 0%)'>",
];

const HighLStrInBrackets = (targetStr: string): string => {
  console.log("HighLStrInBrackets.targetStr: " + targetStr);

  //開始のカッコでsplit
  const splitOpenBrackets = targetStr.split("（");
  //終了のカッコでsplit
  const splitCloseBrackets = targetStr.split("）");

  //開始のカッコの数と終了のかっこの数が一致しない場合ハイライト処理中断
  if (splitOpenBrackets.length !== splitCloseBrackets.length) {
    return targetStr;
    //カッコが無ければこの時点でハイライト処理中断
  } else if (splitOpenBrackets.length === 1) {
    return targetStr;
  }

  //ハイライト用開始タグを追加
  let highlightColorIndex = 0;
  const processedStr = splitOpenBrackets
    .map((token, index, ary) => {
      if (index !== ary.length - 1) {
        //TODO:3重を超えたらハイライトは3重のままとする
        if (highlightColorIndex >= 3) {
          highlightColorIndex = 2;
        }
        //token内に終了カッコが含まれている場合はハイライトの色を終了カッコの数分段階を下げる
        const splitTokens = token.split("）");
        if (splitTokens.length !== 1) {
          highlightColorIndex -= splitTokens.length - 1;
        }
        const retToken = token + highLStrInBracketsInfo[highlightColorIndex];

        highlightColorIndex++;
        return retToken;
      } else {
        return token;
      }
    })
    .join("（");

  //ハイライト用終了タグを追加
  const returnStr = processedStr
    .split("）")
    .map((token, index, ary) => {
      if (index !== ary.length - 1) {
        return token + "）";
      } else {
        return token;
      }
    })
    .join(" </span>");

  console.log("HighLStrInBrackets.returnStr: " + returnStr);

  return returnStr;
};

export default HighLStrInBrackets;
