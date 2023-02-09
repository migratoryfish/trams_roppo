import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Tooltip from "@mui/material/Tooltip";

import React, { useState } from "react";
import Items from "./Items";

import Highlighter from "react-highlight-words";
import { Box, ButtonBase } from "@mui/material";
import PopUp from "./PopUp";
import { color } from "@mui/system";

const Article = (props: any) => {
  return (
    <Card sx={{ minWidth: 275 }}>
      {/* 読み込み最中に表示する項目 */}
      <CardContent>
        <Typography sx={{ fontSize: 18 }} color="text.primary" gutterBottom>
          {/*<CustomSeparator {...props.article} />*/}
          {`第${props.article.number}条`}
        </Typography>
        <Typography component="div">
          {props.article.paragraphs.map((paragraph: any, index: number) => {
            return (
              <React.Fragment key={index}>
                {`第${index + 1}項:  `}
                {getPopUpParagraph(paragraph.sentence)}
                <Items items={paragraph.items} keyword={props.keyword} />
              </React.Fragment>
            );
          })}
        </Typography>
      </CardContent>
      <CardActions>関連条文参照</CardActions>
    </Card>
  );
};

//TODO:これはポップアップ用文字列を作成するコンポーネントです。要修正
//TODO:再帰だとスタックオーバーフローを起こすためループ処理に変換必須
const getPopUpParagraph = (paragraph: string) => {
  let { leftContext, lastMatch, rightContext } = getPopUpParser(paragraph);
  let obj = [];
  while (leftContext) {
    obj.push({ leftContext, lastMatch });
    let prevlastMatch = lastMatch;

    ({ leftContext, lastMatch, rightContext } = getPopUpParser(rightContext));
    if (prevlastMatch === lastMatch) break;
  }

  // return paragraph;

  //マッチしなかった場合そのまま出力(再帰脱出口)
  if (!leftContext) {
    console.log("マッチしませんでした");
    return <div>{paragraph}</div>;
  } else {
    // console.log("leftContext: " + leftContext);
    // console.log("lastMatch: " + lastMatch);
    // console.log("rightContext: " + rightContext);
    return (
      <div>
        {obj.map((pg, index, obj) => {
          return (
            <div>
              {pg.leftContext}
              <Tooltip
                title={
                  <React.Fragment>
                    <PopUp articleNo={pg.lastMatch} />
                  </React.Fragment>
                }
                placement="bottom-start"
                arrow
              >
                <div
                  style={{ display: "inline-block", backgroundColor: "orange" }}
                >
                  {pg.lastMatch}
                </div>
              </Tooltip>
              {index === obj.length - 1 ? rightContext : "■"}
            </div>
          );
        })}
      </div>
    );
  }

  //マッチした場合
  // return (
  //   <div>
  //     {leftContext}
  //     <Tooltip
  //       title={
  //         <React.Fragment>
  //           <PopUp />
  //         </React.Fragment>
  //       }
  //       placement="bottom-start"
  //       arrow
  //     >
  //       <div>{lastMatch}</div>
  //     </Tooltip>
  //     {getPopUpParagraph(rightContext)}
  //   </div>
  // );
};

const getPopUpParser = (paragraph: string) => {
  //TODO:文字数を限定 (ex:三百二十一 で最大でも5文字なので)　一時的対応要修正
  const matching = paragraph.match(/第.{1,5}条/);
  // const remaining = paragraph.replace(/第.*?条/, "");

  const leftContext = RegExp.leftContext;
  const lastMatch = RegExp.lastMatch;
  const rightContext = RegExp.rightContext;

  return {
    leftContext,
    lastMatch,
    rightContext,
  };
};

export default Article;
