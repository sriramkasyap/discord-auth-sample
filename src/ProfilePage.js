import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { context } from "./App";

const ProfilePage = () => {
  const { user, setUser } = useContext(context);
  const navigate = useNavigate();

  return (
    user &&
    user.discord_user && (
      <header className="App-header">
        <img
          src={`https://cdn.discordapp.com/avatars/${user.discord_user.id}/${user.discord_user.avatar}`}
          alt="avatar"
        />
        <p>Welcome, {user.discord_user.username}</p>
        <code>Token: ${user.token}</code>
        <button
          onClick={() => {
            setUser(null);
            navigate("/");
          }}
        >
          Logout
        </button>
      </header>
    )
  );
};

export default ProfilePage;
