import { useEffect, useMemo, useState } from "react";

const HomePage = () => {
  const [loginUrl, setLoginUrl] = useState("");
  let queryParams = useMemo(() => {
    return new URLSearchParams();
  }, []);
  queryParams.append("redirect_uri", process.env.REACT_APP_CALLBACK_URL);

  useEffect(() => {
    fetch(
      `${process.env.REACT_APP_API_URL}/auth/init?` + queryParams.toString()
    )
      .then((res) => res.json())
      .then((data) => {
        // console.log(data);
        let { loginUrl } = data;
        setLoginUrl(loginUrl);
      });
  }, [queryParams]);

  return (
    <header className="App-header">
      {/* <img src={logo} className="App-logo" alt="logo" /> */}
      <p>Home</p>
      <a className="App-link" href={loginUrl}>
        Login with Discord
      </a>
    </header>
  );
};

export default HomePage;
