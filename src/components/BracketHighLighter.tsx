import { Box } from "@mui/material";
import { FC } from "react";
import TextHighLighter from "./TextHighLighter";
import { v4 as uuidv4 } from "uuid";

type Props = {
  bracketToHighlight: string;
};

type BracketHighLSet = {
  token: string;
  level: number;
};

const BracketHighLighter: FC<Props> = ({ bracketToHighlight }) => {
  const bracketLevelStack: BracketHighLSet[] = [];

  //開始のカッコでsplit
  const splitOpenBrackets = bracketToHighlight.split("（");
  //終了のカッコでsplit
  const splitCloseBrackets = bracketToHighlight.split("）");

  //開始のカッコの数と終了のかっこの数が一致しない場合ハイライト処理中断
  if (splitOpenBrackets.length !== splitCloseBrackets.length) {
    return <Box component="span">{bracketToHighlight}</Box>;
    //カッコが無ければこの時点でハイライト処理中断
  } else if (splitOpenBrackets.length === 1) {
    return <Box component="span">{bracketToHighlight}</Box>;
  }

  let level = 0;
  let openBracketIndex = bracketToHighlight.indexOf("（");
  let closeBracketIndex = bracketToHighlight.indexOf("）");
  let startIndex = 0;
  while (closeBracketIndex >= 0) {
    //開始カッコが存在しない
    if (openBracketIndex < 0) {
      let token = bracketToHighlight.substring(startIndex, closeBracketIndex);
      bracketLevelStack.push({ token: token, level: level });
      startIndex = closeBracketIndex;
      level--;
    } else if (openBracketIndex >= 0 && openBracketIndex < closeBracketIndex) {
      let token = bracketToHighlight.substring(startIndex, openBracketIndex);
      bracketLevelStack.push({ token: token, level: level });
      startIndex = openBracketIndex;
      level++;
    } else if (openBracketIndex > closeBracketIndex) {
      let token = bracketToHighlight.substring(startIndex, closeBracketIndex);
      bracketLevelStack.push({ token: token, level: level });
      startIndex = closeBracketIndex;
      level--;
    }

    openBracketIndex = bracketToHighlight.indexOf("（", startIndex + 1);
    closeBracketIndex = bracketToHighlight.indexOf("）", startIndex + 1);
    //TODO:念のため
    if (closeBracketIndex < 0) break;
  }
  //末尾のテキスト
  const token = bracketToHighlight.substring(startIndex);
  bracketLevelStack.push({ token: token, level: 0 });

  return (
    <Box component="span">
      {bracketLevelStack.map((token) => {
        return (
          <TextHighLighter
            key={uuidv4()}
            textToHighlight={token.token}
            level={token.level}
          />
        );
      })}
    </Box>
  );
};

export default BracketHighLighter;
