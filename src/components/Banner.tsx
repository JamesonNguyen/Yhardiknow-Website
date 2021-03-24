import React from "react";
import styled from "styled-components";

const StyledContainer = styled.div`
  gap: 0;
  width: 100%;
  background-color: white;
  position: relative;
`;

const StyledPortrait = styled.img`
  width: 33.33%;
  object-fit: cover;
`;

const StyledTextDiv = styled.div`
  text-align: justify;
  position: absolute;
  width: 100%;
  height: 100%;
  background: rgba(13, 13, 13, 0.19);
  z-index: 3;
  display: flex;
  justify-content: center;
`;

const StyledHeader = styled.p`
  font-family: "BenchNine", sans-serif;
  font-size: 8rem;
  letter-spacing: 1.4rem;
  padding-left: 1.4rem;
  margin: 0;
  line-height: 110px;
  position: absolute;
  top: 55%;
  text-align: center;
`;

const StyledText = styled.p`
  font-family: "Open Sans", sans-serif;
  font-size: 2.75rem;
  position: absolute;
  top: calc(55% + 100px);
  margin: 0;
`;

const StyledImageContainer = styled.div`
  display: flex;
  width: 100%;
`;

const Banner = () => {
  return (
    <StyledContainer>
      <StyledTextDiv>
        <StyledHeader>YHARDIKNOW</StyledHeader>
        <StyledText>FOR THE HOMIES, BY THE HOMIES</StyledText>
      </StyledTextDiv>
      <StyledImageContainer>
        <StyledPortrait
          src={`${process.env.PUBLIC_URL}/images/jameson_cropped.jpg`}
        />
        <StyledPortrait
          src={`${process.env.PUBLIC_URL}/images/tuna_cropped.jpg`}
        />
        <StyledPortrait
          src={`${process.env.PUBLIC_URL}/images/ridwan_cropped.jpg`}
        />
      </StyledImageContainer>
    </StyledContainer>
  );
};

export default Banner;
