import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  status: {
    error: "#fff",
  },

  palette: {
    primary: {
      main: "#5b87f8",
      darker: "#0f1975",
    },
  },
});

declare module "@mui/material/styles" {
  interface Theme {
    status: {
      error: React.CSSProperties["color"];
    };
  }

  interface ThemeOptions {
    status: {
      error: React.CSSProperties["color"];
    };
  }

  interface PaletteColor {
    darker?: React.CSSProperties["color"];
  }

  interface SimplePaletteColorOptions {
    darker?: React.CSSProperties["color"];
  }
}
