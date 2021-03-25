import { breakpoints } from "constants/index";
import React from "react";
import styled from "styled-components";
import useBreakpoints from "hooks/useBreakpoints";
const StyledContainer = styled.header`
  gap: 0;
  width: 100%;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  @media (min-width: ${breakpoints.maxTablet}) {
    margin-top: 3rem;
  }
`;

const StyledPortrait = styled.img`
  width: 33.3333%;
  object-fit: cover;
  opacity: 70%;
`;

const StyledTextDiv = styled.section`
  text-align: justify;
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: 3;
  display: flex;
  justify-content: center;
  transition: all 0.5s linear;
  &:hover {
    opacity: 0;
  }
`;

const StyledHeader = styled.p`
  font-family: "BenchNine", sans-serif;
  text-align: center;
  margin: 0;
  font-size: 2rem;
  letter-spacing: 0.8rem;
  padding-left: 0.8rem;

  @media (min-width: ${breakpoints.maxMobile}) {
    font-size: 4rem;
    letter-spacing: 1.4rem;
    padding-left: 1.4rem;
    line-height: 60px;
    position: absolute;
    top: 55%;
  }

  @media (min-width: ${breakpoints.maxTablet}) {
    font-size: 8rem;
    letter-spacing: 1.4rem;
    padding-left: 1.4rem;
    line-height: 110px;
    position: absolute;
    top: 55%;
  }
`;

const StyledText = styled.p`
  font-family: "Open Sans", sans-serif;
  font-size: 0.65rem;
  margin: 0;
  margin-top: 0.2rem;

  @media (min-width: ${breakpoints.maxMobile}) {
    font-size: 1.75rem;
    position: absolute;
    top: calc(55% + 60px);
  }

  @media (min-width: ${breakpoints.maxTablet}) {
    font-size: 2.75rem;
    position: absolute;
    top: calc(55% + 110px);
  }
`;

const StyledImageContainer = styled.div`
  display: flex;
  width: 100%;
  background: rgba(13, 13, 13, 0.8);
`;

const Banner = () => {
  const { isDesktopOrLaptop, isMobile, isTablet } = useBreakpoints();
  return (
    <StyledContainer>
      {(isDesktopOrLaptop || isTablet) && (
        <StyledTextDiv>
          <StyledHeader>YHARDIKNOW</StyledHeader>
          <StyledText>FOR THE HOMIES, BY THE HOMIES</StyledText>
        </StyledTextDiv>
      )}
      {isMobile && <StyledHeader>YHARDIKNOW</StyledHeader>}
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
      {isMobile && <StyledText>FOR THE HOMIES, BY THE HOMIES</StyledText>}
    </StyledContainer>
  );
};

export default Banner;
