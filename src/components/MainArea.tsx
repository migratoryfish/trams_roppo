import * as React from "react";
import { styled, useTheme, alpha } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import SearchIcon from "@mui/icons-material/Search";
import {
  Person,
  SettingsApplications,
  HelpOutline,
  Warning,
  Lens,
} from "@mui/icons-material";
import LawTabs from "./LawTabs";
import InputBase from "@mui/material/InputBase";
import { useContext, useMemo, useRef, useState } from "react";
import {
  FormControl,
  Hidden,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import { BracketHighLightContext } from "../libs/SettingContext";
import { PopUpArticleContext } from "../libs/SettingContext";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(5),
    width: "auto",
  },
}));
const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));
const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));

const drawerWidth = 240;

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })<{
  open?: boolean;
}>(({ theme, open }) => ({
  flexGrow: 1,
  padding: theme.spacing(0),
  transition: theme.transitions.create("margin", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  marginLeft: `-${drawerWidth}px`,
  ...(open && {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
    verticalAlign: 0,
  }),
}));

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(({ theme, open }) => ({
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));

export default function MainArea() {
  const theme = useTheme();
  const { isBracketHighLight, setIsBracketHighLight } = useContext(
    BracketHighLightContext
  );
  const { isPopUpArticle, setIsPopUpArticle } = useContext(PopUpArticleContext);
  //select(プルダウン)用テストコードS
  const [professionExam, setProfessionExam] = useState(0);

  const handleChange = (event: SelectChangeEvent) => {
    setProfessionExam(Number(event.target.value));
  };
  //select(プルダウン)用テストコードE

  const [open, setOpen] = React.useState(false);
  // 入力キーワード
  const [keyword, setKeyword] = React.useState("");
  // 現在 IME ON（変換中）かどうかのフラグ
  const isImeOn = useRef(false);

  const handleSearchInput = (value: string) => {
    console.log("条文横断検索　検索ボックスの値が変化しました");
    if (keyword === value) return;
    if (value === "") {
      // Chrome ではテキストクリア時に onCompositionEnd が呼ばれないことがある
      isImeOn.current = false;
    } else if (isImeOn.current) {
      return; // IME 変換中は何もしない
    }
    setKeyword(value);
  };

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = (event: React.MouseEvent<HTMLElement>) => {
    if (event.currentTarget.textContent?.includes("カッコハイライト")) {
      event.currentTarget.textContent = !isBracketHighLight
        ? "現在:カッコハイライト機能ON"
        : "現在:カッコハイライト機能OFF";
      setIsBracketHighLight(!isBracketHighLight);
    } else if (event.currentTarget.textContent?.includes("条文ポップアップ")) {
      event.currentTarget.textContent = !isPopUpArticle
        ? "現在:条文ポップアップ機能ON"
        : "現在:条文ポップアップ機能OFF";
      setIsPopUpArticle(!isPopUpArticle);
    }
    setOpen(false);
  };

  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        overflow: "hidden",
        scrollbarWidth: "none",
      }}
    >
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{ mr: 2, ...(open && { display: "none" }) }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            Trams Roppo Beta
          </Typography>
          {/* <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="条文横断検索"
              inputProps={{ "aria-label": "search" }}
              // onChange={(event) => handleSearchInput(event.target.value)}
              onCompositionStart={() => {
                isImeOn.current = true; // IME 入力中フラグを ON
                console.log("条文横断検索　IME ON!!　で漢字入力開始です");
              }}
              onCompositionUpdate={() => {
                console.log("条文横断検索　IME ON中で入力中…");
              }}
              onCompositionEnd={() => {
                isImeOn.current = false; // IME 入力中フラグを OFF
                handleSearchInput((event?.target as HTMLInputElement).value); //入力が確定したとき
                console.log("条文横断検索　IME END!! 漢字変換が終了しました");
              }}
            />
          </Search> */}

          <Box paddingLeft={5}>
            <FormControl sx={{ minWidth: 180, maxHeight: 50 }}>
              <InputLabel id="demo-simple-select-label">
                <span style={{ color: "white" }}>対象試験</span>
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={professionExam.toString()}
                label="対象試験"
                onChange={handleChange}
                sx={{
                  color: "white",
                  outlineColor: "white",
                  outlineStyle: "solid",
                }}
              >
                <MenuItem value={0}>司法試験</MenuItem>
                <MenuItem value={1}>司法予備試験</MenuItem>
                <MenuItem value={2}>司法書士試験</MenuItem>
                <MenuItem value={3}>弁理士試験</MenuItem>
                <MenuItem value={4}>税理士試験</MenuItem>
                <MenuItem value={5}>社会保険労務士試験</MenuItem>
                <MenuItem value={6}>行政書士試験</MenuItem>
                <MenuItem value={7}>土地家屋調査士試験</MenuItem>
                <MenuItem value={8}>海事代理士試験</MenuItem>
                <MenuItem value={9}>カッコ多重ハイライト技術デモ</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "ltr" ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          {[
            "横断検索(実装予定)",
            "現在:カッコハイライト機能ON",
            "現在:条文ポップアップ機能ON",
          ].map((text, index) => (
            <ListItem key={text} disablePadding value={index}>
              <ListItemButton onClick={handleDrawerClose}>
                {/* <ListItemIcon>{<Lens />}</ListItemIcon> */}
                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Divider />
        <List>
          {["アカウント(実装予定)", "設定(実装予定)", "ヘルプ(実装予定)"].map(
            (text, index) => (
              <ListItem key={text} disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    {index === 0 ? (
                      <Person />
                    ) : index === 1 ? (
                      <SettingsApplications />
                    ) : index === 2 ? (
                      <HelpOutline />
                    ) : (
                      <Warning />
                    )}
                  </ListItemIcon>
                  <ListItemText primary={text} />
                </ListItemButton>
              </ListItem>
            )
          )}
        </List>
      </Drawer>
      <Main open={open}>
        <DrawerHeader />
        <Box sx={{ height: "93%" }}>
          {useMemo(
            () => (
              <LawTabs
                key={professionExam}
                keyword={keyword}
                professionExam={professionExam}
              />
            ),
            [professionExam]
          )}
        </Box>
      </Main>
    </Box>
  );
}
