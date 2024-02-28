import {
  GithubAuthProvider,
  signInWithPopup,
  // signInWithRedirect,
} from "firebase/auth";
import styled from "styled-components";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";

function GithubBtn() {
  const navigate = useNavigate();

  const onClick = async () => {
    try {
      const provider = new GithubAuthProvider();
      await signInWithPopup(auth, provider); //팝업
      // await signInWithRedirect(auth, provider); //리다이렉트
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <StButton onClick={onClick}>
      <StLogo src="/github-logo.svg" />
      Continue with Github
    </StButton>
  );
}

export default GithubBtn;

const StButton = styled.span`
  margin-top: 50px;
  background-color: white;
  color: black;
  font-weight: 600;
  width: 100%;
  padding: 10px 20px;
  border-radius: 50px;
  border: 0;
  display: flex;
  gap: 5px;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;

const StLogo = styled.img`
  height: 25px;
`;
