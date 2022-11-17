import Axios, { AxiosInstance } from "axios";

import { environment } from "../shared/constants";

const baseURL =
  environment.REACT_APP_BASE_URL || "https://api.spacexdata.com/v4/";

export const httpClient: AxiosInstance = Axios.create({ baseURL });
