import React from "react";
import { Table } from "antd";
import { ResText12SemiBold } from "../../www/utils/TextUtils";
import date from "async-validator/dist-types/validator/date";

export default function RatePlannerModal() {
  const columns = [
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
      render: (text) => <ResText12SemiBold>{text}</ResText12SemiBold>,
    },
    {
      title: "R",
      dataIndex: "rate",
      key: "rate",
    },
    {
      title: "+",
      dataIndex: "a_+",
      key: "a_+",
    },
    {
      title: "A",
      dataIndex: "a",
      key: "a",
    },
    {
      title: "-",
      dataIndex: "a_-",
      key: "a_-",
    },
    {
      title: "+",
      dataIndex: "b_+",
      key: "b_+",
    },
    {
      title: "B",
      dataIndex: "b",
      key: "b",
    },
    {
      title: "-",
      dataIndex: "b_-",
      key: "b_-",
    },
    {
      title: "+",
      dataIndex: "c_+",
      key: "c_+",
    },
    {
      title: "C",
      dataIndex: "c",
      key: "c",
    },
    {
      title: "-",
      dataIndex: "c_-",
      key: "c_-",
    },
    {
      title: "+",
      dataIndex: "d_+",
      key: "d_+",
    },
    {
      title: "D",
      dataIndex: "d",
      key: "d",
    },
    {
      title: "-",
      dataIndex: "d_-",
      key: "d_-",
    },
    {
      title: "+",
      dataIndex: "e_+",
      key: "e_+",
    },
    {
      title: "E",
      dataIndex: "e",
      key: "e",
    },
    {
      title: "-",
      dataIndex: "e_-",
      key: "e_-",
    },
  ];

  const get_week_data = (date_str: string) => ({
    key: date_str + "date",
    date: date_str + "-6-Feb",
    rate: "130",
    "a_+": 136,
    a: 6,
    "a_-": 10,
    "b_+": 136,
    b: 6,
    "b_-": 10,
    "c_+": 136,
    c: 6,
    "c_-": 10,
    "d_+": 136,
    d: 6,
    "d_-": 10,
    "e_+": 136,
    e: 6,
    "e_-": 10,
  });
  const getData = (num_weeks = 3) => {
    const total_week_data = [];
    const week_date_str = ["Sun", "Mon", "Tues", "Wed", "Thurs", "Fri", "Sat"];
    for (let i = 0; i < num_weeks; i++) {
      const one_week_data = week_date_str.map((date_str) =>
        get_week_data(date_str)
      );
      // @ts-ignore
      total_week_data.push(one_week_data);
    }
    return total_week_data;
  };

  return <Table columns={columns} dataSource={getData()} />;
}
