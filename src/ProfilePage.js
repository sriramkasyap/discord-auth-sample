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
    user && (
      <header className="App-header">
        <img
          src={`https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}`}
          alt="avatar"
        />
        <p>Welcome, {user.username}</p>
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
