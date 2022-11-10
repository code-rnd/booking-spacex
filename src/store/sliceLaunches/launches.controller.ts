import { AxiosResponse } from "axios";
import { GetLaunchesResponse, LaunchModel } from "./sliceLaunches.model";
import { httpClient } from "../../http/http-client";

export class ApiLaunches {
  public static getLaunches(
    params: any
  ): Promise<AxiosResponse<GetLaunchesResponse>> {
    return httpClient.post("launches/query", params);
  }

  public static getLaunch(id: string): Promise<AxiosResponse<LaunchModel>> {
    return httpClient.get("launches/" + id);
  }
}
