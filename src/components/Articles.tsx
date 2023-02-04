import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

import InfiniteScroll from "react-infinite-scroller";
import { useState } from "react";
import React from "react";

const Articles = (props: any) => {
  // const [list, setList] = useState<any>([]); //表示するデータ
  // const [hasMore, setHasMore] = useState(true); //再読み込み判定

  // //項目を読み込むときのコールバック;
  // const loadMore = (page: any) => {
  //   //データ件数が0件の場合、処理終了
  //   if (props.article.length < 1) {
  //     setHasMore(false);
  //     return;
  //   }
  //   //取得データをリストに追加
  //   setList([...list, ...props.article.paragraphs]);
  // };

  //各スクロール要素
  // const items = (
  //   <ul>
  //     {list.paragraphs.map((paragraph: any) => {
  //       return paragraph.sentence;
  //     })}
  //   </ul>
  // );

  // //ロード中に表示する項目
  // const loader = <div className="loader" key={0}></div>;
  return (
    <Card sx={{ minWidth: 275 }}>
      {/* 読み込み最中に表示する項目 */}
      <CardContent>
        <Typography sx={{ fontSize: 18 }} color="text.primary" gutterBottom>
          {/*<CustomSeparator {...props.article} />*/}
          {`第${props.article.number}条`}
        </Typography>
        <Typography component="div">
          {props.article.paragraphs.map((pg: any) => {
            return pg.sentence;
          })}
        </Typography>
        <Typography component="div">
          {props.article.paragraphs[0].items
            .map((item: any, index: any) => {
              return (index + 1).toString() + " " + item;
            })
            .map((item: any, index: any) => {
              return (
                <React.Fragment key={index}>
                  {item}
                  <br />
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

export default Articles;
