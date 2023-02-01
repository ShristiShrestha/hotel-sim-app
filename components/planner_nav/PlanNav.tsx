import styled from "styled-components";
import React from "react";
import {
  BarChartOutlined,
  BorderlessTableOutlined,
  CalendarOutlined,
  ClockCircleOutlined,
  TableOutlined,
  UsergroupAddOutlined,
} from "@ant-design/icons";

const Wrapper = styled.div``;

const ClickWrap = styled.li`
  padding: 4px;
`;

const planner_icons = [
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
  },
  {
    label: "chart",
    key: "chart",
    item: <BarChartOutlined />,
  },
];

export default function PlanNav() {
  const onclick = (id) => {
    const element = document.getElementById(id);
    // @ts-ignore
    element.classList.toggle("plan-li-clicked");
  };

  return (
    <Wrapper>
      <ul id="plan-nav-list">
        {planner_icons.map((icon) => (
          <ClickWrap
            key={icon.key}
            id={"click-wrap-" + icon.key}
            onClick={() => onclick("click-wrap-" + icon.key)}
          >
            {icon.item}
          </ClickWrap>
        ))}
      </ul>
    </Wrapper>
  );
}
