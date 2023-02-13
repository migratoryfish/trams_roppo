import { Box } from "@mui/material";
import { FC } from "react";

type Props = {
  textToHighlight: string;
  color?: string;
  level?: number;
};

const TextHighLighter: FC<Props> = (props: Props) => {
  const { textToHighlight, color = "#FFFF00", level = -1 } = props;

  const style =
    level < 0
      ? `linear-gradient( to bottom, ${color}, ${color})`
      : level >= 0 && level <= 3
      ? highLStrInBracketsInfo[level]
      : highLStrInBracketsInfo[3];
  return (
    <Box
      component="span"
      sx={{
        background: style,
      }}
    >
      {textToHighlight}
    </Box>
  );
};

//仕様として3重括弧までサポートする
const highLStrInBracketsInfo: string[] = [
  "linear-gradient( to bottom, #FFFFFF, #FFFFFF)", //ベース
  "linear-gradient( to bottom, #FFFBB4, #FFFBB4)", //1重
  "linear-gradient( to bottom, #FFFBB4 50%,#C9E3FF 50%) ", //2重
  "linear-gradient( to bottom, #FFFBB4 50%,#C9E3FF 50%, #C9E3FF 75%, #FFC1E0 75%)", //3重
];

export default TextHighLighter;
