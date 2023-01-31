import React from "react";
import { Provider } from "react-redux";
import store from "../redux/store";
import '@/styles/globals.css';
import '@/styles/toastr.css';

function MyApp({ Component, pageProps }) {
    return (
        <Provider store={store}>
            <Component {...pageProps} />
        </Provider>
    );
}