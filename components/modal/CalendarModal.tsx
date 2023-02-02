import React from "react";
import { Calendar } from "antd";
import type { CalendarMode } from "antd/es/calendar/generateCalendar";
import { Moment } from "moment";

export default function CalendarModal() {
  const onPanelChange = (value: Moment, mode: CalendarMode) => {
    console.log(value.format("YYYY-MM-DD"), mode);
  };

  return <Calendar fullscreen={false} onPanelChange={onPanelChange} />;
}
