import React from "react";
import { Provider } from "react-redux";
import store from "../redux/store";
import "../styles/globals.css";
import "../styles/antd_globals.css";
import "../styles/toastr.css";
import "components/page_layout/main_layout.css";
import "components/planner_nav/plan_nav.css";
import "react-clock/dist/Clock.css";
import "components/modal/custom_modal.css";

export default function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  );
}
