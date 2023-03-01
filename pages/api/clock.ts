// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import {ClockSpeedType} from "../../models/enums/ClockSpeedType";

let beginTs: Date | null = null;
let rate = { value: null, type: null };
let lastBeginTs: Date | null = null;
let lastStopTs: Date | null = null;
let shouldUseLastStopTs: boolean | null = null;
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
      const newSimTsOnSpeedChange = getNewTs();
      responseData = {
        rate: rate,
        current_ts: newSimTsOnSpeedChange || beginTs,
      };
      res.status(200).json(responseData);
      break;
    case "PATCH": // enable/disable clock running
      const enabled = requestData["enabled"];
      const currentTs = requestData["current_ts"];
      if (enabled && currentTs) {
        clockRunning = enabled;
        beginTs = new Date(currentTs);
        lastBeginTs = beginTs;
      } else if(currentTs) {
        lastStopTs = new Date(currentTs);
        shouldUseLastStopTs = true;
      }
      responseData = { current_ts: beginTs, enabled: enabled };
      res.status(200).json(responseData);
      break;
    case "GET": // get new timestamp : sync clock
      const newSimTsOnSync = getNewTs();
      if (newSimTsOnSync) res.status(200).json({ new_ts: newSimTsOnSync });
      break;
    default:
      res.status(200).json({ name: "DEFAULT RESPONSE" });
  }
}

const getNewTs = () => {
  // use lastBeginTs with nowTs to calculate partOfDay in simulated clock
  // when clock stops, update lastBeginTs with lastStopTs
  // if lastBeginTs != beginTs, return simulatedPortionOfDayPassed(lastBeginTs-beginTs) + simulatedPortionOfDayPassed(nowTs - lastBeginTs)

  if(shouldUseLastStopTs && lastStopTs && clockRunning){
    shouldUseLastStopTs = false;
    return lastStopTs;
  }
  const nowTs = new Date();
  if (beginTs && lastBeginTs && rate["value"] && rate["value"] > 0 && rate["type"]) {
    const realOffsetSecs = (nowTs.getTime() - lastBeginTs.getTime()) / 1000;
    const simSecsInADay = getSecsInSimDay(rate["value"], rate["type"]);
    const daysSpentInSim = realOffsetSecs / simSecsInADay;
    return new Date(beginTs.getTime() + daysSpentInSim * SECS_IN_DAY * 1000);
  }
};

const getSecsInSimDay = (rate: number, type: ClockSpeedType) => {
  switch (type) {
    // case ClockSpeedType.HR:
    //   return rate * 3600;
    case ClockSpeedType.MIN:
      return rate * 60;
    default:
      return rate;
  }
};
