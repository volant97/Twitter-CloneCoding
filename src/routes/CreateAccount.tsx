import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import React, { useState } from "react";
import { auth } from "../firebase";
import { Link, useNavigate } from "react-router-dom";
import { FirebaseError } from "firebase/app";
import {
  StError,
  StForm,
  StInput,
  StSwitcher,
  StTitle,
  StWrapper,
} from "../style/Login";

// const errors = {
//   "auth/email-already-in-use": "이미 존재하는 이메일입니다.",
//   "auth/weak-password": "비밀번호는 최소 6글자 이상이여야 합니다.",
// };

function CreateAccount() {
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { name, value },
    } = e;
    if (name === "name") {
      setName(value);
    } else if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    }
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    if (isLoading || name === "" || email === "" || password === "") return;

    try {
      setIsLoading(true);
      const credentials = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      await updateProfile(credentials.user, { displayName: name });
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
      <StTitle>Join 🐬</StTitle>
      <StForm onSubmit={onSubmit}>
        <StInput
          name="name"
          value={name}
          onChange={onChange}
          placeholder="Name"
          type="text"
          required
        />
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
        <StInput
          type="submit"
          value={isLoading ? "Loading..." : "Create Account"}
        />
      </StForm>
      {error === "" ? null : <StError>{error}</StError>}
      <StSwitcher>
        Already have an account? <Link to="/login">Log in &rarr;</Link>
      </StSwitcher>
    </StWrapper>
  );
}

export default CreateAccount;
