import React from "react";
import { ITweet } from "./TimeLine";
import styled from "styled-components";

function Tweet({ username, photo, tweet }: ITweet) {
  return (
    <Stwrapper>
      <StColumn>
        <Stusername>{username}</Stusername>
        <StPayload>{tweet}</StPayload>
      </StColumn>
      {photo ? (
        <StColumn>
          <StPhoto src={photo} />
        </StColumn>
      ) : null}
    </Stwrapper>
  );
}

export default Tweet;

const Stwrapper = styled.div`
  display: grid;
  grid-template-columns: 3fr 1fr;
  padding: 20px;
  border: 1px soild rgba(255, 255, 255, 0.5);
  border-radius: 15px;
`;

const StColumn = styled.div``;

const Stusername = styled.span`
  font-weight: 600;
  font-size: 15px;
`;

const StPayload = styled.p`
  margin: 10px 0;
  font-size: 18px;
`;

const StPhoto = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 15px;
`;
