import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

import React from "react";
import Items from "./Items";

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
                {paragraph.sentence}
                <Items items={paragraph.items} />
              </React.Fragment>
            );
          })}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">関連条文参照</Button>
      </CardActions>
    </Card>
  );
};

export default Article;
