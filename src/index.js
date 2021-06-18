import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
//import * as serviceWorker from "./serviceWorker";
import * as serviceWorkerRegistration from "./serviceWorkerRegistration";
import * as atatus from "atatus-spa";

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);

//serviceWorkerRegistration.unregister();
serviceWorkerRegistration.register();

reportWebVitals();
atatus.config("bc4d6a6816ed4910ba52c0f6a7ac24a4").install();
