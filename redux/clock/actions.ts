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
import {
  patchClockRun,
  putClockSpeed,
  syncClockTime,
} from "../../www/utils/ClockApi";

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

export function updateClockSpeed(props: ClockSpeedProps) {
  return (dispatch: MyThunkDispatch) => {
    dispatch(actionStart(PUT_CLOCK_SPEED));
    putClockSpeed(props)
      .then((res) => {
        dispatch(actionSuccess(PUT_CLOCK_SPEED, props));
        dispatch(setClockSpeed(props));
      })
      .catch((err) => dispatch(actionFailure(PUT_CLOCK_SPEED, err)));
  };
}

export function updateClockRun(props: ClockRunProps) {
  return (dispatch: MyThunkDispatch) => {
    dispatch(actionStart(PATCH_CLOCK_RUN));
    patchClockRun(props)
      .then((res) => {
        dispatch(actionSuccess(PATCH_CLOCK_RUN, props));
        dispatch(setClockRun(props));
      })
      .catch((err) => dispatch(actionFailure(PATCH_CLOCK_RUN, err)));
  };
}

export function fetchClockSyncTime(props: SyncClockTimeProps) {
  return (dispatch: MyThunkDispatch) => {
    dispatch(actionStart(SYNC_CLOCK_TIME));
    syncClockTime(props)
      .then((res) => {
        dispatch(actionSuccess(SYNC_CLOCK_TIME, props));
        dispatch(setSyncClockTime(props));
      })
      .catch((err) => dispatch(actionFailure(SYNC_CLOCK_TIME, err)));
    dispatch(actionSuccess(SYNC_CLOCK_TIME, props));
  };
}