import { AxiosResponse } from "axios";
import { LaunchDto } from "./sliceLaunches.model";
import { httpClient } from "../../http/http-client";

export class ApiLaunches {
  public static getAllLaunches(): Promise<AxiosResponse<LaunchDto[]>> {
    return httpClient.get("launches");
  }

  public static getLaunch(id: string): Promise<AxiosResponse<LaunchDto>> {
    return httpClient.get("launches/" + id);
  }
}
