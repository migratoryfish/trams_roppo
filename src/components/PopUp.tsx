import { findArticleData } from "../util/util";
import { useLawArticles } from "../libs/useLawData";
import Article from "./Article";

type Props = {
  lawId: string;
  articleNo: string;
};

const PopUp = ({ lawId, articleNo }: Props) => {
  const { articles, error, isLoading } = useLawArticles(lawId);

  if (isLoading) {
    return <div>{import.meta.env.VITE_LOADING_WORD}</div>;
  }

  const art = error ? undefined : findArticleData(articles, articleNo);
  if (!art) {
    return <div>この条文は現在参照できません</div>;
  }
  return (
    <div>
      <Article article={art} lawId={lawId} />
    </div>
  );
};

export default PopUp;
