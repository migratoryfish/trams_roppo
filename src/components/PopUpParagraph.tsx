import { Tooltip } from "@mui/material";
import React, { useState } from "react";
import PopUp from "./PopUp";
import { v4 as uuidv4 } from "uuid";
import BracketHighLighter from "./BracketHighLighter";

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
              {token.text}
              <Tooltip
                title={
                  <React.Fragment>
                    <PopUp articleNo={token.match} lawId={props.lawId} />
                  </React.Fragment>
                }
                placement="bottom-start"
                arrow
              >
                <div
                  style={{ display: "inline-block", backgroundColor: "orange" }}
                >
                  {token.match}
                </div>
              </Tooltip>
              {index === pg.length - 1 ? token.text : ""}
            </>
          );
        })}
      </>
    );
  }
};

export default PopUpParagraph;
