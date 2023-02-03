import React, { useEffect, useState } from "react";
import Clock from "react-clock";
import styled from "styled-components";

const Wrapper = styled.div`
  padding: 16px;
`;

export default function ClockModal() {
  const [value, setValue] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => setValue(new Date()), 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);
  return (
    <Wrapper>
      <Clock value={value} renderNumbers />
    </Wrapper>
  );
}
