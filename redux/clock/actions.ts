import { MyThunkDispatch } from "../common/types";
import {
  ClockRunProps,
  ClockSpeedProps,
  PATCH_CLOCK_RUN,
  PUT_CLOCK_SPEED,
  SET_CLOCK_RUN,
  SET_CLOCK_SPEED,
  SET_SYNC_CLOCK_TIME,
  SYNC_CLOCK_TIME,
  SyncClockTimeProps,
} from "./types";
import { actionFailure, actionStart, actionSuccess } from "../common/actions";
import handleClockApiMethod from "../../www/utils/ClockUtils";

// -------------------------------------------------------------------------------- //
// state //
// -------------------------------------------------------------------------------- //

export function setClockSpeed(props: ClockSpeedProps) {
  return (dispatch: MyThunkDispatch) => {
    dispatch(actionStart(SET_CLOCK_SPEED));
    dispatch({ type: SET_CLOCK_SPEED, payload: props });
    dispatch(actionSuccess(SET_CLOCK_SPEED, props));
  };
}

export function setClockRun(props: ClockRunProps) {
  return (dispatch: MyThunkDispatch) => {
    dispatch(actionStart(SET_CLOCK_RUN));
    dispatch({ type: SET_CLOCK_RUN, payload: props });
    dispatch(actionSuccess(SET_CLOCK_RUN, props));
  };
}

export function setSyncClockTime(props: SyncClockTimeProps) {
  return (dispatch: MyThunkDispatch) => {
    dispatch(actionStart(SET_SYNC_CLOCK_TIME));
    dispatch({ type: SET_SYNC_CLOCK_TIME, payload: props });
    dispatch(actionSuccess(SET_SYNC_CLOCK_TIME, props));
  };
}

// -------------------------------------------------------------------------------- //
// api //
// -------------------------------------------------------------------------------- //

// todo: remove ClockUtils calls

export function updateClockSpeed(props: ClockSpeedProps) {
  return (dispatch: MyThunkDispatch) => {
    dispatch(actionStart(PUT_CLOCK_SPEED));
    // putClockSpeed(props)
    //   .then((res) => {
    //     dispatch(actionSuccess(PUT_CLOCK_SPEED, res));
    //     dispatch(setClockSpeed(res));
    //   })
    //   .catch((err) => dispatch(actionFailure(PUT_CLOCK_SPEED, err)));

    try {
      const res = handleClockApiMethod({ method: "PUT", body: props });
      dispatch(actionSuccess(PUT_CLOCK_SPEED, res));
      dispatch(setClockSpeed(res));
    } catch (err) {
      dispatch(actionFailure(PUT_CLOCK_SPEED, err));
    }
  };
}

export function updateClockRun(props: ClockRunProps) {
  return (dispatch: MyThunkDispatch) => {
    dispatch(actionStart(PATCH_CLOCK_RUN));
    // patchClockRun(props)
    //   .then((res) => {
    //     dispatch(actionSuccess(PATCH_CLOCK_RUN, res));
    //     dispatch(setClockRun(res));
    //   })
    //   .catch((err) => dispatch(actionFailure(PATCH_CLOCK_RUN, err)));

    try {
      const res = handleClockApiMethod({ method: "PATCH", body: props });
      dispatch(actionSuccess(PATCH_CLOCK_RUN, res));
      dispatch(setClockRun(res));
    } catch (err) {
      dispatch(actionFailure(PATCH_CLOCK_RUN, err));
    }
  };
}

export function fetchClockSyncTime() {
  return (dispatch: MyThunkDispatch) => {
    dispatch(actionStart(SYNC_CLOCK_TIME));
    //syncClockTime()
    try {
      const res = handleClockApiMethod({ method: "GET" });
      dispatch(actionSuccess(SYNC_CLOCK_TIME, res));
      dispatch(setSyncClockTime(res));
    } catch (err) {
      dispatch(actionFailure(SYNC_CLOCK_TIME, err));
    }
  };
}
