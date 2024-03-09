/* eslint-disable no-extra-boolean-cast */
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { auth, db, storage } from "../firebase";
import UserIcon from "../style/icon/UserIcon";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { updateProfile } from "firebase/auth";
import {
  collection,
  getDocs,
  limit,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { ITweet } from "../components/TimeLine";
import Tweet from "../components/Tweet";

function Profile() {
  const currentUser = auth.currentUser;
  const [avatar, setAvatar] = useState(currentUser?.photoURL);
  const [tweets, setTweets] = useState<ITweet[]>([]);
  const [name, setName] = useState("");
  const [isNameChange, setIsNameChange] = useState(false);

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

  const fetchTweets = async () => {
    const tweetQuery = query(
      collection(db, "tweets"),
      where("userId", "==", currentUser?.uid),
      orderBy("createdAt", "desc"),
      limit(25)
    );
    const snapshot = await getDocs(tweetQuery);
    const tweets = snapshot.docs.map((doc) => {
      const { createdAt, photo, tweet, userId, username } = doc.data();
      return {
        id: doc.id,
        createdAt,
        photo,
        tweet,
        userId,
        username,
      };
    });
    setTweets(tweets);
  };

  const handleNameClick = () => {
    setIsNameChange(true);
  };

  const hanfleNameChangeForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!currentUser) return;
    if (!name) {
      alert("변경하실 이름을 작성해주세요");
      return setIsNameChange(false);
    }

    try {
      await updateProfile(currentUser, { displayName: name });
      alert("이름이 변경되었습니다.");
    } catch (error) {
      console.error(error);
    } finally {
      setName("");
      setIsNameChange(false);
    }
  };

  const handleNameChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const handleNameChangeCancelBtn = () => {
    setName("");
    setIsNameChange(false);
  };

  useEffect(() => {
    fetchTweets();
  }, []);

  return (
    <StWrapper>
      <StUserInfoWrapper>
        <StAvatarUpload htmlFor="avatar">
          {!!avatar ? <StAvatarImg src={avatar} /> : <UserIcon />}
        </StAvatarUpload>
        <StAvatarInput
          id="avatar"
          type="file"
          accept="image/*"
          onChange={onAvatarChange}
        />
        {isNameChange ? (
          <StNameChangeForm onSubmit={hanfleNameChangeForm}>
            <StNameChangeInput
              type="text"
              placeholder={currentUser?.displayName ?? ""}
              value={name}
              onChange={handleNameChangeInput}
            />
            <StNameChangeBtn type="submit">확인</StNameChangeBtn>
            <StNameChangeBtn
              className="cancel"
              type="button"
              onClick={handleNameChangeCancelBtn}
            >
              취소
            </StNameChangeBtn>
          </StNameChangeForm>
        ) : (
          <StNameBtn onClick={handleNameClick}>
            {currentUser?.displayName ?? "Anonymous"}
          </StNameBtn>
        )}
      </StUserInfoWrapper>
      <StTweets>
        {tweets.map((tweet) => (
          <Tweet key={tweet.id} {...tweet} />
        ))}
      </StTweets>
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

const StUserInfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;
  gap: 20px;
  height: 150px;
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

const StNameBtn = styled.button`
  font-size: 22px;
  color: white;
  background: none;
  border: none;
  cursor: pointer;

  &:hover {
    scale: 115%;
    border-bottom: 2px solid white;
    transition: scale 0.2s ease-out;
  }
`;

const StNameChangeForm = styled.form`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 270px;
`;

const StNameChangeInput = styled.input`
  width: 150px;
  padding-bottom: 5px;
  font-size: 22px;
  color: white;
  background: none;
  border: none;
  outline: none;
  text-align: center;
  border-bottom: 2px solid white;
`;

const StNameChangeBtn = styled.button`
  position: absolute;
  right: 0;
  width: 50px;
  height: 100%;
  font-size: 16px;
  color: white;
  background: none;
  border: none;
  cursor: pointer;

  border: 2px solid #1d9bf0;
  border-radius: 10px;

  &.cancel {
    right: -60px;
    border: 2px solid #f0591d;
  }
`;

const StTweets = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;
`;
