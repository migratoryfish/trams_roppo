import { Tooltip } from "@mui/material";
import React, { useState } from "react";
import Highlighter from "react-highlight-words";
import PopUp from "./PopUp";
import StickyNote from "./StickyNote";

//TODO:これはポップアップ用文字列を作成するコンポーネントです。要修正
//TODO:再帰だとスタックオーバーフローを起こすためループ処理に変換必須
const PopUpParagraph = (props: any) => {
  const [isPopup, setIsPopup] = useState(false);
  const [isFixed, setIsFixed] = useState(false);

  const handleOpen = () => {
    setIsPopup(true);
    console.log("PopUpParagraph.handleOpen");
  };

  const handleClose = () => {
    // if (!isFixed) setIsPopup(false);
    setIsPopup(false);
    console.log("PopUpParagraph.handleClose");
  };

  const handleMouseClick = () => {
    console.log("PopUpParagraph.handleMouseClick");
    return <StickyNote />;
    //ボタンをクリックするとポップアップを固定/解除
    // setIsFixed(!isFixed);
  };
  let { leftContext, lastMatch, rightContext } = getPopUpParser(
    props.paragraph
  );
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
    return (
      <div>
        <Highlighter
          highlightClassName="YourHighlightClass"
          searchWords={[props.keyword]}
          autoEscape={true}
          textToHighlight={props.paragraph}
        />
      </div>
    );
  } else {
    // console.log("leftContext: " + leftContext);
    // console.log("lastMatch: " + lastMatch);
    // console.log("rightContext: " + rightContext);
    return (
      <div>
        {obj.map((pg, index, obj) => {
          return (
            <>
              <Highlighter
                highlightClassName="YourHighlightClass"
                searchWords={[props.keyword]}
                autoEscape={true}
                textToHighlight={pg.leftContext}
              />
              <Tooltip
                title={
                  <React.Fragment>
                    <PopUp articleNo={pg.lastMatch} />
                  </React.Fragment>
                }
                placement="bottom-start"
                arrow
                onOpen={handleOpen}
                onClose={handleClose}
                onClick={handleMouseClick}
              >
                <div
                  style={{ display: "inline-block", backgroundColor: "orange" }}
                >
                  <Highlighter
                    highlightClassName="YourHighlightClass"
                    searchWords={[props.keyword]}
                    autoEscape={true}
                    textToHighlight={pg.lastMatch}
                  />
                </div>
              </Tooltip>
              <Highlighter
                highlightClassName="YourHighlightClass"
                searchWords={[props.keyword]}
                autoEscape={true}
                textToHighlight={index === obj.length - 1 ? rightContext : ""}
              />
            </>
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

export default PopUpParagraph;
