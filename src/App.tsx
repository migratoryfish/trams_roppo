import { createTheme, ThemeProvider } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import { createContext, useState } from "react";
import MainArea from "./components/MainArea";
import {
  BracketHighLightContext,
  PopUpArticleContext,
} from "./libs/SettingContext";

function App() {
  const [isBracketHighLight, setIsBracketHighLight] = useState<boolean>(true);
  const [isPopUpArticle, setIsPopUpArticle] = useState<boolean>(true);
  const theme = createTheme({
    palette: {
      mode: "light",
    },
    typography: {
      fontSize: 12,
      fontWeightLight: 300,
      fontWeightRegular: 400,
      fontWeightMedium: 700,

      h1: { fontSize: 60 },
      h2: { fontSize: 48 },
      h3: { fontSize: 42 },
      h4: { fontSize: 30 },
      h5: { fontSize: 16 },
      h6: { fontSize: 14 },
      subtitle1: { fontSize: 18 },
      body1: { fontSize: 12 },
      button: { textTransform: "none" },
    },
  });

  return (
    <BracketHighLightContext.Provider
      value={{ isBracketHighLight, setIsBracketHighLight }}
    >
      <PopUpArticleContext.Provider
        value={{ isPopUpArticle, setIsPopUpArticle }}
      >
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <MainArea />
        </ThemeProvider>
      </PopUpArticleContext.Provider>
    </BracketHighLightContext.Provider>
  );
}

export default App;
