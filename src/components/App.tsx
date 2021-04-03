import React, { useState } from "react";
import styled, { ThemeProvider } from "styled-components";
import { darkModeConfig, breakpoints, lightModeConfig } from "constants/index";
import Banner from "components/Banner";
import EpisodeCard from "components/EpisodeCard";
import data from "constants/sampleData";
import Player from "components/Player";
import { Episode } from "types";
import Switch from "react-switch";

const StyledContainer = styled.div`
  color: ${(props) => props.theme.textColor};
  width: 100%;
  @media (min-width: ${breakpoints.maxMobile}) {
    background-color: ${(props) => props.theme.backgroundColor};
    max-width: 1024px;
  }
`;

const StyledLabel = styled.label`
  margin-top: 2rem;
  display: flex;
  gap: 0.5rem;
  align-items: center;
  font-family: roboto slab;
`;

const StyledBody = styled.div`
  width: 100%;
  min-height: 100vh;
  display: flex;
  align-items: center;
  flex-direction: column;
  background-color: ${(props) => props.theme.textColor};
  @media (min-width: ${breakpoints.maxMobile}) {
    background-color: ${(props) => props.theme.backgroundColor};
  }
`;

const Cards = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 0.75rem;
  @media (min-width: ${breakpoints.maxMobile}) {
    gap: 0.5rem;
  }
`;

function App() {
  const [selectedEp, setSelectedEp] = useState<Episode>();
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);
  return (
    <ThemeProvider theme={isDarkMode ? darkModeConfig : lightModeConfig}>
      <StyledBody>
        <StyledContainer>
          <Banner />
          <Cards>
            {data.map((info) => (
              <EpisodeCard
                {...{ ...info, setSelectedEp }}
                key={info.episodeName}
              />
            ))}
          </Cards>
          <StyledLabel>
            <span>Dark Mode</span>
            <Switch
              checked={isDarkMode}
              onChange={() => {
                setIsDarkMode(!isDarkMode);
              }}
            />
          </StyledLabel>
        </StyledContainer>
        {selectedEp && <Player episode={selectedEp} />}
      </StyledBody>
    </ThemeProvider>
  );
}
//<Player />
export default App;
