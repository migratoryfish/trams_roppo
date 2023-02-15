import { Tooltip, Typography } from "@mui/material";
import { FC } from "react";
import { LinearGradient } from "react-text-gradients";
import PopUp from "./PopUp";
import { useContext } from "react";
import { PopUpArticleContext } from "../libs/SettingContext";

type Props = {
  str: string;
  lawId: string;
};
const ArticlePopUpBase: FC<Props> = ({ str, lawId }) => {
  console.log("ReturnToken.lawId: " + lawId);
  const reg = new RegExp("(第.{1,5}条)");
  const splitedStr = str.split(reg);
  console.log("splitedStr: " + splitedStr);
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
    return <>{str}</>;
  } else if (splitedStr.length === 1) {
    return <>{str}</>;
  } else {
    return (
      <>
        {pg.map((token, index: number, pg) => {
          return (
            <>
              {token.text}

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
                  <LinearGradient gradient={["to left", "#17acff ,#ff68f0"]}>
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
