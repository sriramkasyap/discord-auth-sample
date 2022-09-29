import { useContext, useEffect } from "react";
import { useNavigate } from "react-router";
import { context } from "./App";

const ProfilePage = () => {
  const { user, setUser } = useContext(context);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/");
    }
  }, [user, navigate]);
  return (
    user &&
    user.discord_user && (
      <header className="App-header">
        <img
          src={`https://cdn.discordapp.com/avatars/${user.discord_user.id}/${user.discord_user.avatar}`}
          alt="avatar"
        />
        <p>Welcome, {user.discord_user.username}</p>
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
