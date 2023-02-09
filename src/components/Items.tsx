import Typography from "@mui/material/Typography";
import React from "react";
import Highlighter from "react-highlight-words";

const Paragraph = (props: any) => {
  //
  //
  //
  //
  //
  //
  //

  return (
    <Typography component="div" paddingLeft={6}>
      {props.items
        .map((item: any, index: number) => {
          return (index + 1).toString() + " " + item;
        })
        .map((item: any, index: number) => {
          return (
            <React.Fragment key={index}>
              <Highlighter
                highlightClassName="YourHighlightClass2"
                searchWords={[props.keyword]}
                autoEscape={true}
                textToHighlight={item}
              />

              <br />
            </React.Fragment>
          );
        })}
    </Typography>
  );
};
export default Paragraph;
