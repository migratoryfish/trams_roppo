import BracketHighLighter from "./BracketHighLighter";

const PopUpParagraph = (props: any) => {
  return (
    <BracketHighLighter
      bracketToHighlight={props.paragraph}
      lawId={props.lawId}
      keyWord={props.keyword}
    />
  );
};

export default PopUpParagraph;
