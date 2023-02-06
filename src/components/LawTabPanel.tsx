import { FC, ReactNode, useState } from "react";
import { TabPanel } from "@mui/lab";
import SearchBox from "./SearchBox";
import Articles from "./Articles";
import { Box } from "@mui/material";

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
        <SearchBox
          placeholder={"条文検索"}
          sendKeyword={sendKeyword}
          keyword={keyword}
        />
      </Box>
      <br />
      <br />
      <Articles keyword={keyword} targetArticlesID={targetArticlesID} />
    </TabPanel>
  );
};

export default LawTabPanel;
