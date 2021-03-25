import { breakpoints } from "constants/index";
import React from "react";
import styled from "styled-components";

interface EpisodeProps {
  episodeName: string;
  audioUrl: string;
  description: string;
  imageUrl: string;
}

const Card = styled.div`
  display: flex;
  width: 100%;
  border: 1px solid #afafaf;
  filter: drop-shadow(0px 3px 4px rgba(0, 0, 0, 0.25));

  @media (min-width: ${breakpoints.maxTablet}) {
    height: 150px;
  }
`;

const StyledEpisodeImage = styled.img`
  height: 100%;
  margin: 2px;
`;

const EpisodeCard: React.FC<EpisodeProps> = ({
  episodeName,
  description,
  imageUrl,
  audioUrl,
}) => {
  return (
    <Card>
      <StyledEpisodeImage
        src={`${process.env.PUBLIC_URL}/images/episodes/${imageUrl}`}
      />
    </Card>
  );
};

export default EpisodeCard;
