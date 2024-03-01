import React, { useState } from "react";
import styled from "styled-components";

function PostTweetForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [tweet, setTweet] = useState("");
  const [file, setFile] = useState<File | null>(null);

  const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTweet(e.target.value);
  };

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;

    if (files && files.length === 1) {
      setFile(files[0]);
    }
  };

  return (
    <StForm>
      <StTextArea
        value={tweet}
        onChange={onChange}
        placeholder="What is happening?"
        rows={5}
        maxLength={180}
      />
      <StAttachFileBtn htmlFor="file">
        {file ? "Photo added ✅" : "Add Photo"}
      </StAttachFileBtn>
      <StAttachFileInput
        id="file"
        type="file"
        onChange={onFileChange}
        accept="image/*"
      />
      <StSubmitBtn
        type="submit"
        value={isLoading ? "Posting..." : "Post Tweet"}
      />
    </StForm>
  );
}

export default PostTweetForm;

const StForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const StTextArea = styled.textarea`
  border: 2px solid white;
  padding: 20px;
  border-radius: 20px;
  font-size: 16px;
  color: white;
  background-color: black;
  width: 100%;
  resize: none;
  font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
    Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;

  &::placeholder {
    font-size: 16px;
  }

  &:focus {
    outline: none;
    border-color: #1d9bf0;
  }
`;

const StAttachFileBtn = styled.label`
  cursor: pointer;
  padding: 10px 0;
  color: #1d9bf0;
  text-align: center;
  border-radius: 20px;
  border: 1px solid #1d9bf0;
  font-size: 14px;
  font-weight: 600;
`;

const StAttachFileInput = styled.input`
  display: none;
`;

const StSubmitBtn = styled.input`
  cursor: pointer;
  background-color: #1d9bf0;
  color: white;
  border: none;
  padding: 10px 0;
  border-radius: 20px;
  font-size: 16px;

  &:hover,
  &:active {
    opacity: 0.9;
  }
`;
