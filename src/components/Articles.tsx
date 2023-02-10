import Box from "@mui/material/Box";
import React, { useEffect, useRef, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import Article from "./Article";
import { v4 as uuidv4 } from "uuid";
const Articles = (props: any) => {
  console.log("props.articles: " + props.articles.length);
  const original = useRef(props.articles);

  //5未満の条文数だと無限スクロールに不具合発生
  //TODO:
  // const [list, setList] = useState<any[]>([...original.current].slice(0, 5));
  const [list, setList] = useState<any[]>(
    props.articles.length < 10
      ? [...props.articles]
      : props.articles.slice(0, 10)
  );
  //original.current.splice(0, 3); ここに書くとダメ

  //暫定措置 keyをコンポーネントに渡すと解消するらしいが…現時点で不可
  //初期stateが初期化されない問題への対処
  //TODO:ここにもprops.articlesが10未満の場合のコード必要
  useEffect(() => {
    setList([...props.articles].slice(0, 10));
  }, [props.keyword]);

  const fetchMoreData = () => {
    if (original.current.length >= 10) {
      original.current.splice(0, 10);
    } else if (original.current.length > 0) {
      original.current.splice(0, original.current.length);
    }

    if (original.current.length >= 10) {
      setList([...list, ...original.current.slice(0, 10)]);
    } else if (original.current.length > 0) {
      setList([...list, ...original.current]);
    }
    // if (original.current.length >= 5) {
    //   original.current.splice(0, 5);
    //   setList([...list, ...original.current.slice(0, 5)]);
    // } else {
    //   setList([...list, ...original.current]);
    // }
  };

  const loader = <div>ローディング中です…</div>;

  return (
    <Box>
      <InfiniteScroll
        dataLength={list.length} //現在のデータの長さ
        next={fetchMoreData} // スクロール位置を監視してコールバック（次のデータを読み込ませる）
        hasMore={true} // さらにスクロールするかどうか（ある一定数のデータ数に達したらfalseを返すことで無限スクロールを回避）
        loader={loader} // ローディング中のコンポーネント
        endMessage={
          <p style={{ textAlign: "center" }}>
            <b>Yay! You have seen it all</b>
          </p>
        }
      >
        {list.map((article, index) => {
          return (
            <Article key={uuidv4()} article={article} keyword={props.keyword} />
          );
        })}
      </InfiniteScroll>
    </Box>
  );
};

export default Articles;
