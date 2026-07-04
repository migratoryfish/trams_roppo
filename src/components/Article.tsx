import Typography from "@mui/material/Typography";

import React from "react";
import Items from "./Items";

import { Divider, Paper } from "@mui/material";
import PopUpParagraph from "./PopUpParagraph";
import type { LawArticle } from "../libs/lawTypes";

type Props = {
  article: LawArticle;
  keyword?: string;
  lawId: string;
};

const Article = (props: Props) => {
  return (
    <Paper>
      <Divider />
      <Typography variant="h6" color="text.primary">
        {props.article.articleCaption}
      </Typography>
      <Typography variant="h6" color="text.primary" id={props.article.number}>
        {`第${props.article.number}条`}
      </Typography>
      <Typography component="div">
        {props.article.paragraphs.map((paragraph, index) => {
          return (
            <React.Fragment key={index}>
              <Typography paddingLeft={2} variant="h6">{`第${
                index + 1
              }項:  `}</Typography>
              <Typography paddingLeft={4}>
                <PopUpParagraph
                  paragraph={paragraph.sentence}
                  keyword={props.keyword}
                  lawId={props.lawId}
                />
              </Typography>
              <Items
                items={paragraph.items}
                keyword={props.keyword}
                lawId={props.lawId}
              />
            </React.Fragment>
          );
        })}
      </Typography>
      <Divider />
    </Paper>
  );
};

export default Article;
