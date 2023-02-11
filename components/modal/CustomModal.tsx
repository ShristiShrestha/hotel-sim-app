import React, { ReactElement, useRef, useState } from "react";
import styled from "styled-components";

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
`;

const ClickWrap = styled.div<{ disabled?: boolean }>`
  padding: 4px;
  cursor: ${(props) => (props.disabled ? "no-drop" : "default")};
  opacity: ${(props) => (props.disabled ? 0.75 : 1)};
`;

//  idea is to abstract the trigger component (button, text that opens/closes a modal)
// and the corresponding modal in one place
// that modal is rendered at the center, no matter what
// and can be moved around within the window
// show clicked dampen effect on trigger component
// if value in the props requires it
export default function CustomModal(props: Props) {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const onClick = (e) => {
    e.stopPropagation();
    !props.disabled && setVisible(!visible);
  };

  return (
    <Wrapper>
      <ClickWrap
        ref={ref}
        key={"click-wrap-" + props.key}
        disabled={props.disabled}
        className={
          visible ? props.clickedClassname || "click-wrap-clicked" : ""
        }
        onClick={(e) => onClick(e)}
      >
        {props.clickItem}
      </ClickWrap>
      {visible && (
        <div className={"custom-modal"}>
          <div className={"custom-modal-content"}>
            <span className="close">&times;</span>
            {props.children}
          </div>
        </div>
      )}
    </Wrapper>
  );
}
