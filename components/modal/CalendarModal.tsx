import React from "react";
import { Calendar } from "antd";
import type { CalendarMode } from "antd/es/calendar/generateCalendar";
import { Moment } from "moment";
import styled from "styled-components";
import { pearl } from "../../www/utils/ShadesUtils";

const Wrapper = styled.div`
  .ant-picker-calendar,
  .ant-picker-calendar .ant-picker-panel {
    background: ${pearl};
  }
`;
export default function CalendarModal() {
  const onPanelChange = (value: Moment, mode: CalendarMode) => {
    console.log(value.format("YYYY-MM-DD"), mode);
  };

  return (
    <Wrapper>
      <Calendar fullscreen={false} onPanelChange={onPanelChange} />
    </Wrapper>
  );
}
