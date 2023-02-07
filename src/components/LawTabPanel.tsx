import { FC, ReactNode, useState } from "react";
import { TabPanel } from "@mui/lab";
import SearchBox from "./SearchBox";
import Articles from "./Articles";
import { Box } from "@mui/material";
import { getLawCode } from "../util/util";

type Props = {
  targetArticlesID: string;
  value: string;
  //children?: ReactNode; 子要素(タグで囲まれた要素)がある場合記述すること
};

const LawTabPanel: FC<Props> = ({ targetArticlesID, value }) => {
  const [keyword, setKeyword] = useState("");
  const sendKeyword = (keyword: string) => {
    setKeyword(keyword);
  };

  const extArticleData = getLawCode(targetArticlesID);

  let data = extArticleData.lawDataArticles.flatMap((article) =>
    article.paragraphs.some(
      (paragraph) =>
        //!keyword ? true : paragraph.sentence.search(`/${keyword}/g`)
        //someではなく処理速度的にfindのほうがよいか?
        //ToDo:要検討
        {
          if (!keyword) {
            // console.log("keywordは空文字です");
            return true;
          } else if (paragraph.sentence.indexOf(keyword) !== -1) {
            // console.log("paragraph.sentence: " + paragraph.sentence);
            // console.log(props.keyword + " :keywordはヒットしました!!: ");
            return true;
          } else {
            // console.log("paragraph.sentence: " + paragraph.sentence);
            // console.log(props.keyword + "keywordがヒットしませんでした");
            return false;
          }
        }
      // paragraph.sentence.indexOf(keyword)
    )
      ? article
      : []
  );

  return (
    <TabPanel value={value.toString()}>
      <Box
        sx={{
          borderBottom: 2,
          borderColor: "divider",
          width: "100vw",
          position: "fixed",
          backgroundColor: "azure",
        }}
      >
        <SearchBox placeholder={"条文検索"} sendKeyword={sendKeyword} />
      </Box>
      <br />
      <br />
      <Articles keyword={keyword} articles={[...data]} />
    </TabPanel>
  );
};

export default LawTabPanel;
