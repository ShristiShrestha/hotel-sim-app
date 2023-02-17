import {
  ClockState,
  SET_CLOCK_RUN,
  SET_CLOCK_SPEED,
  SET_SYNC_CLOCK_TIME,
} from "./types";
import { ClockSpeedType } from "../../models/enums/ClockSpeedType";
import { RootState } from "../common/types";

// -------------------------------------------------------------------------------- //
// initial state //
// -------------------------------------------------------------------------------- //

const initialState: ClockState = {
  rate: { value: 32, type: ClockSpeedType.MIN },
  clock_running: true,
};

// -------------------------------------------------------------------------------- //
// selectors //
// -------------------------------------------------------------------------------- //

export const selectClockValues = (state: RootState) => {
  return {
    begin_ts: state.clock.begin_ts,
    clock_running: state.clock.clock_running,
    new_ts: state.clock.new_ts,
    rate: state.clock.rate,
  };
};

// -------------------------------------------------------------------------------- //
// reducer //
// -------------------------------------------------------------------------------- //
export default function reducer(state = initialState, action: any): ClockState {
  switch (action.type) {
    case SET_CLOCK_SPEED: {
      return { ...state, rate: action.payload.rate };
    }
    case SET_CLOCK_RUN: {
      return {
        ...state,
        begin_ts: action.payload.current_ts,
        clock_running: action.payload.enabled,
      };
    }
    case SET_SYNC_CLOCK_TIME: {
      return { ...state, new_ts: action.payload.new_ts };
    }
    default:
      return { ...state };
  }
}
