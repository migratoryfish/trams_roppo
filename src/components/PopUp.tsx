import { ButtonBase, Tooltip } from "@mui/material";
import React from "react";
import { useState } from "react";
import { getArticleData } from "../util/util";
import Article from "./Article";

const PopUp = (props: any) => {
  let art = getArticleData("129AC0000000089", props.articleNo);
  return (
    <div>
      <Article article={art} />
    </div>
  );

  // return (
  //   <div>
  //     {"ここは前半の条文だよ"}
  //     <Tooltip
  //       title={
  //         <React.Fragment>
  //           <PopUp />
  //         </React.Fragment>
  //       }
  //       placement="bottom-start"
  //       arrow
  //       open={isPopup}
  //       onClose={handleMouseOut}
  //       onOpen={handleMouseOver}
  //     >
  //       <div>第九十九条</div>
  //     </Tooltip>
  //     {"ここは後半の条文だよ"}
  //   </div>
  // );
};

export default PopUp;
