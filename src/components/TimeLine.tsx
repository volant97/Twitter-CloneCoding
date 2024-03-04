import { collection, getDocs, orderBy, query } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { db } from "../firebase";

export interface ITweet {
  id: string;
  createdAt: number;
  photo: string;
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
    const snapshot = await getDocs(tweetsQuery);
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

  return <StWrapper>{JSON.stringify(tweets)}</StWrapper>;
}

export default TimeLine;

const StWrapper = styled.div``;
