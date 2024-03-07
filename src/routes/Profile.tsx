import React, { useState } from "react";
import styled from "styled-components";
import { auth } from "../firebase";

function Profile() {
  const currentUser = auth.currentUser;
  const [avatar, setAvatar] = useState(currentUser?.photoURL);

  return (
    <StWrapper>
      <StAvatarUpload>
        {Boolean(avatar) ? <StAvatarImg src="avatar" /> : null}
      </StAvatarUpload>
      <StAvatarInput type="file" accept="image/*" />
      <StName>{currentUser?.displayName ?? "Anonymous"}</StName>
    </StWrapper>
  );
}

export default Profile;

const StWrapper = styled.div``;

const StAvatarUpload = styled.label``;

const StAvatarImg = styled.img``;

const StAvatarInput = styled.input`
  display: none;
`;

const StName = styled.span``;
