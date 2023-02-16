import { ClockSpeedType } from "../../models/enums/ClockSpeedType";

// -------------------------------------------------------------------------------- //
// Actions //
// -------------------------------------------------------------------------------- //
export const PUT_CLOCK_SPEED = "PUT_CLOCK_SPEED";
export const SET_CLOCK_SPEED = "SET_CLOCK_SPEED";
export type ClockRateProps = { value: number; type: ClockSpeedType };
export type ClockSpeedProps = {
  rate: ClockRateProps;
  current_ts: Date;
};

export const PATCH_CLOCK_RUN = "PATCH_CLOCK_RUN";
export const SET_CLOCK_RUN = "SET_CLOCK_RUN";

export type ClockRunProps = {
  current_ts: Date; // may need to rename it to show begin_ts instead
  enabled: boolean;
};

export const SYNC_CLOCK_TIME = "SYNC_CLOCK_TIME";
export const SET_SYNC_CLOCK_TIME = "SET_SYNC_CLOCK_TIME";
export type SyncClockTimeProps = { new_ts?: Date };

// -------------------------------------------------------------------------------- //
// States //
// -------------------------------------------------------------------------------- //
export type ClockState = {
  begin_ts?: Date;
  new_ts?: Date;
  clock_running: boolean;
  rate: ClockRateProps;
};
