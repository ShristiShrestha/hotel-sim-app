import styled from "styled-components";
import React, { useState } from "react";
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
import CalendarModal from "../modal/CalendarModal";
import ProductPlannerModal from "../modal/ProductPlannerModal";
import RatePlannerModal from "../modal/RatePlannerModal";
import ClockModal from "../modal/ClockModal";
import CustomModal from "../modal/CustomModal";

const Wrapper = styled.div``;

const planner_icons = [
    {
        label: "Clock",
        key: "clock",
        item: <ClockCircleOutlined/>,
    },
    {
        label: "Calendar",
        key: "calendar",
        item: <CalendarOutlined/>,
    },
    {
        label: "Rate",
        key: "rate",
        item: <BorderlessTableOutlined/>,
    },
    {
        label: "Product",
        key: "product",
        item: <TableOutlined/>,
    },
    {
        label: "Group",
        key: "group",
        item: <UsergroupAddOutlined/>,
        disabled: true,
    },
    {
        label: "chart",
        key: "chart",
        item: <BarChartOutlined/>,
        disabled: true,
    },
];

export default function PlanNav() {
    const [modelEnablers, setModelEnablers] = useState({
        clock: false,
        calendar: false,
        rate: false,
        product: false,
        group: false,
    });

    const getModalContent = (item) => {
        switch (item) {
            case "clock":
                return <ClockModal/>;
            case "calendar":
                return <CalendarModal/>;
            case "product":
                return <ProductPlannerModal/>;
            case "rate":
                return <RatePlannerModal/>;
            default:
                return <div> Not found</div>;
        }
    };

    return (
        <Wrapper>
            <ul id="plan-nav-list">
                {planner_icons.map((icon) => (
                    <Tooltip
                        key={icon.key}
                        title={capitalize(icon.label)}
                        arrowPointAtCenter
                    >
                        <CustomModal
                            label={icon.label}
                            key={icon.key}
                            disabled={icon.disabled || false}
                            clickItem={icon.item}
                        >
                            {getModalContent(icon.key)}
                        </CustomModal>
                    </Tooltip>
                ))}
            </ul>
        </Wrapper>
    );
}
