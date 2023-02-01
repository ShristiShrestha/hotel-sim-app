import styled from "styled-components";
import React from "react";
import { ResText12SemiBold } from "../../www/utils/TextUtils";

const NameBox = styled.div`
  border: 2px inset lightgrey;
  background: yellow;
  padding: 0 12px;
  text-align: center;
  line-height: 28px;
`;

export default function FileName() {
  return (
    <NameBox>
      <ResText12SemiBold>The CHESS Hotel</ResText12SemiBold>
    </NameBox>
  );
}
