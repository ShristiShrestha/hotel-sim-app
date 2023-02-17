import React, { useEffect, useState } from "react";
import Clock from "react-clock";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchClockSyncTime,
  updateClockRun,
  updateClockSpeed,
} from "../../redux/clock/actions";
import {
  ClockSpeedType,
  ClockSpeedTypeAll,
} from "../../models/enums/ClockSpeedType";
import { selectClockValues } from "../../redux/clock/reducer";
import { ResText10Regular, ResText10SemiBold } from "../../www/utils/TextUtils";
import { Button, Form, InputNumber, Select, Switch } from "antd";
import { grey4 } from "../../www/utils/ShadesUtils";
import { toDateStr } from "../../www/utils/DateUtils";

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

  .ant-form-item {
    margin-bottom: 0;
  }
`;

export default function SimClock() {
  const dispatch = useDispatch();
  const [speed, setSpeed] = useState(32);
  const [speedType, setSpeedType] = useState(ClockSpeedType.MIN);
  let interval: any = null;
  const { begin_ts, clock_running, new_ts, rate } =
    useSelector(selectClockValues);

  // on mount, if clock is set running in redux
  // update begin_ts in server
  useEffect(() => {
    dispatchClockRun(clock_running);
  }, []);

  // on mount if clock speed is set in redux
  // update rate in server as well
  useEffect(() => {
    if (rate && Object.values(rate).length > 0 && rate.value > 0) {
      dispatchClockSpeed(rate.value, rate.type);
    }
  }, []);

  // sync clock by providing current timestamp value
  useEffect(() => {
    if (interval) {
      console.log("clearing previous");
      clearInterval(interval);
    }
    if (clock_running) {
      interval = setInterval(() => {
        dispatchClockSync();
      }, 1000);
    }

    return () => {
      !!interval && clearInterval(interval);
    };
  }, [clock_running]);

  /******************* dispatch handlers ************************/

  const dispatchClockRun = (isRunning) => {
    dispatch(updateClockRun({ current_ts: new Date(), enabled: isRunning }));
  };

  const dispatchClockSpeed = (
    clockSpeed?: number,
    clockSpeedType?: ClockSpeedType
  ) => {
    clockSpeed &&
      clockSpeedType &&
      dispatch(
        updateClockSpeed({
          rate: { value: clockSpeed, type: clockSpeedType },
          current_ts: new Date(),
        })
      );
  };

  const dispatchClockSync = () => {
    dispatch(fetchClockSyncTime());
  };

  /*******************  event handlers  ************************/
  const onValuesChange = (changedValues, allValues) => {
    const newRateType = allValues["speed_type"];
    const newRateVal = allValues["speed"];
    const newClockRunning = allValues["is_running"];
    const changedFields = Object.keys(changedValues);

    if (changedFields.includes("speed")) {
      setSpeed(newRateVal);
    }

    if (changedFields.includes("speed_type")) {
      setSpeedType(newRateType);
    }

    if (changedFields.includes("is_running")) {
      dispatchClockRun(newClockRunning);
    }
  };

  const onSubmitSpeedChange = () => {
    speed && speedType && dispatchClockSpeed(speed, speedType);
  };

  /******************* jsx elements ************************/

  const suffixSelector = (
    <Form.Item name="speed_type" noStyle>
      <Select style={{ width: 65 }} defaultValue={rate?.type}>
        {ClockSpeedTypeAll.map((item) => (
          <Option value={item}>
            <ResText10Regular>{item}</ResText10Regular>
          </Option>
        ))}
      </Select>
    </Form.Item>
  );

  const changeSpeedForm = (
    <Form
      name="complex-form"
      onValuesChange={onValuesChange}
      style={{ maxWidth: 250 }}
      labelCol={{ span: 24 }}
      wrapperCol={{ span: 24 }}
    >
      {begin_ts && (
        <>
          <div>
            <ResText10SemiBold>Begin time</ResText10SemiBold>
          </div>
          <ResText10Regular color={grey4}>
            {toDateStr(begin_ts)}
          </ResText10Regular>
          <div>
            <ResText10SemiBold>{toDateStr(new_ts)}</ResText10SemiBold>
          </div>
        </>
      )}

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
          defaultValue={rate?.value}
          addonAfter={suffixSelector}
          style={{ width: "100%" }}
        />
      </Form.Item>
      <Button
        type={"primary"}
        size={"small"}
        onClick={() => onSubmitSpeedChange()}
        style={{ borderRadius: 8, width: "100%" }}
      >
        <ResText10Regular>Submit</ResText10Regular>
      </Button>
    </Form>
  );

  return (
    <Wrapper>
      <Clock value={new_ts} renderSecondHand={false} renderNumbers />
      <div>{changeSpeedForm}</div>
    </Wrapper>
  );
}
