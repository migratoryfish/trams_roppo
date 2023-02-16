import { getArticleData } from "../util/util";
import Article from "./Article";

const PopUp = (props: any) => {
  let art = getArticleData(props.lawId, props.articleNo);

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
