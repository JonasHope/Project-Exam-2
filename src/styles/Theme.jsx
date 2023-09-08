import { ThemeProvider } from "styled-components";

const theme = {
  color: {
    c1: "rgb(255,204,165);",
    c2: "rgb(239,243,246);",
    c3: "rgb(53,44,77);",
    c4: "rgb(83,89,90);",
    c5: "rgb(254,254,254);",
    c6: "rgb(100,68,171);",
    c7: "rgb(255, 126, 95)",
  },
  media: {
    mobile: `@media (max-width: 768px)`,
    tablet: `@media (max-width: 992px)`,
    desktop: `@media (max-width: 1220px)`,
    desktopxl: `@media (min-width: 1221px)`,
  },
};

export const Theme = ({ children }) => (
  <ThemeProvider theme={theme}>{children}</ThemeProvider>
);

export default Theme;
