import {
  collection,
  getDocs,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { db } from "../firebase";
import Tweet from "./Tweet";

export interface ITweet {
  id: string;
  createdAt: number;
  photo?: string;
  tweet: string;
  userId: string;
  username: string;
}

function TimeLine() {
  const [tweets, setTweets] = useState<ITweet[]>([]);

  const fetchTweets = async () => {
    const tweetsQuery = query(
      collection(db, "tweets"),
      orderBy("createdAt", "desc")
    );

    // Query
    /*  const snapshot = await getDocs(tweetsQuery);
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
    }); */

    // Realtime
    onSnapshot(tweetsQuery, (snapshot) => {
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
    });
  };

  useEffect(() => {
    fetchTweets();
  }, []);

  return (
    <StWrapper>
      {tweets.map((tweet) => (
        <Tweet key={tweet.id} {...tweet} />
      ))}
    </StWrapper>
  );
}

export default TimeLine;

const StWrapper = styled.div`
  display: flex;
  gap: 10px;
  flex-direction: column;
`;
