import { Box } from "@mui/material";
import { FC } from "react";
import { v4 as uuidv4 } from "uuid";

type Props = {
  textToHighlight: string;
  keyWord?: string;
};

type HighlightToken = {
  token: string;
  keyWord: string;
};

const SearchIngTextHighLighter: FC<Props> = (props: Props) => {
  const { textToHighlight, keyWord = "" } = props;
  console.log("SearchIngTextHighLighter.textToHighlight" + textToHighlight);
  console.log("SearchIngTextHighLighter.keyWord: " + keyWord);
  const highLightColor = "#fd7e00";
  const tokens = textToHighlight.split(keyWord);
  const style = `linear-gradient( to bottom, ${highLightColor}, ${highLightColor})`;

  //キーワードが空文字
  if (!keyWord) {
    return <Box component="span">{textToHighlight}</Box>;
  }
  //キーワードと一致するものが無い場合
  else if (tokens.length === 1) {
    return <Box component="span">{textToHighlight}</Box>;
  }

  //出力用配列
  const highlightTokens: HighlightToken[] = [];
  tokens.forEach((token, index) => {
    if (tokens.length - 1 !== index) {
      highlightTokens.push({ token: token, keyWord: keyWord });
    } else {
      highlightTokens.push({ token: token, keyWord: "" });
    }
  });

  return (
    <Box component="span">
      {highlightTokens.map((token) => {
        return (
          <Box component="span">
            <Box component="span">{token.token}</Box>
            <Box
              component="span"
              sx={{
                background: style,
              }}
            >
              {token.keyWord}
            </Box>
          </Box>
        );
      })}
    </Box>
  );
  //   return (
  //     <Box
  //       component="span"
  //       sx={{
  //         background: style,
  //       }}
  //     >
  //       {textToHighlight}
  //     </Box>
  //   );
  //key={uuidv4()}
};

export default SearchIngTextHighLighter;
