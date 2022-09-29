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
      navigate("/");
      return;
    }

    fetch(`${process.env.REACT_APP_API_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        code,
        redirect_uri: "http://localhost:3000/callback",
      }),
    })
      .then((res) => res.json())
      .then(({ user }) => {
        // console.log(user);
        setUser(user);
        navigate("/profile");
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
