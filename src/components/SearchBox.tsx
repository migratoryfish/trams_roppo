import * as React from "react";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import { useRef, useState } from "react";

type Props = {
  placeholder: string;
  sendKeyword: (keyword: string) => void;
  keyword: string;
};

const SearchBox: React.FC<Props> = ({ placeholder, sendKeyword, keyword }) => {
  // 現在 IME ON（変換中）かどうかのフラグ
  const isImeOn = useRef(false);
  const handleSearchInput = (inputValue: string) => {
    //if (keyword === inputValue) return;
    if (inputValue === "") {
      // Chrome ではテキストクリア時に onCompositionEnd が呼ばれないことがある
      isImeOn.current = false;
    } else if (isImeOn.current) {
      return; // IME 変換中は何もしない
    }
    sendKeyword(inputValue);
  };

  return (
    <Paper sx={{ p: "2px 4px", alignItems: "flex-end", width: 300 }}>
      <SearchIcon />
      <InputBase
        sx={{ ml: 1, flex: 1 }}
        placeholder={placeholder}
        onChange={(e) => {
          handleSearchInput(e.target.value);
        }}
        onCompositionStart={() => {
          isImeOn.current = true; // IME 入力中フラグを ON
          console.log("条文内検索　IME ON!!　で漢字入力開始です");
        }}
        onCompositionUpdate={() => {
          console.log("条文内検索　IME ON中で入力中…");
        }}
        onCompositionEnd={() => {
          isImeOn.current = false; // IME 入力中フラグを OFF
          handleSearchInput((event?.target as HTMLInputElement).value); //入力が確定したとき
          console.log("条文内検索　IME END!! 漢字変換が終了しました");
        }}
        defaultValue={keyword}
      />
    </Paper>
  );
};

export default SearchBox;
