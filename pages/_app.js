import React from "react";
import { Provider } from "react-redux";
import store from "../redux/store";
import "react-clock/dist/Clock.css";
import "../styles/globals.css";

export default function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  );
}
