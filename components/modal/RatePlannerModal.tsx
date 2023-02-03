import React, { useEffect, useState } from "react";
import { Table } from "antd";
import { ResText12Regular, ResText12SemiBold } from "../../www/utils/TextUtils";
import date from "async-validator/dist-types/validator/date";
import {
  green,
  grey3,
  grey5,
  lightBanana,
  lightRed,
  pearl,
  seaFoam,
} from "../../www/utils/ShadesUtils";
import styled from "styled-components";

const Wrapper = styled.div`
  .ant-table-thead > tr > th {
    background: #f8f8f8
  }
;
}

.ant-table.ant-table-bordered > .ant-table-container {
  border-bottom: 1px solid ${grey5};
  border-top: 1px solid ${grey5};
}

.ant-table-thead
> tr
> th:not(:last-child):not(.ant-table-selection-column):not(
      .ant-table-row-expand-icon-cell
    ):not([colspan])::before {
  display: none;
}

.ant-table.ant-table-bordered
> .ant-table-container
> .ant-table-content
> table
> tbody
> tr
> td {
  border-right: 1px solid ${grey3};
}

.ant-table.ant-table-bordered
> .ant-table-container
> .ant-table-content
> table
> thead
> tr
> th {
  border-right: 1px solid ${grey3};
  border-bottom: 1px solid ${grey3};
}

.ant-table-thead > tr > th {
  text-align: center;
}

.ant-table-container table > thead > tr:first-child th:first-child {
  text-align: left;
}

.ant-table-pagination {
  column-gap: 8px;
}

.ant-table-pagination.ant-pagination {
  margin: 12px 0;
}

.ant-table-tbody > tr.ant-table-row:hover > td {
  background: ${pearl} !important;
}
`;

const rateStyle = {
  style: {
    minWidth: 25,
    textAlign: "center",
  },
};

const closeStyle = {
  style: {
    background: lightRed,
    minWidth: 35,
    textAlign: "center",
  },
};

const openStyle = {
  style: {
    background: seaFoam,
    minWidth: 35,
    textAlign: "center",
  },
};

const getTitle = (text) => <ResText12SemiBold>{text}</ResText12SemiBold>;

const columns = [
  {
    title: getTitle("Date"),
    dataIndex: "date",
    key: "date",
    render: (text) => {
      return {
        props: {
          style: {
            background: "#f8f8f8",
            minWidth: 100,
          },
        },
        children: <ResText12Regular>{text}</ResText12Regular>,
      };
    },
  },
  {
    title: getTitle("R"),
    dataIndex: "rate",
    key: "rate",
    render: (text) => {
      return {
        props: {
          style: {
            background: lightBanana,
          },
        },
        children: <ResText12Regular>{text}</ResText12Regular>,
      };
    },
  },
  {
    title: getTitle("+"),
    dataIndex: "a_+",
    key: "a_+",
    render: (text) => {
      return {
        props: openStyle,
        children: <ResText12Regular>{text}</ResText12Regular>,
      };
    },
  },
  {
    title: getTitle("A"),
    dataIndex: "a",
    key: "a",
    render: (icon) => {
      return {
        props: rateStyle,
        children: icon,
      };
    },
  },
  {
    title: getTitle("-"),
    dataIndex: "a_-",
    key: "a_-",
    render: (text) => {
      return {
        props: closeStyle,
        children: <ResText12Regular>{text}</ResText12Regular>,
      };
    },
  },
  {
    title: getTitle("+"),
    dataIndex: "b_+",
    key: "b_+",
    render: (text) => {
      return {
        props: openStyle,
        children: <ResText12Regular>{text}</ResText12Regular>,
      };
    },
  },
  {
    title: getTitle("B"),
    dataIndex: "b",
    key: "b",
    render: (icon) => {
      return {
        props: rateStyle,
        children: icon,
      };
    },
  },
  {
    title: getTitle("-"),
    dataIndex: "b_-",
    key: "b_-",
    render: (text) => {
      return {
        props: closeStyle,
        children: <ResText12Regular>{text}</ResText12Regular>,
      };
    },
  },
  {
    title: getTitle("+"),
    dataIndex: "c_+",
    key: "c_+",
    render: (text) => {
      return {
        props: openStyle,
        children: <ResText12Regular>{text}</ResText12Regular>,
      };
    },
  },
  {
    title: getTitle("C"),
    dataIndex: "c",
    key: "c",
    render: (icon) => {
      return {
        props: rateStyle,
        children: icon,
      };
    },
  },
  {
    title: getTitle("-"),
    dataIndex: "c_-",
    key: "c_-",
    render: (text) => {
      return {
        props: closeStyle,
        children: <ResText12Regular>{text}</ResText12Regular>,
      };
    },
  },
  {
    title: getTitle("+"),
    dataIndex: "d_+",
    key: "d_+",
    render: (text) => {
      return {
        props: openStyle,
        children: <ResText12Regular>{text}</ResText12Regular>,
      };
    },
  },
  {
    title: getTitle("D"),
    dataIndex: "d",
    key: "d",
    render: (icon) => {
      return {
        props: rateStyle,
        children: icon,
      };
    },
  },
  {
    title: getTitle("-"),
    dataIndex: "d_-",
    key: "d_-",
    render: (text) => {
      return {
        props: closeStyle,
        children: <ResText12Regular>{text}</ResText12Regular>,
      };
    },
  },
  {
    title: getTitle("+"),
    dataIndex: "e_+",
    key: "e_+",
    render: (text) => {
      return {
        props: openStyle,
        children: <ResText12Regular>{text}</ResText12Regular>,
      };
    },
  },
  {
    title: getTitle("E"),
    dataIndex: "e",
    key: "e",
    render: (icon) => {
      return {
        props: rateStyle,
        children: icon,
      };
    },
  },
  {
    title: getTitle("-"),
    dataIndex: "e_-",
    key: "e_-",
    render: (text) => {
      return {
        props: closeStyle,
        children: <ResText12Regular>{text}</ResText12Regular>,
      };
    },
  },
];

const rateCircle = (
  <div
    style={{
      width: 20,
      height: 20,
      borderRadius: "50%",
      border: `4px solid ${green}`,
    }}
  />
);
const get_week_data = (i, date_str: string) => ({
  key: i + "_" + date_str + "date",
  date: date_str + "-6-Feb",
  rate: "130",
  "a_+": 136,
  a: rateCircle,
  "a_-": 10,
  "b_+": 136,
  b: rateCircle,
  "b_-": 10,
  "c_+": 136,
  c: rateCircle,
  "c_-": 10,
  "d_+": 136,
  d: rateCircle,
  "d_-": 10,
  "e_+": 136,
  e: rateCircle,
  "e_-": 10,
});
export default function RatePlannerModal() {
  const [total_week_data, setTotalWeekData] = useState([]);

  const getData = (num_weeks = 3) => {
    const _total_week_data = [];
    if (total_week_data.length > 0) return total_week_data;
    const week_date_str = ["Sun", "Mon", "Tues", "Wed", "Thurs", "Fri", "Sat"];
    for (let i = 0; i < num_weeks; i++) {
      const one_week_data = week_date_str.map((date_str) =>
        get_week_data(i, date_str)
      );
      // @ts-ignore
      _total_week_data.push(one_week_data);
    }
    console.info(_total_week_data);
    // @ts-ignore
    setTotalWeekData(_total_week_data.flat(1));
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <Wrapper>
      <Table // @ts-ignore
        columns={columns}
        dataSource={total_week_data}
        size={"small"}
        bordered
      />
    </Wrapper>
  );
}
