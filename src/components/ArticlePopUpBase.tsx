import { Box, Tooltip, Typography } from "@mui/material";
import { FC } from "react";
import { LinearGradient } from "react-text-gradients";
import PopUp from "./PopUp";
import { useContext } from "react";
import { PopUpArticleContext } from "../libs/SettingContext";
import SearchIngTextHighLighter from "./SearchIngTextHighLighter";
type Props = {
  str: string;
  lawId: string;
  keyWord: string;
};
const ArticlePopUpBase: FC<Props> = ({ str, lawId, keyWord }) => {
  const reg = new RegExp("(第.{1,5}条)");
  const splitedStr = str.split(reg);
  let pg = [];
  for (let index = 0; index < splitedStr.length; index += 2) {
    if (index !== splitedStr.length - 1) {
      pg.push({ text: splitedStr[index], match: splitedStr[index + 1] });
    } else {
      pg.push({ text: splitedStr[index], match: "" });
    }
  }

  const { isPopUpArticle, setIsPopUpArticle } = useContext(PopUpArticleContext);
  if (!isPopUpArticle) {
    // return <>{str}</>;
    return (
      <Box component="span">
        <SearchIngTextHighLighter textToHighlight={str} keyWord={keyWord} />
      </Box>
    );
  } else if (splitedStr.length === 1) {
    // return <>{str}</>;
    return (
      <Box component="span">
        <SearchIngTextHighLighter textToHighlight={str} keyWord={keyWord} />
      </Box>
    );
  } else {
    return (
      <>
        {pg.map((token, index: number, pg) => {
          return (
            <>
              {/* {token.text} */}
              <SearchIngTextHighLighter
                textToHighlight={token.text}
                keyWord={keyWord}
              />
              {/* <SearchIngTextHighLighter
                textToHighlight={token.text}
                keyWord={keyWord}
              /> */}

              <Tooltip
                title={
                  <>
                    <PopUp articleNo={token.match} lawId={lawId} />
                  </>
                }
                placement="bottom-start"
                arrow
              >
                <Typography sx={{ display: "inline-block" }}>
                  <LinearGradient gradient={["to left", "#ff0000 ,#ff0000"]}>
                    {token.match}
                  </LinearGradient>
                </Typography>
              </Tooltip>
            </>
          );
        })}
      </>
    );
  }
};

export default ArticlePopUpBase;
