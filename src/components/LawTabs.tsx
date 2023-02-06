import React from "react";
import { Tab, Tabs } from "@mui/material";
import { Typography } from "@mui/material";
import { Box } from "@mui/material";
import { Shihoshoshi, Gyoseishoshi } from "../datasource/lawNameInfos.json";
import { FC, ReactNode } from "react";

import ArticlesInfo from "./Articles";
import LawTabPanel from "./LawTabPanel";
import { TabContext, TabList, TabPanel } from "@mui/lab";

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

function TabPanel3(props: TabPanelProps) {
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

const LawTabs: FC<Props> = ({ keyword, children }) => {
  const [value, setValue] = React.useState(0);
  const shihoshoshi = Shihoshoshi;
  const gyoseishoshi = Gyoseishoshi;

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "100vw", typography: "body1" }}>
      <TabContext value={value.toString()}>
        <Box
          sx={{
            borderBottom: 1,
            borderColor: "divider",
            width: "100vw",
            position: "fixed",
            backgroundColor: "white",
          }}
        >
          <TabList onChange={handleChange} aria-label="lab API tabs example">
            <Tab label="憲法" value="1" />
            <Tab label="民法" value="2" />
            <Tab label="不動産登記法" value="3" />
            <Tab label="会社法" value="4" />
            <Tab label="商業登記法" value="5" />
          </TabList>
        </Box>
        <br />
        <Box>
          <LawTabPanel targetArticlesID="321CONSTITUTION" value="1" />
          <LawTabPanel targetArticlesID="129AC0000000089" value="2" />
          <LawTabPanel targetArticlesID="416AC0000000123" value="3" />
          <LawTabPanel targetArticlesID="417AC0000000086" value="4" />
          <LawTabPanel targetArticlesID="338AC0000000125" value="5" />
        </Box>
      </TabContext>
    </Box>
  );
};

export default LawTabs;
