import React from "react";
import {
  BarChartOutlined,
  BorderlessTableOutlined,
  CalendarOutlined,
  ClockCircleOutlined,
  TableOutlined,
  UsergroupAddOutlined,
} from "@ant-design/icons";
import { Tooltip } from "antd";
import { capitalize } from "../../www/utils/StringUtils";
import SimCalendar from "../planner/SimCalendar";
import ProductPlanner from "../planner/ProductPlanner";
import RatePlanner from "../planner/RatePlanner";
import SimClock from "../planner/SimClock";
import PlannerModal from "../modal/PlannerModal";

const plannerItems = [
  {
    label: "Clock",
    key: "clock",
    item: <ClockCircleOutlined />,
  },
  {
    label: "Calendar",
    key: "calendar",
    item: <CalendarOutlined />,
  },
  {
    label: "Rate",
    key: "rate",
    item: <BorderlessTableOutlined />,
  },
  {
    label: "Product",
    key: "product",
    item: <TableOutlined />,
  },
  {
    label: "Group",
    key: "group",
    item: <UsergroupAddOutlined />,
    disabled: true,
  },
  {
    label: "chart",
    key: "chart",
    item: <BarChartOutlined />,
    disabled: true,
  },
];

export default function PlannerMenu() {
  const getModalContent = (item) => {
    switch (item) {
      case "clock":
        return <SimClock />;
      case "calendar":
        return <SimCalendar />;
      case "product":
        return <ProductPlanner />;
      case "rate":
        return <RatePlanner />;
      default:
        return <div> Not found</div>;
    }
  };

  return (
    <ul id="plan-nav-list">
      {plannerItems.map((icon) => (
        <Tooltip
          key={icon.key}
          title={capitalize(icon.label)}
          arrowPointAtCenter
        >
          <PlannerModal
            label={icon.label}
            key={icon.key}
            clickItem={icon.item}
            disabled={icon.disabled || false}
          >
            {getModalContent(icon.key)}
          </PlannerModal>
        </Tooltip>
      ))}
    </ul>
  );
}
