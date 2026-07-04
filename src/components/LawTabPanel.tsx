import { FC, ReactNode, useEffect, useLayoutEffect, useState } from "react";
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
  Typography,
} from "@mui/material";
import ArticleJumpByNumber from "./ArticleJumpByNumber";
import { ReplyAll } from "@mui/icons-material";
import { flexbox } from "@mui/system";
import { useLawArticles } from "../libs/useLawData";
type Props = {
  targetArticlesID: string;
  value: string;
  //children?: ReactNode; 子要素(タグで囲まれた要素)がある場合記述すること
};

const LawTabPanel: FC<Props> = ({ targetArticlesID, value }) => {
  const [keyword, setKeyword] = useState("");
  const [jumpIndex, setjumpIndex] = useState("");
  useEffect(() => {
    return () => {
      setKeyword("");
    };
  }, [jumpIndex]);

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

  const sendJump = (value: string) => {
    console.log("sendJump: " + value);
    setjumpIndex(value);
  };

  //フックは条件分岐の外で常に呼び出す(フックのルール)
  //早期returnはすべてのフック呼び出しの後なので問題ない
  const {
    articles: extArticleData,
    error,
    isLoading,
  } = useLawArticles(targetArticlesID);
  if (error) {
    console.log("error!: " + error);
    return <TabPanel value={value.toString()}>エラーです…</TabPanel>;
  }
  if (isLoading || !extArticleData) {
    return <TabPanel value={value.toString()}>Loading中です…</TabPanel>;
  }

  const maxArticleNumberIndex = extArticleData.lawDataArticles?.at(-1)?.number;

  //TODO:keywordが空ならそもそもこのループを走らせないこと
  //TODO:号配下の文字列も検索対象にするか? 処理速度との絡み
  let data = extArticleData.lawDataArticles?.flatMap((article: any) =>
    article.paragraphs.some(
      (paragraph: any) =>
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
          width: "98vw",
          overflow: "hidden",
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
        <Box paddingRight={5} sx={{ display: "inline-block" }}>
          <Typography
            variant="h6"
            paddingRight={2}
            sx={{ display: "inline-block" }}
          >
            {"条文総数: " + data.length}
          </Typography>
          <Typography variant="h6" sx={{ display: "inline-block" }}>
            {"末端条文番号: " + maxArticleNumberIndex}
          </Typography>
        </Box>
        <Box sx={{ display: "inline-block" }}>
          <ArticleJumpByNumber
            open={open}
            onClose={handleClose}
            sendJump={sendJump}
            lawId={extArticleData.lawId}
          />
        </Box>
        <Box sx={{ display: "inline-block" }}>
          <Typography>
            {Number(jumpIndex) != -1 ? "" : "条文がみつかりませんでした。"}
          </Typography>
        </Box>
        <Box sx={{ height: "82vh" }}>
          {/* keywordまたはjumpIndexが変わったときだけ再マウントする(Virtuosoの表示位置を初期化するため) */}
          <Articles
            key={`${keyword}_${jumpIndex}`}
            keyword={keyword}
            articles={data}
            lawId={extArticleData.lawId}
            jumpIndex={Number(jumpIndex) != -1 ? jumpIndex : "0"}
            // jumpIndex={getArticleIndex(extArticleData.lawId, jumpIndex)}
          />
        </Box>
      </Box>
    </TabPanel>
  );
};

export default LawTabPanel;
