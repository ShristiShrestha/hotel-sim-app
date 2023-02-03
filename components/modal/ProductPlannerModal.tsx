import styled from "styled-components";
import { Table } from "antd";
import React, { useEffect, useState } from "react";
import { grey2, grey3, pearl } from "../../www/utils/ShadesUtils";
import {
  ClearOutlined,
  CopyOutlined,
  DollarCircleOutlined,
  FireOutlined,
  LeftCircleOutlined,
  PlaySquareOutlined,
  RightCircleOutlined,
  TableOutlined,
  ToolOutlined,
  VerticalRightOutlined,
} from "@ant-design/icons";
import { capitalize } from "../../www/utils/StringUtils";

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-content: center;
  column-gap: 0;

  .anticon {
    font-size: 30px;
    color: ${grey3};
  }

  .ant-table table {
    border-spacing: 2px;
  }

  #menu-item-clicked {
    border: 3px inset #fff !important;
    background: white;

    .anticon {
      color: ${grey2};
    }
  }
`;

const menuIcons = [
  <ToolOutlined />,
  <PlaySquareOutlined />,
  <DollarCircleOutlined />,
  <TableOutlined />,
  <ClearOutlined />,
  <CopyOutlined />,
  <FireOutlined />,
  <LeftCircleOutlined />,
  <RightCircleOutlined />,
  <VerticalRightOutlined />,
];

const menuData = menuIcons.map((icon, id) => ({
  key: id + "-menu-icon",
  menuItem: { id, icon },
}));

const days = ["Sun", "Mon", "Tue", "Wed", "Thr", "Fri", "Sat"];
const months = ["Feb", "Mar", "Apr", "May"];
const week_ranges = [
  [1, 7],
  [8, 14],
  [15, 21],
  [22, 28],
  [29, 31],
];
const get_week_data = (mnth, start, end) => {
  const days = Array(end - start + 1)
    .fill(1)
    .map((element, index) => start + index);
  return days.map((day) => ({
    key: day + mnth + "-calendar-data-item",
    calendarItem: {
      id: "day-" + day + "month-" + mnth,
      day_str: capitalize(mnth) + " " + day,
      val: Math.floor(Math.random() * 70),
    },
  }));
};

const calendarColumn = days.map((day) => ({
  key: "calendar-column",
  title: day,
  dataIndex: "calendarItem",
  render: (parms) => {
    return {
      props: {
        style: {
          padding: 4,
        },
      },
      children: (
        <div
          id={"calendar-item-clicked-" + !!parms && parms["id"]}
          style={{ padding: 8 }}
        >
          <div>{!!parms && parms["day_str"]}</div>
          <div>{!!parms && parms["val"]}</div>
        </div>
      ),
    };
  },
}));

export default function ProductPlannerModal() {
  const [clickedItem, setClickedItem] = useState(0);
  const [total_week_data, setTotalWeekData] = useState([]);
  const getData = (num_months = 3) => {
    const _total_week_data = [];
    // if (total_week_data.length > 0) return total_week_data;

    for (let i = 0; i < num_months; i++) {
      const one_month_data = week_ranges.map((range) =>
        get_week_data(months[i], range[0], range[1])
      );
      // @ts-ignore
      _total_week_data.push(one_month_data);
    }
    console.info(_total_week_data.flat(2));
    // @ts-ignore
    setTotalWeekData(_total_week_data.flat(2));
  };

  useEffect(() => {
    getData();
  }, []);

  const menuColumn = [
    {
      key: "menu-column",
      dataIndex: "menuItem",
      render: ({ id, icon }) => {
        return {
          props: {
            style: {
              padding: 0,
              border: `3px outset #fcfcfc`,
              background: pearl,
              boxShadow: "0 0 2px",
            },
          },
          children: (
            <div
              id={clickedItem == id ? "menu-item-clicked" : ""}
              onClick={() => setClickedItem(id)}
              style={{ padding: 12 }}
            >
              {icon}
            </div>
          ),
        };
      },
    },
  ];

  const contentTable = (
    <Table // @ts-ignore
      columns={menuColumn}
      dataSource={menuData}
      size={"small"}
      bordered
      showHeader={false}
      pagination={false}
    />
  );

  const calendarTable = (
    <Table // @ts-ignore
      columns={calendarColumn}
      dataSource={total_week_data}
      size={"small"}
      pagination={{ pageSize: 5 }}
      bordered
    />
  );
  return (
    <Wrapper>
      {contentTable}
      {calendarTable}
    </Wrapper>
  );
}
