import React from "react";
import type { CalendarMode } from "antd/es/calendar/generateCalendar";
import { Moment } from "moment";
import styled from "styled-components";
import { pearl } from "../../www/utils/ShadesUtils";
import { Calendar } from "antd";

const Wrapper = styled.div`
  max-width: 20vw;

  .ant-picker-calendar,
  .ant-picker-calendar .ant-picker-panel {
    background: ${pearl};
  }
`;
export default function SimCalendar() {
  const onPanelChange = (value: Moment, mode: CalendarMode) => {
    console.log(value.format("YYYY-MM-DD"), mode);
  };

  return (
    <Wrapper>
      <Calendar fullscreen={false} onPanelChange={onPanelChange} />
    </Wrapper>
  );
}
