import {
  collection,
  limit,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { db } from "../firebase";
import Tweet from "./Tweet";
import { Unsubscribe } from "firebase/auth";

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

  useEffect(() => {
    let unsubcribe: Unsubscribe | null = null;

    const fetchTweets = async () => {
      const tweetsQuery = query(
        collection(db, "tweets"),
        orderBy("createdAt", "desc"),
        limit(25)
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
      unsubcribe = await onSnapshot(tweetsQuery, (snapshot) => {
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

    fetchTweets();

    return () => {
      unsubcribe && unsubcribe();
      // unsubcribe && console.log("구독해제");
    };
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
