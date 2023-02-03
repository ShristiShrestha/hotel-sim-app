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
import { ResText12SemiBold } from "../../www/utils/TextUtils";

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-content: center;
  column-gap: 0;

  .anticon {
    font-size: 30px;
    color: ${grey3};
  }

  #menu-item-clicked {
    border: 3px inset #fff !important;
    background: white;

    .anticon {
      color: ${grey2};
    }
  }

  .ant-table table {
    border-spacing: 2px;
  }

  .ant-table-thead > tr > th {
    background: #f8f8f8;
    padding: 16px 12px !important;
  }

  .ant-table-tbody > tr > td:hover {
    background: ${pearl} !important;
  }

  .ant-table-tbody > tr.ant-table-row:hover > td {
    background: #fff;
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
];

const menuData = menuIcons.map((icon, id) => ({
  key: id + "-menu-icon",
  menuItem: { id, icon },
}));

const days = ["Sun", "Mon", "Tue", "Wed", "Thr", "Fri", "Sat"];
const months = ["Feb", "Mar", "Apr", "May"];
const week_ranges = [
  [1, 7],
  [8, 7],
  [15, 7],
  [22, 7],
  [29, 2],
]
const getRowData = (mnth, start, size) => {
  const days_num = Array(size)
    .fill(1)
    .map((element, index) => start + index);
  const _rowData = {
    key: "calendar-item-data-" + start + "-" + mnth,
  }
  for (let i=0; i<days_num.length; i++){
    const day = days_num[i]
    _rowData["calendarColumn"+days[i]] = {
      id: "day-" + day + "-month-" + mnth,
      day_str: capitalize(mnth) + " " + day,
      val: Math.floor(Math.random() * 70),
    }
  }
  return _rowData
};

const calendarColumn = days.map((day) => ({
  key: "calendar-column-"+day,
  title: <ResText12SemiBold>{day}</ResText12SemiBold>,
  dataIndex: "calendarColumn"+day,
  render: (param) => {
    return {
      props: {
        style: {
          padding: 4,
          minWidth: 100,
          minHeight: 120
        },
      },
      children: (
        !!param && <div
          id={"calendar-item-clicked-"+param["id"]}
          style={{ padding: 8, minHeight: 90 }}
        >
          <div>{param["day_str"]}</div>
          <div>{param["val"]}</div>
        </div>
      ),
    };
  },
}));

export default function ProductPlannerModal() {
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
              style={{ padding: 10 }}
            >
              {icon}
            </div>
          ),
        };
      },
    },
  ];

  const menuTable = (
    <Table // @ts-ignore
      columns={menuColumn}
      dataSource={menuData}
      showHeader={false}
      pagination={false}
      size={"small"}
      bordered
    />
  );

  const calendarTable = (
    <Table // @ts-ignore
      columns={calendarColumn}
      dataSource={calendarData}
      size={"small"}
      pagination={{pageSize:5}}
      bordered
    />
  );


  return (
    <Wrapper>
      {menuTable}
      {calendarTable}
    </Wrapper>
  );
}
