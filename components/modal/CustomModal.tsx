import React, { ReactElement, useRef, useState } from "react";
import styled from "styled-components";
import Draggable, { DraggableData, DraggableEvent } from "react-draggable";
import { ResText16SemiBold } from "../../www/utils/TextUtils";

interface Props {
  label: string;
  key: string;
  children: ReactElement;
  disabled: boolean;

  clickItem: ReactElement;

  clickedClassname?: string;
}

const Wrapper = styled.div`
  #click-wrap-clicked {
    border: 2.5px inset #fcfcfc !important;
  }

  .resizable-content {
    min-height: 30px;
    min-width: 30px;
    resize: both;
    overflow: auto;
    max-height: fit-content;
    max-width: fit-content;
  }
`;

const ClickWrap = styled.div<{ isDisabled?: boolean }>`
  padding: 4px;
  cursor: ${(props) => (props.isDisabled || false ? "no-drop" : "default")};
  opacity: ${(props) => (props.isDisabled ? 0.75 : 1)};
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

//  idea is to abstract the trigger component (button, text that opens/closes a modal)
// and the corresponding modal in one place
// that modal is rendered at the center, no matter what
// and can be moved around within the window
// show clicked dampen effect on trigger component
// if value in the props requires it
export default function CustomModal(props: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const onClick = (e) => {
    e.stopPropagation();
    !props.disabled && setVisible(!visible);
  };

  const [bounds, setBounds] = useState({
    left: 0,
    top: 0,
    bottom: 0,
    right: 0,
  });

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

  return (
    <Wrapper>
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
      {visible && (
        <Draggable
          disabled={disabled}
          bounds={bounds}
          onStart={(event, uiData) => onStart(event, uiData)}
        >
          <div className={"custom-modal"}>
            <div
              ref={ref}
              className={"custom-modal-header"}
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
            >
              <ResText16SemiBold>{getTitle(props.label)}</ResText16SemiBold>
              <span className="close" onClick={() => setVisible(false)}>
                &times;
              </span>
            </div>
            <div className={"custom-modal-content"}>{props.children}</div>
          </div>
        </Draggable>
      )}
    </Wrapper>
  );
}
