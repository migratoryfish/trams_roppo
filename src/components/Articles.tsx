import Box from "@mui/material/Box";
import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
//import InfiniteScroll from "react-infinite-scroll-component";
import Article from "./Article";
import { v4 as uuidv4 } from "uuid";

import InfiniteScroll from "react-infinite-scroller";
import { Virtuoso } from "react-virtuoso";
import { getArticleIndex } from "../util/util";

const Articles = (props: any) => {
  //   const [list, setList] = useState<any[]>([]); //表示するデータ
  //   const [hasMore, setHasMore] = useState(true); //再読み込み判定
  //   const [isFetching, setIsFetching] = useState(false);
  //   const original = useRef(props.articles); //データソース
  //   const jumpIndex = props.jumpIndex ? props.jumpIndex : -1;
  //   console.log("jumpIndex :" + jumpIndex);
  // const numberOfArticlesPerPage = 10;

  // const START_INDEX = 100;

  // const ArticleStartIndex = getArticleIndex(props.lawId, props.jumpIndex);
  const ArticleStartIndex = props.jumpIndex;
  const START_INDEX: number = !ArticleStartIndex
    ? 0
    : ArticleStartIndex >= props.articles.length
    ? props.articles.length - 1
    : isNaN(ArticleStartIndex)
    ? 0
    : // : ArticleStartIndex + 5 >= props.articles.length //TODO:補正する 上下無限スクロールかつ条文の高さが不定なのでこれでも厳しい
      // ? props.articles.length - 1
      // : ArticleStartIndex + 5;
      ArticleStartIndex;
  const INITIAL_ITEM_COUNT = 1;

  const original = useRef(props.articles); //データソース
  const [firstItemPreIndex, setFirstItemPreIndex] = useState(START_INDEX);
  const [firstItemMoreIndex, setFirstItemMoreIndex] = useState(START_INDEX);
  const firstItemPreIndexRef = useRef(firstItemPreIndex);
  firstItemPreIndexRef.current = firstItemPreIndex;
  const firstItemMoreIndexRef = useRef(firstItemMoreIndex);
  firstItemMoreIndexRef.current = firstItemMoreIndex;

  const [users, setUsers] = useState(() =>
    original.current.slice(START_INDEX, START_INDEX + INITIAL_ITEM_COUNT)
  );

  const prependItems = useCallback(() => {
    let usersToPrepend = 20;
    let nextFirstItemIndex = firstItemPreIndex - usersToPrepend;

    //先頭データが存在しない場合
    if (firstItemPreIndex === 0) return false;

    //先頭データ末端の場合の処理
    if (nextFirstItemIndex < 0) {
      nextFirstItemIndex = 0;
      usersToPrepend = firstItemPreIndex;
    }

    setTimeout(() => {
      setFirstItemPreIndex(() => nextFirstItemIndex);
      setUsers(() => [
        ...original.current.slice(
          nextFirstItemIndex,
          nextFirstItemIndex + usersToPrepend
        ),
        // ...generateUsers(usersToPrepend, nextFirstItemIndex),
        ...users,
      ]);
    }, 500);

    return false;
  }, [firstItemPreIndex, users, setUsers]);

  const loadMore = useCallback(() => {
    const usersToMore: number = 10;
    let nextFirstItemMoreIndex: number =
      Number(firstItemMoreIndexRef.current) + Number(usersToMore);

    //末端データまで来たら読み込まない
    console.log("original.current.length: " + original.current.length);
    console.log(
      "firstItemMoreIndexRef.current: " + firstItemMoreIndexRef.current
    );
    console.log("nextFirstItemMoreIndex: " + nextFirstItemMoreIndex);
    console.log("START_INDEX: " + START_INDEX);

    //TODO:指定したページで初期化するとリスト末端まで描画してしまうためこのコードでreturn
    // if (START_INDEX > 0) return;
    if (Number(firstItemMoreIndexRef.current) === original.current.length) {
      return;
    }
    if (original.current.length - 1 < nextFirstItemMoreIndex) {
      nextFirstItemMoreIndex = original.current.length;
    }
    return setTimeout(() => {
      setFirstItemMoreIndex(() => nextFirstItemMoreIndex);
      setUsers((users: any) => {
        //苦肉の策 typescriptの空の型がうまく指定できないため
        users = users.length === INITIAL_ITEM_COUNT ? [] : users;
        return [
          ...users,
          ...original.current.slice(
            nextFirstItemMoreIndex - usersToMore,
            nextFirstItemMoreIndex
          ),
        ];
      });
    }, 100);
  }, [setUsers]);

  // useEffect(() => {
  //   const timeout = loadMore();
  //   return () => clearTimeout(timeout);
  // }, []);

  return (
    <Virtuoso
      style={{ height: "100%" }}
      firstItemIndex={firstItemPreIndex}
      initialTopMostItemIndex={INITIAL_ITEM_COUNT - 1}
      data={users}
      startReached={prependItems}
      endReached={loadMore}
      // totalCount={original.current.length}
      totalCount={original.current.length}
      itemContent={(index, user) => {
        return (
          <Article
            key={uuidv4()}
            article={user}
            keyword={props.keyword}
            lawId={props.lawId}
          />
        );
      }}
    />
  );
};

export default Articles;
