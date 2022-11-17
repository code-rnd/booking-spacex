import { AxiosResponse } from "axios";

import { httpClient } from "../../../../http";
import { LaunchDto, LaunchModel } from "../models";

export class ApiLaunches {
  public static getAllLaunches(): Promise<AxiosResponse<LaunchDto[]>> {
    return httpClient.get("launches");
  }

  public static updateLaunch(
    launch: LaunchModel
  ): Promise<AxiosResponse<LaunchDto[]>> {
    return httpClient.patch("launches" + launch.id, launch);
  }
}
