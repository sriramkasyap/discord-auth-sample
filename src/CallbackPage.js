import { useContext, useEffect } from "react";
import { useLoaderData, useNavigate } from "react-router";
import { context } from "./App";
import logo from "./logo.svg";

const CallbackPage = () => {
  let loaderData = useLoaderData();
  const { setUser, user } = useContext(context);

  const navigate = useNavigate();

  useEffect(() => {
    if (
      loaderData &&
      loaderData.discord_user &&
      loaderData.eden_user &&
      loaderData.token &&
      !user
    ) {
      console.log({ loaderData });
      let { discord_user, eden_user, token } = loaderData;
      setUser({ discord_user, eden_user, token });

      return navigate("/profile");
    }
  }, []);

  return (
    <header className="App-header">
      <img src={logo} className="App-logo" alt="logo" />
      <p>Authenticating....</p>
    </header>
  );
};

export default CallbackPage;
