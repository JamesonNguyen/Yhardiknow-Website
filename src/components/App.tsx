import React from "react";
import styled from "styled-components";
import config, { breakpoints } from "constants/index";
import Banner from "components/Banner";
import EpisodeCard from "components/EpisodeCard";
import data from "constants/sampleData";
import Player from "components/Player";

const StyledContainer = styled.div`
  color: #121212;
  width: 100%;
  @media (min-width: ${breakpoints.maxMobile}) {
    background-color: ${config.backgroundColor[0]};
    max-width: 1024px;
  }
`;

const StyledBody = styled.div`
  width: 100%;
  min-height: 100vh;
  display: flex;
  align-items: center;
  flex-direction: column;
  background-color: ${config.backgroundColor[0]};
  @media (min-width: ${breakpoints.maxMobile}) {
    background-color: ${config.backgroundColor[0]};
  }
`;

const Cards = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 2.5rem;
`;

function App() {
  return (
    <StyledBody>
      <StyledContainer>
        <Banner />
        <Cards>
          {data.map((info) => (
            <EpisodeCard {...info} />
          ))}
        </Cards>
      </StyledContainer>
    </StyledBody>
  );
}
//<Player />
export default App;
