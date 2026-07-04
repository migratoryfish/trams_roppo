import React, { useState } from "react";
import { Tab, Typography } from "@mui/material";
import { Box } from "@mui/material";
import { FC, ReactNode } from "react";
import LawTabPanel from "./LawTabPanel";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import { useExamList } from "../libs/useLawData";

type Props = {
  //color: string;
  children?: ReactNode;
  keyword: string;
  professionExam: number;
};

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

const LawTabs: FC<Props> = ({ keyword, children, professionExam }) => {
  const [selectedTabValue, setSelectedTabValu] = React.useState(0);
  //フックは条件分岐の外で常に呼び出す(フックのルール)
  const { examList, error } = useExamList(professionExam);
  if (error) {
    console.log("error!: " + error);
  }
  if (!examList) {
    return (
      <>
        <Typography variant="h4">
          {/* ヘッダのプルダウンメニューから試験を選択してください */}
          {import.meta.env.VITE_LOADING_WORD}
        </Typography>
      </>
    );
  }
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setSelectedTabValu(newValue);
  };

  return (
    <Box sx={{ height: "100%", width: "100vw", typography: "body1" }}>
      <TabContext value={selectedTabValue.toString()}>
        <Box
          sx={{
            borderBottom: 1,
            borderColor: "divider",
            width: "100vw",
            height: "13vh",
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
              return (
                <Tab
                  key={law.lawId}
                  label={law.lawName}
                  value={index.toString()}
                />
              );
            })}
          </TabList>
        </Box>
        <Box paddingTop={4} sx={{ height: "95vh" }}>
          {examList?.map((law, index) => {
            return (
              <LawTabPanel
                key={law.lawId}
                targetArticlesID={law.lawId}
                value={index.toString()}
              />
            );
          })}
        </Box>
      </TabContext>
    </Box>
  );
};

export default LawTabs;
