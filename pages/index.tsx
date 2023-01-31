import React from "react";

import styled from "styled-components";
import MainMenu from "../components/MainNav";
import PageLayout from "../components/PageLayout";
import { ResHeader3 } from "../www/utils/TextUtils";

/* styled components */
const Wrapper = styled.div.attrs({
    className: "centered-flex",
})`
    height: 100vh;
    overflow: auto;
    padding: 24px;
`;

export default function Home() {
    return (
        <PageLayout _header_menu={<MainMenu/>}
        _content = {<div>Hello</div>}
        />
    );
}
