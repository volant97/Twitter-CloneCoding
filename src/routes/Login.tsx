import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FirebaseError } from "firebase/app";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import {
  StError,
  StForm,
  StInput,
  StSwitcher,
  StTitle,
  StWrapper,
} from "../style/Login";
import GithubBtn from "../components/GithubBtn";

function Login() {
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { name, value },
    } = e;
    if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    }
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    if (isLoading || email === "" || password === "") return;

    try {
      setIsLoading(true);
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/");
    } catch (e) {
      if (e instanceof FirebaseError) {
        setError(e.message);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <StWrapper>
      <StTitle>Log into 🐬</StTitle>
      <StForm onSubmit={onSubmit}>
        <StInput
          name="email"
          value={email}
          onChange={onChange}
          placeholder="Email"
          type="eamil"
          required
        />
        <StInput
          name="password"
          value={password}
          onChange={onChange}
          placeholder="Password"
          type="password"
          required
        />
        <StInput type="submit" value={isLoading ? "Loading..." : "Log in"} />
      </StForm>
      {error === "" ? null : <StError>{error}</StError>}
      <StSwitcher>
        Don't have an account?{" "}
        <Link to="/create-account">Create one &rarr;</Link>
      </StSwitcher>
      <GithubBtn />
    </StWrapper>
  );
}

export default Login;
