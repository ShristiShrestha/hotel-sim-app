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
import {
  driftDateStr,
  parseDateStrToDate,
  toDateStr,
} from "../../www/utils/DateUtils";

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
  const [speed, setSpeed] = useState(null);
  const [speedType, setSpeedType] = useState(ClockSpeedType.MIN);
  let interval: any = null;
  let realInterval: any = null;
  const { begin_ts, clock_running, new_ts, rate } =
    useSelector(selectClockValues);
  const [realTs, setRealTs] = useState(new Date());

  // on mount, if clock is set running in redux
  // update begin_ts in server only if clock is default to true
  useEffect(() => {
    dispatchClockRun(clock_running, clock_running);
  }, []);

  useEffect(() => {
    if (realInterval) {
      clearInterval(interval);
    }
    realInterval = setInterval(() => {
      setRealTs(new Date());
    }, 1000);

    return () => {
      realInterval && clearInterval(realInterval);
    };
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
      clearInterval(interval);
    }
    if (clock_running) {
      interval = setInterval(() => {
        dispatchClockSync();
      }, 2000);
    }

    return () => {
      interval && clearInterval(interval);
    };
  }, [clock_running]);

  /******************* dispatch handlers ************************/

  const dispatchClockRun = (isRunning, sendCurrentTs = false) => {
    dispatch(
      updateClockRun({
        current_ts: sendCurrentTs
          ? new Date() // send real ts
          : !isRunning
          ? new_ts // when clock is disabled, send simulated ts to set lastStop ts
          : undefined,
        enabled: isRunning,
      })
    );
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
      <>
        <div>
          <ResText10SemiBold>Real time</ResText10SemiBold>
        </div>
        <ResText10Regular>{toDateStr(realTs)}</ResText10Regular>
        {clock_running && (
          <Button
            type={"primary"}
            size={"small"}
            onClick={() => dispatchClockRun(true, true)}
          >
            <ResText10Regular>Set new begin ts</ResText10Regular>
          </Button>
        )}
        <div>
          <ResText10SemiBold>Begin time</ResText10SemiBold>
        </div>
        <ResText10Regular color={grey4}>
          {begin_ts && toDateStr(begin_ts)}
        </ResText10Regular>
        <div>
          <ResText10SemiBold>Simulated time</ResText10SemiBold>
        </div>
        <ResText10Regular>{toDateStr(new_ts)}</ResText10Regular>
        <div>
          <ResText10SemiBold>Time spent since begin ts (sim)</ResText10SemiBold>
          {new_ts && (
            <ResText10Regular>
              {driftDateStr(new_ts!!, begin_ts)}
            </ResText10Regular>
          )}
        </div>
      </>

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
      <div>
        <ResText10SemiBold>Real clock</ResText10SemiBold>
        <Clock value={realTs} renderNumbers />
        <ResText10SemiBold>Start of game</ResText10SemiBold>
        {begin_ts && (
          <Clock value={parseDateStrToDate(begin_ts)} renderNumbers />
        )}
        <ResText10SemiBold>Game clock</ResText10SemiBold>
        <Clock
          value={new_ts ? parseDateStrToDate(new_ts) : undefined}
          renderSecondHand={true}
          renderNumbers
        />
      </div>
      <div>{changeSpeedForm}</div>
    </Wrapper>
  );
}
