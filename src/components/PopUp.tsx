import { findArticleData } from "../util/util";
import { useLawArticles } from "../libs/useLawData";
import Article from "./Article";

const PopUp = (props: any) => {
  const { articles, error, isLoading } = useLawArticles(props.lawId);

  if (isLoading) {
    return <div>{import.meta.env.VITE_LOADING_WORD}</div>;
  }

  const art = error ? undefined : findArticleData(articles, props.articleNo);
  if (!art) {
    return <div>この条文は現在参照できません</div>;
  }
  return (
    <div>
      <Article article={art} lawId={props.lawId} />
    </div>
  );
};

export default PopUp;
