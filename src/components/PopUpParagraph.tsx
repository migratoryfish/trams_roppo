import BracketHighLighter from "./BracketHighLighter";

type Props = {
  paragraph: string;
  keyword?: string;
  lawId: string;
};

const PopUpParagraph = ({ paragraph, keyword, lawId }: Props) => {
  return (
    <BracketHighLighter
      bracketToHighlight={paragraph}
      lawId={lawId}
      keyWord={keyword}
    />
  );
};

export default PopUpParagraph;
