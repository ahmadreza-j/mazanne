import { createMuiTheme } from "@material-ui/core/styles";

export const adminTheme = createMuiTheme({
  direction: "rtl",
  typography: {
    fontFamily: "IranSans",
  },
});

export const clientTheme = createMuiTheme({
  direction: "rtl",
  typography: {
    fontFamily: "IranSans",
  },
  palette: {
    primary: {
      light: `#8eacbb`,
      main: `#607d8b`,
      dark: `#34515e`,
      contrastText: `#ffd740`,
    },
    secondary: {
      ultraLight: `#fff9e6`,
      light: `#ffff74`,
      main: `#ffd740`,
      dark: `#c8a600`,
      contrastText: `#607d8b`,
    },
  },
});

export const providerTheme = createMuiTheme({
  direction: "rtl",
  typography: {
    fontFamily: "IranSans",
  },
  palette: {
    primary: {
      light: `#8eacbb`,
      main: `#607d8b`,
      dark: `#34515e`,
      contrastText: `#ffd740`,
    },
    secondary: {
      ultraLight: `#fff9e6`,
      light: `#ffff74`,
      main: `#ffd740`,
      dark: `#c8a600`,
      contrastText: `#607d8b`,
    },
  },
});
