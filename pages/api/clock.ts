// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { ClockSpeedType } from "../../models/enums/ClockSpeedType";
import { parseDateStrToDate, toDateStr } from "../../www/utils/DateUtils";

// start timestamp when creating a new game
let beginTs: Date | null = null;
let rate = { value: null, type: null };
// same as beginTs when new begin ts is set,
// when clock is stopped, it stores the last stop ts
// as a new reference (begin ts) for the clock,
// from which partOfDay is calculated
// stores the timestamp when the clock is stopped
let lastStopTs: Date | null = null;

// real timestamp after lastStopTs marking
// when the clock is resumed
let lastResumeTs: Date | null = null;
let shouldUseLastStopTs: boolean | null = null;
let clockRunning = null;

const SECS_IN_DAY = 86400;
const MINS_IN_DAY = 1440;

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
      responseData = {
        rate: rate, // no need to sync ts since GET api call handles it
      };
      res.status(200).json(responseData);
      break;

    case "PATCH": // enable/disable clock running
      const enabled = requestData["enabled"];
      const currentTs = requestData["current_ts"];
      // set new begin ts
      // if enabled and current_ts is provided,
      // equivalent of creating a new game with new starting timestamp
      if (enabled && currentTs) {
        clockRunning = enabled;
        beginTs = parseDateStrToDate(currentTs);
        lastStopTs = beginTs; // initializing the very first ts of creating simulation
        const syncTs = getNewTs();
        responseData = { current_ts: syncTs, enabled: enabled };
        res.status(200).json(responseData);
        break;
      }
      // clock is enabled only without current_ts
      // simply turning the clock on (unlike creating a new game)
      // this part is tricky
      else if (enabled) {
        clockRunning = enabled;
        const syncTs = getNewTs();
        responseData = { current_ts: syncTs, enabled: enabled };
        res.status(200).json(responseData);
        break;
      }
      // disable clock run
      // if clocks is disabled, current_ts represents the time clock is stopped
      else if (currentTs) {
        lastStopTs = parseDateStrToDate(currentTs);
        shouldUseLastStopTs = true;
        responseData = { current_ts: lastStopTs, enabled: enabled };
        res.status(200).json(responseData);
      }
      break;
    case "GET": // get new timestamp : sync clock
      const newSimTsOnSync = getNewTs();
      if (newSimTsOnSync) res.status(200).json({ new_ts: newSimTsOnSync });
      break;
    default:
      res.status(200).json({ name: "DEFAULT RESPONSE" });
  }
}

// use lastStopTs with nowTs to calculate partOfDay in simulated clock
// when clock stops, update lastStopTs with lastStopTs
// if lastStopTs != beginTs, return simulatedPortionOfDayPassed(lastStopTs-beginTs) + simulatedPortionOfDayPassed(nowTs - lastStopTs)
const getNewTs = () => {
  const valuesProvided =
    beginTs && lastStopTs && rate["value"] && rate["value"] > 0 && rate["type"];
  const clockNotStoppedSinceBeginTs =
    beginTs?.getTime() == lastStopTs?.getTime();
  // if the clock is running since the start of the game
  if (valuesProvided && clockNotStoppedSinceBeginTs) {
    const nowTs = new Date();
    const realOffsetSecs = (nowTs.getTime() - beginTs!!.getTime()) / 1000;
    const simSecsInADay = getSecsInSimDay(rate["value"]!!, rate["type"]!!);
    const daysSpentInSim = realOffsetSecs / simSecsInADay;
    console.log("Returning normal");
    return new Date(beginTs!!.getTime() + daysSpentInSim * SECS_IN_DAY * 1000);
  }

  // resuming clock at the point it was stopped
  if (valuesProvided && !clockNotStoppedSinceBeginTs && shouldUseLastStopTs) {
    console.log("Returning the last stop ts");
    const resumeTs = lastStopTs!!; // real timestamp when the clock was stopped
    lastResumeTs = new Date(); // real timestamp when the clock is resumed
    shouldUseLastStopTs = false;
    return resumeTs;
  }

  if (
    valuesProvided &&
    !clockNotStoppedSinceBeginTs &&
    !shouldUseLastStopTs &&
    lastResumeTs
  ) {
    const nowTs = new Date();
    const simSecsInADay = getSecsInSimDay(rate["value"]!!, rate["type"]!!);
    const realOffsetSecsBeforeLastStop =
      (lastStopTs!!.getTime() - beginTs!!.getTime()) / 1000;
    const realOffsetSecsAfterLastStop =
      (nowTs.getTime() - lastResumeTs!!.getTime()) / 1000;
    const daysSpentInSimBeforeLastStop =
      (realOffsetSecsBeforeLastStop + realOffsetSecsAfterLastStop) /
      simSecsInADay;
    console.log(
      "Returning since resume time ",
      toDateStr(lastStopTs!!),
      toDateStr(lastResumeTs!!)
    );
    return new Date(
      beginTs!!.getTime() + daysSpentInSimBeforeLastStop * SECS_IN_DAY * 1000
    );
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
