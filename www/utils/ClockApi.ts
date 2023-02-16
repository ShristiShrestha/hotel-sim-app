import Api from "./ApiUtils";
import {
  ClockRunProps,
  ClockSpeedProps,
  SyncClockTimeProps,
} from "../../redux/clock/types";

export const putClockSpeed = (props: ClockSpeedProps) => {
  return Api.apiCall({
    url: "/clock",
    method: "PUT",
    data: props,
  })
    .then((res) => console.log("Response on PUT clock speed: ", res))
    .catch((err) => console.log("Err on PUT clock speed: ", err));
};

export const patchClockRun = (props: ClockRunProps) => {
  return Api.apiCall({
    url: "/clock",
    method: "PATCH",
    data: props,
  })
    .then((res) => console.log("Response on PUT clock speed: ", res))
    .catch((err) => console.log("Err on PUT clock speed: ", err));
};

export const syncClockTime = (props: SyncClockTimeProps) => {
  return Api.apiCall({
    url: "/clock",
    method: "GET",
    data: props,
  })
    .then((res) => console.log("Response on GET clock speed: ", res))
    .catch((err) => console.log("Err on GET clock speed: ", err));
};
