import { AxiosResponse } from "axios";

import { httpClient } from "../../http";
import { LaunchDto } from "./models";

export class ApiLaunches {
  public static getAllLaunches(): Promise<AxiosResponse<LaunchDto[]>> {
    return httpClient.get("launches");
  }

  public static getLaunch(id: string): Promise<AxiosResponse<LaunchDto>> {
    return httpClient.get("launches/" + id);
  }
}
