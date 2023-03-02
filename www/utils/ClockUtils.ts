// start timestamp when creating a new game
import { parseDateStrToDate } from "./DateUtils";
import { ClockSpeedType } from "../../models/enums/ClockSpeedType";

let beginTs: Date | null = null;
let rate = { value: null, type: null };
// stores reference point in simulation clock
// marking ts when sim clock was last stopped
let lastStopTsSim: Date | null = null;
// stores reference point in real clock
// marking ts when real clock was last stopped
let lastStopTsReal: Date | null = null;
// real timestamp after lastStopTsReal marking
// when the clock is resumed
let lastResumeTsReal: Date | null = null;

let useLastStopTsSim: boolean | null = null;
let clockRunning = null;

const SECS_IN_DAY = 86400;
const MINS_IN_DAY = 1440;

export default function handleClockApiMethod(req) {
  const requestMethod = req.method;
  const requestData = req.body;
  let responseData: any = null;
  switch (requestMethod) {
    case "PUT": // update clock speed
      console.warn("Calling PUT CLOCK SPEED METHOD");
      const newRate = requestData["rate"]["value"];
      const newRateType = requestData["rate"]["type"];
      rate["value"] = newRate;
      rate["type"] = newRateType;
      responseData = {
        rate: rate, // no need to sync ts since GET api call handles it
      };
      return responseData;

    case "PATCH": // enable/disable clock running
      console.warn("Calling PATCH CLOCK RUN STOP METHOD");
      const enabled = requestData["enabled"];
      const currentTs = requestData["current_ts"];
      // set new begin ts
      // if enabled and current_ts is provided,
      // equivalent of creating a new game with new starting timestamp
      if (enabled && currentTs) {
        clockRunning = enabled;
        beginTs = parseDateStrToDate(currentTs);
        lastStopTsSim = beginTs; // initializing the very first ts of creating simulation
        const syncTs = getNewTs();
        responseData = {
          begin_ts: beginTs,
          current_ts: syncTs,
          enabled: enabled,
        };
        return responseData;
      }

      // simply turning the clock on (unlike creating a new game)
      // clock is enabled only without current_ts
      else if (enabled) {
        clockRunning = enabled;
        const syncTs = getNewTs();
        responseData = { current_ts: syncTs, enabled: enabled };
        return responseData;
      }
      // disable clock run
      // if clocks is disabled, current_ts represents the time clock is stopped
      else if (currentTs) {
        lastStopTsSim = parseDateStrToDate(currentTs); // use simulation ts since user stop by looking at on sim clock
        lastStopTsReal = new Date(); // use this to calculate partOfDay skipped since last clock is resumed
        useLastStopTsSim = true;
        responseData = { current_ts: lastStopTsSim, enabled: enabled };
        return responseData;
      }
      break;
    case "GET": // get new timestamp : sync clock
      const newSimTsOnSync = getNewTs();
      console.warn("Calling GET METHOD");
      if (newSimTsOnSync) return { new_ts: newSimTsOnSync };
      break;
    default:
      return {};
  }
}

// use lastStopTsSim with nowTs to calculate partOfDay in simulated clock
// when clock stops, update lastStopTsSim with lastStopTsSim
// if lastStopTsSim != beginTs, return simulatedPortionOfDayPassed(lastStopTsSim-beginTs) +
// simulatedPortionOfDayPassed(nowTs - lastStopTsSim)
const getNewTs = () => {
  const valuesProvided =
    beginTs &&
    lastStopTsSim &&
    rate["value"] &&
    rate["value"] > 0 &&
    rate["type"];
  const clockNotStoppedSinceBeginTs =
    beginTs?.getTime() == lastStopTsSim?.getTime();
  // if the clock is running since the start of the game
  if (valuesProvided && clockNotStoppedSinceBeginTs) {
    const nowTs = new Date();
    const realOffsetSecs = (nowTs.getTime() - beginTs!!.getTime()) / 1000;
    const simSecsInADay = getSecsInSimDay(rate["value"]!!, rate["type"]!!);
    const daysSpentInSim = realOffsetSecs / simSecsInADay;
    return new Date(beginTs!!.getTime() + daysSpentInSim * SECS_IN_DAY * 1000);
  }

  // resuming clock at the point it was stopped
  if (valuesProvided && !clockNotStoppedSinceBeginTs && useLastStopTsSim) {
    lastResumeTsReal = new Date(); // real timestamp when the clock is resumed
    useLastStopTsSim = false;
    return lastStopTsSim;
  }

  if (
    valuesProvided &&
    !clockNotStoppedSinceBeginTs &&
    !useLastStopTsSim &&
    lastResumeTsReal
  ) {
    const nowTs = new Date();
    const simSecsInADay = getSecsInSimDay(rate["value"]!!, rate["type"]!!);
    const realOffsetSecsAfterLastStop =
      (nowTs.getTime() - lastResumeTsReal!!.getTime()) / 1000;
    const daysSpentInSimAfterLastStop =
      realOffsetSecsAfterLastStop / simSecsInADay;
    return new Date(
      lastStopTsSim!!.getTime() +
        daysSpentInSimAfterLastStop * SECS_IN_DAY * 1000
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
