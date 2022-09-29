import logo from "./logo.svg";
import "./App.css";
import { useEffect, useState } from "react";

function App() {
  const [loginUrl, setLoginUrl] = useState("");

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/auth/init`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        let { loginUrl } = data;
        setLoginUrl(loginUrl);
      });
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a className="App-link" href={loginUrl}>
          Login with Discord
        </a>
      </header>
    </div>
  );
}

export default App;
