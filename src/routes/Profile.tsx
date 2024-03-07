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

  useEffect(() => {
    fetchTweets();
  }, []);

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

const StTweets = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;
`;
