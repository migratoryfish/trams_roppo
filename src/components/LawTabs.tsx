import React, { useState } from "react";
import { Tab, Typography } from "@mui/material";
import { Box } from "@mui/material";
import { FC, ReactNode } from "react";
import LawTabPanel from "./LawTabPanel";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import { getExamList } from "../util/util";
import { v4 as uuidv4 } from "uuid";
import useSWR from "swr";
import axios from "axios";
import { examScopeOfProsKey } from "../libs/examScopeOfProsKey";
// axios.defaults.headers.post["Access-Control-Allow-Origin"] = "*";

// axios({
//   headers: {
//     "Content-Type": "application/x-www-form-urlencoded",
//   },
// });
const fetcher = (url: string) => axios.get(url).then((res) => res.data);

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
  let examList;
  if (import.meta.env.MODE === "development") {
    examList = getExamList(professionExam);
  } else if (import.meta.env.MODE === "production") {
    const exam = examScopeOfProsKey[professionExam];
    console.log("あなたの選んだ試験範囲は : exam: " + exam);
    const { data, error, isLoading } = useSWR(
      `https://tr-rest-api.vercel.app/api/examScopeOfPro/${exam}`,
      fetcher
    );
    if (error) {
      console.log("error!: " + error);
    }

    examList = data;
  }
  if (!examList) {
    return (
      <>
        <Typography variant="h4">
          {/* ヘッダのプルダウンメニューから試験を選択してください */}
          {import.meta.env.VITE_SAMPLE_WORD}
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
            {/* {examList?.map((law, index) => { */}
            {examList?.map((law: any, index: number) => {
              return (
                <Tab
                  key={uuidv4()}
                  label={law.lawName}
                  value={index.toString()}
                />
              );
            })}
          </TabList>
        </Box>
        <Box paddingTop={4} sx={{ height: "95vh" }}>
          {/* {examList?.map((law, index) => { */}
          {examList?.map((law: any, index: number) => {
            return (
              <LawTabPanel
                key={uuidv4()}
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
