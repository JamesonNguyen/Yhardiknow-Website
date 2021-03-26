import { breakpoints } from "constants/index";
import React from "react";
import styled from "styled-components";
import { Episode } from "types";

const Card = styled.div`
  display: flex;
  width: 100%;
  box-sizing: border-box;
  border: 1px solid #afafaf;
  border-right: none;
  border-left: none;
  gap: 1rem;
  height: 150px;
  @media (min-width: ${breakpoints.maxTablet}) {
    height: 150px;
    border: 1px solid #afafaf;
  }
`;

const StyledEpisodeImage = styled.img`
  height: 100%;
`;

const InfoDiv = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 72%;
`;

const Description = styled.p`
  margin: 0;
  margin-top: 0.25rem;
  font-family: Roboto;
`;

const Date = styled.p`
  margin: 0;
  padding-left: 0.5rem;
  font-family: "Roboto Slab";
`;

const Title = styled.p`
  display: flex;
  flex-direction: column;
  font-family: "Roboto Slab";
  text-align: center;
  font-size: 0.5rem;
  margin: 0;
  padding-right: 10px;
  border-right: 1px #121212 solid;
  @media (min-width: ${breakpoints.maxMobile}) {
    font-size: 1rem;
  }

  @media (min-width: ${breakpoints.maxTablet}) {
    font-size: 1.5rem;
  }
`;

const PlayIcon = styled.img`
  width: 3rem;
`;

const PlayDiv = styled.div`
  height: 100%;
  margin: 0 1rem 0 1rem;
  display: flex;
  justify-content: center;
  cursor: pointer;
`;

const EpisodeCard: React.FC<Episode> = ({
  episodeName,
  description,
  imageUrl,
  audioUrl,
  date,
}) => {
  return (
    <Card>
      <StyledEpisodeImage
        src={`${process.env.PUBLIC_URL}/images/episodes/${imageUrl}`}
      />
      <InfoDiv>
        <div
          style={{ display: "flex", alignItems: "center", marginTop: "1rem" }}
        >
          <Title>{episodeName}</Title>
          <Date> Recorded on {date} </Date>
        </div>
        <Description>{description}</Description>
      </InfoDiv>
      <PlayDiv>
        <PlayIcon
          src={`${process.env.PUBLIC_URL}/icons/play-button.svg`}
          alt="play"
        />
      </PlayDiv>
    </Card>
  );
};

export default EpisodeCard;
