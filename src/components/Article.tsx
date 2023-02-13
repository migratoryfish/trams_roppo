import Typography from "@mui/material/Typography";

import React from "react";
import Items from "./Items";

import { Divider, Paper } from "@mui/material";
import PopUpParagraph from "./PopUpParagraph";
import { v4 as uuidv4 } from "uuid";
const Article = (props: any) => {
  return (
    <Paper>
      <Divider />
      {/* 読み込み最中に表示する項目 */}
      <Typography variant="h6" color="text.primary">
        {props.article.articleCaption}
      </Typography>
      <Typography variant="h6" color="text.primary">
        {`第${props.article.number}条`}
      </Typography>
      <Typography component="div">
        {props.article.paragraphs.map((paragraph: any, index: number) => {
          return (
            <React.Fragment key={uuidv4()}>
              <Typography paddingLeft={2} variant="h6">{`第${
                index + 1
              }項:  `}</Typography>
              <Typography paddingLeft={4}>
                {/*{getPopUpParagraph(paragraph.sentence)}*/}
                <PopUpParagraph
                  paragraph={paragraph.sentence}
                  keyword={props.keyword}
                  lawId={props.lawId}
                />
              </Typography>
              <Items items={paragraph.items} keyword={props.keyword} />
            </React.Fragment>
          );
        })}
      </Typography>
      <Divider />
    </Paper>
  );
};

export default Article;
