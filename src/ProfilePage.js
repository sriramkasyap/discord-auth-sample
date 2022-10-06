import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { context } from "./App";

const ProfilePage = () => {
  const { user, setUser } = useContext(context);
  const navigate = useNavigate();
  const [graphTimer, setGraphTimer] = useState(null);

  useEffect(() => {
    if (!user) {
      return navigate("/");
    }
    let timer = setInterval(() => {
      fetch(`${process.env.REACT_APP_API_URL}/graphql`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("eden_token")}`,
        },
        body: JSON.stringify({
          query: ` 
            query Query($limit: Int) {
              findMembers(limit: $limit) {
                members {
                  _id
                  discordID
                  name
                  avatar
                  discriminator
                }
              }
            }`,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
        });
    }, 10000);

    setGraphTimer(timer);

    return () => {
      // cleanup
      clearInterval(graphTimer);
    };
  }, [user, navigate, graphTimer]);
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
