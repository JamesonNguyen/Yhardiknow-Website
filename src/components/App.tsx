import React from "react";
import styled from "styled-components";
import config, { breakpoints } from "constants/index";
import Banner from "components/Banner";
const StyledContainer = styled.div`
  color: white;
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

function App() {
  return (
    <StyledBody>
      <StyledContainer>
        <Banner />
      </StyledContainer>
    </StyledBody>
  );
}

export default App;
