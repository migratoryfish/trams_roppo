import { Tooltip } from "@mui/material";
import React, { useState } from "react";
import Highlighter from "react-highlight-words";
import PopUp from "./PopUp";
import StickyNote from "./StickyNote";
import { v4 as uuidv4 } from "uuid";
import { getMatchObject } from "../util/util";
import HighLStrInBrackets from "./HighLStrInBrackets";
import TextHighLighter from "./TextHighLighter";
import BracketHighLighter from "./BracketHighLighter";
//TODO:これはポップアップ用文字列を作成するコンポーネントです。要修正
//TODO:再帰だとスタックオーバーフローを起こすためループ処理に変換必須
//TODO:コンポーネントを引数にとるコンポーネントがほしいな
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
  //TODO:文字数を限定 (ex:三百二十一 で最大でも5文字なので)　一時的対応要修正
  let { leftContext, lastMatch, rightContext } = getMatchObject(
    props.paragraph,
    "第.{1,5}条"
  );
  let obj = [];
  while (leftContext) {
    obj.push({ leftContext, lastMatch });
    let prevlastMatch = lastMatch;
    //TODO:文字数を限定 (ex:三百二十一 で最大でも5文字なので)　一時的対応要修正
    ({ leftContext, lastMatch, rightContext } = getMatchObject(
      rightContext,
      "第.{1,5}条"
    ));
    if (prevlastMatch === lastMatch) break;
  }

  // return paragraph;

  //マッチしなかった場合そのまま出力(再帰脱出口)
  if (!leftContext) {
    console.log("マッチしませんでした: props.paragraph: " + props.paragraph);
    //return <div>{props.paragraph}</div>;
    //return HighLStrInBrackets(props.paragraph);
    // return <div>{props.paragraph}</div>;
    return <BracketHighLighter bracketToHighlight={props.paragraph} />;
    // return (
    //   <div
    //     dangerouslySetInnerHTML={{
    //       __html: HighLStrInBrackets(props.paragraph),
    //     }}
    //   />
    // );
  } else {
    // console.log("leftContext: " + leftContext);
    // console.log("lastMatch: " + lastMatch);
    // console.log("rightContext: " + rightContext);
    return <BracketHighLighter bracketToHighlight={props.paragraph} />;
    // return (
    //   <div>
    //     {obj.map((pg, index, obj) => {
    //       return (
    //         <React.Fragment key={uuidv4()}>
    //           <Highlighter
    //             highlightClassName="YourHighlightClass1"
    //             searchWords={[props.keyword]}
    //             autoEscape={true}
    //             textToHighlight={pg.leftContext}
    //           />
    //           <Tooltip
    //             title={
    //               <React.Fragment>
    //                 <PopUp articleNo={pg.lastMatch} lawId={props.lawId} />
    //               </React.Fragment>
    //             }
    //             placement="bottom-start"
    //             arrow
    //             onOpen={handleOpen}
    //             onClose={handleClose}
    //             onClick={handleMouseClick}
    //           >
    //             <div
    //               style={{ display: "inline-block", backgroundColor: "orange" }}
    //             >
    //               <Highlighter
    //                 highlightClassName="YourHighlightClass2"
    //                 searchWords={[props.keyword]}
    //                 autoEscape={true}
    //                 textToHighlight={pg.lastMatch}
    //               />
    //             </div>
    //           </Tooltip>
    //           <Highlighter
    //             highlightClassName="YourHighlightClass3"
    //             searchWords={[props.keyword]}
    //             autoEscape={true}
    //             textToHighlight={index === obj.length - 1 ? rightContext : ""}
    //           />
    //         </React.Fragment>
    //       );
    //     })}
    //   </div>
    // );
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

// const getPopUpParser = (targetStr: string, matcher: string) => {
//   const reg = new RegExp(matcher);
//   const matching = targetStr.match(matcher);
//   //const matching = targetStr.match(/第.{1,5}条/);
//   // const remaining = paragraph.replace(/第.*?条/, "");

//   const leftContext = RegExp.leftContext;
//   const lastMatch = RegExp.lastMatch;
//   const rightContext = RegExp.rightContext;

//   return {
//     leftContext,
//     lastMatch,
//     rightContext,
//   };
// };

export default PopUpParagraph;
