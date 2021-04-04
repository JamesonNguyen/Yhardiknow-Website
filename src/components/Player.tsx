import React, { useCallback, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { Episode } from "types";
import { breakpoints } from "constants/index";
import ReactHowler from "react-howler";
import useRaf from "@rooks/use-raf";
import AudioControls from "components/audioplayer/AudioControls";
import { debounce } from "lodash";
interface AudioProps {
  episode: Episode;
}

const PlayerContainer = styled.div`
  position: sticky;
  bottom: 0;
  height: 100px;
  width: 100%;
  border-top: 1px solid ${(props) => props.theme.textColor};
  color: ${(props) => props.theme.textColor};
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
  background-color: ${(props) => props.theme.backgroundColor};
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
  filter: ${(props) => props.theme.filter};
`;

const ProgressDiv = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ProgressBar = styled.input`
  width: 80%;
  height: 10px;
  margin: 0px 5px 0px 5px;
  border-radius: 5px;
  margin-top: 3px;
  @media (min-width: ${breakpoints.maxTablet}) {
    width: 88%;
  }
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
  const [isHidden, setIsHidden] = useState<boolean>(false);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const player = useRef<ReactHowler>(null);
  const [trackProgress, setTrackProgress] = useState<number>(0);
  const [volume, setVolume] = useState<number>(50);
  const [duration, setDuration] = useState<number>(0);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [isSeeking, setIsSeeking] = useState<boolean>(false);
  const debounceSeek = useCallback(
    debounce((val: number) => {
      player.current!.seek(val);
      setIsSeeking(false);
      console.log("Debounce");
    }, 1000),
    []
  );

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
  }, isPlaying && isLoaded && !isSeeking);

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
          <AudioControls
            {...{
              setVolume,
              episode,
              isPlaying,
              setIsPlaying,
              isLoaded,
            }}
          />
        )}
        <ProgressDiv>
          <DurationText>{formatTimers(trackProgress)}</DurationText>
          <ProgressBar
            type="range"
            value={trackProgress}
            step="0.1"
            min="0"
            max={duration}
            onChange={(e) => {
              setTrackProgress(Number(e.currentTarget.value));
              setIsSeeking(true);
              debounceSeek(Number(e.currentTarget.value));
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
