// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { ClockSpeedType } from "../../models/enums/ClockSpeedType";

let beginTs: Date | null = null;
let rate = { value: null, type: null };
let lastStopTs: Date | null = null;
let lastSyncTs = null;
let clockRunning = null;

const SECS_IN_DAY = 86400;

export default function handler(req, res) {
  const requestMethod = req.method;
  const requestData = req.body;
  let responseData: any = null;
  switch (requestMethod) {
    case "PUT": // update clock speed
      const newRate = requestData["rate"]["value"];
      const newRateType = requestData["rate"]["type"];
      rate["value"] = newRate;
      rate["type"] = newRateType;
      responseData = { rate: rate, current_ts: beginTs };
      console.log("On RATE CHANGE: ", responseData);
      res.status(200).json(responseData);
      break;
    case "PATCH": // enable/disable clock running
      const enabled = requestData["enabled"];
      const currentTs = requestData["current_ts"];
      if (enabled) {
        clockRunning = enabled;
        beginTs = new Date(currentTs);
      } else {
        lastStopTs = new Date(currentTs);
      }
      responseData = { current_ts: beginTs, enabled: enabled };
      console.log("On clock enable/disable: ", responseData);
      res.status(200).json(responseData);
      break;
    case "GET": // get new timestamp : sync clock
      if (beginTs && rate["value"] && rate["value"] > 0 && rate["type"]) {
        const nowTs = new Date();
        const realOffsetSecs = (nowTs.getTime() - beginTs.getTime()) / 1000;
        const simSecsInADay = getSecsInSimDay(rate["value"], rate["type"]);
        const daysSpentInSim = realOffsetSecs / simSecsInADay;
        const newSimTs = new Date(
          beginTs.getTime() + daysSpentInSim * SECS_IN_DAY * 10000
        );
        res.status(200).json({ new_ts: newSimTs });
      }
      break;
    default:
      res.status(200).json({ name: "DEFAULT RESPONSE" });
  }
}

const getSecsInSimDay = (rate: number, type: ClockSpeedType) => {
  switch (type) {
    case ClockSpeedType.HR:
      return rate * 3600;
    case ClockSpeedType.MIN:
      return rate * 60;
    default:
      return rate;
  }
};
