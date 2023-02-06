import Box from "@mui/material/Box";
import React, { useRef, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import Article from "./Article";
import minpoArticleData from "../datasource/minpoArticle.json";

import kenpoArticleData from "../datasource/kenpo.json";
import kaisyahoArticleData from "../datasource/kaisyaho.json";
import hudosantoukihoArticleData from "../datasource/hudosantoukiho.json";
import syogyotoukihoArticleData from "../datasource/syogyotoukiho.json";

const Articles = (props: any) => {
  const ID = props.targetArticlesID;
  let extArticleData;
  if (ID === "129AC0000000089") {
    extArticleData = minpoArticleData;
  } else if (ID === "321CONSTITUTION") {
    extArticleData = kenpoArticleData;
  } else if (ID === "416AC0000000123") {
    extArticleData = hudosantoukihoArticleData;
  } else if (ID === "417AC0000000086") {
    extArticleData = kaisyahoArticleData;
  } else if (ID === "338AC0000000125") {
    extArticleData = syogyotoukihoArticleData;
  } else {
    extArticleData = kenpoArticleData;
  }

  let data = extArticleData.lawDataArticles.flatMap((article) =>
    article.paragraphs.some(
      (paragraph) =>
        //!keyword ? true : paragraph.sentence.search(`/${keyword}/g`)
        //someではなく処理速度的にfindのほうがよいか?
        //ToDo:要検討
        {
          if (!props.keyword) {
            // console.log("keywordは空文字です");
            return true;
          } else if (paragraph.sentence.indexOf(props.keyword) !== -1) {
            // console.log("paragraph.sentence: " + paragraph.sentence);
            // console.log(props.keyword + " :keywordはヒットしました!!: ");
            return true;
          } else {
            // console.log("paragraph.sentence: " + paragraph.sentence);
            // console.log(props.keyword + "keywordがヒットしませんでした");
            return false;
          }
        }
      // paragraph.sentence.indexOf(keyword)
    )
      ? article
      : []
  );

  const original = useRef(data);

  //5未満の条文数だと無限スクロールに不具合発生
  //ToDo
  const [list, setList] = useState<any[]>(original.current.slice(0, 5));
  //original.current.splice(0, 3); ここに書くとダメ

  const fetchMoreData = () => {
    if (original.current.length >= 5) {
      original.current.splice(0, 5);
      setList([...list, ...original.current.slice(0, 5)]);
    } else {
      setList([...list, ...original.current]);
    }
  };

  const loader = <div>ローディング中です…</div>;

  return (
    <Box>
      <InfiniteScroll
        dataLength={list.length} //現在のデータの長さ
        next={fetchMoreData} // スクロール位置を監視してコールバック（次のデータを読み込ませる）
        hasMore={true} // さらにスクロールするかどうか（ある一定数のデータ数に達したらfalseを返すことで無限スクロールを回避）
        loader={loader} // ローディング中のコンポーネント
      >
        {list.map((article) => {
          return <Article article={article} keyword={props.keyword} />;
        })}
      </InfiniteScroll>
    </Box>
  );
};

export default Articles;
