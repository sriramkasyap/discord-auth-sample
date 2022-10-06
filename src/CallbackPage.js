import { useContext, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { context } from "./App";
import logo from "./logo.svg";

const CallbackPage = () => {
  let [params] = useSearchParams();

  const { setUser } = useContext(context);

  const navigate = useNavigate();

  useEffect(() => {
    let code = params.get("code");
    if (!code) {
      return navigate("/");
    }

    fetch(`${process.env.REACT_APP_API_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        code,
        redirect_uri: process.env.REACT_APP_CALLBACK_URL,
      }),
    })
      .then((res) => res.json())
      .then(({ discord_user, eden_user, token }) => {
        console.log({ discord_user, eden_user, token });
        localStorage.setItem("eden_token", token);
        setUser({ discord_user, eden_user, token });
        return navigate("/profile");
      });
  }, []);

  return (
    <header className="App-header">
      <img src={logo} className="App-logo" alt="logo" />
      <p>Authenticating....</p>
    </header>
  );
};

export default CallbackPage;
