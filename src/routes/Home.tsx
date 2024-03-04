import styled from "styled-components";
import PostTweetForm from "../components/PostTweetForm";
import TimeLine from "../components/TimeLine";

function Home() {
  return (
    <Stwrapper>
      <PostTweetForm />
      <TimeLine />
    </Stwrapper>
  );
}

export default Home;

const Stwrapper = styled.div`
  display: grid;
  gap: 50px;
  overflow-y: scroll;
  grid-template-rows: 1fr 5fr;

  border: 2px solid pink;
`;
