import React from "react";
import { Tab } from "@mui/material";
import { Box } from "@mui/material";
import { FC, ReactNode } from "react";
import LawTabPanel from "./LawTabPanel";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import { getExamList } from "../util/util";

type Props = {
  //color: string;
  children?: ReactNode;
  keyword: string;
  professionExam: string;
};

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

const LawTabs: FC<Props> = ({ keyword, children, professionExam }) => {
  const [selectedTabValue, setSelectedTabValu] = React.useState(1);
  const examList = getExamList(professionExam.toString());

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setSelectedTabValu(newValue);
  };

  return (
    <Box sx={{ width: "100vw", typography: "body1" }}>
      <TabContext value={selectedTabValue.toString()}>
        <Box
          sx={{
            borderBottom: 1,
            borderColor: "divider",
            width: "100vw",
            position: "fixed",
            backgroundColor: "white",
          }}
        >
          <TabList
            onChange={handleChange}
            aria-label="lab API tabs example"
            variant="scrollable"
            scrollButtons="auto"
          >
            {examList?.map((law, index) => {
              return <Tab label={law.lawName} value={(index + 1).toString()} />;
            })}
          </TabList>
        </Box>
        <br />
        <Box>
          {examList?.map((law, index) => {
            return (
              <LawTabPanel
                targetArticlesID={law.lawId}
                value={(index + 1).toString()}
              />
            );
          })}
        </Box>
      </TabContext>
    </Box>
  );
};

export default LawTabs;
