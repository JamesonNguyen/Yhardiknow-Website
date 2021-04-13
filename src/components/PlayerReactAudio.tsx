import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { Episode } from "types";
import { breakpoints } from "constants/index";
import AudioControls from "components/audioplayer/AudioControls";
import ReactPlayer from "react-player";
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
  const [played, setPlayed] = useState<number>(0);
  const [volume, setVolume] = useState<number>(0.5);
  const [duration, setDuration] = useState<number>(0);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [isSeeking, setIsSeeking] = useState<boolean>(false);
  const player = useRef<ReactPlayer>(null);

  const onProgress = (state: any) => {
    setPlayed(state.playedSeconds);
  };

  const handleSeekMouseDown = () => {
    setIsSeeking(true);
  };

  const handleSeekChange = (e: any) => {
    setPlayed(parseFloat(e.target.value));
  };

  const handleSeekMouseUp = (e: any) => {
    setIsSeeking(false);
    player.current!.seekTo(parseFloat(e.target.value));
  };

  useEffect(() => {
    setIsPlaying(false);
    setIsLoaded(false);
    setPlayed(0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [episode]);

  return (
    <PlayerContainer className={isHidden ? "hidden" : ""}>
      <StyledDiv>
        <ReactPlayer
          url={episode.audioUrl}
          height={0}
          volume={volume}
          playing={isPlaying}
          onProgress={onProgress}
          onReady={() => console.log("onReady")}
          onStart={() => console.log("onStart")}
          onError={(e) => console.log("onError", e)}
          onPlay={() => console.log("onPlay")}
          onDuration={(duration) => {
            setDuration(duration);
          }}
          onBuffer={() => {
            setIsLoaded(true);
          }}
          onBufferEnd={() => {
            setIsLoaded(true);
          }}
          ref={player}
          config={{
            file: {
              forceAudio: true,
            },
          }}
          style={{ visibility: "hidden" }}
        />
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
          <DurationText>{formatTimers(played)}</DurationText>
          <ProgressBar
            type="range"
            value={played}
            step="0.1"
            min="0"
            max={duration}
            onMouseDown={handleSeekMouseDown}
            onChange={handleSeekChange}
            onMouseUp={handleSeekMouseUp}
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
