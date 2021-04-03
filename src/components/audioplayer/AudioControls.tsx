import { breakpoints } from "constants/index";
import React from "react";
import styled, { keyframes } from "styled-components";
import { Episode } from "types";
interface AudioControlProps {
  episode: Episode;
  isPlaying: boolean;
  setIsPlaying: (value: boolean) => void;
  setVolume: (value: number) => void;
  isLoaded: boolean;
}

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

const ControlBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

const PlayerIcon = styled.img`
  width: 32px;
  height: 32px;
  filter: ${(props) => props.theme.filter};
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
  filter: ${(props) => props.theme.filter};
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
  filter: ${(props) => props.theme.filter};
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

const AudioControls: React.FC<AudioControlProps> = ({
  episode,
  isPlaying,
  setIsPlaying,
  setVolume,
  isLoaded,
}) => {
  return (
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
          <LoadingIcon src={`${process.env.PUBLIC_URL}/icons/loading.svg`} />
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
  );
};

export default AudioControls;
