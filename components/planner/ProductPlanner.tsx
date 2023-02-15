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
} from "@ant-design/icons";
import { capitalize } from "../../www/utils/StringUtils";
import { ResText10Regular, ResText10SemiBold } from "../../www/utils/TextUtils";

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-content: center;
  column-gap: 0;

  .anticon {
    font-size: 16px;
    color: ${grey3};
  }

  #menu-item-clicked {
    border: 2px inset #fff !important;
    background: white;

    .anticon {
      color: ${grey2};
    }
  }

  .ant-table-content {
    padding-bottom: 12px;
  }

  .ant-table thead {
    position: sticky;
    position: -webkit-sticky;
    left: 0;
    right: 0;
    top: 0;
    z-index: 1;
  }

  .ant-table-thead > tr > th {
    background: #f2f2f2;
    border-right: 1px solid #e5e9ed !important;
    padding: 2px 8px !important;
  }

  .ant-table-tbody > tr > td:hover {
    background: ${pearl} !important;
  }

  .ant-table-tbody > tr.ant-table-row:hover > td {
    background: #fff;
  }
`;

/******************* left products view ************************/
const productMenuIcons = [
  <ToolOutlined />,
  <PlaySquareOutlined />,
  <DollarCircleOutlined />,
  <TableOutlined />,
  <ClearOutlined />,
  <CopyOutlined />,
  <FireOutlined />,
  <LeftCircleOutlined />,
  <RightCircleOutlined />,
];

const productMenuColData = productMenuIcons.map((icon, id) => ({
  key: id + "-menu-icon",
  menuItem: { id, icon },
}));

/******************* right calendar view  ************************/
const days = ["Sun", "Mon", "Tue", "Wed", "Thr", "Fri", "Sat"];
const months = ["Feb", "Mar", "Apr", "May"];
const week_ranges = [
  [1, 7],
  [8, 7],
  [15, 7],
  [22, 7],
  [29, 2],
];
const getRowData = (mnth, start, size) => {
  const days_num = Array(size)
    .fill(1)
    .map((element, index) => start + index);
  const _rowData = {
    key: "calendar-item-data-" + start + "-" + mnth,
  };
  for (let i = 0; i < days_num.length; i++) {
    const day = days_num[i];
    _rowData["calendarColumn" + days[i]] = {
      id: "day-" + day + "-month-" + mnth,
      day_str: capitalize(mnth) + " " + day,
      val: Math.floor(Math.random() * 70 + 1),
    };
  }
  return _rowData;
};

const calendarCols = days.map((day) => ({
  key: "calendar-column-" + day,
  title: <ResText10SemiBold>{day}</ResText10SemiBold>,
  dataIndex: "calendarColumn" + day,
  render: (param) => {
    return {
      children: !!param && (
        <div id={"calendar-item-clicked-" + param["id"]}>
          <div>
            <ResText10Regular>{param["day_str"]}</ResText10Regular>
          </div>
          <div className={"centered-flex"}>
            <ResText10Regular>{param["val"]}</ResText10Regular>
          </div>
        </div>
      ),
    };
  },
}));

export default function ProductPlanner() {
  const [clickedItem, setClickedItem] = useState(0);
  const [calendarData, setCalendarData] = useState([]);
  const getData = (num_months = 3) => {
    const _calendarData = [];
    if (calendarData.length > 0) return calendarData;
    for (let i = 0; i < num_months; i++) {
      const one_month_data = week_ranges.map((range) =>
        getRowData(months[i], range[0], range[1])
      );
      // @ts-ignore
      _calendarData.push(one_month_data);
    }
    // @ts-ignore
    setCalendarData(_calendarData.flat(2));
  };

  useEffect(() => {
    getData(2);
  }, []);

  const productMenuCol = [
    {
      key: "menu-column",
      dataIndex: "menuItem",
      render: ({ id, icon }) => {
        return {
          props: {
            style: {
              padding: 0,
              border: `2px outset #fcfcfc`,
              background: pearl,
              boxShadow: "0 0 2px",
            },
          },
          children: (
            <div
              id={clickedItem == id ? "menu-item-clicked" : ""}
              onClick={() => setClickedItem(id)}
              style={{
                padding: 5,
              }}
            >
              {icon}
            </div>
          ),
        };
      },
    },
  ];

  const productMenu = (
    <Table // @ts-ignore
      columns={productMenuCol}
      dataSource={productMenuColData}
      showHeader={false}
      pagination={false}
      size={"small"}
      style={{
        height: "fit-content",
        position: "sticky",
        left: 0,
        top: 0,
      }}
      bordered
    />
  );

  const calendarTable = (
    <Table // @ts-ignore
      columns={calendarCols}
      dataSource={calendarData}
      size={"small"}
      pagination={false}
      bordered
    />
  );

  return (
    <Wrapper>
      {productMenu}
      {calendarTable}
    </Wrapper>
  );
}
