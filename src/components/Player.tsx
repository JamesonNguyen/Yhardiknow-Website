import React from "react";
import styled from "styled-components";

const PlayerContainer = styled.div`
  position: fixed;
  bottom: 0;
  height: 150px;
  width: 100vw;
  background-color: black;
`;

const Player = () => {
  return <PlayerContainer></PlayerContainer>;
};

export default Player;
