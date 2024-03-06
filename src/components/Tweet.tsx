import React from "react";
import { ITweet } from "./TimeLine";
import styled from "styled-components";
import { auth, db, storage } from "../firebase";
import { deleteDoc, doc } from "firebase/firestore";
import { deleteObject, ref } from "firebase/storage";

function Tweet({ username, photo, tweet, userId, id }: ITweet) {
  const currentUserId = auth.currentUser?.uid;

  const onDelete = async () => {
    const ok = confirm("삭제하시겠습니까?");

    if (!ok || currentUserId !== userId) return;

    try {
      await deleteDoc(doc(db, "tweets", id));

      if (photo) {
        const photoRef = ref(storage, `tweets/${currentUserId}/${id}`);
        await deleteObject(photoRef);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Stwrapper>
      <StColumn>
        <Stusername>{username}</Stusername>
        <StPayload>{tweet}</StPayload>
        {currentUserId === userId ? (
          <StDeleteBtn onClick={onDelete}>Delete</StDeleteBtn>
        ) : null}
      </StColumn>
      <StColumn>{photo ? <StPhoto src={photo} /> : null}</StColumn>
    </Stwrapper>
  );
}

export default Tweet;

const Stwrapper = styled.div`
  display: grid;
  grid-template-columns: 5fr 1fr;
  padding: 20px;
  border: 1px solid rgba(255, 255, 255, 0.5);
  border-radius: 15px;
`;

const StColumn = styled.div``;

const Stusername = styled.span`
  font-weight: 600;
  font-size: 15px;
`;

const StPayload = styled.p`
  margin: 10px 0;
  font-size: 18px;
`;

const StDeleteBtn = styled.button`
  background-color: tomato;
  color: white;
  font-weight: 600;
  border: 0;
  font-size: 12px;
  padding: 5px 10px;
  text-transform: uppercase;
  border-radius: 5px;
  cursor: pointer;
`;

const StPhoto = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 15px;
  object-fit: cover;
`;
