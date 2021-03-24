import React from "react";
import styled from "styled-components";
import config, { breakpoints } from "constants/index";
import Banner from "components/Banner";
const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  color: white;
  min-height: 100vh;
  @media (min-width: ${breakpoints.maxMobile}) {
    background-color: ${config.backgroundColor[1]};
    padding: 5%;
  }
`;

function App() {
  return (
    <StyledContainer>
      <Banner />
    </StyledContainer>
  );
}

export default App;
