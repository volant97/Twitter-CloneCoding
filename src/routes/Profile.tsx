/* eslint-disable no-extra-boolean-cast */
import React, { useState } from "react";
import styled from "styled-components";
import { auth, storage } from "../firebase";
import UserIcon from "../style/icon/UserIcon";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { updateProfile } from "firebase/auth";

function Profile() {
  const currentUser = auth.currentUser;
  const [avatar, setAvatar] = useState(currentUser?.photoURL);

  const onAvatarChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;

    if (files && files.length === 1 && currentUser) {
      const file = files[0];
      const locationRef = ref(storage, `avatars/${currentUser?.uid}`);
      const result = await uploadBytes(locationRef, file);
      const avatarUrl = await getDownloadURL(result.ref);
      setAvatar(avatarUrl);
      await updateProfile(currentUser, {
        photoURL: avatarUrl,
      });
    }
  };

  return (
    <StWrapper>
      <StAvatarUpload htmlFor="avatar">
        {!!avatar ? <StAvatarImg src={avatar} /> : <UserIcon />}
      </StAvatarUpload>
      <StAvatarInput
        id="avatar"
        type="file"
        accept="image/*"
        onChange={onAvatarChange}
      />
      <StName>{currentUser?.displayName ?? "Anonymous"}</StName>
    </StWrapper>
  );
}

export default Profile;

const StWrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 20px;
`;

const StAvatarUpload = styled.label`
  width: 80px;
  overflow: hidden;
  height: 80px;
  border-radius: 50%;
  background-color: #1d9bf0;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;

  &:hover {
    scale: 115%;
    border: 2px solid white;
    transition: scale 0.2s ease-out;
  }

  svg {
    width: 50px;
  }
`;

const StAvatarImg = styled.img`
  width: 100%;
`;

const StAvatarInput = styled.input`
  display: none;
`;

const StName = styled.span`
  font-size: 22px;
`;
