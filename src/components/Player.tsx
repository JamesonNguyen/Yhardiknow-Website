import React, { useRef, useState } from "react";
import styled from "styled-components";
import ReactAudioPlayer from "react-audio-player";
import { Episode } from "types";
import { breakpoints } from "constants/index";

interface AudioProps {
  episode: Episode;
}

const PlayerContainer = styled.div`
  position: sticky;
  bottom: 0;
  height: 150px;
  width: 100vw;
  background-color: white;
  border-top: 1px solid #121212;
  display: flex;
  justify-content: center;
`;

const StyledDiv = styled.div`
  max-width: 1024px;
  width: 100%;
  height: 100%;
  background-color: white;
`;

const ExpandButton = styled.img`
  margin: 0.5rem;
  width: 10px;
  height: 10px;
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
  width: 50%;
`;

const Player: React.FC<AudioProps> = ({ episode }) => {
  const [volume, setVolume] = useState<number>(1);
  const AudioObject = new Audio();
  const [isHidden, setIsHidden] = useState<boolean>(true);
  return (
    <PlayerContainer>
      <StyledDiv>
        <p>{episode.episodeName}</p>
        <ChevronDiv
          onClick={() => {
            setIsHidden(!isHidden);
          }}
        >
          <ExpandButton
            src={`${process.env.PUBLIC_URL}/icons/${
              !isHidden ? "down-chevron" : "up-chevron"
            }.svg`}
          />
        </ChevronDiv>
      </StyledDiv>
    </PlayerContainer>
  );
};

export default Player;
