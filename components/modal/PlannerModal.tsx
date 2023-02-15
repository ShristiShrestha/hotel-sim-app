import React, { ReactElement, useRef, useState } from "react";
import styled from "styled-components";
import Draggable, { DraggableData, DraggableEvent } from "react-draggable";
import { ResText12SemiBold } from "../../www/utils/TextUtils";

interface Props {
  label: string;
  key: string;
  children: ReactElement;
  disabled: boolean;

  clickItem: ReactElement;

  clickedClassname?: string;
}

const ClickWrap = styled.div<{ isDisabled?: boolean }>`
  padding: 0 6px;
  cursor: ${(props) => (props.isDisabled || false ? "no-drop" : "default")};
  opacity: ${(props) => (props.isDisabled ? 0.75 : 1)};
  font-size: 16px;
  width: 32px;
  height: 32px;
`;

const getTitle = (id) => {
  switch (id.toLowerCase()) {
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

//  idea is to abstract the trigger component (shortcut icons to open planner)
// and the corresponding modal in one place
// that modal is rendered at the center, no matter what
// and can be moved around within the window
// show clicked dampen effect on trigger component
// if value in the props requires it
export default function PlannerModal(props: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const [bounds, setBounds] = useState({
    left: 0,
    top: 0,
    bottom: 0,
    right: 0,
  });

  // on click shortcut icons/ triggers
  const onClick = (e) => {
    !props.disabled && setVisible(!visible);
  };

  // on dragging popup modals
  const onStart = (_event: DraggableEvent, uiData: DraggableData) => {
    const { clientWidth, clientHeight } = window.document.documentElement;
    const targetRect = ref.current?.getBoundingClientRect();
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

  // get modal title
  const getModalTitle = () => (
    <div
      ref={ref}
      className={"planner-modal-header h-justified-flex"}
      onMouseOver={() => {
        if (disabled) {
          setDisabled(false);
        }
      }}
      onMouseOut={() => {
        setDisabled(true);
      }}
    >
      <ResText12SemiBold>{getTitle(props.label)}</ResText12SemiBold>
      <span className="close" onClick={() => setVisible(false)}>
        &times;
      </span>
    </div>
  );

  const getModalContent = () => (
    <div className={"planner-modal-content"}>{props.children}</div>
  );

  return (
    <>
      {/* menu item */}
      <ClickWrap
        ref={ref}
        key={"click-wrap-" + props.key}
        isDisabled={props.disabled}
        className={
          visible ? props.clickedClassname || "click-wrap-clicked" : ""
        }
        onClick={(e) => onClick(e)}
      >
        {props.clickItem}
      </ClickWrap>
      {/* show draggable popup */}
      {visible && (
        <Draggable
          disabled={disabled}
          bounds={bounds}
          onStart={(event, uiData) => onStart(event, uiData)}
        >
          <div className={"planner-modal jelly-inner-shadow"}>
            {getModalTitle()}
            {getModalContent()}
          </div>
        </Draggable>
      )}
    </>
  );
}
