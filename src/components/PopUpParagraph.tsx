import BracketHighLighter from "./BracketHighLighter";

const PopUpParagraph = (props: any) => {
  return (
    <BracketHighLighter
      bracketToHighlight={props.paragraph}
      lawId={props.lawId}
    />
  );
};

export default PopUpParagraph;
