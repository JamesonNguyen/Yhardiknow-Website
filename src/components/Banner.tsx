import { breakpoints } from "constants/index";
import React from "react";
import styled from "styled-components";
import useBreakpoints from "hooks/useBreakpoints";

const NameDiv = styled.div`
  position: absolute;
  height: 100%;
  width: 100%;
  top: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: opacity 1s linear;
  opacity: 0;
`;

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

  &:hover ${NameDiv} {
    opacity: 1;
  }
`;
const PortraitContainer = styled.div`
  width: 33.3333%;
  position: relative;
`;

const StyledPortrait = styled.img`
  width: 100%;
  height: 100%;
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
  transition-delay: 0.75s;
  &:hover {
    opacity: 0;
    transition-delay: 0s;
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

const StyledName = styled.p`
  font-family: "Roboto Slab";
  text-align: center;
  font-size: 1rem;
  word-spacing: 300px;
  @media (min-width: ${breakpoints.maxMobile}) {
    font-size: 1.75rem;
  }

  @media (min-width: ${breakpoints.maxTablet}) {
    font-size: 3rem;
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
        <PortraitContainer>
          <StyledPortrait
            src={`${process.env.PUBLIC_URL}/images/jameson_cropped.jpg`}
          />
          <NameDiv>
            <StyledName>Jameson "Goggles" Nguyen</StyledName>
          </NameDiv>
        </PortraitContainer>
        <PortraitContainer>
          <StyledPortrait
            src={`${process.env.PUBLIC_URL}/images/tuna_cropped.jpg`}
          />
          <NameDiv>
            <StyledName>Tunahan "Toonz" Sakar</StyledName>
          </NameDiv>
        </PortraitContainer>
        <PortraitContainer>
          <StyledPortrait
            src={`${process.env.PUBLIC_URL}/images/ridwan_cropped.jpg`}
          />
          <NameDiv>
            <StyledName>Ridwan "R1" Howlader</StyledName>
          </NameDiv>
        </PortraitContainer>
      </StyledImageContainer>
      {isMobile && <StyledText>FOR THE HOMIES, BY THE HOMIES</StyledText>}
    </StyledContainer>
  );
};

export default Banner;
