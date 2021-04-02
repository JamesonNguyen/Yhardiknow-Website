import React, { useEffect, useRef, useState } from "react";
import styled, { keyframes } from "styled-components";
import { Episode } from "types";
import { breakpoints } from "constants/index";
import ReactHowler from "react-howler";
import useRaf from "@rooks/use-raf";

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
  transition: height 0.01s linear;
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

const Spin = keyframes`
  from{
    transform: rotate(0deg);
  }
  to{
    transform: rotate(360deg);
  }
`;

const LoadingIcon = styled.img`
  width: 32px;
  height: 32px;
  animation: ${Spin} 2s linear infinite;
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
  justify-content: right;
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

const ProgressBar = styled.input`
  width: 80%;
  height: 10px;
  margin: 0px 5px 0px 5px;
  border-radius: 5px;
  margin-top: 3px;
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
const fade = keyframes`
  0%{
    opacity: 0;
  }
  50%{
    opacity: 1;
  }
  100%{
    opacity: 0;
  }
`;
const LoadingText = styled.p`
  animation: ${fade} 2s linear infinite;
  font-family: "Roboto Slab";
  margin: 0px;
`;

const formatTimers = (time: number) => {
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60);
  return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
};

const Player: React.FC<AudioProps> = ({ episode }) => {
  const [isHidden, setIsHidden] = useState<boolean>(false);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const player = useRef<ReactHowler>(null);
  const [trackProgress, setTrackProgress] = useState<number>(0);
  const [volume, setVolume] = useState<number>(50);
  const [duration, setDuration] = useState<number>(0);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  const onLoad = () => {
    setIsLoaded(true);
    setTrackProgress(player.current!.seek());
    setDuration(player.current!.duration());
  };

  useEffect(() => {
    setIsPlaying(false);
    setIsLoaded(false);
    setTrackProgress(0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [episode]);

  const onEnd = () => {
    setIsPlaying(false);
  };
  useRaf(() => {
    setTrackProgress(player.current!.seek());
  }, isPlaying && isLoaded);

  return (
    <PlayerContainer className={isHidden ? "hidden" : ""}>
      <ReactHowler
        src={episode.audioUrl}
        ref={player}
        playing={isPlaying}
        html5={true}
        volume={volume / 100}
        onLoad={onLoad}
        onEnd={onEnd}
      />
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
              {isPlaying && !isLoaded ? (
                <LoadingIcon
                  src={`${process.env.PUBLIC_URL}/icons/loading.svg`}
                />
              ) : (
                <PlayerIcon
                  src={`${process.env.PUBLIC_URL}/icons/${
                    isPlaying ? "pause" : "play-button"
                  }.svg`}
                  onClick={() => {
                    setIsPlaying(!isPlaying);
                  }}
                />
              )}
              <Title>{episode.episodeName}</Title>
            </div>
            {<LoadingText>Loading...</LoadingText>}
            <VolumeContainer>
              <VolumeIcon src={`${process.env.PUBLIC_URL}/icons/volume.svg`} />
              <VolumeSlider
                type="range"
                min="0"
                max="100"
                onChange={(e) => {
                  setVolume(Number(e.currentTarget.value));
                }}
              />
            </VolumeContainer>
          </ControlBar>
        )}
        <ProgressDiv>
          <DurationText>{formatTimers(trackProgress)}</DurationText>
          <ProgressBar
            type="range"
            value={trackProgress}
            step="1"
            min="0"
            max={duration}
            onChange={(e) => {
              player.current?.seek(Number(e.currentTarget.value));
            }}
          />
          <DurationText>{formatTimers(duration)}</DurationText>
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
