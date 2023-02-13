import Typography from "@mui/material/Typography";
import React from "react";
import Highlighter from "react-highlight-words";
import { v4 as uuidv4 } from "uuid";
import BracketHighLighter from "./BracketHighLighter";
const Item = (props: any) => {
  return (
    <Typography component="div" paddingLeft={6}>
      {props.items
        .map((item: any, index: number) => {
          return (index + 1).toString() + " " + item;
        })
        .map((item: any, index: number) => {
          return (
            <React.Fragment key={uuidv4()}>
              <BracketHighLighter
                bracketToHighlight={item}
                lawId={props.lawId}
              />
              <br />
            </React.Fragment>
          );
        })}
    </Typography>
  );
};
export default Item;
