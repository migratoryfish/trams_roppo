import Typography from "@mui/material/Typography";
import React from "react";

const Paragraph = (props: any) => {
  //
  //
  //
  //
  //
  //
  //

  return (
    <Typography component="div">
      {props.items
        .map((item: any, index: number) => {
          return (index + 1).toString() + " " + item;
        })
        .map((item: any, index: number) => {
          return (
            <React.Fragment key={index}>
              {item}
              <br />
            </React.Fragment>
          );
        })}
    </Typography>
  );
};
export default Paragraph;
