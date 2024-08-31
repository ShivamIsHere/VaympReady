import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { Provider } from "react-redux";
import Store from "./redux/store";
import { GoogleOAuthProvider } from "@react-oauth/google";

const container = document.getElementById("root");
const root = createRoot(container);

root.render(
  <GoogleOAuthProvider clientId="148835670716-mm4lm34laljgaklmoj82tc56pg19pivb.apps.googleusercontent.com">
    <Provider store={Store}>
      <App />
    </Provider>
  </GoogleOAuthProvider>
);

reportWebVitals();
