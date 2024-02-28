import React from "react";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  const handleLogoutBtn = () => {
    auth.signOut();
    navigate("/login");
  };

  return (
    <div>
      <button onClick={handleLogoutBtn}>Log out</button>
    </div>
  );
}

export default Home;
