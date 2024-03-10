import styled from "styled-components";

function LoadingScreen() {
  return (
    <StWrapper>
      <StText>Loading...</StText>
    </StWrapper>
  );
}

export default LoadingScreen;

const StWrapper = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StText = styled.span`
  font-size: 24px;
`;
