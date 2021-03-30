import React, { useEffect, useMemo, useState } from "react";
import styled from "styled-components";
import { Episode } from "types";
import { breakpoints } from "constants/index";

interface AudioProps {
  episode: Episode;
}

const PlayerContainer = styled.div`
  position: sticky;
  bottom: 0;
  height: 100px;
  width: 100%;
  background-color: white;
  border-top: 1px solid #121212;
  display: flex;
  justify-content: center;
  align-items: center;
  &.hidden {
    height: 50px;
  }
  @media (min-width: ${breakpoints.maxMobile}) {
    height: 120px;
    &.hidden {
      height: 60px;
    }
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
  width: max(5%, 50px);
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
  height: 10px;
  margin: 0px 5px 0px 5px;
  border-radius: 5px;
  margin-top: 3px;
  background: linear-gradient(
    to right,
    #121212 0%,
    #121212 ${(state) => state.progress}%,
    grey ${(state) => state.progress}%,
    grey 100%
  );
`;

const DurationText = styled.p`
  display: table-cell;
  vertical-align: middle;
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
  const seconds = Math.floor(time % 60);
  return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
};

const Player: React.FC<AudioProps> = ({ episode }) => {
  const [AudioObject, setAudioObject] = useState<HTMLMediaElement>(
    new Audio(episode.audioUrl)
  );
  const [isHidden, setIsHidden] = useState<boolean>(false);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [endTime, setEndTime] = useState<number>(0);
  const [currentProgress, setCurrentProgress] = useState<number>(0);
  const [canPlay, setCanPlay] = useState<boolean>(false);
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

  useEffect(() => {
    AudioObject.pause();
    setAudioObject(new Audio(episode.audioUrl));
    setCurrentTime(0);
    setCurrentProgress(0);
    setEndTime(0);
    setIsPlaying(false);
  }, [episode]);

  useEffect(() => {
    if (AudioObject.readyState > 3) {
      setCanPlay(true);
    } else {
      setCanPlay(false);
    }
  }, [AudioObject.readyState]);

  return (
    <PlayerContainer className={isHidden ? "hidden" : ""}>
      <StyledDiv>
        {!isHidden && (
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
            {isPlaying && !canPlay && <p>!Loading</p>}
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
        )}
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
