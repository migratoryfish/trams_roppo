import { getArticleData } from "../util/util";
import Article from "./Article";

const PopUp = (props: any) => {
  let art = getArticleData(props.lawId, props.articleNo);
  return (
    <div>
      <Article article={art} lawId={props.lawId} />
    </div>
  );
};

export default PopUp;
