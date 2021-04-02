export const breakpoints = {
  minDesktopOrLaptop: "1023px",
  minBigScreen: "1921px",
  maxTablet: "1025px",
  maxMobile: "481px",
  maxTabletOrMobile: "1225px",
};

const darkModeConfig = {
  backgroundColor: "#121212",
  textColor: "#FFFFFF",
  headerColor: "#FFFFFF",
  filter: "invert(100)",
};

const lightModeConfig = {
  backgroundColor: "#FFFFFF",
  textColor: "#121212",
  headerColor: "#FFFFFF",
  filter: "",
};

const darkMode = false;
const styles = darkMode ? darkModeConfig : lightModeConfig;

const config = {
  darkMode,
  styles,
};

export default config;
export { styles };
