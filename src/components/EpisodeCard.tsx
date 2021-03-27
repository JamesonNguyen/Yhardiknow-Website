import { breakpoints } from "constants/index";
import React, { useState } from "react";
import styled from "styled-components";
import { Episode } from "types";

/* Play button */

const CoverDiv = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100px;
  height: 100%;
  @media (min-width: ${breakpoints.maxMobile}) {
    width: 150px;
    height: 100%;
  }
`;

const PlayIcon = styled.img`
  width: 18px;
  height: 18px;
  position: absolute;
  top: 5px;
  right: 5px;
  @media (min-width: ${breakpoints.maxMobile}) {
    width: 20px;
    height: 20px;
    top: 8px;
    right: 8px;
  }
  @media (min-width: ${breakpoints.maxTablet}) {
    width: 64px;
    height: 64px;
    opacity: 0;
    position: static;
    transition: opacity 0.25s linear;
  }
`;

const StyledEpisodeImage = styled.img`
  height: 96px;
  width: 96px;
  transition: opacity 0.25s linear;
  @media (min-width: ${breakpoints.maxMobile}) {
    height: 146px;
    width: 146px;
  }
`;

const Card = styled.div`
  display: flex;
  width: 100%;
  box-sizing: border-box;
  border: 1px solid #afafaf;
  border-right: none;
  border-left: none;
  height: 100px;
  cursor: pointer;
  @media (min-width: ${breakpoints.maxMobile}) {
    height: 150px;
    border: 1px solid #afafaf;
  }
  @media (min-width: ${breakpoints.maxTablet}) {
    &:hover ${StyledEpisodeImage} {
      opacity: 0.1;
    }
    &:hover ${PlayIcon} {
      opacity: 1;
    }
    &:hover ${CoverDiv} {
      background-color: #12121244;
    }
  }
`;

const PlayDiv = styled.div`
  height: 100%;
  width: 100%;
  position: absolute;
  top: 0;
  @media (min-width: ${breakpoints.maxTablet}) {
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
  }
`;

/* Right side of card */
const InfoDiv = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 0 6px 6px 6px;
  max-height: 100%;
  overflow: hidden;
  background-color: white;
  &.over {
    max-height: 300%;
    height: auto;
    overflow: visible;
  }

  @media (min-width: ${breakpoints.maxMobile}) {
    padding: 0 10px 10px 10px;
  }
`;

const Description = styled.p`
  text-overflow: ellipsis;
  margin: 0;
  margin-top: 0.25rem;
  font-family: Roboto;
  font-size: 0.5rem;
  @media (min-width: ${breakpoints.maxMobile}) {
    font-size: 1rem;
  }

  @media (min-width: ${breakpoints.maxTablet}) {
    font-size: 1rem;
  }
`;

const HeaderDiv = styled.div`
  display: flex;
  align-items: baseline;
  margin-top: 0.5rem;
  @media (min-width: ${breakpoints.maxMobile}) {
    margin-top: 1rem;
  }
`;

const Date = styled.p`
  margin: 0;
  padding-left: 0.5rem;
  font-family: "Roboto Slab";
  font-size: 0.5rem;
  @media (min-width: ${breakpoints.maxMobile}) {
    font-size: 0.75rem;
  }

  @media (min-width: ${breakpoints.maxTablet}) {
    font-size: 1rem;
  }
`;

const Title = styled.p`
  display: flex;
  flex-direction: column;
  font-family: "Roboto Slab";
  margin: 0;
  font-size: 0.6rem;
  @media (min-width: ${breakpoints.maxMobile}) {
    font-size: 1rem;
  }
  @media (min-width: ${breakpoints.maxTablet}) {
    font-size: 1.5rem;
  }
`;

const EpisodeCard: React.FC<Episode> = ({
  episodeName,
  description,
  imageUrl,
  audioUrl,
  date,
}) => {
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  return (
    <Card
      onClick={() => {
        setIsExpanded(!isExpanded);
      }}
    >
      <CoverDiv>
        <StyledEpisodeImage
          src={`${process.env.PUBLIC_URL}/images/episodes/${imageUrl}`}
        />
        <PlayDiv>
          <PlayIcon
            src={`${process.env.PUBLIC_URL}/icons/play-button.svg`}
            alt="play"
          />
        </PlayDiv>
      </CoverDiv>

      <InfoDiv className={isExpanded ? "over" : ""}>
        <HeaderDiv>
          <Title>{episodeName}</Title>
          <Date>{date}</Date>
        </HeaderDiv>
        <Description>{description}</Description>
      </InfoDiv>
    </Card>
  );
};

export default EpisodeCard;
