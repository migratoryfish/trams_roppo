import { Tooltip, Typography } from "@mui/material";
import React, { useState } from "react";
import PopUp from "./PopUp";
import { v4 as uuidv4 } from "uuid";
import BracketHighLighter from "./BracketHighLighter";
import { LinearGradient } from "react-text-gradients";

const PopUpParagraph = (props: any) => {
  const reg = new RegExp("(第.{1,5}条)");
  const splitedStr = props.paragraph.split(reg);
  console.log("splitedStr: " + splitedStr);
  let pg = [];
  for (let index = 0; index < splitedStr.length; index += 2) {
    if (index !== splitedStr - 1) {
      pg.push({ text: splitedStr[index], match: splitedStr[index + 1] });
    } else {
      pg.push({ text: splitedStr[index], match: "" });
    }
  }

  //マッチしなかった場合
  if (splitedStr.length === 1) {
    return <BracketHighLighter bracketToHighlight={props.paragraph} />;
  } else {
    return (
      <>
        {pg.map((token, index: number, pg) => {
          return (
            <>
              <BracketHighLighter bracketToHighlight={token.text} />

              <Tooltip
                title={
                  <React.Fragment>
                    <PopUp articleNo={token.match} lawId={props.lawId} />
                  </React.Fragment>
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

export default PopUpParagraph;
