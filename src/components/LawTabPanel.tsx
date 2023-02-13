import { FC, ReactNode, useState } from "react";
import { TabPanel } from "@mui/lab";
import SearchBox from "./SearchBox";
import Articles from "./Articles";
import {
  Box,
  Button,
  ButtonGroup,
  Grid,
  Popper,
  TextField,
} from "@mui/material";
import { getLawCode } from "../util/util";
import ArticleJumpByNumber from "./ArticleJumpByNumber";
import { ReplyAll } from "@mui/icons-material";
import { flexbox } from "@mui/system";
import { v4 as uuidv4 } from "uuid";
type Props = {
  targetArticlesID: string;
  value: string;
  //children?: ReactNode; 子要素(タグで囲まれた要素)がある場合記述すること
};

const LawTabPanel: FC<Props> = ({ targetArticlesID, value }) => {
  const [keyword, setKeyword] = useState("");

  //dialog 表示テストコード
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (value: string) => {
    setOpen(false);
  };
  //////
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
        <Box alignItems={"flex-end"} sx={{ display: "inline-block" }}>
          <SearchBox
            placeholder={"条文検索"}
            sendKeyword={sendKeyword}
            keyword={keyword}
          />
        </Box>
        {/*
        <Button variant="outlined" onClick={handleClickOpen}>
          Open simple dialog
        </Button>
      */}

        <ArticleJumpByNumber open={open} onClose={handleClose} />
      </Box>
      <br />
      <br />
      <Articles
        key={uuidv4()}
        keyword={keyword}
        articles={data}
        lawId={extArticleData.lawId}
      />
    </TabPanel>
  );
};

export default LawTabPanel;
