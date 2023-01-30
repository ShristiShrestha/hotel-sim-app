import React from "react";

import styled from "styled-components";
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
        <Wrapper>
            <ResHeader3>Hi, I am in root page.</ResHeader3>
        </Wrapper>
    );
}
