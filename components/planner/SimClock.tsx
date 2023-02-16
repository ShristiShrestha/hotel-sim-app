import React, { useEffect, useState } from "react";
import Clock from "react-clock";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { updateClockRun, updateClockSpeed } from "../../redux/clock/actions";
import { ClockSpeedTypeAll } from "../../models/enums/ClockSpeedType";
import { selectClockValues } from "../../redux/clock/reducer";
import { ResText10Regular, ResText10SemiBold } from "../../www/utils/TextUtils";
import {Button, Form, InputNumber, Select, Switch} from "antd";
import { parseFormItem } from "../../www/utils/FormUtils";

const { Option } = Select;

const Wrapper = styled.div.attrs({
  className: "h-justified-flex",
})`
  padding: 16px;
  column-gap: 32px;

  .ant-input-number-input {
    font-size: 10px;
    height: fit-content;
  }

  .ant-col-24.ant-form-item-label {
    padding: 0;
  }

  .ant-switch {
    height: 16px;
  }

  .ant-switch-handle {
    top: 0;
    left: 0;
    width: 16px;
    height: 16px;
  }

  .ant-switch-checked .ant-switch-handle {
    left: unset;
    right: 0;
  }

  .ant-form-item{
    margin-bottom: 0;
  }
`;

export default function SimClock() {
  const dispatch = useDispatch();
  const [value, setValue] = useState(new Date());
  const [speed, setSpeed] = useState(null);
  const [speedType, setSpeedType] = useState(null)
  let interval: any = null;
  const { begin_ts, clock_running, new_ts, rate } =
    useSelector(selectClockValues);

  useEffect(() => {
    if (clock_running) {
      interval = setInterval(() => setValue(new Date()), 1000);
    }

    return () => {
      !!interval && clearInterval(interval);
    };
  }, [clock_running]);

  const suffixSelector = (
    <Form.Item name="speed_type" noStyle>
      <Select style={{ width: 65 }} defaultValue={rate.type}>
        {ClockSpeedTypeAll.map((item) => (
          <Option value={item}>
            <ResText10Regular>{item}</ResText10Regular>
          </Option>
        ))}
      </Select>
    </Form.Item>
  );

  const onValuesChange = (changedValues, allValues) => {
    const newRateType = allValues["speed_type"];
    const newRateVal = allValues["speed"];
    const newClockRunning = allValues["is_running"];
    const changedFields = Object.keys(changedValues);

    if(changedFields.includes("speed")){
      setSpeed(newRateVal)
    }

    if(changedFields.includes("speed_type")){
      setSpeedType(newRateType)
    }

    if (changedFields.includes("is_running")) {
      dispatch(
        updateClockRun({ current_ts: new Date(), enabled: newClockRunning })
      );
    }
  };

  const onSubmitSpeedChange = () => {
    !!speed && !!speedType && dispatch(
        updateClockSpeed({
          rate: { value: speed, type: speedType },
          current_ts: new Date(),
        })
    );
  }

  const changeSpeedForm = (
      <Form
        name="complex-form"
        onValuesChange={onValuesChange}
        style={{ maxWidth: 150 }}
        labelCol={{ span: 24 }}
        wrapperCol={{ span: 24 }}
      >
        <Form.Item
            name="is_running"
            label={<ResText10SemiBold>Run Clock</ResText10SemiBold>}
            valuePropName="checked"
        >
          <Switch defaultChecked={clock_running} checked={clock_running} />
        </Form.Item>

        <Form.Item
          name="speed"
          label={<ResText10SemiBold>Speed</ResText10SemiBold>}
        >
          <InputNumber
            defaultValue={rate.value}
            addonAfter={suffixSelector}
            style={{ width: "100%" }}
          />
        </Form.Item>
        <Button type={"primary"} size={"small"}
                onClick={() => onSubmitSpeedChange()}
                style={{borderRadius: 8, width: "100%"}}>
          <ResText10Regular>Submit</ResText10Regular>
        </Button>
      </Form>
  );

  return (
    <Wrapper>
      <Clock value={value} renderNumbers />
      <div>{changeSpeedForm}</div>
    </Wrapper>
  );
}
