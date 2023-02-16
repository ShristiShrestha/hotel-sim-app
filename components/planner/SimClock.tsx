import React, { useEffect, useState } from "react";
import Clock from "react-clock";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { updateClockRun, updateClockSpeed } from "../../redux/clock/actions";
import { ClockSpeedTypeAll } from "../../models/enums/ClockSpeedType";
import { selectClockValues } from "../../redux/clock/reducer";
import { ResText10Regular, ResText10SemiBold } from "../../www/utils/TextUtils";
import { Form, InputNumber, Select, Switch } from "antd";
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
`;

export default function SimClock() {
  const dispatch = useDispatch();
  const [value, setValue] = useState(new Date());

  const { begin_ts, clock_running, new_ts, rate } =
    useSelector(selectClockValues);

  useEffect(() => {
    // dispatch(fetchClockSyncTime({ current_ts: new Date() }));
  }, []);

  let interval: any = null;

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

  const onFieldChange = (changeFields, allFields) => {
    const newRateType = parseFormItem(allFields, "speed_type");
    const newRateVal = parseFormItem(allFields, "speed");
    const newClockRunning = parseFormItem(allFields, "is_running");
  };

  const onValuesChange = (changedValues, allValues) => {
    const newRateType = allValues["speed_type"];
    const newRateVal = allValues["speed"];
    const newClockRunning = allValues["is_running"];
    const changedFields = Object.keys(changedValues);

    if (
      changedFields.includes("speed") ||
      changedFields.includes("speed_type")
    ) {
      dispatch(
        updateClockSpeed({
          rate: { value: newRateVal, type: newRateType },
          current_ts: new Date(),
        })
      );
    }

    if (changedFields.includes("is_running")) {
      dispatch(
        updateClockRun({ current_ts: new Date(), enabled: newClockRunning })
      );
    }
  };

  const getChangeSpeed = () => (
    <div>
      <Form
        name="complex-form"
        onValuesChange={onValuesChange}
        style={{ maxWidth: 150 }}
        labelCol={{ span: 24 }}
        wrapperCol={{ span: 24 }}
      >
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
        <Form.Item
          name="is_running"
          label={<ResText10SemiBold>Run Clock</ResText10SemiBold>}
          valuePropName="checked"
        >
          <Switch defaultChecked={clock_running} checked={clock_running} />
        </Form.Item>
      </Form>
    </div>
  );

  return (
    <Wrapper>
      <Clock value={value} renderNumbers />
      <div>{getChangeSpeed()}</div>
    </Wrapper>
  );
}
