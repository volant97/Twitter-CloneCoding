import styled from "styled-components";

export const StWrapper = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 420px;
  padding: 50px 0px;
`;

export const StTitle = styled.h1`
  font-size: 42px;
`;

export const StForm = styled.form`
  margin-top: 50px;
  margin-bottom: 10px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;
`;

export const StInput = styled.input`
  padding: 10px 20px;
  border-radius: 50px;
  border: none;
  width: 100%;
  font-size: 16px;
  &[type="submit"] {
    cursor: pointer;
    &:hover {
      opacity: 0.8;
    }
  }
`;

export const StError = styled.span`
  font-weight: 600;
  color: tomato;
`;

export const StSwitcher = styled.span`
  margin-top: 20px;
  a {
    color: #1d9bf0;
  }
`;
