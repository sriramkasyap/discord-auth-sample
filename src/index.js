import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "./HomePage";
import CallbackPage from "./CallbackPage";
import ProfilePage from "./ProfilePage";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <App>
        <HomePage />
      </App>
    ),
  },
  {
    path: "profile",
    element: (
      <App>
        <ProfilePage />
      </App>
    ),
  },
  {
    path: "callback",
    loader: async ({ request }) => {
      const url = new URL(request.url);
      const code = url.searchParams.get("code");
      console.log({ code });

      return fetch(`${process.env.REACT_APP_API_URL}/auth/login`, {
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
          return { discord_user, eden_user, token };
        });
    },
    element: (
      <App>
        <CallbackPage />
      </App>
    ),
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
