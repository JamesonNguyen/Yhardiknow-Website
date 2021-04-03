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
  background-color: #5e8979;
  cursor: pointer;
  @media (min-width: ${breakpoints.maxMobile}) {
    width: 150px;
    height: 100%;
  }
`;

const PlayIcon = styled.img`
  width: 64px;
  height: 64px;
  filter: ${(props) => props.theme.filter};
  @media (min-width: ${breakpoints.maxTablet}) {
    opacity: 0;
    transition: opacity 0.25s linear;
  }
`;

const StyledEpisodeImage = styled.img`
  height: 96px;
  width: 96px;
  transition: opacity 0.25s linear;
  opacity: 0.15;
  @media (min-width: ${breakpoints.maxMobile}) {
    height: 146px;
    width: 146px;
  }
  @media (min-width: ${breakpoints.maxTablet}) {
    opacity: 1;
  }
`;

const Card = styled.div`
  position: relative;
  display: flex;
  width: 100%;
  box-sizing: border-box;
  border: 1px solid #afafaf;
  height: auto;
  max-height: 100px;
  background-color: ${(props) => props.theme.backgroundColor};
  @media (min-width: ${breakpoints.maxMobile}) {
    max-height: 150px;
  }
  @media (min-width: ${breakpoints.maxTablet}) {
    &:hover ${StyledEpisodeImage} {
      opacity: 0.1;
    }
    &:hover ${PlayIcon} {
      opacity: 1;
    }
    &:hover ${CoverDiv} {
      background-color: #5e8979;
    }
  }

  &.over {
    max-height: 300%;
    height: auto;
    overflow: visible;
  }
`;

const PlayDiv = styled.div`
  height: 100%;
  width: 100%;
  position: absolute;
  top: 0;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
`;

/* Right side of card */
const InfoDiv = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 6px 6px 6px 6px;
  max-height: 100%;
  overflow: hidden;
  background-color: ${(props) => props.theme.backgroundColor};
  @media (min-width: ${breakpoints.maxMobile}) {
    padding: 10px 10px 10px 10px;
  }
`;

const Description = styled.p`
  margin: 0;
  margin-top: 0.15rem;
  font-family: Roboto;
  font-size: 0.75rem;
  height: auto;
  overflow: hidden;
  text-overflow: ellipsis;
  @media (min-width: ${breakpoints.maxMobile}) {
    margin-top: 0.25rem;
    font-size: 0.75rem;
  }

  @media (min-width: ${breakpoints.maxTablet}) {
    margin-top: 0.35rem;
    font-size: 1rem;
  }
`;

const Date = styled.p`
  margin: 0;
  font-family: "Roboto Slab";
  font-size: 0.4rem;
  @media (min-width: ${breakpoints.maxMobile}) {
    font-size: 0.65rem;
  }

  @media (min-width: ${breakpoints.maxTablet}) {
    font-size: 0.75rem;
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

const ExpandButton = styled.img`
  margin: 0.5rem;
  width: 10px;
  height: 10px;
  filter: ${(props) => props.theme.filter};
  @media (min-width: ${breakpoints.maxMobile}) {
    margin: 1rem;
    width: 16px;
    height: 16px;
  }
  @media (min-width: ${breakpoints.maxTablet}) {
    margin: 1rem;
    width: 24px;
    height: 24px;
  }
`;

const ChevronDiv = styled.div`
  cursor: pointer;
  position: absolute;
  top: 0;
  right: 0;
  display: flex;
  justify-content: end;
  width: 200px;
`;

interface EpisodeCardProps extends Episode {
  setSelectedEp: (ep: Episode) => void;
}

const EpisodeCard: React.FC<EpisodeCardProps> = ({
  episodeName,
  description,
  imageUrl,
  audioUrl,
  date,
  setSelectedEp,
}) => {
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  return (
    <Card className={isExpanded ? "over" : ""}>
      <CoverDiv
        onClick={() => {
          setSelectedEp({ episodeName, description, imageUrl, audioUrl, date });
        }}
      >
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

      <InfoDiv>
        <Title>{episodeName}</Title>
        <Date>{date}</Date>
        <Description>{description}</Description>
      </InfoDiv>
      <ChevronDiv
        onClick={() => {
          setIsExpanded(!isExpanded);
        }}
      >
        <ExpandButton
          src={`${process.env.PUBLIC_URL}/icons/${
            !isExpanded ? "down-chevron" : "up-chevron"
          }.svg`}
        />
      </ChevronDiv>
    </Card>
  );
};

export default EpisodeCard;
