import React, { useMemo, useState } from "react";
import styled from "styled-components";
import { Episode } from "types";
import { breakpoints } from "constants/index";

interface AudioProps {
  episode: Episode;
}

const PlayerContainer = styled.div`
  position: sticky;
  bottom: 0;
  height: 80px;
  width: 100%;
  background-color: white;
  border-top: 1px solid #121212;
  display: flex;
  justify-content: center;
  align-items: center;
  @media (min-width: ${breakpoints.maxMobile}) {
    height: 120px;
  }
`;

const StyledDiv = styled.div`
  max-width: 1024px;
  width: 100%;
  height: 100%;
  background-color: white;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
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

const Title = styled.p`
  font-family: "Roboto Slab";
  margin: 0px;
  font-size: 0.6rem;
  @media (min-width: ${breakpoints.maxMobile}) {
    font-size: 1rem;
  }
  @media (min-width: ${breakpoints.maxTablet}) {
    font-size: 1.5rem;
  }
`;
const ProgressDiv = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ControlBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

const PlayerIcon = styled.img`
  width: 32px;
  height: 32px;
  @media (min-width: ${breakpoints.maxMobile}) {
    width: 48px;
    height: 48px;
  }
  @media (min-width: ${breakpoints.maxTablet}) {
    width: 56px;
    height: 56px;
  }
`;

const VolumeContainer = styled.div`
  display: flex;
  justify-content: end;
  align-items: center;
  gap: 0.5rem;
  max-width: 50%;
  margin-right: 0.5rem;
`;

const VolumeIcon = styled.img`
  width: 16px;
  height: 16px;
  @media (min-width: ${breakpoints.maxMobile}) {
    width: 24px;
    height: 24px;
  }
  @media (min-width: ${breakpoints.maxTablet}) {
    width: 32px;
    height: 32px;
  }
`;

const VolumeSlider = styled.input`
  width: 50%;
`;

const ProgressBar = styled.div<{ progress: number }>`
  width: 80%;
  height: 50px;
  background: linear-gradient(
    to right,
    #121212 0%,
    #121212 ${(state) => state.progress}%,
    white ${(state) => state.progress}%,
    white 100%
  );
`;

const DurationText = styled.p`
  font-size: 0.5rem;
  margin: 0;
  @media (min-width: ${breakpoints.maxMobile}) {
    font-size: 1rem;
  }
  @media (min-width: ${breakpoints.maxTablet}) {
    font-size: 1.5rem;
  }
`;

const formatTimers = (time: number) => {
  const minutes = Math.floor(time / 60);
  const seconds = time % 60;
  return `${minutes}:${seconds}`;
};

const Player: React.FC<AudioProps> = ({ episode }) => {
  const AudioObject = useMemo(() => new Audio(episode.audioUrl), [episode]);
  const [isHidden, setIsHidden] = useState<boolean>(true);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [endTime, setEndTime] = useState<number>(0);
  const [currentProgress, setCurrentProgress] = useState<number>(0);
  const Play = () => {
    setIsPlaying(!isPlaying);
    if (isPlaying) {
      AudioObject.pause();
    } else {
      AudioObject.play();
    }
  };
  AudioObject.addEventListener("timeupdate", () => {
    setCurrentTime(AudioObject.currentTime);
    setEndTime(AudioObject.duration);
    setCurrentProgress((AudioObject.currentTime / AudioObject.duration) * 100);
  });
  return (
    <PlayerContainer>
      <StyledDiv>
        <ControlBar>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
              marginLeft: "0.5rem",
            }}
          >
            <PlayerIcon
              src={`${process.env.PUBLIC_URL}/icons/${
                isPlaying ? "pause" : "play-button"
              }.svg`}
              onClick={Play}
            />
            <Title>{episode.episodeName}</Title>
          </div>
          <VolumeContainer>
            <VolumeIcon src={`${process.env.PUBLIC_URL}/icons/volume.svg`} />
            <VolumeSlider
              type="range"
              min="0"
              max="100"
              onChange={(e) => {
                AudioObject.volume = Number(e.currentTarget.value) / 100;
              }}
            />
          </VolumeContainer>
        </ControlBar>
        <ProgressDiv>
          <DurationText>{formatTimers(currentTime)}</DurationText>
          <ProgressBar progress={currentProgress} />
          <DurationText>{formatTimers(endTime)}</DurationText>
        </ProgressDiv>
      </StyledDiv>
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
    </PlayerContainer>
  );
};

export default Player;
