import styled from "styled-components";
import PostTweetForm from "../components/PostTweetForm";

function Home() {
  return (
    <Stwrapper>
      <PostTweetForm />
    </Stwrapper>
  );
}

export default Home;

const Stwrapper = styled.div``;
