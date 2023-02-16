import Api from "./ApiUtils";
import {
  ClockRunProps,
  ClockSpeedProps,
  SyncClockTimeProps,
} from "../../redux/clock/types";

export const putClockSpeed = (props: ClockSpeedProps) => {
  return Api.apiCall<ClockSpeedProps>({
    url: "/clock",
    method: "PUT",
    data: props,
  });
};

export const patchClockRun = (props: ClockRunProps) => {
  return Api.apiCall<ClockRunProps>({
    url: "/clock",
    method: "PATCH",
    data: props,
  });
};

export const syncClockTime = () => {
  return Api.apiCall<SyncClockTimeProps>({
    url: "/clock",
    method: "GET",
  });
};
