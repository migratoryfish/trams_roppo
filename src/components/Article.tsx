import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

import React from "react";
import Items from "./Items";

import Highlighter from "react-highlight-words";

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
                <Highlighter
                  highlightClassName="YourHighlightClass"
                  searchWords={[props.keyword]}
                  autoEscape={true}
                  textToHighlight={paragraph.sentence}
                />
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

export default Article;
