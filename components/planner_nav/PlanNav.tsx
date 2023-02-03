import styled from "styled-components";
import React, { useRef, useState } from "react";
import {
  BarChartOutlined,
  BorderlessTableOutlined,
  CalendarOutlined,
  ClockCircleOutlined,
  TableOutlined,
  UsergroupAddOutlined,
} from "@ant-design/icons";
import { Modal, Tooltip } from "antd";
import { capitalize } from "../../www/utils/StringUtils";
import CalendarModal from "../modal/CalendarModal";
import ProductPlannerModal from "../modal/ProductPlannerModal";
import RatePlannerModal from "../modal/RatePlannerModal";
import ClockModal from "../modal/ClockModal";
import type { DraggableData, DraggableEvent } from "react-draggable";
import Draggable from "react-draggable";
import { ResText12SemiBold } from "../../www/utils/TextUtils";

const Wrapper = styled.div``;

const ClickWrap = styled.li<{ disabled?: boolean }>`
  padding: 4px;
  cursor: ${(props) => (props.disabled ? "no-drop" : "default")};
  opacity: ${(props) => (props.disabled ? 0.75 : 1)};
`;

const getTitle = (id) => {
  switch (id) {
    case "clock":
      return "Clock";
    case "calendar":
      return "Calendar";
    case "rate":
      return "Rate Planner";
    case "product":
      return "Product Planner";
    case "group":
      return "Group Planner";
    default:
      return "Not found";
  }
};

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
    disabled: true,
  },
  {
    label: "chart",
    key: "chart",
    item: <BarChartOutlined />,
    disabled: true,
  },
];

export default function PlanNav() {
  const draggleRef = useRef<HTMLDivElement>(null);
  const [disabled, setDisabled] = useState(false);

  const [bounds, setBounds] = useState({
    left: 0,
    top: 0,
    bottom: 0,
    right: 0,
  });

  const onStart = (_event: DraggableEvent, uiData: DraggableData) => {
    const { clientWidth, clientHeight } = window.document.documentElement;
    const targetRect = draggleRef.current?.getBoundingClientRect();
    if (!targetRect) {
      return;
    }
    setBounds({
      left: -targetRect.left + uiData.x,
      right: clientWidth - (targetRect.right - uiData.x),
      top: -targetRect.top + uiData.y,
      bottom: clientHeight - (targetRect.bottom - uiData.y),
    });
  };

  const [modelEnablers, setModelEnablers] = useState({
    clock: false,
    calendar: false,
    rate: false,
    product: false,
    group: false,
  });
  const onclickMenuItem = (id, state_key) => {
    // toggle modal display
    setModelEnablers({
      ...modelEnablers,
      [state_key]: !modelEnablers[state_key],
    });
  };

  const handleModal = (item, value) => {
    setModelEnablers({ ...modelEnablers, [item]: value });
  };

  const getModalContent = (item) => {
    switch (item) {
      case "clock":
        return <ClockModal />;
      case "calendar":
        return <CalendarModal />;
      case "product":
        return <ProductPlannerModal />;
      case "rate":
        return <RatePlannerModal />;
      default:
        return <div> Not found</div>;
    }
  };

  const getModals = () =>
    Object.keys(modelEnablers).map((item) => (
      <Modal
        key={"modal_" + item}
        title={
          <div
            style={{
              width: "100%",
              cursor: "move",
            }}
            onMouseOver={() => {
              if (disabled) {
                setDisabled(false);
              }
            }}
            onMouseOut={() => {
              setDisabled(true);
            }}
            onFocus={() => {}}
            onBlur={() => {}}
            // end
          >
            <ResText12SemiBold>{getTitle(item)}</ResText12SemiBold>
          </div>
        }
        modalRender={(modal) => (
          <Draggable
            disabled={disabled}
            bounds={bounds}
            onStart={(event, uiData) => onStart(event, uiData)}
          >
            <div ref={draggleRef}>{modal}</div>
          </Draggable>
        )}
        open={modelEnablers[item]}
        footer={false}
        mask={false}
        onCancel={() => handleModal(item, false)}
      >
        {getModalContent(item)}
      </Modal>
    ));

  return (
    <Wrapper>
      <ul id="plan-nav-list">
        {planner_icons.map((icon) => (
          <Tooltip
            key={icon.key}
            title={capitalize(icon.label)}
            arrowPointAtCenter
          >
            <ClickWrap
              key={"plan-nav-click-wrap" + icon.key}
              id={modelEnablers[icon.key] ? "click-wrap-plan-li-clicked" : ""}
              disabled={icon.disabled}
              onClick={() =>
                !icon.disabled &&
                onclickMenuItem("click-wrap-" + icon.key, icon.key)
              }
            >
              {icon.item}
            </ClickWrap>
          </Tooltip>
        ))}
      </ul>

      {getModals()}
    </Wrapper>
  );
}
