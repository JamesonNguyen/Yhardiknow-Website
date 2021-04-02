import React, { useState } from "react";
import styled from "styled-components";
import { styles, breakpoints } from "constants/index";
import Banner from "components/Banner";
import EpisodeCard from "components/EpisodeCard";
import data from "constants/sampleData";
import Player from "components/Player";
import { Episode } from "types";

const StyledContainer = styled.div`
  color: ${styles.textColor};
  width: 100%;
  @media (min-width: ${breakpoints.maxMobile}) {
    background-color: ${styles.backgroundColor};
    max-width: 1024px;
  }
`;

const StyledBody = styled.div`
  width: 100%;
  min-height: 100vh;
  display: flex;
  align-items: center;
  flex-direction: column;
  background-color: ${styles.backgroundColor};
  @media (min-width: ${breakpoints.maxMobile}) {
    background-color: ${styles.backgroundColor};
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
  return (
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
      </StyledContainer>
      {selectedEp && <Player episode={selectedEp} />}
    </StyledBody>
  );
}
//<Player />
export default App;
