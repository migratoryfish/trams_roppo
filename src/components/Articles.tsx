import Box from "@mui/material/Box";
import React, { useEffect, useRef, useState } from "react";
//import InfiniteScroll from "react-infinite-scroll-component";
import Article from "./Article";
import { v4 as uuidv4 } from "uuid";

import InfiniteScroll from "react-infinite-scroller";
const Articles = (props: any) => {
  const [list, setList] = useState<any[]>([]); //表示するデータ
  const [hasMore, setHasMore] = useState(true); //再読み込み判定
  const [isFetching, setIsFetching] = useState(false);
  const original = useRef(props.articles); //データソース

  const numberOfArticlesPerPage = 10;
  //項目を読み込むときのコールバック
  const loadMore = (page: any) => {
    try {
      setIsFetching(true);
      {
        // const response = await fetch(`http://localhost:3000/api/test?page=${page}`); //API通信
        // const data = await response.json(); //取得データ

        console.log("loadMore.page: " + page);
        const data = original.current.slice(
          (page - 1) * numberOfArticlesPerPage,
          page * numberOfArticlesPerPage
        );

        //データ件数が0件の場合、処理終了
        if (data.length < 1) {
          console.log("data.length < 1");
          setHasMore(false);
          return;
        }
        //取得データをリストに追加
        setList([...list, ...data]);
      }
    } finally {
      setIsFetching(false);
    }
  };

  //各スクロール要素
  const aricles = (
    <>
      {list.map((article, index) => {
        return (
          <Article
            key={uuidv4()}
            article={article}
            keyword={props.keyword}
            lawId={props.lawId}
          />
        );
      })}
    </>
  );

  //ロード中に表示する項目
  const loader = (
    <div className="loader" key={0}>
      Loading ...
    </div>
  );

  return (
    <Box>
      <InfiniteScroll
        pageStart={0}
        loadMore={loadMore} //項目を読み込む際に処理するコールバック関数
        hasMore={!isFetching && hasMore} //読み込みを行うかどうかの判定
        loader={loader}
      >
        {aricles} {/* 無限スクロールで表示する項目 */}
      </InfiniteScroll>
    </Box>
  );
};

export default Articles;
