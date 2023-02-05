import React, { useRef } from "react";
import { Tab, Tabs } from "@mui/material";
import { Typography } from "@mui/material";
import { Box } from "@mui/material";
import { Accordion, AccordionSummary, AccordionDetails } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Shihoshoshi, Gyoseishoshi } from "../datasource/lawNameInfos.json";
import { FC, ReactNode } from "react";
import SearchIcon from "@mui/icons-material/Search";
import { toDate } from "../util/util";
import Article from "./Article";
import extArticleData from "../datasource/minpoArticle.json";
import ArticlesInfo from "./ArticlesInfo";

type Props = {
  //color: string;
  children?: ReactNode;
  keyword: string;
};

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const BasicTabs: FC<Props> = ({ keyword, children }) => {
  const [value, setValue] = React.useState(0);
  const shihoshoshi = Shihoshoshi;
  const gyoseishoshi = Gyoseishoshi;

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          variant="scrollable"
          scrollButtons
          allowScrollButtonsMobile
          aria-label="basic tabs example"
        >
          <Tab label="憲法" {...a11yProps(0)} />
          <Tab label="民法" {...a11yProps(1)} />
          <Tab label="不動産登記法" {...a11yProps(2)} />
          <Tab label="会社法" {...a11yProps(3)} />
          <Tab label="商業登記法" {...a11yProps(4)} />
          <Tab label="刑法" {...a11yProps(5)} />
          <Tab label="民事訴訟法" {...a11yProps(6)} />
          <Tab label="民事執行法" {...a11yProps(7)} />
          <Tab label="民事保全法" {...a11yProps(8)} />
          <Tab label="供託法" {...a11yProps(9)} />
          <Tab label="司法書士法" {...a11yProps(10)} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        憲法: サンプルの文字列です
      </TabPanel>
      <TabPanel value={value} index={1}>
        <ArticlesInfo keyword={keyword} />
      </TabPanel>
      <TabPanel value={value} index={2}>
        不動産登記: サンプルの文字列です
      </TabPanel>
    </Box>
  );
};

export default BasicTabs;
