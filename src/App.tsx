import { createTheme, ThemeProvider } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import MainArea from "./components/MainArea";

function App() {
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
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <MainArea />
    </ThemeProvider>
  );
}

export default App;
