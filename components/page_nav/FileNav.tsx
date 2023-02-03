import React, { useState } from "react";
import type { MenuProps } from "antd";
import { Divider, Menu } from "antd";

const clockMenu = [
  {
    label: "Speed",
    key: "plan:speed",
  },
  {
    label: "Run",
    key: "plan:run",
  },
  {
    label: "Analog",
    key: "plan:analog",
  },
  {
    label: "Digital 12hr",
    key: "plan:digital_12hr",
  },
  {
    label: "Digital 24hr",
    key: "plan:digital_24hr",
  },
];

const commitmentMenu = [
  {
    label: "Fixed",
    key: "commitment:fixed",
  },
  {
    label: "POR",
    key: "commitment:por",
  }
]

const items: MenuProps["items"] = [
  {
    label: "File",
    key: "#MenuFile",
    children: [
      {
        label: "New Exercise",
        key: "file:new",
      },
      {
        label: "Open Exercise",
        key: "file:open",
      },
      {
        label: "Close Exercise",
        key: "file:close",
      },
      {
        label: <Divider className={"menu-divider"}/>,
        key: "file:divider_1",
      },
      {
        label: "Administrative",
        key: "file:administrative",
        disabled: true,
      },
      {
        label: "Print",
        key: "file:print",
        disabled: true,
      },
      {
        label: "Exit",
        key: "file:exit",
      },
    ],
  },
  {
    label: "Edit",
    key: "#MenuEdit",
    children: [
      {
        label: "Undo",
        key: "edit:undo",
        disabled: true,
      },
      {
        label: "Cut",
        key: "edit:cut",
        disabled: true,
      },
      {
        label: "Copy All",
        key: "edit:copy_all",
        disabled: true,
      },
      {
        label: "Paste",
        key: "edit:paste",
        disabled: true,
      },
      {
        label: "Clear",
        key: "edit:clear",
        disabled: true,
      },
    ],
  },
  {
    label: "Plan",
    key: "#MenuPlan",
    children: [
      {
        label: "Calendar",
        key: "plan:calendar",
      },
      {
        label: "Clock",
        key: "plan:clock",
      },
      {
        key: "plan:clock_settings",
        label: "Clock Settings",
        children: clockMenu
        // label: <Menu mode="vertical" items={clockMenu}/>,
      },
      {
        label: "Product Planner",
        key: "plan:product_planner",
      },
      {
        label: "Rate Planner",
        key: "plan:rate_planner",
      },
      {
        label: "Group Planner",
        key: "plan:group_planner",
      },
      {
        label: "Information Services",
        key: "plan:info_services",
        disabled: true,
      },
      {
        label: "Vital Statistics",
        key: "plan:vital_stats",
        disabled: true,
      },
    ],
  },
  {
    label: "Report",
    key: "#MenuReport",
    children: [
      {
        label: "Maintenance Report",
        key: "report:maintenance",
      },
      {
        label: "Entertainment Report",
        key: "report:entertainment",
      },
      {
        label: "Staffing Report",
        key: "report:staffing",
      },
      {
        label: "Room Supplies Report",
        key: "report:room_supplies",
      },
      {
        label: "Laundry & Linen Report",
        key: "report:laundry_linen",
      },
      {
        label: "Room Attendant Report",
        key: "report:room_attendant",
      },
      {
        label: "Commissions Report",
        key: "report:commissions",

      },
      {
        label: "Advertising Report",
        key: "report:advertising",
      },
    ],
  },
  {
    label: "Chart",
    key: "#MenuChart",
    children: [
      {
        label: "Revenue by Segment",
        key: "chart:revenue_by_segment",
      },
      {
        label: "Rooms Sold by Segment",
        key: "chart:rooms_sold_by_segment",
      },
      {
        label: "Margin by Segment",
        key: "chart:margin_by_segment",
      },
      {
        label: <Divider className={"menu-divider"}/>,
        key: "chart:divider_1"
      },
      {
        label: "Commitments",
        key: "chart:commitments",
        children: commitmentMenu
      },
      {
        label: <Divider className={"menu-divider"}/>,
        key: "chart:divider_2"
      },
      {
        label: "Rates Reserved",
        key: "chart:rates_reserved",
      },
      {
        label: "Rates Declined",
        key: "chart:rates_declined",
      },
      {
        label: "Rates Revenue",
        key: "chart:rates_revenue",
      },
      {
        label: "Buildup",
        key: "chart:buildup",
        disabled: true,
      },
      {
        label: "Time Animation",
        key: "chart:time_animation",
        disabled: true,
      },
      {
        label: "Rotation Animation",
        key: "chart:rotation_animation",
        disabled: true,
      },
      {
        label: "Filter Segments",
        key: "chart:filter_segments",
        disabled: true,
      },
    ],
  },
  {
    label: "Help",
    key: "#MenuHelp",
    children: [
      {
        label: "Participant Guide",
        key: "help:participant_guide",
        disabled: true,
      },
      {
        label: "About Hotel Simulation",
        key: "help:hotel_simulation",
        disabled: true,
      },
    ],
  },
];

export default function FileNav () {
    const [current, setCurrent] = useState("mail");

    const onClick: MenuProps["onClick"] = e => {
        setCurrent(e.key);
    };

    return (
       <Menu
            onClick={onClick}
            selectedKeys={[current]}
            mode="horizontal"
            items={items}
        />
    );
};