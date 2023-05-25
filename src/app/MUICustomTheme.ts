import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  status: {
    danger: "#ff0000",
  },

  palette: {
    primary: {
      // main: "#5b87f8",
      main: "#000",
      darker: "#0f1975",
    },
  },
});

declare module "@mui/material/styles" {
  interface Theme {
    status: {
      danger: React.CSSProperties["color"];
    };
  }

  interface ThemeOptions {
    status: {
      danger: React.CSSProperties["color"];
    };
  }

  interface PaletteColor {
    darker?: React.CSSProperties["color"];
  }

  interface SimplePaletteColorOptions {
    darker?: React.CSSProperties["color"];
  }
}
