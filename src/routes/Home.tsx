import React from "react";
import { auth } from "../firebase";

function Home() {
  const handleLogoutBtn = () => {
    auth.signOut();
  };

  return (
    <div>
      <button onClick={handleLogoutBtn}>Log out</button>
    </div>
  );
}

export default Home;
